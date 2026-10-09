# My Building Library — Design decisions (V2)

Référence pour toutes les sessions (design et code Astro).
Source : maquette mobile V2 « Papier & prune », figée le 29 sep 2026, mise à jour le 8 oct 2026 après la construction des pages livre et chapitre. Elle comporte 5 écrans : accueil, étagère, page Dev3Pack en clair et en sombre, page BAA 101.
Mise à jour le 9 oct 2026 : accueil illustré plein écran, bouton de thème, en-tête collant, mouvement (§ 7), couvertures illustrées, ruban de lecture.
Renommé le 9 oct 2026 : le site s'appelait « My Building *Diary* », il devient « My Building *Library* ». Le repo GitHub et le dossier local sont renommés en `my-building-library` (GitHub redirige l'ancienne adresse).
Cette version remplace entièrement la V1 retro-futuriste (Néon indigo, sphères, grille).

## 1. Principes

- **Direction.** Style éditorial print, doux et personnel, sans rien de gamin. Le site se lit comme une bibliothèque personnelle que Mialy construit : papier, encre, ruban marque-page. On y trouve trois sortes de livres :
  - les formations et bootcamps suivis (Journeys) ;
  - les fondamentaux qu'elle en tire (BAA 101 et son glossaire) ;
  - les agents qu'elle construit par elle-même à partir de ces notions (Builds).
- **Illustration (depuis le 9 oct 2026).** Une touche illustrée « cosy lo-fi » : un bureau devant la ville, au crépuscule ou la nuit, avec un écran, une plante, un mug et un chat. Dessinée en SVG et CSS, sans image ni bibliothèque.
  - Les images de référence (dont une illustration de Debbie Balboa) ont servi pour l'ambiance uniquement. Rien n'en est copié.
- **Références.** Krabat.ai (serif condensé, labels mono, boucle) et les publicités Apple des années 80 (papier blanc, titre qui domine, ton humain).
  - On garde l'esprit de ces références, jamais leurs signatures.
- **Une seule palette pour tout le site.** Les zones « vitrine » (accueil, étagère, couvertures, en-têtes) se distinguent par la mise en page : grands titres, ombres, couvertures, scène illustrée. Les zones « lecture » (résumé, chapitres, glossaire, blog) se distinguent par leur colonne sobre en Newsreader, sans illustration.
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
| `--arc` | `#D9C6CC` | Arc du titre « Mes activités » (accueil) |
| `--accent` | `#7A2E5C` | Prune : CTA, ruban, italique d'accent, liens |
| `--accent-hover` | `#5A1F43` | Survol |
| `--on-accent` | `#FFFFFF` | Texte sur prune |
| `--blush` | `#F4DDE2` | Fond d'encadré (fil rouge, règle d'entrée), avatar |
| `--shadow` | `#EBCBD3` | Ombre portée |
| `--published-bg` | `#DCEBDD` | Pastille « Publié » |
| `--published-ink` | `#2F5A36` | Pastille « Publié » |

Contrastes mesurés sur `--paper` : `--ink` 15,9:1 · `--ink-soft` 9,4:1 · `--ink-muted` 5,6:1 · `--accent` 8,3:1.
Autres paires : `--on-accent` sur `--accent` 8,9:1 · `--accent` sur `--blush` 6,9:1 · pastille Publié 6,4:1.

### 2.2 Sombre (tout le site)

- Le thème sombre s'applique de deux façons :
  - automatiquement si le système est en sombre (`prefers-color-scheme: dark`) ;
  - par le bouton lune/soleil de l'en-tête, qui pose `data-theme="dark"` ou `"light"` sur `<html>`.
- Le choix du bouton est retenu dans le navigateur (`localStorage`) et l'emporte sur le réglage du système. Un petit script dans `<head>` l'applique avant l'affichage, pour éviter un flash.

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

- Sur ces aplats, les dessins et les barres sont en encre `#231A22` à 75 %, dans les deux modes.

### 2.4 Scène d'accueil

Couleurs propres à la scène illustrée, définies dans `DeskScene.astro`. Elles ne servent nulle part ailleurs.

