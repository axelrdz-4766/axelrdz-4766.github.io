import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://axelrdz-4766.github.io',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false },
  },
});
