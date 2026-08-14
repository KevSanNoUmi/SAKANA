# Carnet Pêche JP — V6.5.9 Navigation & lecture

PWA mobile-first de préparation et de décision pour un voyage de pêche du bord au Japon.
Le dépôt contient l'application GitHub Pages, la base SQLite source de vérité, les données
exportées et le pipeline Python d'enrichissement.

## V6.5.9 — Navigation & lecture

Release UX sans changement de données ni de moteur. Les pads destination utilisent désormais une lecture progressive **aperçu → développement** pour la lecture du secteur, le matériel, les preuves et la justification détaillée du créneau. Les fiches espèces remplacent les dots par une barre sticky explicite `Terrain · Leurres · Couleurs · Animations · Comprendre`, toujours accessible pendant le scroll et adaptée aux petits écrans.

## V6.5.8 — UX focus mobile

La courbe de marée met désormais en avant l'espèce prioritaire du jour. Un premier tap sur une bande sélectionne l'espèce et affiche une mini-carte locale ; un second tap ouvre le plan détaillé. Les autres espèces restent visibles mais sont légèrement atténuées. Les tailles d'échantillon sont écrites en langage humain (`6 événements`, `4 cas avec marée renseignée`) et un résumé de confiance documentaire est disponible sans charger les 501 observations. Les scores et fenêtres sont strictement inchangés.


## État de la release

- **501 observations validées** sur **11 espèces**, après curation vidéo, dédoublonnage et séparation taxonomique.
- **264 éléments d'intelligence locale** rattachés aux étapes du voyage.
- **5 destinations de voyage** sur les dates de référence, affichées via **6 pads** (Fukuoka est scindé en Hakata urbain + Shikanoshima/Itoshima). Shizuoka et Kashima restent en base comme contextes de recherche mais ne sont plus affichés comme pads de voyage.
- **27 journées/références de marées astronomiques JMA** embarquées dans `tides_2026.json`.
- Typologie de leurres conservée comme base de connaissance, avec statut matériel explicite : compatible, >50 g vérifié, ou poids à vérifier.
- `research/` contient le **prompt maître de staging**, le lot 2 déjà intégré et le **batch 3 de 21 transcriptions** archivé dans deux sous-dossiers anti-collision, avec curation et import approuvé.



## V6.5.6 — performance architecture

Cette release ne change aucune observation ni aucun score. Elle déplace le travail lourd hors du premier rendu :

- `app_core.json` (~40 KiB) contient l’accueil, les étapes, les combos, les compteurs et les quelques intel visibles ;
- `decision_cache.json` (~110 KiB) embarque les agrégats de récurrence et les 90 séries 30 min du voyage, pré-calculées au build avec **le même moteur JavaScript que la PWA** ;
- `data.json`, `synthesis.json` et `lure_typology.json` sont chargés uniquement lors de l’ouverture d’une fiche espèce ou d’un plan de créneau détaillé ;
- les pads dont les décisions sont embarquées s’ouvrent dans le même tour d’événement, sans squelette ni double `requestAnimationFrame` ;
- le warmup massif après le rendu est supprimé ;
- le service worker est cache-first avec rafraîchissement silencieux pour les données versionnées ;
- `python pipeline.py export` régénère automatiquement les caches runtime via `build_runtime_cache.js` (Node.js requis uniquement lors d’un nouvel export de données).

Le déploiement GitHub Pages reste statique : **aucune étape de build n’est nécessaire au déploiement**, car les deux caches runtime sont versionnés dans le dépôt.

## V6.5.5 — enrichissement comportemental batch 3

Cette passe intègre uniquement les éléments du batch 3 ayant reçu une curation détaillée. Les vidéos pédagogiques, archives réutilisées, modèles non résolus et éléments hors taxonomie restent archivés sans devenir des preuves.

