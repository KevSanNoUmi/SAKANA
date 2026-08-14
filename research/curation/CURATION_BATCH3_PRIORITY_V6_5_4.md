# Curation détaillée — Batch 3 — Carnet Pêche JP V6.5.4

**Aucune modification de V6.5.4.** Ce document fige la curation avant staging/import.

## Résultat

- Items curatés : **64**
- Captures positives certaines : **5** ({'suzuki': 2, 'hirame': 3})
- Événements touche/décrochage non positifs : **4**
- STAGE_FACT : **21**
- STAGE_EVENT : **9**
- UNRESOLVED : **10**
- STAGE_INFERENCE : **18**
- SKIP_DUPLICATE : **5**
- STAGE_ECOSYSTEM : **1**

## Garde-fous

- #25 Hirame : expertise uniquement, exclusion récurrence + scoring fenêtre.
- #9 青物 : méthode Hamachi autorisée uniquement parce que Wakashi/Inada/Warasa/Buri sont explicitement cités; aucune capture Hamachi positive.
- Vidéos d'un même auteur/groupe : pas de réplication indépendante artificielle.
- Capture racontée/archivée : aucun nouvel événement sans source originale.
- Modèle/poids incertain : non actionnable.
- >50 g : fait source conservable, recommandation interdite.

## B3_SUZUKI_MIYAGI_19 — A+++

Fichier : `Export-Subtitles-AppForLanguage (19).txt`  
Groupe source : `field_report_miyagi_suzuki`  
Deux captures Suzuki certaines; plusieurs touches/décrochés séparés. Date exacte inconnue; ne pas faire voter une fenêtre calendrier.

### SM19_01 · STAGE_FACT · session_context
- Timestamp : `00:00:00-00:01:42`
- Cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Session de deux jours à Miyagi; environ 3 m d'eau sur le premier secteur, bait visible, pêche d'abord autour de la couche basse.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Date exacte inconnue; contexte local exploitable sans vote calendrier.

### SM19_02 · STAGE_FACT · current_weight_adaptation
- Timestamp : `00:03:16-00:04:19`
- Cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Avec un courant rapide, le pêcheur choisit une vibration suffisamment lourde pour conserver le contact du fond et travaille près du substrat par déplacements latéraux/lift-and-fall.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### SM19_03 · STAGE_EVENT · lost_fish
- Timestamp : `00:04:38-00:05:05`
- Event key : `SM19_EVT_LOST_1`
- Outcome : `lost`
- Cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Première attaque de Suzuki probable sur la zone basse; le poisson se décroche immédiatement après la touche.
- Éligibilité : présence=True · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Le locuteur identifie le poisson comme Suzuki avec réserve orale; conserver outcome=lost, jamais récurrence positive.

### SM19_04 · STAGE_FACT · bottom_clearance_adaptation
- Timestamp : `00:05:19-00:05:38`
- Cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Le fond étant très encombré, le pêcheur augmente la cadence du lift-and-fall afin de rester juste au-dessus du substrat au lieu de le labourer.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### SM19_05 · STAGE_EVENT · lost_fish
- Timestamp : `00:05:51-00:06:13`
- Event key : `SM19_EVT_LOST_2`
- Outcome : `lost`
- Cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Deuxième poisson touché sur la cassure/slope; il se décroche. Le pêcheur relie les réactions au bord de la rupture de pente.
- Éligibilité : présence=True · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Décrochage séparé, non positif.

### SM19_06 · STAGE_EVENT · bite
- Timestamp : `00:09:15-00:09:47`
- Event key : `SM19_EVT_BITE_1`
- Outcome : `bite`
- Cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Au matin du deuxième jour, après alternance fond → mi-eau → retour au fond, une touche courte est détectée dans la partie basse.
- Éligibilité : présence=True · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Touche sans capture; ne vote pas positif.

### SM19_07 · STAGE_EVENT · lost_fish
- Timestamp : `00:10:01-00:10:54`
- Event key : `SM19_EVT_LOST_3`
- Outcome : `lost`
- Cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Un poisson est piqué très près du fond sur Uprising 70 Heavy Weight puis se décroche à proximité des tétrapodes.
- Éligibilité : présence=True · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Modèle/poids exact du Heavy Weight à vérifier avant recommandation active.

