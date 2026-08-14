# PROJECT_STATE — Carnet Pêche JP

Dernière version de référence : **V6.5.12 UX carte / contrôles mobiles / navigation augmentée / Evidence / performance / intégrité**

Ce fichier sert de **handoff** pour reprendre le projet dans un nouveau chat sans perdre les décisions structurantes.  
Avant toute modification, lire ce fichier, puis `README.md`, `QA_V6_5_12_UX_CARTE.md` et `RELEASE_MANIFEST_V6_5_12.json`.

---

## 1. Objectif du projet

PWA mobile-first de préparation et d'aide à la décision pour un voyage de **pêche du bord au Japon**.

L'app ne doit pas être une encyclopédie. Elle doit aider à décider rapidement :

**où pêcher → quand → quelle espèce → quel combo → quel rôle de leurre → quel poids → quelle couche → quelle animation → quelle couleur → quoi changer si ça ne donne rien.**

Usage prioritaire : **téléphone, au bord de l'eau**.

Principe UX :

- en ~5 secondes : comprendre le pattern ;
- en ~20 secondes : savoir quoi monter ;
- la profondeur documentaire reste accessible derrière.

---

## 2. Dates de voyage — source de vérité

Utiliser uniquement ces dates pour les pads destination et la navigation marée :

- **Fukuoka : 15–18 novembre 2026**
- **Kobe : 21–24 novembre 2026**
- **Ise-Shima : 26–28 novembre 2026**
- **Numazu : 29 novembre–1 décembre 2026**
- **Tokyo : 2–5 décembre 2026**
- **Kashima : 4 décembre 2026**, excursion terrain active pendant le séjour Tokyo

Ne pas réintroduire les anciens contextes Kobe 20–23 ou Numazu jusqu'au 2 décembre.

Affichage destination V6.5.12 :
- **Kashima est un pad de voyage actif** le 4 décembre, avec station JMA Kashima et cibles Hirame / Suzuki / Hamachi ; ne plus le masquer comme simple contexte de recherche ;
- **Shizuoka est de nouveau visible** comme étape du trajet avec ses données du 7–8 novembre ;
- Fukuoka peut rester scindé en deux pads secteur (Hakata urbain et Shikanoshima/Itoshima), tous deux strictement verrouillés sur **15–18 novembre** ;
- la navigation marée d’un pad ne doit jamais sortir de ses `stay_dates`.

---

## 3. Matériel réel — contrainte globale

Le pêcheur voyage avec seulement deux ensembles qui rentrent dans la valise.

### Combo M — contrôle / précision

- **Tenryu SP82M Quattro**
- **Shimano Twin Power XD 4000HG**
- **PE 0.8**
- plage de travail du projet : **8–30 g**

Rôles principaux :
- Suzuki
- Kurodai
- pêches fines / contrôle
- Aori-Ika opportuniste
- Saba / Tachiuo léger
- Hirame léger si conditions adaptées

### Combo MH — puissance / distance / courant

- **Tenryu SP82MH Quattro**
- **Shimano Twin Power FE C5000XG**
- **PE 1.5**
- plage nominale canne : **12–45 g**
- **46–50 g accepté volontairement par le pêcheur comme haute charge**
- **>50 g interdit**

Rôles principaux :
- Hirame
- Hamachi
- Madai compatible shore
- Tachiuo plus lourd
- Suzuki conditions fortes

### Règle poids absolue

- ≤30 g : M ou MH selon mécanique / espèce / conditions
- 31–45 g : domaine naturel MH
- 46–50 g : **MH uniquement, haute charge**
- >50 g : **hors setup, jamais recommandé**

Important :
- conserver les faits biologiques d'une source qui utilise >50 g ;
- neutraliser seulement sa recommandation lourde ;
- si le poids d'un modèle précis est inconnu, ne pas le proposer comme recommandation active ;
- utiliser si possible le **poids total réellement lancé**, pas seulement la tête plombée.

Moulinets confirmés : **Twin Power XD 4000HG** sur M et **Twin Power FE C5000XG** sur MH. Ne pas dégrader ces références lors d’un import ou d’une remise à jour documentaire.

---

## 4. Taxonomie — règles strictes

Espèces actuellement séparées :

