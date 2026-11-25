import type { APIRoute, GetStaticPaths } from 'astro';
import { pagePath } from '../../lib/site';

const legacyFiles = [
  'proyectos.html',
  'codecademy/clubpage/index.html',
  'codecademy/companyhomepage/index.html',
  'codecademy/tea-cozy/index.html',
  'codecademy/websitedesign/websitedesign.html',
];

export const getStaticPaths: GetStaticPaths = () => legacyFiles.map(legacy => ({ params: { legacy } }));

export const GET: APIRoute = () => {
  const target = pagePath('projects', 'es');
  return new Response([
    '<!doctype html><html lang="es"><head><meta charset="utf-8">',
    '<meta name="robots" content="noindex"><title>Proyectos | Axel Rodriguez</title>',
    '<meta http-equiv="refresh" content="0; url=' + target + '"></head>',
    '<body><main><h1>Proyectos</h1><p><a href="' + target + '">Ir a Proyectos</a></p></main></body></html>',
  ].join(''), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
