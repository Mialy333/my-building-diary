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
  concepts?: number[];
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

const concept = (number: number, fr: string, en: string, extra: Partial<Chapter> = {}): Chapter => ({
  number, kind: "chapter", title: { fr, en }, published: false, ...extra,
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
      concept(1, "Vérifier l'effet, pas la parole", "Verify the effect, not the claim", { published: true }),
      concept(2, "La boucle d'agent et ses sorties", "The agent loop and its exits", { published: true }),
      concept(3, "L'outil vu par le modèle", "The tool as the model sees it", { published: true }),
      concept(4, "Une donnée n'est jamais un ordre", "Data is never an order", { published: true }),
      concept(5, "La sortie du modèle est une donnée non fiable", "The model's output is untrusted data", { published: true }),
      concept(6, "Le refus est un état", "Refusal is a state", { published: true }),
      concept(7, "La bonne page doit arriver", "The right page must arrive", { published: true }),
      concept(8, "Lire l'appel d'outil, pas la réponse", "Read the tool call, not the answer", { published: true }),
      concept(9, "Évaluer sans se mentir", "Evaluate without lying to yourself", { published: true }),
      concept(10, "La mémoire a un propriétaire", "Memory has an owner", { published: true }),
      concept(11, "Ce qui doit toujours arriver s'impose dans le code", "What must always happen is enforced in code", { published: true }),
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
        concepts: [1, 4, 9, 11],
        teaser: {
          fr: "Tout le routage dans le prompt, 0.92 à l'évaluation, et des numéros de ticket inventés que seul DynamoDB a révélés.",
          en: "All routing in the prompt, 0.92 on evaluation, and invented ticket numbers that only DynamoDB revealed.",
        },
        repo: "https://github.com/Mialy333/support-chatbot-bedrock-agentcore",
      },
      {
        number: 2, kind: "chapter", published: true,
        title: { fr: "AI Support Agent", en: "AI Support Agent" },
        concepts: [2, 3, 8, 10],
        teaser: {
          fr: "Six outils, quatre sources, une infrastructure montée à la main : valider chaque couche seule avant de l'empiler.",
          en: "Six tools, four sources, infrastructure built by hand: validate each layer alone before stacking it.",
        },
        repo: "https://github.com/Mialy333/agentcore-customer-support-agent",
      },
      {
        number: 3, kind: "chapter", published: true,
        title: { fr: "NovaMart Multi-Agent Support", en: "NovaMart Multi-Agent Support" },
        concepts: [4, 8, 10, 11],
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
        concepts: [1],
        teaser: {
          fr: "Un filtre tags, deux changements refusés, et une règle : seul le diff fait foi.",
          en: "A tags filter, two rejected changes, and one rule: only the diff counts.",
        },
      }),
      session(2, "L'adapter de modèle", "The model adapter", {
        published: true,
        concepts: [6],
        teaser: {
          fr: "Une seule porte vers tous les modèles, une panne qui devient un refus, et un délai fixé par la mesure.",
          en: "One door to every model, an outage that becomes a refusal, and a timeout set by measurement.",
        },
      }),
      session(3, "Sorties structurées", "Structured outputs", {
        published: true,
        concepts: [4, 5, 6],
        teaser: {
          fr: "Un parser strict, un seul retry, et un golden set testé avant d'être étiqueté.",
          en: "A strict parser, a single retry, and a golden set tested before it's labeled.",
        },
      }),
      session(4, "Outils bornés", "Bounded tools", {
        published: true,
        concepts: [3, 4],
        teaser: {
          fr: "Un outil valide avant d'agir, et ce qu'il renvoie est une donnée, jamais un ordre.",
          en: "A tool validates before acting, and what it returns is data, never an order.",
        },
      }),
      session(5, "Mini-agent déterministe", "A deterministic mini-agent", {
        published: true,
        concepts: [2],
        teaser: {
          fr: "Une boucle qui s'arrête toujours, en disant pourquoi : quatre sorties, un budget compté avant l'appel.",
          en: "A loop that always stops, and says why: four exits, a budget counted before the call.",
        },
      }),
      session(6, "Baseline de récupération", "Retrieval baseline", {
        published: true,
        concepts: [6, 7],
        teaser: {
          fr: "Une recherche par mots, un chargeur qui refuse, et des verdicts lus dans les résultats, pas dans le score.",
          en: "A word-based search, a loader that refuses, and verdicts read in the results, not in the score.",
        },
      }),
      session(7, "Métriques de récupération et d'ancrage", "Retrieval and grounding metrics", {
        published: true,
        concepts: [7, 9],
        teaser: {
          fr: "Un correctif à 100 % qui casse les cas inédits, et un faux modèle tricheur qui obtient 50 %.",
          en: "A fix at 100% that breaks unseen cases, and a cheating fake model that scores 50%.",
        },
      }),
      session(8, "Boucles et graphes", "Loops and graphs", {
        published: true,
        concepts: [2],
        teaser: {
          fr: "Chaîne, boucle ou réflexion : compter les appels, et une table où un refus ne devient jamais une réponse.",
          en: "Chain, loop or reflection: count the calls, and a table where a refusal never becomes an answer.",
        },
      }),
      session(9, "Tracer et évaluer", "Tracing and evaluation", {
        published: true,
        concepts: [8],
        teaser: {
          fr: "La trace dit où est la panne, et les secrets y entrent masqués, jamais supprimés.",
          en: "The trace says where the failure is, and secrets go in masked, never deleted.",
        },
      }),
      session(10, "Skills et ADR", "Skills and ADRs", {
        published: true,
        concepts: [4],
        teaser: {
          fr: "Un acheteur qui refuse avant de payer, un ADR avec son seuil de retour, et un skill jugé sur preuve.",
          en: "A buyer that refuses before paying, an ADR with its reversal threshold, and a skill judged on evidence.",
        },
      }),
      session(11, "État et mémoire", "State and memory", {
        published: true,
        concepts: [10],
        teaser: {
          fr: "Une mémoire rangée par propriétaire, plafonnée, et une politique écrite avant le premier enregistrement.",
          en: "Memory filed by owner, capped, with a policy written before the first record.",
        },
      }),
      session(12, "Architecture MCP", "MCP architecture", {
        published: true,
        concepts: [3],
        teaser: {
          fr: "Seize outils annoncés, deux qui font bouger l'argent : lire un serveur MCP comme un prospectus.",
          en: "Sixteen advertised tools, two that move money: reading an MCP server like a prospectus.",
        },
      }),
      session(13, "Sécuriser un serveur MCP", "Securing an MCP server", {
        published: true,
        concepts: [3],
        teaser: {
          fr: "Décider avant d'ouvrir la connexion, et ne cocher une attestation que si elle est vraie.",
          en: "Decide before opening the connection, and tick an attestation only if it's true.",
        },
      }),
      session(14, "Déployer et exploiter", "Deploying and operating", {
        published: true,
        teaser: {
          fr: "Un smoke test doit pouvoir échouer, et la phrase de rollback s'écrit avant la panne.",
          en: "A smoke test must be able to fail, and the rollback sentence is written before the outage.",
        },
      }),
      {
        number: 15, kind: "step", code: "cap01", slug: "cap01", published: true,
        concepts: [9],
        title: { fr: "Notebook du final", en: "The final's notebook" },
        teaser: {
          fr: "Une évaluation verte sur un faux modèle prouve la tuyauterie, pas la fiabilité.",
          en: "A green evaluation on a fake model proves the plumbing, not reliability.",
        },
      },
      {
        number: 16, kind: "step", code: "Final", slug: "final", published: true,
        concepts: [5, 7, 9, 11],
        title: { fr: "Final assignment", en: "Final assignment" },
        teaser: {
          fr: "Quatre retouches de prompt sans effet stable, puis une idée : le modèle choisit, le code recopie. 15/15.",
          en: "Four prompt tweaks with no stable effect, then one idea: the model chooses, the code copies. 15/15.",
        },
        repo: "https://github.com/Mialy333/grounded-research-agent",
      },
      {
        number: 17, kind: "step", code: "Gecko", slug: "gecko", published: true,
        concepts: [1, 4, 6, 11],
        title: { fr: "Gecko capstone", en: "Gecko capstone" },
        teaser: {
          fr: "Un acheteur qui épingle la demande, vérifie chaque champ, et ne signe que si tout concorde : un vrai achat sur devnet.",
          en: "A buyer that pins the request, checks every field, and signs only if everything matches: a real purchase on devnet.",
        },
        repo: "https://github.com/Mialy333/my-gecko-buyer",
      },
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

export const baa = books.find((b) => b.slug === "baa-101");

export const conceptsOf = (chapter: Chapter): Chapter[] =>
  (chapter.concepts ?? [])
    .map((n) => baa?.chapters.find((c) => c.number === n))
    .filter((c): c is Chapter => c !== undefined);

export const appliedIn = (concept: Chapter) =>
  books
    .filter((b) => b !== baa)
    .flatMap((b) =>
      b.chapters
        .filter((c) => c.published && (c.concepts ?? []).includes(concept.number))
        .map((chapter) => ({ book: b, chapter })),
    );

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
