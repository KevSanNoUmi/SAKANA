# Audit complet — Carnet Pêche JP V6.4

Date d'audit : 2026-08-11

## Verdict

La base technique de la PWA est saine (JSON valides, Python et JavaScript compilent, SQLite `integrity_check=ok`, aucune violation de clé étrangère, service worker V6.4 cohérent). Le risque principal n'est plus le code : c'est **la qualité de l'inférence**. La V6.4 transforme aujourd'hui un corpus de rapports principalement positifs et très hétérogènes en scores temporels précis. Cette transformation est utile visuellement, mais elle peut créer une précision et un consensus supérieurs à ce que les données permettent réellement.

Avant d'ajouter de nouvelles fonctions, priorité à une V6.5 « data integrity + anti-biais ».

## Chiffres d'audit

- 493 observations, 10 espèces.
- 23 groupes de mêmes faits répétés (même espèce + même source + même texte), soit **33 lignes surnuméraires (6,7 % du corpus)**.
- 14 « Decision rule / … » présentes dans `observations` alors qu'il s'agit d'interprétations dérivées.
- Couverture des tags : `moment_jour` 147/493 (29,8 %), `maree` 26/493 (5,3 %), `couleur_eau` 15/493 (3,0 %), `pression_atmo` 0/493.
- 94 sources dans SQLite, 33 seulement ont une URL enregistrée ; 431/493 observations sont liées à une source sans URL dans la table `sources`.
- Hirame : 49/118 observations proviennent de sources dont le libellé dit explicitement « non identifié » (~41,5 %).
- 236 recommandations contiennent un leurre ; le moteur ne connaît un poids exploitable que pour 97 d'entre elles. **139 recommandations ont un poids inconnu**, et `recommendationAllowed()` les autorise par défaut.

## P0 — corrections indispensables

### 1. Dédoublonnage canonique
`bootstrap_json()` crée des fingerprints `legacy`, alors que `import_research()` utilise des fingerprints `research`. Le même fait peut donc entrer plusieurs fois par deux chemins différents. Il faut un `canonical_claim_hash` indépendant du chemin d'import (espèce canonique + source canonique + texte normalisé + date/heure + recommandation normalisée), puis nettoyer les 33 lignes surnuméraires.

### 2. Sortir les règles dérivées du corpus de preuves
Les 14 lignes `Decision rule / …` sont des synthèses, pas des observations. Elles doivent aller dans une table `inferences` ou `trip_intel`, avec provenance vers les observations support. Une inférence ne doit jamais pouvoir confirmer l'observation qui l'a produite.

### 3. Corriger la taxonomie / contamination inter-espèces
- Hamachi contient au moins 14 entrées qui parlent de Sagoshi/Sawara ; plusieurs alimentent le timing « aube ».
- Suzuki contient 19 entrées Hirasuzuki. Hirasuzuki doit au minimum être un `subtype` distinct de Marusuzuki/Suzuki, sinon les patterns surf/sarashi contaminent les patterns baie/canal.
- Une entrée Aori-Ika est explicitement une seiche ; elle doit rester un signal eging/trip intel, pas une preuve Aori.

Une vue conservatrice, après dédoublonnage + retrait des règles dérivées + déplacement des contaminations évidentes, laisse environ **427 lignes de décision**. Les lignes déplacées ne doivent pas forcément être supprimées : beaucoup doivent être reclassées.

### 4. Corriger le filtre matériel >50 g
Le principe est bon, l'implémentation ne l'est pas encore : `recommendationAllowed()` accepte tout poids inconnu. Trois recommandations actives sont déjà des violations certaines : BOAR SS170, BOAR SS195, i-SLIDE 187R SW. Il faut conserver les modèles >50 g dans la typologie avec `allowed_for_user=false`, au lieu de les supprimer de la typologie. État recommandé : `VERIFIED_OK`, `VERIFIED_OVER_LIMIT`, `UNKNOWN_WEIGHT`. Les `UNKNOWN_WEIGHT` ne doivent pas être recommandés par modèle tant qu'ils ne sont pas vérifiés.

## Audit des fenêtres idéales

