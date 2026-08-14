# Curation P0 — lot 2 — Carnet Pêche JP V6.5.2

**Aucune modification de la base ou du front.** Cette passe ne fait que figer la curation avant staging.

## Synthèse

- **STAGE_FACT** : 15
- **STAGE_INFERENCE** : 9
- **UNRESOLVED** : 10
- **STAGE_EVENT** : 15
- **STAGE_ECOSYSTEM** : 1
- **SKIP_DUPLICATE** : 2

## Sources

### P0_MADAI_AMAKUSA — A+++
- Fichier : `Export-Subtitles-AppForLanguage (9).txt`
- Zone : Kumamoto / Amakusa / shore
- Note : Source prioritaire Madai; séparer capture directe, expérience du pêcheur et interprétations marée/saison.

### P0_MADAI_SHIZUOKA — A++
- Fichier : `Export-Subtitles-AppForLanguage (8).txt`
- Zone : Shizuoka surf / shore
- Note : Capture Madai directe; petite Saba capturée comme signal écosystème. Juin = hors voyage mais mécanique transférable.

### P0_SUZUKI_COLD — A++
- Fichier : `Export-Subtitles-AppForLanguage (5).txt`
- Zone : Tokyo Bay inner rivers / exact first location uncertain; Yoro River later
- Note : Plusieurs sessions froides dans la même vidéo; ne pas les fusionner en un seul événement.

### P0_SUZUKI_LAYER — A++
- Fichier : `Export-Subtitles-AppForLanguage (2).txt`
- Zone : Tokyo / Arakawa then Sumida
- Note : Très forte valeur sur changement de couche, structure, tension-fall et maintien du courant.

### P0_HIRAME_WANDO — A+
- Fichier : `Export-Subtitles-AppForLanguage (10).txt`
- Zone : Japanese surf / exact location unknown
- Note : Une partie pédagogique recoupe déjà le corpus; conserver uniquement les micro-positions et événements réellement nouveaux.

## Items de curation

### MA01 · STAGE_FACT · season_experience
- Source : `P0_MADAI_AMAKUSA`
- Timestamp : `00:02:02-00:03:07`
- Espèce cible : `madai`
- Directivité : `interpretation`
- Contenu : Le pêcheur dit commencer régulièrement le Madai du bord vers le début de l'hiver; il considère la période hiver-printemps comme favorable au rapprochement côtier, en lien notamment avec les sardines.
- Note : Valeur saisonnière forte mais ne doit pas compter comme événement positif.

### MA02 · STAGE_INFERENCE · spot_selection
- Source : `P0_MADAI_AMAKUSA`
- Timestamp : `00:03:38-00:04:29`
- Espèce cible : `madai`
- Directivité : `interpretation`
- Contenu : Pour choisir un secteur Madai du bord, le pêcheur donne la priorité au bait puis recherche courant actif, eau profonde proche et cassure/pente accessible.

### MA03 · STAGE_INFERENCE · tide_trigger
- Source : `P0_MADAI_AMAKUSA`
- Timestamp : `00:04:29-00:04:58`
- Espèce cible : `madai`
- Directivité : `interpretation`
- Contenu : Le pêcheur estime que les moments juste avant l'arrêt de marée ou au redémarrage du mouvement peuvent déclencher des poissons présents mais jusque-là non mordants.
- Note : Ne pas injecter dans le scoring marée tant que non répliqué.

### MA04 · STAGE_FACT · layer_adaptation
- Source : `P0_MADAI_AMAKUSA`
- Timestamp : `00:06:19-00:07:20`
- Espèce cible : `madai`
- Directivité : `interpretation`
- Contenu : Sans bait visible, il commence avec un sinking pencil haut dans la couche puis ajoute du countdown pour descendre; il insère parfois un stop-and-go s'il imagine un poisson suiveur.