| Élément | Jour | Nuit |
| --- | --- | --- |
| Ciel (dégradé haut → bas) | `#F3C4A6` → `#E8A7B6` | `#1C1424` → `#4A2E4F` |
| Soleil / lune | `#FBE3B8` | `#F4E6C8` (croissant) |
| Nuages | `#FFF3EA` à 85 % | `#6B4A68` à 50 % |
| Ville | `#D59AA8` | `#2E2030`, fenêtres `#F2C46D` |
| Guirlande | fil `#9C6B7E`, ampoules `#F6D58E` | fil `#6B4A62`, ampoules `#FFD98A` avec halo |
| Bureau (dessus / face) | `#E3C2B4` / `#EAD3C8` | `#3A2A35` / `#2D2129` |
| Écran | coque `#F1E6DA`, fond `#241A26`, texte `#F4B6CF` | coque `#CBBFB3` |
| Plante | `#8FB394`, `#6F9A78`, pot `#C77E6B` | `#6F9A78`, `#557D5E` |
| Mug | `#F4DDE2` | `#7A2E5C` |
| Chat | pelage `#4A3F47`, yeux `#F6D58E` | pelage `#120D11`, yeux `#F2C46D` |

Contrastes du texte posé sur le ciel, mesurés aux deux extrémités du dégradé :

| Thème | Paire | Contraste |
| --- | --- | --- |
| Jour | `--ink` | 10,7 et 8,6:1 |
| Jour | `--ink-soft` | 6,3 et 5,1:1 |
| Jour | `--accent` | 5,6 et 4,5:1 |
| Nuit | `--ink` | 15,1 et 9,9:1 |
| Nuit | `--ink-soft` | 11,2 et 7,3:1 |
| Nuit | `--accent-text` | 9,1 et 6,0:1 |

Sur la scène, la ligne mono du haut passe donc en `--ink-soft` : `--ink-muted` n'atteindrait pas 4,5:1 sur le ciel de jour.

## 3. Typographie

| Famille | Graisses | Usage |
| --- | --- | --- |
| **Instrument Serif** | 400, italique | Titres, titres de couverture, chiffres, citations, signature |
| **Instrument Sans** | 400, 500, 600 | Interface, sous-titres, boutons, chips |
| **IBM Plex Mono** | 400, 500 | Labels, métadonnées, jauges, statuts, rayons, texte de l'écran illustré |
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
- **Largeur** : le contenu des pages tient dans une colonne de 720 px maximum (`.page`). Seule la scène d'accueil occupe toute la largeur de l'écran ; elle a son propre emplacement (`slot="hero"`) dans `<main>`.
- **Rayons d'angle** :

| Élément | Rayon |
| --- | --- |
| Couverture (dos de livre) | `3px 10px 10px 3px` sur l'étagère, `3px 12px 12px 3px` en page livre |
| Cartes | 14–16 px |
| Encadré | 18 px |
| Lignes et tuiles « à paraître » | 10–12 px |
| Écran de couverture | 8–10 px |
| Boutons, chips, pastilles, tampons | 999 px |
| Avatar (arche) | `999px 999px 14px 14px` |

- **Ombre portée** : décalage de 5 à 6 px, sans flou, couleur `--shadow`. Réservée aux couvertures, au CTA principal, aux encadrés et à l'avatar.
- **Cibles tactiles** : 44 px minimum.
- **En-tête** :
  - 64 px de haut, collant : il reste visible pendant le défilement, sur fond `--paper` ;
  - à gauche, logo ruban et « My Building *Library* » en serif 20 px ;
  - sous 380 px de large, le lien Étagère réduit ses marges (4 px au lieu de 8 px) pour que tout tienne sur une ligne ;
  - à droite, lien Étagère, sélecteur FR/EN en mono et bouton de thème rond de 44 px avec `aria-label`.

## 5. Composants

### 5.1 Couverture-affiche

| Emplacement | Taille |
| --- | --- |
| Étagère | ~167 × 250 |
| Page livre | 220 × 330 |

- **Structure** : une ligne mono `BOOK NN · info`, le titre serif avec son mot en italique, le sous-titre en sans, puis un « écran » en bas : aplat de la couleur du livre avec un dessin.
- **Dessin de l'écran** (`CoverArt.astro`, champ `cover.art` de `books.ts`). Il est calculé depuis les chapitres publiés, donc il grandit seul quand un chapitre est publié :

