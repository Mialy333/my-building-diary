export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

const en = {
  "lang.label": "Language",
  "lang.fr": "Français",
  "lang.en": "English",
  "hero.kicker": "Building diary",
  "hero.subtitle":
    "Agents that <strong>cite their sources</strong>, <strong>refuse</strong> when nothing backs the answer, and leave a <strong>trace you can audit</strong>.",
  "hero.cta": "Open the shelf",
  "hero.baa": "BAA 101, the book of basics",
  "loop.label": "How my agents work",
  "loop.audit": "audit",
  "loop.retrieve": "Retrieve",
  "loop.cite": "Cite",
  "loop.or": "or",
  "loop.refuse": "Refuse",
  "loop.trace": "Trace",
  "stats.books.one": "book open",
  "stats.books.other": "books open",
  "stats.chapters.one": "chapter published",
  "stats.chapters.other": "chapters published",
  "stats.living.one": "living book",
  "stats.living.other": "living books",
  "latest.title": "Latest <em>pages</em>",
  "latest.all": "The whole shelf →",
  "label.day": "Day",
  "label.chapter": "Chapter",
  "author.kicker": "Who writes",
  "author.line": "AI/Agent Engineer, <em>after ten years in asset management.</em>",
  "author.photo": "Photo coming · arch 4:5",
  "author.about": "About →",
  "footer.about": "About",
  "footer.blog": "Blog",
};

const fr: Record<keyof typeof en, string> = {
  "lang.label": "Langue",
  "lang.fr": "Français",
  "lang.en": "English",
  "hero.kicker": "Journal de bord",
  "hero.subtitle":
    "Des agents qui <strong>citent leurs sources</strong>, <strong>refusent</strong> quand rien ne soutient la réponse, et laissent une <strong>trace vérifiable</strong>.",
  "hero.cta": "Ouvrir l'étagère",
  "hero.baa": "BAA 101, le livre des bases",
  "loop.label": "Comment fonctionnent mes agents",
  "loop.audit": "auditer",
  "loop.retrieve": "Récupérer",
  "loop.cite": "Citer",
  "loop.or": "ou",
  "loop.refuse": "Refuser",
  "loop.trace": "Tracer",
  "stats.books.one": "livre ouvert",
  "stats.books.other": "livres ouverts",
  "stats.chapters.one": "chapitre publié",
  "stats.chapters.other": "chapitres publiés",
  "stats.living.one": "livre vivant",
  "stats.living.other": "livres vivants",
  "latest.title": "Dernières <em>pages</em>",
  "latest.all": "Toute l'étagère →",
  "label.day": "Day",
  "label.chapter": "Chapitre",
  "author.kicker": "Qui écrit",
  "author.line": "AI/Agent Engineer, <em>après dix ans en gestion d'actifs.</em>",
  "author.photo": "Photo à venir · arche 4:5",
  "author.about": "À propos →",
  "footer.about": "À propos",
  "footer.blog": "Blog",
};

export const ui = { en, fr };
export type UiKey = keyof typeof en;

export function useTranslations(locale: Locale) {
  return (key: UiKey) => ui[locale][key];
}

export function getLocale(current: string | undefined): Locale {
  return current === "fr" ? "fr" : "en";
}

export const plural = (n: number, one: string, other: string) => (n === 1 ? one : other);
