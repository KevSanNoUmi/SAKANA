# 012 — Libellés, titre principal, cartes espèce

- **Status**: DONE (appliqué et vérifié le 2026-08-16)
- **Category**: typographie et identité
- **Estimated scope**: 1 fichier (`index.html`), ~12 déclarations

## 1. Les libellés de section quittent l'ambre

`OÙ JE PÊCHE`, `MA VALISE`, `BASE DE CONNAISSANCE` étaient peints avec `--accent`, la
couleur de marque. Nouveau token dédié :

```css
--label:#D6DBE2;   /* blanc cassé discret */
```

Appliqué à `.home-section-title`, `.section-title` et `.eyebrow`, avec la graisse
allégée de 600 à 500 et l'interlettrage porté de `.06/.07em` à `.12/.13em` — les
libellés deviennent une structure typographique plutôt qu'une couleur.

L'ambre est désormais **réservé aux données et aux états actifs** : le score du jour, la
vue sélectionnée, l'étape ouverte, le bouton d'action. Il reprend de la valeur parce
qu'il devient rare. Une exception conservée : `.obs-ref` (les références `[#12]`) garde
l'ambre, c'est une donnée. Et `.loadout-rule` garde le terracotta `--flag`, qui signale
une contrainte — un plafond de poids n'est pas un libellé.

Un seul token à changer pour tout reprendre.

## 2. Le titre principal

`Carnet Pêche JP` passe de 24 px / graisse 600 à **32 px / graisse 500**, interlettrage
`-0.02em`.

Fraunces possède un axe optique (`opsz 9..144`) déjà chargé : la police change de dessin
selon la taille. À 24 px en semi-gras elle est trapue ; à 32 px en 500 avec un
interlettrage resserré elle devient éditoriale. C'est exactement la règle du skill — sur
du grand texte le tracking se resserre, et l'emphase passe par la graisse, pas par la
taille. Aucune police supplémentaire chargée.

## 3. Les cartes espèce

La sphère en dégradé ambre (`.species-icon`, 56 px) est supprimée : **elle ne portait
aucune information** — les onze espèces avaient exactement le même disque.

À la place, ce qui a été demandé : le romaji en grand (Fraunces 22 px, graisse 500,
interlettrage `-0.015em`) et le japonais dessous (mono 13 px, discret). Rien d'autre.

**Le compteur d'observations a donc disparu** (`12 obs` / `non documentée`). C'était le
sens de « basta », mais dites-le moi si vous le voulez de retour : c'est une ligne. Le
signal « espèce non documentée » subsiste par ailleurs, via l'opacité réduite de la
carte (`.species-card.undoc`).

### Le bouton d'aperçu : deux essais avant la bonne mise en page

Le nom agrandi entrait en collision avec le bouton d'aperçu sur 9 cartes sur 11.

- **Essai 1** — décaler le texte horizontalement : rejeté, la carte est centrée, un
  `padding-right` désaxe le texte.
- **Essai 2** — descendre le bouton en bas à droite : **pire**, 9 collisions au lieu de
  0. Avec seulement deux lignes centrées, cette carte n'a aucun coin libre : le haut est
  pris par le nom, le bas par le japonais.
- **Retenu** — réserver au bouton sa propre bande : `padding-top:56px` sur la carte,
  bouton en haut à droite. Aucune collision possible par construction.

Coût : environ 28 px de hauteur par carte. La bande supérieure reste visuellement un peu
vide — si ça vous gêne, la piste est de réduire le bouton à 32 px visuels avec une zone
tactile de 44 px, ce que le skill autorise explicitement.

## Vérification

Onze cartes, mesuré sur l'étendue réelle des glyphes après avoir amené chaque carte à
l'écran :

| Contrôle | Résultat |
| --- | --- |
| Collisions texte / bouton | **0 sur 11** |
| Boutons cliquables en leur centre | **11 sur 11** |
| Titres de section sur plusieurs lignes | **0** |
| Débordement de page | 0 |
| Texte tronqué | aucun |

L'élargissement de l'interlettrage avait fait passer « MA VALISE — 2 COMBOS » sur deux
lignes en écrasant la mention de droite : `.loadout-head` autorise maintenant le passage
à la ligne.

**Note de méthode** : un premier relevé annonçait « 11 boutons non cliquables ». Faux
négatif — les cartes étaient à y=1175, hors du viewport, et `elementFromPoint` ne renvoie
rien hors écran. Le test a été refait en amenant chaque carte à l'écran avant de mesurer.
