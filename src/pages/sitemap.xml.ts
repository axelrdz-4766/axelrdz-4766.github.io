import type { APIRoute } from 'astro';
import { getSiteRoutes } from '../lib/routes';
import { absolute } from '../lib/site';

export const GET: APIRoute = async () => {
  const routes = await getSiteRoutes();
  const entries = routes.map(route => {
    const lastMod = route.kind === 'article' ? route.article.data.updatedAt ?? route.article.data.publishedAt : '';
    return '  <url><loc>' + absolute(route.path) + '</loc>' +
      (lastMod ? '<lastmod>' + lastMod + '</lastmod>' : '') + '</url>';
  });
  return new Response([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries, '</urlset>', '',
  ].join('\n'), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