### SM19_08 · STAGE_EVENT · capture
- Timestamp : `00:11:51-00:12:30`
- Event key : `SM19_EVT_CATCH_1`
- Outcome : `positive`
- Cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Première capture Suzuki confirmée de la sortie : Uprising 70 Heavy Weight posé au fond, 2 à 3 lifts, puis attaque au moment du fall.
- Éligibilité : présence=True · récurrence+=True · fenêtre=False · modèle actif=False
- Note : Événement positif unique. Date exacte inconnue => pas de vote de fenêtre calendrier.

### SM19_09 · STAGE_FACT · trigger_grammar
- Timestamp : `00:12:14-00:12:59`
- Event key : `SM19_EVT_CATCH_1`
- Cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Grammaire de la première capture : geste = 2–3 lifts; comportement leurre = redescente près du fond portée par la descendante; déclencheur = attaque pendant le fall.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### SM19_10 · STAGE_EVENT · capture
- Timestamp : `00:13:42-00:15:27`
- Event key : `SM19_EVT_CATCH_2`
- Outcome : `positive`
- Cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Deuxième capture Suzuki confirmée : lorsque le courant ralentit, le pêcheur allège vers une Uprising annoncée à 14 g, touche le fond puis récupère lentement en laissant le leurre dériver juste au-dessus.
- Éligibilité : présence=True · récurrence+=True · fenêtre=False · modèle actif=False
- Note : 14 g est explicitement annoncé, mais identité fabricant exacte à vérifier; pas de vote calendrier.

### SM19_11 · STAGE_FACT · adaptive_rule
- Timestamp : `00:14:35-00:15:41`
- Cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Dans cette session, courant fort → poids/contrôle du fond + lift/fall; courant qui mollit → leurre plus léger + récupération lente pour augmenter le temps dans la couche basse.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Règle d'adaptation directement reconstruite à partir des deux phases de la session.

### SM19_12 · UNRESOLVED · lure_metadata
- Timestamp : `00:01:08-00:15:41`
- Cible : `suzuki`
- Directivité : `interpretation`
- Contenu : Les désignations Uprising 70 Heavy Weight et Uprising 14 g doivent être normalisées contre la source fabricant avant recommandation exacte.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

## B3_HIRAME_TIMING_25 — A+++_COMPRENDRE

Fichier : `Export-Subtitles-AppForLanguage (25).txt`  
Groupe source : `marunaka_hirame_expert`  
Expertise agrégée. Zéro événement positif. Exclusion absolue de la récurrence et du scoring horaire/marée.

### HT25_01 · STAGE_INFERENCE · light_relative_timing
- Timestamp : `00:02:54-00:04:29`
- Cible : `hirame`
- Directivité : `expert_experience`
- Contenu : Selon l'expérience de l'auteur, le timing du Hirame suit davantage la luminosité relative au lever/coucher que l'heure civile fixe; un créneau peut donc se décaler entre été et hiver avec le lever du soleil.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Comprendre uniquement. Jamais convertir en événement ni en bonus horaire.

### HT25_02 · STAGE_INFERENCE · dawn_priority
- Timestamp : `00:04:33-00:06:28`
- Cible : `hirame`
- Directivité : `expert_experience`
- Contenu : L'auteur considère l'aube comme son créneau le plus régulièrement productif, avec un pic souvent lorsque la lumière permet déjà de travailler sans lampe tout en restant faible.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Supprimer toute formulation quantitative '2–3 fois plus de chances' du produit; ne jamais afficher comme probabilité.

