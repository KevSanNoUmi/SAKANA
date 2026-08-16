# 006 — Courbe de marée : encodage des fenêtres et palette d'espèces

- **Status**: DONE (appliqué et vérifié le 2026-08-16)
- **Commit**: n/a (le projet n'est pas un dépôt git)
- **Severity**: HIGH
- **Category**: encodage / lisibilité — skill `dataviz`
- **Estimated scope**: 1 fichier (`index.html`), ~25 lignes touchées

## Le constat, mesuré

La palette des onze espèces a été passée au validateur du skill `dataviz`
(`validate_palette.py`, fond `#172233`, mode sombre). Elle échoue :

```
[FAIL] Lightness band      9 des 11 hors de la bande sombre [0.48, 0.67]
[FAIL] Chroma floor        6 des 11 sous le plancher — lues comme du gris
                           (#9AA6B5 Tachiuo à C=0.026)
[FAIL] CVD separation      pire paire #8DB8D6↔#6FB1D6 ΔE 2.7 (protanopie)
[FAIL] Normal-vision floor pire paire #8DB8D6↔#6FB1D6 ΔE 4.0 — sous le plancher dur de 15
[PASS] Contrast vs surface les 11 ≥ 3:1
```

La paire en cause est **Suzuki ↔ Hirasuzuki** : deux espèces voisines, deux couleurs
que même une vision des couleurs normale ne sépare pas. C'est le seul plancher que
l'encodage secondaire n'excuse pas.

Et le problème n'est pas réparable par re-calibrage : le skill plafonne une palette
catégorielle à **huit teintes**, et note que même huit ne passent pas le test « toutes
paires ». Onze identités colorées ne sont pas atteignables, quel que soit le choix des
hex.

Trois autres défauts relevés dans le même rendu :

1. **L'intensité des fenêtres était portée par l'opacité seule** (de 0.035 à 0.95,
   `index.html:1426` avant modification). L'opacité est le canal le plus faible, et
   c'est celui qui s'effondre en premier en plein soleil — le contexte d'usage de
   cette app.
2. **`preserveAspectRatio="none"`** étirait le SVG de façon non uniforme : traits
   d'épaisseur variable selon l'axe, marqueurs circulaires devenus ovales, texte
   déformé. Déformation mesurée : 7 % à 309×108, et jusqu'à ~23 % selon la hauteur.
3. **Libellés à 6.2, 7 et 7.5 px**, et le nom d'espèce peint dans la couleur de série
   au lieu d'une encre de texte.

## Ce qui a été fait

**Forme.** Le skill prescrit, pour plus de huit catégories, l'emphase : une série en
avant, les autres en gris. C'est déjà ce que faisait l'app (`emphasis`,
`highlighted ? 1 : .34`), mais par-dessus onze teintes. La couleur ne porte donc plus
l'identité — le libellé de rangée (HIR, SUZ, AORI…), déjà présent, s'en charge.

**Palette.** Deux jetons, snappés sur des pas conformes puis validés :

```js
const VIZ_EMPHASIS='#C98500', VIZ_RECESSIVE='#8896A6';
```

`#C98500` est le pas jaune sombre de la palette documentée du skill ; c'est aussi, à
ΔE 9.5, le pas conforme le plus proche de l'accent de marque `#E8A33D` (recherche
exhaustive sous contraintes bande + chroma + contraste). Résultat du validateur :

```
[PASS] Lightness band       les 2 dans L 0.48–0.67
[FAIL] Chroma floor         #8896A6 à C=0.029 — lu comme gris
[PASS] CVD separation       ΔE 16.2 (protan) · 16.0 (tritan)
[PASS] Normal-vision floor  ΔE 17.1
[PASS] Contrast vs surface  5.2 et 5.3
```

Le seul FAIL restant porte sur le gris de retrait, et « lit gris » est exactement sa
fonction : le plancher de chroma existe pour empêcher une couleur d'**identité** de
virer au gris, or ce jeton ne fait pas d'identité. La forme prescrite par le skill est
littéralement « highlight one, **gray** the rest ».

**Encodage.** L'intensité passe de l'opacité à la **hauteur de barre**, canal de
longueur, avec une ligne de base visible par rangée — sans zéro visible une hauteur ne
se lit pas. L'opacité ne sert plus qu'au retrait des rangées non sélectionnées
(deux valeurs : 1 et .7). Hauteur de bande portée de 10 à 14 unités : à 10, l'amplitude
ne se lisait pas.

**Géométrie.** `preserveAspectRatio="none"` retiré (défaut `xMidYMid meet`) et
`.tide-curve` passée en `height:auto`, donc le viewBox impose le rapport.
`vector-effect="non-scaling-stroke"` sur la courbe et les lignes de soleil.

