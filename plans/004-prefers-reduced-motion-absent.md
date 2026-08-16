# 004 — Respecter `prefers-reduced-motion`

- **Status**: DONE (appliqué et vérifié le 2026-08-16)
- **Commit**: n/a (le projet n'est pas un dépôt git)
- **Severity**: MEDIUM
- **Category**: 6. Accessibility
- **Estimated scope**: 1 fichier (`index.html`), ~15 lignes touchées

## Problem

`grep -c "prefers-reduced-motion" index.html` retourne **0**. L'app ignore complètement le
réglage système « Réduire les animations », alors qu'elle produit plusieurs mouvements de
position et cinq défilements animés.

Mouvements concernés :

| Élément | Ligne | Mouvement |
| --- | --- | --- |
| `.tree-card` | `index.html:715-716` | glisse de 24 px vers le haut à l'ouverture |
| `.swipe-flash` | `index.html:659-660` | monte de 6 px puis remonte de 4 px en sortie |
| `.species-rail-fill` | `index.html:630` | progression animée pendant le scroll |
| `.perf-spinner` | `index.html:553` | rotation infinie |

Défilements animés, tous en dur :

```js
/* index.html:1925 */  setTimeout(()=>document.getElementById('logZone')?.scrollIntoView({behavior:'smooth',block:'center'}),60);
/* index.html:1997 */  requestAnimationFrame(()=>document.getElementById(`stopPad-${id}`)?.scrollIntoView({behavior:'smooth',block:'start'}));
/* index.html:2141 */  if(el&&el.scrollIntoView)el.scrollIntoView({behavior:'smooth',block:'nearest'});
/* index.html:2481 */  if(active) active.scrollIntoView({behavior:smooth?'smooth':'auto',block:'nearest',inline:'center'});
/* index.html:2497 */  if(nav && nav.getBoundingClientRect().top<76) nav.scrollIntoView({behavior:'smooth',block:'start'});
```

C'est le point le plus sensible pour cette app en particulier : un carnet de pêche s'utilise en
bateau. Un défilement animé non désiré, sur un pont qui bouge déjà, ne relève pas seulement du
confort.

## Target

Un mode « mouvement réduit » qui **atténue sans supprimer** : on retire les déplacements de
position, on garde les fondus et les changements de couleur, qui portent la compréhension.

```css
/* cible — à ajouter à la fin du <style> de index.html */
@media (prefers-reduced-motion: reduce){
  .tree-card{transform:none;transition:none;}
  .ux-sheet{transform:none;transition:none;}
  .species-rail-fill{transition:none;}
  .swipe-flash{animation:swipeFlashReduced .8s linear both;}
  @keyframes swipeFlashReduced{0%{opacity:0}20%,70%{opacity:1}100%{opacity:0}}
}
```

`.swipe-flash` conserve son `transform:translateX(-50%)` de base (centrage), puisque
`swipeFlashReduced` n'anime plus que l'opacité : la pastille apparaît et disparaît en fondu,
sans glisser.

Helper JS, à placer près des autres utilitaires globaux :

```js
/* cible */
const REDUCE_MOTION=window.matchMedia('(prefers-reduced-motion: reduce)');
function scrollBehavior(){ return REDUCE_MOTION.matches?'auto':'smooth'; }
```

Chaque `behavior:'smooth'` devient `behavior:scrollBehavior()`. Le site `index.html:2481` a déjà
un ternaire, il devient `behavior:smooth?scrollBehavior():'auto'`.

### Ce qui est délibérément conservé

- **Le retour de pression** `translateY(2px)` sur `.pad`, `.tree-launch`, `.tree-btn`
  (`index.html:47`, `709`, `733`). C'est une réponse directe au doigt, de 2 px, sur 120 ms :
  la retirer supprimerait la confirmation tactile sans réduire le mouvement perçu.
- **`.perf-spinner`** (`index.html:553`). C'est le seul indicateur de chargement de l'app, il
  fait 14 px. Le figer laisserait l'utilisateur sans signal.
- **Les transitions d'opacité et de couleur** (`.species-tab`, `.fish-window-row`,
  `.focus-miss`, `.pad-detail.perf-refreshing`). Mouvement réduit ne veut pas dire zéro
  animation.

## Repo conventions to follow

- Le `<style>` de `index.html` se termine par des blocs `@media(max-width:…)`
  (`index.html:662`, `index.html:690`). Ajouter le bloc `prefers-reduced-motion` **après**
  eux, en fin de feuille, pour qu'il gagne à spécificité égale.
- Les media queries existantes sont écrites `@media(max-width:430px){` sans espace après
  `@media`. Écrire `@media (prefers-reduced-motion: reduce){` avec les espaces est ici
  nécessaire à la validité de la syntaxe — c'est une exception assumée.
- Les constantes globales JS sont déclarées en haut du script principal ; placer
  `REDUCE_MOTION` et `scrollBehavior()` à côté de `perfIdle()` (`index.html:1493`), qui est
  l'utilitaire d'environnement le plus proche.

## Steps

1. Ajouter le bloc `@media (prefers-reduced-motion: reduce)` cible à la fin du `<style>` de
   `index.html`, après la dernière media query existante.
2. Déclarer `REDUCE_MOTION` et `scrollBehavior()` près de `perfIdle()` (`index.html:1493`).
3. Remplacer `behavior:'smooth'` par `behavior:scrollBehavior()` aux lignes `1925`, `1997`,
   `2141` et `2497`.
4. Ligne `2481`, remplacer `behavior:smooth?'smooth':'auto'` par
   `behavior:smooth?scrollBehavior():'auto'` (la variable locale `smooth` est conservée telle
   quelle, elle décide d'un autre critère).
5. Si le plan 001 a déjà été exécuté, vérifier que `closeTree()` teste bien
   `prefers-reduced-motion` — le plan 001 l'inclut déjà. Si oui, remplacer son
   `window.matchMedia('(prefers-reduced-motion: reduce)').matches` par `REDUCE_MOTION.matches`
   pour n'avoir qu'une source.

## Boundaries

- Ne PAS mettre `animation:none` ou `transition:none` de façon globale (`*{…}`) : cela
  supprimerait aussi les fondus utiles et casserait le retour de pression.
- Ne PAS toucher au `.perf-spinner` ni au retour de pression `translateY(2px)`, pour les
  raisons documentées ci-dessus.
- Ne PAS modifier la logique de navigation ou les cibles de scroll — seul le paramètre
  `behavior` change.
- Ne PAS ajouter de dépendance.
- Si le code trouvé ne correspond pas aux extraits ci-dessus, STOP et signaler.

## Verification

- **Mécanique** : `grep -c "behavior:'smooth'" index.html` doit retourner `0`.
  `grep -c "prefers-reduced-motion" index.html` doit retourner au moins `1`. Console sans
  erreur.
- **Feel check** : DevTools → panneau Rendering → `Emulate CSS prefers-reduced-motion: reduce`,
  puis :
  - ouvrir l'arbre de décision : le fond apparaît en fondu, la carte **ne glisse plus** ;
  - faire un swipe entre onglets espèce : la pastille apparaît en fondu sur place, sans monter ;
  - taper « Noter une prise » : la page **saute** à la zone de log au lieu d'y défiler ;
  - appuyer sur une tuile : l'enfoncement de 2 px est **toujours là** (c'est voulu) ;
  - déclencher un calcul non caché : le spinner **tourne toujours** (c'est voulu).
  - Puis désactiver l'émulation et revérifier que tous les mouvements sont revenus.
- **Done when** : les cinq points ci-dessus se comportent comme décrit dans les deux modes.
