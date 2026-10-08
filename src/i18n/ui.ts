export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

const en = {
  "lang.label": "Language",
  "lang.fr": "Français",
  "lang.en": "English",
  "hero.kicker": "Building diary · 3 chapters published",
  "hero.subtitle":
    "Agents that <strong>cite their sources</strong>, <strong>refuse</strong> when nothing backs the answer, and leave a <strong>trace you can audit</strong>.",
  "hero.cta": "Open the shelf",
  "hero.baa": "BAA 101, the book of basics",
};

const fr: Record<keyof typeof en, string> = {
  "lang.label": "Langue",
  "lang.fr": "Français",
  "lang.en": "English",
  "hero.kicker": "Journal de bord · 3 chapitres publiés",
  "hero.subtitle":
    "Des agents qui <strong>citent leurs sources</strong>, <strong>refusent</strong> quand rien ne soutient la réponse, et laissent une <strong>trace vérifiable</strong>.",
  "hero.cta": "Ouvrir l'étagère",
  "hero.baa": "BAA 101, le livre des bases",
};

export const ui = { en, fr };
export type UiKey = keyof typeof en;

export function useTranslations(locale: Locale) {
  return (key: UiKey) => ui[locale][key];
}

export function getLocale(current: string | undefined): Locale {
  return current === "fr" ? "fr" : "en";
}
