# 002 — Passer le rail d'espèces de `height` à `transform`, et le throttler en rAF

- **Status**: DONE (appliqué et vérifié le 2026-08-16)
- **Commit**: n/a (le projet n'est pas un dépôt git)
- **Severity**: HIGH
- **Category**: 5. Performance
- **Estimated scope**: 1 fichier (`index.html`), ~12 lignes touchées

## Problem

La barre de progression latérale des fiches espèces cumule les trois pires patterns de
performance d'animation, et elle tourne **sur chaque événement de scroll**, c'est-à-dire sur la
surface la plus fréquentée de l'app.

`index.html:630` — la barre anime `height`, une propriété de layout. Chaque mise à jour
déclenche layout + paint + composite au lieu de rester sur le GPU :

```css
/* index.html:630 — actuel */
.species-rail-fill{display:block;width:100%;height:var(--rail-progress,0%);background:var(--accent);border-radius:99px;transition:height .08s linear;}
```

`index.html:1934-1939` — la valeur est écrite dans une **variable CSS posée sur le parent**
(`#speciesRail`). Changer une variable CSS sur un parent invalide le style de tous ses
descendants, alors qu'un seul élément est concerné. La fonction lit aussi
`getBoundingClientRect()` et `scrollHeight` à chaque appel, ce qui force un recalcul de layout
synchrone (reflow) au milieu du scroll :

```js
/* index.html:1934 — actuel */
function updateSpeciesRailProgress(){
  const rail=document.getElementById('speciesRail'); if(!rail||!currentSpeciesId)return;
  const panel=document.getElementById('tabPanel'); if(!panel)return;
  const top=panel.getBoundingClientRect().top+window.scrollY, span=Math.max(1,panel.scrollHeight-window.innerHeight*.68), p=Math.max(0,Math.min(1,(window.scrollY-top+window.innerHeight*.22)/span));
  rail.style.setProperty('--rail-progress',`${Math.round(p*100)}%`);
}
```

`index.html:1950` — et c'est branché sur le scroll sans aucun throttle, donc plusieurs fois par
frame sur iOS :

```js
/* index.html:1950 — actuel */
window.addEventListener('scroll',updateSpeciesRailProgress,{passive:true});
```

Effet ressenti : sur une fiche espèce longue, le scroll accroche. C'est d'autant plus coûteux
que l'app est une PWA mobile utilisée sur le terrain, sur des appareils modestes.

## Target

La barre est animée par `transform: scaleY()` posé **directement sur l'élément concerné**, la
géométrie du panneau n'est mesurée qu'une fois par rendu (pas par frame de scroll), et le
handler de scroll est throttlé en `requestAnimationFrame`.

```css
/* cible — remplace index.html:630 */
.species-rail-fill{display:block;width:100%;height:100%;transform:scaleY(var(--rail-progress,0));transform-origin:top center;background:var(--accent);border-radius:99px;transition:transform .08s linear;}
```

`linear` est conservé : c'est un indicateur de progression continue, pas une entrée — c'est la
courbe correcte pour ce cas. La durée de 80 ms est conservée pour lisser la jitter du scroll.

```js
/* cible — remplace index.html:1934-1939 */
let railGeom=null;
function measureSpeciesRail(){
  const panel=document.getElementById('tabPanel'); if(!panel){railGeom=null;return;}
  railGeom={top:panel.getBoundingClientRect().top+window.scrollY,
            span:Math.max(1,panel.scrollHeight-window.innerHeight*.68)};
}
function updateSpeciesRailProgress(){
  const rail=document.getElementById('speciesRail'); if(!rail||!currentSpeciesId)return;
  const fill=rail.querySelector('.species-rail-fill'); if(!fill)return;
  if(!railGeom) measureSpeciesRail();
  if(!railGeom)return;
  const p=Math.max(0,Math.min(1,(window.scrollY-railGeom.top+window.innerHeight*.22)/railGeom.span));
  fill.style.transform=`scaleY(${p.toFixed(4)})`;
}
let railTick=false;
function onScrollSpeciesRail(){
  if(railTick)return; railTick=true;
  requestAnimationFrame(()=>{railTick=false;updateSpeciesRailProgress();});
}
```

```js
/* cible — remplace index.html:1950 */
window.addEventListener('scroll',onScrollSpeciesRail,{passive:true});
window.addEventListener('resize',()=>{measureSpeciesRail();updateSpeciesRailProgress();},{passive:true});
```

Note : `p.toFixed(4)` remplace le `Math.round(p*100)` actuel, qui quantifiait la progression par
paliers de 1 % — la barre avancera par petits sauts en moins.

## Repo conventions to follow

- CSS inline dans le `<style>` de `index.html`, propriétés compactées sans espace après `:`.
- Le projet throttle déjà en `requestAnimationFrame` ailleurs — exemplaire à imiter :
  `index.html:2477` et `index.html:2494`, qui enveloppent les recalculs de layout dans
  `requestAnimationFrame(()=>{…})`.
- `.species-rail-track` (`index.html:629`) porte déjà `overflow:hidden` et
  `border-radius:99px` : c'est lui qui découpe la barre, le `border-radius` du fill est
  conservé tel quel par prudence mais ne fait rien de visible.
- Aucune librairie d'animation dans ce projet.

## Steps

1. Remplacer `index.html:630` par la règle CSS cible.

2. Remplacer le corps de `updateSpeciesRailProgress()` (`index.html:1934-1939`) par le bloc JS
   cible, qui ajoute `railGeom`, `measureSpeciesRail()`, `onScrollSpeciesRail()` et `railTick`.

3. Remplacer `index.html:1950` par les deux `addEventListener` cibles (scroll + resize).

4. Invalider la mesure quand le contenu change. `updateSpeciesRail()` (`index.html:1928`)
   reconstruit le rail après un changement d'onglet ou d'espèce : y ajouter `railGeom=null;`
   juste avant l'appel final à `updateSpeciesRailProgress()`, pour que la géométrie soit
   remesurée au premier scroll suivant.

5. Vérifier les autres appelants de `updateSpeciesRailProgress()` — `index.html:1762`,
   `index.html:2477` — ils continuent de fonctionner sans changement : la fonction remesure
   d'elle-même si `railGeom` est `null`.

## Boundaries

- Ne PAS changer le calcul de progression (`.68`, `.22`, les bornes 0–1) : c'est un réglage
  d'affichage délibéré, seule sa mécanique d'écriture change.
- Ne PAS toucher au markup généré par `updateSpeciesRail()` (`index.html:1928-1933`) au-delà
  de la ligne d'invalidation demandée à l'étape 4.
- Ne PAS toucher aux autres surfaces animées (arbre de décision, feuilles, `.pad`).
- Ne PAS ajouter de dépendance.
- Si le code trouvé ne correspond pas aux extraits ci-dessus, STOP et signaler.

## Verification

- **Mécanique** : `grep -n "rail-progress" index.html` ne doit plus retourner que la ligne CSS
  (la valeur par défaut `var(--rail-progress,0)`), plus aucun `setProperty`.
  Console sans erreur JS à l'ouverture d'une fiche espèce.
- **Feel check** :
  - Ouvrir une fiche espèce sur mobile (ou DevTools en émulation mobile), scroller de haut en
    bas : la barre orange doit se remplir de façon continue et fluide, sans paliers.
  - DevTools → Performance, enregistrer un scroll de 3 s sur une fiche espèce : comparer avec
    l'état actuel. Les événements « Layout » / « Recalculate Style » liés au scroll doivent
    avoir disparu ; il ne doit rester que du composite.
  - Changer d'onglet espèce puis rescroller : la barre doit repartir d'une progression juste
    (la géométrie a été remesurée).
  - Tourner l'appareil / redimensionner la fenêtre, puis scroller : la progression reste juste.
- **Done when** : le scroll d'une fiche espèce ne produit plus de recalcul de layout dans le
  profil Performance, et la barre reste visuellement identique à aujourd'hui.
