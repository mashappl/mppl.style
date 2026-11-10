import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mppl.style',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk'],
    routing: { prefixDefaultLocale: false },
  },
});
