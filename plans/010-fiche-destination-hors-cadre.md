# 010 — La fiche destination sortait du cadre

- **Status**: DONE (corrigé et vérifié le 2026-08-16)
- **Severity**: HIGH — défaut visible signalé à l'usage
- **Category**: mise en page
- **Estimated scope**: 1 fichier (`index.html`), 5 déclarations

## Le symptôme

À l'ouverture d'une étape, le panneau de détail débordait visiblement de sa carte.

## La cause

Mesuré : la grille `.pad-grid` calculait une piste de **577,4 px dans un conteneur de
339 px**. Le panneau `.pad-detail` (`grid-column: 1 / -1`) suivait la piste et dépassait
donc de 238 px sur la droite, entraînant avec lui la barre contextuelle, la courbe de
marée et tout le contenu.

L'origine est une subtilité de CSS Grid : **`1fr` vaut implicitement `minmax(auto, 1fr)`**,
et ce `auto` interdit à la piste de descendre sous la largeur minimale de son contenu. Le
détail d'étape contient la courbe de marée, dont la largeur mini poussait la colonne à
577 px. La grille obéissait à son contenu au lieu de son conteneur.

Le défaut existait en germe depuis toujours, mais il est devenu visible avec le passage en
colonne unique du plan 009 : en deux colonnes, la piste faisait la moitié de la largeur et
le débordement se répartissait différemment.

## La correction

```css
/* avant */ grid-template-columns: repeat(2, 1fr);   /* et 1fr en colonne unique */
/* après */ grid-template-columns: repeat(2, minmax(0,1fr));
```

Appliqué aux trois grilles concernées : `.pad-grid` (base et variante colonne unique) et
`.species-grid`, qui présentait le même risque. Le `minmax(0, …)` autorise la piste à
descendre sous la largeur mini du contenu, lequel s'adapte alors au lieu de forcer.

Résultat : piste **339 px**, détail **339 px**, débordement **0**.

## Deux défauts trouvés dans la foulée

**Le débord négatif de la barre contextuelle ne correspondait plus au padding.**
`.dest-context-sticky` portait `margin:-13px -14px` pour venir affleurer les bords de la
carte, mais le calage sur la grille 8 points du plan 009 avait porté le padding de
`.pad-detail` à `12px`. La barre dépassait donc de 2 px de chaque côté. Marge alignée sur
`-12px -12px 12px`.

**Les cartes de jour tronquaient leur meilleure fenêtre.** `.bestfish` portait
`white-space:nowrap` + `text-overflow:ellipsis` ; au plancher typographique de 11 px,
« AORI · 07:00–08:00 » demandait 63 px de plus que la carte et l'horaire disparaissait
derrière l'ellipse. Le skill interdit la troncature : le texte passe maintenant à la
ligne, et la largeur mini des cartes passe de 74 à 92 px. La rangée défile déjà
horizontalement par conception, donc rien n'est perdu.

## Vérification

Quatre étapes ouvertes l'une après l'autre, viewport 375×812 :

| Contrôle | Résultat |
| --- | --- |
| Détail dans le cadre | **oui** sur les 4 |
| Débordement à droite | **0 px** (était 238) |
| Enfants hors cadre | aucun |
| Débordement horizontal de page | 0 |
| `.bestfish` tronqué | **non** — texte complet sur 2 lignes |
| Courbe de marée | intacte, 192 barres, 4 libellés d'espèce |

La rangée de jours reste volontairement défilante : 392 px de contenu pour 313 utiles,
trois cartes pleinement visibles et la quatrième amorcée, ce qui signale le défilement.

## Note de méthode

Mon détecteur de débordement signalait aussi `.tide-day` et des nœuds SVG. Faux positifs
dans les deux cas : la rangée de jours est un conteneur à défilement dont les enfants
dépassent légitimement, et `scrollWidth`/`clientWidth` n'ont pas de sens sur un élément
SVG. Vérifié avant de conclure — mesurer l'étendue réelle plutôt que la boîte évite de
« corriger » ce qui va bien.
