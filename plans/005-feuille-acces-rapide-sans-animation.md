# 005 — Animer l'entrée et la sortie de la feuille « Accès rapide »

- **Status**: DONE (appliqué et vérifié le 2026-08-16)
- **Commit**: n/a (le projet n'est pas un dépôt git)
- **Severity**: MEDIUM
- **Category**: 7. Cohesion & tokens + 8. Missed opportunities
- **Estimated scope**: 1 fichier (`index.html`), ~15 lignes touchées

## Problem

L'app contient **deux feuilles ancrées en bas de l'écran**, construites sur le même patron
(`position:fixed; inset:0; align-items:flex-end` + `backdrop-filter:blur(3px)`) :

- l'arbre de décision, `.tree-overlay` / `.tree-card` (`index.html:711-716`) — qui s'anime ;
- la feuille « Accès rapide » / peek / focus, `.ux-backdrop` / `.ux-sheet`
  (`index.html:599-601`) — qui **n'a aucune animation**.

```css
/* index.html:599 — actuel */
.ux-backdrop{position:fixed;inset:0;z-index:70;background:rgba(4,8,14,.58);backdrop-filter:blur(3px);display:none;align-items:flex-end;justify-content:center;}
.ux-backdrop.open{display:flex;}
.ux-sheet{width:min(720px,100%);max-height:min(78vh,720px);overflow:auto;background:var(--surface-2);border:1px solid var(--border);border-radius:18px 18px 0 0;padding:12px 16px calc(18px + var(--safe-bottom));box-shadow:0 -16px 50px rgba(0,0,0,.38);}
```

Le passage de `display:none` à `display:flex` (`index.html:1792` puis `index.html:1795`) est
instantané : la feuille et son fond noir **se téléportent** à l'écran, puis disparaissent de la
même façon.

Deux problèmes, l'un de cohérence, l'autre de compréhension :

1. Deux composants au patron identique se comportent différemment. C'est exactement le genre
   d'incohérence qui fait qu'une interface « ne se tient pas », même sans qu'on sache dire
   pourquoi.
2. Une feuille qui apparaît d'un coup n'explique pas d'où elle vient. Une feuille qui monte
   depuis le bas rend le geste de fermeture (glisser vers le bas, que la poignée
   `.ux-sheet-handle` de `index.html:602` suggère déjà visuellement) intuitif.

C'est de loin la plus grosse occasion manquée du projet : la surface est utilisée pour l'accès
rapide, le peek d'une étape, le choix du focus espèce, le glossaire et le réglage de densité.

## Target

Même mécanique que le plan 001 : `.open` gère uniquement l'affichage (`display`), une seconde
classe `.is-open` porte l'animation, en *transitions* pour rester interruptible.

```css
/* cible — remplace index.html:599-601 */
.ux-backdrop{position:fixed;inset:0;z-index:70;background:rgba(4,8,14,.58);backdrop-filter:blur(3px);display:none;align-items:flex-end;justify-content:center;opacity:0;transition:opacity .18s var(--ease-out);}
.ux-backdrop.open{display:flex;}
.ux-backdrop.is-open{opacity:1;}
.ux-sheet{width:min(720px,100%);max-height:min(78vh,720px);overflow:auto;background:var(--surface-2);border:1px solid var(--border);border-radius:18px 18px 0 0;padding:12px 16px calc(18px + var(--safe-bottom));box-shadow:0 -16px 50px rgba(0,0,0,.38);transform:translateY(100%);transition:transform .28s var(--ease-drawer);}
.ux-backdrop.is-open .ux-sheet{transform:translateY(0);}
```

`translateY(100%)` est un pourcentage : il vaut la hauteur propre de la feuille, quel que soit
son contenu — de l'accès rapide à deux boutons jusqu'au glossaire. Aucune valeur en pixels ne
doit être introduite ici.

Valeurs imposées : `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` pour la feuille (courbe de
tiroir iOS), `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` pour le fond. 280 ms pour la feuille,
180 ms pour le fond — budget modale/tiroir : 200–500 ms. Les deux tokens sont créés par le
**plan 003, à exécuter avant celui-ci**.

```js
/* cible — remplace la fin de openUXSheet(), index.html:1792-1793 */
back.classList.add('open'); document.body.style.overflow='hidden';
void back.offsetWidth;                       // force le reflow : sans ça, display:flex et
back.classList.add('is-open');               // is-open sont appliqués dans la même frame
requestAnimationFrame(()=>sheet.querySelector('button')?.focus({preventScroll:true}));
```

```js
/* cible — remplace closeUXSheet(), index.html:1794-1799 */
function closeUXSheet(){
  const back=document.getElementById('uxBackdrop');
  document.body.style.overflow='';
  const target=uxSheetReturnFocus; uxSheetReturnFocus=null;
  if(target&&document.contains(target)) requestAnimationFrame(()=>target.focus({preventScroll:true}));
  if(!back)return;
  back.classList.remove('is-open');
  if(typeof REDUCE_MOTION!=='undefined'&&REDUCE_MOTION.matches){ back.classList.remove('open'); return; }
  let done=false;
  const hide=()=>{ if(done)return; done=true;
                   if(!back.classList.contains('is-open')) back.classList.remove('open'); };
  back.addEventListener('transitionend',hide,{once:true});
  setTimeout(hide,360);
}
```

Le test `!back.classList.contains('is-open')` protège le cas où l'utilisateur rouvre la feuille
avant la fin de la fermeture : sans lui, le `setTimeout` en vol masquerait la feuille
fraîchement rouverte. Le `setTimeout(hide,360)` est le filet si `transitionend` n'arrive jamais
(onglet passé en arrière-plan).

## Repo conventions to follow

- Le shell `#uxBackdrop` / `#uxSheet` est déjà persistant dans le DOM et n'est jamais démonté :
  seule `sheet.innerHTML` change (`index.html:1791`). Ne pas changer ce fonctionnement, il est
  déjà correct — c'est justement lui qui rend l'animation propre et possible.
- Exemplaire de la même mécanique dans ce projet après le plan 001 : `.tree-overlay.is-open`
  (`index.html:711`).
- CSS inline dans le `<style>`, propriétés compactées sans espace après `:`.
- Aucune librairie d'animation.

## Steps

1. Vérifier que `--ease-out` et `--ease-drawer` existent dans `:root` (`index.html:16-22`). Si
   non, STOP : exécuter le plan 003 d'abord.
2. Remplacer `index.html:599-601` par les quatre règles CSS cibles.
3. Dans `openUXSheet()` (`index.html:1787`), remplacer les deux dernières lignes du corps par
   le bloc JS cible (ajout de `void back.offsetWidth;` et de `back.classList.add('is-open')`).
4. Remplacer entièrement `closeUXSheet()` (`index.html:1794-1799`) par la version cible.
5. Vérifier les autres endroits qui manipulent `#uxBackdrop` : `index.html:3243` (touche
   Échap) appelle `closeUXSheet()` et teste `back?.classList.contains('open')` — ce test reste
   correct, `.open` étant toujours présent pendant la fermeture. Ne rien y changer.

## Boundaries

- Ne PAS changer le contenu, la structure ou la logique de `openUXSheet()` au-delà des deux
  lignes indiquées : le `innerHTML`, la gestion du focus de retour et `document.body.style.overflow`
  restent tels quels.
- Ne PAS introduire de hauteur en pixels pour la position de départ de la feuille :
  `translateY(100%)` uniquement.
- Ne PAS ajouter de geste de glissement vers le bas (drag-to-dismiss) : hors périmètre, ce
  serait une fonctionnalité, pas une animation.
- Ne PAS toucher à `.tree-overlay` (plan 001).
- Ne PAS ajouter de dépendance.
- Si le code trouvé ne correspond pas aux extraits ci-dessus, STOP et signaler.

## Verification

- **Mécanique** : console sans erreur. Après fermeture, inspecter `#uxBackdrop` : il doit avoir
  perdu **les deux** classes `open` et `is-open`, et son `display` calculé doit être `none`
  (sinon il intercepte les taps sur toute la page — c'est la régression à surveiller en
  priorité).
- **Feel check** :
  - Ouvrir « Accès rapide » via le bouton flottant : le fond apparaît en fondu et la feuille
    monte depuis le bas de l'écran, sans à-coup au démarrage.
  - Fermer via la croix, puis via Échap, puis via un tap hors de la feuille : les trois voies
    doivent rejouer la descente.
  - Ouvrir/fermer très vite 5 fois : la feuille doit repartir de sa position courante, et
    finir visible si le dernier geste était une ouverture.
  - Ouvrir le glossaire (feuille au contenu long) puis l'accès rapide (contenu court) : les
    deux doivent partir du bas de leur propre hauteur, aucune ne doit « sauter ».
  - Comparer avec l'arbre de décision ouvert juste après : les deux feuilles doivent donner la
    même impression de matière. C'est le but du plan.
  - DevTools → panneau Animations, lecture à 10 % : la feuille ne doit pas dépasser sa position
    finale (pas de rebond — `--ease-drawer` n'en a pas).
- **Done when** : les six points passent et `#uxBackdrop` est bien `display:none` au repos.