### HT25_03 · STAGE_INFERENCE · mid_morning_behavior
- Timestamp : `00:06:35-00:07:17`
- Cible : `hirame`
- Directivité : `expert_experience`
- Contenu : Après une aube clairement active, l'auteur observe souvent une baisse d'activité en matinée pleine; il décrit ce créneau comme plus adapté à une prospection patiente qu'à une fenêtre brève.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HT25_04 · STAGE_INFERENCE · afternoon_behavior
- Timestamp : `00:07:21-00:08:25`
- Cible : `hirame`
- Directivité : `expert_experience`
- Contenu : L'auteur rapporte qu'un petit regain peut parfois apparaître en début/milieu d'après-midi, mais de manière moins nette et moins reproductible que l'aube.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HT25_05 · STAGE_INFERENCE · dusk_behavior
- Timestamp : `00:08:25-00:09:37`
- Cible : `hirame`
- Directivité : `expert_experience`
- Contenu : Le crépuscule est décrit comme plus irrégulier que l'aube; en période froide, l'auteur insiste pour pêcher jusqu'à l'obscurité complète car certaines prises arrivent très tard dans la transition lumineuse.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HT25_06 · STAGE_INFERENCE · night_behavior
- Timestamp : `00:09:43-00:10:41`
- Cible : `hirame`
- Directivité : `expert_experience`
- Contenu : De nuit, l'auteur décrit une activité moins liée à une fenêtre nette et recommande une présentation moins agressive; il rapporte aussi une proportion plus élevée de gros Hirame en saison froide.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Ne pas transformer la mention de tailles 60–80 cm ou de décembre-avril en statistique de probabilité.

### HT25_07 · STAGE_FACT · tide_vs_bottom_current
- Timestamp : `00:11:17-00:12:07`
- Cible : `hirame`
- Directivité : `expert_method`
- Contenu : La surface et le fond peuvent montrer des courants différents; pour le Hirame, l'auteur recommande d'évaluer prioritairement le courant ressenti par le leurre près du substrat.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Très utile comme rappel UX : la courbe de marée n'est pas une mesure de courant réel.

### HT25_08 · STAGE_INFERENCE · bottom_current_control
- Timestamp : `00:12:07-00:12:38`
- Cible : `hirame`
- Directivité : `expert_experience`
- Contenu : L'auteur juge favorable une résistance perceptible avec légère dérive du leurre; si le courant de fond est trop fort, le problème principal devient la perte de contrôle, la remontée excessive ou la dégradation de l'action.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HT25_09 · STAGE_INFERENCE · outgoing_current_use
- Timestamp : `00:12:46-00:13:34`
- Cible : `hirame`
- Directivité : `expert_experience`
- Contenu : Sur un surf peu profond, l'auteur préfère souvent exploiter un courant qui s'éloigne du pêcheur afin de faire travailler le leurre avec peu d'action et de ralentir la présentation.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HT25_10 · STAGE_FACT · angle_adaptation
- Timestamp : `00:13:39-00:13:51`
- Cible : `hirame`
- Directivité : `expert_method`
- Contenu : Quand courant/profondeur rendent le contrôle difficile, l'auteur ajuste progressivement l'angle de lancer jusqu'à retrouver une présentation maîtrisable.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HT25_11 · UNRESOLVED · tide_window_claims
- Timestamp : `00:13:55-00:16:26`
- Cible : `hirame`
- Directivité : `expert_experience`
- Contenu : Les préférences annoncées pour pleine mer, montante, marée moyenne et cycles lunaires restent des expériences locales/agrégées et ne doivent pas entrer dans le moteur de scoring sans réplication indépendante.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Conserver éventuellement en note Comprendre, pas dans Evidence de fenêtre.

### HT25_12 · SKIP_DUPLICATE · generic_dawn_claim
- Timestamp : `00:04:33-00:06:28`
- Cible : `hirame`
- Directivité : `expert_experience`
- Contenu : L'idée générale que l'aube est une période favorable au Hirame est déjà fortement couverte dans V6.5.4.
- Recouvrement V6.5.4 : #244, #252
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Ne pas ajouter une nouvelle observation générique; garder seulement la nuance 'lumière relative' HT25_01.

## B3_HIRAME_FIELD_5 — A+++

Fichier : `Export-Subtitles-AppForLanguage (5).txt`  
Groupe source : `same_hirame_surf_creator`  
Deux captures Hirame distinctes. Lieu exact et date exacte non résolus.

### HF5_01 · STAGE_FACT · bird_signal
- Timestamp : `00:00:40-00:00:57`
- Cible : `hirame`
- Directivité : `direct_observation`
- Contenu : Des oiseaux actifs sont visibles hors de portée; le pêcheur choisit malgré tout de travailler le secteur situé en face de cette activité.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HF5_02 · STAGE_EVENT · capture
- Timestamp : `00:01:22-00:01:47`
- Event key : `HF5_EVT_CATCH_1`
- Outcome : `positive`
- Cible : `hirame`
- Directivité : `direct_observation`
- Contenu : Première capture Hirame confirmée de la session, sous vent latéral et courant annoncé légèrement rapide.
- Éligibilité : présence=True · récurrence+=True · fenêtre=False · modèle actif=False
- Note : Le leurre exact n'est pas explicitement nommé dans la séquence; ne pas l'inférer.

