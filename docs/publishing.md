# Publish an article

1. Start the draft in a private workspace. Files committed to this public repository are visible even if Astro marks them as drafts.
2. When the piece is approved, add a Markdown file under `src/content/writing/en/` or `src/content/writing/es/`. Use a stable slug. Each locale has its own article URL.
3. Set the frontmatter and preview the rendered article. Set `draft: false` only when ready. Future-dated entries remain outside the generated site until a build on or after their date in UTC.
4. Run `npm run check`, `npm run build` and `npm run verify`. Follow the normal review and release flow.

## Frontmatter template

```yaml
---
title: "Article title"
description: "A short description of what the article covers."
slug: "descriptive-slug"
author: "Axel Rodriguez"
publishedAt: "YYYY-MM-DD"
language: en
tags: []
type: technical-article
draft: true
references: []
---
```

Available types are `technical-article`, `research-note`, `experiment`, `case-study`, `project-documentation` and `scientific-publication`. Published research notes, experiments and scientific publications also appear in Research for their language. Use ISO calendar dates. Add optional `updatedAt` when the content changes, `relatedRepository` for a public HTTPS repository, and references as `{ label: "Source title", url: "https://..." }` entries. Use the same optional `translationId` in the two approved language editions of a piece. Each edition may have a different slug.

Use Markdown headings starting at level two so the page title remains the single level-one heading. Use fenced code blocks with a language tag, Markdown tables, and images with useful alternative text. Store article images next to their Markdown source and link them relatively. Verify that the author has permission to publish images and citations. For formulas, first decide whether plain text or a local image with an accessible description suffices. If native Markdown math is needed, evaluate `remark-math` and a static renderer such as `rehype-katex`. Configure and verify math during the build before adding formulas to a release.