| Livre | Dessin |
| --- | --- |
| BAA 101 | Plante en pot : une feuille par chapitre publié, la plus récente se balance |
| AWS Scholars | Nuage : une étoile par chapitre, pleine une fois publié |
| Dev3Pack | Guirlande : une ampoule par chapitre, allumée une fois publié |
| Livre sans dessin | Barres arrondies (valeurs `cover.bars`) |

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
- Label mono 12 px : `x/y chapitres` à gauche, pourcentage en `--ink` à droite. Le total est le nombre de chapitres du sommaire, jamais un chiffre saisi à part.
- **BAA 101 n'a pas de jauge.** Il affiche « *Livre vivant* · N chapitre(s) », ou « · 1 chapitre à paraître » tant que rien n'est publié.

### 5.3 Index « Dernières pages »

- **Retiré de l'accueil le 9 oct 2026**, pour raccourcir le défilement. Le composant `LatestPages.astro` est conservé et pourra servir au blog.
- Rendu, s'il est réutilisé : carte blanche contenant uniquement les chapitres publiés. Chaque ligne : barre de 5 px à la couleur du livre, label mono `LIVRE · CHAPITRE NN`, titre serif de 22 px, flèche.

### 5.4 Carte chapitre (lecture)

- Fond `--card`, bordure `--line`, rayon 16 px.
- En-tête : `SESSION NN` ou `CHAPITRE NN` en mono, avec la pastille de statut. Un tampon « LU » s'ajoute devant « Publié » si le lecteur a lu ce chapitre jusqu'au bout (voir 5.7).
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
  - les 3 prochains éléments sont affichés en lignes : label mono (« Session 02 ») + titre serif + « à paraître » ;
  - le reste va dans un `<details>` natif « + N à paraître », en liste (label + titre) ;
  - pas de JavaScript.
