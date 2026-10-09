// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { glossaryBubbles } from './src/plugins/glossary-bubbles.ts';

export default defineConfig({
  // Public address of the site: used to build absolute links (canonical URL, link previews).
  site: "https://my-building-library.vercel.app",
  // Glossary terms in the chapters become bubbles with their definition.
  // Sätteri is Astro's default Markdown processor; we only add one HTML plugin.
  markdown: {
    processor: satteri({ hastPlugins: [glossaryBubbles] }),
  },
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  fonts: [
    { provider: fontProviders.google(), name: "Instrument Serif", cssVariable: "--font-serif", weights: [400], styles: ["normal", "italic"], fallbacks: ["Georgia", "serif"] },
    { provider: fontProviders.google(), name: "Instrument Sans", cssVariable: "--font-sans", weights: [400, 500, 600], styles: ["normal"], fallbacks: ["system-ui", "sans-serif"] },
    { provider: fontProviders.google(), name: "IBM Plex Mono", cssVariable: "--font-mono", weights: [400, 500], styles: ["normal"], fallbacks: ["monospace"] },
    { provider: fontProviders.google(), name: "Newsreader", cssVariable: "--font-reading", weights: [400, 500], styles: ["normal"], fallbacks: ["Georgia", "serif"] },
  ],
});