- **30 observations** ajoutées : événements terrain + faits/méthodes techniques ;
- **18 interprétations** ajoutées séparément à `inferences` ;
- corpus total : **501 observations / 35 inférences / 264 intel locales** ;
- **5 captures positives certaines** seulement : Suzuki ×2, Hirame ×3 ;
- **4 événements Suzuki touche/décrochage** conservés comme faits terrain mais exclus de la récurrence positive via `metadata.outcome` ;
- Suzuki passe de **116 à 129 observations** : courant fort → contrôle du fond/lift-fall ; courant plus faible → allègement et récupération lente basse ;
- Hirame passe de **113 à 125 observations** : trois captures terrain supplémentaires, structure proche, contrôle réel du leurre et distinction marée prédite / courant de fond ;
- Hamachi passe de **83 à 88 observations**, mais uniquement par **méthodes 青物 explicitement compatibles Seriola** ; **aucune nouvelle capture Hamachi** n’est ajoutée ;
- `observationPolarity()` lit désormais `metadata.outcome` : `lost` / `bite` / `miss` ne peuvent plus voter comme capture positive ;
- les tags riches de staging (`spot_type`, `comportement`, `profondeur`, saison explicite) sont préservés par `pipeline.py` ;
- cache PWA : `carnet-peche-jp-v6-5-5-behavioral-enrichment-20260812`.

## V6.5.4 — lisibilité mobile des fenêtres

Cette passe ne change **aucun score ni aucune fenêtre**. Elle améliore uniquement la lecture sur petit écran de la frise espèce × 24 h placée au-dessus de la courbe de marée.

- bandes d’intensité espèce épaissies de 4 à 10 unités SVG (≈ ×2,5 visuellement sur téléphone) ;
- espacement vertical des espèces doublé pour conserver la séparation des lignes ;
- hauteur de la courbe portée à 116 px sur écrans ≤430 px afin de ne pas écraser la courbe JMA ;
- zone tactile de chaque ligne épaissie avec la bande ;
- léger contour sombre autour de l’abréviation espèce pour rester lisible sur une bande forte ;
- cache PWA : `carnet-peche-jp-v6-5-4-mobile-readability-20260812`.

## V6.5.3 — enrichissement P0 vidéo curaté

Cette passe intègre uniquement la partie P0 validée du deuxième lot de transcriptions, sans importer les éléments non résolus.

- **31 faits directs** ajoutés aux observations et **9 interprétations** ajoutées séparément à `inferences` ;
- corpus total : **471 observations / 17 inférences / 264 intel locales** ;
- Madai passe de **1 à 9 observations**, avec deux captures shore vidéo et des mécaniques de couche/courant désormais documentées ;
- Suzuki passe de **97 à 116 observations** avec de nouvelles séquences fond → surface, countdown en eau froide et tension-fall au ras des structures ;
- Hirame passe de **110 à 113 observations**, en important seulement le delta utile du wando/sandbar ;
- Saba passe de **1 à 2 observations** : la nouvelle capture de juin reste un signal écosystème, pas une règle saisonnière pour le voyage ;
- le moteur de récurrence et Evidence utilise désormais `metadata.event_id` en priorité : plusieurs faits issus d’un même poisson restent **une seule voix** ;
- `metadata.exclude_presence_evidence` permet à une méthode/explication technique d’enrichir les facettes leurre/animation sans gonfler artificiellement la preuve de présence ;
- `source_identity` du staging est lu par la hiérarchie auteur → plateforme → groupe lorsqu’il est disponible ;
- le pipeline conserve séparément tags de recherche et métadonnées riches (`event_id`, `outcome`, `source_locator`, provenance) ;
- la capture Madai Shizuoka conserve **tête plombée 18 g** comme fait, mais le **poids total lancé reste inconnu** : Bone Bait est donc bloqué comme modèle précis tant que le total n’est pas vérifié ;
- cache PWA : `carnet-peche-jp-v6-5-3-p0-enrichment-20260812`.

Le contrôle Ise-Shima / Hamachi / 26 novembre reste **75 · 06:30–08:00 · moyenne 70 · aube · étale · proxy 0,14507**.

