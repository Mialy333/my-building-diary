<div align="center">

# My Building *Library*

**Building AI agents in public…**

My AI engineering library: I train here, draw the basics from it, and build my own agents.<br>
Every project is a book, every step a chapter.

[**Visit the library →**](https://my-building-library.vercel.app/en/) · [Version française](https://my-building-library.vercel.app/fr/)

</div>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/home-dark.png">
  <img src="docs/screenshots/home-light.png" alt="Home page of My Building Library: a desk with a computer, a plant, a mug and a cat in front of a city at dusk, under the title Building AI agents in public…">
</picture>

## What's on the shelves

| Shelf | Book | What it holds | Status |
| --- | --- | --- | --- |
| Fundamentals | **BAA 101** · Building AI Agents 101 | The basics of building an AI agent, and only the basics: each chapter is a lesson learned on a real project, stripped of its specifics so it holds for any agent. Comes with a 54-term glossary. | Living book · 11 chapters |
| Journeys | **Future Agent Engineer** · AWS & AI Scholars | Three projects on Amazon Bedrock AgentCore, from a support chatbot to a multi-agent system with guardrails and tracing. | 3/3 · Udacity Nanodegree |
| Journeys | **Dev3Pack** · AI Engineering Bootcamp | Three weeks to build a source-grounded research agent that cites or refuses, then a buyer agent on Solana devnet. | 17/17 · certificate |
| Path | **My path** | From asset management to AI engineering. | Coming soon |
| Builds | **My agents** | The AI agents I build on my own, from the BAA 101 concepts. | Coming soon |

31 chapters, each in English and French. Every journey chapter links to the BAA 101 concepts it applies, and every BAA 101 concept links back to the chapters where it was applied.

## A look inside

<img src="docs/screenshots/mobile-1.png" alt="Three phone screens: the shelf with illustrated covers, the Dev3Pack book page with its certificate, and a chapter with a glossary bubble open on 'prompt injection'.">

<img src="docs/screenshots/mobile-2.png" alt="Three phone screens: the compact contents of BAA 101 with its chapter number bar, the alphabetical glossary, and the About page with portrait and profile buttons.">

## What makes it a library

- **An illustrated home that follows the theme.** A desk in front of a city, a garland, a cat: dusk in light mode, night in dark mode, with a fade between the two. Drawn in SVG and CSS, no image file.
- **Covers that grow.** BAA 101's plant gains a leaf for each published chapter; AWS stars and Dev3Pack bulbs light up as chapters are written. Computed from the data at build time.
- **A living shelf.** Covers lift on hover, gauges fill, and a cover glides into place when you open its book (native View Transitions).
- **Reading comfort.** A reading-progress ribbon driven by the scroll itself, reading time, and a "Read" stamp remembered in your browser.
- **No one gets stuck on a word.** The first time a glossary term appears in a chapter, it becomes a small bubble with its definition and a link to the glossary, without leaving the page.
- **Contents that scale.** The living book uses a compact table of contents with a sticky chapter-number bar, so it stays easy to browse as chapters accumulate.
- **Proof over claims.** The About page lists the stack with a link to where each tool was actually used, and each certificate links to its official verification page.
- **Calm by design.** Every animation stops with `prefers-reduced-motion`. Text contrast is at least 4.5:1, touch targets at least 44 px, and the layout is mobile first.

## How it's built

| Layer | Choice |
| --- | --- |
| Framework | [Astro 7](https://astro.build), static output, TypeScript strict |
| Content | Markdown content collection, one file per chapter and language |
| Languages | Astro's native i18n: `/en/` and `/fr/`, same slugs in both |
| Styling | Plain CSS with design tokens, light and dark themes, no UI framework |
| Motion | CSS and SVG only: View Transitions, scroll-driven animation, native popover |
| Markdown | A small [Sätteri](https://github.com/bruits/satteri) plugin that turns glossary terms into bubbles at build time |
| Fonts | Instrument Serif, Instrument Sans, IBM Plex Mono, Newsreader, self-hosted through Astro's Fonts API |
| Hosting | Vercel, deployed on every push to `main` |

JavaScript in the browser is limited to the theme toggle, the "Read" stamp and copying a Discord username.

### Where things live

```text
src/
├── data/
│   ├── books.ts          # single source: books, chapters, status, links, BAA 101 concepts
│   ├── glossary.ts       # the 54 BAA 101 terms, FR and EN
│   ├── credentials.ts    # stack (with proofs) and certifications
│   └── social.ts         # profile links
├── content/chapters/<lang>/<book>/<chapter>.md
├── i18n/ui.ts            # interface strings, FR and EN
├── plugins/glossary-bubbles.ts
├── components/           # pages and pieces (DeskScene, BookCover, CoverArt, ChapterPage…)
└── pages/en, pages/fr    # routes
docs/design-decisions.md  # the design reference: palette, type, components, motion
```

Publishing a chapter means writing its Markdown file in both languages and switching `published: true` in `books.ts`. The shelf, the gauges, the covers and the cross-links follow.

### Run it locally

Requires Node.js 22.12 or later.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve the build (page transitions are best seen here)
```

## Design

The direction is called **Papier & prune** (paper and plum): an editorial, print-like diary with paper, ink and a bookmark ribbon, one plum accent, and an illustrated, cosy touch on the home page. Every choice (palette, contrast, type scale, components, motion) is recorded in [`docs/design-decisions.md`](docs/design-decisions.md).

Profile icons come from [Tabler Icons](https://tabler.io/icons) (MIT).

## Author

**Mialy Ratsimbazafy** · [@ellebuild](https://x.com/ellebuild) · AI/Agent Engineer, after ten years in asset management.

[LinkedIn](https://www.linkedin.com/in/mialyratsimbazafy75) · [GitHub](https://github.com/Mialy333) · [Dev.to](https://dev.to/mialy333)
