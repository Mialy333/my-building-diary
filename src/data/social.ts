// Mialy's profiles: one place for the footer and the About page.
// `href` opens the profile; Discord has no public profile address by
// username, so its button copies the username instead.
//
// Icons: Tabler Icons (MIT licence, © Paweł Kuna, tabler.io/icons), outline
// style, 24×24 grid; only the path data is kept here. Dev.to is not in
// Tabler, so it is shown as the text "DEV".
export interface Social {
  label: string;
  handle: string;
  href?: string;
  icon?: string[]; // SVG path data, drawn with a stroke
  text?: string; // shown instead of an icon
}

export const socials: Social[] = [
  {
    label: "LinkedIn",
    handle: "mialyratsimbazafy75",
    href: "https://www.linkedin.com/in/mialyratsimbazafy75",
    icon: [
      "M8 11v5", "M8 8v.01", "M12 16v-5", "M16 16v-3a2 2 0 1 0 -4 0",
      "M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10",
    ],
  },
  {
    label: "GitHub",
    handle: "Mialy333",
    href: "https://github.com/Mialy333",
    icon: [
      "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5",
    ],
  },
  {
    label: "X",
    handle: "@ellebuild",
    href: "https://x.com/ellebuild",
    icon: ["M4 4l11.733 16h4.267l-11.733 -16l-4.267 0", "M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"],
  },
  { label: "Dev.to", handle: "mialy333", href: "https://dev.to/mialy333", text: "DEV" },
  {
    label: "Discord",
    handle: "mialyratsimbazafy_75",
    icon: [
      "M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0", "M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0",
      "M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3",
      "M7 16.5c3.5 1 6.5 1 10 0",
    ],
  },
];