Le dossier `research/raw_transcripts/` conserve les 13 transcriptions du lot ; seules les sources P0 approuvées sont importées dans la base. Les éléments `UNRESOLVED` restent dans la curation/staging et ne deviennent pas des recommandations actives.

## V6.5.2 — correctifs d’intégrité

Cette passe corrige l’intégrité sans toucher aux formules de fenêtres ni au refactor performance V6.5.1.

- `lure_typology.json` devient prioritaire sur les anciennes typologies embarquées dans SQLite lors de l’export ;
- un modèle nommé dont le poids reste inconnu est neutralisé, tandis qu’une famille générique reste utilisable sous la règle ≤50 g ;
- l’I-SLIDE 187R SW est maintenant exclu de manière hermétique comme modèle >50 g ;
- l’observation Tachiuo #217 est corrigée en recommandation générique de tenya, sans faux rattachement au Mini Kobako ;
- quatre observations Maria du bloc Flapen Wing / sarashi ont été reclassées Suzuki → Hirasuzuki, portant la distribution à **Suzuki 97 / Hirasuzuki 17** ;
- Shizuoka et Kashima sont conservés comme contexte documentaire mais masqués des pads de voyage ;
- le cache PWA passe à `carnet-peche-jp-v6-5-2-integrity-20260812`.

Le cas de non-régression Ise-Shima / Hamachi / 26 novembre reste **75 · 06:30–08:00 · moyenne 70 · aube · étale · proxy 0,14507**.

## V6.5.1 — performance mobile

Cette release ne change pas les scores de pêche : elle change **quand et combien de fois ils sont calculés**.

- ouverture d'un pad avec feedback immédiat, sans reconstruction complète de l'accueil ;
- changement de jour et ouverture/fermeture d'un plan de fenêtre limités au seul pad concerné ;
- index des observations par espèce construit une fois au chargement ;
- agrégats `moment_jour` et marée calculés une fois puis réutilisés ;
- Evidence mémoïsé par espèce / facette / destination ;
- soleil, extrema JMA, brackets PM/BM, courbes et séries horaires mis en cache mémoire ;
- les résumés des autres jours du séjour sont calculés progressivement en tâche de fond ;
- préchauffage léger de la première journée de chaque destination quand le navigateur est inactif.

Le contenu des fenêtres reste identique : un test de non-régression sur Ise-Shima / Hamachi / 26 novembre donne dans V6.5 et V6.5.1 le même maximum **75** et la même fenêtre **06:30–08:00**. Un benchmark synthétique du moteur JS (Node VM, donc non comparable directement à un iPhone) passe d'environ **5,3 s** pour construire à froid le pad Ise-Shima V6.5 à **~15 ms médian** après refactor V6.5.1 ; un rendu déjà en cache tombe sous la milliseconde dans ce test.

## V6.5 — intégrité avant enrichissement

Cette release corrige le moteur avant d’ajouter davantage de données :