### MA05 · STAGE_FACT · match_the_hatch
- Source : `P0_MADAI_AMAKUSA`
- Timestamp : `00:07:32-00:08:13`
- Espèce cible : `madai`
- Directivité : `interpretation`
- Contenu : La taille de leurre est choisie selon le bait: environ 8-10 cm sur petites sardines, plus grand si le fourrage est plus volumineux; si le bait est inconnu il reste autour de 10 cm.

### MA06 · UNRESOLVED · missed_strike
- Source : `P0_MADAI_AMAKUSA`
- Timestamp : `00:15:48-00:16:44`
- Event key : `MA_EVT_MISSED_1`
- Espèce cible : `None`
- Directivité : `direct_observation`
- Contenu : Un très gros poisson frappe dès l'entrée dans le courant principal; le pêcheur pense à un Madai nourri sur le bait dérivant mais l'espèce n'est pas confirmée.
- Note : Ne pas compter comme Madai positif; target_species doit rester null.

### MA07 · STAGE_EVENT · capture
- Source : `P0_MADAI_AMAKUSA`
- Timestamp : `00:19:01-00:20:51`
- Event key : `MA_EVT_CATCH_1`
- Espèce cible : `madai`
- Directivité : `direct_observation`
- Contenu : Capture confirmée d'un Madai du bord à Amakusa; le poisson prend loin du bord dans le courant principal et est estimé ensuite autour du milieu des 40 cm à environ 50 cm.
- Note : Lure exact non énoncé au moment de la capture; ne pas l'inférer.

### MA08 · STAGE_FACT · run_and_gun
- Source : `P0_MADAI_AMAKUSA`
- Timestamp : `00:21:14-00:23:45`
- Event key : `MA_SESSION_2`
- Espèce cible : `madai`
- Directivité : `direct_observation`
- Contenu : La session est conduite en run-and-gun très mobile afin de trouver bait et poissons de passage; le pêcheur décrit parfois un lancer puis déplacement.

### MA09 · UNRESOLVED · source_metadata
- Source : `P0_MADAI_AMAKUSA`
- Espèce cible : `madai`
- Directivité : `interpretation`
- Contenu : Date de pêche/publication et modèle exact du leurre de la capture finale non disponibles dans la transcription.

### MS01 · STAGE_ECOSYSTEM · capture
- Source : `P0_MADAI_SHIZUOKA`
- Timestamp : `00:03:03-00:03:19`
- Event key : `MS_EVT_SABA_1`
- Espèce cible : `saba`
- Directivité : `direct_observation`
- Contenu : Une petite Saba est capturée depuis le surf de Shizuoka pendant la session; elle constitue à la fois une présence Saba et un signal de petit bait disponible.
- Note : Ne pas transformer cette présence de juin en signal saisonnier pour novembre-décembre.

### MS02 · STAGE_EVENT · capture
- Source : `P0_MADAI_SHIZUOKA`
- Timestamp : `00:05:09-00:07:18`
- Event key : `MS_EVT_MADAI_1`
- Espèce cible : `madai`
- Directivité : `direct_observation`
- Contenu : Un Madai est capturé depuis le surf de Shizuoka sur Bone Bait monté sur Finesse Head; le pêcheur précise ensuite que la tête utilisée était de 18 g.

### MS03 · STAGE_FACT · weight_selection
- Source : `P0_MADAI_SHIZUOKA`
- Timestamp : `00:07:27-00:08:01`
- Event key : `MS_EVT_MADAI_1`
- Espèce cible : `madai`
- Directivité : `reported_observation`
- Contenu : La tête de 18 g a été choisie pour mieux contrôler le montage sous vent fort et limiter la dérive provoquée par la bannière de ligne.
- Note : Poids total lancé inconnu car le poids du Bone Bait n'est pas donné.

