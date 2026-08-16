# Plans d'amélioration des animations — Carnet Pêche JP V6.5.23

Audit réalisé avec le skill `improve-animations` (philosophie d'animation d'Emil Kowalski).
Tout le mouvement de l'app vit dans `index.html` (PWA mono-fichier, CSS et JS inline, aucune
librairie d'animation).

**Les cinq plans ont été appliqués et vérifiés le 2026-08-16.** La sauvegarde d'avant travaux
est `index.html.bak-avant-animations-20260816-114014` à la racine du projet.

## Plans

| # | Titre | Sévérité | Catégorie | Statut |
| --- | --- | --- | --- | --- |
| [003](003-tokens-easing-et-transition-ecrasee-sur-pad.md) | Tokens d'easing + transition écrasée sur `.pad` | MEDIUM | Easing & tokens | **DONE** |
| [002](002-rail-especes-anime-height-au-scroll.md) | Rail d'espèces : `height` → `transform`, throttle rAF | HIGH | Performance | **DONE** |
| [001](001-arbre-decision-rejoue-son-entree.md) | L'arbre de décision rejoue son entrée à chaque étape | HIGH | Purpose & frequency | **DONE** |
| [005](005-feuille-acces-rapide-sans-animation.md) | Feuille « Accès rapide » sans entrée ni sortie | MEDIUM | Cohesion & opportunities | **DONE** |
| [004](004-prefers-reduced-motion-absent.md) | `prefers-reduced-motion` absent | MEDIUM | Accessibilité | **DONE** |
| [006](006-courbe-de-maree-encodage-et-palette.md) | Courbe de marée : encodage et palette | HIGH | Data-viz (skill `dataviz`) | **DONE** |
| [007](007-geste-materiaux-accessibilite-apple.md) | Balayage, matériaux, accessibilité | HIGH | Interaction (skill `apple-design`) | **DONE** |
| [008](008-echelle-typographique-dynamic-type.md) | Échelle typographique et Dynamic Type | HIGH | Fondations (skill `apple-design-foundations`) | **DONE** |
| [009](009-refonte-grille-materiaux-densite.md) | Grille 8 pt, matériaux, densité | HIGH | Fondations + matériaux | **DONE** |
| [010](010-fiche-destination-hors-cadre.md) | Fiche destination hors cadre | HIGH | Mise en page | **DONE** |
| [011](011-liquid-glass-nappe-turquoise.md) | Liquid Glass sur nappe turquoise | — | Matériaux (skill `apple-design-materials`) | **DONE** |
| [012](012-libelles-titre-cartes-espece.md) | Libellés, titre, cartes espèce | — | Typographie et identité | **DONE** |
| [013](013-palette-turquoise.md) | Sortie de l'ambre : palette turquoise | — | Identité colorée | **DONE** |

Ordre d'exécution suivi : **003 → 002 → 001 → 005 → 004** (003 en premier car il crée les
tokens dont 001 et 005 dépendent).

## Écarts par rapport aux plans, constatés à l'exécution

Deux points spécifiés dans les plans se sont révélés faux à la vérification en navigateur. Le
code livré s'en écarte volontairement ; les plans conservent leur rédaction d'origine, cette
section fait foi.

### 1. `requestAnimationFrame` remplacé par un reflow forcé (plan 001)

Le plan 001 faisait ajouter la classe `.is-open` dans un `requestAnimationFrame`. Vérification
faite, **le rAF ne se déclenche pas quand l'onglet est masqué** : l'overlay restait à
`opacity:0` et l'arbre n'apparaissait jamais. Remplacé, dans `mountTreeCard()`, par le même
pattern synchrone que celui déjà spécifié pour la feuille au plan 005 :

```js
void overlay.offsetWidth;          // force le reflow
overlay.classList.add('is-open');  // puis bascule dans la frame suivante
```

### 2. Cache de géométrie du rail supprimé (plan 002)

Le plan 002 faisait mettre en cache `top`/`span` du panneau dans un objet `railGeom`, invalidé
au remontage du rail. À l'usage, la mesure était prise **avant que `#tabPanel` soit mis en
page**, donc figée sur des valeurs fausses : la barre restait bloquée à `scaleY(0)` quel que
soit le scroll.

Le cache a été retiré. `updateSpeciesRailProgress()` remesure comme le code d'origine, mais
n'est appelée qu'**une fois par frame** via le throttle rAF, au lieu d'une fois par événement
de scroll. Les deux vrais gains de performance du plan sont conservés : plus d'animation de
`height` (propriété de layout), et plus de variable CSS posée sur le parent — le `transform`
est écrit directement sur la barre.

Un `visibilitychange` a également été ajouté pour réarmer le drapeau `railTick`, qui reste
sinon coincé à `true` si l'onglet est masqué au moment d'un scroll.

## Vérification effectuée

App servie en local, viewport mobile 375×812, console sans erreur applicative :

- **Arbre de décision** : entrée jouée une fois ; après `treeNext()`, le nœud overlay **et** le
  nœud carte sont les mêmes objets DOM (`===`), opacité stable à 1, carte à `translateY(0)` —
  plus aucun rejeu. Sortie animée, `#treeZone` vidé après coup.
- **Feuille « Accès rapide »** : `ux-backdrop` → `open` → `open is-open`, feuille de
  `translateY(231px)` à `translateY(0)` avec `cubic-bezier(0.32, 0.72, 0, 1)`, puis retour à
  `display:none` après fermeture.
