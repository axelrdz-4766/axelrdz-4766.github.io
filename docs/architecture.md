# Architecture and release

Astro compiles the site to static HTML, CSS and a small script for the theme preference. Core content, navigation and language choices work with JavaScript disabled. The site uses locally served fonts. Font license notices apply to the respective font files.

- `src/lib/site.ts` owns localized copy and the paths for core pages.
- `src/lib/routes.ts` controls public editorial routes, translation pairs and Research visibility. Both static HTML generation and `sitemap.xml` consume this registry.
- `src/content.config.ts` validates the Markdown collection, including status, locale, dates and references.
- `src/components/SiteLayout.astro` renders navigation, language links and page metadata. `src/lib/structured-data.ts` defines profile and article data.
- `public/` contains approved site assets, font notices and crawler directives. `dist/` is the only deployment artifact.

## Existing GitHub Pages site

The historic root `index.html`, `style.css` and `proyectos/` sources remain in Git. The new artifact includes redirects from the old project index and four exercise pages to `/es/proyectos/`. Review these redirects before changing the current Pages source from the root of `main` to GitHub Actions. Exercise media and third-party scripts are outside the Astro artifact.

## Publication and indexation

Once the site is approved, review the intended commit and GitHub Actions results before switching Settings → Pages → Source to **GitHub Actions**. The workflow verifies the branch build and deploys the artifact on `main`. Pull requests run checks. The workflow can also be dispatched manually on `main`.

After deployment, verify both locales, canonical and alternate links, `/robots.txt`, `/sitemap.xml`, redirects and a missing URL. To roll back to an earlier Astro build, revert the release commit on `main` and verify the resulting Pages deployment. The original branch-based site can be restored by reverting to the documented legacy source and ensuring the selected commit contains its original root files.

For Google Search Console, use the URL-prefix property for `https://axelrdz-4766.github.io/`. Axel can choose a verification method when access is available. Submit `sitemap.xml` and use URL Inspection on both home pages after verification. Inspect actual indexing status separately in Search Console.
