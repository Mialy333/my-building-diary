# My Building Diary — Design decisions (V2)

Référence pour toutes les sessions (design et code Astro).
Source : maquette mobile V2 « Papier & prune », figée le 29 sep 2026. Elle comporte 5 écrans : accueil, étagère, page Dev3Pack en clair et en sombre, page BAA 101.
Cette version remplace entièrement la V1 retro-futuriste (Néon indigo, sphères, grille).

## 1. Principes

- **Direction.** Style éditorial print, doux et personnel, sans rien de gamin. Le site doit se lire comme un journal de bord : papier, encre, ruban marque-page.
- **Références.** Krabat.ai (serif condensé, labels mono, boucle) et les publicités Apple des années 80 (papier blanc, titre qui domine, ton humain).
  - On garde l'esprit de ces références, jamais leurs signatures.
- **Une seule palette pour tout le site.** Les zones « vitrine » (accueil, étagère, couvertures, en-têtes) se distinguent par la mise en page : grands titres, ombres, couvertures. Les zones « lecture » (résumé, chapitres, blog) se distinguent par leur colonne sobre en Newsreader.
- **Mobile d'abord.** Les maquettes font 390 px de large.

## 2. Couleurs

### 2.1 Clair (par défaut)

| Token | Hex | Usage |
| --- | --- | --- |
| `--paper` | `#FBF7F3` | Fond de page |
| `--card` | `#FFFFFF` | Cartes, couvertures, bloc repliable |
| `--ink` | `#231A22` | Texte principal, bordure des couvertures |
| `--ink-soft` | `#4A3F47` | Sous-titres, teasers |
| `--ink-muted` | `#6E6069` | Labels mono, métadonnées |
| `--ink-faint` | `#B3A5AC` | Décor uniquement (pointillés, flèches), jamais du texte informatif |
| `--line` | `#E6DCD9` | Bordures de cartes, en-tête |
| `--rule` | `#EFE7E3` | Séparateurs, rail de jauge, dos de livre |
| `--arc` | `#D9C6CC` | Arc de la boucle « auditer » |
| `--accent` | `#7A2E5C` | Prune : CTA, ruban, italique d'accent, liens |
| `--accent-hover` | `#5A1F43` | Survol |
| `--on-accent` | `#FFFFFF` | Texte sur prune |
| `--blush` | `#F4DDE2` | Fond d'encadré (fil rouge, règle d'entrée), avatar |
| `--shadow` | `#EBCBD3` | Ombre portée |
| `--published-bg` | `#DCEBDD` | Pastille « Publié » |
| `--published-ink` | `#2F5A36` | Pastille « Publié » |

Contrastes mesurés sur `--paper` : `--ink` 15,9:1 · `--ink-soft` 9,4:1 · `--ink-muted` 5,6:1 · `--accent` 8,3:1.
Autres paires : `--on-accent` sur `--accent` 8,9:1 · `--accent` sur `--blush` 6,9:1 · pastille Publié 6,4:1.

### 2.2 Sombre (`prefers-color-scheme: dark`, tout le site)