- **Sommaire d'un livre vivant** (BAA 101, depuis le 9 oct 2026) : sommaire compact, pensé pour grandir sans faire défiler indéfiniment.
  - Une ligne par chapitre : numéro mono, titre serif 22 px (lien s'il est publié), puis une ligne mono « Appliqué dans N chapitres », « Publié » ou « à paraître », avec le tampon « LU » le cas échéant.
  - Le détail « Appliqué dans » reste sur la page du chapitre.
  - Barre de numéros collante sous l'en-tête (01 02 03 …), comme la barre de lettres du glossaire ; la ligne atteinte est surlignée en `--blush`.
  - Pas de JavaScript. Pistes notées pour plus tard : filtres par journey, recherche Pagefind sur tout le site, parties thématiques définies par Mialy.
- **Labels de chapitre** : « Session NN » pour les sessions d'un cours, « Chapitre NN » ailleurs, code propre pour les étapes hors numérotation (cap01, Final, Gecko).

### 5.7 Page chapitre (lecture)

- Lien de retour vers le livre, label mono `LIVRE · SESSION NN`, h1 serif 40 px.
- Ligne mono sous le titre : date de travail, puis temps de lecture (« N min de lecture », calculé à 200 mots par minute sur le texte du chapitre).
- **Ruban de lecture** : un trait prune de 3 px sous l'en-tête, qui s'allonge avec le défilement.
  - Il est piloté par le défilement lui-même (`animation-timeline: scroll()`), sans JavaScript.
  - Il est masqué dans les navigateurs qui ne le gèrent pas.
- **Tampon « LU »** : pilule prune tournée de −6°, comme le tampon « À paraître ».
  - Il apparaît quand la fin du texte entre à l'écran, puis reste affiché aux visites suivantes.
  - Il est mémorisé dans le navigateur du lecteur (`localStorage`), par livre et chapitre : lire en FR marque aussi la version EN.
  - Rien n'est envoyé à un serveur. Sans `localStorage`, aucun tampon.
- Corps en Newsreader 19 px, interligne 1.6 ; intertitres h2 en serif 28 px ; code en IBM Plex Mono.
- Citation de la question de défense : filet prune à gauche.
- Bas de page : bloc « Concept BAA 101 » (mêmes règles que 5.5), « Appliqué dans » pour les chapitres de BAA 101, lien vers le code, puis chapitre suivant (lien s'il est publié, sinon titre + « à paraître »).
- Un chapitre marqué publié sans fichier de texte : avertissement visible en développement, échec du build en production. Jamais de page vide en ligne.

### 5.8 Accueil

- **Scène plein écran** (`DeskScene.astro`). Elle occupe toute la largeur et la hauteur de l'écran sous l'en-tête (`100svh − 64 px`). De haut en bas :
  - le ciel, avec la guirlande ;
  - le texte : ligne mono, h1, sous-titre, boutons ;
  - la ville, qui se répète sur toute la largeur ;
  - le bureau, avec l'écran (`> retrieve`, `> cite | refuse`, `> trace`), la plante, le mug et le chat.
- **Soleil et lune** : en bas à droite, au-dessus du chat, pour ne croiser aucun texte.
- **Nuages** : uniquement dans les marges latérales, pour la même raison.
- **Jour et nuit** suivent le thème du site : clair = crépuscule, sombre = nuit (étoiles, croissant de lune, fenêtres allumées, halos de la guirlande). Le passage de l'un à l'autre se fait en fondu (0,8 s).
- **Description pour lecteurs d'écran** : une phrase traduite (clé `scene.label`). Le reste du dessin est masqué aux lecteurs d'écran.
- **Sous la scène** :
  - **Mes activités** : titre (h2) en serif italique prune, posé sur un arc arrondi, au-dessus des stats. La boucle « récupérer → citer ou refuser → tracer » a été retirée le 9 oct 2026 ;
  - **Stats** : 3 cartes (chiffre en serif prune, label en sans), uniquement des chiffres réels ;
  - **Portrait** (depuis le 9 oct 2026) : la photo de Mialy (`src/assets/mialy.jpg`, optimisée par Astro), recadrée dans l'arche 4:5 (visage gardé en haut du cadre), bordure `--line`, ombre portée `--shadow`. Pour l'accorder à la palette : saturation légèrement réduite et voile pêche → prune en « soft light ». Signature « — Mialy », lien « À propos → ».

### 5.8 bis Pied de page et profils

- Sur toutes les pages : titre « *Me retrouver ailleurs* » (serif italique prune), puis les profils, puis « @ellebuild · 2026 » et les liens À propos · Blog.
- Profils (`src/data/social.ts`, source unique, réutilisée par la page À propos) : boutons ronds papier de 48 px, une icône au trait par plateforme, ouverture dans un nouvel onglet, `rel="me"`.
  - Icônes : Tabler Icons (licence MIT), style « outline », trait 1,6 px, couleur `--ink` (prune au survol). LinkedIn, GitHub, X, Discord.
  - Dev.to n'existe pas chez Tabler : le bouton affiche « DEV » en mono.
  - Le nom de la plateforme est lu par les lecteurs d'écran (`aria-label`) et apparaît au survol (`title`).
- Discord n'a pas d'adresse de profil publique par pseudo : son bouton copie le pseudo, et un message « Pseudo Discord copié : … » s'affiche 3 s (annoncé aux lecteurs d'écran).
- Placés dans le pied de page plutôt que l'en-tête, qui est déjà plein sur téléphone.

### 5.8 ter Page À propos (première version, 9 oct 2026)

- Rôle : la fiche, courte, à parcourir en 30 secondes. Le récit complet sera le livre « Mon parcours » (rayon Parcours), qui reste « à paraître ».
- En haut : portrait en grande arche (200 × 250), « Qui écrit », h1 « À *propos* », la ligne d'auteure, les boutons de profils.
- « Ma présentation » : encadré pointillé « à paraître » tant que le texte de Mialy n'est pas écrit.
- **Ma *stack*** (`src/data/credentials.ts`, source unique) : trois groupes (Langages, AWS, Agents). Chaque outil = nom en serif, précision courte, puis ses preuves en mono : liens vers les chapitres ou repos où il a servi, d'après les runbooks. Un outil sans preuve (React) s'affiche sans lien.
- **Mes *certifications*** : une carte par certificat (type et date en mono, titre serif, organisme), lien « Vérifier ↗ » vers la page officielle (Udacity) ou le résultat officiel (Dev3Pack, `result.json`), et lien vers le livre du parcours. Pas de logo d'organisme.
- Les pages des livres AWS et Dev3Pack affichent aussi leur certificat sous l'en-tête, avec le même lien de vérification.

### 5.9 Glossaire BAA 101

- Page `/books/baa-101/glossary/`, accessible par une carte placée avant le sommaire de BAA 101.
- Notions classées par ordre alphabétique, regroupées par lettre (accents ignorés), dans une liste de définitions (`<dl>`).
- Barre de lettres collante, sous l'en-tête. Chaque notion renvoie vers les chapitres de BAA 101 qui la traitent.
- Les termes propres au cours (outillage de rendu) et à Solana sont exclus.
- Chaque notion a une ancre (`#appel-d-outil`) ; la notion atteinte depuis un chapitre est surlignée en `--blush`.

### 5.10 Bulles du glossaire (dans les chapitres)

- **But** : le lecteur ne reste jamais bloqué sur une notion, sans quitter le texte qu'il lit.
- La **première** apparition d'une notion du glossaire dans un chapitre devient un mot souligné en pointillés prune. Les suivantes restent du texte simple, pour ne pas surcharger la page.
- Un appui ouvre une bulle (popover HTML natif, sans JavaScript) : nom de la notion en serif, définition, lien « Voir dans le glossaire → » et bouton « Fermer ». Elle se ferme aussi d'un appui à côté ou avec Échap.
- La bulle monte du bas de l'écran, par-dessus le texte : carte `--card`, bordure `--ink`, ombre portée, largeur 520 px maximum.
- **Repérage** (`src/plugins/glossary-bubbles.ts`, au build, dans le processeur Markdown Sätteri d'Astro) :
  - le terme et sa variante entre parenthèses (« Grounding (ancrage) »), avec pluriel en s/x et apostrophe droite ou courbe ;
  - mot entier seulement (« trace » ne prend pas « tracer ») ; sigles en majuscules seulement (LLM, RAG) ;
  - jamais dans un lien, du code, un titre ou un bouton ;
  - variantes trop courantes exclues : « passage ».
- S'applique à tous les chapitres, des trois livres, en FR et en EN. Rien à faire à la rédaction : une notion ajoutée au glossaire est repérée au build suivant.

## 6. Règles

- Taille de texte minimale : **12 px**, sans exception.
- Contraste du texte : 4,5:1 minimum, y compris sur le ciel de la scène d'accueil (voir 2.4).
- Un seul accent d'interface, le prune. Les couleurs des livres ne servent jamais pour du texte.
- Un décor ne passe jamais sur un titre. L'écran de couverture est un bloc séparé, sous le titre. Sur la scène d'accueil, le texte est posé sur le ciel uni ; nuages, soleil et lune restent hors de la zone de texte.
- Un tag sans livre est masqué ; en V1 du site, seul « dev » est affiché. Un rayon vide est masqué.
- **Rayon Builds** : affiché depuis le 9 oct 2026 avec un livre « *Mes agents* · à paraître » (sans titre de projet inventé). Il sera remplacé par le premier projet réel.
- Les livres et chapitres en cours restent visibles avec « à paraître ».
- Un concept BAA 101 n'est cliquable que si son chapitre est publié.
- BAA 101 se limite aux fondamentaux : un concept y entre seulement s'il vaut pour tout agent, quels que soient le framework, le cloud ou le modèle.
- Aucun contenu inventé : un fait manquant devient un placeholder `[…]` et il est signalé.
- L'accroche « Building AI agents *in public…* » reste en anglais dans les deux langues. Le sous-titre est à la première personne et traduit (depuis le 9 oct 2026) :
  - FR : *Ma bibliothèque d'AI engineering : je m'y forme, j'en tire les bases, et je construis mes propres agents.*
  - EN : *My AI engineering library: I train here, draw the basics from it, and build my own agents.*
  - Ligne mono au-dessus du titre : « MA BIBLIOTHÈQUE · N CHAPITRES PUBLIÉS » / « BUILDING LIBRARY · N CHAPTERS PUBLISHED ».
- **Anti-« gamin »** : pas de police manuscrite, pas de cœurs, pas de dégradés pastel, pas de rose bonbon.
  - **Exception validée le 9 oct 2026** : le ciel de la scène d'accueil est un dégradé pêche → rose (prune profond la nuit). C'est le seul dégradé du site.
- **Anti-copie** :
  - Krabat : pas de coins de cadrage, pas d'ombres noires, pas de fenêtre-navigateur.
  - Apple : pas de bande arc-en-ciel, pas de Garamond condensé, pas de « hello » manuscrit.
  - Illustrations de référence : ambiance seulement. Pas de reprise de leur composition, de leurs personnages ni de leurs objets signatures.

## 7. Mouvement

Toutes les animations sont en CSS ou SVG, sans bibliothèque. Seul le tampon « LU » utilise quelques lignes de JavaScript.

| Où | Animation | Durée |
| --- | --- | --- |
| Accueil, scène | Nuages qui dérivent, étoiles, ampoules et fenêtres qui scintillent | 2,4–8 s, en boucle |
| Accueil, scène | Lignes de code qui s'écrivent, curseur qui clignote | 7 s et 1 s |
| Accueil, scène | Plante qui se balance, vapeur du mug | 5–6 s et 3,2 s |
| Accueil, scène | Chat : clignement des yeux, queue qui se balance | 5 s et 4 s |
| Accueil, texte | Montée en fondu, ligne après ligne (décalage 0,1 s) | 0,7 s, une fois |
| Accueil, Mes activités | Un point prune parcourt l'arc de droite à gauche | 6 s, en boucle |
| Thème | Fondu jour ↔ nuit de la scène | 0,8 s |
| Étagère | Texte sous les livres en cascade (80 ms d'écart), jauges qui se remplissent | 0,5 s et 1 s, une fois |
| Étagère | Couverture soulevée et légèrement penchée au survol ou au focus | 0,25 s |
| Couvertures | Ruban qui se balance ; feuille la plus récente, étoiles et ampoules qui vivent | 3–4,5 s, en boucle |
| Pages | Transition étagère → livre : la couverture glisse jusqu'à sa place, l'en-tête reste fixe, le reste fond | 0,45 s |
| Chapitre | Ruban de lecture lié au défilement ; tampon « LU » qui se pose | Défilement, 0,45 s |
| Chapitre | Bulle du glossaire qui monte du bas de l'écran | 0,2 s |

- **Transitions entre pages** : View Transitions natives du navigateur (`@view-transition { navigation: auto; }`), sans routeur JavaScript. Chaque couverture porte `view-transition-name: book-<slug>`, unique par page. Un navigateur sans support charge simplement la page suivante.
- **Les couvertures n'ont pas d'animation d'entrée sur l'étagère** : ce sont elles qui voyagent entre les pages, et deux animations sur le même objet le feraient clignoter.
- **`prefers-reduced-motion: reduce`** coupe tout :
  - la scène devient une image fixe, avec les trois lignes de code affichées ;
  - les transitions entre pages sont désactivées ;
  - le contenu reste entièrement lisible.
- Les animations en boucle restent lentes et de faible amplitude. Aucune ne clignote plus de 3 fois par seconde.

## 8. Exclu en V1 du site

- Three.js et WebGL. Une scène 3D est prévue en V2 : island `client:visible`, repli mobile, `prefers-reduced-motion`.
- Bibliothèques d'animation (GSAP, Framer Motion, Lottie) : le mouvement reste en CSS et SVG (§ 7).
- Tout l'univers retro-futuriste : sphères, grille en perspective, néons, magenta et cyan.
- Design des pages À propos, CV et blog : phase suivante.

## 9. Points ouverts

- Tags par livre : aucune source ne dit encore quels livres portent « dev ».
- Phrase de description de la scène pour lecteurs d'écran (FR et EN) : rédigée par Claude, à valider.
- Tampon « LU » : propre à chaque navigateur ; il ne suit pas le lecteur d'un appareil à l'autre.

Réglés le 8 oct 2026 : polices auto-hébergées via l'API Fonts d'Astro ; Dev3Pack découpé en 17 chapitres (Sessions 1 à 14, cap01, Final, Gecko) ; repos AWS et Dev3Pack branchés.
Réglé le 9 oct 2026 : ordre de l'index « Dernières pages », devenu sans objet depuis son retrait de l'accueil.