- Hirame
- Suzuki
- Hirasuzuki
- Hamachi
- Aori-Ika
- Kurodai
- Madai
- Tachiuo
- Saba
- Aji
- Mebaru

### Suzuki ≠ Hirasuzuki

Ne jamais refusionner les deux dans le moteur de patterns.

- Suzuki : baie, canaux, estuaires, structures, clair-obscur, dérive
- Hirasuzuki : façade exposée, rochers, sarashi, houle / écume

Une UI globale "seabass" peut éventuellement regrouper visuellement, mais **les données et apprentissages doivent rester séparés**.

### Espèces hors cible

Sawara / Sagoshi / autres prédateurs peuvent rester comme **intelligence locale / signal d'écosystème**, mais ne doivent pas voter comme Hamachi.

Une seiche ne doit pas voter comme Aori-Ika.

---

## 5. État des données V6.5.7 (observations inchangées depuis V6.5.5)

État validé après nettoyage :

- **501 observations factuelles**
- **11 espèces**
- **264 éléments d'intelligence locale**
- **35 interprétations dérivées embarquées hors preuve**
- **0 doublon canonique**
- **0 Hirasuzuki sous Suzuki**
- **0 pression atmosphérique dans le scoring/QCM**
- **0 recommandation active explicitement >50 g**
- couverture marée des dates du séjour : **100 %**

Distribution factuelle actuelle :

- Hirame : 125
- Suzuki : 129
- Hamachi : 88
- Aori-Ika : 79
- Kurodai : 34
- Tachiuo : 16
- Hirasuzuki : 17
- Madai : 9
- Saba : 2
- Aji : 1
- Mebaru : 1

Aji et Mebaru restent **quasi non documentés**. Saba reste très faible. Madai a gagné une vraie base shore technique mais demeure un petit corpus.

---

## 6. Intégrité : faits ≠ interprétations

Règle fondamentale de V6.5 :

- `observations` = faits / observations source ;
- `inferences` = règles dérivées / interprétations ;
- les inférences peuvent être affichées dans **Comprendre** ;
- les inférences **ne votent jamais** dans Evidence, consensus ou fenêtres.

Ne jamais réinjecter une conclusion du moteur comme nouvelle observation.

Le pipeline possède désormais un `canonical_hash` pour empêcher qu'un même fait soit importé deux fois par des chemins différents.

Depuis V6.5.3, les observations curatées peuvent porter `metadata.event_id`. Ce champ est prioritaire pour le dédoublonnage des récurrences et des voix Evidence : plusieurs faits issus d'une même capture restent **un seul événement**. `metadata.exclude_presence_evidence=true` permet à une méthode/explication technique d'enrichir les facettes techniques sans gonfler la preuve de présence.

---

## 7. Biais de récurrence positive — choix produit assumé

Le projet **conserve volontairement** la récurrence de prises / rapports positifs comme signal de confort pour la décision de pêche.

C'est un choix utilisateur.

Mais garde-fous obligatoires :

- 5 phrases sur la même capture = **1 événement**
- 5 captures réellement distinctes = **5 événements positifs**
- un rapport négatif explicite ne renforce pas la fenêtre positive
- les pourcentages ne sont **jamais présentés comme probabilités de capture**
- libellé recommandé :  
  **“x % de la récurrence positive documentée · n événements”**

Ne pas neutraliser ce biais dans une future refonte sans demande explicite.

---

## 8. Fenêtres idéales — philosophie et règles

C'est une fonction centrale du projet.

Dans chaque pad destination :

1. **Prévision marée en premier**
2. courbe visible immédiatement
3. navigation uniquement sur les jours du séjour
4. soleil / premières et dernières lueurs
5. fenêtres idéales par espèce
6. ensuite seulement : espace puis lecture destination

### Ce qui est affiché

Pour chaque espèce :
- ligne/frise d'intensité sur 24 h
- récurrence positive par moment :
  - aube
  - jour
  - crépuscule
  - nuit
- `n événements`
- indice fenêtre 0–100
- meilleures fenêtres du jour

### Interprétation

Deux concepts distincts :

**Récurrence positive**
- vient des événements positifs documentés
- ce n'est pas un taux de capture

