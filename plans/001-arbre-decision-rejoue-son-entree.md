# 001 — Ne rejouer l'entrée de l'arbre de décision qu'à l'ouverture

- **Status**: DONE (appliqué et vérifié le 2026-08-16)
- **Commit**: n/a (le projet n'est pas un dépôt git)
- **Severity**: HIGH
- **Category**: 1. Purpose & frequency + 4. Interruptibility
- **Estimated scope**: 1 fichier (`index.html`), ~40 lignes touchées (CSS + 3 fonctions JS)

## Problem

`renderTree()` réécrit **tout** l'overlay (fond + carte) à chaque étape de l'arbre. Les deux
animations d'entrée sont donc rejouées à chaque tap sur « Fait, toujours rien → » ou « Ça a
marché ! » : le fond noir refait un fondu 0→1 et la carte reglisse de 24 px vers le haut.

L'arbre de décision est un flux de dépannage : l'utilisateur enchaîne les leviers l'un après
l'autre, souvent 4 ou 5 d'affilée, en pleine action de pêche. Une animation d'entrée n'a de
sens qu'à l'entrée. Rejouée à chaque étape, elle transforme une navigation en clignotement et
retarde de 220 ms la lecture de l'étape suivante.

`index.html:2912` et `index.html:2919` — chaque action rappelle `renderTree()` :

```js
function treeNext(){
  if(!treeState) return;
  const cur = treeState.levers[treeState.idx];
  if(cur) treeState.tried.push(cur.key);
  treeState.idx++;
  renderTree();
}
function treeSolved(){
  if(!treeState) return;
  treeState.solved = true;
  treeState.solvedLever = treeState.levers[treeState.idx] || null;
  renderTree();
}
```

`index.html:2936`, `index.html:2956` et `index.html:2976` — les trois branches de `renderTree()`
reconstruisent chacune le shell complet :

```js
zone.innerHTML = `<div class="tree-overlay"><div class="tree-card">
```

`index.html:711-716` — les animations rejouées, en `@keyframes` (donc non interruptibles :
elles repartent de zéro au lieu de se retargeter) :

```css
/* index.html:711 — actuel */
.tree-overlay{position:fixed; inset:0; z-index:200; background:rgba(8,12,18,0.86); backdrop-filter:blur(3px);
  display:flex; align-items:flex-end; justify-content:center; padding:14px; animation:treeIn 0.18s ease;}
@keyframes treeIn{from{opacity:0} to{opacity:1}}
.tree-card{background:var(--surface); border:1px solid var(--border); border-radius:20px 20px 16px 16px; width:100%; max-width:520px;
  padding:20px 18px calc(18px + env(safe-area-inset-bottom)); position:relative; box-shadow:0 -8px 40px rgba(0,0,0,0.5); animation:treeUp 0.22s ease;}
@keyframes treeUp{from{transform:translateY(24px)} to{transform:translateY(0)}}
```

Second défaut au même endroit : la **sortie ne s'anime pas du tout**. `closeTree()`
(`index.html:2925`) vide `innerHTML` d'un coup, la feuille disparaît par téléportation.

## Target

Le shell (overlay + carte) est monté **une fois** à l'ouverture et animé par des *transitions*
(retargetables) plutôt que par des keyframes. Entre les étapes, seul le contenu interne de la
carte est remplacé. La fermeture rejoue la transition à l'envers avant de vider la zone.

```css
/* cible — remplace index.html:711-716 */
.tree-overlay{position:fixed; inset:0; z-index:200; background:rgba(8,12,18,0.86); backdrop-filter:blur(3px);
  display:flex; align-items:flex-end; justify-content:center; padding:14px;
  opacity:0; transition:opacity .18s var(--ease-out);}
.tree-overlay.is-open{opacity:1;}
.tree-card{background:var(--surface); border:1px solid var(--border); border-radius:20px 20px 16px 16px; width:100%; max-width:520px;
  padding:20px 18px calc(18px + env(safe-area-inset-bottom)); position:relative; box-shadow:0 -8px 40px rgba(0,0,0,0.5);
  transform:translateY(24px); transition:transform .22s var(--ease-drawer);}
.tree-overlay.is-open .tree-card{transform:translateY(0);}
```

Les deux blocs `@keyframes treeIn` et `@keyframes treeUp` sont supprimés — plus aucune règle ne
les référence.

Valeurs imposées (ne pas approximer) :

- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` — courbe d'entrée/sortie forte.
- `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` — courbe de tiroir iOS, pour la carte qui
  monte depuis le bas.
- Durées inchangées : 180 ms le fond, 220 ms la carte (budget modale/tiroir : 200–500 ms).

## Repo conventions to follow

- Tout le CSS est inline dans le `<style>` de `index.html`, une règle par ligne, propriétés
  compactées sans espace après `:`. Respecter ce style.
- Les tokens `--ease-out` et `--ease-drawer` sont créés par le **plan 003** dans le bloc
  `:root` de `index.html:16-22`. **Exécuter le plan 003 avant celui-ci.** Si les tokens
  n'existent pas encore dans `:root`, STOP et exécuter 003 d'abord.
- Exemplaire de feuille montée-une-fois à imiter côté JS : `openUXSheet()` /
  `closeUXSheet()` (`index.html:1787-1799`) — le shell y est déjà persistant, on ne bascule
  qu'une classe `.open` sur `#uxBackdrop`.
- Le projet n'utilise aucune librairie d'animation : CSS pur + `requestAnimationFrame`.

## Steps

1. **CSS** — dans `index.html`, remplacer les lignes 711 à 716 par le bloc « cible » ci-dessus.
   Supprimer les lignes `@keyframes treeIn{...}` et `@keyframes treeUp{...}`.

2. **JS — extraire le contenu du shell.** Dans `renderTree()` (`index.html:2927`), les trois
   branches construisent aujourd'hui `zone.innerHTML = '<div class="tree-overlay"><div class="tree-card…">' + contenu + '</div></div>'`.
   Refactoriser pour que chaque branche produise seulement deux variables locales :
   - `cardClass` — `''` pour la branche normale (`index.html:2976`) et la branche de fin
     (`index.html:2956`), `'is-solved'` pour la branche résolue (`index.html:2936`) ;
   - `cardInner` — exactement le HTML qui se trouve aujourd'hui **entre** `<div class="tree-card…">`
     et son `</div>` fermant, sans le modifier.

3. **JS — monter ou mettre à jour.** Terminer `renderTree()` par ce bloc unique, à la place des
   trois affectations `zone.innerHTML = …` :

   ```js
   let overlay = zone.querySelector('.tree-overlay');
   if(!overlay){
     zone.innerHTML = `<div class="tree-overlay"><div class="tree-card ${cardClass}">${cardInner}</div></div>`;
     overlay = zone.querySelector('.tree-overlay');
     requestAnimationFrame(()=>overlay.classList.add('is-open'));
   } else {
     const card = overlay.querySelector('.tree-card');
     card.className = `tree-card ${cardClass}`.trim();
     card.innerHTML = cardInner;
   }
   ```

   La branche `else` ne touche ni à l'overlay ni à la classe `.is-open` : c'est ce qui supprime
   le rejeu entre les étapes.

4. **JS — animer la fermeture.** Remplacer `closeTree()` (`index.html:2925`) par :

   ```js
   function closeTree(){
     treeState=null; document.body.classList.remove('tree-open');
     const z=document.getElementById('treeZone'); if(!z) return;
     const overlay=z.querySelector('.tree-overlay');
     if(!overlay){ z.innerHTML=''; return; }
     overlay.classList.remove('is-open');
     const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
     if(reduce){ z.innerHTML=''; return; }
     let done=false; const clear=()=>{ if(done) return; done=true; z.innerHTML=''; };
     overlay.addEventListener('transitionend',clear,{once:true});
     setTimeout(clear,300);
   }
   ```

   Le `setTimeout(clear,300)` est un filet de sécurité : si la transition est annulée
   (onglet en arrière-plan, `transitionend` jamais émis), la zone est vidée quand même.

## Boundaries

- Ne PAS modifier le contenu textuel, la logique de `buildTreeLevers()`, `treeNext()`,
  `treeSolved()`, ni l'ordre des leviers. Étape 2 = déplacement de HTML, pas réécriture.
- Ne PAS toucher aux autres surfaces animées (`.ux-backdrop`, `.species-rail`, `.pad`) —
  elles ont leurs propres plans.
- Ne PAS ajouter de dépendance ni de librairie d'animation.
- Si le code trouvé ne correspond pas aux extraits ci-dessus, STOP et signaler plutôt
  qu'improviser.

## Verification

- **Mécanique** : aucun build dans ce projet. Ouvrir `index.html` et vérifier que la console
  ne signale aucune erreur JS. `grep -c "treeIn\|treeUp" index.html` doit retourner `0`.
- **Feel check** :
  - Ouvrir l'arbre depuis une fiche espèce : le fond apparaît en fondu et la carte monte
    une fois.
  - Enchaîner 4 fois « Fait, toujours rien → » : **le fond ne doit plus clignoter et la carte
    ne doit plus bouger**, seul le texte change.
  - Fermer : la carte redescend et le fond disparaît en fondu, sans saut.
  - Ouvrir/fermer très vite 5 fois de suite : l'animation doit repartir de sa position
    courante, jamais de zéro, et la zone doit finir vide (inspecter `#treeZone`).
  - DevTools → panneau Animations, lecture à 10 % : vérifier que fond et carte démarrent
    ensemble et que la carte ne dépasse pas sa position finale.
- **Done when** : les 4 points du feel check passent et `#treeZone` est vide après fermeture.