| Token | Hex |
| --- | --- |
| `--paper` | `#1A1519` |
| `--card` | `#241D23` |
| `--ink` | `#F2EAEE` |
| `--ink-soft` | `#D6C9D0` |
| `--ink-muted` | `#A89AA2` |
| `--ink-faint` | `#5A4B54` |
| `--line` | `#3A3037` |
| `--rule` | `#2F272D` |
| `--accent-text` | `#E7A6C8` (italique d'accent et liens) |
| `--accent` | `#7A2E5C` (inchangé pour les fonds : CTA, ruban) |
| `--blush` | `#3A2433` |
| `--shadow` | `#4A2E3F` |
| `--published-bg` | `#1F3A26` |
| `--published-ink` | `#B5DDBB` |

Contrastes mesurés sur `--paper` sombre : `--ink` 15,3:1 · `--ink-muted` 6,7:1 · `--accent-text` 9,2:1 · pastille Publié 8,3:1.

### 2.3 Couleurs des livres

Ces couleurs servent uniquement en aplat, jamais pour du texte.

| Livre | Aplat (écran de couverture) | Remplissage de jauge |
| --- | --- | --- |
| BAA 101 | sauge `#A9C4AB` | — (pas de jauge) |
| AWS Scholars | abricot `#EFBF93` | `#E0A071` |
| Dev3Pack | rose `#E3A0AA` | `#D98391` |
| Mon parcours | — (à paraître) | — |

- Sur ces aplats, les barres sont en `rgba(35,26,34,0.75)`, dans les deux modes.

## 3. Typographie

| Famille | Graisses | Usage |
| --- | --- | --- |
| **Instrument Serif** | 400, italique | Titres, titres de couverture, chiffres, citations, signature |
| **Instrument Sans** | 400, 500, 600 | Interface, sous-titres, boutons, chips |
| **IBM Plex Mono** | 400, 500 | Labels, métadonnées, jauges, statuts, rayons |
| **Newsreader** | 400, 500 | Corps de lecture |

| Élément | Taille et style |
| --- | --- |
| h1 accueil, h1 étagère | Serif 62 px · interligne 0.94 · espacement −1.5 px |
| h1 page livre | Serif 46 px · interligne 0.98 |
| h2 de section | Serif 32–34 px |
| Titres de couverture | Serif 30–60 px selon la taille |
| Titre de carte chapitre | Serif 28 px |
| Citation d'encadré | Serif 26–30 px |
| Chiffres de stats | Serif 40 px, en prune |
| Sous-titre accueil | Sans 17 px · interligne 1.6 |
| Texte d'interface | Sans 14–16 px |
| Boutons | Sans 15–16 px · 600 |
| Labels mono | 12–13 px · majuscules · espacement 1–2 px |
| Corps de lecture | Newsreader 19 px · interligne 1.6 |
| Teaser de chapitre | Newsreader 16 px · interligne 1.5 |

- **Italique d'accent** : un seul mot ou groupe par titre, en `--accent`. Exemples : *in public…*, *étagère*, *Pack*, *101*.
- **Fallbacks** : `Georgia, serif` pour les deux serifs, `system-ui, sans-serif` pour Instrument Sans, `monospace` pour IBM Plex Mono.

## 4. Mise en page

- **Gouttières** : 20 px pour les pages vitrine, 24 px pour les pages livre.
- **Rayons d'angle** :

| Élément | Rayon |
| --- | --- |
| Couverture (dos de livre) | `3px 10px 10px 3px` sur l'étagère, `3px 12px 12px 3px` en page livre |
| Cartes | 14–16 px |
| Encadré | 18 px |
| Lignes et tuiles « à paraître » | 10–12 px |
| Écran de couverture | 8–10 px |
| Boutons, chips, pastilles, tampon | 999 px |
| Avatar (arche) | `999px 999px 14px 14px` |

- **Ombre portée** : décalage de 5 à 6 px, sans flou, couleur `--shadow`. Réservée aux couvertures, au CTA principal, aux encadrés et à l'avatar.
- **Cibles tactiles** : 44 px minimum.
- **En-tête** : 64 px de haut. À gauche, logo ruban et « My Building *Diary* ». À droite, sélecteur FR/EN en mono et menu rond de 44 px avec `aria-label`.

## 5. Composants

### 5.1 Couverture-affiche

| Emplacement | Taille |
| --- | --- |
| Étagère | ~167 × 250 |
| Page livre | 220 × 330 |

- **Structure** : une ligne mono `BOOK NN · info`, le titre serif avec son mot en italique, le sous-titre en sans, puis un « écran » en bas : aplat de la couleur du livre avec des barres arrondies.
- **Dos** : bande de 4 à 5 px en `--rule` sur le bord gauche. Bordure de 1 px en `--ink`.
- **Ruban** : prune, en haut à droite, découpé en V via `clip-path`. Il est réservé aux journeys en cours d'écriture, et son sens est expliqué dans le texte de l'étagère.
- **À paraître** :
  - bordure en pointillés `--ink-faint`, sans ombre ;
  - hachures à 135° ;
  - titre en `--ink-muted` ;
  - tampon « À PARAÎTRE » en pilule prune, tourné de −8°.
- Une couverture n'est cliquable que si la page du livre existe.

### 5.2 Jauge de progression

- Réservée aux journeys.
- Rail de 6 px en `--rule`, rayon 3 px. Remplissage dans la couleur de jauge du livre.
- Label mono 12 px : `x/y chapitres` ou `x/y jours` à gauche, pourcentage en `--ink` à droite.
- **BAA 101 n'a pas de jauge.** Il affiche « *Livre vivant* · N chapitre(s) », ou « · 1 chapitre à paraître » tant que rien n'est publié.

### 5.3 Index « Dernières pages » (accueil)

- Carte blanche contenant uniquement les chapitres publiés.
- Chaque ligne : barre de 5 px à la couleur du livre, label mono `LIVRE · CHAPITRE NN`, titre serif de 22 px, flèche.

### 5.4 Carte chapitre (lecture)

- Fond `--card`, bordure `--line`, rayon 16 px.
- En-tête : `DAY NN` ou `CHAPITRE NN` en mono, avec la pastille de statut.
- Un seul `<a>` : titre, teaser, puis « Lire le chapitre → » sur 44 px.
- Séparateur, puis le bloc « Concept BAA 101 », placé **hors du lien**.

### 5.5 Étiquette concept BAA 101

| Statut | Rendu |
| --- | --- |
| Chapitre publié | Lien en `--accent` |
| Chapitre non publié | `<span>` en pilule pointillée, non focusable, avec « à paraître » en mono |

- Le lien inverse, de BAA 101 vers un chapitre de journey, n'existe que si ce chapitre de journey est publié.

### 5.6 Statuts et sommaire long

- **Publié** : pastille `--published-bg` / `--published-ink`.
- **À paraître** : texte mono en `--ink-muted` et bordure en pointillés. Toujours visible.
- **Sommaire long** :
  - les 3 prochains éléments sont affichés en lignes ;
  - le reste va dans un `<details>` natif « + N à paraître », en grille de 4 colonnes ;
  - pas de JavaScript.

### 5.7 Éléments de l'accueil

- **Boucle** : « RÉCUPÉRER → CITER ou REFUSER → TRACER », sous un arc arrondi légendé *auditer* en serif italique prune.
- **Stats** : 3 cartes (chiffre en serif prune, label en sans). Uniquement des chiffres réels.
- **Avatar** :
  - arche 4:5, fond `--blush`, silhouette en trame de points prune ;
  - signature « — Mialy » ;
  - label « photo à venir · arche 4:5 ».
  - La future photo sera recadrée en arche.

## 6. Règles

- Taille de texte minimale : **12 px**, sans exception.
- Contraste du texte : 4,5:1 minimum.
- Un seul accent d'interface, le prune. Les couleurs des livres ne servent jamais pour du texte.
- Un décor ne passe jamais sur un titre. L'écran de couverture est un bloc séparé, sous le titre.
- Un tag sans livre est masqué ; en V1 du site, seul « dev » est affiché. Un rayon vide est masqué ; en V1, Builds l'est.
- Les livres et chapitres en cours restent visibles avec « à paraître ».
- Un concept BAA 101 n'est cliquable que si son chapitre est publié.
- BAA 101 se limite aux fondamentaux : un concept y entre seulement s'il vaut pour tout agent, quels que soient le framework, le cloud ou le modèle.
- Aucun contenu inventé : un fait manquant devient un placeholder `[…]` et il est signalé.
- L'accroche « Building AI agents *in public…* » reste en anglais dans les deux langues. Le sous-titre est traduit :
  - EN : *Agents that cite their sources, refuse when nothing backs the answer, and leave a trace you can audit.*
  - FR : *Des agents qui citent leurs sources, refusent quand rien ne soutient la réponse, et laissent une trace vérifiable.*
- **Anti-« gamin »** : pas de police manuscrite, pas de cœurs, pas de dégradés pastel, pas de rose bonbon.
- **Anti-copie** :
  - Krabat : pas de coins de cadrage, pas d'ombres noires, pas de fenêtre-navigateur.
  - Apple : pas de bande arc-en-ciel, pas de Garamond condensé, pas de « hello » manuscrit.

## 7. Exclu en V1 du site

- Three.js et WebGL. Une scène 3D est prévue en V2 : island `client:visible`, repli mobile, `prefers-reduced-motion`.
- Animations : aucune en V1.
- Tout l'univers retro-futuriste : sphères, grille en perspective, néons, magenta et cyan.
- Photo réelle : un placeholder la remplace en V1.
- Design des pages À propos, CV et blog : phase suivante.

## 8. Points ouverts

- Tags par livre : aucune source ne dit encore quels livres portent « dev ».
- Correspondance entre les Days 1–21 et les sessions du runbook Dev3Pack. Les titres des Days 2 à 21 sont inconnus.
- Chargement des polices : Google Fonts ou auto-hébergées.
- URL des repos à brancher : AWS chapitres 1 et 2, lien « Repo GitHub » de Dev3Pack.
