/* ------------------------------------------------------------------
   CARNET DE TOURNÉE — données
   ------------------------------------------------------------------
   Pour ajouter une tournée : copie un bloc { ... } complet et
   change les valeurs. Les tournées non closes s'enchaînent dans
   l'ordre du tableau : la première non close est « Actuelle », et
   quand tu la clos, la suivante prend automatiquement sa place.

   rue :  "crv" (bleu) | "cdl" (olive) | "autre" (ocre)
   ------------------------------------------------------------------ */

window.TOURNEES = [

  /* ================= MERCREDI 2 SEPTEMBRE ================= */
  {
    id: "lacassagne-2026-09-02",
    date: "2026-09-02",
    statut: "actuelle",
    zone: "Lyon 3e — Sans-Souci / Montchat",
    titre: "Avenue Lacassagne, de Sans-Souci à Montchat",
    resume: "Premier jour de la semaine, et le plus proche de chez toi : l'avenue Lacassagne sur 1,8 km. Deux boutiques de robes de mariée à trente numéros d'écart, dont une qui vend déjà par TikTok dans toute la France — c'est le meilleur dossier de la journée.",
    chiffres: [
      { n: "17", l: "commerces, dont 2 en réserve" },
      { n: "3", l: "priorités" },
      { n: "1,8", l: "km à pied, ≈4 h" }
    ],
    rues: [
      { code: "crv", nom: "Avenue Lacassagne" },
      { code: "cdl", nom: "Cours du Docteur Long" },
      { code: "autre", nom: "Route de Genas / Félix Faure" }
    ],
    blocs: [
      {
        heure: "9h30 – 11h15",
        quoi: "Bouche et marchands, avant le coup de feu de midi",
        stops: [
          {
            id: "s1", n: 1, rue: "crv", numero: "32",
            nom: "La boucherie du 32",
            meta: "Boucherie, charcuterie, rôtisserie · Avenue Lacassagne",
            pourquoi: "⚠️ <b>Lis l'enseigne avant d'entrer.</b> Les annuaires l'appellent encore « Boissy », mais cette société a été radiée en 2022 et le fonds repris — plusieurs sources parlent aujourd'hui de « Boucherie Rivoire ». Appelle-le par le bon nom et tu gagnes dix points. Aucun site dans les deux cas : une boucherie qui fait rôtisserie vend son poulet du dimanche sur commande.",
            chips: [{ t: "Aucun site" }, { t: "Enseigne à confirmer" }],
            tel: "+33478538292", telAffiche: "04 78 53 82 92",
            google: "boucherie 32 avenue Lacassagne Lyon 3"
          },
          {
            id: "s2", n: 2, rue: "crv", numero: "51 B",
            nom: "Électroménager Sans-Souci",
            meta: "Vente et dépannage d'électroménager d'occasion · Avenue Lacassagne",
            pourquoi: "Électroménager <b>d'occasion</b> : chaque machine est une pièce unique, et personne ne peut savoir ce qu'il a en stock sans pousser la porte. Une page qui liste l'arrivage de la semaine, c'est du chiffre immédiat. Et « réparation lave-linge Lyon 3 » est une des recherches les plus rentables du quartier.",
            chips: [{ t: "Aucun site" }, { t: "Stock qui tourne" }],
            tel: "+33472359851", telAffiche: "04 72 35 98 51",
            google: "Electromenager Sans-Souci 51 avenue Lacassagne Lyon"
          },
          {
            id: "s3", n: 3, rue: "crv", numero: "223",
            nom: "Une Histoire de Goût",
            meta: "Restaurant traditionnel · Avenue Lacassagne · 7h–19h du lundi au vendredi",
            pourquoi: "Son site est une page <code>eatbu.com</code> — un gabarit gratuit partagé par des milliers de restaurants, sans nom de domaine à lui. <b>Il croit avoir un site, il a une fiche.</b> C'est l'angle : montre-lui la différence entre <code>unehistoiredegouts-lyon.eatbu.com</code> et son propre nom.",
            chips: [{ t: "Priorité", flag: true }, { t: "Page eatbu, pas un site" }],
            tel: "+33472336308", telAffiche: "04 72 33 63 08",
            lien: { url: "https://unehistoiredegouts-lyon.eatbu.com/?lang=fr", t: "Voir sa page" }
          },
          {
            id: "s4", n: 4, rue: "crv", numero: "—",
            nom: "100 % Crousti",
            meta: "Restauration rapide · Avenue Lacassagne",
            pourquoi: "Snack de quartier, rien en ligne. Petit ticket, mais c'est ton passage d'échauffement : <b>fais-toi la voix avant les gros dossiers de l'après-midi.</b>",
            chips: [{ t: "Aucun site" }],
            google: "100% Crousti avenue Lacassagne Lyon"
          },
          {
            id: "s5", n: 5, rue: "crv", numero: "—",
            nom: "Le Carrefour",
            meta: "Bar · Avenue Lacassagne, côté Montchat",
            pourquoi: "Un bar se démarche au café du matin, jamais à l'apéro. Rien en ligne : ni horaires, ni terrasse, ni les matchs qu'il diffuse — et c'est exactement ce qu'on cherche avant de choisir un bar.",
            chips: [{ t: "Aucun site" }],
            tel: "+33478548039", telAffiche: "04 78 54 80 39",
            google: "Le Carrefour bar avenue Lacassagne Lyon 3"
          }
        ]
      },
      {
        heure: "11h15 – 12h15",
        quoi: "Le tabac — toujours ouvert, jamais en service",
        stops: [
          {
            id: "s6", n: 6, rue: "cdl", numero: "3",
            nom: "Tabac Presse Le Lutétia",
            meta: "Tabac, presse · 3 cours du Docteur Long, à l'angle de Lacassagne",
            pourquoi: "Il est au tout début du cours du Docteur Long, <b>là où tu n'es pas allé le 30 juillet</b> (tu avais fait les numéros 43 à 99). Aucun site. Vends-lui les services et les horaires — <b>jamais les produits : la publicité pour le tabac est interdite</b>, et c'est toi qui dois le savoir avant lui.",
            chips: [{ t: "Aucun site" }, { t: "⚠ Pas de pub tabac" }],
            google: "Tabac Le Lutetia 3 cours Docteur Long Lyon"
          }
        ]
      },
      {
        heure: "12h15 – 14h",
        quoi: "PAUSE",
        pause: "Ne rentre dans aucun restaurant pendant le service. Profites-en pour relire les trois fiches de l'après-midi : les robes de mariée, c'est là que se joue la journée.",
        stops: []
      },
      {
        heure: "14h – 16h15",
        quoi: "Boutiques, instituts et artisans, entre deux clientes",
        stops: [
          {
            id: "s7", n: 7, rue: "crv", numero: "30",
            nom: "Lyshama Bride",
            meta: "Robes de mariée et de cérémonie · Avenue Lacassagne (2e boutique 196 rue Garibaldi)",
            pourquoi: "<b>Le meilleur dossier de la semaine.</b> Elle vend déjà à distance : robes à 300 €, <b>expédition dans toute la France</b>, location et sur-mesure — et tout passe par des vidéos TikTok et un numéro de portable. Aucun site, aucun catalogue, aucun panier. Tu as exactement ça en portfolio avec My Candy's : <b>montre-lui la boutique en ligne sur ton téléphone.</b>",
            chips: [{ t: "Priorité 1", flag: true }, { t: "TikTok seul" }, { t: "Vend déjà à distance" }],
            tel: "+33760193588", telAffiche: "07 60 19 35 88",
            lien: { url: "https://www.tiktok.com/@lyshama.bride", t: "Son TikTok" }
          },
          {
            id: "s8", n: 8, rue: "crv", numero: "62",
            nom: "Brides Création",
            meta: "Robes de mariée, sur-mesure, location · Avenue Lacassagne",
            pourquoi: "« Brides Creation by Sarah » : vente, <b>création sur mesure, location, accessoires, robes de demoiselles d'honneur, coiffure-maquillage</b> — de 300 à 2 000 €. Toute cette offre tient dans une page Facebook. Une mariée compare cinq boutiques avant d'en visiter une : sans galerie en ligne, elle n'est jamais dans les cinq.",
            chips: [{ t: "Priorité 2", flag: true }, { t: "Facebook / Insta seuls" }, { t: "Galerie photo à vendre" }],
            lien: { url: "https://www.instagram.com/brides.creation/", t: "Son Instagram" }
          },
          {
            id: "s9", n: 9, rue: "crv", numero: "151",
            nom: "Institut Hêresso",
            meta: "Institut de beauté, soins visage, massages · Avenue Lacassagne",
            pourquoi: "Sur <b>Planity et Treatwell à la fois</b> : elle paie une commission sur chaque réservation et ne possède aucune vitrine. Elle fait aussi du <b>massage à domicile</b> et du microneedling — deux prestations que personne ne trouvera jamais sur une fiche d'annuaire. L'angle : son propre module de réservation, sans commission.",
            chips: [{ t: "Priorité 3", flag: true }, { t: "Paie Planity + Treatwell" }],
            tel: "+33768182488", telAffiche: "07 68 18 24 88",
            google: "Institut Heresso 151 avenue Lacassagne Lyon"
          },
          {
            id: "s10", n: 10, rue: "crv", numero: "47",
            nom: "Saira Beauty",
            meta: "Institut de beauté, spécialiste sourcils · Avenue Lacassagne",
            pourquoi: "Ouverte en <b>décembre 2023</b> : jeune entreprise, donc quelqu'un qui investit encore. Saïra est « brow artist » confirmée et travaille avec une esthéticienne — <b>une spécialité vaut une page à elle seule</b>, et « restructuration sourcils Lyon 3 » se cherche en ligne.",
            chips: [{ t: "Aucun site" }, { t: "Sur Planity" }, { t: "Ouverte fin 2023" }],
            google: "Saira Beauty 47 avenue Lacassagne Lyon"
          },
          {
            id: "s11", n: 11, rue: "crv", numero: "35",
            nom: "Christophe Diffusion",
            meta: "Coiffure mixte · Avenue Lacassagne · fermé le lundi",
            pourquoi: "Salon mixte qui fait <b>extensions, lissage, coiffure de mariée</b> — et qui n'existe en ligne que sur Planity. La coiffure de mariée se choisit sur photos : sans galerie, il ne prend que le passage.",
            chips: [{ t: "Aucun site" }, { t: "Sur Planity" }],
            tel: "+33472340006", telAffiche: "04 72 34 00 06",
            google: "Christophe Diffusion 35 avenue Lacassagne Lyon"
          },
          {
            id: "s12", n: 12, rue: "crv", numero: "71",
            nom: "Retouche Lacassagne",
            meta: "Couture, retouches, point relais colis · Avenue Lacassagne",
            pourquoi: "<b>74 avis</b> et une réputation de tout savoir faire, jusqu'aux vestes militaires vintage. Elle est aussi <b>point relais colis</b> : deux activités, zéro ligne en ligne. « Retouche Lyon 3 » et « point relais Montchat », ce sont deux recherches par jour qu'elle laisse filer.",
            chips: [{ t: "Aucun site" }, { t: "Point relais colis" }],
            tel: "+33661710062", telAffiche: "06 61 71 00 62",
            google: "Retouche Lacassagne 71 avenue Lacassagne Lyon"
          },
          {
            id: "s13", n: 13, rue: "cdl", numero: "—",
            nom: "Barbershop Montchat",
            meta: "Barbier · Cours du Docteur Long, en haut · ouvert le dimanche",
            pourquoi: "<b>Ouvert sept jours sur sept, dimanche compris</b> — l'information la plus vendeuse du quartier, et elle n'est nulle part. Un barbier se choisit sur les photos de coupes : Instagram ne suffit pas, il faut une page qui sorte sur « barbier Montchat ».",
            chips: [{ t: "Aucun site" }, { t: "Ouvert dimanche" }],
            google: "Barbershop Montchat cours Docteur Long Lyon"
          }
        ]
      },
      {
        heure: "16h15 – 17h30",
        quoi: "Restauration, dans le creux entre les deux services",
        stops: [
          {
            id: "s14", n: 14, rue: "crv", numero: "—",
            nom: "Kösem",
            meta: "Kebab, tacos, grill · Avenue Lacassagne · 11h–23h tous les jours",
            pourquoi: "<b>Ouvert jusqu'à 23h, sept jours sur sept.</b> Rien en ligne, pas même une carte. Le besoin d'un grill de quartier tient en une page : la carte à jour et la commande à emporter en un clic depuis le mobile.",
            chips: [{ t: "Aucun site" }, { t: "Ouvert tard 7j/7" }],
            tel: "+33478540355", telAffiche: "04 78 54 03 55",
            google: "Kosem avenue Lacassagne Lyon 3"
          },
          {
            id: "s15", n: 15, rue: "autre", numero: "—",
            nom: "Au 6ème Paris",
            meta: "Bar · Avenue Félix Faure, à l'angle de Lacassagne",
            pourquoi: "Dernier de la journée, à l'angle : tu redescends vers Sans-Souci de toute façon. Aucun site. Si la conversation prend, c'est le bon moment — tu n'as plus de rendez-vous après.",
            chips: [{ t: "Aucun site" }],
            google: "Au 6eme Paris bar avenue Felix Faure Lyon 3"
          }
        ]
      },
      {
        heure: "Si créneau",
        quoi: "Bouche-trous à deux pas, non couverts le 30 juillet",
        stops: [
          {
            id: "s16", n: 16, rue: "autre", numero: "109",
            nom: "Cave du Val d'Or",
            meta: "Caviste · Route de Genas",
            pourquoi: "Un caviste vend des <b>coffrets et des cadeaux</b> — une grosse part de son chiffre se joue en novembre et décembre, et ça se commande en ligne. Aucun site.",
            chips: [{ t: "Aucun site" }, { t: "Potentiel coffrets" }],
            google: "Cave du Val d'Or 109 route de Genas Lyon"
          },
          {
            id: "s17", n: 17, rue: "autre", numero: "—",
            nom: "Maison Ball",
            meta: "Poissonnerie · Route de Genas · fermé lundi et dimanche",
            pourquoi: "Une poissonnerie vit de l'arrivage du jour — <b>l'information la plus périssable qui soit</b>, et la plus facile à publier depuis un téléphone. Aucun site.",
            chips: [{ t: "Aucun site" }, { t: "Arrivage quotidien" }],
            tel: "+33953092324", telAffiche: "09 53 09 23 24",
            google: "Maison Ball poissonnerie route de Genas Lyon"
          }
        ]
      }
    ],
    equipes: [
      { nom: "Marion Esthétique (32 Lacassagne)", site: "marion-esthetique-lyon.fr" },
      { nom: "Noor Mahal (39 Lacassagne)", site: "noormahal.fr" },
      { nom: "Le Lotus, massage (114 B)", site: "société fermée — voir alerte" },
      { nom: "Vival, Le Petit Casino", site: "enseignes de groupe" },
      { nom: "Citroën (garage)", site: "site de la marque" }
    ],
    alerte: "<b>Le Lotus, 114 B avenue Lacassagne</b> (salon de massage) : la société apparaît comme fermée dans les registres alors que la boutique est encore référencée partout. Passe ton chemin, tu perdrais dix minutes.",
    kit: [
      "Blade Society, Le Namal, La Parfumerie de Carlito et My Candy's en favoris — <b>My Candy's est LA démo pour les deux boutiques de mariage</b>",
      "Ouvre <code>unehistoiredegouts-lyon.eatbu.com</code> et garde l'onglet : montrer une page eatbu vaut mieux que l'expliquer",
      "Le TikTok de Lyshama Bride ouvert sur ton téléphone avant d'entrer",
      "Cartes de visite, batterie externe, bloc-notes",
      "Le réflexe : <b>cherche son nom sur Google devant lui.</b> Ne rien trouver, c'est ton ouverture — gratuite et incontestable"
    ],
    reserves: [
      "<b>Rentrée scolaire.</b> Le 2 septembre, les commerçants sortent de trois semaines de fermeture et ont la tête dans les cartons. Ce n'est pas un obstacle, c'est l'accroche : « vous venez de rouvrir — combien de clients ont trouvé porte close en août sans savoir quand vous reveniez ? »",
      "<b>Les annuaires retardent toujours.</b> Sur quinze adresses, compte-en deux qui ont changé d'enseigne ou fermé. Vérifie la vitrine avant d'entrer, et corrige la fiche dans les notes."
    ]
  },

  /* ================= JEUDI 3 SEPTEMBRE ================= */
  {
    id: "paulbert-baraban-2026-09-03",
    date: "2026-09-03",
    statut: "actuelle",
    zone: "Lyon 3e — Villette / Maisons-Neuves",
    titre: "Rue Paul Bert (partie est) et rue Baraban",
    resume: "Deux rues qui se croisent, un carré de 600 mètres, et le plus gros ticket de la semaine : un cuisiniste qui n'a qu'une page Facebook. Les trois commerces de bouche sont groupés entre le 212 et le 218, tu les fais en dix minutes.",
    chiffres: [
      { n: "16", l: "prospects + 1 client" },
      { n: "1", l: "cuisiniste = gros ticket" },
      { n: "0,6", l: "km à pied, ≈4 h" }
    ],
    rues: [
      { code: "crv", nom: "Rue Paul Bert" },
      { code: "cdl", nom: "Rue Baraban" },
      { code: "autre", nom: "Rues adjacentes" }
    ],
    blocs: [
      {
        heure: "9h30 – 11h15",
        quoi: "Bouche — les trois du 212-218 s'enchaînent",
        stops: [
          {
            id: "s1", n: 1, rue: "crv", numero: "216",
            nom: "Boucherie de la Villette",
            meta: "Boucherie, charcuterie, traiteur · Rue Paul Bert · fermé lundi et dimanche",
            pourquoi: "<b>Reprise en 2024</b> par une nouvelle société : un repreneur récent est le meilleur prospect qui soit — il a encore un budget d'installation et tout à construire. Viandes découpées sur place, préparations maison, et aucun site.",
            chips: [{ t: "Priorité 2", flag: true }, { t: "Aucun site" }, { t: "Repris en 2024" }],
            tel: "+33478542085", telAffiche: "04 78 54 20 85",
            google: "Boucherie de la Villette 216 rue Paul Bert Lyon"
          },
          {
            id: "s2", n: 2, rue: "crv", numero: "218",
            nom: "Boulangerie Fetishi",
            meta: "Boulangerie-pâtisserie · Rue Paul Bert · 6h30–20h, ouvert le dimanche",
            pourquoi: "<b>Ouverte sept jours sur sept jusqu'à 20h</b> — c'est rare, et ça ne se sait pas. Aucun site. Léonard Fetishi gère l'affaire à son nom : tu parleras au décideur du premier coup, pas à un vendeur.",
            chips: [{ t: "Aucun site" }, { t: "Ouvert 7j/7" }],
            tel: "+33472359726", telAffiche: "04 72 35 97 26",
            google: "Boulangerie Fetishi 218 rue Paul Bert Lyon"
          },
          {
            id: "s3", n: 3, rue: "crv", numero: "212",
            nom: "Ô Pain des Délices",
            meta: "Boulangerie · Rue Paul Bert",
            pourquoi: "Présente <b>sur Uber Eats et nulle part ailleurs</b> : il paie une commission sur chaque commande livrée et n'a aucune page à lui pour les commandes en direct. L'angle est chiffré — montre-lui ce que la commission représente sur un mois.",
            chips: [{ t: "Aucun site" }, { t: "Paie Uber Eats" }],
            google: "O pain des delices 212 rue Paul Bert Lyon"
          },
          {
            id: "s4", n: 4, rue: "cdl", numero: "79",
            nom: "Le Crayon",
            meta: "Restaurant traditionnel · Rue Baraban · midi uniquement, du lundi au vendredi",
            pourquoi: "<b>Vois-le avant 11h30 : il n'ouvre qu'à midi et ferme après le service.</b> Tout est fait maison sauf les frites, plat du jour à 9,20 €, cité par la Tribune de Lyon — et <b>il a une salle qu'il loue pour des événements</b>. Une salle privatisable sans page en ligne, c'est de l'argent laissé sur la table chaque semaine.",
            chips: [{ t: "Priorité 3", flag: true }, { t: "Aucun site" }, { t: "Salle à privatiser" }],
            tel: "+33472346119", telAffiche: "04 72 34 61 19",
            google: "Le Crayon 79 rue Baraban Lyon 3"
          },
          {
            id: "s5", n: 5, rue: "cdl", numero: "—",
            nom: "Boucherie Abdelghani",
            meta: "Boucherie · Rue Baraban, vers le 155",
            pourquoi: "Boucherie de quartier sans une ligne en ligne. Petit dossier, mais il est sur ton chemin entre Paul Bert et le sud de Baraban — <b>ne saute jamais un commerce parce qu'il paraît petit : c'est souvent celui qui dit oui.</b>",
            chips: [{ t: "Aucun site" }],
            google: "Boucherie Abdelghani rue Baraban Lyon 3"
          }
        ]
      },
      {
        heure: "11h15 – 12h15",
        quoi: "Le tabac-presse, pendant que les autres déjeunent",
        stops: [
          {
            id: "s6", n: 6, rue: "crv", numero: "—",
            nom: "Tabac-Presse de la Villette",
            meta: "Tabac, presse · Rue Paul Bert, côté Villette",
            pourquoi: "Aucun site. Comme tous les tabacs : <b>vends les services, jamais les produits</b> — relais colis, jeux, timbres, photocopies, horaires. C'est la liste des services qui fait les recherches Google, pas le tabac.",
            chips: [{ t: "Aucun site" }, { t: "⚠ Pas de pub tabac" }],
            google: "tabac presse rue Paul Bert Villette Lyon 3"
          }
        ]
      },
      {
        heure: "12h15 – 14h",
        quoi: "PAUSE",
        pause: "Le Crayon sert à midi et il est bon marché — mais n'y déjeune pas si tu comptes le démarcher : on ne vend pas à quelqu'un pendant qu'il te sert. Mange ailleurs.",
        stops: []
      },
      {
        heure: "14h – 16h15",
        quoi: "Le cœur de la journée : boutiques, artisans, instituts",
        stops: [
          {
            id: "s7", n: 7, rue: "crv", numero: "218",
            nom: "Cre'Art Cuisines",
            meta: "Cuisiniste, salles de bain, dressings sur mesure · Rue Paul Bert · gérant Fabrice Ablancourt",
            pourquoi: "<b>Le plus gros ticket de la semaine.</b> Une cuisine sur mesure, c'est plusieurs milliers d'euros : personne ne signe ça sans avoir vu des réalisations. Sa seule vitrine en ligne est une page Facebook nommée <code>cuisines.Paul.Bert</code>. <b>Une galerie de chantiers avant/après, c'est littéralement son métier qui se vend tout seul</b> — et c'est le client qui peut payer le plus cher de la rue.",
            chips: [{ t: "Priorité 1", flag: true }, { t: "Facebook seul" }, { t: "Gros budget" }],
            tel: "+33472350893", telAffiche: "04 72 35 08 93",
            lien: { url: "https://www.facebook.com/cuisines.Paul.Bert/", t: "Sa page Facebook" }
          },
          {
            id: "s8", n: 8, rue: "crv", numero: "246",
            nom: "Au Val des Roses",
            meta: "Fleuriste · Rue Paul Bert · ouvert le dimanche matin, fermé le lundi",
            pourquoi: "<b>Plus de trente ans dans la rue</b>, entreprise familiale, mariages, naissances, obsèques, et <b>livraison le jour même</b>. Deux choses qu'aucun passant ne peut deviner : qu'on peut commander à distance, et à quoi ressemblent ses compositions. Un fleuriste sans galerie photo, c'est un restaurant sans carte.",
            chips: [{ t: "Priorité 4", flag: true }, { t: "Aucun site" }, { t: "Livraison jour même" }],
            google: "Au Val des Roses 246 rue Paul Bert Lyon"
          },
          {
            id: "s9", n: 9, rue: "crv", numero: "253",
            nom: "Mes Comptoirs",
            meta: "Concept store, créations françaises · Rue Paul Bert · ouverte par Marie-Anaïs en 2018",
            pourquoi: "<b>90 % de made in France, plus de la moitié fabriqué dans la région</b>, atelier sur place, citée par la Tribune de Lyon et le Village des Créateurs. Bijoux, cosmétiques, papeterie, maroquinerie, épicerie fine : <b>c'est un catalogue entier qui n'existe nulle part en ligne.</b> Le profil type de la boutique qui double ses ventes de Noël avec une vraie boutique en ligne.",
            chips: [{ t: "Priorité 5", flag: true }, { t: "Aucun site" }, { t: "Potentiel e-commerce" }],
            tel: "+33677521153", telAffiche: "06 77 52 11 53",
            google: "Mes Comptoirs 253 rue Paul Bert Lyon concept store"
          },
          {
            id: "s10", n: 10, rue: "crv", numero: "243",
            nom: "Anna Gravina",
            meta: "Institut de beauté · Rue Paul Bert",
            pourquoi: "Sur <b>Planity et Fresha à la fois</b>, exactement comme Balade en Beauté à Montchat : elle paie deux commissions et ne possède rien. Tu connais l'argument par cœur maintenant — <b>son propre module de réservation, zéro commission, et le fichier clients lui appartient.</b>",
            chips: [{ t: "Aucun site" }, { t: "Paie Planity + Fresha" }],
            tel: "+33478545860", telAffiche: "04 78 54 58 60",
            google: "Anna Gravina institut 243 rue Paul Bert Lyon"
          },
          {
            id: "s11", n: 11, rue: "crv", numero: "—",
            nom: "Saga Coiffure",
            meta: "Coiffure · Rue Paul Bert, côté Maisons-Neuves",
            pourquoi: "Aucun site. Le même angle que tous les salons de la semaine : les photos de coupes et la prise de rendez-vous. S'il est déjà sur Planity, l'argument de la commission marche ; s'il n'y est pas, c'est encore plus simple — <b>il n'a aucun moyen de prendre un rendez-vous en dehors des heures d'ouverture.</b>",
            chips: [{ t: "Aucun site" }],
            google: "Saga Coiffure rue Paul Bert Lyon 3"
          },
          {
            id: "s12", n: 12, rue: "crv", numero: "—",
            nom: "Coiffure Allary",
            meta: "Coiffure · Rue Paul Bert",
            pourquoi: "Salon à l'ancienne, au nom du patron — donc <b>une clientèle fidèle et vieillissante, et aucun renouvellement</b>. C'est l'argument à tenir avec tact : ses clients de demain le cherchent sur un téléphone.",
            chips: [{ t: "Aucun site" }],
            google: "Allary coiffure rue Paul Bert Lyon 3"
          },
          {
            id: "s13", n: 13, rue: "cdl", numero: "—",
            nom: "Beauty World & Cosmétique",
            meta: "Coiffure et cosmétiques · Rue Baraban · fermé lundi et dimanche",
            pourquoi: "<b>Deux activités sous une enseigne</b> — coiffure et vente de cosmétiques. Comme Séduction Madame à Montchat : personne dans la rue ne sait qu'on peut y acheter des produits. Deux activités = deux pages = deux fois plus de recherches captées.",
            chips: [{ t: "Aucun site" }, { t: "Deux activités" }],
            google: "Beauty World Cosmetique rue Baraban Lyon 3"
          },
          {
            id: "s14", n: 14, rue: "cdl", numero: "—",
            nom: "Ararat Coiffure",
            meta: "Coiffure · Rue Baraban · 9h–19h du lundi au samedi",
            pourquoi: "Ouvert six jours sur sept sans interruption, aucun site. Il est <b>à quelques portes du restaurant Ararat</b> — même nom, probablement même famille : si l'un des deux t'écoute, demande-lui de te présenter l'autre. <b>La recommandation d'un commerçant à un autre vaut dix passages à froid.</b>",
            chips: [{ t: "Aucun site" }, { t: "Piste de recommandation" }],
            google: "Ararat Coiffure rue Baraban Lyon 3"
          }
        ]
      },
      {
        heure: "16h15 – 17h30",
        quoi: "Restauration, entre les deux services",
        stops: [
          {
            id: "s15", n: 15, rue: "cdl", numero: "95",
            nom: "Ararat",
            meta: "Restaurant turc, kebab · Rue Baraban · 11h–23h, 7j/7",
            pourquoi: "<b>4,2 sur 5 et 332 avis Google</b> — une réputation solide qui ne débouche sur rien : sa seule page est un gabarit <code>eatbu.com</code> partagé avec des milliers de restaurants. Il fait livraison et à emporter. Il a la clientèle, il lui manque l'adresse.",
            chips: [{ t: "Priorité 6", flag: true }, { t: "332 avis / 4,2★" }, { t: "Page eatbu" }],
            tel: "+33472350054", telAffiche: "04 72 35 00 54",
            lien: { url: "https://ararat-restaurant-lyon.eatbu.com/?lang=fr", t: "Voir sa page" }
          },
          {
            id: "s16", n: 16, rue: "autre", numero: "2",
            nom: "Canteen",
            meta: "Restaurant rapide · 2 rue Sainte-Anne de Baraban · 7h30–14h30, du lundi au vendredi",
            pourquoi: "Cantine de bureau : <b>il vit à 100 % des salariés du quartier Part-Dieu</b>, moins de 10 € le repas. Or ces salariés cherchent « où manger près de la Part-Dieu » sur leur téléphone à 11h50. Sans page, il n'existe pas dans cette recherche-là.",
            chips: [{ t: "Aucun site" }, { t: "Clientèle bureaux" }],
            tel: "+33426646565", telAffiche: "04 26 64 65 65",
            google: "Canteen resto rapid rue Sainte-Anne de Baraban Lyon"
          }
        ]
      },
      {
        heure: "Si créneau",
        quoi: "Et une visite qui n'est pas du démarchage",
        stops: [
          {
            id: "s17", n: 17, rue: "cdl", numero: "2",
            nom: "Le Namal — ton client",
            meta: "Restaurant casher · 2 rue Baraban, tout en haut (côté Lyon 6e)",
            pourquoi: "Ce n'est <b>pas un prospect</b> : c'est ton client et ton cousin, au bout de la même rue. Si la journée a été rude, remonte le saluer — <b>un client content qui te voit travailler, ça se transforme en recommandation.</b> Et repars avec deux noms de commerçants qu'il connaît dans le quartier.",
            chips: [{ t: "Client existant" }, { t: "Demander 2 recommandations" }],
            tel: "+33478523738", telAffiche: "04 78 52 37 38"
          }
        ]
      }
    ],
    equipes: [
      { nom: "Les Bibi's Burger (214 Paul Bert)", site: "lesbibisburger.fr" },
      { nom: "Paupiette, boucherie (251 Paul Bert)", site: "boucheriepaupiette.fr" },
      { nom: "Vinsolite, caviste (230 Paul Bert)", site: "vinsolite-lyon.fr" },
      { nom: "L'As du Costume (236 Paul Bert)", site: "lasducostume.fr" },
      { nom: "KLS Lunettes (238 Paul Bert)", site: "kls-lunettes.com — réseau" },
      { nom: "Lavorama, pressing (247 Paul Bert)", site: "repassageservice.fr" },
      { nom: "Point Retouche (104 Baraban)", site: "pointretouche.fr — réseau" },
      { nom: "Bubula, boucherie-comptoir (77 Baraban)", site: "bubula.fr" },
      { nom: "Five Pizza Original", site: "franchise" }
    ],
    alerte: "<b>Ne confonds pas les deux bouts de la rue Paul Bert.</b> Tu restes sur la partie est, entre le 210 et le 260 (Villette / Maisons-Neuves). La partie ouest, vers Moncey, c'est une centaine de commerces d'un tout autre type — elle mérite sa propre journée, pas un bout de celle-ci.",
    kit: [
      "<b>Le portfolio en favoris</b> — pour Cre'Art Cuisines, insiste sur les galeries photo de Blade Society et de La Parfumerie de Carlito",
      "Ouvre la page Facebook <code>cuisines.Paul.Bert</code> avant d'entrer chez le cuisiniste",
      "Ouvre <code>ararat-restaurant-lyon.eatbu.com</code> : la démonstration se fait en trois secondes",
      "Cartes de visite, batterie externe, bloc-notes",
      "Le réflexe : <b>cherche son nom sur Google devant lui.</b> Ne rien trouver, c'est ton ouverture"
    ],
    reserves: [
      "<b>Cre'Art Cuisines est le rendez-vous à ne pas rater.</b> Si le gérant est en rendez-vous client, ne force pas : laisse ta carte, demande quand il est disponible, et reviens. Un dossier de ce montant vaut un deuxième déplacement.",
      "<b>Le carré est petit.</b> Six cents mètres pour seize commerces : tu auras du temps. Utilise-le pour entrer aussi dans ceux que je n'ai pas listés — les annuaires ne voient pas tout, et une rue se lit mieux à pied que sur une carte."
    ]
  },

  /* ================= VENDREDI 4 SEPTEMBRE ================= */
  {
    id: "freres-lumiere-2026-09-04",
    date: "2026-09-04",
    statut: "actuelle",
    zone: "Lyon 8e — Monplaisir / Grange Blanche",
    titre: "Avenue des Frères Lumière, de Monplaisir à Grange Blanche",
    resume: "La journée la plus dense de la semaine. L'avenue compte 169 commerces recensés ; je n'en ai gardé que dix-sept — les seuls qui n'ont vraiment aucun site à eux. Un bijoutier installé depuis 1914 en fait partie.",
    chiffres: [
      { n: "17", l: "commerces à voir" },
      { n: "1914", l: "l'année du bijoutier" },
      { n: "1,1", l: "km à pied, ≈4 h 30" }
    ],
    rues: [
      { code: "crv", nom: "Avenue des Frères Lumière" },
      { code: "cdl", nom: "Place Ambroise-Courtois" },
      { code: "autre", nom: "Grange Blanche / Albert Thomas" }
    ],
    blocs: [
      {
        heure: "9h30 – 11h15",
        quoi: "Bouche — commence par le 79, c'est le meilleur dossier du matin",
        stops: [
          {
            id: "s1", n: 1, rue: "crv", numero: "79",
            nom: "Boulangerie Devesa",
            meta: "Boulangerie-pâtisserie · Avenue des Frères Lumière · ouvre à 6h30 · 10 à 19 salariés",
            pourquoi: "<b>Les deux arguments réunis chez le même client, exactement comme la pâtisserie Villedieu.</b> Son « site » est une page <code>eatbu.com</code>, et son adresse de contact est <code>boulangeriedevesa@gmail.com</code>. Une maison fondée en 2003 avec une vingtaine de salariés qui communique avec une adresse Gmail : c'est la phrase à lui dire, elle fait mouche à tous les coups.",
            chips: [{ t: "Priorité 2", flag: true }, { t: "Page eatbu" }, { t: "Mail Gmail" }],
            tel: "+33478007616", telAffiche: "04 78 00 76 16",
            lien: { url: "https://boulangeriedevesa.eatbu.com/?lang=fr", t: "Voir sa page" }
          },
          {
            id: "s2", n: 2, rue: "crv", numero: "56",
            nom: "Boulangerie Berlier",
            meta: "Boulangerie-pâtisserie bio · Avenue des Frères Lumière · gérant Guillaume Berlier",
            pourquoi: "<b>Certifiée AB.</b> Une boulangerie bio, c'est un choix qui se raconte et qui justifie des prix plus élevés. Aujourd'hui rien ne le raconte : le client qui cherche « boulangerie bio Lyon 8 » ne tombe que sur des annuaires. Société créée en 2018, donc un patron jeune et joignable.",
            chips: [{ t: "Priorité 4", flag: true }, { t: "Aucun site" }, { t: "Certifié bio AB" }],
            tel: "+33478004820", telAffiche: "04 78 00 48 20",
            google: "Boulangerie Berlier 56 avenue des Freres Lumiere Lyon"
          },
          {
            id: "s3", n: 3, rue: "crv", numero: "—",
            nom: "Chez Julie et Flo",
            meta: "Boulangerie · Avenue des Frères Lumière, partie nord",
            pourquoi: "Deux prénoms sur l'enseigne : <b>une affaire à deux, donc une histoire à raconter</b> — et c'est exactement ce qui fait la différence entre une boulangerie et celle d'à côté. Aucun site.",
            chips: [{ t: "Aucun site" }],
            google: "Chez Julie et Flo boulangerie avenue des Freres Lumiere Lyon"
          },
          {
            id: "s4", n: 4, rue: "crv", numero: "—",
            nom: "Le Pain des Paumes",
            meta: "Boulangerie · Avenue des Frères Lumière, partie sud",
            pourquoi: "Aucun site. Boulangerie de fin d'avenue, moins de passage que celles du haut — <b>donc plus besoin qu'on la trouve.</b> C'est l'argument : les commerces les mieux placés ont le moins besoin de toi, les autres en ont le plus.",
            chips: [{ t: "Aucun site" }],
            google: "Le Pain des Paumes avenue des Freres Lumiere Lyon 8"
          },
          {
            id: "s5", n: 5, rue: "crv", numero: "62",
            nom: "Boucherie Mossuz",
            meta: "Boucherie, charcuterie, rôtisserie, tripes · Avenue des Frères Lumière",
            pourquoi: "⚠️ <b>Regarde la vitrine avant d'entrer : une source la donne définitivement fermée</b>, une autre la donne ouverte. Si elle tourne, le dossier est bon — viandes IGP et AOP, Limousin, Charolais, rôtisserie, et rien en ligne. Si elle est fermée, note-le dans les notes et passe au suivant.",
            chips: [{ t: "⚠ Ouverture à vérifier" }, { t: "Aucun site" }],
            tel: "+33478007827", telAffiche: "04 78 00 78 27",
            google: "Mossuz boucherie 62 avenue des Freres Lumiere Lyon"
          }
        ]
      },
      {
        heure: "11h15 – 12h15",
        quoi: "Tabac et cigarette électronique",
        stops: [
          {
            id: "s6", n: 6, rue: "autre", numero: "—",
            nom: "Tabac des Frères Lumière",
            meta: "Tabac, presse · Angle rue du Professeur Paul Sisley",
            pourquoi: "Aucun site. Toujours le même cadre : <b>services et horaires, jamais les produits.</b> Demande-lui la liste complète de ce qu'il fait — relais, jeux, timbres, recharges : c'est cette liste que tu lui vends.",
            chips: [{ t: "Aucun site" }, { t: "⚠ Pas de pub tabac" }],
            tel: "+33478019602", telAffiche: "04 78 01 96 02",
            google: "Tabac des Freres Lumiere Lyon 8"
          },
          {
            id: "s7", n: 7, rue: "crv", numero: "—",
            nom: "Vap'Station",
            meta: "Cigarette électronique et e-liquides · Avenue des Frères Lumière",
            pourquoi: "Un magasin de vape vit de son <b>catalogue d'e-liquides, qui change tous les mois</b>. Aucun site : impossible de savoir ce qu'il a en stock sans se déplacer. Attention, la réglementation sur la publicité s'applique aussi ici — <b>on met en avant la boutique et le conseil, pas les produits.</b>",
            chips: [{ t: "Aucun site" }, { t: "⚠ Cadre réglementé" }],
            tel: "+33478746957", telAffiche: "04 78 74 69 57",
            google: "Vap Station avenue des Freres Lumiere Lyon 8"
          }
        ]
      },
      {
        heure: "12h15 – 14h",
        quoi: "PAUSE",
        pause: "Tu es à Monplaisir : assieds-toi place Ambroise-Courtois. Relis la fiche de Gobbet — le bijoutier de 1914 est le dossier de la journée, il ne se joue pas à l'improvisation.",
        stops: []
      },
      {
        heure: "14h – 16h15",
        quoi: "Le meilleur de l'avenue : bijoux, mode, arts de la table",
        stops: [
          {
            id: "s8", n: 8, rue: "crv", numero: "120",
            nom: "Bijouterie-horlogerie Gobbet",
            meta: "Bijoux, horlogerie, création sur mesure, réparation · Avenue des Frères Lumière · maison fondée en 1914",
            pourquoi: "<b>Plus de cent ans dans la même avenue, et pas une ligne en ligne</b> — seulement une page Facebook. Bijou sur mesure et réparation de montres : deux prestations qu'on cherche systématiquement sur internet et qui se choisissent sur la confiance. <b>L'ancienneté est le meilleur argument de vente qui existe, et un site est le seul support qui sache la raconter.</b> Prends ton temps sur ce dossier.",
            chips: [{ t: "Priorité 1", flag: true }, { t: "Depuis 1914" }, { t: "Facebook seul" }],
            tel: "+33478004120", telAffiche: "04 78 00 41 20",
            lien: { url: "https://www.facebook.com/Gobbet.boutique/", t: "Sa page Facebook" }
          },
          {
            id: "s9", n: 9, rue: "crv", numero: "78",
            nom: "Les Carnets d'Églantine",
            meta: "Mode femme, maternité, vintage, location de costumes · Avenue des Frères Lumière · SARL depuis 2008",
            pourquoi: "<b>Quatre activités sous une seule enseigne</b> : prêt-à-porter, vêtements de grossesse, vintage et <b>location de costumes</b>. La location de costumes se cherche à 100 % en ligne — mariages, spectacles, soirées déguisées — et elle est invisible sur cette recherche. Quatre activités, quatre pages, quatre fois plus de monde qui pousse la porte.",
            chips: [{ t: "Priorité 3", flag: true }, { t: "Aucun site" }, { t: "4 activités" }],
            tel: "+33478091456", telAffiche: "04 78 09 14 56",
            google: "Les Carnets d'Eglantine 78 avenue des Freres Lumiere Lyon"
          },
          {
            id: "s10", n: 10, rue: "crv", numero: "64",
            nom: "Auguste et Louis",
            meta: "Mode homme · Avenue des Frères Lumière",
            pourquoi: "Boutique de mode masculine indépendante, dans une avenue qui en compte peu. Aucun site. <b>Un homme ne fait pas cinq boutiques : il cherche, il regarde les marques, puis il vient.</b> Sans page, il ne passe jamais la première étape.",
            chips: [{ t: "Aucun site" }],
            tel: "+33478749197", telAffiche: "04 78 74 91 97",
            google: "Auguste et Louis 64 avenue des Freres Lumiere Lyon"
          },
          {
            id: "s11", n: 11, rue: "crv", numero: "115",
            nom: "La P'tite Cocotte",
            meta: "Arts de la table, couteaux japonais, ustensiles haut de gamme · Avenue des Frères Lumière · boutique rénovée en 2023",
            pourquoi: "<b>Angle refonte, pas création.</b> Son site existe mais date d'une autre époque — des pages en <code>.html</code> et rien de pensé pour le mobile. Elle vend des couteaux japonais et des ustensiles de chef : <b>du produit cher, qui se compare en ligne avant l'achat.</b> Le décalage entre la boutique refaite en 2023 et le site d'il y a quinze ans, c'est ton argument.",
            chips: [{ t: "Site à refaire", web: true }, { t: "Produits haut de gamme" }],
            tel: "+33966829426", telAffiche: "09 66 82 94 26",
            lien: { url: "http://www.laptitecocotte.fr/nosboutiques.html", t: "Voir son site" }
          },
          {
            id: "s12", n: 12, rue: "crv", numero: "60",
            nom: "Concept Optique",
            meta: "Opticien indépendant · Avenue des Frères Lumière",
            pourquoi: "Opticien indépendant, mais il n'a qu'une page dans le site de son petit réseau — <b>même situation qu'Optique Montchat avec Atol</b>. Il est coincé entre un Afflelou au 116 et un Optical Center dans la même avenue : sans page à lui, il perd la comparaison avant même qu'elle commence.",
            chips: [{ t: "Pas de site propre" }, { t: "Page réseau" }, { t: "Face à 2 chaînes" }],
            tel: "+33478001269", telAffiche: "04 78 00 12 69",
            google: "Concept Optique 60 avenue des Freres Lumiere Lyon"
          },
          {
            id: "s13", n: 13, rue: "crv", numero: "—",
            nom: "Bella Vita",
            meta: "Prêt-à-porter · Avenue des Frères Lumière",
            pourquoi: "Aucun site. Boutique de mode indépendante : <b>les arrivages sont son seul argument, et ils ne se voient que de la vitrine.</b> Une page qui publie la nouvelle collection, c'est ce que font toutes les grandes enseignes — rien ne l'empêche de le faire aussi.",
            chips: [{ t: "Aucun site" }],
            google: "Bella Vita boutique avenue des Freres Lumiere Lyon 8"
          },
          {
            id: "s14", n: 14, rue: "crv", numero: "—",
            nom: "Happy Shoes",
            meta: "Chaussures · Avenue des Frères Lumière",
            pourquoi: "Aucun site. Même dossier qu'Astrapi à Montchat : la chaussure se cherche par marque et par pointure, et une <b>braderie de fin de saison</b> ne s'annonce aujourd'hui que sur un panneau en vitrine.",
            chips: [{ t: "Aucun site" }],
            google: "Happy Shoes chaussures avenue des Freres Lumiere Lyon"
          },
          {
            id: "s15", n: 15, rue: "crv", numero: "—",
            nom: "Magic Esthéty",
            meta: "Institut de beauté · Avenue des Frères Lumière, partie nord",
            pourquoi: "Aucun site. Vérifie en entrant s'il est sur Planity ou Fresha : si oui, tu sors l'argument de la commission ; si non, c'est encore plus simple — <b>il n'a aucun moyen de prendre un rendez-vous en dehors de ses heures d'ouverture.</b>",
            chips: [{ t: "Aucun site" }],
            google: "Magic Esthety institut avenue des Freres Lumiere Lyon"
          }
        ]
      },
      {
        heure: "16h15 – 17h45",
        quoi: "Cafés et brasseries, dans le creux de l'après-midi",
        stops: [
          {
            id: "s16", n: 16, rue: "cdl", numero: "10",
            nom: "L'Industrie Café Comptoir",
            meta: "Café-restaurant · 10 place Ambroise-Courtois · ouvert 6h–23h toute la semaine",
            pourquoi: "<b>Il se privatise, en partie ou en entier, pour des événements privés et professionnels</b> — et cette information n'existe que sur des plateformes de réservation qui prennent une commission. Une privatisation, c'est plusieurs centaines d'euros par soirée. <b>Une seule page « privatiser le café » lui rembourse son site en deux réservations.</b>",
            chips: [{ t: "Priorité 5", flag: true }, { t: "Aucun site" }, { t: "Privatisation = gros panier" }],
            tel: "+33478764465", telAffiche: "04 78 76 44 65",
            google: "L'Industrie cafe comptoir place Ambroise Courtois Lyon"
          },
          {
            id: "s17", n: 17, rue: "autre", numero: "204 bis",
            nom: "Brasserie Le Sherrington",
            meta: "Brasserie · Avenue des Frères Lumière, à Grange Blanche · ouverte en 1959",
            pourquoi: "<b>Plus de soixante ans d'histoire, et une belle histoire</b> : le nom vient des étudiants en médecine de Grange Blanche qui parlaient des travaux du neurologue Sherrington au comptoir. Elle vit toujours de l'hôpital et de la fac d'en face. Plat du jour à 10,50 €, aucun site. <b>Cette histoire-là, c'est un site à elle toute seule</b> — raconte-la lui, il ne sait probablement pas qu'elle a de la valeur.",
            chips: [{ t: "Priorité 6", flag: true }, { t: "Depuis 1959" }, { t: "Aucun site" }],
            tel: "+33478008407", telAffiche: "04 78 00 84 07",
            google: "Le Sherrington 204 avenue des Freres Lumiere Lyon"
          }
        ]
      }
    ],
    equipes: [
      { nom: "Sibilia, charcuterie (86)", site: "charcuterie-sibilia.com" },
      { nom: "Maison Barithel, boucherie (74)", site: "maisonvessiere.com — groupe" },
      { nom: "Fromagerie Lumière (99)", site: "fromages-freres-marchand.fr" },
      { nom: "Sassoun Traiteur (73)", site: "sassoun.fr" },
      { nom: "Maison Célestin, fleuriste (48)", site: "maison-celestin.com" },
      { nom: "Optique Ducret (83)", site: "optiqueducret.com" },
      { nom: "KLS Lunettes (170)", site: "kls-lunettes.com — réseau" },
      { nom: "Alain Afflelou (116), Optical Center", site: "enseignes nationales" },
      { nom: "Auto-école Marietton", site: "réseau régional" }
    ],
    alerte: "<b>L'avenue est longue et très commerçante : ne la fais pas deux fois.</b> Descends du nord (vers le 40) jusqu'au sud (Grange Blanche, 204 bis) en une seule passe. Si tu remontes chercher un commerce oublié, tu perds vingt minutes à chaque aller-retour.",
    kit: [
      "<b>Pour Gobbet, prépare l'argument « 1914 »</b> — la maison est plus vieille que la radio. Une page qui raconte ça vaut n'importe quelle publicité",
      "Ouvre <code>boulangeriedevesa.eatbu.com</code> et repère l'adresse Gmail : les deux arguments dans la même minute",
      "Ouvre <code>laptitecocotte.fr</code> sur ton téléphone : le site s'affiche mal, la démonstration est faite",
      "Portfolio en favoris — <b>La Parfumerie de Carlito est la bonne démo pour Gobbet et les boutiques de mode</b>",
      "Cartes de visite, batterie externe, chaussures confortables : 1,1 km et dix-sept portes"
    ],
    reserves: [
      "<b>Dix-sept commerces, c'est beaucoup pour une journée.</b> Si tu prends du retard, sacrifie les numéros 13 à 15 (Bella Vita, Happy Shoes, Magic Esthéty) — ce sont les plus petits tickets. Ne sacrifie jamais Gobbet, Devesa ni Les Carnets d'Églantine.",
      "<b>Monplaisir est une avenue de patrons installés</b>, pas de jeunes créateurs. On y vend moins le « moderne » que le « vous méritez mieux que ça ». Le ton compte plus ici que partout ailleurs cette semaine."
    ]
  },

  /* ================= SAMEDI 5 SEPTEMBRE ================= */
  {
    id: "bron-centre-2026-09-05",
    date: "2026-09-05",
    statut: "actuelle",
    zone: "Bron — centre-ville",
    titre: "Avenue Franklin Roosevelt et avenue Camille Rousset",
    resume: "Samedi, tout est ouvert mais tout est plein. Le plan est donc inversé : les commerces de bouche dès 9h avant la cohue, les coiffeurs seulement si la vitrine est calme, les restaurants en fin d'après-midi. Trois artisans installés depuis moins de cinq ans — ce sont eux qui signent.",
    chiffres: [
      { n: "18", l: "commerces, dont 2 en réserve" },
      { n: "3", l: "artisans récents" },
      { n: "1,4", l: "km à pied, ≈4 h" }
    ],
    rues: [
      { code: "crv", nom: "Avenue Franklin Roosevelt" },
      { code: "cdl", nom: "Avenue Camille Rousset" },
      { code: "autre", nom: "Rues adjacentes" }
    ],
    blocs: [
      {
        heure: "9h – 11h",
        quoi: "Bouche et épiceries fines, AVANT la cohue du samedi matin",
        stops: [
          {
            id: "s1", n: 1, rue: "cdl", numero: "49",
            nom: "Che Delizia",
            meta: "Épicerie fine italienne, traiteur · Avenue Camille Rousset · ouverte en septembre 2021",
            pourquoi: "<b>Le meilleur dossier de la journée.</b> Épicerie fine italienne, page Facebook seule, et <b>adresse de contact <code>epicerie.chedelizia@gmail.com</code></b>. Produits italiens, plateaux, paniers : <b>exactement ce qui se vend en coffret et en ligne à l'approche des fêtes.</b> C'est le profil d'Épicerie sur Cours à Montchat, mais en plus jeune et plus joignable.",
            chips: [{ t: "Priorité 1", flag: true }, { t: "Facebook seul" }, { t: "Mail Gmail" }, { t: "Potentiel coffrets" }],
            tel: "+33973882174", telAffiche: "09 73 88 21 74",
            lien: { url: "https://www.facebook.com/epicerie.chedelizia/", t: "Sa page Facebook" }
          },
          {
            id: "s2", n: 2, rue: "cdl", numero: "59",
            nom: "Boucherie Maison Gutton",
            meta: "Boucherie-charcuterie · Avenue Camille Rousset · Kevin Gutton, activité reprise en 2024",
            pourquoi: "<b>Races rares et maturation longue</b> — c'est un boucher qui a un discours, pas seulement un étal. Sa seule vitrine est un compte Instagram. <b>Un artisan qui a repris l'affaire l'an dernier a un budget et une envie de se démarquer</b> : c'est le prospect le plus facile à convaincre de toute la semaine.",
            chips: [{ t: "Priorité 2", flag: true }, { t: "Instagram seul" }, { t: "Repris en 2024" }],
            tel: "+33481188530", telAffiche: "04 81 18 85 30",
            lien: { url: "https://www.instagram.com/maison_gutton/", t: "Son Instagram" }
          },
          {
            id: "s3", n: 3, rue: "cdl", numero: "39",
            nom: "Fromagerie Roussette",
            meta: "Fromagerie, espace dégustation, point relais paniers de producteurs · Avenue Camille Rousset",
            pourquoi: "<b>Deux activités, dont une qui n'est nulle part</b> : elle sert de point de retrait pour des paniers de fruits et légumes. Ça se cherche en ligne — « panier producteur Bron » — et elle n'y est pas. Ajoute l'espace dégustation et les plateaux de fêtes : trois pages, trois raisons de la trouver.",
            chips: [{ t: "Priorité 3", flag: true }, { t: "Aucun site" }, { t: "Point relais paniers" }],
            tel: "+33478245381", telAffiche: "04 78 24 53 81",
            google: "Fromagerie Roussette 39 avenue Camille Rousset Bron"
          },
          {
            id: "s4", n: 4, rue: "crv", numero: "116",
            nom: "Maison Vermare",
            meta: "Boulangerie-pâtisserie · Avenue Franklin Roosevelt · ouverte le dimanche matin",
            pourquoi: "Elle fait <b>traiteur et pâtisserie sur commande</b> — deux prestations qui ne se voient pas depuis le trottoir et qui se commandent à l'avance. Macarons, entremets glacés, pièces de cérémonie : aucun site, donc aucune commande qui vienne d'ailleurs que du quartier.",
            chips: [{ t: "Aucun site" }, { t: "Commandes cérémonie" }],
            tel: "+33472149080", telAffiche: "04 72 14 90 80",
            google: "Maison Vermare boulangerie 116 avenue Franklin Roosevelt Bron"
          },
          {
            id: "s5", n: 5, rue: "crv", numero: "148",
            nom: "Au Pain de Bron",
            meta: "Boulangerie et salon de café · Avenue Franklin Roosevelt · 6h–19h",
            pourquoi: "Sa page est un gabarit <code>eatbu.com</code>, comme trois autres commerces de cette semaine. <b>C'est devenu ton argument signature : « ce n'est pas votre site, c'est une fiche que vous partagez avec dix mille boulangeries. »</b> Il fait aussi salon de café — une activité totalement invisible en ligne.",
            chips: [{ t: "Page eatbu" }, { t: "Aussi salon de café" }],
            tel: "+33478268136", telAffiche: "04 78 26 81 36",
            lien: { url: "https://aupaindebron-boulangerie.eatbu.com/?lang=fr", t: "Voir sa page" }
          },
          {
            id: "s6", n: 6, rue: "crv", numero: "—",
            nom: "Arici",
            meta: "Boulangerie · Avenue Franklin Roosevelt, côté est · 6h–20h, samedi et dimanche compris",
            pourquoi: "<b>Ouverte de 6h à 20h, sept jours sur sept, week-end compris</b> — l'amplitude horaire la plus large de l'avenue, et personne ne le sait. L'exemple parfait : une seule information, publiée une fois, ramène des clients tous les dimanches.",
            chips: [{ t: "Aucun site" }, { t: "Ouvert 7j/7 jusqu'à 20h" }],
            google: "Arici boulangerie avenue Franklin Roosevelt Bron"
          }
        ]
      },
      {
        heure: "11h – 12h",
        quoi: "Cafés et bars, avant le service du midi",
        stops: [
          {
            id: "s7", n: 7, rue: "cdl", numero: "—",
            nom: "Le Franklin",
            meta: "Café · Angle Camille Rousset / Franklin Roosevelt · ouvert dès 6h30, dimanche matin compris",
            pourquoi: "Le café d'angle du centre de Bron, ouvert le dimanche matin. Aucun site. <b>Un café de quartier ne se vend pas sur sa carte, il se vend sur sa vie</b> : la terrasse, les matchs, les événements. Une page suffit, et elle se met à jour depuis le téléphone du patron.",
            chips: [{ t: "Aucun site" }, { t: "Ouvert dimanche" }],
            google: "Le Franklin cafe Bron avenue Camille Rousset"
          },
          {
            id: "s8", n: 8, rue: "crv", numero: "—",
            nom: "Bistrot des Iris",
            meta: "Bistrot · Avenue Franklin Roosevelt, côté est (quartier des Iris)",
            pourquoi: "Bistrot de quartier à l'autre bout de l'avenue, aucun site. Il est loin des autres : <b>ne fais le déplacement que si la matinée a été bonne</b> — sinon garde-le pour la fin, il est sur le chemin des restaurants du soir.",
            chips: [{ t: "Aucun site" }],
            google: "Bistrot des Iris Bron avenue Franklin Roosevelt"
          }
        ]
      },
      {
        heure: "12h – 14h",
        quoi: "PAUSE",
        pause: "Samedi midi, tous les restaurants sont pleins et tous les commerçants sont débordés. C'est la pause la plus stricte de la semaine : n'entre nulle part avant 14h.",
        stops: []
      },
      {
        heure: "14h – 16h",
        quoi: "Services et boutiques — samedi, entre seulement si la vitrine est calme",
        stops: [
          {
            id: "s9", n: 9, rue: "cdl", numero: "—",
            nom: "Coiffure Morgan d'Axel",
            meta: "Coiffure · Avenue Camille Rousset, haut de l'avenue",
            pourquoi: "Aucun site. ⚠️ <b>Le samedi, un salon de coiffure est plein du matin au soir.</b> Regarde par la vitrine : s'il y a trois clientes en attente, n'entre pas — laisse une carte au comptoir en dix secondes et repasse un mardi. Tu ne perdras pas le contact, et tu éviteras de l'agacer.",
            chips: [{ t: "Aucun site" }, { t: "⚠ Si la vitrine est calme" }],
            tel: "+33472818144", telAffiche: "04 72 81 81 44",
            google: "Coiffure Morgan d'Axel Bron avenue Camille Rousset"
          },
          {
            id: "s10", n: 10, rue: "cdl", numero: "—",
            nom: "Allange",
            meta: "Coiffure · Avenue Camille Rousset, près de la fromagerie",
            pourquoi: "Aucun site. <b>Il est à deux portes de la Fromagerie Roussette et de Che Delizia</b> : si l'un des deux a bien réagi le matin, cite-le. « Je viens de voir votre voisin » ouvre une porte que « bonjour, je fais des sites » ne franchit jamais.",
            chips: [{ t: "Aucun site" }, { t: "Effet de voisinage" }],
            google: "Allange coiffure Bron avenue Camille Rousset"
          },
          {
            id: "s11", n: 11, rue: "cdl", numero: "—",
            nom: "Barber Hair",
            meta: "Barbier · Avenue Camille Rousset",
            pourquoi: "Aucun site. Un barbier se choisit sur les photos de coupes, et il en a forcément des dizaines sur son téléphone. <b>Demande-lui de te les montrer : quand il te les montre, il a déjà compris ce que tu lui vends.</b>",
            chips: [{ t: "Aucun site" }],
            google: "Barber Hair Bron avenue Camille Rousset"
          },
          {
            id: "s12", n: 12, rue: "crv", numero: "—",
            nom: "Twins Beauty",
            meta: "Institut de beauté · Avenue Franklin Roosevelt",
            pourquoi: "Aucun site. Le nom suggère une affaire à deux — <b>deux associées, c'est deux personnes à convaincre, mais aussi deux personnes qui peuvent décider vite.</b> Demande à parler aux deux plutôt que de laisser un message à l'une.",
            chips: [{ t: "Aucun site" }],
            google: "Twins Beauty institut Bron Franklin Roosevelt"
          },
          {
            id: "s13", n: 13, rue: "crv", numero: "—",
            nom: "Sympatif",
            meta: "Coiffure · Avenue Franklin Roosevelt, vers la mairie",
            pourquoi: "Aucun site, aucune réservation en ligne. Salon installé au cœur de Bron : <b>même argument que Morgan d'Axel, et même règle du samedi</b> — regarde la vitrine avant de pousser la porte.",
            chips: [{ t: "Aucun site" }, { t: "⚠ Si la vitrine est calme" }],
            google: "Sympatif coiffure Bron Franklin Roosevelt"
          },
          {
            id: "s14", n: 14, rue: "cdl", numero: "—",
            nom: "Electro Smoked",
            meta: "Cigarette électronique · Avenue Camille Rousset",
            pourquoi: "Aucun site. Boutique de vape, donc <b>catalogue d'e-liquides qui tourne en permanence</b> et clientèle jeune qui cherche tout sur son téléphone. Comme pour le tabac : on met en avant la boutique et le conseil, pas les produits.",
            chips: [{ t: "Aucun site" }, { t: "⚠ Cadre réglementé" }],
            google: "Electro Smoked Bron avenue Camille Rousset"
          }
        ]
      },
      {
        heure: "16h – 17h30",
        quoi: "Restauration, dans le creux entre les deux services",
        stops: [
          {
            id: "s15", n: 15, rue: "crv", numero: "—",
            nom: "Beyrouth Gourmet",
            meta: "Restaurant libanais · Avenue Franklin Roosevelt",
            pourquoi: "Cuisine libanaise : <b>mezzés, plateaux, traiteur pour les fêtes de famille</b>. C'est une cuisine qui se commande en grande quantité, et donc à l'avance — exactement ce qu'un site sait faire et qu'une fiche d'annuaire ne fait pas. Aucun site.",
            chips: [{ t: "Aucun site" }, { t: "Potentiel traiteur" }],
            google: "Beyrouth Gourmet restaurant Bron Franklin Roosevelt"
          },
          {
            id: "s16", n: 16, rue: "crv", numero: "—",
            nom: "Le Darling",
            meta: "Restaurant · Avenue Franklin Roosevelt, vers la mairie",
            pourquoi: "Aucun site. Le besoin numéro un d'un restaurant de quartier est le même partout : <b>le menu du jour à jour</b>, modifiable depuis le téléphone en trente secondes. Tu auras dit cette phrase quinze fois cette semaine — c'est celle qui marche.",
            chips: [{ t: "Aucun site" }],
            google: "Le Darling restaurant Bron Franklin Roosevelt"
          }
        ]
      },
      {
        heure: "Si créneau",
        quoi: "Deux adresses à l'est, sur le chemin du retour",
        stops: [
          {
            id: "s17", n: 17, rue: "autre", numero: "—",
            nom: "Lezzet Istanbul",
            meta: "Restaurant turc · Angle rue du Progrès / Franklin Roosevelt",
            pourquoi: "Aucun site. Deux établissements du même nom existent à Bron : <b>demande-lui si c'est la même maison.</b> Si oui, ce n'est plus un site que tu vends, c'est une enseigne à deux adresses — et le budget change.",
            chips: [{ t: "Aucun site" }, { t: "Peut-être 2 adresses" }],
            google: "Lezzet Istanbul restaurant Bron"
          },
          {
            id: "s18", n: 18, rue: "crv", numero: "—",
            nom: "Pizza Cozy",
            meta: "Pizzeria à emporter · Avenue Franklin Roosevelt",
            pourquoi: "Aucun site. Petit ticket, dernier de la semaine : <b>si tu es fatigué, garde ta carte et rentre.</b> Une mauvaise visite de fin de journée coûte plus cher qu'une visite non faite.",
            chips: [{ t: "Aucun site" }],
            google: "Pizza Cozy Bron Franklin Roosevelt"
          }
        ]
      }
    ],
    equipes: [
      { nom: "Terres Lyonnaises, primeur (116 Roosevelt)", site: "terreslyonnaises.fr" },
      { nom: "Clinique Vétérinaire Roosevelt (171)", site: "veterinaire-monveto.com — réseau" },
      { nom: "Auto-école La Brondillante (204)", site: "la-brondillante.fr" },
      { nom: "Une Cave à Bron", site: "unecaveabron.com" },
      { nom: "Bistrot de l'Aviation (158 Pagère)", site: "bistrotdelaviation.fr" },
      { nom: "Bron Presse, librairie", site: "librairiebronpresse.wordpress.com" },
      { nom: "Krys, Optical Center, Amplifon, Audika", site: "enseignes nationales" },
      { nom: "Intermarché, Picard, La Vie Claire", site: "enseignes nationales" }
    ],
    alerte: "<b>Auto-école Les Alizés, 205 avenue Franklin Roosevelt : n'y va pas, elle a fermé du jour au lendemain</b> en laissant ses élèves sans solution. Garde quand même l'information en tête — les auto-écoles du secteur récupèrent ces élèves en ce moment, et ces élèves-là cherchent sur Google.",
    kit: [
      "<b>Che Delizia et Maison Gutton sont les deux dossiers du jour</b> — vois-les entre 9h et 10h, quand ils ont encore le temps de parler",
      "Ouvre l'Instagram de Maison Gutton avant d'entrer : ses photos de viande sont bonnes, dis-le lui, c'est vrai et ça ouvre la conversation",
      "Ouvre <code>aupaindebron-boulangerie.eatbu.com</code> — troisième page eatbu de la semaine, tu la reconnais au premier coup d'œil maintenant",
      "Portfolio en favoris, cartes de visite, batterie externe",
      "<b>La règle du samedi : regarde la vitrine avant d'entrer.</b> Trois clients qui attendent = tu passes ton chemin et tu reviens mardi"
    ],
    reserves: [
      "<b>Le samedi n'est pas le meilleur jour pour démarcher, et c'est assumé.</b> Il l'est pour les commerces de bouche tôt le matin et pour les restaurants à 16h ; il ne l'est pas pour les coiffeurs et les instituts. Les stops de l'après-midi sont donc à faire à l'instinct — <b>mieux vaut trois bonnes conversations que sept portes forcées.</b>",
      "<b>Bron n'est pas Montchat.</b> Le pouvoir d'achat y est plus bas et les commerçants plus méfiants vis-à-vis du démarchage. Annonce ton prix tôt dans la conversation plutôt qu'à la fin : ici, le flou fait fuir."
    ]
  },

  /* ================= TOURNÉES ARCHIVÉES =================
     Elles restent consultables dans l'onglet « Passées ».
     ------------------------------------------------------ */
  {
    id: "montchat-2026-07-30",
    date: "2026-07-30",
    statut: "archivee",
    zone: "Lyon 3e — Montchat",
    titre: "Cours Richard-Vitton · Place Ronde · Cours du Docteur Long",
    resume: "Vingt commerces classés par créneau horaire, pas par géographie : les restos ne se démarchent pas à midi. La ligne de gauche change de couleur quand tu changes de rue.",
    chiffres: [
      { n: "18", l: "sans site propre" },
      { n: "4", l: "priorités absolues" },
      { n: "1,2", l: "km à pied, ≈4 h" }
    ],
    rues: [
      { code: "crv", nom: "Cours Richard-Vitton" },
      { code: "cdl", nom: "Cours du Docteur Long" },
      { code: "autre", nom: "Route de Genas" }
    ],
    blocs: [
      {
        heure: "9h30 – 11h30",
        quoi: "Commerces de bouche, dans le calme d'après-embauche",
        stops: [
          {
            id: "s1", n: 1, rue: "crv", numero: "52",
            nom: "Boulangerie Jacquier",
            meta: "Boulangerie-pâtisserie · Cours Richard-Vitton · 541 avis Google",
            pourquoi: "Aucun site officiel — <b>mais un inconnu a monté <code>boulangeriepatisseriejacquier.shop</code> à leur nom.</b> Montre-lui la capture : il ne contrôle pas sa propre page.",
            chips: [{ t: "Priorité", flag: true }, { t: "Faux site actif" }],
            tel: "+33478532052", telAffiche: "04 78 53 20 52",
            google: "Boulangerie Jacquier 52 cours Richard Vitton Lyon"
          },
          {
            id: "s2", n: 2, rue: "cdl", numero: "73",
            nom: "Boulangerie du 73",
            meta: "Boulangerie-pâtisserie · Cours du Docteur Long",
            pourquoi: "Trois raisons sociales enregistrées au même numéro (du Centre, Raoul, Othmani). <b>Lis l'enseigne sur la vitrine avant d'entrer</b> et appelle-le par le bon nom.",
            chips: [{ t: "Aucun site" }, { t: "Enseigne à confirmer" }],
            tel: "+33472346971", telAffiche: "04 72 34 69 71",
            google: "boulangerie 73 cours Docteur Long Lyon"
          },
          {
            id: "s3", n: 3, rue: "cdl", numero: "87",
            nom: "Pâtisserie Villedieu",
            meta: "Pâtisserie, chocolaterie, sandwicherie · Cours du Docteur Long",
            pourquoi: "Son site est sur <code>puzl.com</code>, une plateforme gratuite abandonnée, et son contact est une adresse Gmail. <b>Les deux arguments réunis chez le même client.</b>",
            chips: [{ t: "Priorité", flag: true }, { t: "Site mort" }, { t: "Mail Gmail" }],
            tel: "+33478549506", telAffiche: "04 78 54 95 06",
            google: "Pâtisserie Villedieu 87 cours Docteur Long Lyon"
          },
          {
            id: "s4", n: 4, rue: "cdl", numero: "72",
            nom: "Épicerie sur Cours",
            meta: "Épicerie fine et salon de thé · Cours du Docteur Long",
            pourquoi: "Fauchon, Michel Cluizel, caviar Kaspia, fromages Janier, référencée <b>Gault&amp;Millau</b> — et rien qu'une page Facebook. Les coffrets gourmands se vendent en ligne, pas au comptoir.",
            chips: [{ t: "Priorité 2", flag: true }, { t: "Facebook seul" }, { t: "Potentiel e-commerce" }],
            tel: "+33478547489", telAffiche: "04 78 54 74 89",
            google: "Epicerie sur Cours 72 cours Docteur Long Lyon"
          },
          {
            id: "s5", n: 5, rue: "autre", numero: "84",
            nom: "Le Pavé de Pain",
            meta: "Boulangerie-pâtisserie · Route de Genas · ouvert 6h–20h",
            pourquoi: "Fait déjà <b>livraison à domicile et pièces montées de cérémonie</b> : deux prestations qui se commandent en ligne et qu'aucun passant ne peut deviner.",
            chips: [{ t: "Aucun site" }, { t: "Commandes cérémonie" }],
            tel: "+33478542964", telAffiche: "04 78 54 29 64",
            google: "Le Pavé de Pain 84 route de Genas Lyon"
          }
        ]
      },
      {
        heure: "11h30 – 12h15",
        quoi: "Les deux tabacs — toujours ouverts, jamais en service",
        stops: [
          {
            id: "s6", n: 6, rue: "crv", numero: "2 ter",
            nom: "Sigarellum",
            meta: "Tabac, presse, FDJ, PMU Express · Cours Richard-Vitton · 6h–22h",
            pourquoi: "Le domaine <code>sigarellum.fr</code> existe (leur mail) mais <b>aucun site derrière</b>. Vends les horaires et les services — jamais les produits : la pub tabac est interdite.",
            chips: [{ t: "Domaine sans site" }, { t: "⚠ Pas de pub tabac" }],
            tel: "+33472361509", telAffiche: "04 72 36 15 09",
            google: "Sigarellum cours Richard Vitton Lyon"
          },
          {
            id: "s7", n: 7, rue: "crv", numero: "49",
            nom: "La Tabactière de Montchat",
            meta: "Tabac-bistro de la Place Ronde · ouvert 7j/7 non-stop",
            pourquoi: "Mondial Relay, FDJ, timbres, recharges TCL, photocopies, terrasse chauffée. <b>Six services = six requêtes Google</b>, et il n'apparaît sur aucune. Page Facebook uniquement.",
            chips: [{ t: "Facebook seul" }, { t: "Relais colis" }, { t: "Ouvert dimanche" }],
            google: "La Tabactière de Montchat place Ronde Lyon"
          }
        ]
      },
      {
        heure: "12h – 14h15",
        quoi: "PAUSE",
        pause: "N'entre dans aucun restaurant pendant le service : tu te fais éjecter et tu brûles le contact.",
        stops: []
      },
      {
        heure: "14h15 – 16h",
        quoi: "Boutiques et instituts, entre deux clientes",
        stops: [
          {
            id: "s8", n: 8, rue: "cdl", numero: "43",
            nom: "Chantal Carray",
            meta: "Prêt-à-porter femme · Cours du Docteur Long",
            pourquoi: "Gérante : Chantal Dubost. <b>Ses horaires sont introuvables ailleurs que sur un annuaire tiers</b>, et ils sont faux la moitié du temps.",
            chips: [{ t: "Aucun site" }],
            google: "Chantal Carray 43 cours Docteur Long Lyon"
          },
          {
            id: "s9", n: 9, rue: "cdl", numero: "99",
            nom: "Astrapi",
            meta: "Chaussures enfants · Cours du Docteur Long",
            pourquoi: "Sa dernière publication Facebook date de <b>2020</b>. Les parents cherchent « chaussures enfant Lyon 3 » en ligne, et ses braderies ne s'annoncent que sur la vitrine.",
            chips: [{ t: "Aucun site" }, { t: "Réseaux morts" }],
            tel: "+33472338869", telAffiche: "04 72 33 88 69",
            google: "Astrapi chaussures 99 cours Docteur Long Lyon"
          },
          {
            id: "s10", n: 10, rue: "crv", numero: "53",
            nom: "Séduction Madame",
            meta: "Institut, lingerie, parfum, accessoires · Cours Richard-Vitton",
            pourquoi: "<b>37 ans dans la rue et pas une ligne en ligne.</b> Trois activités sous une enseigne : personne dans le quartier ne sait qu'elle vend de la lingerie.",
            chips: [{ t: "Aucun site" }, { t: "37 ans d'ancienneté" }],
            tel: "+33478548544", telAffiche: "04 78 54 85 44",
            google: "Séduction Madame 53 cours Richard Vitton Lyon"
          },
          {
            id: "s11", n: 11, rue: "crv", numero: "46",
            nom: "Balade en Beauté",
            meta: "Institut de beauté · Cours Richard-Vitton",
            pourquoi: "Présente sur Planity <i>et</i> Fresha : <b>elle paie une commission sur chaque réservation</b> et n'a aucune vitrine à elle. C'est l'angle : son propre module de résa.",
            chips: [{ t: "Aucun site" }, { t: "Paie Planity + Fresha" }],
            tel: "+33472333955", telAffiche: "04 72 33 39 55",
            google: "Balade en Beauté 46 cours Richard Vitton Lyon"
          },
          {
            id: "s12", n: 12, rue: "crv", numero: "32 bis",
            nom: "Évasion Beauté",
            meta: "Institut de beauté · Cours Richard-Vitton",
            pourquoi: "A un site, <code>evasionbeaute69003.com</code> — daté, et le nom de domaine contient un code postal. <b>Angle refonte</b>, pas création. Elle est aussi sur Planity et Balinea.",
            chips: [{ t: "Site à refaire", web: true }, { t: "Domaine faible" }],
            tel: "+33472368548", telAffiche: "04 72 36 85 48",
            lien: { url: "https://www.evasionbeaute69003.com/", t: "Voir son site" }
          },
          {
            id: "s13", n: 13, rue: "crv", numero: "50",
            nom: "Salon du 50",
            meta: "Coiffure · Cours Richard-Vitton",
            pourquoi: "Les annuaires donnent trois noms pour ce salon : « L'Ère du Temps », « Kristie », « SAS Benucci ». <b>Lis l'enseigne, puis entre.</b> Visible sur Fresha, nulle part ailleurs.",
            chips: [{ t: "Aucun site" }, { t: "Enseigne à confirmer" }],
            google: "coiffeur 50 cours Richard Vitton Lyon"
          },
          {
            id: "s14", n: 14, rue: "crv", numero: "28",
            nom: "Black Baccara — La Paillotte",
            meta: "Fleuriste, mariages et deuils · Cours Richard-Vitton (et 86 Dr Long)",
            pourquoi: "Mariage, naissance, obsèques : <b>on ne choisit pas son fleuriste en passant devant, on regarde ses photos</b>. Une galerie est son meilleur vendeur. Membre des Boutiques du cœur de Montchat.",
            chips: [{ t: "Aucun site" }, { t: "Galerie photo à vendre" }],
            tel: "+33478542013", telAffiche: "04 78 54 20 13",
            google: "Black Baccara La Paillotte fleuriste Lyon Montchat"
          },
          {
            id: "s15", n: 15, rue: "crv", numero: "42",
            nom: "Optique Montchat",
            meta: "Opticien Atol, 100 m² · Cours Richard-Vitton",
            pourquoi: "Il teste les <b>verres Lexilens pour la dyslexie</b> — un argument que des parents de tout Lyon chercheraient, et il n'a qu'une page sur le site de l'enseigne.",
            chips: [{ t: "Pas de site propre" }, { t: "Page enseigne Atol" }],
            google: "Optique Montchat 42 cours Richard Vitton Lyon"
          }
        ]
      },
      {
        heure: "16h – 17h30",
        quoi: "Restaurants, dans le creux entre les deux services",
        stops: [
          {
            id: "s16", n: 16, rue: "crv", numero: "42",
            nom: "Estrellas",
            meta: "Restaurant traditionnel · Cours Richard-Vitton",
            pourquoi: "Rien en ligne. <b>Le besoin n°1 d'un resto de quartier c'est le menu du jour à jour</b>, modifiable depuis le téléphone en trente secondes.",
            chips: [{ t: "Aucun site" }],
            google: "Estrellas restaurant 42 cours Richard Vitton Lyon"
          },
          {
            id: "s17", n: 17, rue: "crv", numero: "51",
            nom: "Le Rond Coin",
            meta: "Restaurant traditionnel · Cours Richard-Vitton, à la Place Ronde",
            pourquoi: "Même angle qu'Estrellas, et <b>il est juste à côté</b> : enchaîne les deux. Emplacement de tout premier ordre, invisible sur Google.",
            chips: [{ t: "Aucun site" }],
            google: "Le Rond Coin 51 cours Richard Vitton Lyon"
          },
          {
            id: "s18", n: 18, rue: "crv", numero: "2 ter",
            nom: "L'Atelier Espagnol",
            meta: "Épicerie-comptoir espagnol · Cours Richard-Vitton · ouvert jusqu'à 23h30",
            pourquoi: "<b>4,7 sur 5, 335 avis, cité par la Tribune de Lyon — et zéro site.</b> Pablo et Noemi vendent jambon ibérique, paella et charcuterie : le meilleur candidat de la rue pour de la vente en ligne. Garde-le pour la fin, tu auras le temps de parler.",
            chips: [{ t: "Priorité 1", flag: true }, { t: "4,7★ / 335 avis" }, { t: "Potentiel e-commerce" }],
            tel: "+33986291691", telAffiche: "09 86 29 16 91",
            google: "L'Atelier Espagnol cours Richard Vitton Lyon"
          }
        ]
      },
      {
        heure: "Si créneau",
        quoi: "Bouche-trous entre deux rendez-vous manqués",
        stops: [
          {
            id: "s19", n: 19, rue: "cdl", numero: "—",
            nom: "Cordonnerie Guevorguian",
            meta: "Cordonnier · Cours du Docteur Long",
            pourquoi: "Petit ticket, mais « cordonnier Montchat » est une des recherches les plus locales qui existent. Une page suffit.",
            chips: [{ t: "Aucun site" }],
            google: "cordonnier cours Docteur Long Lyon Montchat"
          },
          {
            id: "s20", n: 20, rue: "cdl", numero: "—",
            nom: "Auto-école du Cours",
            meta: "Auto-école · Cours du Docteur Long",
            pourquoi: "Secteur où <b>le site et les avis Google font toute la décision</b> : on ne choisit jamais son auto-école sans comparer en ligne. Budget publicitaire déjà existant, souvent.",
            chips: [{ t: "Aucun site" }, { t: "Bon budget" }],
            google: "auto école du cours Docteur Long Lyon"
          }
        ]
      }
    ],
    equipes: [
      { nom: "La Gamelle", site: "tagamelle.fr" },
      { nom: "CLC Studio", site: "clcstudio.fr" },
      { nom: "Salvatrice Institut", site: "salvatrice-institut.fr" },
      { nom: "Alfa Coiffure", site: "alfacoiffure.fr" },
      { nom: "L'Équipementier", site: "lequipementier.fr" },
      { nom: "Maison Morand traiteur", site: "morand-traiteur.fr" },
      { nom: "Boucherie Vessière", site: "maisonvessiere.com — groupe" },
      { nom: "La Librairie du Cours", site: "lalibrairieducours.fr" },
      { nom: "Les Flâneuses", site: "les-flaneuses.fr" }
    ],
    alerte: "<b>Deux fermés</b> — et ils sont au même numéro, le 15 cours Richard-Vitton : <b>L'Étincelle</b> et <b>Léa</b>. N'y va pas.",
    kit: [
      "Blade Society, Le Namal, La Parfumerie de Carlito et My Candy's en favoris sur le téléphone — <b>la démo réelle vaut tous les discours</b>",
      "Capture d'écran du faux site <code>boulangeriepatisseriejacquier.shop</code>",
      "Capture d'écran du site mort de Villedieu sur <code>puzl.com</code>",
      "Cartes de visite et batterie externe",
      "Le réflexe : <b>cherche son nom sur Google devant lui</b>. Ne rien trouver, c'est ton ouverture — gratuite et incontestable"
    ],
    reserves: [
      "<b>Les annuaires retardent.</b> Compte deux ou trois enseignes changées ou fermées sur les vingt : vérifie la vitrine avant d'entrer, et corrige la fiche dans les notes.",
      "<b>Fin juillet.</b> Certains seront déjà en congés d'août. Ce n'est pas un obstacle, c'est l'argument : « votre boutique ferme trois semaines, votre site non — il annonce vos dates de réouverture. »"
    ]
  },

  {
    id: "route-genas-bron-2026-07",
    date: "2026-07-01",
    statut: "archivee",
    zone: "Lyon 3e / Bron",
    titre: "Route de Genas, portion en direction de Bron",
    resume: "Tournée faite avant la mise en place de ce carnet : les commerces n'ont pas été saisis un par un. Gardée ici pour ne pas repasser au même endroit.",
    chiffres: [{ n: "—", l: "détail non saisi" }],
    rues: [{ code: "autre", nom: "Route de Genas" }],
    blocs: [],
    equipes: [],
    kit: [],
    reserves: []
  }

];