### 5. Les pourcentages actuels ne sont pas des taux de succès
`bestMomentsBySpecies()` calcule la distribution uniquement parmi les observations qui possèdent `moment_jour`. Il n'existe pas de dénominateur d'effort (heures pêchées, sessions sans touche, nombre de pêcheurs). Ce sont donc des **parts de rapports taggés**, pas des probabilités de prise ni des taux d'efficacité.

Exemples : Hirame n=17/118 seulement ; Hamachi n=35/110 ; Tachiuo n=7/16.

### 6. L'extraction multiple depuis une même source fausse les fréquences
Quand on donne une voix égale à chaque observation, une vidéo dont 10 phrases ont été extraites vaut 10 fois une source qui n'a produit qu'un fait. Le rééquilibrage par source change parfois fortement la conclusion :

| Espèce | Fréquence brute | Après normalisation par source |
|---|---|---|
| Hirame | aube 35 %, jour 35 %, crépuscule 29 % | aube 27 %, **jour 50 %**, crépuscule 23 % |
| Suzuki | **nuit 63 %**, aube 21 % | nuit 45 %, aube 30 % |
| Aori-Ika | **jour 46 %**, nuit 38 % | **nuit 51 %**, jour 30 % |
| Tachiuo | **crépuscule 57 %**, nuit 43 % | **nuit 58 %**, crépuscule 42 % |

Une conclusion qui peut s'inverser après normalisation par source ne doit pas être présentée comme consensus fort.

### 7. Les fenêtres de 15 minutes sont plus précises que les données
Les observations sont surtout taggées `aube/jour/crépuscule/nuit`. L'app transforme ces quatre classes en fenêtres continues autour du lever/coucher, puis calcule tous les 15 min. Une fenêtre comme « 06:15–07:45 » est donc **une interpolation heuristique**, pas une fenêtre directement observée à cette précision.

Affichage conseillé : `fenêtre calculée`, avec résolution visuelle 30–60 min ; réserver les minutes exactes aux captures réellement horodatées.

### 8. Biais « il faut toujours trouver une meilleure fenêtre »
`contiguousWindows()` prend les points proches du maximum du jour. Cela favorise mécaniquement l'apparition d'un meilleur créneau même quand la journée est médiocre. Ajouter une classe `AUCUNE FENÊTRE FORTE` et un seuil absolu fondé sur le niveau de preuve, pas seulement sur le maximum relatif.

### 9. Prior de courant caché
Pour une espèce sans tag marée, `tideAffinityForSpecies()` retourne 0,58 et `movementAffinityForSpecies()` favorise quand même le milieu de marée. Ainsi Aori, Kurodai et Tachiuo, qui ont 0 observation marée, reçoivent un bonus de « mouvement ». C'est une hypothèse transversale qui est actuellement appliquée comme si elle était spécifique à l'espèce.

Correction : sans données marée espèce, composante marée neutre ; si l'on veut garder le principe transversal « courant déclencheur », l'afficher explicitement comme `HEURISTIQUE TRANSVERSALE` et lui donner un poids faible.

### 10. Variation de niveau ≠ courant réel
`tideMovementIndex()` est un sinus entre PM/BM et mesure une variation de phase de marée théorique. Dans une passe, un détroit ou autour d'une structure, l'heure/intensité du courant réel peut être décalée. Le terme « courant » doit être réservé à une donnée de courant ; sinon afficher `variation de niveau / phase de marée`. Le mot `étale` devrait devenir `proximité PM/BM` sauf si une table de courant est disponible.

### 11. Score journalier trop normatif
`tideDayScore()` vaut 55 % mouvement + 25 % préférence de phase + 20 % marnage relatif. Ces pondérations sont heuristiques. Le marnage le plus fort du séjour n'est pas nécessairement le meilleur pour chaque spot/espèce. Les espèces sans timing reçoivent par défaut aube/crépuscule 50/50, ce qui leur donne un vote qu'elles ne méritent pas. Exclure les espèces sans minimum de support et apprendre les poids séparément par espèce/spot lorsque possible.

## Audit du moteur Evidence

### 12. Localité trop généreuse
Les alias sont très larges (`suruga`, `kumano`, `shima`…). Une observation de Suruga Bay peut recevoir 5/5 de localité pour deux destinations différentes ; `kumano` peut être traité comme « local » d'Ise-Shima. Remplacer le matching texte par niveaux explicites : `spot exact`, `même baie`, `côte adjacente`, `région`, `Japon`, idéalement avec coordonnées/distance.

