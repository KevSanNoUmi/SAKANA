# 009 — Refonte visuelle : grille 8 points, matériaux, densité

- **Status**: DONE (appliqué et vérifié le 2026-08-16)
- **Severity**: HIGH
- **Category**: fondations + matériaux — skills `apple-design-foundations`, `apple-design-materials`
- **Estimated scope**: 1 fichier (`index.html`), ~344 déclarations touchées

L'identité du projet est conservée : bleu nuit et ambre, Fraunces et IBM Plex Mono. Ce qui
change, c'est la structure — rythme, géométrie, profondeur. C'est là que se joue la
sensation « Apple », pas dans une copie des couleurs d'iOS.

## 1. Grille 8 points

Le projet était franchement hors grille : gouttières à 5, 7, 9 px, paddings à 3, 11, 13,
rayons à 9, 11, 13, 15. Tout est calé sur l'échelle du skill (base 8, demi-pas 4) :

| Type | Déclarations | Après |
| --- | --- | --- |
| Gouttières | 98 | 4 / 8 / 12 uniquement |
| Paddings | 132 | multiples de 4 |
| Rayons | 114 | 2 / 8 / 12 / 16 / 20 / pilules |

Le calage arrondit au plus proche, jamais systématiquement vers le haut : la densité
globale reste stable après l'agrandissement typographique du plan 008.

## 2. Coins continus

Un `border-radius` classique raccorde par tangence : la courbure saute de 0 à 1/r, et
l'œil lit ce coude. Le squircle d'Apple a une courbure continue. `corner-shape:squircle`
est appliqué en amélioration progressive (Chrome 139+, `@supports`), le rayon classique
restant le repli partout ailleurs.

**Piège rencontré** : appliqué à un élément en `border-radius:50%`, `corner-shape:squircle`
transforme le cercle en carré arrondi. Le bouton flottant et les pastilles d'aperçu
étaient devenus des carrés. Ils sont exclus de la liste, avec un commentaire pour que
personne ne les y remette.

## 3. Matériaux et profondeur

**Escalier d'élévation.** En sombre, une surface qui monte s'éclaircit — elle ne
s'inverse pas. Ajout de `--surface-3: #26364E`, palier des couches flottantes, au-dessus
de `--bg`, `--surface` et `--surface-2`.

**La barre de titre devient du verre.** Elle était une bande opaque avec un trait de 1 px
en dessous. Elle est maintenant une couche translucide (`blur(20px) saturate(180%)`) sous
laquelle le contenu défile, avec une arête supérieure spéculaire. Le trait dur est
remplacé par un dégradé d'arête — le skill proscrit les séparateurs durs sous une chrome
flottante.

**Les feuilles montent d'un cran.** `.ux-sheet` et `.tree-card` passent sur `--surface-3`
avec ombre d'ancrage et arête spéculaire. Elles restent **opaques** : jamais de verre sur
du verre. Vérifié — leur `backdrop-filter` calculé vaut `none`, seul le voile derrière
elles floute.

**Moins de traits, plus de lumière.** Les contours permanents des cartes passent de
`.16` à `.10` d'opacité : elles se détachent par l'élévation plutôt que par un cerne.

## 4. Densité — le changement le plus visible

Sur téléphone, la grille d'étapes en deux colonnes ne laissait que **87 px de texte
utile** une fois la pastille d'aperçu déduite. Après l'agrandissement typographique, les
titres cassaient en trois ou quatre lignes et le texte passait sous la pastille.

Deux corrections :

- **Colonne unique sous 520 px.** 339 px de large au lieu de 155 : les titres et les
  sous-titres tiennent sur une ligne, la pastille ne coûte plus rien, et on retrouve le
  rythme d'une liste iOS. Deux colonnes reviennent dès qu'il y a la place.
- **Cartes à la hauteur de leur contenu** (`align-items:start`). Étirer une carte courte
  sur la hauteur de sa voisine créait des blocs vides qui ne voulaient rien dire.

## Vérification

Viewport 375×812, accueil et deux fiches espèce :

| Contrôle | Résultat |
| --- | --- |
| Débordement horizontal de page | **0** |
| Éléments dépassant l'écran | aucun |
| Texte tronqué | aucun |
| Texte sous une pastille d'aperçu | **0 sur 14** (mesuré sur les glyphes, pas les boîtes) |
| Feuille : verre sur verre | **non** — `backdrop-filter:none` |
| Rayons composés symétriques | oui (corrigé après coup) |

Test fonctionnel après refonte, tout passe : ouverture et fermeture de la feuille,
ouverture de l'arbre sans rejeu entre étapes puis fermeture, onglets sur deux rangées,
balayage avec projection de vitesse, courbe de marée sans déformation.

**Un défaut de mon propre script** : le calage des rayons ne convertissait que la
première valeur des déclarations composées, laissant `border-radius:20px 18px 0 0` — des
coins asymétriques sur les feuilles. Repéré en lisant le style calculé, corrigé.

## Ce qui reste ouvert

- **Les espacements ne suivent pas encore le texte.** Ils sont désormais sur la grille,
  mais en pixels : le texte grandit avec le réglage système (plan 008), pas les boîtes
  autour. Les passer en `rem` est la suite.
- **Le voile de fond** utilise un flou de 14 px là où le skill situe un panneau lourd
  autour de 32 px. Monter demanderait de mesurer le coût GPU sur un vrai téléphone.
- **La palette des onze espèces** reste non conforme (plan 006), sur les bordures et les
  noms des fiches de fenêtre.
