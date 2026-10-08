import type { Locale, UiKey } from "../i18n/ui";

export type BookColor = "sage" | "apricot" | "rose";
export type Shelf = "fundamentals" | "journeys" | "path" | "builds";
export const shelfOrder: Shelf[] = ["fundamentals", "journeys", "path", "builds"];

type L = Record<Locale, string>;

export interface Chapter {
  number: number;
  kind: "chapter" | "session" | "step";
  code?: string;
  slug?: string;
  title: L;
  published: boolean;
  teaser?: L;
  concept?: number;
  repo?: string;
}

export interface Book {
  slug: string;
  name: L;
  shelf: Shelf;
  color?: BookColor;
  living?: boolean;
  forthcoming?: boolean;
  gauge?: boolean;
  tags?: string[];
  description?: L;
  heading: { text: L; accent: L };
  meta?: L;
  summary?: Record<Locale, string[]>;
  callout?: { label: L; text: L };
  repo?: string;
  cover: { title: L; accent: L; subtitle: L; info: L; bars: number[] };
  chapters: Chapter[];
}

const session = (number: number, fr: string, en: string, extra: Partial<Chapter> = {}): Chapter => ({
  number, kind: "session", title: { fr, en }, published: false, ...extra,
});

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
    heading: { text: { fr: "Building AI Agents ", en: "Building AI Agents " }, accent: { fr: "101", en: "101" } },
    summary: {
      fr: ["Les bases pour construire un agent IA, et seulement les bases. Chaque chapitre vient d'une leçon apprise sur un vrai projet, puis en est détaché pour valoir pour n'importe quel agent."],
      en: ["The basics of building an AI agent, and only the basics. Each chapter comes from a lesson learned on a real project, then is stripped of its specifics so it holds for any agent."],
    },
    callout: {
      label: { fr: "Règle d'entrée", en: "Entry rule" },
      text: {
        fr: "Un concept entre ici seulement s'il vaut pour <em>n'importe quel agent</em>, quels que soient le framework, le cloud ou le modèle.",
        en: "A concept gets in only if it holds for <em>any agent</em>, whatever the framework, the cloud or the model.",
      },
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
    gauge: true,
    heading: { text: { fr: "Future Agent ", en: "Future Agent " }, accent: { fr: "Engineer", en: "Engineer" } },
    meta: { fr: "AWS & AI Scholars · Udacity · 3 projets validés", en: "AWS & AI Scholars · Udacity · 3 projects approved" },
    summary: {
      fr: [
        "Le parcours Future Agent Engineer du programme AWS & AI Scholars : trois projets de support client sur Amazon Bedrock AgentCore, tous validés par le mentor Udacity.",
        "Un chatbot dont tout le routage vit dans le prompt système, puis un agent Strands avec outils, RAG et mémoire long terme, puis un système de cinq agents qui coopèrent derrière un guardrail.",
      ],
      en: [
        "The Future Agent Engineer track of the AWS & AI Scholars program: three customer support projects on Amazon Bedrock AgentCore, all approved by the Udacity mentor.",
        "A chatbot whose routing lives entirely in its system prompt, then a Strands agent with tools, RAG and long-term memory, then a system of five cooperating agents behind a guardrail.",
      ],
    },
    callout: {
      label: { fr: "Fil rouge", en: "Common thread" },
      text: { fr: "Lire l'appel d'outil, <em>pas la réponse.</em>", en: "Read the tool call, <em>not the answer.</em>" },
    },
    cover: {
      title: { fr: "Future Agent ", en: "Future Agent " },
      accent: { fr: "Engineer", en: "Engineer" },
      subtitle: { fr: "AWS & AI Scholars", en: "AWS & AI Scholars" },
      info: { fr: "AWS", en: "AWS" },
      bars: [70, 45, 90],
    },
    chapters: [
      {
        number: 1, kind: "chapter", published: true,
        title: { fr: "Customer Support Chatbot with Amazon Bedrock AgentCore", en: "Customer Support Chatbot with Amazon Bedrock AgentCore" },
        teaser: {
          fr: "Tout le routage dans le prompt, 0.92 à l'évaluation, et des numéros de ticket inventés que seul DynamoDB a révélés.",
          en: "All routing in the prompt, 0.92 on evaluation, and invented ticket numbers that only DynamoDB revealed.",
        },
        repo: "https://github.com/Mialy333/support-chatbot-bedrock-agentcore",
      },
      {
        number: 2, kind: "chapter", published: true,
        title: { fr: "AI Support Agent", en: "AI Support Agent" },
        teaser: {
          fr: "Six outils, quatre sources, une infrastructure montée à la main : valider chaque couche seule avant de l'empiler.",
          en: "Six tools, four sources, infrastructure built by hand: validate each layer alone before stacking it.",
        },
        repo: "https://github.com/Mialy333/agentcore-customer-support-agent",
      },
      {
        number: 3, kind: "chapter", published: false,
        title: { fr: "NovaMart Multi-Agent Support", en: "NovaMart Multi-Agent Support" },
        teaser: {
          fr: "Cinq agents Strands, trois Knowledge Bases interrogées en parallèle, un guardrail : 120/120.",
          en: "Five Strands agents, three knowledge bases queried in parallel, one guardrail: 120/120.",
        },
        repo: "https://github.com/Mialy333/novamart-multi-agent-support",
      },
    ],
  },
  {
    slug: "dev3pack",
    name: { fr: "Dev3Pack", en: "Dev3Pack" },
    shelf: "journeys",
    color: "rose",
    gauge: true,
    heading: { text: { fr: "Dev3Pack AI Engineering ", en: "Dev3Pack AI Engineering " }, accent: { fr: "Bootcamp", en: "Bootcamp" } },
    meta: { fr: "14.09 → 02.10.2026 · Certificat obtenu", en: "14.09 → 02.10.2026 · Certificate earned" },
    summary: {
      fr: [
        "Trois semaines pour construire un assistant de recherche « source-grounded » : il répond à des questions de développeur à partir de six documents, cite le document utilisé, et refuse quand rien ne soutient la réponse.",
        "Bootcamp terminé : 5 100/5 100 points sur le parcours, final assignment à 100 %, certificat obtenu.",
      ],
      en: [
        "Three weeks to build a source-grounded research assistant: it answers developer questions from six documents, cites the document it used, and refuses when nothing backs the answer.",
        "Bootcamp completed: 5,100/5,100 points on the track, final assignment at 100%, certificate earned.",
      ],
    },
    callout: {
      label: { fr: "Fil rouge", en: "Common thread" },
      text: {
        fr: "Un agent que l'on a construit, testé, et que l'on <em>sait défendre.</em>",
        en: "An agent you built, tested, and <em>can defend.</em>",
      },
    },
    repo: "https://github.com/Mialy333/dev3pack-submissions/tree/ch01/submissions/Mialy333",
    cover: {
      title: { fr: "Dev3", en: "Dev3" },
      accent: { fr: "Pack", en: "Pack" },
      subtitle: { fr: "AI Engineering Bootcamp", en: "AI Engineering Bootcamp" },
      info: { fr: "3 SEM.", en: "3 WKS" },
      bars: [25, 60, 40, 85],
    },
    chapters: [
      session(1, "Configurer l'assistant", "Setting up the assistant", {
        published: true,
        concept: 1,
        teaser: {
          fr: "Un filtre tags, deux changements refusés, et une règle : seul le diff fait foi.",
          en: "A tags filter, two rejected changes, and one rule: only the diff counts.",
        },
      }),
      session(2, "L'adapter de modèle", "The model adapter"),
      session(3, "Sorties structurées", "Structured outputs"),
      session(4, "Outils bornés", "Bounded tools"),
      session(5, "Mini-agent déterministe", "A deterministic mini-agent"),
      session(6, "Baseline de récupération", "Retrieval baseline"),
      session(7, "Métriques de récupération et d'ancrage", "Retrieval and grounding metrics"),
      session(8, "Boucles et graphes", "Loops and graphs"),
      session(9, "Tracer et évaluer", "Tracing and evaluation"),
      session(10, "Skills et ADR", "Skills and ADRs"),
      session(11, "État et mémoire", "State and memory"),
      session(12, "Architecture MCP", "MCP architecture"),
      session(13, "Sécuriser un serveur MCP", "Securing an MCP server"),
      session(14, "Déployer et exploiter", "Deploying and operating"),
      { number: 15, kind: "step", code: "cap01", slug: "cap01", title: { fr: "Notebook du final", en: "The final's notebook" }, published: false },
      { number: 16, kind: "step", code: "Final", slug: "final", title: { fr: "Final assignment", en: "Final assignment" }, published: false, repo: "https://github.com/Mialy333/grounded-research-agent" },
      { number: 17, kind: "step", code: "Gecko", slug: "gecko", title: { fr: "Gecko capstone", en: "Gecko capstone" }, published: false, repo: "https://github.com/Mialy333/my-gecko-buyer" },
    ],
  },
  {
    slug: "my-path",
    name: { fr: "Mon parcours", en: "My path" },
    shelf: "path",
    forthcoming: true,
    description: { fr: "De la gestion d'actifs à l'AI Engineering.", en: "From asset management to AI engineering." },
    heading: { text: { fr: "Mon ", en: "My " }, accent: { fr: "parcours", en: "path" } },
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
  book.chapters.length ? Math.round((publishedCount(book) / book.chapters.length) * 100) : 0;
export const isInProgress = (book: Book) =>
  !!book.gauge && publishedCount(book) < book.chapters.length;
export const bookNumber = (book: Book) => pad(books.indexOf(book) + 1);
export const bookUrl = (locale: Locale, book: Book) => `/${locale}/books/${book.slug}/`;
export const chapterUrl = (locale: Locale, book: Book, chapter: Chapter) =>
  `/${locale}/books/${book.slug}/${chapter.slug ?? `${chapter.kind}-${pad(chapter.number)}`}/`;
export const chapterLabel = (chapter: Chapter, t: (key: UiKey) => string) =>
  chapter.code ?? `${t(chapter.kind === "session" ? "label.session" : "label.chapter")} ${pad(chapter.number)}`;

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
