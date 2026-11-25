import { absolute, githubUrl, name, type Language } from './site';
import type { Article } from './routes';

const person = {
  '@type': 'Person',
  '@id': absolute('/#axel-rodriguez'),
  name,
  url: absolute('/'),
  sameAs: [githubUrl],
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
  const { title, description, language, publishedAt, updatedAt, tags, references } = article.data;
  const url = absolute(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: url,
    headline: title,
    description,
    image: [absolute('/social.png')],
    inLanguage: language,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: person,
    keywords: tags,
    citation: references.map(reference => reference.url),
  };
}
