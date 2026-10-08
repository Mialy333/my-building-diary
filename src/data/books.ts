import type { Locale } from "../i18n/ui";

export type BookColor = "sage" | "apricot" | "rose";
export type Shelf = "fundamentals" | "journeys" | "path";

export interface Chapter {
  number: number;
  kind: "day" | "chapter";
  title: Record<Locale, string>;
  published: boolean;
}

export interface Book {
  slug: string;
  name: Record<Locale, string>;
  shelf: Shelf;
  color?: BookColor;
  living?: boolean;
  forthcoming?: boolean;
  total?: number;
  chapters: Chapter[];
}

export const books: Book[] = [
  {
    slug: "baa-101",
    name: { fr: "BAA 101", en: "BAA 101" },
    shelf: "fundamentals",
    color: "sage",
    living: true,
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
    chapters: [
      { number: 1, kind: "day", title: { fr: "Configurer l'assistant", en: "Setting up the assistant" }, published: true },
    ],
  },
  {
    slug: "my-path",
    name: { fr: "Mon parcours", en: "My path" },
    shelf: "path",
    forthcoming: true,
    chapters: [],
  },
];

export const pad = (n: number) => String(n).padStart(2, "0");

export const chapterUrl = (locale: Locale, book: Book, chapter: Chapter) =>
  `/${locale}/books/${book.slug}/${chapter.kind}-${pad(chapter.number)}/`;

export function latestChapters() {
  return books
    .flatMap((book) =>
      book.chapters.filter((c) => c.published).map((chapter) => ({ book, chapter })),
    )
    .reverse();
}

export const stats = {
  openBooks: books.filter((b) => !b.forthcoming).length,
  publishedChapters: books.reduce((n, b) => n + b.chapters.filter((c) => c.published).length, 0),
  livingBooks: books.filter((b) => b.living).length,
};
