# 008 — Échelle typographique : plancher Dynamic Type et passage en rem

- **Status**: DONE (appliqué et vérifié le 2026-08-16)
- **Severity**: HIGH
- **Category**: fondations — skill `apple-design-foundations`
- **Estimated scope**: 1 fichier (`index.html`), 280 déclarations converties

## Le constat

Deux règles non négociables du skill étaient enfreintes.

**« Dynamic Type must reflow. »** Le projet comptait **280 déclarations `font-size` en
pixels fixes et une seule en rem**. Un utilisateur qui règle « Texte plus grand » sur son
téléphone n'obtenait strictement rien.

**Le plancher de la table Dynamic Type.** Caption 2 vaut 11 pt et le skill précise que
c'est le plancher dur de tout le système — rien ne descend en dessous, même au réglage
le plus petit. Or **126 déclarations vivaient sous ce seuil** :

| Taille | Déclarations |
| --- | --- |
| 7.5 px | 8 |
| 8 px | 14 |
| 8.5 px | 20 |
| 9 px | 26 |
| 9.5 px | 12 |
| 10 px | 31 |
| 10.5 px | 15 |

Pour une app consultée sur un pont, en plein soleil, c'est le défaut qui coûtait le plus
au quotidien — et il ne se voit pas sur un écran de bureau.

## Ce qui a été fait

Toutes les tailles sont passées en `rem`, ancrées sur `html{font-size:100%}`, en les
remontant au rôle Dynamic Type le plus proche et **jamais sous 11 px** :

| Ancienne taille | Rôle cible | Résultat |
| --- | --- | --- |
| < 11 px (126 décl.) | Caption 2 | **11 px** (0.6875rem) |
| 11–11.5 | Caption 2 | 11 px |
| 12–12.8 | Caption 1 | 12 px |
| 13–13.8 | Footnote | 13 px |
| 14–14.5 | — | 14 px |
| 15 | Subhead | 15 px |
| 16 | Callout | 16 px |
| 17 | Body | 17 px |
| ≥ 18 | titres | inchangés |

126 déclarations agrandies, 114 conservées à taille égale, toutes converties en rem.
Aucune taille en pixels fixes ne subsiste.

Le tracking n'a pas été touché : il était déjà dans le bon sens — négatif sur les titres
Fraunces (`-0.01em`), positif sur les petits libellés mono (`.04` à `.14em`) — ce que
demande la table de tracking par taille du skill.

## Les conséquences, et comment elles ont été traitées

Agrandir 126 déclarations de 15 à 47 % casse forcément des mises en page denses. Le skill
donne la règle : **« Layouts grow/wrap; never truncate. »**

**Le bandeau d'onglets espèce** est repassé à 399 px de contenu pour 347 utiles, et
« Comprendre » sortait de 38 px — exactement le défaut corrigé au plan 007, revenu par
l'agrandissement. Plutôt que de re-resserrer l'espacement (ce qui aurait annulé le gain
de lisibilité), le bandeau **passe sur deux rangées**. Les cinq onglets sont visibles,
cliquables, et les cibles font 44 px de haut.

**Le bouton flottant** recouvrait durablement la dernière ligne de contenu. `main`
reçoit maintenant un dégagement de 104 px en bas, appliqué seulement quand le bouton est
affiché (`body:has(.quick-fab.ready)`).

**Quatre cibles tactiles** étaient sous le minimum de 44×44 pt imposé par le skill :
`.trip-view-toggle button` (40 et 42 px), `.peek-btn` (40 px), `.focus-toggle` et
`.reading-start` (42 px). Toutes portées à 44.

## Vérification

Viewport 375×812, sur l'accueil et deux fiches espèce :

| Contrôle | Résultat |
| --- | --- |
| Plus petit texte rendu | **11 px** sur les trois surfaces |
| Déclarations en px fixes restantes | **0** |
| Débordement horizontal de page | **0** |
| Éléments dépassant l'écran | **aucun** |
| Texte tronqué (`scrollWidth > clientWidth`) | **aucun** |
| Onglets espèce | 2 rangées, tous visibles et cliquables, 44 px |
| Dernière ligne sous le bouton flottant | **non** |

## Exceptions assumées

Deux cibles restent sous 44 px, volontairement :

- `.glossary-term` — c'est un mot souligné **dans une phrase**. L'agrandir casserait le
  flux du texte ; les liens inline d'Apple n'atteignent pas non plus 44 pt.
- `.species-rail-dot` (30 px) — commande secondaire. Le bandeau d'onglets est la
  commande primaire pour la même navigation, et le rail ne s'affiche que lorsque le
  bandeau a quitté l'écran (plan 007). L'agrandir recréerait la collision corrigée là-bas.

## Ce qui reste ouvert

Le skill demande aussi que **les espacements suivent le texte** (`rem`/`em`, pas des px
fixes) pour que la mise en page grandisse avec lui. Les `padding`, `margin` et `gap` du
projet sont encore en pixels : le texte grandit désormais avec le réglage système, mais
les boîtes autour de lui non. C'est le second temps du même chantier, plus large que
celui-ci, et il redistribue la densité de chaque écran.
