# Architecture and release

Astro compiles the site to static HTML, CSS and a small script for the theme preference. Core content, navigation and language choices work with JavaScript disabled. The site uses locally served fonts. Font license notices apply to the respective font files.

- `src/lib/site.ts` owns localized copy and the paths for core pages.
- `src/lib/routes.ts` controls public editorial routes, translation pairs and Research visibility. Both static HTML generation and `sitemap.xml` consume this registry.
- `src/content.config.ts` validates the Markdown collection, including status, locale, dates and references.
- `src/components/SiteLayout.astro` renders navigation, language links and page metadata. `src/lib/structured-data.ts` defines profile and article data.
- `public/` contains approved site assets, font notices and crawler directives. `dist/` is the only deployment artifact.

## Publication and indexation

GitHub Pages uses **GitHub Actions** as its publishing source. The workflow verifies the branch build and deploys the artifact on `main`. Pull requests run checks. The workflow can also be dispatched manually on `main`.

After deployment, verify both locales, canonical and alternate links, `/robots.txt`, `/sitemap.xml`, and a missing URL. To roll back a release, revert the relevant commit on `main` and verify the resulting Pages deployment.

For Google Search Console, use the URL-prefix property for `https://axelrdz-4766.github.io/`. Axel can choose a verification method when access is available. Submit `sitemap.xml` and use URL Inspection on both home pages after verification. Inspect actual indexing status separately in Search Console.