### MS04 · STAGE_FACT · animation_method
- Source : `P0_MADAI_SHIZUOKA`
- Timestamp : `00:08:16-00:09:56`
- Event key : `MS_SESSION_1`
- Espèce cible : `madai`
- Directivité : `interpretation`
- Contenu : Méthode décrite: contact fond, récupération, petite remontée, arrêt/retombée, reprise, nouveau stop; l'auteur cherche volontairement une animation irrégulière plutôt qu'un linéaire constant.

### MS05 · UNRESOLVED · strike_trigger
- Source : `P0_MADAI_SHIZUOKA`
- Timestamp : `00:05:09-00:09:56`
- Event key : `MS_EVT_MADAI_1`
- Espèce cible : `madai`
- Directivité : `interpretation`
- Contenu : Le déclencheur exact de la capture Madai n'est pas explicitement isolé: la vidéo confirme un travail depuis le fond mais pas si l'attaque a eu lieu au lift, au fall ou à la reprise.

### MS06 · UNRESOLVED · gear_weight
- Source : `P0_MADAI_SHIZUOKA`
- Event key : `MS_EVT_MADAI_1`
- Espèce cible : `madai`
- Directivité : `interpretation`
- Contenu : Le poids total réellement lancé (tête 18 g + Bone Bait) doit être vérifié avant toute recommandation active par poids.

### SC01 · STAGE_INFERENCE · cold_behavior
- Source : `P0_SUZUKI_COLD`
- Timestamp : `00:00:35-00:01:48`
- Espèce cible : `suzuki`
- Directivité : `interpretation`
- Contenu : En période froide, l'auteur décrit des Suzuki peu actifs qui s'éloignent peu de leur couche de confort; il recommande de faire passer le leurre devant eux plutôt que d'attendre une montée franche.

### SC02 · STAGE_EVENT · capture
- Source : `P0_SUZUKI_COLD`
- Timestamp : `00:11:07-00:14:59`
- Event key : `SC_EVT_BREAK_1`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Sur une cassure associée à un clair-obscur, après avoir testé plusieurs profondeurs, un Suzuki est pris avec un countdown d'environ 8 temps puis une récupération rapide le long de la cassure; l'attaque survient lorsque le leurre remonte vers le shallow.

### SC03 · STAGE_FACT · range_bracketing
- Source : `P0_SUZUKI_COLD`
- Timestamp : `00:12:15-00:16:21`
- Event key : `SC_SESSION_BREAK`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : La couche est recherchée progressivement par countdown (environ 3, puis 5, puis 8 temps); après la capture et la baisse du niveau, le pêcheur constate que 8 devient trop profond et réajuste.

### SC04 · STAGE_FACT · temperature
- Source : `P0_SUZUKI_COLD`
- Timestamp : `00:14:52-00:15:23`
- Event key : `SC_EVT_BREAK_1`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Au moment de cette séquence, le pêcheur indique une température d'eau à un chiffre en degrés Celsius.

### SC05 · STAGE_EVENT · missed_strike
- Source : `P0_SUZUKI_COLD`
- Timestamp : `00:17:54-00:18:56`
- Event key : `SC_EVT_BREAK_MISS`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Une autre réaction est obtenue sur la cassure mais le poisson se décroche/échoue à se piquer correctement.

### SC06 · STAGE_EVENT · capture
- Source : `P0_SUZUKI_COLD`
- Timestamp : `00:20:57-00:27:15`
- Event key : `SC_EVT_YORO_1`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Dans la rivière Yoro en eau très froide, un Suzuki de 90 cm est pris de jour sur Schneider 18 travaillé dans la couche basse; le poisson recrache un mulet de plus de 30 cm.

### SC07 · STAGE_FACT · bait_layer
- Source : `P0_SUZUKI_COLD`
- Timestamp : `00:20:57-00:22:20`
- Event key : `SC_EVT_YORO_1`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Avant la capture, le bait est observé principalement près du fond; l'auteur estime que les Suzuki restent eux aussi bas et privilégie un leurre pouvant rester lentement dans cette couche.