### HF5_03 · STAGE_FACT · lure_control
- Timestamp : `00:01:47-00:02:19`
- Event key : `HF5_EVT_CATCH_1`
- Cible : `hirame`
- Directivité : `direct_observation`
- Contenu : Malgré le vent latéral et le courant, le pêcheur dit sentir que le leurre nage correctement; il utilise cette sensation de contrôle comme critère pour juger la présentation exploitable.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HF5_04 · STAGE_ECOSYSTEM · bait_presence
- Timestamp : `00:04:05-00:04:17`
- Event key : `HF5_EVT_BAIT_1`
- Outcome : `ecosystem`
- Cible : `None`
- Directivité : `direct_observation`
- Contenu : Un anchois japonais (katakuchi-iwashi) est physiquement récupéré/observé sur le secteur, confirmant la présence de petit bait autour de l'activité d'oiseaux.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Signal écosystème, pas événement Hirame positif.

### HF5_05 · STAGE_EVENT · capture
- Timestamp : `00:05:26-00:07:36`
- Event key : `HF5_EVT_CATCH_2`
- Outcome : `positive`
- Cible : `hirame`
- Directivité : `direct_observation`
- Contenu : Deuxième capture Hirame distincte; poisson annoncé à 67 cm.
- Éligibilité : présence=True · récurrence+=True · fenêtre=False · modèle actif=False
- Note : Événement distinct du premier; leurre et moment exact de l'attaque non explicités dans le texte.

### HF5_06 · STAGE_INFERENCE · field_selection
- Timestamp : `00:07:42-00:08:39`
- Cible : `hirame`
- Directivité : `author_interpretation`
- Contenu : Résumé opérationnel de l'auteur : oiseaux même lointains → prospecter le secteur; rechercher une structure offshore; choisir le leurre qui conserve réellement son action dans les conditions présentes.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HF5_07 · UNRESOLVED · source_metadata
- Cible : `hirame`
- Directivité : `interpretation`
- Contenu : Lieu exact, année/date de pêche et modèles de leurres des deux captures doivent être identifiés avant tout usage local/saisonnier.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

## B3_HIRAME_FIELD_6 — A++

Fichier : `Export-Subtitles-AppForLanguage (6).txt`  
Groupe source : `same_hirame_surf_creator`  
Une capture Hirame certaine; début juillet explicitement annoncé, mais année/lieu exact non résolus.

### HF6_01 · STAGE_FACT · session_context
- Timestamp : `00:00:04-00:01:04`
- Cible : `hirame`
- Directivité : `direct_observation`
- Contenu : Session annoncée début juillet sur un surf peu profond avec une bosse/haut-fond offshore accessible; prospection prévue de sa pente descendante jusqu'à la cassure proche du bord.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HF6_02 · STAGE_EVENT · capture
- Timestamp : `00:04:43-00:05:35`
- Event key : `HF6_EVT_CATCH_1`
- Outcome : `positive`
- Cible : `hirame`
- Directivité : `direct_observation`
- Contenu : Capture Hirame confirmée près du bord; l'attaque intervient sur la pente descendante de la bosse/structure située juste devant le pêcheur.
- Éligibilité : présence=True · récurrence+=True · fenêtre=False · modèle actif=False
- Note : Le contexte précédent mentionne Howl Fish, mais poids/version non donnés; ne pas créer une recommandation exacte.

### HF6_03 · STAGE_FACT · nearshore_structure
- Timestamp : `00:03:40-00:05:35`
- Event key : `HF6_EVT_CATCH_1`
- Cible : `hirame`
- Directivité : `direct_observation`
- Contenu : Après avoir constaté des réactions près du bord, le pêcheur concentre la prospection sur la structure proche plutôt que sur le seul large; la capture Hirame valide cette micro-position pendant la session.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HF6_04 · SKIP_DUPLICATE · generic_nearshore_advice
- Timestamp : `00:10:07-00:10:25`
- Cible : `hirame`
- Directivité : `author_interpretation`
- Contenu : Le conseil général de ne pas négliger les structures proches du bord est déjà documenté dans V6.5.4.
- Recouvrement V6.5.4 : #245, #323
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Conserver la capture HF6_02 comme réplication directe, mais ne pas ajouter une règle générique redondante.