- **Suzuki / Marusuzuki (`Lateolabrax japonicus`) et Hirasuzuki (`Lateolabrax latus`) sont deux espèces séparées**. Le sarashi rocheux ne vient plus contaminer les patterns urbains/estuariens du Suzuki.
- **Doublons nettoyés** : une même observation ne peut plus entrer plusieurs fois par des routes d’import différentes. Un `canonical_hash` indépendant du pipeline d’origine verrouille l’unicité.
- Les **règles dérivées / Decision rules** quittent `observations` et vivent dans `inferences`. Elles restent lisibles dans *Comprendre* mais ne votent jamais dans Evidence, les consensus ou les fenêtres.
- Les signaux **Sagoshi/Sawara** qui avaient été rangés sous Hamachi, ainsi qu’un signal seiche rangé sous Aori-Ika, sont conservés comme intelligence locale mais ne votent plus pour la mauvaise espèce.
- La dimension **pression atmosphérique est retirée du QCM et du scoring** : le corpus ne contient aucune observation exploitable dessus. Elle pourra revenir uniquement si de vraies données sont collectées.
- **Matériel** : >50 g reste hors setup. Un modèle précis dont le poids n’est pas vérifié n’est plus proposé par défaut. Les modèles lourds restent dans la typologie avec un statut d’exclusion, afin de ne plus “oublier pourquoi” ils sont filtrés.
- **Fenêtres** : résolution ramenée à 30 min, aucune préférence marée cachée quand une espèce n’a pas de données marée, et une journée peut afficher *aucune fenêtre forte*. La courbe utilise une variation de niveau interpolée ; elle ne prétend pas mesurer le courant réel.
- **Récurrence positive conservée volontairement** : les prises/rapports positifs qui reviennent doivent rester visibles pour aider la décision de pêche. En revanche, plusieurs phrases extraites du même événement ne créent qu’une voix, les comptes rendus explicitement négatifs ne renforcent pas une fenêtre positive, et les % sont nommés comme récurrence documentaire, jamais comme taux de capture.
- Evidence distingue maintenant **auteur → plateforme → groupe** et ajoute la **récence** à la localité, saison, directivité, réplication et compatibilité setup.

## V6.4 — toucher une fenêtre = préparer ce créneau

Les fenêtres V6.3 deviennent actionnables. Un tap sur une des deux meilleures fenêtres, ou sur le bouton de la ligne espèce, ouvre un **plan de pêche propre à ce créneau**. Le plan recalcule les observations techniques compatibles avec la valise et le plafond de 50 g en donnant plus de poids au moment de journée, à la phase de marée, à la localité et à la proximité saisonnière.

Le plan affiche :

- **combo M/MH + PE** réellement compatible avec le poids retenu ;
- **plage de poids observée** dans la famille sélectionnée, filtrée par le combo ;
- **couche de travail** issue des observations et du pattern espèce ;
- **rôle/famille de leurre** puis un exemple documenté, sans faire croire qu'il est forcément présent dans la boîte ;
- **animation décomposée** en `geste du pêcheur → comportement du leurre → déclencheur` ;
- **couleur de départ** adaptée à la lumière du créneau, avec le signal couleur sourcé séparé ;
- deux branches de diagnostic : **aucun contact** et **suivi/touche non concrétisée** ;
- **indice d'opportunité** et **niveau de preuve technique** affichés séparément.

Le setup principal est favorisé lors du choix : par exemple Suzuki reste prioritairement sur la M/PE0.8 et un leurre 46–50 g ne gagne que si la preuve/contextualisation compense réellement la pénalité de haute charge. Tout >50 g reste exclu du moteur décisionnel. Changer de jour ferme le plan ouvert pour éviter de conserver un créneau devenu faux.

## V6.3 — fenêtres idéales espèce × heure × marée

La courbe de marée devient un véritable outil de lecture de session. Chaque espèce ciblée possède désormais une **ligne d'intensité sur 24 h** au-dessus de la courbe et une frise détaillée sous celle-ci.

Deux niveaux sont volontairement séparés :

- les **% aube / jour / crépuscule / nuit** sont des récurrences de rapports positifs par événement documenté, avec `n` affiché ; plusieurs phrases du même événement ne votent qu’une fois ;
- l'**indice fenêtre 0–100** est un score relatif de créneau, pas une probabilité de capture. Il combine le signal horaire, les préférences de phase réellement documentées, la variation de niveau interpolée et la pertinence locale/saisonnière du moteur Evidence. Sans données marée propres à l'espèce, la composante marée reste neutre.

Le moteur réduit automatiquement l'influence des petits échantillons et applique seulement une correction modérée de concentration temporelle : un signal concentré autour de l'aube ou du crépuscule pèse un peu plus qu'un signal étalé sur toute la journée, sans remplacer les tendances brutes de la base. Les deux meilleures fenêtres du jour sont mises en avant et les boutons de jours affichent directement l'espèce et le meilleur créneau du jour.