### SC08 · STAGE_EVENT · capture
- Source : `P0_SUZUKI_COLD`
- Timestamp : `00:27:44-00:29:29`
- Event key : `SC_EVT_YORO_2`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Un second gros Suzuki distinct est capturé dans la même session froide; lui aussi contient du mulet dans la bouche.

### SC09 · STAGE_FACT · current_adaptation
- Source : `P0_SUZUKI_COLD`
- Timestamp : `00:29:35-00:30:03`
- Event key : `SC_SESSION_YORO`
- Espèce cible : `suzuki`
- Directivité : `reported_observation`
- Contenu : Lorsque le courant faiblit, le pêcheur allonge les lancers vers la partie où le flux reste plus fort; il relie cette zone au passage de bait et des poissons entrant depuis l'aval.

### SC10 · STAGE_INFERENCE · warm_discharge
- Source : `P0_SUZUKI_COLD`
- Timestamp : `00:22:43-00:23:05`
- Espèce cible : `suzuki`
- Directivité : `interpretation`
- Contenu : L'auteur considère qu'une zone légèrement réchauffée par un rejet peut concentrer bait et Suzuki lorsque l'eau générale est très froide.

### SC11 · UNRESOLVED · lure_identity
- Source : `P0_SUZUKI_COLD`
- Timestamp : `00:11:21-00:14:07`
- Event key : `SC_EVT_BREAK_1`
- Espèce cible : `suzuki`
- Directivité : `interpretation`
- Contenu : Le modèle transcrit comme « Koume 70 » doit être vérifié (marque, poids exact, densité) avant recommandation active.

### SC12 · UNRESOLVED · location
- Source : `P0_SUZUKI_COLD`
- Timestamp : `00:01:53-00:09:22`
- Event key : `SC_SESSION_BREAK`
- Espèce cible : `suzuki`
- Directivité : `interpretation`
- Contenu : Le premier secteur de la vidéo est mal transcrit; la séquence reste exploitable comme Tokyo Bay inner river mais le nom exact du cours d'eau doit être vérifié.

### SL01 · STAGE_EVENT · capture
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:00:57-00:02:59`
- Event key : `SL_EVT_ARA_BOTTOM`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Dans l'Arakawa au début de la descendante, des inakko sont visibles mais aucun boil n'apparaît; les Suzuki sont observés collés au fond dans environ 1 m d'eau et un poisson prend un shad travaillé lentement sur le fond.

### SL02 · STAGE_FACT · lure_role
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:03:29-00:05:53`
- Event key : `SL_EVT_ARA_BOTTOM`
- Espèce cible : `suzuki`
- Directivité : `interpretation`
- Contenu : Dans seulement ~1 m d'eau, le pêcheur évite une vibration qui plongerait trop agressivement et préfère le shad parce qu'il peut rouler lentement au fond.

### SL03 · STAGE_EVENT · capture
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:06:04-00:08:25`
- Event key : `SL_EVT_ARA_SURFACE`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Après l'apparition d'un premier boil, le pêcheur passe immédiatement au Galva 87S et fait dériver le leurre juste sous la surface dans la veine précise où le poisson est monté; un Suzuki est capturé.

### SL04 · STAGE_INFERENCE · layer_diagnostic
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:02:16-00:08:34`
- Event key : `SL_SESSION_ARA`
- Espèce cible : `suzuki`
- Directivité : `interpretation`
- Contenu : La séquence montre que la présence de bait en surface ne suffit pas à déduire la couche du Suzuki: les poissons restent d'abord au fond puis une activité de surface ponctuelle justifie le changement immédiat de couche.

