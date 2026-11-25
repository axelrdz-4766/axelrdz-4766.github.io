import { getCollection, type CollectionEntry } from 'astro:content';
import { corePages, languages, pagePath, type Alternates, type Language, type Page } from './site';

export type Article = CollectionEntry<'writing'>;
type RouteBase = { path: string; language: Language; alternates: Alternates };
export type PageRoute = RouteBase & { kind: 'page'; page: Page; articles: Article[] };
export type ArticleRoute = RouteBase & { kind: 'article'; article: Article };
export type Route = PageRoute | ArticleRoute;

const researchTypes = new Set(['research-note', 'experiment', 'scientific-publication']);

export function articlePath(article: Article) {
  return pagePath(article.data.section, article.data.language) + article.data.slug + '/';
}

export async function getSiteRoutes(): Promise<Route[]> {
  const today = new Date().toISOString().slice(0, 10);
  const published = (await getCollection('writing', ({ data }) => !data.draft && data.publishedAt <= today))
    .sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt) || a.id.localeCompare(b.id));

  const byLanguage = (language: Language) => published.filter(article => article.data.language === language);
  const researchByLanguage = (language: Language) => byLanguage(language)
    .filter(article => researchTypes.has(article.data.type));
  const researchAlternates: Alternates = {};
  const routes: Route[] = [];

  for (const language of languages) {
    for (const page of corePages) {
      routes.push({
        kind: 'page', language, page, path: pagePath(page, language),
        alternates: { en: pagePath(page, 'en'), es: pagePath(page, 'es') },
        articles: page === 'home' || page === 'writing' ? byLanguage(language) : [],
      });
    }

    const research = researchByLanguage(language);
    if (research.length) {
      const path = pagePath('research', language);
      researchAlternates[language] = path;
      routes.push({ kind: 'page', language, page: 'research', path, articles: research, alternates: researchAlternates });
    }
  }

  const articleRoutes = new Set<string>();
  const translations = new Map<string, Alternates>();
  for (const article of published) {
    const { language, translationId } = article.data;
    const path = articlePath(article);
    if (articleRoutes.has(path)) throw new Error('Duplicate article URL: ' + path);
    articleRoutes.add(path);

    const alternates = translationId ? translations.get(translationId) ?? {} : {};
    if (alternates[language]) throw new Error('Duplicate translation for ' + translationId + ' (' + language + ')');
    alternates[language] = path;
    if (translationId) translations.set(translationId, alternates);
    routes.push({ kind: 'article', language, path, article, alternates });
  }
  return routes;
}