### HF6_05 · UNRESOLVED · lure_metadata
- Timestamp : `00:03:40-00:05:35`
- Cible : `hirame`
- Directivité : `interpretation`
- Contenu : Howl Fish est nommé avant la capture, mais la version/poids exacts ne sont pas explicités; modèle non actionnable tant que non vérifié.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HF6_06 · UNRESOLVED · source_metadata
- Cible : `hirame`
- Directivité : `interpretation`
- Contenu : Le lieu exact et l'année ne sont pas établis de façon fiable par la transcription.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

## B3_AOMONO_LSJ_9 — A-_TECHNIQUE

Fichier : `Export-Subtitles-AppForLanguage (9).txt`  
Groupe source : `light_shore_jigging_tutorial`  
Méthodes 青物 incluant explicitement Wakashi/Inada/Warasa/Buri. Aucun événement Hamachi positif; capture réelle observée = Kanpachi, donc hors Hamachi.

### AJ9_01 · STAGE_FACT · seriola_scope
- Timestamp : `00:14:38-00:14:56`
- Cible : `hamachi`
- Directivité : `reported_context`
- Contenu : La vidéo cite explicitement la lignée Wakashi → Inada → Warasa → Buri parmi les cibles du light shore jigging, ce qui autorise l'usage technique pour Hamachi/Seriola quinqueradiata.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : N'autorise aucune preuve de présence: aucune capture Seriola n'est confirmée dans la session.

### AJ9_02 · STAGE_FACT · range_bracketing
- Timestamp : `00:01:07-00:01:59`
- Cible : `hamachi`
- Directivité : `expert_method`
- Contenu : Méthode de recherche de couche : mesurer d'abord le countdown jusqu'au fond, puis prospecter progressivement plusieurs niveaux (exemple 8 → 5 → 3 → 1) et rester dans la couche qui produit.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AJ9_03 · STAGE_FACT · animation_variation
- Timestamp : `00:04:28-00:05:28`
- Cible : `hamachi`
- Directivité : `expert_method`
- Contenu : La cadence n'est pas fixe : nombre de jerks, vitesse et pauses sont modifiés selon les réactions du jour; une récupération rapide avec arrêt est aussi proposée pour des poissons actifs.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AJ9_04 · STAGE_INFERENCE · tide_line_search
- Timestamp : `00:06:30-00:07:10`
- Cible : `hamachi`
- Directivité : `expert_experience`
- Contenu : En absence de chasse visible, l'auteur recommande de rechercher une ligne de courant/tide line susceptible de concentrer bait et prédateurs, plutôt que de rester uniquement sur une zone uniforme.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AJ9_05 · STAGE_INFERENCE · depth_for_aomono
- Timestamp : `00:07:36-00:08:14`
- Cible : `hamachi`
- Directivité : `expert_experience`
- Contenu : Pour les poissons bleus, l'auteur privilégie visuellement les secteurs plus profonds, souvent là où les vagues cassent moins; cette règle est distincte de sa lecture des flatfish.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AJ9_06 · STAGE_FACT · jig_role_selection
- Timestamp : `00:08:42-00:09:35`
- Cible : `hamachi`
- Directivité : `expert_method`
- Contenu : Le choix d'un jig dépend du rôle recherché : vitesse de chute, silhouette et flash; l'auteur distingue notamment une présentation lente au fall d'une silhouette plus compacte adaptée à petit bait.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AJ9_07 · STAGE_FACT · wind_range_adaptation
- Timestamp : `00:22:14-00:23:11`
- Cible : `hamachi`
- Directivité : `expert_method`
- Contenu : Sous vent, l'auteur réduit la bannière en gardant la canne plus basse et adapte le poids/couche; un jig trop léger est davantage déplacé par la ligne et peut remonter hors de la couche visée.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AJ9_08 · STAGE_INFERENCE · boil_edge
- Timestamp : `00:26:48-00:27:05`
- Cible : `hamachi`
- Directivité : `expert_experience`
- Contenu : Lors d'une chasse, l'auteur conseille de viser la trajectoire de fuite et les bords/alentours du boil plutôt que de traverser systématiquement son centre.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AJ9_09 · SKIP_DUPLICATE · positive_event
- Timestamp : `00:23:19-00:23:43`
- Cible : `hamachi`
- Directivité : `direct_observation`
- Contenu : La capture observée après changement à 20 g n'est pas une Seriola confirmée et ne doit pas être convertie en événement Hamachi.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : La transcription indique un autre poisson; target Hamachi interdit.

