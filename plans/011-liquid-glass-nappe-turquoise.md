# 011 — Liquid Glass : blocs en verre sur nappe turquoise

- **Status**: DONE (appliqué et vérifié le 2026-08-16)
- **Severity**: — refonte visuelle demandée
- **Category**: matériaux — skill `apple-design-materials`
- **Estimated scope**: 1 fichier (`index.html`), ~45 lignes

Teinte de fond `--bg` conservée telle quelle, comme demandé. Ce qui change : une nappe de
couleur derrière, et des blocs qui deviennent des panneaux de verre.

## Pourquoi une nappe est nécessaire

`backdrop-filter: blur()` échantillonne les pixels **sous** l'élément, les floute, puis
décale leurs couleurs. Si ces pixels sont unis, on obtient un aplat flou — strictement
indiscernable d'un `background: rgba(...)`. Sans variation tonale dessous, le verre ne
sert à rien.

D'où `body::before` : cinq dégradés radiaux turquoise bleu et vert turquoise posés sur
`--bg`, en position fixe. La nappe ne défile pas, les blocs glissent dessus.

Les alphas ont été montés de `.20–.34` à `.38–.58` après un premier essai : à la valeur
basse, les nuages existaient dans le code mais ne se voyaient pas à l'écran une fois le
verre par-dessus.

## Trois contraintes du skill, respectées

**Jamais de verre sur du verre.** Seuls les blocs de premier niveau échantillonnent la
nappe : `.pad`, `.species-card`, `.pad-detail`, `.trip-map-wrap`, `.loadout-card`. Le
premier jet en incluait `.tide-focus-card` et laissait `.dest-context-sticky` avec son
propre flou — or les deux vivent **dans** `.pad-detail`. La vérification a relevé deux
empilements sur la fiche destination ; les deux reçoivent maintenant un simple voile.
Vérifié après correction : **0 empilement** sur l'accueil, la fiche destination et la
fiche espèce.

**Pas d'ancêtre qui coupe la racine de superposition.** Un parent avec `transform`,
`filter`, `clip-path` ou `perspective` crée une nouvelle racine et prive le verre de la
nappe. Vérifié : **aucune** des 23 surfaces n'est dans ce cas. Les `transform` du geste de
balayage et du retour de pression sont transitoires — le verre s'aplatit le temps du
geste, ce qui ne se voit pas.

**Repli pour transparence réduite.** Obligatoire selon le skill. Le bloc couvre la nappe,
la barre de titre, les cinq familles de panneaux et l'état ouvert : tout redevient opaque
sur `--surface`, `backdrop-filter` retiré.

## Valeurs

| Élément | Valeur | Raison |
| --- | --- | --- |
| Flou des panneaux | `blur(20px) saturate(160%)` | valeur prescrite pour une nappe multi-teintes ; sous 130 % de saturation le flou délave vers le gris |
| Remplissage | `rgba(23,34,51,.58)` | sous .55 le contenu du dessous transparaît trop, au-dessus de .70 le panneau redevient opaque |
| Contenus imbriqués | `rgba(255,255,255,.055)` | un voile qui décolle, pas un second verre |

## Un ajustement que le contraste a imposé

Le texte secondaire est passé de `#8B97A8` à `#A3AEBE`. Ce n'est pas cosmétique : sur un
panneau de verre posé au-dessus du nuage le plus clair, la couleur composite du fond
devient `#184658`, et l'ancien gris y tombait à **3,45:1** — sous le seuil de 4,5 exigé
pour du texte. Le nouveau tient à 4,55:1.

Contrastes calculés au point le plus défavorable (`#184658`) :

| Élément | Contraste | Seuil |
| --- | --- | --- |
| Texte principal `#EDEEF0` | 8,80:1 | 4,5 |
| Texte secondaire `#A3AEBE` | 4,55:1 | 4,5 |
| Accent ambre `#E8A33D` | 4,74:1 | 3,0 |

Sur fond nu, tous montent au-delà de 7:1.

## Performance

23 à 24 surfaces floutées simultanées. Défilement mesuré sur 30 pas :

| | Médiane | p95 | Pire |
| --- | --- | --- | --- |
| Avec verre | 16,7 ms | 17,5 ms | 17,7 ms |
| Sans verre (toutes les `backdrop-filter` neutralisées) | 16,7 ms | 17,7 ms | 18,4 ms |

Écart nul, 60 images/s dans les deux cas — la composition n'est pas pathologique.

**Réserve importante** : cette mesure vient d'un GPU de bureau exécutant un viewport de
téléphone. Elle prouve que le nombre de couches n'est pas absurde, elle **ne prouve rien
sur un vrai téléphone**, surtout un modèle ancien. À vérifier sur l'appareil réel ; si le
défilement accroche, le levier est de retirer `backdrop-filter` des cartes de liste
(`.pad`, `.species-card`) en gardant le verre sur les blocs uniques — la nappe reste
visible dans les gouttières et l'effet tient encore.

## Vérification

Accueil, fiche destination et fiche espèce : aucun débordement de page, aucun élément
hors écran, aucun texte tronqué, aucun empilement de verre, aucune surface coupée de la
nappe.

## Réglages

Tout se pilote depuis deux endroits :

- **Les nuages** — les cinq `radial-gradient` de `body::before`. Position (`at X% Y%`),
  étendue (`ellipse W% H%`), intensité (le dernier nombre du `rgba`).
- **L'épaisseur du verre** — `--glass-panel` dans `:root`. Rester entre `.55` et `.70`.

Si vous modifiez les nuages vers des teintes plus claires, refaites le calcul de
contraste : c'est la seule chose qui peut casser silencieusement.
