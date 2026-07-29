/* ------------------------------------------------------------------
   CARNET DE TOURNÉE — données
   ------------------------------------------------------------------
   Pour ajouter une tournée : copie un bloc { ... } complet et
   change les valeurs. Mets "statut" à "actuelle" sur la nouvelle et
   "archivee" sur l'ancienne. Rien d'autre à toucher.

   rue :  "crv" (bleu) | "cdl" (olive) | "autre" (ocre)
   ------------------------------------------------------------------ */

window.TOURNEES = [

  /* ================= TOURNÉE ACTUELLE ================= */
  {
    id: "montchat-2026-07-30",
    date: "2026-07-30",
    statut: "actuelle",
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

  /* ================= TOURNÉES ARCHIVÉES ================= */
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
