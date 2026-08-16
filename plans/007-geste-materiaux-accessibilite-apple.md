# 007 — Geste de balayage, matériaux et signaux d'accessibilité

- **Status**: DONE (appliqué et vérifié le 2026-08-16)
- **Severity**: HIGH (geste) / MEDIUM (matériaux, accessibilité)
- **Category**: interaction, matériaux, accessibilité — skill `apple-design`
- **Estimated scope**: 1 fichier (`index.html`), ~70 lignes touchées

## 1. Le balayage ne rapportait qu'un état final

L'ancienne version n'écoutait que `touchstart` et `touchend`. Aucun `touchmove`, donc
**aucun retour pendant le geste**, et la décision reposait sur la seule distance :

```js
const dx=t.clientX-st.x, dy=t.clientY-st.y;
if(Math.abs(dx)<72||Math.abs(dx)<Math.abs(dy)*1.25||Math.abs(dy)>90)return;
```

C'est exactement le « recognizer qui ne rapporte qu'un état final » que le skill dit
d'éviter (§10) : il jette le suivi continu dont dépend le retour visuel. Conséquence
concrète : un flick rapide mais court — le geste naturel pour feuilleter — ne
déclenchait rien.

### Ce qui a été fait

- **Pointer Events + capture** (§2) à la place de `touchstart`/`touchend`, avec un
  historique des derniers points pour disposer de la vitesse au relâchement.
- **Verrou d'axe à 10 px** (§10) : on décide une fois de la direction, puis on suit.
- **Suivi amorti du doigt** (§2, §9) — le panneau se déplace pendant le geste, avec la
  fonction de résistance progressive du skill. Mesuré : 30 px de glissement → 15,7 px de
  déplacement ; 90 px → 43,2 px. En butée (pas d'onglet de l'autre côté) la constante
  passe de 0,55 à 0,22, donc ça résiste nettement plus.
- **Vitesse sur les derniers points**, pas de bout en bout (§5) : un flick qui démarre
  lentement serait sous-estimé par une moyenne sur tout le geste.
- **Projection du point d'arrivée** (§6), avec la fonction exacte d'Apple —
  décroissance exponentielle, pas le `v²/(2a)` des manuels :

```js
function swipeProject(v){ return (v/1000)*SWIPE_DECEL/(1-SWIPE_DECEL); }
const reach = dx + swipeProject(v);   // on décide sur là où le geste allait
```

- **Reprise sans saut** (§3) : un nouveau geste repart de la valeur affichée, lue par
  `DOMMatrixReadOnly` sur le transform courant, jamais de la valeur cible.
- **Mouvement réduit** : le suivi de position est désactivé, la validation reste.

### Un réglage corrigé en cours de route

Première version avec `decelerationRate = 0.998`, la valeur du défilement inertiel. À la
vérification, un glissement mou de 40 px basculait l'onglet : à 0,998 la projection vaut
~0,50·v, donc 74 px/s suffisaient à ajouter 37 px et à franchir le seuil de 72.

Passé à **0.99**, la variante « snappier » que le skill mentionne : la projection tombe à
~0,10·v. Le flick passe, la traîne non.

| Geste | Avant | Après |
| --- | --- | --- |
| Flick court (40 px) et rapide | ne faisait rien | **valide** |
| Glissement court (40 px) et lent | ne faisait rien | ne valide pas |
| Glissement long (120 px) | valide | valide |

## 2. La hiérarchie de flou était inversée (§12)

« Bigger surfaces should read as thicker. » Le projet faisait le contraire :

| Surface | Avant | Après |
| --- | --- | --- |
| `.dest-context-sticky` (petite barre) | `blur(8px)` | `blur(6px)` |
| `.ux-backdrop` (voile plein écran) | `blur(3px)` | `blur(14px) saturate(140%)` |
| `.tree-overlay` (voile plein écran) | `blur(3px)` | `blur(14px) saturate(140%)` |

## 3. Deux signaux d'accessibilité manquants (§14)

Le skill demande de répondre à **trois** signaux indépendants. Le projet n'en gérait
qu'un (`prefers-reduced-motion`, ajouté au plan 004), alors qu'il a trois surfaces
translucides.

- `prefers-reduced-transparency: reduce` — les voiles passent en fond quasi opaque,
  `backdrop-filter` retiré.
- `prefers-contrast: more` — bordures portées à la couleur d'accent sur les surfaces
  principales, voiles quasi opaques.

## Vérification

Mesuré dans le navigateur, viewport 375×812 :

- Projection : v=74 px/s → 7 px ; v=800 px/s → 79 px.
- Résistance : 20 px → 10,6 ; 100 px → 46,9 ; 300 px → 108,9 (saturation progressive) ;
  en butée 100 px → 20,6.
- Suivi du doigt actif pendant le geste, retour à zéro avec `swipe-settling` au
  relâchement.
- Les trois media queries d'accessibilité sont présentes dans la feuille.
- Voile plein écran calculé à `blur(14px) saturate(1.4)`.
- Console sans erreur applicative.

## Ce que le skill signale et qui reste ouvert

**§15 — Dynamic Type.** « Respect the user's text-size setting. Scale layout *with* the
text — spacing en `rem`/`em`, pas en px fixes. » Le projet compte **280 déclarations
`font-size` en px et une seule en rem**. Un utilisateur qui règle Texte plus grand sur
iOS n'obtient donc rien.

C'est la réponse de fond à la question de lisibilité laissée ouverte plus tôt : plutôt
que de choisir un plancher arbitraire, laisser le réglage système faire le travail. Le
chantier est mécanique mais large — 280 déclarations, plus les espacements qui doivent
suivre — et il change la densité de chaque écran. Décision de conception, pas correctif.

Le tracking, lui, est déjà correct : négatif sur les titres (`-0.01em` sur Fraunces),
positif sur les petits libellés mono (`.04em` à `.14em`) — exactement le sens que
demande §15.

**§4 — Familiarité.** `.ux-sheet-handle` dessine une poignée de tiroir sur une feuille
qui ne se glisse pas. Le skill : honorer la physique des métaphores. Soit la poignée
devient fonctionnelle (glisser vers le bas pour fermer, avec projection de vitesse comme
ci-dessus), soit elle disparaît.
