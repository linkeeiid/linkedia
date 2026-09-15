/* ------------------------------------------------------------------
   CARNET DE TOURNÉE — liste d'appels (prospection téléphonique)
   Page : linkeedia.fr/appels-3c9e51/  (réutilise app.js du carnet)
   ------------------------------------------------------------------
   100 entreprises de la métropole de Lyon SANS site internet,
   vérifiées une par une le 15/09/2026 (recherche nominative) :
   seulement des annuaires, des réseaux sociaux ou une plateforme
   de réservation. Les pages eatbu/wixsite, les réseaux (AD, Motrio…),
   les commerces fermés ou repris ont été écartés.

   Les résultats sont stockés sous l'id "c<numéro>" de chaque
   entreprise : ne renumérote pas, ajoute ou retire des lignes.

   rue (= couleur du métier) :
   "crv" artisans · "prune" beauté · "ardoise" boutiques
   "cdl" bouche · "autre" restauration
   ------------------------------------------------------------------ */

(function () {
  "use strict";

  /* S(id, commune, nom, activité, adresse, téléphone, statut web, accroche, [puces], [lien, libellé]) */
  function S(id, ville, nom, activite, adresse, tel, web, pourquoi, puces, lien, lienT) {
    var chips = [{ t: web }];
    (puces || []).forEach(function (p) {
      chips.push(p.charAt(0) === "!" ? { t: p.slice(1), flag: true } : { t: p });
    });
    var s = {
      id: id, rue: "", numero: ville, nom: nom,
      meta: activite + (adresse ? " · " + adresse : ""),
      adresse: adresse, pourquoi: pourquoi, chips: chips,
      telAffiche: tel, tel: "+33" + tel.replace(/\D/g, "").slice(1),
      google: nom + " " + ville
    };
    if (lien) { s.lien = { url: lien, t: lienT || "Voir sa page" }; }
    return s;
  }

  var ARTISANS = [
    /* garages */
    S("c256", "Saint-Priest", "Centre Auto Express", "Garage, vente et montage de pneus", "10 rue Aristide Briand, 69800 Saint-Priest", "04 78 21 80 22", "Aucun site",
      "Garage et pneus, <b>que des annuaires</b> (PagesJaunes, Vroomly). « Montage pneus Saint-Priest » est une recherche qui se fait au moment où la voiture est immobilisée : celui qui sort en premier prend le client.", ["Fermé le week-end"]),
    S("c37", "Lyon 6", "Garage Molière", "Garage, entretien et réparation", "6 rue Molière, 69006 Lyon", "04 78 52 08 19", "Aucun site",
      "Garage <b>installé depuis 2000</b> en plein 6e. Aucun site : pas de liste de prestations, pas de demande de devis en ligne, alors que les voisins du quartier cherchent un garage de proximité sur leur téléphone.", ["SARL depuis 2000"]),
    S("c49", "Villeurbanne", "Garage de l'Avenue", "Garage, mécanique et carrosserie", "17 rue Léon Blum, 69100 Villeurbanne", "04 78 53 20 80", "Aucun site",
      "Mécanique <b>et</b> carrosserie, deux métiers qui se cherchent séparément sur Google. Aucun site, juste des annuaires. Demande <b>Nourdine Beyragued</b>.", ["Gérant : N. Beyragued"]),
    S("c245", "Villeurbanne", "Galaxy Auto", "Garage toutes marques, carrosserie, pièces d'occasion", "271 route de Genas, 69100 Villeurbanne", "04 72 75 23 51", "Aucun site",
      "Il fait tout : réparation, carrosserie, peinture, pneus, <b>pièces d'occasion et vente de véhicules</b>. Cinq activités et zéro vitrine. Gérant <b>Yassine Douss</b>, SARL depuis 2013. Si le fixe ne répond pas, OpenStreetMap donne un portable : 06 08 91 99 38.", ["5 activités", "Gérant : Y. Douss"]),
    S("c254", "Villeurbanne", "Depann' Auto Service", "Garage, entretien, contrôle pollution", "87 route de Genas, 69100 Villeurbanne", "04 78 53 10 37", "Aucun site",
      "Garage <b>depuis 2004</b> sur la route de Genas, où les garages se touchent. Rien en ligne à part les annuaires. L'angle : « quand quelqu'un tape <i>garage route de Genas</i>, lequel sort ? ».", ["Depuis 2004"]),
    S("c273", "Lyon 8", "Garage Saint Gilbert", "Garage, mécanique, carrosserie, occasions", "19 rue Léo et Maurice Trouilhet, 69008 Lyon", "04 78 01 38 58", "Aucun site",
      "Mécanique, carrosserie, <b>véhicules d'occasion contrôlés et véhicule de prêt</b>. Les occasions, ça se montre en photos, et il n'a que des annuaires.", ["Vend des occasions"]),
    S("c278", "Vénissieux", "Centre Auto Viviani", "Garage, entretien et réparation", "20 avenue Viviani, 69200 Vénissieux", "04 78 74 94 67", "Aucun site",
      "<b>6 à 9 salariés</b>, trois mécaniciens : c'est une vraie entreprise, et elle n'a qu'une fiche PagesJaunes. C'est un des plus gros dossiers de la liste.", ["!6 à 9 salariés"]),
    S("c281", "Vénissieux", "ABS Pneus", "Montage et vente de pneus, sans rendez-vous", "15 avenue de la République, 69200 Vénissieux", "07 69 42 37 25", "Aucun site",
      "Pneus <b>sans rendez-vous</b>, montage à 10 € : un argument qui doit se voir en ligne. Il n'est présent que sur les centrales de montage (Allopneus, 1001pneus), qui gardent le client. L'ancien fixe est le 04 72 89 47 14.", ["Sur Allopneus"]),
    S("c287", "Neuville-sur-Saône", "Neuville Pneus", "Pneus neufs et d'occasion, entretien rapide", "41 avenue Carnot, 69250 Neuville-sur-Saône", "04 78 91 61 31", "Aucun site",
      "Seul spécialiste pneus du centre de Neuville, <b>depuis 2008</b>, et aucun site. Vidange, freins, climatisation : de l'entretien rapide qui se réserve en ligne ailleurs.", ["Depuis 2008"]),
    S("c295", "Lyon 8", "Garage 2 JM", "Garage, entretien, décalaminage hydrogène", "4 bis rue Président Kruger, 69008 Lyon", "04 78 74 70 69", "Aucun site",
      "Il fait du <b>décalaminage à l'hydrogène</b>, une prestation que les gens cherchent par son nom. Rien en ligne pour l'expliquer. Gérant <b>Jean-Marcel Armagnac</b>. Le garage ferme le vendredi à 12h30.", ["Gérant : J.-M. Armagnac"]),

    /* bâtiment */
    S("c275", "Saint-Priest", "Amgaz", "Chauffagiste, chaudières, pompes à chaleur, climatisation", "290 rue Ferdinand Perrier, 69800 Saint-Priest", "04 37 25 08 83", "Aucun site",
      "<b>Le plus gros ticket de la liste</b> : créé en 2001, 3 agences, une trentaine de techniciens, agréé Viessmann, Frisquet, Saunier Duval. Pas de site, alors que « dépannage chaudière » est une recherche d'urgence. Demande le dirigeant, pas le standard.", ["!Priorité", "≈ 30 techniciens"]),
    S("c255", "Quincieux", "MF Toiture", "Couverture, toiture, zinguerie", "203 chemin En Graves, 69650 Quincieux", "06 46 78 01 82", "Instagram seul",
      "Couvreur <b>créé en janvier 2023</b>, jeune entreprise qui cherche des chantiers. Il n'a qu'un Instagram. Un couvreur se choisit sur photos de chantiers et sur la confiance : un site avec ses réalisations et un formulaire de devis. Dirigeants : <b>Yann Mignery</b> et <b>Romain Feaud</b>.", ["Créé en 2023"], "https://www.instagram.com/mf.toiture/", "Son Instagram"),
    S("c292", "Lyon 7", "La Menuiserie de la Guill'", "Menuiserie sur mesure, cuisines, parquets", "29 rue Sébastien Gryphe, 69007 Lyon", "06 27 43 47 06", "Facebook seul",
      "Meubles sur mesure, cuisines, salles de bains, parquets, restauration de meubles : que du travail qui se vend sur <b>photos avant/après</b>, et tout est sur Facebook. Noté 5/5.", ["5/5"], "https://www.facebook.com/lamenuiseriedelaGuill/", "Son Facebook"),

    /* ateliers */
    S("c61", "Lyon 3", "Ébénisterie Demillière-Vergnais", "Ébéniste, restauration de meubles anciens", "103 rue Pierre Corneille, 69003 Lyon", "04 78 60 06 25", "Instagram seul",
      "<b>Laurent Demillière-Vergnais</b>, 16 ans de restauration de meubles anciens. Son travail n'est visible que sur Instagram. Un client qui hérite d'une commode cherche « restauration meuble ancien Lyon » : il faut une galerie avant/après.", ["16 ans de métier"], "https://www.instagram.com/ebenisterie_demilliere/", "Son Instagram"),
    S("c30", "Lyon 5", "Au Tapissier d'Antan", "Tapissier-décorateur, restauration de mobilier ancien", "20 rue Lainerie, 69005 Lyon", "04 78 28 29 38", "Aucun site",
      "Entreprise familiale en plein Vieux Lyon, restauration de sièges et décoration sur mesure. <b>Aucune photo de ses réalisations en ligne</b>. Son concurrent de Fontaines-sur-Saône a un site, lui non.", ["Vieux Lyon"]),
    S("c284", "Lyon 2", "Amiens Asta-Richard", "Atelier de restauration de meubles anciens, marqueterie", "25 rue Vaubecour, 69002 Lyon", "04 78 92 95 71", "Aucun site",
      "Atelier <b>depuis 1985</b> à Ainay, marqueterie et mobilier du XVIe au XXe siècle. Patrick Asta-Richard a reçu un <b>titre d'artisan d'excellence en 2011</b> (vérifie l'intitulé exact avant de le citer). Prestige maximal, aucune vitrine en ligne : son savoir-faire mérite mieux qu'une fiche d'annuaire.", ["!Artisan d'excellence", "Depuis 1985"]),
    S("c262", "Villeurbanne", "Cordonnerie République", "Cordonnerie, chaussures, maroquinerie", "112 cours Émile Zola, 69100 Villeurbanne", "04 72 65 09 84", "Aucun site",
      "Membre du label <b>Répar'acteurs</b> : il répare au lieu de jeter, un argument qui plaît et qui ne se voit nulle part. Aucun site.", ["Répar'acteurs"]),
    S("c220", "Mions", "Cordonnerie de Mions", "Cordonnerie, clés, badges, tampons, gravure", "105 rue du 23 Août 1944, 69780 Mions", "04 78 21 85 67", "Facebook seul",
      "Cordonnier <b>depuis 1987</b>, formé bottier, qui fait aussi clés, badges, tampons et gravure, avec une adresse Gmail. ⚠️ Une annonce de <b>vente du fonds</b> a été repérée : demande-lui gentiment s'il reste. S'il vend, un site valorise le fonds.", ["Depuis 1987", "Fonds peut-être à vendre"], "https://www.facebook.com/cordonneriedemions/", "Son Facebook"),
    S("c277", "Lyon 2", "Les Services de Max", "Cordonnerie, maroquinerie, clés", "19 rue Gentil, 69002 Lyon", "06 37 72 57 19", "Aucun site",
      "Cordonnerie ouverte fin 2021 dans la Presqu'île, <b>4,2/5 sur plus de 30 avis</b>, avec aussi maroquinerie et serrurerie d'urgence. « Serrurier urgence Lyon 2 » est une recherche qui rapporte gros.", ["Ouverte fin 2021"]),
    S("c301", "Lyon 1", "Cordonnerie Alain", "Cordonnerie, réparation chaussures et cuir", "28 rue de l'Arbre Sec, 69001 Lyon", "04 78 28 37 21", "Aucun site",
      "Cordonnier des Terreaux, <b>Répar'acteurs</b>, que ses clients décrivent comme ponctuel et précis. Aucun site, et des horaires en demi-journées que personne ne trouve.", ["Répar'acteurs"]),
    S("c271", "Lyon 3", "Couture Express", "Couture, retouches, sur mesure", "122 cours Lafayette, 69003 Lyon", "06 41 27 14 53", "Aucun site",
      "Retouches et sur mesure sur le cours Lafayette, un axe très passant. Rien en ligne à part les annuaires. Petit ticket, appel rapide : une page simple avec les tarifs d'ourlets.", []),
    S("c212", "Neuville-sur-Saône", "Delphine Couture & Créations", "Couturière, retouches, créations sur mesure", "1 quai Armand Barbès, 69250 Neuville-sur-Saône", "09 86 21 57 62", "Aucun site",
      "<b>Delphine</b> reçoit sur rendez-vous et crée sur mesure. Elle n'a qu'une fiche sur le site des commerçants de Neuville. Les créations sur mesure se montrent en photos.", ["Sur rendez-vous"], "https://www.neuville.shopping/delphine-couture-et-creations-couture-et-confection-neuville-sur-saone", "Sa fiche Neuville"),
    S("c289", "Lyon 2", "Viva Retouches", "Couture, retouches femme, homme, enfant", "28 rue Sala, 69002 Lyon", "04 72 41 09 18", "Aucun site",
      "Retoucherie d'Ainay, rien en ligne. Quartier aisé où l'on retouche des vêtements chers : ses clientes veulent savoir <b>ce qu'elle sait faire</b> avant de confier une pièce.", []),
    S("c294", "Lyon 7", "Lilia Retouches", "Couture, retouches", "32 avenue Jean Jaurès, 69007 Lyon", "04 78 72 56 75", "Aucun site",
      "Label <b>Répar'acteurs</b>, ouverte tard le samedi. Elle n'accepte que les espèces et n'a rien en ligne : petit budget, propose l'offre la plus simple.", ["Répar'acteurs"])
  ];

  var BEAUTE = [
    S("c2", "Lyon 7", "Cyrill Coiffure", "Coiffure femme et enfant", "3 rue Challemel Lacour, 69007 Lyon", "04 72 73 01 53", "Planity + Fresha",
      "Salon <b>depuis 1995</b>, 3 à 5 salariés, qui paie <b>deux plateformes</b> (Planity et Fresha) sans avoir de vitrine. L'angle : son propre module de réservation, sans commission.", ["Depuis 1995"], "https://www.planity.com/cyrill-coiffure-69007-lyon", "Sa page Planity"),
    S("c20", "Oullins", "Christine Dessauge", "Coiffure, coloration végétale", "58 rue Louis Pasteur, 69600 Oullins", "06 67 30 41 67", "Planity seul",
      "Spécialiste de la <b>coloration végétale</b>, une niche que les clientes cherchent précisément. Planity ne raconte pas sa démarche, un site si. Appelle-la par son nom, c'est le nom du salon.", ["Niche : végétal"], "https://www.planity.com/salon-de-coiffure-christine-dessauge-69600-oullins-pierre-benite", "Sa page Planity"),
    S("c213", "Genas", "Chris Ayva Coiffure", "Salon de coiffure", "26 rue Jean Jaurès, 69740 Genas", "04 78 90 81 52", "Fresha seul",
      "Classé <b>2e sur 12 salons à Genas</b>, et toutes ses réservations passent par Fresha. Un bon salon qui n'a pas son nom sur Google au-delà de la plateforme.", ["2e à Genas"], "https://www.fresha.com/lvp/chris-ayva-coiffure-rue-jean-jaures-genas-oox4K8", "Sa page Fresha"),
    S("c32", "Lyon 8", "La Parenthèse Coiffure", "Coiffure mixte, cheveux texturés", "332 avenue Berthelot, 69008 Lyon", "04 78 00 86 03", "Planity + Fresha",
      "Tenue <b>depuis 20 ans</b> par la gérante, spécialiste des <b>cheveux texturés</b> : une clientèle qui cherche un salon compétent et fait des kilomètres pour ça. Il lui faut une page qui le dise.", ["!Niche : cheveux texturés", "20 ans"], "https://www.planity.com/la-parenthese-coiffure-69008-lyon", "Sa page Planity"),
    S("c44", "Décines-Charpieu", "Vogue Fashion Barber", "Coiffure, barbier, extensions", "317 avenue Jean Jaurès, 69150 Décines-Charpieu", "04 72 02 24 92", "Planity + Fresha",
      "Barbier ouvert il y a 3 ans, <b>80 avis</b>, sur Planity et Fresha. Il fait aussi extensions et perruques, une offre qui mérite sa propre page.", ["80 avis"]),
    S("c67", "Lyon 2", "Les Incorruptibles", "Barbier, coiffure homme", "1 rue Montcharmont, 69002 Lyon", "04 78 42 76 18", "Planity seul",
      "Barbier de la Presqu'île, équipe de trois (Michel, Boris, Olivier). Le nom est une marque en soi et il ne possède même pas son nom de domaine.", ["Nom qui claque"], "https://www.planity.com/les-incorruptibles-69002-lyon", "Sa page Planity"),
    S("c77", "Lyon 2", "Ylann le Barber", "Barbier, coiffure homme", "36 quai du Docteur Gailleton, 69002 Lyon", "04 78 84 31 95", "Planity + Fresha",
      "Barbier sur les quais, <b>deux plateformes payantes</b>, pas de site. Montre-lui un barbier de ton portfolio (Blade Society) : c'est exactement son métier.", ["Montre Blade Society"], "https://www.planity.com/ylann-le-barber-69002-lyon", "Sa page Planity"),
    S("c82", "Lyon 6", "Jérôme Kohen", "Coiffure mixte, expert Kérastase", "91 boulevard des Belges, 69006 Lyon", "04 72 83 54 42", "Planity seul",
      "Salon <b>labellisé expert Kérastase</b>, 4,8/5, boulevard des Belges : une clientèle haut de gamme qui attend un site à la hauteur. Demande <b>Jérôme</b> ou <b>Laurence</b>.", ["Expert Kérastase"], "https://www.planity.com/jerome-kohen-69006-lyon", "Sa page Planity"),
    S("c102", "Villeurbanne", "Del'B Salon de Coiffure", "Coiffure mixte, couleur, extensions, lissage", "26 cours Tolstoï, 69100 Villeurbanne", "04 78 68 99 12", "Fresha + Instagram",
      "Équipe de coiffeurs, coloristes et maquilleuses, Wella et Revlon, et tout passe par <b>Fresha et un module Kalendes</b>. Beaucoup de prestations, aucune page pour les présenter.", ["Équipe complète"], "https://www.fresha.com/lvp/delb-salon-de-coiffure-cours-tolstoi-villeurbanne-l16WMe", "Sa page Fresha"),
    S("c233", "Chassieu", "Élégance Coiffure pour hommes", "Coiffure homme et enfant", "45 rue de la République, 69680 Chassieu", "06 29 46 87 00", "Planity + Fresha",
      "Ouvert <b>7 jours sur 7</b>, 56 avis, sur Planity et Fresha. Il a même une chaîne YouTube, mais pas de site. « Coiffeur ouvert dimanche Chassieu » : il devrait sortir premier.", ["Ouvert 7j/7"], "https://www.planity.com/elegance-coiffure-69680-chassieu", "Sa page Planity"),
    S("c240", "Bron", "La Suite", "Coiffure femme et homme, partenaire L'Oréal", "1 rue Roger Salengro, 69500 Bron", "04 78 26 82 35", "Planity + Facebook",
      "Partenaire <b>L'Oréal Professionnel</b>, 4,5/5 sur 46 avis. Il n'a qu'une page L'Oréal, Planity et Facebook. Hors des rues faites le 5 septembre à Bron.", ["L'Oréal Pro"], "https://www.planity.com/la-suite-69500-bron", "Sa page Planity"),
    S("c243", "Saint-Priest", "Giulia Hall Coiffure", "Coiffure, couleur, soins", "13 Grande Rue, 69800 Saint-Priest", "06 50 44 22 22", "Planity + Fresha",
      "4,7/5, sur <b>Planity et Fresha</b>, et l'adresse de sa page Planity porte encore l'ancien nom « So Cute ». Un changement d'enseigne que le web n'a pas suivi : c'est ton accroche.", ["Ancien nom encore en ligne"], "https://www.fresha.com/fr/lvp/giulia-hall-coiffure-grande-rue-saint-priest-alqgoY", "Sa page Fresha"),
    S("c246", "Saint-Genis-Laval", "Tant qu'il y aura des hommes", "Coiffeur homme, barbier", "55 avenue Georges Clemenceau, 69230 Saint-Genis-Laval", "04 78 56 16 76", "Planity + Fresha",
      "Nouveau nom de l'ancien « Gérald Coiffure Hommes ». Un changement d'enseigne, c'est le moment idéal pour un site : sans lui, les anciens clients cherchent l'ancien nom. Demande <b>Céline</b>.", ["!Changement d'enseigne"], "https://www.planity.com/tant-quil-y-aura-des-hommes-by-celine-69230-saint-genis-laval", "Sa page Planity"),
    S("c2001", "Lyon 6", "Artisan Barbier du 6ème", "Barbier, coupe homme et enfant", "29 rue Juliette Récamier, 69006 Lyon", "04 78 52 53 38", "Planity seul",
      "Ouvert en <b>mars 2024</b> par <b>Haris</b> : jeune entreprise qui construit sa clientèle, et il n'existe que sur Planity. Montre-lui Blade Society.", ["Ouvert en 2024"], "https://www.planity.com/artisan-barbier-du-6eme-69006-lyon", "Sa page Planity"),
    S("c2002", "Lyon 1", "Salon Luc", "Coiffure mixte, soins, maquillage", "4 rue de la Bourse, 69001 Lyon", "04 78 39 01 31", "Planity + Facebook",
      "Salon mixte rue de la Bourse, qui ouvre <b>dès 7h30</b> d'après OpenStreetMap : l'info qui fait venir les actifs du quartier, et elle n'est nulle part. Planity et Facebook seulement.", ["Ouvre à 7h30"], "https://www.planity.com/salon-luc-69001-lyon", "Sa page Planity"),
    S("c14", "Lyon 6", "Ongles Beauté Lisa", "Onglerie, semi-permanent, épilation", "49 rue Garibaldi, 69006 Lyon", "06 14 90 38 42", "Fresha + Planity",
      "<b>Lisa</b>, 4,6/5, sur Fresha et Planity. Les ongles se choisissent sur photos : une galerie de ses poses et la réservation sans commission.", ["4,6/5"], "https://www.fresha.com/fr/lvp/ongles-beaute-lisa-rue-garibaldi-lyon-A8qWYq", "Sa page Fresha"),
    S("c205", "Lyon 7", "NGA Nails", "Onglerie, prothésiste ongulaire", "5 place Jules Guesde, 69007 Lyon", "06 10 34 64 42", "Planity seul",
      "<b>103 avis Planity</b>, 4,6/5, et elle réserve <b>uniquement</b> par Planity : chaque rendez-vous lui coûte. Demande <b>Nga Tran</b>.", ["103 avis"], "https://www.planity.com/nga-nails-69007-lyon", "Sa page Planity"),
    S("c50", "Caluire-et-Cuire", "Amaressences", "Institut de beauté, soins, Cellu M6", "1 place Louis Braille, 69300 Caluire-et-Cuire", "04 78 23 68 94", "3 plateformes",
      "Institut <b>depuis 2014</b> sur <b>Planity, Fresha et Booksy à la fois</b>, avec une adresse Gmail. Trois abonnements pour faire ce qu'un seul site ferait. C'est ton argument chiffré.", ["!Paie 3 plateformes"], "https://www.planity.com/amaressences-69300-caluire-et-cuire", "Sa page Planity"),
    S("c62", "Lyon 8", "JK Institut", "Institut de beauté", "4 rue Claude Violet, 69008 Lyon", "04 78 01 02 41", "Planity seul",
      "<b>5,0/5 sur 443 avis</b> : la meilleure réputation de la liste, entièrement hébergée chez Planity. Si Planity change ses prix, elle perd tout. Demande <b>Justine</b>.", ["!443 avis · 5/5"], "https://www.planity.com/jk-institut-69008-lyon", "Sa page Planity"),
    S("c92", "Jonage", "Institut Villa Victoria", "Institut de beauté, soins visage, massages", "75 boulevard Louis Pradel, 69330 Jonage", "06 22 56 29 95", "Planity + Facebook",
      "<b>Victoria</b>, CAP et BP esthétique, soins manuels et cosmétiques choisis. Très bien notée, mais seulement Planity et Facebook. Le nom « Villa Victoria » est déjà un univers : il manque le site qui va avec.", ["Très bien notée"], "https://www.planity.com/institut-villa-victoria-69330-jonage", "Sa page Planity"),
    S("c249", "Saint-Priest", "Fée Moi Belle", "Institut de beauté, soins, épilation", "43 rue Henri Maréchal, 69800 Saint-Priest", "04 78 20 62 87", "3 plateformes",
      "Sur <b>Planity, Treatwell et Fresha</b>, plus Facebook. Trois commissions pour un institut tenu par <b>Marie</b>. Même argument qu'Amaressences : un site remplace les trois.", ["!Paie 3 plateformes"], "https://www.planity.com/fee-moi-belle-69800-saint-priest", "Sa page Planity"),
    S("c221", "Lyon 4", "Red Medicine Tattoo Shop", "Tatouage, piercing, détatouage", "12 rue Pailleron, 69004 Lyon", "04 78 08 49 98", "Fresha seul",
      "5/5 sur 66 avis, tatoueur <b>Le Vil</b>, qui travaille avec une adresse Gmail. Un tatoueur se choisit sur son portfolio : aujourd'hui il est éparpillé entre Fresha et Facebook.", ["5/5"], "https://www.fresha.com/lvp/red-medicine-tattoo-shop-rue-pailleron-lyon-W469zx", "Sa page Fresha")
  ];

  var BOUTIQUES = [
    S("c54", "Chaponost", "Un tout p'tit monde", "Librairie, jeunesse, BD", "9 place Maréchal Foch, 69630 Chaponost", "09 73 88 99 75", "Facebook seul",
      "Librairie indépendante de Chaponost. Le levier : la <b>commande en ligne et le retrait en boutique</b>, pour ne pas laisser partir ses clients chez Amazon.", ["Retrait en boutique"], "https://www.facebook.com/librairieuntoutptitmonde/", "Son Facebook"),
    S("c85", "Lyon 1", "Le Livre en Pente", "Librairie neuf et occasion, vinyles", "18 rue des Pierres Plantées, 69001 Lyon", "09 50 05 00 35", "Facebook seul",
      "Achat, vente et location de livres, <b>livres au mètre</b>, plus vinyles de labels lyonnais. Les livres au mètre se vendent aux décorateurs et aux pros : une offre qui ne se trouve qu'en ligne.", ["Livres au mètre"], "https://www.facebook.com/lelivreenpente/", "Son Facebook"),
    S("c24", "Lyon 1", "Tiki Vinyl Store", "Disquaire, vinyles neufs", "19 rue René Leynaud, 69001 Lyon", "09 51 23 44 83", "Facebook seul",
      "<b>Plus de 5 000 références</b> et des showcases, mais aucun catalogue en ligne : impossible de savoir s'il a le disque avant de monter les Pentes. Le site = son stock consultable.", ["5 000 références"], "https://www.facebook.com/tikivinylstore/", "Son Facebook"),
    S("c18", "Saint-Pierre-de-Chandieu", "Boutique Seconde Vie", "Dépôt-vente vêtements et objets", "3 chemin Sous-Vignère, 69780 Saint-Pierre-de-Chandieu", "06 13 06 01 68", "Facebook seul",
      "Dépôt-vente <b>sur rendez-vous uniquement</b> : une prise de rendez-vous en ligne lui changerait la vie. Petit ticket.", ["Sur rendez-vous"], "https://www.facebook.com/61583483955747/", "Son Facebook"),
    S("c65", "Lyon 6", "Soplease", "Boutique de vêtements femme", "19-21 cours Vitton, 69006 Lyon", "04 78 93 06 58", "Facebook + Instagram",
      "Boutique de mode cours Vitton, collections qui tournent à chaque saison, seulement Facebook et Instagram. L'argument : une vitrine des nouveautés et la <b>réservation d'articles</b>.", []),
    S("c70", "Écully", "Boutique Cube", "Vêtements, chaussures, sacs, bijoux", "11 place Charles de Gaulle, 69130 Écully", "04 78 33 39 39", "Facebook seul",
      "Boutique de la place d'Écully, clientèle aisée, gamme large (vêtements, sacs, bijoux, foulards). Facebook seul : la clientèle d'Écully cherche sur Google, pas sur Facebook.", ["Clientèle aisée"], "https://www.facebook.com/BoutiqueCUBE/", "Son Facebook"),
    S("c13", "Lyon 3", "COT Contemporain", "Mobilier contemporain haut de gamme", "7 rue Servient, 69003 Lyon", "04 37 42 09 05", "Instagram seul",
      "<b>750 m² de showroom</b>, concessionnaire exclusif Steiner Paris, distributeur Lago depuis 2007. Un magasin de ce calibre avec seulement Instagram, c'est un <b>très gros dossier</b> : catalogue, marques, prise de rendez-vous showroom.", ["!750 m² · haut de gamme"], "https://www.instagram.com/cot_contemporain/", "Son Instagram"),
    S("c263", "Lyon 2", "Art Club", "Concept-store vintage, mobilier et mode", "52 rue Auguste Comte, 69002 Lyon", "04 72 41 89 15", "Facebook seul",
      "Vintage de designers, meubles et mode, rue des antiquaires. Chaque pièce est unique, donc elle <b>se vend en photo</b>, et il n'a que Facebook. Fermé lundi et mardi : appelle du mercredi au vendredi.", ["Pièces uniques"], "https://www.facebook.com/artclublyon/", "Son Facebook"),
    S("c33", "Lyon 6", "Studio des Saisons", "Fleuriste, salon de thé, atelier floral", "15 rue de Sèze, 69006 Lyon", "09 79 46 01 79", "Facebook seul",
      "Deuxième boutique de <b>Julie</b>, qui tient aussi « Des Fleurs, des Saisons » (fiche suivante). <b>Un seul appel pour deux boutiques</b> : un site commun avec ateliers floraux à réserver.", ["!2 boutiques · 1 appel"], "https://www.facebook.com/p/Studio-des-saisons-61550710859506/", "Son Facebook"),
    S("c270", "Lyon 6", "Des Fleurs, des Saisons", "Fleuriste, fleurs françaises, livraison", "57 cours Franklin Roosevelt, 69006 Lyon", "09 62 15 46 07", "Aucun site",
      "Fleurs françaises, <b>livraison dans 5 communes</b> et retrait gratuit, tout ça sans aucune commande en ligne. Même gérante que Studio des Saisons : appelle une fois.", ["Livre 5 communes"]),
    S("c51", "Caluire-et-Cuire", "Au Jardin de JB", "Fleuriste et caviste", "121 Grande Rue de Saint-Clair, 69300 Caluire-et-Cuire", "04 78 23 02 29", "Florajet + Facebook",
      "<b>Jean-Baptiste</b>, artisan fleuriste et caviste. Il passe par Florajet, qui prend sa commission sur chaque bouquet livré. Fleurs + vin : un coffret cadeau qui se commande en ligne.", ["Commission Florajet"]),
    S("c83", "Lyon 7", "B.B. Fleurs", "Fleuriste, mariages, deuil, livraison", "277 avenue Jean Jaurès, 69007 Lyon", "04 78 69 36 04", "Aucun site",
      "Mariages, anniversaires, cérémonies et deuil, avec livraison : les commandes de deuil se passent <b>en urgence, le soir, sur Google</b>. Aucun site.", ["Livraison"]),
    S("c238", "Saint-Cyr-au-Mont-d'Or", "Comme une Évidence", "Fleuriste, mariages, deuil, livraison", "4 avenue Gambetta, 69450 Saint-Cyr-au-Mont-d'Or", "04 78 47 18 38", "Interflora seul",
      "5/5, livraison le jour même, membre <b>Interflora</b> (qui garde une grosse part de la commande). Son concurrent de Saint-Cyr, Ancolie et Camélia, a un site. Cite-le.", ["Concurrent équipé"]),
    S("c80", "Lyon 7", "Éco Laverie Madeleine", "Laverie automatique, 7j/7", "17 rue de la Madeleine, 69007 Lyon", "07 83 22 01 04", "Aucun site",
      "Laverie ouverte <b>7j/7 de 7h à 20h30</b>. Petit ticket : une page simple avec horaires, tarifs et machines. Appel court.", ["Petit ticket"]),
    S("c39", "Villeurbanne", "Marché Total", "Épicerie africaine, import-export", "17 place des Maisons Neuves, 69100 Villeurbanne", "06 30 46 45 10", "TikTok + Instagram",
      "SAS créée <b>fin 2024</b>, déjà active sur TikTok et Instagram : elle sait se montrer, il lui manque le panier. La présidente est <b>Leida Tiabatantou Loutaya</b>. Montre My Candy's, c'est exactement ça.", ["Montre My Candy's"], "https://www.tiktok.com/@marche_total", "Son TikTok")
  ];

  var BOUCHE = [
    S("c15", "Saint-Genis-les-Ollières", "Au Pain de Sucre", "Boulangerie-pâtisserie-chocolaterie", "7 rue du Guillot, 69290 Saint-Genis-les-Ollières", "09 53 10 88 13", "Facebook seul",
      "<b>177 avis, 4,3/5</b>, depuis 2012, pains spéciaux. Pose la question du script : « quand un client veut commander un gâteau d'anniversaire, il fait comment ? »", ["177 avis"], "https://www.facebook.com/people/Au-pain-de-sucre/100054628262295/", "Son Facebook"),
    S("c214", "Lyon 1", "Au Pain des Traboules", "Boulangerie, flans, bugnes", "9 rue Lanterne, 69001 Lyon", "04 78 28 36 69", "Facebook + Instagram",
      "Rue Lanterne <b>depuis plus de 60 ans</b>, surnommée « Le Flanboyant » pour ses flans, bugnes de décembre à mars, dans les guides touristiques. Une histoire pareille mérite une page.", ["!60 ans · touristes"], "https://www.facebook.com/aupaindestraboules/", "Son Facebook"),
    S("c218", "Lissieu", "Boulangerie Farja", "Boulangerie-pâtisserie familiale", "Centre commercial Les Tamaris, 69380 Lissieu", "04 78 47 03 92", "Aucun site",
      "Boulangerie familiale <b>depuis 2007</b>, passée en SAS fin 2023. Aucun site. Demande <b>Claude Farja</b>.", ["Gérant : C. Farja"]),
    S("c226", "Villeurbanne", "Au Pain Gourmand", "Boulangerie-pâtisserie", "53 rue Anatole France, 69100 Villeurbanne", "09 86 27 89 73", "Facebook seul",
      "Facebook actif et une fiche sur une appli de commande, pas de site. Si le fixe ne répond pas, un annuaire donne le 06 89 03 69 49.", ["2 numéros"], "https://www.facebook.com/p/Au-Pain-Gourmand-100057098394240/", "Son Facebook"),
    S("c63", "Lyon 8", "Elsa Boulangerie", "Boulangerie-pâtisserie-traiteur", "105 route de Vienne, 69008 Lyon", "04 72 71 73 43", "Facebook seul",
      "<b>6 à 9 salariés</b>, traiteur en plus, depuis 2009, et une adresse <code>@orange.fr</code> en contact. Le traiteur, c'est la commande qui rapporte : il faut un formulaire.", ["6 à 9 salariés", "Traiteur"], "https://www.facebook.com/Elsaboulangerie/", "Son Facebook"),
    S("c9", "Lyon 7", "La Boulangerie de Candice", "Boulangerie-pâtisserie, snacking", "72 rue de Gerland, 69007 Lyon", "04 78 58 07 39", "Aucun site",
      "Ouverte en <b>2022</b>, 4,4/5, à Gerland où les bureaux commandent petits-déjeuners et plateaux. Aucun site : le snacking pour les entreprises passe à côté.", ["Quartier bureaux"]),
    S("c241", "Chassieu", "Boulangerie Oriane", "Boulangerie-pâtisserie", "21 route de Genas, 69680 Chassieu", "04 78 90 72 10", "Aucun site",
      "Boulangerie de la route de Genas à Chassieu, ouverte le dimanche, bien notée pour son pain. Rien d'autre qu'une ligne dans les annuaires.", ["Ouvert dimanche"]),
    S("c244", "Lyon 2", "L'Artisan Boulanger de Vaubecour", "Boulangerie-pâtisserie", "8 rue Vaubecour, 69002 Lyon", "04 72 77 97 02", "Aucun site",
      "<b>83 avis</b>, SARL depuis 2013, ouvert jusqu'à 20h. Avis partagés : un site bien fait aide aussi à reprendre la main sur son image.", ["83 avis"]),
    S("c250", "Lyon 7", "Boulangerie des 5 Sens", "Boulangerie-pâtisserie, plusieurs boutiques", "29 avenue Jean Jaurès, 69007 Lyon", "07 71 60 90 86", "Aucun site",
      "<b>165 avis</b>, ouverte dès 5h30, et la société a <b>plusieurs boutiques</b> (siège à Lyon 2). Un site pour tout le réseau : c'est un vrai dossier. Autre numéro connu : 09 73 23 13 13.", ["!Plusieurs boutiques"]),
    S("c21", "Saint-Genis-les-Ollières", "Boucherie Carrara", "Boucherie, charcuterie, traiteur", "2 rue Jean Piccandet, 69290 Saint-Genis-les-Ollières", "04 78 57 45 45", "Facebook seul",
      "<b>Gabriel Carrara</b> a déménagé en janvier 2025 : un déménagement, c'est des clients qui cherchent la nouvelle adresse. Traiteur et plats à emporter.", ["A déménagé en 2025"], "https://www.facebook.com/Boucherie-Carrara-114559940376702/", "Son Facebook"),
    S("c73", "Lyon 1", "Tête Bech", "Boucherie-charcuterie bio", "9 rue des Pierres Plantées, 69001 Lyon", "04 78 98 30 91", "Facebook seul",
      "Une des plus vieilles boucheries de Lyon (<b>plus de 120 ans</b>), passée en bio, avec sa propre race wagyu × angus. Citée par <b>Gault&Millau et Le Fooding</b>. Et aucun site. Demande <b>Gilles de Bechevel</b>.", ["!Gault&Millau", "120 ans"], "https://www.facebook.com/boucherietetebech/", "Son Facebook"),
    S("c247", "Lyon 8", "Boucherie La Ronde", "Boucherie, volailles, préparations maison", "111 rue Marius Berliet, 69008 Lyon", "04 26 17 39 04", "Aucun site",
      "Boucherie de quartier, préparations maison, <b>60 avis</b>. Deux adresses circulent (rue Marius Berliet et boulevard des États-Unis) : demande-lui laquelle est la bonne, ça ouvre la conversation.", ["Adresse à confirmer"]),
    S("c2003", "Lyon 2", "Boucherie Jeandel", "Boucherie traditionnelle, volailles de Bresse", "20 rue des Remparts d'Ainay, 69002 Lyon", "04 78 37 66 57", "Facebook seul",
      "Boucherie familiale d'Ainay, <b>poulets de Bresse, agneau de Charente</b>, andouillettes, dans le Petit Paumé. Clientèle aisée qui commande pour les fêtes. Demande <b>Fabien Jeandel</b>.", ["Petit Paumé"], "https://www.facebook.com/p/Boucherie-Jeandel-100063580177032/", "Son Facebook"),
    S("c2004", "Lyon 3", "Au Buron Fromagerie", "Fromagerie, plateaux, raclette, fondue", "87 rue de la Part-Dieu, 69003 Lyon", "09 87 72 28 32", "Facebook seul",
      "Ouverte en <b>2023</b> par <b>Jean-Christophe Conrie</b>. Plateaux de fromages, raclettes, fondues : de la commande à l'avance, parfaite en ligne. Voisine de Chez Ratha (même rue).", ["Plateaux sur commande"], "https://www.facebook.com/people/Au-Buron-Fromagerie/61550789060494/", "Son Facebook"),
    S("c206", "Villeurbanne", "Sebastia", "Épicerie fine arménienne et méditerranéenne", "33 avenue Antoine de Saint-Exupéry, 69100 Villeurbanne", "04 78 85 83 43", "Facebook seul",
      "Épicerie fine <b>depuis 2004</b>, produits achetés en direct aux producteurs. Ses clients viennent de toute la région pour ces produits : <b>la vente en ligne</b> est l'angle.", ["Vente à distance"], "https://www.facebook.com/magasin.sebastia/", "Son Facebook"),
    S("c66", "Lyon 3", "Chez Ratha", "Traiteur cambodgien", "65 rue de la Part-Dieu, 69003 Lyon", "07 79 71 46 52", "Instagram seul",
      "Traiteur khmer <b>5/5</b>, à emporter. Instagram seulement : pas de carte, pas de commande. Même rue qu'Au Buron, cite-la.", ["5/5"], "https://www.instagram.com/chez_ratha", "Son Instagram"),
    S("c236", "Lyon 4", "Les Mascareignes", "Traiteur créole, épicerie exotique", "16 rue d'Austerlitz, 69004 Lyon", "04 72 07 80 61", "Aucun site",
      "Traiteur océan Indien et Antilles à la Croix-Rousse, <b>4,5/5 sur 64 avis</b>, commandes <b>par téléphone</b> et livraison. Le téléphone qui sonne pendant le service : question du script. Même rue que Tomate (restos).", ["Commandes par tél."])
  ];

  var RESTOS = [
    S("c10", "Lyon 4", "Tomate", "Cantine végétarienne, plats à emporter", "10 rue d'Austerlitz, 69004 Lyon", "09 87 59 97 64", "Aucun site",
      "Ouverte par <b>Marie et Isaac</b>, plat du jour à 9 €, citée par la Tribune de Lyon. La carte change chaque jour : c'est le cas parfait pour un site qu'ils mettent à jour eux-mêmes.", ["Tribune de Lyon"]),
    S("c16", "Vénissieux", "La Lozère", "Restaurant-bar traditionnel", "17 rue de la Lozère, 69200 Vénissieux", "04 78 77 56 43", "Facebook seul",
      "<b>351 avis</b>, n°8 sur 48 à Vénissieux sur Tripadvisor, terrasse. Facebook seul. Bien placé mais invisible hors de ses habitués.", ["351 avis"], "https://www.facebook.com/p/Restaurant-Bar-La-Loz%C3%A8re-100069021445354/", "Son Facebook"),
    S("c207", "Caluire-et-Cuire", "La Flamme Pizzeria", "Pizzeria, livraison jusqu'à minuit", "135 Grande Rue de Saint-Clair, 69300 Caluire-et-Cuire", "04 78 58 47 04", "TikTok seul",
      "<b>274 avis, 4,6/5</b>, livraison, ouvert jusqu'à minuit tous les jours, et TikTok comme seule vitrine. Question du script : « sur les plateformes de livraison, il vous reste combien ? »", ["!274 avis · livraison"], "https://www.tiktok.com/@la.flamme.pizzeria", "Son TikTok"),
    S("c211", "Lyon 7", "Savory", "Grillades au feu de bois, pizzas, burgers", "95 rue de Gerland, 69007 Lyon", "04 28 29 93 40", "Deliveroo seul",
      "<b>1 099 avis</b>, ouvert jusqu'à 5h du matin, et <b>toutes ses commandes passent par Deliveroo</b>, qui prend jusqu'à 30 % de commission. C'est l'argument le plus chiffré de la liste. Appelle en fin d'après-midi.", ["!Tout via Deliveroo"], "https://deliveroo.fr/fr/menu/lyon/lyon-jean-mace/savory-feu-de-bois-lyon", "Sa page Deliveroo"),
    S("c223", "Lyon 4", "Le Plato", "Bistronomie, produits du marché", "1 rue Villeneuve, 69004 Lyon", "04 72 00 01 30", "TheFork seul",
      "Tenu depuis 2013 par le chef-pâtissier <b>Frédéric Therriaud</b>, 4,8/5, et réservations via TheFork (commission par couvert). Un chef avec une signature a besoin de sa propre carte en ligne.", ["4,8/5", "Chef : F. Therriaud"], "https://www.thefork.fr/restaurant/le-plato-r44465", "Sa page TheFork"),
    S("c58", "Lyon 3", "Pizz'amore Saxe", "Pizzeria au feu de bois, halal, livraison", "148 avenue Maréchal de Saxe, 69003 Lyon", "09 73 12 17 58", "TikTok seul",
      "Ouvert <b>7j/7 de 11h à 23h30</b>, feu de bois, livraison. TikTok pour se montrer, mais rien pour commander sans commission.", ["Ouvert 7j/7"], "https://www.tiktok.com/@pizzamorelyon", "Son TikTok"),
    S("c69", "Lyon 7", "Café du Nain", "Bouchon lyonnais", "5 rue Montesquieu, 69007 Lyon", "04 37 28 54 44", "Facebook seul",
      "Bouchon de <b>plus de 50 ans</b>, repris en 2018 par la <b>famille Pillon</b> : tripes, cervelle, andouillette. Les touristes cherchent « vrai bouchon Lyon » et ne le trouvent pas.", ["50 ans"], "https://www.facebook.com/cafedunain/", "Son Facebook"),
    S("c74", "Dardilly", "Relais de la Bascule", "Restaurant routier, buffet à volonté", "D306, 69570 Dardilly", "04 78 35 56 30", "Aucun site",
      "<b>Un des derniers routiers de la région</b>, dans Rue89Lyon. Les chauffeurs et les nostalgiques le cherchent : horaires, parking poids lourds, menu du jour.", ["Rue89Lyon"]),
    S("c79", "Lyon 6", "Le Masséna", "Brasserie traditionnelle", "90 rue Masséna, 69006 Lyon", "04 78 52 29 62", "Aucun site",
      "Brasserie à la <b>déco d'horloges</b>, entrecôte et choucroute, dans un quartier de bureaux. Aucun site, pas même Facebook.", ["Zéro réseau"]),
    S("c89", "Lyon 2", "L'Épicerie de Ginette", "Bistrot à tartines, épicerie", "2 rue de la Monnaie, 69002 Lyon", "04 78 37 70 85", "Facebook seul",
      "<b>2 967 avis</b> sur Restaurant Guru, déco années 40-50, en pleine Presqu'île. Un volume pareil sans site : les touristes réservent ailleurs.", ["!2 967 avis"], "https://www.facebook.com/L%C3%89picerie-Bistrot-%C3%A0-Tartines-171622849690513/", "Son Facebook"),
    S("c235", "Lyon 6", "Casa del Gusto", "Restaurant et épicerie italienne, privatisation", "Place Edgar Quinet, 69006 Lyon", "04 72 72 04 11", "Aucun site",
      "Cuisine italienne, <b>épicerie à l'entrée</b>, et <b>privatisation jusqu'à 50 personnes</b> vendue par Privateaser et ABC Salles, qui prennent leur part. L'événementiel se vend mieux sur son propre site.", ["Privatisation 50 pers."]),
    S("c94", "Lyon 1", "Ô Verre Morel", "Restaurant, pizzas, cuisine régionale", "9 place du Lieutenant Morel, 69001 Lyon", "09 86 32 36 91", "Facebook + Uber Eats",
      "Ouvert <b>jusqu'à 1h</b> sur les Pentes, sur Uber Eats, et une page Facebook. Petit restaurant récent : l'argument commission.", ["Uber Eats"], "https://www.facebook.com/p/%C3%94-VERRE-MOREL-100068951343650/", "Son Facebook"),
    S("c2005", "Lyon 9", "Les 4G", "Bouchon lyonnais", "27 rue Gorge de Loup, 69009 Lyon", "06 37 46 56 42", "Aucun site",
      "<b>Prix du meilleur bouchon « authentique » 2024</b> (prix Florent Dessus), et aucun site. Tenu par <b>Philippe Moy et Chloé Wallut</b>. Ouvert en semaine, 7h-15h : appelle vers 15h30. Le fixe d'OpenStreetMap (04 37 46 56 42) semble faux.", ["!Meilleur bouchon 2024"]),
    S("c28", "Lyon 5", "Bar de Bon-Secours", "Bar à cocktails speakeasy", "12 rue du Bœuf, 69005 Lyon", "04 72 40 99 66", "Aucun site",
      "Speakeasy caché dans une ancienne chocolaterie du Vieux Lyon, créé par <b>Lionel et Stanislas</b>. Le secret fait partie du concept, donc ne vends pas la visibilité : vends la <b>réservation et la privatisation</b> (Privateaser prend sa part).", ["Angle : privatisation"]),
    S("c52", "Vénissieux", "Au Bon Accueil", "Restaurant traditionnel, buffet", "2 rue Francisco Ferrer, 69200 Vénissieux", "04 78 74 27 76", "Aucun site",
      "4,4/5, buffet d'entrées et plats canailles (tête de veau). Clientèle ouvrière du midi : une page avec le menu du jour et les horaires suffit.", ["Menu du jour"]),
    S("c11", "Saint-Priest", "Les Pizzas du Feuilly", "Pizzas au feu de bois à emporter", "Avenue Hélène Boucher, 69800 Saint-Priest", "07 71 60 58 96", "Facebook seul",
      "4,6/5, feu de bois, ouvert le soir du mardi au samedi. Commande <b>au téléphone pendant le rush</b> : un bouton de commande en ligne lui libère les mains.", ["4,6/5"], "https://www.facebook.com/p/Les-Pizzas-du-Feuilly-100027190467151/", "Son Facebook"),
    S("c17", "Lyon 3", "May Food", "Sandwicherie, petits-déjeuners", "90 cours Lafayette, 69003 Lyon", "06 98 85 68 92", "Instagram seul",
      "SARL <b>créée en décembre 2024</b>, 5/5 sur 42 avis. Jeune affaire près de la Part-Dieu : des commandes groupées de bureaux à aller chercher.", ["Créée fin 2024"], "https://www.instagram.com/mayfoodlyon/", "Son Instagram"),
    S("c23", "Lyon 7", "Uskudar", "Kebab, street food turque", "26 rue de Marseille, 69007 Lyon", "04 37 28 54 89", "Aucun site",
      "Classé <b>n°1 des kebabs de Lyon cinq ans de suite</b> par kebab-frites.com, et aucun site. Il a déjà la réputation : il lui manque juste l'adresse en ligne.", ["!N°1 kebab de Lyon"]),
    S("c29", "Lyon 2", "Confort Kebab", "Kebab halal, salle et terrasse", "12 rue Confort, 69002 Lyon", "04 78 42 40 33", "Facebook seul",
      "Kebab de la Presqu'île avec salle et terrasse, formule à 8 €. Petit ticket, argument commission des plateformes.", ["Petit ticket"], "https://www.facebook.com/Confort-kebab-103904507960822/", "Son Facebook"),
    S("c35", "Lyon 8", "L'Artisan Pizza", "Pizzeria artisanale, livraison", "81 rue Laënnec, 69008 Lyon", "09 79 41 24 54", "Instagram + Uber Eats + Deliveroo",
      "100 % fait maison, et la livraison passe <b>par Uber Eats et Deliveroo à la fois</b>. Double commission : c'est la phrase d'accroche.", ["Double commission"], "https://www.instagram.com/lartisan_pizza/", "Son Instagram"),
    S("c5", "Bron", "Catalina Pizza", "Pizzeria à emporter", "28 avenue du 8 Mai 1945, 69500 Bron", "06 07 45 50 26", "Facebook seul",
      "Pizzeria du parking Grand Frais, 73 avis. Petit ticket. Hors des rues démarchées le 5 septembre.", ["Petit ticket"], "https://www.facebook.com/people/Catalina-pizza-bron/100049877093776/", "Son Facebook"),
    S("c53", "Lyon 9", "Queenstown", "Burgers, frites maison", "56 rue Saint-Pierre de Vaise, 69009 Lyon", "04 78 66 12 35", "Facebook seul",
      "Burgers et frites maison <b>depuis 2018</b>, à 5 minutes du métro Valmy. Facebook seul. Carte en ligne et commande à emporter.", ["Depuis 2018"], "https://www.facebook.com/Queenstownlyon/", "Son Facebook")
  ];

  function rang(liste, rue) { liste.forEach(function (s) { s.rue = rue; }); return liste; }

  var blocs = [
    { heure: "8h – 9h30", quoi: "Artisans & garages, avant le départ en chantier",
      conseil: "<b>Question d'accroche :</b> « Quand un client cherche un garage ou un artisan dans votre coin, sur Google, il tombe sur qui ? » Les garages ferment souvent entre 12h et 14h : si tu rates le créneau du matin, rappelle vers 17h.",
      stops: rang(ARTISANS, "crv") },
    { heure: "10h – 11h30", quoi: "Coiffure & beauté, entre deux clientes (mardi à vendredi)",
      conseil: "<b>Question d'accroche :</b> « Planity (ou Fresha), ça vous coûte combien par mois ? » Jamais le samedi. Si elle est en prestation, demande l'heure de sa pause, et rappelle à cette heure-là.",
      stops: rang(BEAUTE, "prune") },
    { heure: "14h – 15h", quoi: "Boutiques & services, le creux de l'après-midi",
      conseil: "<b>Question d'accroche :</b> « Quelqu'un qui veut savoir si vous avez tel article, il fait comment aujourd'hui ? » Beaucoup ferment le lundi.",
      stops: rang(BOUTIQUES, "ardoise") },
    { heure: "15h – 16h30", quoi: "Commerces de bouche, après le rush de midi",
      conseil: "<b>Question d'accroche :</b> « Quand un client veut commander un gâteau, un plateau ou un buffet, il appelle ou il doit se déplacer ? » Jamais le matin. Beaucoup de boulangers se reposent en début d'après-midi.",
      stops: rang(BOUCHE, "cdl") },
    { heure: "15h30 – 17h30", quoi: "Restaurants, bars & snacks, entre les deux services",
      conseil: "<b>Question d'accroche :</b> « Sur les commandes Uber Eats / Deliveroo, il vous reste combien une fois la commission enlevée ? » ou « Le téléphone qui sonne en plein service, ça arrive souvent ? » Jamais entre 11h30 et 14h30, ni après 18h30.",
      stops: rang(RESTOS, "autre") }
  ];

  var n = 0, communes = {};
  blocs.forEach(function (b) {
    b.stops.forEach(function (s) { s.n = ++n; communes[s.numero.replace(/^Lyon \d+$/, "Lyon")] = 1; });
  });

  window.APPELS = {
    id: "appels-lyon-2026-09",
    date: "2026-09-15",
    page: "../appels-3c9e51/",
    zone: "Appels · Métropole de Lyon",
    titre: n + " entreprises sans site à appeler",
    resume: "Toute la métropole, de Neuville à Saint-Genis-Laval. Chaque entreprise a été recherchée une par une : elle n'a <b>ni site, ni page gratuite</b>, seulement des annuaires, des réseaux sociaux ou une plateforme qu'elle paie. La liste est rangée par <b>créneau d'appel</b> selon le métier. Commence par les fiches marquées en rouge.",
    chiffres: [
      { n: String(n), l: "entreprises vérifiées" },
      { n: String(Object.keys(communes).length), l: "communes (Lyon compté une fois)" },
      { n: "2–3", l: "min par appel, objectif : un RDV" }
    ],
    rues: [
      { code: "crv", nom: "Artisans & garages (" + ARTISANS.length + ")" },
      { code: "prune", nom: "Coiffure & beauté (" + BEAUTE.length + ")" },
      { code: "ardoise", nom: "Boutiques & services (" + BOUTIQUES.length + ")" },
      { code: "cdl", nom: "Bouche (" + BOUCHE.length + ")" },
      { code: "autre", nom: "Restauration (" + RESTOS.length + ")" }
    ],
    antiseche: [
      { t: "Un seul objectif",
        html: "<p>Décrocher un <b>rendez-vous de 45 minutes</b>. Pas de prix, pas de fonctionnalités, 2 à 3 minutes maximum. Appelle debout, parle lentement. Mardi, mercredi et jeudi, c'est le mieux. Vise 25 à 30 appels dans l'après-midi.</p>" },
      { t: "1 · Le barrage",
        html: "<p><q>Bonjour, Jeremy à l'appareil. Je souhaitais parler au responsable, c'est possible ? … Il s'appelle comment, pour que je le rappelle au bon moment ?</q> Quand la fiche donne un prénom, demande-le directement.</p>" },
      { t: "2 · L'accroche (8 secondes)",
        html: "<p><q>Bonjour [Prénom], Jeremy, de LinkedIA. Je crée des sites pour les commerces du coin. Je vous appelle parce que je viens de regarder [votre salon] sur Google… et j'ai vu que vous n'avez pas de site.</q> Ajoute le fait de la fiche (443 avis, Planity, Deliveroo…), <b>puis tais-toi</b>.</p>" },
      { t: "3 · La question du métier",
        html: "<p>Elle est écrite en tête de chaque bloc. Écoute la réponse et note-la mot pour mot : tu la reprendras au rendez-vous.</p>" },
      { t: "4 · Le pivot",
        html: "<p><q>C'est exactement ce que je règle : vos clients réservent ou commandent en ligne, sans commission. Je l'ai fait pour un barbier à Villeurbanne et un restaurant à Lyon 6. Et il n'y a aucun abonnement mensuel : le site vous appartient.</q></p>" },
      { t: "5 · Le double choix",
        html: "<p><q>Le mieux, c'est que je passe vous montrer ce que ça donnerait pour [nom]. 45 minutes, gratuit, sans engagement. Plutôt mardi en début d'après-midi, ou jeudi vers 15h ?</q> Puis <b>SMS de confirmation dans la minute</b>.</p>" },
      { t: "Objections éclair",
        html: "<ul><li><b>« Ça m'intéresse pas »</b> : <q>Vous savez combien de gens tapent « [métier] [quartier] » chaque mois ? C'est juste ça que je viens montrer.</q></li>" +
              "<li><b>« C'est combien ? »</b> : <q>Ça dépend de vos besoins, et il n'y a aucun abonnement. Je vous donne un vrai prix au rendez-vous. Mardi ou jeudi ?</q></li>" +
              "<li><b>« J'ai Facebook / Planity »</b> : <q>Parfait pour vos habitués. Mais sur Google, c'est le premier de la liste qui gagne, et sur Planity vous n'êtes pas chez vous.</q></li>" +
              "<li><b>« Envoyez un mail »</b> : <q>Je vous l'envoie. Mais un mail se perd : 45 minutes en vrai, et si ça ne vous parle pas, on n'en parle plus.</q></li>" +
              "<li><b>« Rappelez-moi »</b> : <q>Plutôt la semaine prochaine ou dans quinze jours ?</q> Note le jour dans les notes et tape « À rappeler ».</li></ul>" }
    ],
    blocs: blocs,
    reserves: [
      "<b>Vérification.</b> Le 15/09/2026, chaque entreprise a été cherchée par son nom : aucune n'a de site à elle ni de page gratuite (eatbu, Wix…). Les commerces fermés, repris, rattachés à un réseau de garages (AD, Motrio) ou qui ont un nom de domaine ont été retirés. Si on te répond « j'ai un site », crois-le : excuse-toi, note-le, et tape « Non ».",
      "<b>Numéros.</b> Ils viennent d'OpenStreetMap, recoupés avec au moins un annuaire. Quand deux numéros circulent, le second est indiqué dans la fiche.",
      "<b>Cadre légal.</b> Depuis le 11 août 2026, il faut un accord préalable pour démarcher par téléphone un <b>particulier</b> (loi du 30 juin 2025). Ici, tu appelles des professionnels, sur leur ligne pro, à propos de leur activité : c'est la prospection B2B classique. Si quelqu'un dit « ne me rappelez plus », tape « Non », écris-le en note, et ne rappelle jamais.",
      "<b>Zones de porte-à-porte.</b> Les commerces des rues déjà faites à pied (Montchat, cours du Docteur Long, Lacassagne, Paul Bert, Roosevelt et Rousset à Bron) sont exclus : ils t'ont déjà vu passer.",
      "<b>Réserve.</b> 47 autres entreprises sans site ont été repérées pendant la vérification et ne sont pas dans cette liste. Demande-les quand tu auras fini celles-ci."
    ]
  };
})();
