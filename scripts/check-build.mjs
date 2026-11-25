import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { content, githubHandle, name, professionalProfiles, siteUrl } from '../src/lib/site.ts';

const root = 'dist';
const site = siteUrl;
const pairs = [
  ['/', '/es/'], ['/about/', '/es/sobre-mi/'], ['/projects/', '/es/proyectos/'],
  ['/writing/', '/es/articulos/'], ['/contact/', '/es/contacto/'],
  ['/projects/infinite/', '/es/proyectos/infinite/'],
];

function read(path) {
  const file = join(root, path);
  assert.ok(existsSync(file), `Missing build artifact: ${file}`);
  return readFileSync(file, 'utf8');
}

const sitemap = read('sitemap.xml');
const titles = new Set();
for (const pair of pairs) {
  for (const [index, path] of pair.entries()) {
    const lang = index === 0 ? 'en' : 'es';
    const html = read(`${path}index.html`);
    assert.match(html, new RegExp(`<html[^>]* lang="${lang}"`));
    assert.ok(html.includes(`rel="canonical" href="${site}${path}"`), path);
    assert.ok(html.includes(`hreflang="en" href="${site}${pair[0]}"`), path);
    assert.ok(html.includes(`hreflang="es" href="${site}${pair[1]}"`), path);
    assert.ok(html.includes('<main id="main"'), path);
    assert.ok(html.includes('property="og:description"'), path);
    assert.ok(sitemap.includes(`<loc>${site}${path}</loc>`), path);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), `Missing or duplicate page title: ${path}`);
    titles.add(title);
  }
}

const profiles = Object.values(professionalProfiles);
const urls = profiles.map(({ url }) => url);
assert.equal(new Set(urls).size, 3, 'Professional profile URLs must be distinct');

function structuredData(html) {
  const match = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
  assert.ok(match, 'Missing JSON-LD');
  return JSON.parse(match[1]);
}

const expectedPerson = {
  '@type': 'Person',
  '@id': site + '/#axel-rodriguez',
  name,
  alternateName: githubHandle,
  url: site + '/',
  sameAs: urls,
  jobTitle: 'Co-founder',
  worksFor: { '@type': 'Organization', name: 'Octopus Labs' },
};

for (const [lang, homepage, about, contact, article] of [
  ['en', 'index.html', 'about/index.html', 'contact/index.html', 'projects/infinite/index.html'],
  ['es', 'es/index.html', 'es/sobre-mi/index.html', 'es/contacto/index.html', 'es/proyectos/infinite/index.html'],
]) {
  for (const file of [homepage, about]) {
    const data = structuredData(read(file));
    assert.equal(data['@type'], 'ProfilePage', file);
    assert.equal(data.inLanguage, lang, file);
    assert.deepEqual(data.mainEntity, expectedPerson, file);
  }
  const articleData = structuredData(read(article));
  assert.equal(articleData['@type'], 'Article', article);
  assert.equal(articleData.inLanguage, lang, article);
  assert.deepEqual(articleData.author, expectedPerson, article);

  for (const file of [homepage, contact]) {
    const links = read(file).match(/<ul class="professional-links"[^>]*>(.*?)<\/ul>/s);
    assert.ok(links, file);
    assert.deepEqual([...links[1].matchAll(/href="([^"]+)"/g)].map(match => match[1]), urls, file);
    for (const { label } of profiles) assert.ok(links[1].includes('>' + label + '<'), file);
  }

  const { homeTitle, pages } = content[lang];
  const description = pages.home[1];
  const page = read(homepage);
  assert.ok(page.includes('<title>' + homeTitle + '</title>'), homepage);
  assert.ok(page.includes('name="description" content="' + description + '"'), homepage);
  assert.ok(page.includes('property="og:title" content="' + homeTitle + '"'), homepage);
  assert.ok(page.includes('property="og:description" content="' + description + '"'), homepage);
}
assert.ok(read('robots.txt').includes(`Sitemap: ${site}/sitemap.xml`));
assert.ok(!sitemap.includes(site + '/proyectos/'));
assert.ok(existsSync(join(root, 'favicon.png')));
assert.ok(existsSync(join(root, 'social.png')));
assert.ok(!existsSync(join(root, 'proyectos')), 'Legacy project routes must stay out of the artifact.');
for (const [homepage, projects, project] of [
  ['index.html', 'projects/index.html', '/projects/infinite/'],
  ['es/index.html', 'es/proyectos/index.html', '/es/proyectos/infinite/'],
]) {
  for (const file of [homepage, projects]) {
    assert.match(read(file), /<a class="project-link"[^>]+>/);
    assert.ok(read(file).includes('class="project-link" href="' + project + '"'), file);
  }
  const html = read(project + 'index.html');
  assert.match(html, /<figure class="recovery-flow"/);
  assert.equal((html.match(/class="recovery-flow__steps"/g) ?? []).length, 2, project);
  assert.match(html, /"@type":"Article"/);
  assert.doesNotMatch(html, /Notas privadas para revisión|docs\/delivery\/infinite/i);
}
console.log('Verified metadata, sitemap, project navigation, recovery diagrams, and site assets.');