## V6.2 — moteur de preuve contextuel

La V6.2 sépare désormais explicitement **opportunité** et **niveau de preuve**. Le score marée/lumière sert uniquement à comparer les jours du séjour. Le niveau de preuve décrit la solidité documentaire d'un pattern ou d'une recommandation ; aucun des deux n'est présenté comme une probabilité de capture.

Le moteur V6.5 évalue six dimensions :

- **localité** : spot/secteur actif > zone locale > région > information générale ;
- **saison** : proximité calendrier avec les vraies dates du séjour ;
- **récence** : ancienneté de l’observation par rapport au voyage ;
- **directivité** : capture/observation directe, source locale, fabricant technique, interprétation ;
- **réplication** : nombre d’auteurs distincts, puis diversité des plateformes et groupes éditoriaux/corporate ;
- **setup** : application réelle aux combos M/MH et au plafond absolu de 50 g.

Quatre niveaux sont affichés : **TRÈS SOLIDE / SOLIDE / SIGNAL / HYPOTHÈSE**. Une observation personnelle loggée ajoute une couche séparée **VALIDÉ PAR TOI**. Une source répétée dix fois ne compte donc plus comme dix confirmations indépendantes. Les poids des dimensions dépendent de la question : localité/saison pèsent davantage sur présence et timing ; réplication/directivité technique pèsent davantage sur animation et mécanique de leurre.

Dans **Terrain**, la fiche affiche maintenant la force de la base par facette : présence, timing, leurre, animation et couleur. Dans le **QCM**, la compatibilité avec les conditions est affichée séparément du niveau de preuve de la recommandation. Le volet “Pourquoi ce niveau ?” détaille les six dimensions et signale automatiquement le maillon le plus faible.

## V6.1 — interface terrain

- Les fiches espèce commencent par un **pattern opérationnel** (ex. Hirame : `Cassure → fond → pause`) et le combo M/MH associé.
- Le premier onglet est désormais **Terrain** : `Où / Quand / Combo / Leurre-rôle / Comment / Couleur / Si ça ne donne rien`.
- Les grands encarts ambre ont été supprimés : l’ambre sert uniquement de **signal**, les cartes restent bleu nuit.
- Les intitulés de travail (`Essence`, `Règle de lecture`, `Principe`, `Bracketing`) ne sont plus exposés à l’utilisateur.
- Les animations suivent une lecture constante : **geste → comportement du leurre → but**, avec seulement les mécaniques pertinentes en premier et les autres repliées.
- Les couleurs deviennent un **diagnostic** : clarté/lumière → activité/refus → bait, puis choix de signal. Rose/magenta et jaune/chartreuse sont comparés par fonction plutôt que comme recettes.
- Consensus, synthèse longue, observations brutes et désaccords sont déplacés dans **Comprendre** et repliés.
- Le QCM et le journal terrain restent accessibles depuis le plan de jeu sans allonger tous les onglets.

## Ce qui change en V6


### 0. La valise devient le filtre principal

Le moteur raisonne maintenant avec les **deux ensembles réellement emportés** :

- **M** — Tenryu Injection SP 82 M Quattro + Twin Power XD 4000HG + PE0.8. Plage officielle 8–30 g. Rôle : contrôle, dérive, précision, stop/restart.
- **MH** — Tenryu Injection SP 82 MH Quattro + Twin Power FE C5000XG + PE1.5. Plage officielle 12–45 g. Rôle : puissance, distance, courant, fond. L'utilisateur accepte 46–50 g en **haute charge**, avec un plafond absolu à 50 g.

Règle globale : **aucun leurre >50 g n'entre dans les recommandations, consensus, QCM ou typologies actives**. Quand une bonne source utilise 65–80 g, le fait biologique peut être conservé (courant, couche, timing, comportement), mais la recommandation de leurre est retirée du moteur personnel.

Les fiches espèce et la config du moment affichent désormais le combo M/MH avant le leurre. Le journal terrain stocke aussi le combo et le poids total lancé.

