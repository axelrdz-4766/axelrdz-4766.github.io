# Axel Rodriguez

Personal website for Axel Rodriguez, co-founder of Octopus Labs. The English edition is at [the site root](https://axelrdz-4766.github.io/) and the Spanish edition uses [the /es/ prefix](https://axelrdz-4766.github.io/es/).

## Local development

Use the Node version in `.node-version`. The commands below install, build and preview the site.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run verify
npm run preview
```

The preview serves the static production build from `dist/`. The content collection starts empty. Astro reports this as an informational warning during discovery.

## Maintenance

- Edit public profile copy and translations in `src/lib/site.ts`. Review changes to either edition before release.
- Write articles in Markdown and follow the [editorial guide](docs/publishing.md).
- See the [architecture and release notes](docs/architecture.md) for routing, publication and verification.