### 13. Saison ≠ récence
`calendarDistance()` ignore volontairement l'année. Un 22 novembre ancien et un 22 novembre 2025 ont le même score saisonnier. Séparer `seasonal_match` et `recency`. Pour réglementation/accès, la récence doit peser très fort ; pour comportement biologique, décroissance plus lente.

### 14. Faux indépendants / faux dépendants
`evidenceOrigin()` utilise le domaine URL ou le début du nom de source. Comme beaucoup de sources n'ont pas d'URL, YAMASHITA, Maria et YAMARIA peuvent être comptés comme origines distinctes malgré un groupe commun. À l'inverse, différents pêcheurs sur Anglers peuvent être écrasés sous un seul domaine.

Modèle recommandé : `auteur individuel` → `plateforme/éditeur` → `groupe corporate`. La réplication doit tenir compte des trois niveaux.

### 15. Ancien score de confiance encore actif
Le vieux `confidence` gagne +0,15 par source partageant au moins deux tags. Deux tags génériques ne prouvent pas la même affirmation. De plus `marque=1.0` est correct pour une fiche produit, mais pas pour démontrer l'efficacité biologique. Ce score doit devenir `legacy_source_score`, être caché de l'UI et ne plus servir de fallback dans Evidence.

### 16. Double comptage des mêmes faits dans plusieurs scores
La même observation peut alimenter : fréquence horaire + préférence de marée + localité + plan de leurre + niveau de preuve. L'utilisateur voit plusieurs indicateurs qui semblent indépendants alors qu'ils proviennent de la même ligne. Ajouter un graphe de provenance et un `overlap penalty` ou, plus simplement, afficher les composantes qui partagent les mêmes sources.

## Biais de confirmation / sélection à surveiller

### 17. Publication bias : corpus « présence seulement »
Anglers, magasins, vidéos et fabricants publient surtout captures, techniques qui ont fonctionné, ou produits à montrer. Les capots et heures sans activité sont sous-représentés. C'est le biais le plus important : **le corpus ne permet pas d'estimer une probabilité de capture**. Il mesure du support documentaire.

### 18. Le log personnel renforce les succès mais apprend peu des échecs
Une session `rien` est importée, mais sans recommandation ; `technicalObservations()` l'exclut ensuite des consensus de leurres/animations. Une prise renforce donc un pattern, un échec comparable ne le réduit pas. Ajouter une table `effort_sessions` (durée, casts, combo, leurre, conditions, résultat) et calculer les performances personnelles avec succès **et échecs**.

### 19. Exact-date bias du deep research
Chercher explicitement des captures les 15, 16, 17 novembre ou les jours exacts du voyage prouve surtout que « c'est possible à cette période ». Cela ne démontre pas que ces dates sont meilleures. Pour chaque destination, compléter par une collecte symétrique sur une fenêtre fixe (ex. ±14 jours), incluant autant que possible les rapports sans résultat.

### 20. Biais fabricant / éditorial
Le corpus est concentré : Aori compte 28 entrées YAMASHITA/YAMARIA + 13 YAMASHITA support ; Tachiuo 12/16 viennent de sources YAMASHITA. Ces sources sont excellentes pour mécanique produit et montage, mais ne doivent pas seules démontrer supériorité d'une méthode/couleur. Distinguer `product_spec`, `manufacturer_method_claim` et `field_result`.

### 21. Biais de cible
Le pipeline est construit autour de 10 espèces. Des poissons réellement présents mais hors liste peuvent être poussés dans le bucket « le plus proche » : Sagoshi/Sawara en est l'exemple. Ajouter `other_species`/`predator_signal` ou étendre le référentiel plutôt que remapper.

### 22. Biais de compatibilité matériel — voulu, mais à nommer correctement
Filtrer à ≤50 g est pertinent pour ton voyage. En revanche l'app doit dire `MEILLEURE OPTION COMPATIBLE AVEC TA VALISE`, et non laisser entendre `MEILLEURE TECHNIQUE ABSOLUE`. On garde les preuves biologiques des techniques lourdes mais on ne les propose pas.

## QCM et couleurs

