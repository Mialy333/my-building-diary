// Stack and certifications: one place for the About page and the book pages.
// Every proof points to where the tool was really used, as told by the runbooks
// (AWS projects 1-3, Dev3Pack). A tool without proof is shown without a link.
import type { Locale } from "../i18n/ui";
import { books, bookUrl, chapterUrl } from "./books";

type L = Record<Locale, string>;

// A proof: a chapter of a book on this site, or an outside page (a repo).
export type Proof = { label: string; book: string; chapter?: number } | { label: string; url: string };

export interface StackItem {
  name: string;
  detail?: L; // what exactly was used, in a few words
  proofs: Proof[];
}

export interface StackGroup {
  title: L;
  items: StackItem[];
}

const aws = (n: number): Proof => ({ label: `AWS ${n}`, book: "aws-scholars", chapter: n });
const d3p = (n: number, label: string): Proof => ({ label, book: "dev3pack", chapter: n });

export const stack: StackGroup[] = [
  {
    title: { fr: "Langages", en: "Languages" },
    items: [
      { name: "Python", proofs: [aws(1), aws(2), aws(3), { label: "Dev3Pack", book: "dev3pack" }] },
      {
        name: "TypeScript",
        detail: { fr: "ce site, en Astro", en: "this site, in Astro" },
        proofs: [{ label: "GitHub", url: "https://github.com/Mialy333/my-building-library" }],
      },
      {
        name: "JavaScript",
        detail: { fr: "front de démo NovaMart (connexion Cognito)", en: "NovaMart demo front end (Cognito sign-in)" },
        proofs: [{ label: "GitHub", url: "https://github.com/Mialy333/novamart-multi-agent-support" }],
      },
      { name: "React", proofs: [] },
    ],
  },
  {
    title: { fr: "AWS", en: "AWS" },
    items: [
      {
        name: "Amazon Bedrock AgentCore",
        detail: { fr: "Runtime, Gateway (MCP), Memory, harness managé", en: "Runtime, Gateway (MCP), Memory, managed harness" },
        proofs: [aws(1), aws(2), aws(3)],
      },
      { name: "Bedrock Knowledge Bases", detail: { fr: "RAG, S3 Vectors", en: "RAG, S3 Vectors" }, proofs: [aws(2), aws(3)] },
      { name: "Bedrock Guardrails", proofs: [aws(3)] },
      { name: "Bedrock Evaluations", detail: { fr: "LLM-as-judge", en: "LLM-as-judge" }, proofs: [aws(1)] },
      { name: "AWS Lambda", proofs: [aws(1), aws(2), aws(3)] },
      { name: "Amazon API Gateway", proofs: [aws(2)] },
      { name: "Amazon DynamoDB", proofs: [aws(1), aws(3)] },
      { name: "Amazon S3", proofs: [aws(1), aws(2), aws(3)] },
      { name: "AWS CloudFormation", proofs: [aws(1), aws(3)] },
      { name: "CloudWatch & X-Ray", detail: { fr: "logs, traces, tableau de bord", en: "logs, traces, dashboard" }, proofs: [aws(3)] },
      { name: "Amazon Cognito", proofs: [aws(3)] },
    ],
  },
  {
    title: { fr: "Agents", en: "Agents" },
    items: [
      { name: "Strands Agents", proofs: [aws(2), aws(3)] },
      { name: "MCP", proofs: [aws(1), aws(2), d3p(12, "Dev3Pack S12"), d3p(13, "S13"), d3p(17, "Gecko")] },
      { name: "Ollama", detail: { fr: "modèles locaux (Qwen 2.5)", en: "local models (Qwen 2.5)" }, proofs: [d3p(2, "Dev3Pack S2"), d3p(16, "Final")] },
    ],
  },
];

export interface Certification {
  title: string;
  kind: L;
  issuer: string;
  date: L;
  book: string; // the book that tells this programme
  verify: { label: L; url: string };
  id?: string;
}

export const certifications: Certification[] = [
  {
    title: "Future AWS Agent Engineer",
    kind: { fr: "Nanodegree", en: "Nanodegree" },
    issuer: "Udacity · AWS & AI Scholars",
    date: { fr: "6 octobre 2026", en: "October 6, 2026" },
    book: "aws-scholars",
    verify: { label: { fr: "Vérifier", en: "Verify" }, url: "https://www.udacity.com/certificate/e/c2ce036c-900d-11f1-adc8-3f80681b4872" },
  },
  {
    title: "AI Engineering Bootcamp",
    kind: { fr: "Certificat de fin de parcours", en: "Certificate of completion" },
    issuer: "Dev3Pack",
    date: { fr: "octobre 2026", en: "October 2026" },
    book: "dev3pack",
    id: "0MEIAR4GV9KF",
    verify: {
      label: { fr: "Résultat officiel", en: "Official result" },
      url: "https://github.com/Gecko-Academy/dev3pack-submissions/blob/main/finals/Mialy333/result.json",
    },
  },
];

// Turns a proof into a link for the current language.
export function proofHref(proof: Proof, locale: Locale): string | null {
  if ("url" in proof) return proof.url;
  const book = books.find((b) => b.slug === proof.book);
  if (!book) return null;
  if (proof.chapter === undefined) return bookUrl(locale, book);
  const chapter = book.chapters.find((c) => c.number === proof.chapter);
  return chapter?.published ? chapterUrl(locale, book, chapter) : null;
}

export const certificationOf = (bookSlug: string) => certifications.find((c) => c.book === bookSlug);
