# 013 — Sortie complète de l'ambre : palette turquoise

- **Status**: DONE (appliqué et vérifié le 2026-08-16)
- **Category**: identité colorée
- **Estimated scope**: 1 fichier (`index.html`), ~60 valeurs

## La consolidation d'abord, sinon rien ne suit

L'ambre existait à **34 endroits sous forme `rgba(232,163,61, X)`** — dans les bordures,
les fonds teintés, les états actifs. Ces valeurs ne pouvaient pas suivre un changement de
`--accent`, parce qu'on ne peut pas faire varier l'opacité d'une couleur hexadécimale en
CSS. Sans traiter ça d'abord, changer l'accent aurait donné une app turquoise avec des
bordures restées orange.

L'accent est donc devenu un **triplet** :

```css
--accent-rgb:0,174,116;  --accent:rgb(var(--accent-rgb));
--flag-rgb:232,154,168;  --flag:rgb(var(--flag-rgb));
--border:rgba(var(--accent-rgb),0.16);
```

Les 33 teintes ambrées et les 9 terracotta dérivent maintenant du token. Vérifié à
l'exécution : le fond de l'onglet actif calcule `rgba(0, 174, 116, 0.13)`.

**Changer ces deux lignes repeint l'application entière.**

## Le choix de l'accent n'est pas esthétique

Le turquoise a été cherché sous contraintes, pas choisi à l'œil :

1. bande de clarté du mode sombre (OKLCH L entre 0.48 et 0.67) ;
2. plancher de chroma ≥ 0.10, sinon la teinte lit gris ;
3. contraste ≥ 3:1 sur le verre au-dessus du nuage le plus clair (`#184658`) ;
4. séparation ≥ 15 en vision normale contre le gris de retrait de la courbe de marée.

La quatrième a mordu : un turquoise bleuté (`#00AD8E`) tombait à **ΔE 12,4**, sous le
plancher dur. `#00AE74` est **le plus bleu qui tienne encore le plancher** — plus bleu, la
courbe redevient illisible.

| Rôle | Avant | Après |
| --- | --- | --- |
| Accent | `#E8A33D` ambre | `#00AE74` vert turquoise |
| Accent sombre | `#8A6A34` brun | `#016E4A` |
| Alerte | `#C4694F` terracotta | `#E89AA8` rose claire |
| Emphase courbe | `#C98500` or | `#00AE74` |
| Retrait courbe | `#8896A6` | `#606C7E` |
| Aube (moments) | `#E8A33D` | `#5FD3B2` |

## Le gris de retrait a dû être recalculé

Point non évident : changer l'accent a cassé la courbe de marée. Contre l'ancien or,
`#8896A6` donnait ΔE 16,2 en deutéranopie. Contre le turquoise il tombait à **6,8** — dans
la bande d'avertissement, légale seulement grâce aux libellés de rangée.

Le gris a donc été ré-optimisé contre le nouvel accent : `#606C7E` remonte à **15,6** en
deutéranopie et 20,6 en vision normale. La palette finale est **meilleure que l'originale
en or** sur ce critère.

```
[PASS] Lightness band       les 2 dans L 0.48–0.67
[PASS] CVD separation       dE 15,6 (deutan) · 17,4 (tritan)
[PASS] Normal-vision floor  dE 20,6
[PASS] Contrast vs surface  les 2 >= 3:1
```

Le seul FAIL restant porte sur le plancher de chroma du gris — « lit gris » est
précisément sa fonction, comme documenté au plan 006.

## La couleur d'alerte

`--flag` marquait les états faibles et les contraintes en terracotta, une couleur brune.
Elle devait partir, mais un signal d'alerte de la même famille que tout le reste cesse
d'alerter. `#E89AA8` a été retenue : ni ambre ni brune, et elle passe **4,5:1 sur les trois
fonds où elle sert de texte** (verre clair 4,68, feuille 5,59, fond nu 7,75), avec ΔE 26
de séparation d'avec l'accent. C'est la seule teinte chaude qui subsiste, sur environ
douze usages ponctuels.

## Palette d'espèces

Les onze couleurs contenaient de l'ambre, de l'or et deux bruns. Elles passent en famille
turquoise et froide. **Rappel du plan 006** : onze teintes catégorielles ne peuvent pas
être rendues distinctes deux à deux — c'est pourquoi la courbe de marée utilise l'emphase
et non ces couleurs. Elles ne servent plus qu'aux bordures et aux noms des fiches de
fenêtre. Le problème de fond reste ouvert ; seules l'ambre et le brun en ont été retirés.

## Vérification

| Contrôle | Résultat |
| --- | --- |
| Teintes ambre / brunes restantes | **0** (balayage sur toutes les valeurs hex du fichier) |
| `rgba` ambre / terracotta en dur | **0** sur 42 |
| Teintes translucides suivant le token | oui — `rgba(0, 174, 116, 0.13)` mesuré |
| Courbe : tracé, marqueurs, barres | tous en `#00AE74` / `#606C7E` |
| Surfaces en verre | 17, **0 empilement** |
| Débordement, texte tronqué | aucun sur l'accueil et les fiches espèce |

## Pour reprendre la teinte plus tard

Une seule ligne suffit désormais : `--accent-rgb`. Deux réserves si vous la déplacez vers
le bleu ou le violet — le contraste sur le verre clair, et surtout la séparation contre
`VIZ_RECESSIVE` dans la courbe. Demandez-moi de relancer le validateur, c'est immédiat.