### 23. Pression atmosphérique actuellement non informative
Le QCM demande la pression, mais **0 observation sur 493** n'a `pression_atmo`. La pression ne peut donc pas améliorer le classement ; elle augmente seulement le dénominateur de « compatibilité conditions », ce qui pénalise visuellement toutes les recommandations. La retirer du matching jusqu'à avoir une base ou l'afficher comme donnée de session uniquement.

### 24. Couleur : logique riche, preuve mince
77 recommandations ont une couleur, mais seulement 15 observations taggent la couleur de l'eau. La matrice eau claire/verte/trouble est surtout une heuristique optique. Elle est utile, mais doit être séparée du consensus terrain et nommée `HEURISTIQUE DE SIGNAL`. Modéliser chaque coloris par propriétés (`transparence`, `flash`, `UV`, `glow`, `teinte`, `contraste`) plutôt que par mots-clés ; `natural` ne doit pas automatiquement tomber dans le groupe `silver`.

## Destinations, dates et marées

### 25. Les `stay_dates` sont maintenant correctes, mais du texte ancien reste
Les dates structurées sont bonnes : Fukuoka 15–18, Kobe 21–24, Ise-Shima 26–28, Numazu 29/11–01/12, Tokyo 02–05/12. En revanche `data.json` et les fichiers research contiennent encore des phrases « quatre jours » pour Ise-Shima/Numazu, un ancien label Kobe 20–23 et un texte Numazu 29/11–02/12. Il faut corriger à la source puis régénérer, pas faire des patches uniquement dans l'UI.

### 26. Marées : bonne décision architecturale, traçabilité incomplète
Le retrait des anciennes constantes harmoniques factices est une vraie amélioration. Les extrema JMA embarqués + interpolation cosinus sont adaptés comme **visualisation astronomique**, à condition de ne pas les appeler courant réel. Plusieurs jours embarqués n'ont toutefois pas `source_url` dans `tides_2026.json`, et Hakata→Itoshima / Toba→Ise-Shima sont des proxies. Conserver pour chaque journée : station, URL officielle, distance/proxy, incertitude locale.

### 27. Accès/réglementations : information à durée de vie courte
Les restrictions de quai, travaux, horaires et zones autorisées doivent avoir `checked_at` + `expires_at` et être reverifiées peu avant le séjour. Elles ne doivent pas recevoir le même modèle de récence que les patterns biologiques.

## Architecture / qualité logicielle

Points positifs confirmés :
- SQLite intègre (`integrity_check=ok`, aucune FK cassée).
- JSON parseables ; Python et JavaScript passent la vérification syntaxique.
- PWA pré-cache désormais les données critiques et fait network-first sur les JSON.
- La séparation `opportunité` / `niveau de preuve` est conceptuellement excellente.
- L'idée « conserver le fait biologique mais exclure la recommandation >50 g » est la bonne architecture.
- La séparation geste pêcheur → comportement leurre → déclencheur est utile et doit être conservée.

## Ordre recommandé pour V6.5

1. Dédoublonner et créer un hash canonique.
2. Sortir toutes les inférences dérivées des observations.
3. Reclasser Sagoshi/Sawara, Hirasuzuki et proxies autres espèces.
4. Refaire le filtre poids en trois états (`OK / OVER / UNKNOWN`) et restaurer les poids lourds dans la typologie pour pouvoir les exclure proprement.
5. Recalculer timings et marées **par source indépendante**, avec couverture `n taggé / n total` et minimum de sources.
6. Neutraliser toute composante marée sans données espèce ; renommer mouvement/étale.
7. Ajouter effort négatif dans le log terrain.
8. Refaire Evidence avec provenance hiérarchique + localité géographique + récence séparée.
9. Retirer pression du QCM décisionnel jusqu'à données suffisantes ; séparer couleur heuristique vs preuve terrain.
10. Nettoyer les textes/date stale, régénérer briefs et ajouter validation de fraîcheur des accès.

## Principe anti-biais à graver dans le produit

**L'app ne doit jamais répondre « ce qui marche le mieux » quand le corpus ne mesure pas l'effort. Elle doit répondre : « ce qui est le mieux supporté par les preuves disponibles, dans ton contexte et avec ton matériel ».**