**Texte.** 6.2 → 8 px pour les libellés de rangée, 7 et 7.5 → 9 px pour l'axe horaire
et les marqueurs de marée. Les noms passent en encre (`#EDEEF0` / `#8896A6`) au lieu de
la couleur de série.

## Vérification

Mesuré dans le navigateur, viewport 375×812, sur quatre étapes :

| Contrôle | Avant | Après |
| --- | --- | --- |
| Déformation du SVG | 7 % (jusqu'à ~23 %) | **0.0 %** |
| Encodage de l'intensité | opacité, 1 seule hauteur | **hauteur, 41 hauteurs distinctes** sur 192 barres |
| Valeurs d'opacité | ~40 | **2** (emphase / retrait) |
| Couleurs de remplissage | 11 teintes non validées | **2 jetons validés** |
| Tailles de texte | 6.2 / 7 / 7.5 px | **8 / 9 px** |
| Couleur du texte | couleur de série | **jetons d'encre** |

Quatre courbes parcourues, zéro déformation, aucune couleur hors palette, console sans
erreur applicative.

## Ce qui reste ouvert

La palette des onze espèces **est toujours en place ailleurs** : bordure gauche des
`.fish-window-row`, couleur du nom d'espèce, pastilles de la légende
(`SPECIES_WINDOW_COLORS`, `index.html:1067`). Elle y échoue au même plancher dur, et la
même conclusion s'applique — onze identités colorées ne sont pas réalisables. La
corriger demande de choisir : emphase là aussi, ou repli sur un jeu de huit avec les
espèces rares regroupées. C'est une décision d'identité visuelle, pas un correctif.

Un autre point signalé par le skill, non traité : le nom d'espèce peint en couleur de
série dans les `.fish-window-row` (`index.html:1230`) — « le texte porte de l'encre,
jamais la couleur de série ».

## Couche de lecture — appui long (ajoutée le 2026-08-16)

Le skill demande une couche de survol **par défaut** sur tout graphique HTML/SVG.
L'équivalent tactile retenu est l'appui long, avec le clavier en parallèle.

**Geste.** Appui de 420 ms sur la courbe, puis glissement pour parcourir la journée,
relâchement pour fermer. Un mouvement de plus de 10 px avant les 420 ms annule : un
défilement de page reste un défilement. Une vibration de 8 ms confirme l'ouverture.
`.tide-chart` a été ajouté à `isSwipeBlocked()` pour que le geste n'entre pas en
conflit avec la navigation par balayage.

**Clavier.** La courbe est `tabindex="0"` ; flèches gauche/droite pour déplacer le
réticule, Échap pour fermer — « same details on keyboard focus as on hover ».

**Ce que montre la lecture**, conformément à la spec :

- *The crosshair finds the X* — réticule vertical calé sur le créneau de 30 min le plus
  proche, la résolution réelle des séries. Le lecteur vise une heure, pas une ligne d'1 px.
- *One tooltip, every series* — une seule infobulle liste la marée **et** les quatre à six
  espèces à cet instant. Le doigt n'a jamais à tomber sur une barre précise.
- *Values lead, labels follow* — la valeur est en 13 px gras sur encre primaire, le nom
  d'espèce en 11 px sur encre secondaire.
- *Line keys, not boxes* — chaque ligne est clée par un trait de 12×2 px, pas un carré.
- *Labels are untrusted data* — les noms d'espèce sont insérés par `textContent`, jamais
  par concaténation HTML.
- *Tooltips enhance, they never gate* — les mêmes valeurs restent lisibles sans le geste,
  dans les fiches de fenêtre sous la courbe.

L'infobulle bascule à gauche du réticule quand elle sortirait du cadre à droite.

**Un piège rencontré.** La première version positionnait le réticule avec
`svg.offsetLeft` / `svg.offsetTop`. Ces propriétés **n'existent pas sur un
`SVGElement`** : elles valent `undefined`, la position devient `NaN`, et le navigateur
ignore l'affectation **sans lever d'erreur**. L'infobulle se remplissait correctement
pendant que le réticule restait collé à zéro. Les décalages sont maintenant calculés à
partir des rectangles englobants. Rien dans la console ne signalait le problème — il
n'est apparu qu'en mesurant la position rendue.

**Vérifié** : appui bref n'ouvre rien ; glissement vertical avant le seuil annule ;
appui long ouvre au bon créneau ; le réticule progresse régulièrement (x = 3, 81, 158,
235, 306 px sur une largeur de 309) ; l'infobulle reste dans le cadre aux trois
positions extrêmes ; relâchement et Échap ferment. La sélection de rangée par appui
bref fonctionne toujours (Aori-Ika → Suzuki), et l'appui long ne la déclenche plus.
