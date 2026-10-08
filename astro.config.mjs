// @ts-check
import { defineConfig } from 'astro/config'

export default defineConfig({
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
})
