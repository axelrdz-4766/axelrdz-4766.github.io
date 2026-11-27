import { absolute, githubHandle, name, professionalProfiles, type Language } from './site';
import type { Article } from './routes';

const person = {
  '@type': 'Person',
  '@id': absolute('/#axel-rodriguez'),
  name,
  alternateName: githubHandle,
  url: absolute('/'),
  sameAs: Object.values(professionalProfiles).map(profile => profile.url),
  jobTitle: 'Co-founder',
  worksFor: { '@type': 'Organization', name: 'Octopus Labs' },
};

export function profileData(path: string, language: Language, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: absolute(path),
    inLanguage: language,
    description,
    mainEntity: person,
  };
}

export function articleData(path: string, article: Article) {
  const { title, description, language, publishedAt, updatedAt, tags, references, images } = article.data;
  const url = absolute(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: url,
    headline: title,
    description,
    image: images.length ? images.map(image => absolute(image.src)) : [absolute('/social.png')],
    inLanguage: language,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: person,
    keywords: tags,
    citation: references.map(reference => reference.url),
  };
}
