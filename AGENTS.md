# Site contributor guidance

- This is Axel Rodriguez’s personal site. Keep changes scoped and preserve user-approved profile facts in English and Spanish.
- Use Astro static output, semantic HTML, native CSS and Markdown. Document any new dependency or publication capability.
- Keep the route registry, language alternates, sitemap and generated HTML consistent. Leave Research unavailable until it has published content in that language.
- Keep unpublished work outside the public repository. Exclude drafts and future-dated entries from build routes, indexes and sitemap.
- Preserve the historical exercise sources at the repository root. Review the Pages artifact, including redirects and media, before release.
- Use `npm ci`, followed by `npm run check`, `npm run build`, and `npm run verify`. Audit desktop and mobile for changes to layout or navigation.
- Public deployment, unverified biography claims and a global license require Axel’s approval.
