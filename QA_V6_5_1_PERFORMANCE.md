# QA — V6.5.1 Performance

## Validation statique

- JavaScript extrait de `index.html` : `node --check` OK.
- `sw.js` : syntaxe JavaScript OK.
- JSON critiques : `data.json`, `tides_2026.json`, `synthesis.json`, `lure_typology.json` valides.
- Python : `pipeline.py` compile.

## Test de non-régression fenêtre

Comparaison V6.5 vs V6.5.1 sur Ise-Shima / Hamachi / 26-11-2026 :

- indice maximum : `75` dans les deux versions ;
- meilleure fenêtre : `06:30–08:00` dans les deux versions ;
- moyenne de fenêtre : `70` ;
- moment dominant du pic : `aube` ;
- phase au pic : `étale` ;
- proxy de variation de niveau : `0.14507`.

La passe performance ne change donc pas la formule de pêche dans ce cas de référence.

## Benchmark synthétique du moteur

Environnement : Node.js VM, mêmes fichiers JSON, construction du pad Ise-Shima (6 espèces). Ce benchmark mesure le coût JavaScript pur et **n'est pas un benchmark d'iPhone**.

### V6.5

- construction à froid d'un pad Ise-Shima : ~`5277 ms` sur ce harness.

### V6.5.1

Après reset des caches entre essais :

- froid : `33.3 / 14.9 / 15.0 / 13.6 / 13.4 ms` ;
- médiane à froid : ~`14.9 ms` ;
- rendu répété déjà en cache : ~`0.4–1.0 ms` ;
- passage au jour suivant après premier rendu : ~`6.9 ms`.

La différence vient principalement de la suppression des rescans imbriqués du corpus et du fait que les autres journées sont désormais chargées progressivement.

## Comportement UX attendu

- le tap sur un pad donne un feedback visuel immédiatement ;
- le calcul lourd éventuel arrive au frame suivant, sans laisser croire que le tap n'a pas été pris ;
- rouvrir un pad déjà calculé doit être quasi instantané ;
- Préc./Suiv. ne doit plus reconstruire l'ensemble de l'accueil ;
- les boutons des autres jours peuvent afficher brièvement `… / calcul en fond`, puis se remplir automatiquement.

## Vérifications manuelles recommandées sur iPhone

1. ouvrir/fermer Ise-Shima 5 fois ;
2. naviguer 26 → 27 → 28 novembre ;
3. ouvrir une fenêtre Hamachi puis la fermer ;
4. revenir à l'accueil et ouvrir Kobe ;
5. vérifier que les scores/fenêtres restent identiques à la V6.5 ;
6. tester après suppression/réinstallation de la PWA pour forcer le nouveau service worker.