### SL05 · STAGE_EVENT · capture
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:10:35-00:12:02`
- Event key : `SL_EVT_SUMIDA_1`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Dans la Sumida, un Suzuki est capturé sur MiniEnt 57S en fall contrôlé au ras d'une structure/pile, avec assez de tension pour détecter la touche et conserver la trajectoire.

### SL06 · STAGE_FACT · fall_control
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:11:30-00:12:11`
- Event key : `SL_EVT_SUMIDA_1`
- Espèce cible : `suzuki`
- Directivité : `reported_observation`
- Contenu : Le pêcheur précise qu'un free fall lui ferait perdre la détection des touches; il conserve donc une tension légère pendant la descente.

### SL07 · STAGE_EVENT · capture
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:12:40-00:13:03`
- Event key : `SL_EVT_SUMIDA_2`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Deuxième capture distincte de la séquence Sumida sur la même logique de fall près de la structure.

### SL08 · STAGE_EVENT · capture
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:14:45-00:15:46`
- Event key : `SL_EVT_SUMIDA_3`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Troisième capture distincte de la séquence Sumida; le pattern de tirer légèrement puis laisser retomber continue à produire.

### SL09 · STAGE_EVENT · capture
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:16:52-00:18:12`
- Event key : `SL_EVT_SUMIDA_4`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Quatrième capture distincte de la séquence Sumida, poisson annoncé autour de 62-63 cm et en bonne condition automnale.

### SL10 · STAGE_EVENT · capture
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:19:02-00:20:40`
- Event key : `SL_EVT_SUMIDA_5`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Cinquième capture distincte de la séquence Sumida alors que le courant faiblit; le pêcheur s'est déplacé vers une structure plus éloignée où le flux reste exploitable.

### SL11 · STAGE_FACT · structure_precision
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:11:37-00:16:33`
- Event key : `SL_SESSION_SUMIDA`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : Le pêcheur constate que les touches disparaissent quand le leurre s'écarte de la bordure de structure; la précision de placement et le maintien du fall au ras de l'obstacle sont essentiels dans cette session.

### SL12 · STAGE_FACT · current_adaptation
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:18:26-00:20:40`
- Event key : `SL_EVT_SUMIDA_5`
- Espèce cible : `suzuki`
- Directivité : `direct_observation`
- Contenu : À l'approche de l'étale, le courant faiblit; il change de position pour viser une structure plus éloignée où le flux fonctionne encore, ce qui produit un nouveau poisson.

### SL13 · UNRESOLVED · lure_identity
- Source : `P0_SUZUKI_LAYER`
- Timestamp : `00:02:03-00:05:53`
- Event key : `SL_EVT_ARA_BOTTOM`
- Espèce cible : `suzuki`
- Directivité : `interpretation`
- Contenu : Le nom du shad de la première capture est mal transcrit (« Fashad/Fa Shad 70 »); modèle exact et poids à vérifier.

### SL14 · UNRESOLVED · lure_weight
- Source : `P0_SUZUKI_LAYER`
- Espèce cible : `suzuki`
- Directivité : `interpretation`
- Contenu : Poids exacts du Galva 87S et du MiniEnt 57S à vérifier dans une source fabricant avant de les transformer en recommandations de modèle.

### HW01 · SKIP_DUPLICATE · spot_general
- Source : `P0_HIRAME_WANDO`
- Timestamp : `00:01:24-00:01:51`
- Espèce cible : `hirame`
- Directivité : `interpretation`
- Contenu : Un wando est souvent plus profond près du bord, peut accumuler le bait et comporter un courant de retour.
- Doublon/recouvrement V6.5.2 : #237, #238, #245, #246
- Note : Concept déjà bien couvert; ne pas réimporter.

### HW02 · SKIP_DUPLICATE · break_general
- Source : `P0_HIRAME_WANDO`
- Timestamp : `00:03:08-00:03:42`
- Espèce cible : `hirame`
- Directivité : `interpretation`
- Contenu : Les Hirame fréquentent préférentiellement les changements de relief/cassures plutôt qu'un fond uniforme.
- Doublon/recouvrement V6.5.2 : #239, #352, #353
- Note : Concept déjà couvert.