**Indice fenêtre**
- score relatif d'opportunité
- ce n'est pas une probabilité
- combine signal horaire, marée quand documentée, lumière et pertinence locale/saisonnière

### Règles anti-surprécision

- pas de calcul : **30 min**
- l'app peut afficher **“aucune fenêtre forte”**
- ne pas transformer un simple tag `aube` en pseudo-observation à 06:17 précise
- les horaires très précis doivent venir de captures réellement horodatées

### Marée

`tides_2026.json` utilise des extrema astronomiques JMA.

La courbe est une **interpolation de niveau entre PM/BM**, pas une mesure du courant.

Ne jamais appeler automatiquement :
- variation de niveau = courant réel
- proximité PM/BM = étale réelle au spot

Pour une espèce sans données marée suffisantes, la composante marée doit rester **neutre**.

---

## 9. Fenêtre → plan de pêche

Depuis V6.4, toucher une fenêtre ouvre un plan pour ce créneau.

Le plan doit suivre :

**Combo → poids → couche → rôle/famille de leurre → exemple documenté → animation → couleur → plan B**

### Animation : grammaire obligatoire

Toujours distinguer :

1. **geste du pêcheur**
   - moulinet
   - canne
   - tension de ligne
2. **comportement du leurre**
3. **déclencheur / moment de prise**

Exemples à ne jamais confondre :

- linéaire ≠ lift-and-fall
- jerk ≠ twitch
- one-pitch ≠ lift-and-fall
- free fall ≠ tension fall
- stop-and-go ≠ linéaire continu

Une carte animation doit permettre de comprendre concrètement :
**ce que fait la main → ce que fait le leurre → quand le poisson doit prendre.**

---

## 10. Couleurs — logique de signal, pas recette magique

Le moteur couleur est une **heuristique de signal visuel**, pas une preuve physique complète.

Axes principaux :

- clarté / teinte de l'eau
- lumière
- activité / refus
- bait identifié
- transparence / opacité
- flash
- UV
- glow
- silhouette
- contraste

Principes UX :

- eau claire + forte lumière → naturel / ghost en départ
- eau teintée → augmenter lisibilité/contraste si nécessaire
- rose/magenta et jaune/chartreuse ont des fonctions différentes ; ne pas les traiter comme synonymes
- bait identifié → match the hatch d'abord sur :
  **taille → silhouette → couche → nage → couleur**
- suivi/refus → réduire le signal
- aucun contact → on peut augmenter le signal, mais ne changer qu'une variable à la fois

Ne jamais transformer une capture unique sur une couleur en loi générale.

---

## 11. Evidence — niveau de preuve

Toujours séparer :

**opportunité du jour** ≠ **solidité documentaire**

Niveaux UI :

- TRÈS SOLIDE
- SOLIDE
- SIGNAL
- HYPOTHÈSE
- VALIDÉ PAR TOI (couche personnelle séparée)

Dimensions du moteur :

- localité
- saison
- récence
- directivité
- réplication
- compatibilité setup

La source est pensée sur 3 niveaux :

**auteur → plateforme/éditeur → groupe corporate**

Exemple :
- deux utilisateurs Anglers = auteurs distincts, même plateforme
- YAMASHITA / Maria / YAMARIA ne doivent pas être traités naïvement comme trois origines indépendantes si elles partagent un même groupe

La force peut varier par facette :
- présence
- timing
- leurre
- animation
- couleur

Une recette peut donc avoir :
- présence SOLIDE
- animation TRÈS SOLIDE
- couleur SIGNAL

---

## 12. Pression atmosphérique

**Supprimée volontairement.**

Il n'y avait aucune donnée exploitable dans le corpus.

Ne pas la remettre :
- dans le QCM
- dans le score
- dans Evidence

Elle pourra revenir seulement après collecte de vraies observations permettant de l'exploiter.

---

## 13. UX actuelle — principes à conserver

Éviter :
- gros blocs marron/ambre
- titres de brouillon du type “Essence”, “Règle de lecture”, “Principe”, “Bracketing”
- jargon de base de connaissance en première lecture
- longs pavés avant l'action

Préférer :
- surfaces bleu nuit
- ambre = accent / priorité / action
- fiches espèce orientées **Terrain**
- pattern opérationnel court

