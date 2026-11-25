import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist';
const site = 'https://axelrdz-4766.github.io';
const pairs = [
  ['/', '/es/'], ['/about/', '/es/sobre-mi/'], ['/projects/', '/es/proyectos/'],
  ['/writing/', '/es/articulos/'], ['/contact/', '/es/contacto/'],
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

const home = read('index.html');
assert.ok(home.includes('"@type":"ProfilePage"') && home.includes('"@type":"Person"'));
assert.ok(home.includes('"sameAs":["https://github.com/axelrdz-4766"]'));
assert.ok(read('robots.txt').includes(`Sitemap: ${site}/sitemap.xml`));
assert.ok(!sitemap.includes('proyectos/codecademy'));
assert.ok(existsSync(join(root, 'favicon.png')));
assert.ok(existsSync(join(root, 'social.png')));
const legacy = [
  'proyectos/proyectos.html', 'proyectos/codecademy/clubpage/index.html',
  'proyectos/codecademy/companyhomepage/index.html', 'proyectos/codecademy/tea-cozy/index.html',
  'proyectos/codecademy/websitedesign/websitedesign.html',
];
for (const file of legacy) {
  const html = read(file);
  assert.ok(html.includes('name="robots" content="noindex"'), file);
  assert.ok(html.includes('http-equiv="refresh" content="0; url=/es/proyectos/"'), file);
}
assert.ok(!existsSync(join(root, 'proyectos/codecademy/companyhomepage/img')));
console.log('Verified metadata and sitemap for 10 core routes, profile, site assets, and five legacy aliases.');
