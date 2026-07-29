/* ------------------------------------------------------------------
   FICHE DE RENSEIGNEMENT CLIENT — structure
   Reprise de fiche-renseignement-client.html, en version tactile.

   types : "text" | "tel" | "email" | "date" | "area" | "pastilles"
   pastilles + multi:true  → plusieurs choix possibles
   pastilles + multi:false → un seul choix (re-taper pour désélectionner)
   ------------------------------------------------------------------ */

window.FICHE = [
  {
    s: "1 · L'établissement & le contact",
    champs: [
      { k: "etab",     t: "Nom de l'établissement", type: "text" },
      { k: "date_rdv", t: "Date du rendez-vous",    type: "date" },
      { k: "activite", t: "Activité / secteur",     type: "text" },
      { k: "contact",  t: "Personne de contact",    type: "text" },
      { k: "tel",      t: "Téléphone",              type: "tel" },
      { k: "email",    t: "Email",                  type: "email" },
      { k: "adresse",  t: "Adresse",                type: "text" }
    ]
  },
  {
    s: "2 · Objectif du site",
    champs: [
      { k: "objectif", t: "Ce qu'il veut obtenir", type: "pastilles", multi: true,
        opts: ["Se faire connaître", "Présenter ses services", "Recevoir des rendez-vous",
               "Vendre en ligne", "Être trouvé sur Google"] },
      { k: "objectif_libre", t: "Dans ses mots", type: "area" }
    ]
  },
  {
    s: "3 · Type de site",
    champs: [
      { k: "type_site", t: "", type: "pastilles", multi: false,
        opts: ["Vitrine", "Vitrine + réservation", "Boutique en ligne", "À définir ensemble"] }
    ]
  },
  {
    s: "4 · Fonctionnalités souhaitées",
    champs: [
      { k: "fonctions", t: "", type: "pastilles", multi: true,
        opts: ["Prise de rendez-vous", "Planning / agenda privé", "Notifications email",
               "Notifications SMS", "Rappels avant RDV", "Vérif. du n° par SMS",
               "Appli installable + push", "Galerie / portfolio", "Boutique / panier",
               "Paiement en ligne", "Blog / actualités", "Formulaire de contact",
               "Carte / itinéraire", "Avis clients", "Espace de gestion autonome",
               "Site multilingue", "Réseaux sociaux", "Mentions légales / RGPD"] },
      { k: "fonctions_autres", t: "Autres besoins", type: "text" }
    ]
  },
  {
    s: "5 · Contenu disponible",
    champs: [
      { k: "logo",   t: "Logo",   type: "pastilles", multi: false, opts: ["Oui", "Non", "À créer"] },
      { k: "photos", t: "Photos", type: "pastilles", multi: false,
        opts: ["Fournies", "Shooting à prévoir", "Banque d'images"] },
      { k: "textes", t: "Textes", type: "pastilles", multi: false,
        opts: ["Fournis", "À rédiger ensemble"] }
    ]
  },
  {
    s: "6 · Identité visuelle & ambiance",
    champs: [
      { k: "couleurs", t: "Couleurs souhaitées (ou à éviter)", type: "text" },
      { k: "ambiance", t: "Ambiance", type: "pastilles", multi: true,
        opts: ["Moderne", "Luxe", "Chaleureux", "Minimaliste", "Coloré", "Classique"] },
      { k: "polices",      t: "Polices / style préféré", type: "text" },
      { k: "inspirations", t: "Sites qu'il aime",        type: "area" }
    ]
  },
  {
    s: "7 · Pages & infos pratiques",
    champs: [
      { k: "pages", t: "Pages souhaitées", type: "pastilles", multi: true,
        opts: ["Accueil", "À propos", "Services", "Galerie", "Contact", "Carte / menu",
               "Tarifs", "Réservation", "Blog", "Boutique"] },
      { k: "pages_autres", t: "Autres pages",       type: "text" },
      { k: "horaires",     t: "Horaires d'ouverture", type: "area" },
      { k: "reseaux",      t: "Réseaux sociaux (Instagram / TikTok / Facebook)", type: "text" },
      { k: "domaine",      t: "Nom de domaine souhaité", type: "text" },
      { k: "email_pro",    t: "Email pro souhaité",      type: "text" }
    ]
  },
  {
    s: "8 · Délais & budget",
    champs: [
      { k: "echeance", t: "Pour quand ?",     type: "text" },
      { k: "budget",   t: "Budget envisagé",  type: "text" }
    ]
  },
  {
    s: "9 · Formule & devis",
    champs: [
      { k: "formule", t: "Formule proposée", type: "pastilles", multi: false,
        opts: ["Essentiel", "Pro", "Business"] },
      { k: "options", t: "Options à la carte ajoutées", type: "area" },
      { k: "offre",   t: "Offre de lancement appliquée", type: "pastilles", multi: false,
        opts: ["Oui", "Non"] },
      { k: "prix",    t: "Prix proposé",                    type: "text" },
      { k: "acompte", t: "Acompte / modalités de paiement", type: "text" }
    ]
  },
  {
    s: "10 · Notes libres",
    champs: [
      { k: "notes", t: "", type: "area" }
    ]
  },
  {
    s: "Suite à donner",
    champs: [
      { k: "suite", t: "Prochaine étape", type: "pastilles", multi: false,
        opts: ["Envoyer un devis", "Rappeler", "Maquette à faire", "Sans suite"] },
      { k: "relance", t: "Date de relance", type: "date" }
    ]
  }
];

/* Champs recopiés depuis le commerce quand on ouvre une fiche pour la
   première fois depuis une tournée. */
window.FICHE_PREFILL = ["etab", "activite", "tel", "adresse"];