### AJ9_10 · SKIP_DUPLICATE · kanpachi_capture
- Timestamp : `00:27:17-00:27:54`
- Cible : `None`
- Directivité : `direct_observation`
- Contenu : La capture finale est explicitement un petit Kanpachi; elle reste hors taxonomie cible et ne vote jamais Hamachi.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AJ9_11 · UNRESOLVED · weight_policy
- Timestamp : `00:12:53-00:14:21`
- Cible : `hamachi`
- Directivité : `reported_context`
- Contenu : La vidéo cite des plages allant jusqu'à 60–100 g selon les formes de shore jigging; ces poids sont des faits de contexte mais sont hors politique active du projet au-delà de 50 g.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : >50 g : conserver éventuellement en biologie/méthode source, jamais recommander.

## B3_HIRAME_SINKING_PENCIL_3 — A-_TECHNIQUE

Fichier : `Export-Subtitles-AppForLanguage (3).txt`  
Groupe source : `same_hirame_surf_creator`  
Vidéo pédagogique/compilation. Anecdotes de captures antérieures non converties en nouveaux événements.

### HP3_01 · STAGE_FACT · sinking_pencil_role
- Timestamp : `00:00:09-00:00:35`
- Cible : `hirame`
- Directivité : `expert_method`
- Contenu : Le sinking pencil est présenté comme compromis entre distance supérieure au minnow et présentation plus lente qu'un metal jig.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HP3_02 · STAGE_FACT · slow_mid_bottom_role
- Timestamp : `00:01:35-00:02:02`
- Cible : `hirame`
- Directivité : `expert_method`
- Contenu : Un sinking pencil à nage perceptible est utilisé pour travailler lentement les zones shallow et la couche médiane-basse, avec contrôle tactile de la nage et de la profondeur.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Le modèle W95S exact reste non actionnable sans vérification poids/version.

### HP3_03 · SKIP_DUPLICATE · retrieve_speed_control
- Timestamp : `00:02:45-00:03:11`
- Cible : `hirame`
- Directivité : `expert_method`
- Contenu : Ralentir si le leurre remonte trop et accélérer s'il gratte le fond recoupe déjà la règle V6.5.4 d'adapter la vitesse au courant pour conserver une présentation cohérente.
- Recouvrement V6.5.4 : #357
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HP3_04 · STAGE_FACT · drift_with_slack
- Timestamp : `00:03:34-00:03:49`
- Cible : `hirame`
- Directivité : `expert_method`
- Contenu : En drift, le leurre est porté par le courant tandis que le pêcheur exploite la bannière; un sinking pencil suffisamment dense peut rester contrôlable tout en dérivant.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HP3_05 · UNRESOLVED · archival_capture
- Timestamp : `00:04:15-00:04:34`
- Cible : `hirame`
- Directivité : `reported_experience`
- Contenu : La capture Hirame racontée en night surf et les Suzuki annoncés en drift sont des expériences antérieures/archives; ne pas créer de nouveaux événements sans retrouver les sorties originales.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### HP3_06 · UNRESOLVED · model_specs
- Cible : `hirame`
- Directivité : `interpretation`
- Contenu : W95S, Cut Vibo 130BR et Flat Flatter 95SXH doivent être normalisés (nom, poids, densité) avant recommandation exacte.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

## B3_SUZUKI_AIR_OGLE_16 — A-_TECHNIQUE

Fichier : `Export-Subtitles-AppForLanguage (16).txt`  
Groupe source : `seabass_lure_labo`  
Méthode produit/opinion d'usage. Pas de nouvelle capture Suzuki directement documentée.