### 1. Navigation marée limitée aux vrais jours sur place

Chaque pad destination possède maintenant `stay_dates`. L'écran marée commence au **premier
jour du séjour** et permet de naviguer avec **Préc. / Suiv.** uniquement dans ces dates,
avec un maximum de quatre jours affichés.

Pour Fukuoka, Kobe et Numazu, les plages suivent directement les dates des deep research :
15–18 novembre, 21–24 novembre et 29 novembre–1er décembre. Ise-Shima couvre 26–28 novembre et Tokyo 2–5 décembre.

Chaque jour affiche :

- les PM/BM et hauteurs JMA embarquées ;
- la courbe interpolée du jour ;
- les **premières lueurs**, le lever, le coucher et la fin des lueurs ;
- les croisements faible lumière × phase de marée active ;
- un **score comparatif 0–100** pour classer les jours du séjour.

Le score combine : activité de phase autour des moments documentés pour les espèces ciblées,
préférences de marée présentes dans la base et marnage relatif entre les jours du séjour.
Il sert à **comparer les journées entre elles**. Ce n'est ni une probabilité de capture, ni un
modèle hydrodynamique du courant réel d'une pointe, d'un chenal ou d'un port.

### 2. Brief destination condensé

Les gros blocs de texte ont été remplacés en lecture principale par quatre informations :

- **Tendance** : ce qui structure la pêche locale.
- **Spots à lire** : secteurs précis et ce qu'il faut y observer.
- **Marée / timing** : fenêtre et logique utiles sur place.
- **Typicité locale** : bait, structure, pression de pêche, mobilité, lumière ou autre particularité.

Les preuves détaillées restent accessibles dans un volet replié pour ne pas perdre la
traçabilité.

### 3. Consensus leurres : raisonner par rôle

L'onglet leurres commence maintenant par le **rôle à remplir** avant d'afficher les fréquences
par famille/densité : chercher loin et tenir bas, insister précisément, pêcher le vent,
présenter dans une veine, induction surface, etc.

Le but est d'éviter qu'un nom de modèle devienne une recette universelle. La famille, la
densité, la taille, la vitesse et la couche sont reliées à une fonction de pêche.

### 4. Grammaire stricte des animations

V5 sépare explicitement :

1. **ce que fait le pêcheur** — moulinet, canne, gestion de bannière ;
2. **ce que fait le leurre** — roll, wobble, tail swing, dart, shimmy, planing… ;
3. **l'effet recherché** — tenir une couche, provoquer, dériver, créer une retombée, etc.

Les mécaniques ne sont plus mélangées :

- linéaire ;
- stop-and-go ;
- lift-and-fall ;
- jerk / twitch ;
- dérive / dead drift ;
- fall / chute ;
- one-pitch / jigging ;
- surface : dog-walk / pop / dive.

Exemple : un **linéaire** laisse la conception du leurre produire sa nage via la récupération ;
un **lift-and-fall** crée volontairement une montée à la canne puis une retombée. Une pause
dans un linéaire produit un stop-and-go, pas automatiquement un lift-and-fall.

### 5. Couleurs : une logique de visibilité, pas une couleur magique

L'onglet couleur commence par quatre axes :

- clarté / teinte de l'eau ;
- lumière ;
- niveau d'activité / méfiance ;
- fourrage identifié ou non.

La matrice V5 distingue notamment naturel/ghost, translucide, métallique/flash, opaque,
mat/silhouette, pearl, UV/glow et couleurs high-appeal.

Le **rose fluo** et le **jaune/chartreuse** sont traités comme deux solutions de visibilité,
pas comme des lois : rose très distinctif dans des eaux verdâtres/bleutées et aux transitions
de lumière ; jaune/chartreuse très lisible en eau chargée ou lumière diffuse. Quand le bait
est clairement identifié et que les poissons nourrissent dessus, la silhouette/taille puis
le naturel/flash peuvent redevenir prioritaires.

