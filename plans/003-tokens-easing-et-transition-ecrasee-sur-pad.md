# 003 — Créer les tokens d'easing et réparer la transition écrasée sur `.pad`

- **Status**: DONE (appliqué et vérifié le 2026-08-16)
- **Commit**: n/a (le projet n'est pas un dépôt git)
- **Severity**: MEDIUM
- **Category**: 2. Easing & duration + 7. Cohesion & tokens
- **Estimated scope**: 1 fichier (`index.html`), ~10 lignes touchées

## Problem

### a) Le retour au toucher des tuiles est cassé par une règle en double

`index.html:45-47` donne aux tuiles de l'accueil un retour de pression « touche mécanique » :
la tuile s'enfonce de 2 px pendant que son ombre portée s'écrase, les deux en 90 ms.

```css
/* index.html:45 — actuel */
.pad{background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:14px; cursor:pointer;
  box-shadow:0 2px 0 rgba(0,0,0,.20), 0 4px 10px rgba(0,0,0,.22); transition:transform .09s ease, box-shadow .09s ease;}
.pad:not(.open):active{transform:translateY(2px); box-shadow:0 1px 0 rgba(0,0,0,.20), 0 2px 5px rgba(0,0,0,.20);}
```

Mais 523 lignes plus bas, une règle ajoutée en V6.5.11 redéclare `transition` sur le même
sélecteur, avec la même spécificité (une classe). Étant plus bas dans la feuille, **elle
gagne** :

```css
/* index.html:569 — actuel */
.pad,.species-card{position:relative;transition:opacity .15s,border-color .15s,transform .15s;}
```

Conséquences, aujourd'hui, en production :

1. l'enfoncement passe de 90 ms à **150 ms** — le retour au doigt traîne ;
2. `box-shadow` n'est plus dans la liste, donc **l'ombre claque instantanément** pendant que la
   tuile, elle, descend en 150 ms. L'illusion de touche mécanique se casse : l'ombre disparaît
   avant que la tuile ait bougé.

Vérifié : aucune règle n'applique jamais de `transform` à `.species-card`
(`index.html:115-122`, `index.html:644`, `index.html:685`, `index.html:1976`), la partie
`transform .15s` de la ligne 569 ne sert donc qu'à casser `.pad`. Même constat sur
`index.html:266`, où `.fish-window-row` transitionne un `transform` qui ne lui est jamais posé.

### b) Aucun token, et `ease` par défaut sur des entrées

Le projet n'a aucune variable de courbe ni de durée : huit durées écrites à la main
(`.08s`, `.09s`, `.12s`, `.15s`, `.18s`, `.22s`, `.65s`, `.8s`) et, pour les courbes,
uniquement `ease` ou `linear`. Les courbes CSS natives sont trop molles pour du mouvement
délibéré. Deux entrées utilisent aujourd'hui `ease` alors que toute entrée/sortie doit être en
`ease-out` — qui démarre vite, donc répond tout de suite :

```css
/* index.html:659 — actuel */
.swipe-flash{…;animation:swipeFlash .8s ease both;}
/* index.html:709 et index.html:730 — actuel (retour de pression) */
transition:transform .09s ease, box-shadow .09s ease;
```

## Target

### Tokens, ajoutés au bloc `:root` existant

```css
/* cible — à ajouter dans :root, index.html:16-22 */
--ease-out:cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out:cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer:cubic-bezier(0.32, 0.72, 0, 1);
```

Ces trois valeurs sont imposées, ne pas les approximer. `--ease-drawer` n'est pas utilisé par
ce plan : il est consommé par les plans 001 et 005.

### `.pad` — une seule déclaration de `transition`

```css
/* cible — index.html:46, ligne de suite de la règle .pad */
box-shadow:0 2px 0 rgba(0,0,0,.20), 0 4px 10px rgba(0,0,0,.22); transition:transform .12s var(--ease-out), box-shadow .12s var(--ease-out), opacity .15s, border-color .15s;}
```

```css
/* cible — remplace index.html:569 */
.pad,.species-card{position:relative;}
.species-card{transition:opacity .15s,border-color .15s;}
```

La ligne 569 ne déclare plus `transition` sur `.pad` : la règle de la ligne 46 redevient la
seule source, et elle absorbe le `opacity`/`border-color` dont le mode Focus a besoin
(`.focus-miss` / `.focus-hit`, `index.html:570-571`).

120 ms est la valeur cible du retour de pression (budget : 100–160 ms). C'est 30 ms de plus
que l'intention d'origine, mais 30 ms de moins que ce que l'app fait réellement aujourd'hui.

### Courbes d'entrée et de pression

```css
/* cible — index.html:266, retirer le transform mort */
.fish-window-row{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:10px 11px;transition:opacity .15s,border-color .15s,background .15s;}
/* cible — index.html:659 */
.swipe-flash{…;animation:swipeFlash .8s var(--ease-out) both;}
/* cible — index.html:709 et index.html:730 */
transition:transform .12s var(--ease-out), box-shadow .12s var(--ease-out);
```

**Ne pas toucher** aux transitions de couleur : `.species-tab` (`index.html:128`),
`.window-top` (`index.html:295`), `.pad-detail.perf-refreshing` (`index.html:554`).
`ease` est la courbe correcte pour un changement de couleur ou d'opacité — ce ne sont pas des
constats. De même, `perfSpin` (`index.html:553`) en `.65s linear infinite` est correct pour un
spinner : mouvement constant, et rapide (un spinner rapide fait paraître le chargement plus
court).

## Repo conventions to follow

- Le bloc `:root` de `index.html:16-22` regroupe déjà toutes les variables, une famille par
  ligne (`--bg/--surface/--surface-2`, puis `--accent/--accent-dim`, etc.). Ajouter les trois
  courbes sur une ligne dédiée, dans le même style compact.
- CSS inline dans le `<style>`, propriétés compactées sans espace après `:`.
- Aucune librairie d'animation dans ce projet : CSS pur.

## Steps

1. Dans `:root` (`index.html:16-22`), ajouter une ligne avec les trois tokens `--ease-out`,
   `--ease-in-out`, `--ease-drawer`, aux valeurs exactes ci-dessus.
2. `index.html:46` — remplacer la déclaration `transition` de `.pad` par la version cible
   (transform + box-shadow en `.12s var(--ease-out)`, plus `opacity` et `border-color`).
3. `index.html:569` — remplacer la règle par les deux règles cibles (`position:relative` seul,
   puis la `transition` de `.species-card`).
4. `index.html:266` — retirer `,transform .15s` de la liste de `.fish-window-row`.
5. `index.html:659` — remplacer `swipeFlash .8s ease both` par `swipeFlash .8s var(--ease-out) both`.
6. `index.html:709` et `index.html:730` — remplacer `transition:transform .09s ease, box-shadow .09s ease;`
   par `transition:transform .12s var(--ease-out), box-shadow .12s var(--ease-out);`.

## Boundaries

- Ne PAS toucher aux transitions de couleur/opacité listées comme correctes ci-dessus
  (`.species-tab`, `.window-top`, `.pad-detail.perf-refreshing`, `perfSpin`).
- Ne PAS modifier les valeurs de `translateY(2px)` ni les `box-shadow` : le design « touche
  mécanique » est délibéré et cohérent sur `.pad`, `.tree-launch` et `.tree-btn`. Seules les
  durées et les courbes changent.
- Ne PAS toucher à `index.html:630` (rail d'espèces, plan 002) ni à `index.html:711-716`
  (arbre de décision, plan 001).
- Ne PAS ajouter de dépendance.
- Si le code trouvé ne correspond pas aux extraits ci-dessus, STOP et signaler.

## Verification

- **Mécanique** : `grep -c "transition:transform .09s ease" index.html` doit retourner `0`.
  `grep -n "transition" index.html | grep -c "\.pad{"` doit montrer une seule déclaration de
  `transition` applicable à `.pad`. Console sans erreur.
- **Feel check** :
  - Appuyer longuement sur une tuile de l'accueil : la tuile et son ombre doivent s'écraser
    **ensemble**. Aujourd'hui l'ombre saute avant. C'est le point le plus visible du plan.
  - DevTools → panneau Animations, lecture à 10 %, en maintenant l'appui : vérifier que
    `transform` et `box-shadow` démarrent et finissent au même instant.
  - Relâcher : la remontée doit être franche et immédiate, pas molle.
  - Activer un Focus espèce sur l'accueil : les tuiles hors focus doivent toujours s'estomper
    en douceur (opacité .42) — la régression à éviter est qu'elles claquent.
  - Faire un swipe entre onglets d'une fiche espèce : la pastille de confirmation doit monter
    plus franchement qu'avant.
- **Done when** : ombre et enfoncement synchrones sur `.pad`, `.tree-launch` et `.tree-btn`,
  et le fondu du mode Focus toujours présent.