### AO16_01 · STAGE_FACT · lure_behavior
- Timestamp : `00:04:22-00:04:59`
- Cible : `suzuki`
- Directivité : `manufacturer_commentary`
- Contenu : Air Ogre 85 SLM est décrit comme descendant rapidement jusqu'au fond, y compris dans du courant, puis nageant en slalom en récupération; le mouvement se resserre quand la vitesse augmente.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Source discussion secondaire; vérifier specs fabricant avant modèle actionnable.

### AO16_02 · STAGE_INFERENCE · bottom_crustacean_pattern
- Timestamp : `00:05:03-00:06:27`
- Cible : `suzuki`
- Directivité : `expert_opinion`
- Contenu : Lorsque les Suzuki semblent tournés vers des proies de fond/crustacés, les auteurs proposent l'Air Ogre en lift-and-fall comme variation moins rectiligne qu'une vibration classique.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AO16_03 · STAGE_INFERENCE · cold_bottom_pattern
- Timestamp : `00:06:46-00:07:13`
- Cible : `suzuki`
- Directivité : `expert_opinion`
- Contenu : En eau froide, les auteurs décrivent des poissons et du bait pouvant se concentrer dans des creux/structures de fond et recommandent alors des présentations basses.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Même groupe source Seabass Lure Labo; ne pas compter comme réplication indépendante.

### AO16_04 · STAGE_FACT · bottom_drift_role
- Timestamp : `00:11:54-00:12:03`
- Cible : `suzuki`
- Directivité : `expert_method`
- Contenu : Le leurre est aussi présenté comme option pour dériver près du fond dans de grands espaces grâce à sa portée et à sa capacité à rester bas.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AO16_05 · UNRESOLVED · model_specs
- Cible : `suzuki`
- Directivité : `interpretation`
- Contenu : Poids, densité et disponibilité exacte de l'Air Ogre 85 SLM doivent être vérifiés sur source fabricant avant toute recommandation de modèle.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

## B3_SUZUKI_AFTER_CATCH_22 — A_COMPRENDRE

Fichier : `Export-Subtitles-AppForLanguage (22).txt`  
Groupe source : `seabass_lure_labo`  
Discussion explicitement spéculative. Toutes les sorties restent des inférences, sans vote Evidence/présence.

### AC22_01 · STAGE_INFERENCE · landing_disturbance
- Timestamp : `00:02:39-00:03:10`
- Cible : `suzuki`
- Directivité : `explicit_speculation`
- Contenu : Hypothèse : lumière de landing, agitation du pêcheur et combat peuvent perturber temporairement un pin et expliquer un silence après la première capture.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Discussion spéculative; aucune causalité démontrée.

### AC22_02 · STAGE_INFERENCE · fight_path_disturbance
- Timestamp : `00:03:03-00:03:14`
- Cible : `suzuki`
- Directivité : `explicit_speculation`
- Contenu : Hypothèse : le trajet du poisson pendant le combat peut 'balayer' une ligne de pêche et modifier momentanément le comportement des poissons restants.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AC22_03 · STAGE_INFERENCE · rest_the_spot
- Timestamp : `00:08:13-00:08:31`
- Cible : `suzuki`
- Directivité : `reported_experience`
- Contenu : Les auteurs rapportent avoir déjà repris des poissons après avoir laissé reposer un secteur puis y être revenus, tout en reconnaissant que le poisson a aussi pu être remplacé.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AC22_04 · STAGE_INFERENCE · change_after_capture
- Timestamp : `00:10:13-00:10:36`
- Cible : `suzuki`
- Directivité : `expert_opinion`
- Contenu : Après une première capture, répéter exactement le même pin, angle et présentation peut être moins pertinent; les auteurs suggèrent de modifier légèrement le passage plutôt que de reproduire mécaniquement le lancer.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False

### AC22_05 · UNRESOLVED · unsupported_percentage
- Timestamp : `00:01:36-00:02:02`
- Cible : `suzuki`
- Directivité : `explicit_speculation`
- Contenu : L'affirmation selon laquelle seule une fraction d'environ 10 % des Suzuki présents mordrait un leurre n'est pas sourcée de manière suffisante dans la vidéo.
- Éligibilité : présence=False · récurrence+=False · fenêtre=False · modèle actif=False
- Note : Ne jamais importer le chiffre 10 % comme donnée scientifique ou probabilité.
