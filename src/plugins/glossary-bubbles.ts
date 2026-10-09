// Markdown plugin: turns glossary terms in the chapters into small "bubbles".
//
// It runs at build time, inside Astro's Markdown processor (Sätteri), on the
// HTML tree of each chapter. The FIRST time a glossary term appears in a
// chapter, the word becomes a button; tapping it opens a bubble (native HTML
// popover, no JavaScript) with the definition and a link to the glossary.
// Later occurrences stay plain text, so the page does not fill up with
// underlines.
//
// The chapter's language comes from its file path: src/content/chapters/<fr|en>/...
import { glossary, termId, type Term } from "../data/glossary";
import type { Locale } from "../i18n/ui";

const labels = {
  fr: { see: "Voir dans le glossaire →", close: "Fermer" },
  en: { see: "See in the glossary →", close: "Close" },
};

// Never touch text inside these elements: links, code, headings, buttons.
const SKIP = new Set(["a", "code", "pre", "h1", "h2", "h3", "h4", "h5", "h6", "button", "script", "style"]);

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// The words that count as the term in a text: the term itself, plus its
// alternative in brackets ("Grounding (ancrage)" -> "Grounding", "ancrage").
// A few brackets are too common in ordinary sentences and are left out.
const TOO_COMMON = new Set(["passage"]);
function formsOf(entry: Term, locale: Locale): string[] {
  const label = entry.term[locale];
  const main = label.replace(/\s*\(.*\)\s*$/, "").trim();
  const inBrackets = label.match(/\(([^)]+)\)/)?.[1]?.trim();
  return [main, inBrackets].filter((f): f is string => !!f && !TOO_COMMON.has(f.toLowerCase()));
}

// One regular expression per form:
// - not glued to another letter or digit (so "trace" does not match "tracer");
// - an optional plural s/x;
// - straight or curly apostrophe;
// - acronyms in capitals (LLM, RAG, MCP) only match in capitals.
function patternOf(form: string): RegExp {
  const body = escapeRegex(form).replace(/'/g, "['’]");
  const plural = /\p{L}$/u.test(form) ? "(?:s|x)?" : "";
  const acronym = form === form.toUpperCase() && /\p{L}/u.test(form);
  return new RegExp(`(?<![\\p{L}\\p{N}])${body}${plural}(?![\\p{L}\\p{N}])`, acronym ? "u" : "iu");
}

// The bubble, written as HTML: a button (the word) and its popover.
function bubble(entry: Term, locale: Locale, word: string): string {
  const anchor = termId(entry, locale);
  const id = `gl-${anchor}`;
  const href = `/${locale}/books/baa-101/glossary/#${anchor}`;
  return (
    `<span class="gloss">` +
    `<button type="button" class="gloss-term" popovertarget="${id}">${escapeHtml(word)}</button>` +
    `<span id="${id}" popover="auto" class="gloss-pop" role="note">` +
    `<span class="gloss-name">${escapeHtml(entry.term[locale])}</span>` +
    `<span class="gloss-def">${escapeHtml(entry.definition[locale])}</span>` +
    `<span class="gloss-actions">` +
    `<a class="gloss-link" href="${href}">${escapeHtml(labels[locale].see)}</a>` +
    `<button type="button" class="gloss-close" popovertarget="${id}" popovertargetaction="hide">${escapeHtml(labels[locale].close)}</button>` +
    `</span></span></span>`
  );
}

type Candidate = { entry: Term; re: RegExp; length: number };
const candidatesByLocale = new Map<Locale, Candidate[]>();
function candidates(locale: Locale): Candidate[] {
  if (!candidatesByLocale.has(locale)) {
    candidatesByLocale.set(
      locale,
      glossary
        .flatMap((entry) => formsOf(entry, locale).map((form) => ({ entry, re: patternOf(form), length: form.length })))
        // Longest forms first, so "Mémoire de session" wins over a shorter term.
        .sort((a, b) => b.length - a.length),
    );
  }
  return candidatesByLocale.get(locale)!;
}

// Cuts a text into plain pieces and bubbles. Each term is used once per chapter.
function split(value: string, locale: Locale, done: Set<Term>): string[] | null {
  let best: { entry: Term; index: number; length: number } | null = null;
  for (const { entry, re } of candidates(locale)) {
    if (done.has(entry)) continue;
    const m = re.exec(value);
    if (m && (!best || m.index < best.index || (m.index === best.index && m[0].length > best.length))) {
      best = { entry, index: m.index, length: m[0].length };
    }
  }
  if (!best) return null;
  done.add(best.entry);
  const after = value.slice(best.index + best.length);
  return [
    escapeHtml(value.slice(0, best.index)),
    bubble(best.entry, locale, value.slice(best.index, best.index + best.length)),
    ...(split(after, locale, done) ?? [escapeHtml(after)]),
  ];
}

const localeOf = (url: URL | undefined): Locale | null =>
  (url?.pathname.match(/\/content\/chapters\/(fr|en)\//)?.[1] as Locale | undefined) ?? null;

export const glossaryBubbles = {
  name: "glossary-bubbles",
  // Fresh memory for each chapter: which terms already have their bubble.
  before(_root: unknown, ctx: { data: Record<string, unknown> }) {
    ctx.data.glossaryDone = new Set<Term>();
  },
  text(node: { value: string }, ctx: any) {
    const locale = localeOf(ctx.fileURL);
    if (!locale) return; // not a chapter: leave it alone

    // Skip text inside a link, code, a heading or a button.
    for (let p = ctx.parent(node); p; p = ctx.parent(p)) {
      if (p.type === "element" && SKIP.has(p.tagName)) return;
    }

    const pieces = split(node.value, locale, ctx.data.glossaryDone as Set<Term>);
    if (pieces) ctx.replaceNode(node, { type: "raw", value: pieces.join("") });
  },
};
