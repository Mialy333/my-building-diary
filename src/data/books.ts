import type { Locale } from "../i18n/ui";

export type BookColor = "sage" | "apricot" | "rose";
export type Shelf = "fundamentals" | "journeys" | "path" | "builds";
export const shelfOrder: Shelf[] = ["fundamentals", "journeys", "path", "builds"];

export interface Chapter {
  number: number;
  kind: "day" | "chapter";
  title: Record<Locale, string>;
  published: boolean;
}

export interface Cover {
  title: Record<Locale, string>;
  accent: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  info: Record<Locale, string>;
  bars: number[];
}

export interface Book {
  slug: string;
  name: Record<Locale, string>;
  shelf: Shelf;
  color?: BookColor;
  living?: boolean;
  forthcoming?: boolean;
  total?: number;
  tags?: string[];
  description?: Record<Locale, string>;
  cover: Cover;
  chapters: Chapter[];
}

export const books: Book[] = [
  {
    slug: "baa-101",
    name: { fr: "BAA 101", en: "BAA 101" },
    shelf: "fundamentals",
    color: "sage",
    living: true,
    description: {
      fr: "Les fondamentaux des agents IA, tirés de ce que les journeys m'apprennent.",
      en: "The fundamentals of AI agents, drawn from what the journeys teach me.",
    },
    cover: {
      title: { fr: "BAA ", en: "BAA " },
      accent: { fr: "101", en: "101" },
      subtitle: { fr: "Building AI Agents 101", en: "Building AI Agents 101" },
      info: { fr: "FR·EN", en: "FR·EN" },
      bars: [30, 55, 80, 100],
    },
    chapters: [
      { number: 1, kind: "chapter", title: { fr: "Instructions de repo", en: "Repo instructions" }, published: false },
    ],
  },
  {
    slug: "aws-scholars",
    name: { fr: "AWS Scholars", en: "AWS Scholars" },
    shelf: "journeys",
    color: "apricot",
    total: 3,
    cover: {
      title: { fr: "Future Agent ", en: "Future Agent " },
      accent: { fr: "Engineer", en: "Engineer" },
      subtitle: { fr: "AWS & AI Scholars", en: "AWS & AI Scholars" },
      info: { fr: "AWS", en: "AWS" },
      bars: [70, 45, 90],
    },
    chapters: [
      { number: 1, kind: "chapter", title: { fr: "Customer Support Chatbot with Amazon Bedrock AgentCore", en: "Customer Support Chatbot with Amazon Bedrock AgentCore" }, published: true },
      { number: 2, kind: "chapter", title: { fr: "AI Support Agent", en: "AI Support Agent" }, published: true },
      { number: 3, kind: "chapter", title: { fr: "[…]", en: "[…]" }, published: false },
    ],
  },
  {
    slug: "dev3pack",
    name: { fr: "Dev3Pack", en: "Dev3Pack" },
    shelf: "journeys",
    color: "rose",
    total: 21,
    cover: {
      title: { fr: "Dev3", en: "Dev3" },
      accent: { fr: "Pack", en: "Pack" },
      subtitle: { fr: "AI Engineering Bootcamp", en: "AI Engineering Bootcamp" },
      info: { fr: "3 SEM.", en: "3 WKS" },
      bars: [25, 60, 40, 85],
    },
    chapters: [
      { number: 1, kind: "day", title: { fr: "Configurer l'assistant", en: "Setting up the assistant" }, published: true },
    ],
  },
  {
    slug: "my-path",
    name: { fr: "Mon parcours", en: "My path" },
    shelf: "path",
    forthcoming: true,
    description: {
      fr: "De la gestion d'actifs à l'AI Engineering.",
      en: "From asset management to AI engineering.",
    },
    cover: {
      title: { fr: "Mon ", en: "My " },
      accent: { fr: "parcours", en: "path" },
      subtitle: { fr: "", en: "" },
      info: { fr: "", en: "" },
      bars: [],
    },
    chapters: [],
  },
];

export const pad = (n: number) => String(n).padStart(2, "0");

export const publishedCount = (book: Book) => book.chapters.filter((c) => c.published).length;

export const progressPercent = (book: Book) =>
  book.total ? Math.round((publishedCount(book) / book.total) * 100) : 0;

export const isInProgress = (book: Book) =>
  !book.living && !book.forthcoming && !!book.total && publishedCount(book) < book.total;

export const bookNumber = (book: Book) => pad(books.indexOf(book) + 1);

export const bookUrl = (locale: Locale, book: Book) => `/${locale}/books/${book.slug}/`;

export const chapterUrl = (locale: Locale, book: Book, chapter: Chapter) =>
  `/${locale}/books/${book.slug}/${chapter.kind}-${pad(chapter.number)}/`;

export function latestChapters() {
  return books
    .flatMap((book) => book.chapters.filter((c) => c.published).map((chapter) => ({ book, chapter })))
    .reverse();
}

export const stats = {
  openBooks: books.filter((b) => !b.forthcoming).length,
  publishedChapters: books.reduce((n, b) => n + publishedCount(b), 0),
  livingBooks: books.filter((b) => b.living).length,
};