Exemple Hirame :
**Cassure → fond → pause**

Ordre des onglets :
- Terrain
- Leurres
- Couleurs
- Animations
- Comprendre

Dans Terrain :
**Où / Quand / Combo / Leurre-rôle / Comment / Couleur / Si ça ne donne rien**

La profondeur documentaire reste dans **Comprendre**, repliée.

---

## 13 bis. Correctifs intégrité — V6.5.2

Correctifs appliqués sans changer les formules de fenêtres :

- la typologie centrale `lure_typology.json` est prioritaire sur une ancienne typologie embarquée dans une observation ;
- un modèle nommé au poids inconnu est exclu des recommandations actives ; une famille générique reste utilisable avec la contrainte ≤50 g ;
- I-SLIDE 187R SW est correctement neutralisé comme >50 g ;
- Tachiuo #217 reste une recommandation générique de tenya, sans typologie Mini Kobako parasite ;
- quatre observations Maria du bloc Flapen Wing / sarashi (#66, #67, #68, #75) ont été reclassées de Suzuki vers Hirasuzuki ;
- historique V6.5.2 : Shizuoka et Kashima avaient été masqués ; **Kashima est réactivé par V6.5.7 et ne doit plus être remasqué** ;
- le cache PWA est incrémenté lorsque ces changements front sont publiés.


## 13 ter. Enrichissement vidéo curaté — V6.5.3

Le deuxième lot de transcriptions est conservé dans `research/raw_transcripts/`. Seule la curation P0 validée a été importée.

État de l’import :
- 31 faits directs ajoutés ;
- 9 interprétations ajoutées à `inferences`, hors preuve ;
- 10 éléments `UNRESOLVED` conservés dans le staging/curation et non importés comme recommandations actives ;
- 2 doublons pédagogiques Hirame explicitement ignorés ;
- 13 transcriptions brutes conservées pour les passes suivantes.

Garde-fous spécifiques :
- la saison hors voyage n'annule pas la valeur comportementale ; elle réduit seulement la portée saisonnière/localité ;
- une capture vidéo distincte = un `event_id` ; plusieurs faits sur le même poisson gardent ce même `event_id` ;
- les modèles/poids mal transcrits restent bloqués tant qu'ils ne sont pas vérifiés ;
- Bone Bait + tête 18 g : **18 g = tête seulement**, poids total lancé inconnu, donc modèle précis non actif ;
- les interprétations marée Madai restent hors scoring tant qu'elles ne sont pas suffisamment répliquées ;
- le prompt maître `research/MASTER_RESEARCH_STAGING_PROMPT.md` est la référence de collecte.

Apports principaux :
- Madai : bait → courant → cassure → couche, captures shore Amakusa + Shizuoka ;
- Suzuki : fond malgré bait en surface, bracketing de profondeur en eau froide, tension-fall au ras des piles ;
- Hirame : micro-position wando / extrémité de sandbar / rip, sans réimporter les généralités déjà connues.

## 14. Performance — V6.5.1

La V6.5 avait une régression majeure : ouvrir un pad recalculait en boucle les fenêtres/Evidence et reconstruisait tout l'accueil.

V6.5.1 corrige cela.

À conserver impérativement :

- pas de `renderHome()` complet pour ouvrir un pad
- rendu local du pad
- cache des observations par espèce
- cache des agrégats moment/marée
- cache Evidence
- cache soleil
- cache extrema JMA
- cache PM/BM brackets
- cache courbes SVG
- cache séries horaires
- cache fenêtres par espèce
- cache résumés journaliers
- préchauffage léger quand navigateur inactif
- autres jours du séjour calculés progressivement en arrière-plan

Référence de non-régression :
**Ise-Shima / Hamachi / 26-11-2026 → indice 75, fenêtre 06:30–08:00**

Ne pas sacrifier la réactivité mobile en ajoutant des scans imbriqués du corpus au clic.

---


## 14 bis. Lisibilité mobile — V6.5.4

La frise d’intensité espèce × 24 h affichée **au-dessus de la courbe de marée** est volontairement plus épaisse sur téléphone : bandes ≈ ×2,5, espacement vertical accru et hauteur SVG/mobile augmentée.

Cette passe est **strictement graphique** : ne pas modifier les scores, séries 30 min, fenêtres, récurrences ou courbe JMA pour reproduire cet effet. La zone tactile suit l’épaisseur de la ligne.

Cache PWA de référence : `carnet-peche-jp-v6-5-4-mobile-readability-20260812`.


## 14 ter. Enrichissement comportemental — V6.5.5

Batch 3 : **21 transcriptions archivées**, dont 8 sources prioritaires curatées en détail avant import. La release ajoute **30 observations** et **18 inférences**.

Événements positifs réellement ajoutés : **Suzuki ×2, Hirame ×3**. Les touches/décrochages Suzuki sont conservés avec `metadata.outcome=lost|bite` et ne votent jamais comme captures positives.

Règles nouvelles à préserver :
- Suzuki : courant fort → contrôle du fond + lift-and-fall ; courant qui mollit → alléger + ralentir dans la couche basse ;
- Hirame : distinguer la **courbe de marée** du **courant réellement ressenti près du fond** ; structures proches à finir systématiquement ;
- Hamachi : méthode de recherche de couche par countdown issue d’un tutoriel 青物 citant explicitement Wakashi/Inada/Warasa/Buri, mais **aucune nouvelle présence/capture Hamachi** ;
- les conclusions horaires de l’expert Hirame #25 restent dans `inferences` et sont interdites de récurrence/scoring.

`pipeline.py` préserve désormais directement `spot_type`, `comportement`, `profondeur`, `temperature_eau`, `couleur_eau`, `observation` et saison explicite depuis le staging.

Cache PWA de référence V6.5.5 : `carnet-peche-jp-v6-5-5-behavioral-enrichment-20260812`.

## 14 quinquies. Pad Kashima — V6.5.7

Kashima est rétabli comme **pad actif du voyage** le **4 décembre 2026**, pendant le séjour Tokyo.

- `trip_pad=true` pour le stop `id=8`, port `kashima`.
- Date verrouillée : `2026-12-04` uniquement.
- Cibles : **Hirame / Suzuki / Hamachi**.
- Marées : station JMA Kashima déjà embarquée, BM 05:33 / PM 11:55 / BM 19:19 dans `tides_2026.json`.
- `decision_cache.json` embarque les trois séries 30 min Kashima et le résumé journalier.
- Aucune observation, inférence, intel locale, typologie ou formule de score n’a été modifiée.
- `pipeline.py` inclut désormais le stop 8 dans `TRIP_PAD_STOP_IDS`, pour empêcher qu’un futur `export` ne fasse disparaître de nouveau le pad.

Non-régression obligatoire : Ise-Shima / Hamachi / 26-11-2026 reste **75 · 06:30–08:00 · moyenne 70**.

Cache PWA : `carnet-peche-jp-v6-5-7-kashima-pad-20260812`.

## 14 quater. Architecture performance — V6.5.6

V6.5.6 ne modifie pas la biologie, les observations, les inférences ni le moteur de score. Elle modifie **quand** le travail est effectué.

- Démarrage : `app_core.json` + `decision_cache.json` + `tides_2026.json`.
- Corpus complet (`data.json`, `synthesis.json`, `lure_typology.json`) : chargement paresseux à la première fiche espèce / premier plan détaillé.
- `decision_cache.json` contient les agrégats `bestMoments`, `tidePrefs`, les séries 30 min des dates du voyage et les résumés journaliers.
- Les séries sont générées au build par `build_runtime_cache.js`, qui exécute le même code décisionnel que `index.html` dans Node : aucune seconde implémentation mathématique.
- `pipeline.py export` appelle automatiquement ce build runtime. Node.js est donc requis pour **régénérer les données**, pas pour déployer/utiliser la PWA.
- Aucun warmup global après le premier rendu. Le fallback idle ne travaille qu’une unité manquante à la fois.
- Pad pré-calculé : rendu synchrone, sans double RAF.
- SW : cache-first + rafraîchissement silencieux ; le corpus complet reste pré-caché best-effort à l’installation mais n’est pas parsé au démarrage.

Mesure de référence locale (Node VM, pas un benchmark iPhone) : payload JSON bloquant avant accueil **887 880 → 168 787 octets (-81,0 %)** ; génération froide du détail Ise-Shima médiane **14,18 → 2,92 ms (~4,86×)**.

Non-régression obligatoire : Ise-Shima / Hamachi / 26-11-2026 = **75**, fenêtre **06:30–08:00**, moyenne **70**, proxy mouvement **0,145072…**.

Cache PWA de référence : `carnet-peche-jp-v6-5-8-ux-focus-20260812`.

## 15. Journal terrain — direction souhaitée

Le log terrain doit progressivement permettre d'enregistrer :

- destination / spot
- date / heure
- espèce
- combo M/MH
- PE
- poids total lancé
- leurre
- coloris
- couche
- animation
- bait
- courant observé
- résultat :
  - prise
  - touche
  - suivi
  - raté
  - rien

Les succès personnels peuvent ajouter **VALIDÉ PAR TOI**.

Ne pas considérer qu'un échec invalide automatiquement la littérature ; il doit rester une donnée d'effort personnelle.

---

## 16. Enrichissement futur — pipeline recommandé

Ne pas importer directement une sortie de Deep Research dans la base.

Workflow recommandé :

**recherche / transcription → staging JSON → curation/déduplication → import V6.5+ → export**

Le staging doit conserver :
- source
- auteur
- plateforme
- groupe
- URL
- date
- événement
- espèce réelle
- spot / micro-spot
- timing
- marée séparée du courant réel
- bait
- leurre
- poids
- animation décomposée
- couleur / propriétés visuelles
- outcome
- timestamp vidéo
- ambiguïtés / trous

Le prompt maître de collecte est désormais versionné dans `research/MASTER_RESEARCH_STAGING_PROMPT.md`. Le conserver comme référence plutôt que de revenir à un prompt d’extraction simplifié.

---

## 17. Priorités d'enrichissement

Les trous les plus évidents sont :

1. Aji
2. Mebaru
3. Saba
4. Madai — poursuivre surtout la réplication locale/saisonnière, plus que le volume brut
5. Hirasuzuki (corpus encore petit)
6. données marée spécifiques pour Aori-Ika / Kurodai / Tachiuo
7. davantage de données couleur avec clarté de l'eau réellement documentée
8. davantage d'animations décrites précisément
9. davantage de captures locales aux dates proches du voyage
10. retrouver URL/date/auteur des transcriptions P0 et vérifier les modèles/poids encore `UNRESOLVED`

Ne pas enrichir uniquement pour augmenter le nombre total d'observations. Chercher surtout les **facettes faibles**.

---

## 18. Fichiers à connaître

### Application
- `index.html`
- `sw.js`
- `manifest.webmanifest`

### Données
- `data.json`
- `synthesis.json`
- `lure_typology.json`
- `tides_2026.json`

### Source de vérité / pipeline
- `peche_jp.db`
- `schema.sql`
- `pipeline.py`

### Recherche
- `research/`

### Documentation critique
- `README.md`
- `PROJECT_STATE.md`
- `CHANGELOG_V6_5_12_UX_CARTE.md`
- `QA_V6_5_12_UX_CARTE.md`
- `RELEASE_MANIFEST_V6_5_12.json`

### Caches runtime versionnés
- `app_core.json`
- `decision_cache.json`
- `build_runtime_cache.js`

---

## 19. Contrôles obligatoires avant chaque release

Avant de rendre une nouvelle archive :

1. `python -m py_compile pipeline.py`
2. validation syntaxe JS de `index.html`
3. validation syntaxe `sw.js`
4. tous les JSON valides
5. `PRAGMA integrity_check = ok`
6. `PRAGMA foreign_key_check` sans erreur
7. zéro doublon canonique
8. Suzuki/Hirasuzuki séparés
9. aucune pression réintroduite
10. aucune recommandation active >50 g
11. toutes les dates de séjour couvertes
12. test de non-régression des fenêtres
13. test ouverture/fermeture pads mobile
14. incrémenter le cache PWA/service worker si le front change

---

## 20. Ce qu'il ne faut pas casser

- plafond absolu 50 g
- choix utilisateur d'accepter 46–50 g sur la MH
- Suzuki/Hirasuzuki séparés
- récurrence positive comme signal volontaire
- `%` = récurrence documentaire, pas probabilité
- Evidence ≠ score d'opportunité
- pression exclue
- marée ≠ courant réel
- inférence ≠ observation
- performance V6.5.1
- dates exactes du voyage
- priorité UX terrain

---

# PROMPT DE REPRISE POUR UN NOUVEAU CHAT

Copier/coller ce texte avec le ZIP :

> Voici la dernière version complète de **Carnet Pêche JP V6.5.12**.  
> Commence par lire `PROJECT_STATE.md`, puis `README.md`, `QA_V6_5_12_UX_CARTE.md` et `RELEASE_MANIFEST_V6_5_12.json`.  
> Fais un audit rapide de cohérence avant toute modification.  
> `PROJECT_STATE.md` contient les décisions structurantes à ne pas régresser : dates du voyage, deux combos, plafond 50 g, séparation Suzuki/Hirasuzuki, récurrence positive volontaire, moteur Evidence, fenêtres idéales et contraintes de performance.  
> Ne modifie ensuite le projet qu'à partir de cette base.


## 14 nonies. UX carte — V6.5.12

Release UX uniquement. Aucun changement des 501 observations, des 35 inférences, des scores, des fenêtres ou des règles matériel.

- carte de trajet réellement géographique et autonome hors-ligne, avec silhouette du Japon embarquée ;
- 8 étapes cliquables, y compris séparation visuelle Fukuoka / Itoshima ;
- boutons principaux renforcés pour le tactile (44 px lorsque la mise en page le permet) ;
- Quick Peek 40 px, fermeture de sheet 44 px, FAB 52–54 px, rail latéral élargi ;
- restauration du focus après fermeture d'une sheet ;
- échec `localStorage` visible et non destructif pour le journal terrain ;
- caches de la PWA supprimés uniquement sous le préfixe `carnet-peche-jp-` ;
- sources fabricants conservées comme aides de confiance pondérées, jamais comme certitudes de capture.

Cache PWA : `carnet-peche-jp-v6-5-12-ux-carte-20260814`.

## 14 sexies. UX focus — V6.5.8

Release UX uniquement, sans changement des observations, inférences, formules de score ou fenêtres.

- Courbe marée : une seule espèce est mise au premier plan par défaut — celle avec le meilleur indice du jour ; les autres bandes restent visibles mais atténuées.
- Premier tap sur une bande : sélection locale de l'espèce + mini-carte sous la courbe ; second tap sur la même bande : ouverture du plan détaillé existant.
- Les lignes d'espèces suivent la même hiérarchie visuelle (`prioritaire`, sélection, atténuation légère).
- Les libellés `n=…` sont supprimés de l'UX fenêtres : afficher `x cas`, `x événements horaires`, `x cas avec marée renseignée`.
- La confiance devient explicite : `Confiance : solide / très solide / à confirmer / exploratoire`, avec nombre d'événements documentés et sources indépendantes.
- `decision_cache.json` v3 embarque un résumé de confiance par pad × espèce ; aucun chargement du corpus lourd n'est requis pour afficher cette information.
- Aucun de ces éléments ne modifie `speciesWindowPoint`, `contiguousWindows`, Evidence ou les règles poids.

Cache PWA : `carnet-peche-jp-v6-5-8-ux-focus-20260812`.


## 14 septies. Navigation & lecture — V6.5.9

Release UX uniquement, sans changement des données, du moteur Evidence, des scores, des fenêtres ou des règles matériel.

- Pads destination : lecture progressive `aperçu → développement` pour éviter les longs blocs simultanés.
- Les informations de décision restent visibles ; les couches explicatives sont repliées sous `Comprendre le créneau`.
- `Lecture destination`, `Matériel` et `Preuves & contraintes` annoncent leur contenu avant ouverture.
- Fiches espèces : remplacement des dots par cinq onglets textuels sticky `Terrain · Leurres · Couleurs · Animations · Comprendre`.
- La hauteur sticky s'aligne dynamiquement sur le header réel et se recalcule au resize.
- Navigation onglets accessible via `aria-selected`, scroll horizontal et centrage de l'onglet actif.

Cache PWA : `carnet-peche-jp-v6-5-9-navigation-lecture-20260812`.