La méthode recommandée est un **color bracketing** : choix logique de départ, une option plus
discrète, une option plus visible, puis modification d'une seule variable à la fois.

### 6. Sources techniques de la passe V5

La structuration technique recoupe le corpus validé avec des documents fabricants et des
articles techniques, notamment DAIWA Overdrive, Megabass KAGELOU, le guide eging YAMARIA et
les dossiers couleur/animation Ultimate Fishing. La provenance est conservée dans
`synthesis.json` et `research/technique_consensus_v5_sources.json`.

## Marées et soleil

`tides_2026.json` contient les extrema astronomiques JMA. La courbe de l'app est une
**interpolation visuelle entre ces extrema**, pas une reconstruction harmonique. Une référence
de proximité est signalée lorsqu'elle est utilisée (par exemple Hakata pour Itoshima ou Toba
pour Ise-Shima).

Les horaires de lumière sont calculés localement pour les coordonnées du port : crépuscule
civil du matin (premières lueurs), lever, coucher et crépuscule civil du soir. Ils donnent une
fenêtre opérationnelle plus utile au pêcheur que le seul lever/coucher.

## Pipeline / schéma V6

`trip_stops` conserve désormais :

- `arrival_date` ;
- `stay_dates_json` ;
- `summary_json` ;
- les espèces cibles, port et briefs existants.

Le schéma ajoute `combos.setup_json` pour conserver canne, moulinet, PE, plages de lancer et rôle. Le reste des migrations V4/V5 est conservé : métadonnées observations, fingerprint terrain,
`trip_intel`, typologie, `tide_days`, etc.

### Installation / migration

```bash
python3 pipeline.py init
```

### Importer un deep research structuré

```bash
python3 pipeline.py import-research research/mon_fichier.json
```

### Retour terrain depuis le téléphone

```bash
python3 pipeline.py import-log sessions-terrain.json
```

### Régénérer et publier

```bash
python3 pipeline.py brief-local
python3 pipeline.py export
```

`export` régénère `data.json` et `tides_2026.json` en conservant les jours de séjour et les
résumés destination.

## Vocabulaire contrôlé du QCM

- `maree` : `montante`, `descendante`, `étale`
- `moment_jour` : `aube`, `jour`, `crépuscule`, `nuit`
- `couleur_eau` : `claire`, `trouble`, `verte`

## Tester localement

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000/`. Ne pas lancer la page en `file://`, car elle charge les
JSON avec `fetch`.

## GitHub Pages

Le contenu du dossier peut être envoyé directement à la racine du dépôt :

```bash
git add .
git commit -m "Carnet Peche JP V6.5.6 performance architecture"
git push
```

Aucune étape de build n'est nécessaire. Le service worker V6.5.6 utilise un nouveau cache afin
de forcer la prise en compte des correctifs d’intégrité et de performance après déploiement.

`.gitignore` est optionnel pour le fonctionnement du site : si le sélecteur de fichiers du
navigateur le masque, il peut être ignoré ou créé directement dans GitHub.

## `synthesis.json`

Les grands paragraphes historiques de synthèse sont conservés comme couche narrative, mais
la **couche technique V5** (`technique_v5`), complétée par les règles loadout V6 a été ajoutée séparément : grammaire des animations,
logique couleur, rôles de leurres par espèce et sources techniques. Elle est celle utilisée par
les nouveaux onglets Leurres / Couleur / Animation.


## Sources matériel V6

Les plages de lancer cannes sont vérifiées sur les fiches Ultimate Fishing : SP82M Quattro 8–30 g et SP82MH Quattro 12–45 g. Le rôle des moulinets est recoupé avec les pages Shimano Twin Power XD (faible inertie / contrôle technique) et Twin Power FE (CoreSolid / rigidité sous charge). Les URLs et la distinction entre données fabricant et plafond utilisateur 50 g sont conservées dans `research/travel_loadout_v6_sources.json`.