### HW03 · STAGE_INFERENCE · micro_position
- Source : `P0_HIRAME_WANDO`
- Timestamp : `00:02:24-00:03:42`
- Espèce cible : `hirame`
- Directivité : `interpretation`
- Contenu : L'auteur déconseille de privilégier la face exacte de la bosse sableuse lorsque la mousse y reste uniforme et que la variation de relief est faible.

### HW04 · STAGE_INFERENCE · micro_position
- Source : `P0_HIRAME_WANDO`
- Timestamp : `00:03:50-00:04:33`
- Espèce cible : `hirame`
- Directivité : `interpretation`
- Contenu : Dans un très grand wando, le centre peut être moins intéressant lorsque le sandbar est hors de portée ou que les variations de profondeur accessibles sont faibles.

### HW05 · STAGE_INFERENCE · micro_position
- Source : `P0_HIRAME_WANDO`
- Timestamp : `00:04:33-00:05:10`
- Espèce cible : `hirame`
- Directivité : `interpretation`
- Contenu : Quelques mètres à côté de la bosse sableuse, là où la profondeur augmente progressivement et où l'extrémité d'un sandbar rencontre le courant de retour, sont présentés comme une micro-position prioritaire.

### HW06 · STAGE_INFERENCE · species_positioning
- Source : `P0_HIRAME_WANDO`
- Timestamp : `00:05:10-00:05:39`
- Espèce cible : `hirame`
- Directivité : `interpretation`
- Contenu : Dans ce type de wando, l'auteur associe davantage le Hirame à la zone où le courant agit franchement, tandis que le Magochi est décrit plus proche de la mousse.
- Note : Conserver comme hypothèse comparative; ne pas importer le Magochi comme preuve Hirame.

### HW07 · STAGE_FACT · documented_pattern
- Source : `P0_HIRAME_WANDO`
- Timestamp : `00:05:56-00:06:43`
- Event key : `HW_EVT_HIRAME_1`
- Espèce cible : `hirame`
- Directivité : `reported_observation`
- Contenu : Dans un même wando, un Hirame d'automne est décrit comme pris autour du courant de retour à l'extrémité du sandbar, en travaillant de la surface vers la couche intermédiaire.
- Note : Ne pas créer un événement positif supplémentaire si cette séquence résume la capture montrée ensuite.

### HW08 · STAGE_EVENT · capture
- Source : `P0_HIRAME_WANDO`
- Timestamp : `00:10:37-00:12:07`
- Event key : `HW_EVT_HIRAME_1`
- Espèce cible : `hirame`
- Directivité : `direct_observation`
- Contenu : Capture confirmée d'un Hirame; le leurre est nommé « Off Bait 30 » dans la transcription.

### HW09 · STAGE_EVENT · capture
- Source : `P0_HIRAME_WANDO`
- Timestamp : `00:12:31-00:14:17`
- Event key : `HW_EVT_HIRAME_2`
- Espèce cible : `hirame`
- Directivité : `direct_observation`
- Contenu : Deuxième Hirame distinct, de petite taille, capturé dans un secteur où la plage forme une bosse puis un wando; le sandbar est annoncé vers 60-70 m.

### HW10 · UNRESOLVED · lure_identity
- Source : `P0_HIRAME_WANDO`
- Timestamp : `00:12:00-00:12:07`
- Event key : `HW_EVT_HIRAME_1`
- Espèce cible : `hirame`
- Directivité : `interpretation`
- Contenu : Le modèle « Off Bait 30 » et son poids exact doivent être vérifiés avant statut matériel/recommandation active.

### HW11 · UNRESOLVED · source_metadata
- Source : `P0_HIRAME_WANDO`
- Espèce cible : `hirame`
- Directivité : `interpretation`
- Contenu : Lieu exact, date de pêche et identité complète de la source ne sont pas fournis dans la transcription.