- **Filets de sécurité** : testés avec les transitions gelées (onglet masqué, donc
  `transitionend` jamais émis). Les `setTimeout` de repli démontent bien les deux overlays —
  aucun overlay plein écran ne reste à intercepter les taps. C'était le principal risque de
  régression de ce lot.
- **Réouverture pendant la fermeture** : ouvrir → fermer → rouvrir en 80 ms laisse la surface
  visible et propre dans les deux cas.
- **Rail d'espèces** : progression relevée à `scaleY(0)` / `0.2643` / `0.6833` / `0.9711` le
  long du scroll, écrite en `transform` inline sur la barre.
- **`.pad`** : style calculé = `transform .12s cubic-bezier(.23,1,.32,1), box-shadow .12s
  cubic-bezier(.23,1,.32,1), opacity .15s, border-color .15s` — une seule déclaration, ombre et
  enfoncement de nouveau synchrones.

## Seconde passe — deux bugs d'ergonomie (2026-08-16)

Trouvés en inspectant l'app après le lot d'animations, corrigés dans la foulée. Ils ne
relevaient pas du mouvement mais du placement.

### Le rail d'espèces volait le tap du dernier onglet

`document.elementFromPoint()` au centre de l'onglet « Comprendre » renvoyait un
`species-rail-dot`. Cause : le rail est déclaré à 18×190 px avec des pastilles de 10 px
([index.html:631](../index.html:631)), puis deux media queries le portent à 38–40×250 px avec
des pastilles de 30–32 px ([index.html:696](../index.html:696) et
[index.html:708](../index.html:708)). En doublant, il recouvrait le bandeau d'onglets sticky
(`z-index:9`, contre 18 pour le rail) et le bouton Focus.

Correction : le rail ne s'affiche que lorsqu'il ne recouvre plus le bandeau, testé par
comparaison de rectangles dans `updateSpeciesRailProgress()`. Ses pastilles passent en
`pointer-events:none` tant qu'il est masqué. C'est aussi cohérent sur le fond — tant que les
vrais onglets sont à l'écran, un second sélecteur pour les mêmes cinq destinations est
redondant.

Ajout : sous 390 px les cinq onglets débordaient (378 px pour 347 px utiles). Espacement
resserré (gap 4 px, padding horizontal 8 px) → 347 px pile, sans toucher à la hauteur des
cibles tactiles.

### Les pastilles de la carte se superposaient

Quatre paires en collision à 375 px, dont un amas 5-6-7 où le numéro 6 était invisible.

Cause : la dé-collision comparait des distances en unités de viewBox (720×480) à un seuil de
30, soit environ 14 px réels sur mobile, alors qu'une pastille fait 44 px — elle ne se
déclenchait quasiment jamais. Son `break` ne traitait par ailleurs que des paires, jamais des
amas de trois.

Correction : `spreadTripMapPins()` relaxe les positions en pixels réels après montage, toutes
paires confondues, en gardant les pastilles dans le cadre, et se rejoue au `resize`. Résultat
mesuré : zéro chevauchement, les sept pastilles reçoivent chacune leur propre tap, aucune ne
sort du cadre, décalage maximal 23 px.

### Clé de cache du service worker

`CACHE` est passé de `carnet-peche-jp-v6-5-23-relief-20260816` à `…-20260816-2` dans
[sw.js:4](../sw.js:4). Sans ce changement, `cacheFirstRefresh` continue de servir l'ancien
`index.html` au premier lancement — ça a masqué les corrections deux fois pendant la
vérification.

## Reste à vérifier à l'œil

Le ressenti ne se lit pas dans le code. À faire sur un vrai téléphone, en conditions réelles :

- l'appui sur une tuile — ombre et enfoncement doivent s'écraser ensemble ;
- la montée de la feuille depuis le bas, sans à-coup au démarrage ;
- le mode « Réduire les animations » d'iOS/Android : les déplacements doivent disparaître, les
  fondus rester, l'enfoncement des tuiles rester, le spinner continuer à tourner.

Pour servir le projet en local :

```bash
python3 -m http.server 8747
```

## Ce que l'audit a jugé correct, à ne pas « corriger »

Ces points ont été vérifiés et écartés — les modifier serait une régression :

- Le retour de pression « touche mécanique » (`translateY(2px)` + écrasement de l'ombre) sur
  `.pad`, `.tree-launch` et `.tree-btn` : délibéré et cohérent sur les trois. Seules ses durées
  et courbes changent (plan 003).
- `transform-origin: center` sur les feuilles : elles sont ancrées au bas de l'écran, pas à un
  déclencheur. Rien à changer.
- `ease` sur les transitions de couleur et d'opacité (`.species-tab` `index.html:128`,
  `.window-top` `index.html:295`, `.pad-detail.perf-refreshing` `index.html:554`) : c'est la
  courbe correcte pour un changement de couleur.
- `perfSpin` en `.65s linear infinite` (`index.html:553`) : mouvement constant, `linear` est
  juste, et un spinner rapide fait paraître le chargement plus court.
- Aucune animation sur une action clavier. La seule touche gérée est Échap (`index.html:3241`),
  qui ferme une feuille — c'est un cas occasionnel, pas une action répétée cent fois par jour.
