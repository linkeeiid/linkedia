/* ==================================================================
   Carnet de tournée — logique
   Aucune dépendance. Tout est stocké en local sur l'appareil.
   ================================================================== */
(function () {
  "use strict";

  /* "carnet" = l'appli de tournée ; "appels" = la page séparée de prospection
     téléphonique, qui réutilise ce fichier (même stockage, mêmes fiches) */
  var MODE = window.CARNET_MODE === "appels" ? "appels" : "carnet";

  var NS = "carnet:v1:";
  var FPREF = "fiche:";

  var view = document.getElementById("view");
  var tabActuelle = document.getElementById("tab-actuelle");
  var tabAppels = document.getElementById("tab-appels");
  var tabArchives = document.getElementById("tab-archives");
  var tabFiches = document.getElementById("tab-fiches");
  var tabCarte = document.getElementById("tab-carte");
  var gauge = document.getElementById("gauge");
  var themeBtn = document.getElementById("theme");
  var toast = document.getElementById("toast");

  var OUTCOMES = [
    { v: "interesse", t: "Intéressé" },
    { v: "rappeler", t: "À rappeler" },
    { v: "refus", t: "Non" },
    { v: "absent", t: "Absent" }
  ];

  /* mêmes codes que la tournée (couleurs, stats, relances), libellés du téléphone */
  var OUTCOMES_APPEL = [
    { v: "interesse", t: "RDV pris" },
    { v: "rappeler", t: "À rappeler" },
    { v: "refus", t: "Non" },
    { v: "absent", t: "Pas joint" }
  ];

  var FILTRES = [
    { v: "tous", t: "Tous" },
    { v: "afaire", t: "À appeler" },
    { v: "rappeler", t: "À rappeler" },
    { v: "interesse", t: "RDV" }
  ];

  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin",
              "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  var JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

  var TOURNEES = window.TOURNEES || [];
  /* la liste d'appels se range comme une tournée (blocs → stops), avec kind: "appels" */
  var APPELS = window.APPELS || null;
  if (APPELS) { APPELS.kind = "appels"; }
  var FICHE = window.FICHE || [];
  var GEO = window.GEO || {};
  var PREFILL = window.FICHE_PREFILL || [];

  /* ================= stockage ================= */

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(NS + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(NS + key, JSON.stringify(value)); } catch (e) {}
  }
  function drop(key) {
    try { localStorage.removeItem(NS + key); } catch (e) {}
  }

  function stopState(tourId, stopId) { return read("st:" + tourId + ":" + stopId, { o: null, n: "" }); }
  function setStopState(tourId, stopId, st) { write("st:" + tourId + ":" + stopId, st); }

  function isClosed(tour) {
    return tour.statut === "archivee" || read("closed:" + tour.id, false) === true;
  }

  /* ================= fiches ================= */

  function getFiche(id) { return read(FPREF + id, null); }
  function saveFiche(id, f) { f.maj = Date.now(); write(FPREF + id, f); }
  function dropFiche(id) { drop(FPREF + id); }

  function allFiches() {
    var out = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(NS + FPREF) === 0) {
          var id = k.slice((NS + FPREF).length);
          var f = getFiche(id);
          if (f) { out.push({ id: id, f: f }); }
        }
      }
    } catch (e) {}
    return out.sort(function (a, b) { return (b.f.maj || 0) - (a.f.maj || 0); });
  }

  function ficheChamps() {
    var out = [];
    FICHE.forEach(function (sec) { sec.champs.forEach(function (c) { out.push(c); }); });
    return out;
  }

  function estVide(v) {
    if (v === undefined || v === null) { return true; }
    if (Array.isArray(v)) { return v.length === 0; }
    return String(v).trim() === "";
  }

  function ficheRempli(f) {
    var champs = ficheChamps(), n = 0;
    champs.forEach(function (c) { if (!estVide(f.v[c.k])) { n++; } });
    return { n: n, total: champs.length };
  }

  function ficheNom(id, f) {
    if (f && !estVide(f.v.etab)) { return f.v.etab; }
    if (f && f.nom) { return f.nom; }
    return "Fiche sans nom";
  }

  /* ================= données tournées ================= */

  function tourById(id) {
    for (var i = 0; i < TOURNEES.length; i++) { if (TOURNEES[i].id === id) { return TOURNEES[i]; } }
    if (APPELS && APPELS.id === id) { return APPELS; }
    return null;
  }
  function estAppels(tour) { return !!tour && tour.kind === "appels"; }
  function geoOf(tour, stop) {
    var g = GEO[tour.id + ":" + stop.id];
    return g && g[0] ? g : null;
  }
  /* l'adresse d'une carte de commerce dans sa liste (utilisée par la carte) */
  function stopHref(tour, stop) {
    return (estAppels(tour) ? "#/appels/" : "#/t/" + encodeURIComponent(tour.id) + "/") + stop.id;
  }
  function tourHref(tour) {
    if (!estAppels(tour)) { return "#/t/" + tour.id; }
    return MODE === "carnet" && tour.page ? tour.page : "#/appels";
  }
  function courante() {
    for (var i = 0; i < TOURNEES.length; i++) { if (!isClosed(TOURNEES[i])) { return TOURNEES[i]; } }
    return null;
  }
  /* les tournées non closes qui viennent après celle-ci, dans l'ordre du tableau */
  function aVenir(tour) {
    var out = [], vu = false;
    TOURNEES.forEach(function (t) {
      if (t.id === tour.id) { vu = true; return; }
      if (vu && !isClosed(t)) { out.push(t); }
    });
    return out;
  }
  function archivees() {
    return TOURNEES.filter(isClosed).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  }
  function stopsOf(tour) {
    var out = [];
    (tour.blocs || []).forEach(function (b) { (b.stops || []).forEach(function (s) { out.push(s); }); });
    return out;
  }
  function findStop(tourId, stopId) {
    var t = tourById(tourId);
    if (!t) { return null; }
    var found = null;
    stopsOf(t).forEach(function (s) { if (s.id === stopId) { found = s; } });
    return found ? { tour: t, stop: found } : null;
  }
  function statsOf(tour) {
    var s = { total: 0, done: 0, interesse: 0, rappeler: 0, refus: 0, absent: 0 };
    stopsOf(tour).forEach(function (stop) {
      s.total++;
      var o = stopState(tour.id, stop.id).o;
      if (o) { s.done++; s[o]++; }
    });
    return s;
  }

  function dateLongue(iso) {
    var p = iso.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return JOURS[d.getDay()] + " " + (+p[2]) + " " + MOIS[+p[1] - 1] + " " + p[0];
  }
  function dateCourte(iso) {
    var p = iso.split("-");
    return (+p[2]) + " " + MOIS[+p[1] - 1] + " " + p[0];
  }
  function quand(ms) {
    if (!ms) { return ""; }
    var d = new Date(ms);
    var jj = ("0" + d.getDate()).slice(-2);
    var hh = ("0" + d.getHours()).slice(-2);
    var mm = ("0" + d.getMinutes()).slice(-2);
    return jj + " " + MOIS[d.getMonth()].slice(0, 4) + ". à " + hh + "h" + mm;
  }

  function esc(s) {
    return String(s === undefined || s === null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ================= rendu : tournée ================= */

  function chipsHtml(chips) {
    if (!chips || !chips.length) { return ""; }
    return '<div class="chips">' + chips.map(function (c) {
      return '<span class="chip' + (c.flag ? " flag" : "") + (c.web ? " web" : "") + '">' + c.t + "</span>";
    }).join("") + "</div>";
  }

  function actsHtml(tour, stop) {
    var a = [];
    if (stop.tel) {
      a.push('<a class="act tel' + (estAppels(tour) ? " big" : "") + '" href="tel:' + stop.tel + '" data-stop="' + stop.id + '">' +
        (estAppels(tour) ? "Appeler · " : "") + stop.telAffiche + "</a>");
    }
    if (stop.google) {
      a.push('<a class="act" href="https://www.google.com/search?q=' +
        encodeURIComponent(stop.google) + '" target="_blank" rel="noopener">Google</a>');
    }
    if (stop.lien) {
      a.push('<a class="act" href="' + stop.lien.url + '" target="_blank" rel="noopener">' + stop.lien.t + "</a>");
    }
    var g = geoOf(tour, stop);
    if (g) {
      a.push('<a class="act" href="#/carte/' + encodeURIComponent(tour.id) + "/" + stop.id + '">Carte</a>');
      a.push('<a class="act" href="https://www.google.com/maps/dir/?api=1&amp;destination=' + g[0] + "," + g[1] +
        "&amp;travelmode=" + (estAppels(tour) ? "driving" : "walking") + '" target="_blank" rel="noopener">Itinéraire</a>');
    }
    var fid = "t:" + tour.id + ":" + stop.id;
    var f = getFiche(fid);
    a.push('<a class="act fiche' + (f ? " on" : "") + '" href="#/fiche/' + encodeURIComponent(fid) + '">' +
      (f ? "Fiche ✓" : "Fiche client") + "</a>");
    return '<div class="acts">' + a.join("") + "</div>";
  }

  function outcomeHtml(tour, stop) {
    var cur = stopState(tour.id, stop.id).o;
    var appel = estAppels(tour);
    return '<div class="outcome" role="group" aria-label="' + (appel ? "Résultat de l'appel" : "Résultat de la visite") + '">' +
      (appel ? OUTCOMES_APPEL : OUTCOMES).map(function (o) {
        return '<button type="button" class="out" data-stop="' + stop.id + '" data-v="' + o.v +
          '" aria-pressed="' + (cur === o.v ? "true" : "false") + '">' + o.t + "</button>";
      }).join("") + "</div>";
  }

  function appelsLigne(st) {
    if (!st.a) { return ""; }
    return "Appelé " + st.a + "× · dernier le " + quand(st.t);
  }

  function stopHtml(tour, stop) {
    var st = stopState(tour.id, stop.id);
    var appel = estAppels(tour);
    return '<div class="stop ' + stop.rue + '" data-id="' + stop.id + '"' +
        (st.o ? ' data-out="' + st.o + '"' : "") +
        (appel ? ' data-q="' + esc((stop.nom + " " + stop.numero + " " + stop.meta).toLowerCase()) + '"' : "") + ">" +
        '<div class="rail"><span class="node">' + stop.n + "</span></div>" +
        '<div class="card">' +
          '<div class="card__top"><span class="card__num">' + stop.numero + "</span>" +
          '<h3 class="card__name">' + stop.nom + "</h3></div>" +
          '<p class="card__meta">' + stop.meta + "</p>" +
          '<p class="card__why">' + stop.pourquoi + "</p>" +
          chipsHtml(stop.chips) +
          actsHtml(tour, stop) +
          (appel ? '<p class="card__calls" data-calls="' + stop.id + '">' + appelsLigne(st) + "</p>" : "") +
          outcomeHtml(tour, stop) +
          '<details class="notes" data-filled="' + (st.n ? "1" : "0") + '">' +
            "<summary>Notes rapides" + (st.n ? " ●" : "") + "</summary>" +
            '<textarea data-stop="' + stop.id + '" placeholder="' +
              (appel ? "Prénom du patron, jour et heure où le rappeler…" : "Un mot sur le passage. Le détail va dans la fiche client.") +
              '"></textarea>' +
          "</details>" +
        "</div></div>";
  }

  function renderTour(tour) {
    var closed = isClosed(tour);
    var st = statsOf(tour);
    var html = "";

    html += '<header class="intro">';
    html += '<p class="eyebrow">' + (closed ? "Tournée close · " : "") + dateLongue(tour.date) + " · " + tour.zone + "</p>";
    html += "<h1>" + tour.titre + "</h1>";
    if (tour.resume) { html += '<p class="lede">' + tour.resume + "</p>"; }

    if (st.total) {
      html += '<div class="score">' +
        '<div class="s-ok"><b>' + st.interesse + "</b><span>intéressés</span></div>" +
        '<div class="s-wait"><b>' + st.rappeler + "</b><span>à rappeler</span></div>" +
        '<div class="s-no"><b>' + st.refus + "</b><span>non</span></div>" +
        '<div class="s-absent"><b>' + st.absent + "</b><span>absents</span></div></div>";
    }

    if (tour.chiffres && tour.chiffres.length) {
      html += '<div class="tiles' + (tour.chiffres.length === 1 ? " solo" : "") + '">';
      tour.chiffres.forEach(function (c) {
        html += '<div class="tile"><span class="tile__n">' + c.n + '</span><span class="tile__l">' + c.l + "</span></div>";
      });
      html += "</div>";
    }

    if (tour.rues && tour.rues.length > 1) {
      html += '<div class="legend">';
      tour.rues.forEach(function (r) {
        html += "<span><i style=\"background:var(--" + r.code + ")\"></i> " + r.nom + "</span>";
      });
      html += "</div>";
    }
    html += "</header>";

    (tour.blocs || []).forEach(function (bloc) {
      if (bloc.pause) {
        html += '<div class="pause"><div class="pause__rail"></div><p class="pause__msg"><strong>' +
          bloc.heure + " · " + bloc.quoi + ".</strong> " + bloc.pause + "</p></div>";
        return;
      }
      html += '<section class="block"><div class="block__head"><span class="block__time">' +
        bloc.heure + '</span><span class="block__what">' + bloc.quoi + "</span></div>";
      bloc.stops.forEach(function (s) { html += stopHtml(tour, s); });
      html += "</section>";
    });

    if (!st.total) { html += '<p class="empty">Aucun commerce saisi pour cette tournée.</p>'; }

    if (tour.equipes && tour.equipes.length) {
      html += '<section class="panel"><h2>Ne pas y entrer</h2>' +
        "<p>Ces commerces ont déjà un site correct. Passe devant sans t'arrêter.</p><ul class=\"skiplist\">";
      tour.equipes.forEach(function (e) { html += "<li><b>" + e.nom + "</b> <code>" + e.site + "</code></li>"; });
      html += "</ul>";
      if (tour.alerte) { html += '<p class="warn">' + tour.alerte + "</p>"; }
      html += "</section>";
    }

    if (tour.kit && tour.kit.length) {
      html += '<section class="panel"><h2>Avant de partir</h2><ul class="kit">';
      tour.kit.forEach(function (k, i) {
        var on = read("kit:" + tour.id + ":" + i, false);
        html += '<li><input type="checkbox" data-kit="' + i + '"' + (on ? " checked" : "") +
                ' aria-label="Élément ' + (i + 1) + '"> <span>' + k + "</span></li>";
      });
      html += "</ul></section>";
    }

    if (tour.reserves && tour.reserves.length) {
      html += '<section class="panel"><h2>Deux réserves</h2>';
      tour.reserves.forEach(function (r) { html += "<p>" + r + "</p>"; });
      html += "</section>";
    }

    var suite = aVenir(tour);
    if (suite.length) {
      html += '<section class="panel"><h2>Le reste de la semaine</h2>' +
        "<p>Ces tournées sont déjà prêtes. Elles prendront la place de celle-ci, l'une après l'autre, à mesure que tu les clos.</p>" +
        '<div class="archive semaine">';
      suite.forEach(function (t) {
        html += '<a class="arch" href="#/t/' + t.id + '"><div class="arch__date">' + dateCourte(t.date) + "</div>" +
          '<div class="arch__nom">' + t.titre + '</div><div class="arch__zone">' + t.zone + "</div>" +
          '<div class="arch__ligne"><span class="dot">' + stopsOf(t).length + " commerces</span></div></a>";
      });
      html += "</div></section>";
    }

    var cur = courante();
    var apercu = !closed && cur && cur.id !== tour.id;

    html += '<footer class="foot">';
    if (closed) {
      html += '<a class="backlink" href="#/archives">← Retour aux archives</a><br>' +
              '<button type="button" id="reopen">Remettre cette tournée en cours</button>';
    } else if (apercu) {
      html += "<p>Aperçu d'une tournée à venir. Elle deviendra la tournée du jour quand tu auras clos celle du " +
              dateCourte(cur.date) + ".</p>" +
              '<a class="backlink" href="#/actuelle">← Retour à la tournée du jour</a>';
    } else {
      html += "<p>Tes résultats et tes fiches restent enregistrés sur cet appareil, même si tu fermes la page.</p>" +
              '<button type="button" id="close-tour">Clore la tournée et l\'envoyer aux archives</button>';
    }
    html += "</footer>";

    view.innerHTML = html;

    stopsOf(tour).forEach(function (stop) {
      var ta = view.querySelector('textarea[data-stop="' + stop.id + '"]');
      if (ta) { ta.value = stopState(tour.id, stop.id).n || ""; }
    });

    activeTour = tour;
    setGauge(st.total ? st.done / st.total : 0);
    document.title = "Tournée " + tour.zone + " — Carnet";
  }

  /* ================= rendu : liste d'appels ================= */

  function sansAccent(s) {
    s = String(s || "").toLowerCase();
    if (s.normalize) { s = s.normalize("NFD").replace(/[̀-ͯ]/g, ""); }
    /* « asta richard » doit trouver « Asta-Richard », « del b » « Del'B » */
    return s.replace(/[-'’.,·()]/g, " ").replace(/\s+/g, " ");
  }

  function renderAppels() {
    var tour = APPELS;
    if (!tour) {
      view.innerHTML = '<header class="intro"><p class="eyebrow">Prospection téléphonique</p>' +
        "<h1>Aucune liste d'appels</h1>" +
        '<p class="lede">Demande-moi d\'en préparer une.</p></header>';
      activeTour = null;
      setGauge(0);
      return;
    }
    var st = statsOf(tour);
    var filtre = read("appels:filtre", "tous");
    var html = "";

    html += '<header class="intro">';
    html += '<p class="eyebrow">Prospection téléphonique · vérifiée le ' + dateCourte(tour.date) + "</p>";
    html += "<h1>" + tour.titre + "</h1>";
    if (tour.resume) { html += '<p class="lede">' + tour.resume + "</p>"; }

    html += '<div class="score">' +
      '<div class="s-ok"><b>' + st.interesse + "</b><span>RDV pris</span></div>" +
      '<div class="s-wait"><b>' + st.rappeler + "</b><span>à rappeler</span></div>" +
      '<div class="s-no"><b>' + st.refus + "</b><span>non</span></div>" +
      '<div class="s-absent"><b>' + st.absent + "</b><span>pas joints</span></div></div>";

    if (tour.chiffres && tour.chiffres.length) {
      html += '<div class="tiles">';
      tour.chiffres.forEach(function (c) {
        html += '<div class="tile"><span class="tile__n">' + c.n + '</span><span class="tile__l">' + c.l + "</span></div>";
      });
      html += "</div>";
    }

    if (tour.rues && tour.rues.length) {
      html += '<div class="legend">';
      tour.rues.forEach(function (r) {
        html += "<span><i style=\"background:var(--" + r.code + ")\"></i> " + r.nom + "</span>";
      });
      html += "</div>";
    }
    html += "</header>";

    if (tour.antiseche && tour.antiseche.length) {
      html += '<details class="panel cheat"><summary>Antisèche d\'appel <small>à relire avant de composer</small></summary>';
      tour.antiseche.forEach(function (a) {
        html += '<div class="cheat__step"><h3>' + a.t + "</h3>" + a.html + "</div>";
      });
      html += "</details>";
    }

    html += '<div class="filtres">' +
      '<div class="pills" role="group" aria-label="Filtrer la liste">' +
      FILTRES.map(function (f) {
        return '<button type="button" class="pill filt" data-filtre="' + f.v + '" aria-pressed="' +
          (filtre === f.v ? "true" : "false") + '">' + f.t + "</button>";
      }).join("") + "</div>" +
      '<input type="search" class="fld__in" id="appels-q" placeholder="Chercher un nom, une commune, un métier…" autocomplete="off" aria-label="Chercher dans la liste">' +
      '<p class="filtres__n" id="appels-n" aria-live="polite"></p></div>';

    (tour.blocs || []).forEach(function (bloc, bi) {
      html += '<section class="block" data-bloc="' + bi + '"><div class="block__head"><span class="block__time">' +
        bloc.heure + '</span><span class="block__what">' + bloc.quoi + "</span></div>";
      if (bloc.conseil) { html += '<p class="block__tip">' + bloc.conseil + "</p>"; }
      bloc.stops.forEach(function (s) { html += stopHtml(tour, s); });
      html += "</section>";
    });

    if (tour.reserves && tour.reserves.length) {
      html += '<section class="panel"><h2>À savoir</h2>';
      tour.reserves.forEach(function (r) { html += "<p>" + r + "</p>"; });
      html += "</section>";
    }

    html += '<footer class="foot"><p>Tes résultats, tes notes et le nombre d\'appels restent enregistrés sur cet appareil. ' +
      "Les « RDV pris » et « À rappeler » remontent aussi dans l'encart « À relancer » du carnet de tournée (onglet Passées), " +
      "et les fiches clients sont les mêmes des deux côtés.</p></footer>";

    view.innerHTML = html;

    stopsOf(tour).forEach(function (stop) {
      var ta = view.querySelector('textarea[data-stop="' + stop.id + '"]');
      if (ta) { ta.value = stopState(tour.id, stop.id).n || ""; }
      var el = view.querySelector('.stop[data-id="' + stop.id + '"]');
      if (el) { el.setAttribute("data-q", sansAccent(el.getAttribute("data-q"))); }
    });

    activeTour = tour;
    var bar = document.querySelector(".bar");
    if (bar) { document.documentElement.style.setProperty("--barh", bar.offsetHeight + "px"); }
    appliquerFiltre();
    setGauge(st.total ? st.done / st.total : 0);
    document.title = "Appels — Carnet";
  }

  function appliquerFiltre() {
    var filtre = read("appels:filtre", "tous");
    var qEl = document.getElementById("appels-q");
    var q = qEl ? sansAccent(qEl.value.trim()) : "";
    var vus = 0, total = 0;

    Array.prototype.forEach.call(view.querySelectorAll(".block"), function (bloc) {
      var visibles = 0;
      Array.prototype.forEach.call(bloc.querySelectorAll(".stop"), function (el) {
        var o = el.getAttribute("data-out");
        var ok = filtre === "tous" ||
          (filtre === "afaire" && (!o || o === "absent")) ||
          o === filtre;
        if (ok && q && (el.getAttribute("data-q") || "").indexOf(q) === -1) { ok = false; }
        el.hidden = !ok;
        total++;
        if (ok) { visibles++; vus++; }
      });
      bloc.hidden = visibles === 0;
    });

    var n = document.getElementById("appels-n");
    if (n) {
      n.textContent = vus === total ? total + " entreprises" :
        vus + " sur " + total + (vus ? "" : " — rien ne correspond");
    }
  }

  /* ================= rendu : carte ================= */

  var LEAFLET_CSS = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
  var LEAFLET_JS = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
  var DEPART_APPELS = [45.7556, 4.8906];  /* Montchat : départ par défaut du trajet des appels */
  var carte = null;        /* carte Leaflet affichée */
  var carteJeton = 0;      /* invalide un chargement de Leaflet qui arrive après un changement de page */
  var carteVues = {};      /* centre et zoom mémorisés par liste : on revient au même endroit */
  var carteDepart = null;  /* position GPS choisie avec « Partir d'ici » */
  var moi = null;          /* point bleu « Me localiser » */
  var leafletAttente = [], leafletEnCours = false;

  function chargerLeaflet(cb) {
    if (window.L) { cb(true); return; }
    leafletAttente.push(cb);
    if (leafletEnCours) { return; }
    leafletEnCours = true;
    function fin(ok) {
      leafletEnCours = false;
      var q = leafletAttente; leafletAttente = [];
      q.forEach(function (f) { f(ok); });
    }
    if (!document.querySelector('link[href="' + LEAFLET_CSS + '"]')) {
      var l = document.createElement("link");
      l.rel = "stylesheet"; l.href = LEAFLET_CSS;
      document.head.appendChild(l);
    }
    var s = document.createElement("script");
    s.src = LEAFLET_JS;
    s.onload = function () { fin(!!window.L); };
    s.onerror = function () { s.parentNode.removeChild(s); fin(false); };  /* on pourra réessayer */
    document.head.appendChild(s);
  }

  function distM(a, b) {
    var r = Math.PI / 180;
    var x = (b[1] - a[1]) * r * Math.cos((a[0] + b[0]) / 2 * r), y = (b[0] - a[0]) * r;
    return Math.sqrt(x * x + y * y) * 6371000;
  }

  function tourneesCartables() {
    return TOURNEES.filter(function (t) {
      return stopsOf(t).some(function (s) { return geoOf(t, s); });
    });
  }

  function carteTour(idDemande) {
    if (MODE === "appels") { return APPELS; }
    var liste = tourneesCartables();
    var t = idDemande ? tourById(idDemande) : null;
    if (t && !estAppels(t) && liste.indexOf(t) !== -1) { return t; }
    var memo = tourById(read("carte:tour", ""));
    if (memo && liste.indexOf(memo) !== -1 && !isClosed(memo)) { return memo; }
    var cur = courante();
    if (cur && liste.indexOf(cur) !== -1) { return cur; }
    return liste[0] || null;
  }

  /* plus proche voisin puis 2-opt : ~100 points, instantané */
  function trajetCourt(pts, depart) {
    var reste = pts.slice(), route = [], pos = depart;
    while (reste.length) {
      var bi = 0, bd = Infinity;
      for (var i = 0; i < reste.length; i++) {
        var d = distM(pos, reste[i].g);
        if (d < bd) { bd = d; bi = i; }
      }
      pos = reste[bi].g;
      route.push(reste.splice(bi, 1)[0]);
    }
    function pt(i) { return i < 0 ? depart : route[i].g; }
    var mieux = true, passes = 0;
    while (mieux && passes++ < 40) {
      mieux = false;
      for (var a = -1; a < route.length - 2; a++) {
        for (var k = a + 2; k < route.length; k++) {
          var suite = k + 1 < route.length;
          var avant = distM(pt(a), route[a + 1].g) + (suite ? distM(route[k].g, route[k + 1].g) : 0);
          var apres = distM(pt(a), route[k].g) + (suite ? distM(route[a + 1].g, route[k + 1].g) : 0);
          if (apres + 1 < avant) {
            var seg = route.slice(a + 1, k + 1).reverse();
            Array.prototype.splice.apply(route, [a + 1, seg.length].concat(seg));
            mieux = true;
          }
        }
      }
    }
    return route;
  }

  /* appels : trajet le plus court sans les « Non ».
     tournée : trajet le plus court depuis le 1er commerce (par défaut), ou l'ordre des créneaux */
  function ordreCreneaux(tour) { return !estAppels(tour) && read("carte:ordre", "court") === "creneaux"; }
  function ordreCarte(tour, points) {
    if (estAppels(tour)) {
      return trajetCourt(points.filter(function (p) { return p.st.o !== "refus"; }), carteDepart || DEPART_APPELS);
    }
    var tri = points.slice().sort(function (a, b) { return a.stop.n - b.stop.n; });
    if (ordreCreneaux(tour) || tri.length < 3) { return tri; }
    var premier = tri.shift();
    return [premier].concat(trajetCourt(tri, premier.g));
  }

  function renderCarte(idDemande, focusId) {
    var tour = carteTour(idDemande);
    if (!tour) {
      view.innerHTML = '<header class="intro"><p class="eyebrow">Carte</p><h1>Aucun point à afficher</h1>' +
        '<p class="lede">Les commerces n\'ont pas encore de coordonnées. Demande-moi de les ajouter.</p></header>';
      setGauge(0);
      return;
    }
    var appel = estAppels(tour);
    if (!appel) { write("carte:tour", tour.id); }

    var points = [], sansGeo = 0;
    stopsOf(tour).forEach(function (s) {
      var g = geoOf(tour, s);
      if (g) { points.push({ stop: s, g: g, st: stopState(tour.id, s.id) }); } else { sansGeo++; }
    });
    var route = ordreCarte(tour, points);
    var rang = {};
    route.forEach(function (p, i) { rang[p.stop.id] = i + 1; });
    var m = 0;
    route.forEach(function (p, i) { if (i) { m += distM(route[i - 1].g, p.g); } });
    var km = m / 1000;
    var faits = points.filter(function (p) { return p.st.o; }).length;
    var refus = points.length - route.length;

    var html = '<header class="intro carte-intro">';
    html += '<p class="eyebrow">Carte · ' + (appel ? tour.zone : dateLongue(tour.date) + " · " + tour.zone) + "</p>";
    html += "<h1>" + (appel ? "Le trajet des " + points.length + " entreprises" : tour.titre) + "</h1>";
    html += '<p class="lede">' + (appel
      ? "Les points sont reliés dans l'ordre le plus court en partant de " + (carteDepart ? "<b>ta position</b>" : "<b>Montchat</b>") +
        ". Ceux marqués « Non » sortent du trajet. Touche un point pour ouvrir sa fiche."
      : (ordreCreneaux(tour)
        ? "Les points sont reliés dans l'ordre des créneaux horaires, comme la liste. Touche un point pour ouvrir sa fiche."
        : "Les points sont reliés par le trajet le plus court, en partant du n° 1 de la tournée. Le numéro sur la carte, c'est l'étape ; celui de la liste est rappelé en dessous. Touche un point pour ouvrir sa fiche.")) + "</p>";

    if (!appel) {
      html += '<div class="pills carte-tours" role="group" aria-label="Ordre du trajet">' +
        '<button type="button" class="pill carteordre" data-ordre="court" aria-pressed="' + (!ordreCreneaux(tour)) + '">Trajet le plus court</button>' +
        '<button type="button" class="pill carteordre" data-ordre="creneaux" aria-pressed="' + ordreCreneaux(tour) + '">Ordre des créneaux</button></div>';
    }

    if (!appel) {
      var liste = tourneesCartables();
      if (liste.length > 1) {
        html += '<div class="pills carte-tours" role="group" aria-label="Choisir la tournée">';
        liste.forEach(function (t) {
          html += '<button type="button" class="pill cartetour" data-tour="' + t.id + '" aria-pressed="' + (t.id === tour.id ? "true" : "false") + '">' +
            dateCourte(t.date).replace(/ \d{4}$/, "") + (isClosed(t) ? " ✓" : "") + "</button>";
        });
        html += "</div>";
      }
    }

    html += '<div class="tiles">' +
      '<div class="tile"><span class="tile__n">' + route.length + '</span><span class="tile__l">' + (appel ? "points sur le trajet" : "points reliés") + "</span></div>" +
      '<div class="tile"><span class="tile__n">' + (km < 10 ? km.toFixed(1).replace(".", ",") : Math.round(km)) + '</span><span class="tile__l">km à vol d\'oiseau</span></div>' +
      '<div class="tile"><span class="tile__n">' + (appel ? faits + "/" + points.length : "≈" + Math.max(1, Math.round(km / 4.5 * 60)) + " min") +
        '</span><span class="tile__l">' + (appel ? "déjà traités" : "de marche, hors arrêts") + "</span></div></div>";
    html += "</header>";

    html += '<div class="carte-wrap">' +
      '<div id="carte" role="region" aria-label="Carte des points à visiter"></div>' +
      '<div class="carte-btns">' +
        '<button type="button" class="carte-btn" id="carte-geo">Me localiser</button>' +
        (appel ? '<button type="button" class="carte-btn" id="carte-depart">Partir d\'ici</button>' : "") +
      "</div>" +
      '<p class="carte-msg" id="carte-msg">Chargement de la carte…</p></div>';

    html += '<div class="carte-legende">' +
      '<span><i class="pin-mini"></i> à faire</span>' +
      '<span><i class="pin-mini" data-out="interesse"></i> ' + (appel ? "RDV pris" : "intéressé") + "</span>" +
      '<span><i class="pin-mini" data-out="rappeler"></i> à rappeler</span>' +
      '<span><i class="pin-mini" data-out="refus"></i> non</span>' +
      '<span><i class="pin-mini" data-out="absent"></i> ' + (appel ? "pas joint" : "absent") + "</span>" +
      '<span><i class="pin-mini" data-approx></i> position approximative</span></div>';

    if (refus || sansGeo) {
      html += '<p class="carte-note">' +
        (refus ? refus + " « Non » retiré" + (refus > 1 ? "s" : "") + " du trajet. " : "") +
        (sansGeo ? sansGeo + " commerce" + (sansGeo > 1 ? "s" : "") + " sans adresse précise, absent" + (sansGeo > 1 ? "s" : "") + " de la carte." : "") + "</p>";
    }

    html += '<section class="panel etapes-panel"><h2>Les étapes dans l\'ordre</h2><ol class="etapes">';
    route.forEach(function (p, i) {
      var d = i ? distM(route[i - 1].g, p.g) : (appel ? distM(carteDepart || DEPART_APPELS, p.g) : 0);
      html += '<li><a href="' + stopHref(tour, p.stop) + '">' +
        '<span class="pin ' + p.stop.rue + '"' + (p.st.o ? ' data-out="' + p.st.o + '"' : "") + (p.g[2] ? " data-approx" : "") + ">" + (ordreCreneaux(tour) ? p.stop.n : i + 1) + "</span>" +
        '<span class="etape__txt"><b>' + p.stop.nom + "</b><small>" + (!appel && !ordreCreneaux(tour) ? "n° " + p.stop.n + " de la liste · " : "") + esc(p.stop.numero) +
        (d ? " · " + (d < 1000 ? Math.round(d / 10) * 10 + " m" : (d / 1000).toFixed(1).replace(".", ",") + " km") + (i ? "" : " du départ") : "") +
        "</small></span></a></li>";
    });
    html += "</ol></section>";

    view.innerHTML = html;
    activeTour = null;
    setGauge(points.length ? faits / points.length : 0);
    document.title = "Carte — " + (appel ? "Appels" : tour.zone);

    var jeton = carteJeton;
    chargerLeaflet(function (ok) {
      if (jeton !== carteJeton || !document.getElementById("carte")) { return; }
      var msg = document.getElementById("carte-msg");
      if (!ok) {
        msg.textContent = "La carte a besoin d'une connexion internet. La liste des étapes, en dessous, marche sans.";
        return;
      }
      msg.hidden = true;
      dessinerCarte(tour, points, route, rang, focusId);
    });
  }

  function couleurVar(nom, secours) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(nom);
    return (v && v.trim()) || secours;
  }

  function dessinerCarte(tour, points, route, rang, focusId) {
    var appel = estAppels(tour);
    carte = window.L.map("carte", { zoomControl: true, tap: true });
    window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    }).addTo(carte);

    var trace = route.map(function (p) { return [p.g[0], p.g[1]]; });
    if (appel && trace.length) {
      var dep = carteDepart || DEPART_APPELS;
      trace.unshift(dep);
      window.L.marker(dep, {
        icon: window.L.divIcon({ className: "pinwrap", html: '<span class="pin depart">⌂</span>', iconSize: [30, 30], iconAnchor: [15, 15] }),
        title: "Départ", keyboard: false
      }).addTo(carte).bindTooltip(carteDepart ? "Départ : ta position" : "Départ : Montchat", { direction: "top", offset: [0, -14] });
    }
    window.L.polyline(trace, { color: couleurVar("--crv", "#1f4e6d"), weight: 3, opacity: 0.7, lineJoin: "round" }).addTo(carte);

    var marqueurs = {};
    points.forEach(function (p) {
      var num = ordreCreneaux(tour) ? p.stop.n : (rang[p.stop.id] || "×");
      var focus = p.stop.id === focusId;
      var icon = window.L.divIcon({
        className: "pinwrap",
        html: '<span class="pin ' + p.stop.rue + '"' + (p.st.o ? ' data-out="' + p.st.o + '"' : "") +
          (p.g[2] ? " data-approx" : "") + (focus ? " data-focus" : "") + ">" + num + "</span>",
        iconSize: [30, 30], iconAnchor: [15, 15]
      });
      var mk = window.L.marker([p.g[0], p.g[1]], { icon: icon, title: p.stop.nom.replace(/<[^>]+>/g, ""), zIndexOffset: focus ? 1000 : (p.st.o === "refus" ? -500 : 0) });
      mk.bindTooltip(p.stop.nom + (p.g[2] ? " · position approximative" : ""), { direction: "top", offset: [0, -14] });
      mk.on("click", function () {
        memoriserVue(tour);
        /* hors de l'événement Leaflet : le changement de page détruit la carte */
        setTimeout(function () { location.hash = stopHref(tour, p.stop); }, 0);
      });
      mk.addTo(carte);
      marqueurs[p.stop.id] = mk;
    });

    var vue = carteVues[tour.id];
    if (vue) { carte.setView(vue.c, vue.z); }
    else if (focusId && marqueurs[focusId]) { carte.setView(marqueurs[focusId].getLatLng(), 16); }
    else if (points.length) {
      carte.fitBounds(points.map(function (p) { return [p.g[0], p.g[1]]; }), { padding: [30, 30], maxZoom: 17 });
    } else { carte.setView(DEPART_APPELS, 12); }
    carte.on("moveend", function () { memoriserVue(tour); });
  }

  function memoriserVue(tour) {
    if (carte) { carteVues[tour.id] = { c: carte.getCenter(), z: carte.getZoom() }; }
  }

  function localiser(depart) {
    if (!navigator.geolocation) { flash("Localisation indisponible"); return; }
    flash("Localisation…");
    navigator.geolocation.getCurrentPosition(function (pos) {
      var ll = [pos.coords.latitude, pos.coords.longitude];
      if (depart) {
        carteDepart = ll;
        delete carteVues[APPELS.id];
        render();
        return;
      }
      if (!carte) { return; }
      if (moi) { moi.remove(); }
      moi = window.L.circleMarker(ll, { radius: 8, color: "#ffffff", weight: 3, fillColor: "#2a7de1", fillOpacity: 1 }).addTo(carte);
      carte.setView(ll, Math.max(carte.getZoom(), 16));
    }, function () { flash("Position refusée ou introuvable"); },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  }

  /* arrivée depuis la carte : on amène la carte du commerce à l'écran */
  function focusStop(tour, id) {
    var el = view.querySelector('.stop[data-id="' + id + '"]');
    if (!el) { return; }
    if (el.hidden) {
      write("appels:filtre", "tous");
      var q = document.getElementById("appels-q");
      if (q) { q.value = ""; }
      Array.prototype.forEach.call(view.querySelectorAll(".filt"), function (p) {
        p.setAttribute("aria-pressed", p.dataset.filtre === "tous" ? "true" : "false");
      });
      appliquerFiltre();
    }
    el.classList.add("focus");
    var bar = document.querySelector(".bar"), filtres = view.querySelector(".filtres");
    var haut = (bar ? bar.offsetHeight : 0) + (filtres ? filtres.offsetHeight : 0) + 12;
    window.scrollTo(0, el.getBoundingClientRect().top + window.pageYOffset - haut);
    if (geoOf(tour, { id: id })) {
      view.insertAdjacentHTML("beforeend", '<a class="retourcarte" href="#/carte/' + encodeURIComponent(tour.id) + "/" + id + '">← Retour à la carte</a>');
    }
  }

  /* ================= rendu : archives ================= */

  function renderArchives() {
    var list = archivees();
    var html = "";

    html += '<header class="intro"><p class="eyebrow">Historique</p><h1>Tournées passées</h1>' +
      '<p class="lede">Les rues déjà faites, avec leurs résultats. Sers-t\'en pour ne jamais repasser deux fois au même endroit.</p></header>';

    var relances = [];
    TOURNEES.concat(APPELS ? [APPELS] : []).forEach(function (t) {
      stopsOf(t).forEach(function (stop) {
        var st = stopState(t.id, stop.id);
        if (st.o === "rappeler" || st.o === "interesse") { relances.push({ tour: t, stop: stop, st: st }); }
      });
    });

    if (relances.length) {
      html += '<section class="followup"><h2>À relancer — ' + relances.length + "</h2><ul>";
      relances.forEach(function (r) {
        var fid = "t:" + r.tour.id + ":" + r.stop.id;
        html += '<li><span class="dot ' + (r.st.o === "interesse" ? "ok" : "wait") + '"></span>' +
          "<b>" + r.stop.nom + "</b>" +
          (r.stop.tel ? ' <a href="tel:' + r.stop.tel + '">' + r.stop.telAffiche + "</a>" : "") +
          ' <a class="minilink" href="#/fiche/' + encodeURIComponent(fid) + '">fiche</a>' +
          "<small>" + dateCourte(r.tour.date) + " · " + r.tour.zone +
          (r.st.n ? " · " + esc(r.st.n) : "") + "</small></li>";
      });
      html += "</ul></section>";
    }

    if (!list.length) {
      html += '<p class="empty">Aucune tournée archivée pour le moment.<br>Clos une tournée depuis l\'onglet « Actuelle » et elle apparaîtra ici.</p>';
    } else {
      html += '<div class="archive">';
      list.forEach(function (t) {
        var s = statsOf(t);
        html += '<a class="arch" href="#/t/' + t.id + '"><div class="arch__date">' + dateCourte(t.date) + "</div>" +
          '<div class="arch__nom">' + t.titre + '</div><div class="arch__zone">' + t.zone + "</div>" +
          '<div class="arch__ligne">';
        if (s.total) {
          html += '<span class="dot"><em>' + s.done + "/" + s.total + "</em> démarchés</span>";
          if (s.interesse) { html += '<span class="dot ok"><em>' + s.interesse + "</em> intéressés</span>"; }
          if (s.rappeler) { html += '<span class="dot wait"><em>' + s.rappeler + "</em> à rappeler</span>"; }
          if (s.refus) { html += '<span class="dot no"><em>' + s.refus + "</em> non</span>"; }
        } else {
          html += '<span class="dot absent">détail non saisi</span>';
        }
        html += "</div></a>";
      });
      html += "</div>";
    }

    view.innerHTML = html;
    activeTour = null;
    setGauge(0);
    document.title = "Tournées passées — Carnet";
  }

  /* ================= rendu : liste des fiches ================= */

  function renderFiches() {
    var list = allFiches();
    var html = "";

    html += '<header class="intro"><p class="eyebrow">Clients &amp; prospects</p><h1>Fiches de renseignement</h1>' +
      '<p class="lede">Une fiche par établissement, remplie pendant le rendez-vous. Elles restent ici, tu peux y revenir et les compléter autant de fois que tu veux.</p>' +
      '<button type="button" class="bigbtn" id="new-fiche">＋ Nouvelle fiche (hors tournée)</button></header>';

    if (!list.length) {
      html += '<p class="empty">Aucune fiche pour le moment.<br>Ouvre un commerce dans l\'onglet « Actuelle » et touche « Fiche client » — elle sera préremplie.</p>';
    } else {
      html += '<div class="archive">';
      list.forEach(function (item) {
        var r = ficheRempli(item.f);
        var pct = Math.round(r.n / r.total * 100);
        var suite = item.f.v.suite;
        html += '<a class="arch fichecard" href="#/fiche/' + encodeURIComponent(item.id) + '">' +
          '<div class="arch__date">' + (item.f.v.date_rdv ? dateCourte(item.f.v.date_rdv) : "modifiée le " + quand(item.f.maj)) + "</div>" +
          '<div class="arch__nom">' + esc(ficheNom(item.id, item.f)) + "</div>" +
          '<div class="arch__zone">' + (esc(item.f.v.activite) || "activité non renseignée") + "</div>" +
          '<div class="arch__ligne">' +
            '<span class="dot ' + (pct > 60 ? "ok" : pct > 25 ? "wait" : "absent") + '"><em>' + r.n + "/" + r.total + "</em> champs</span>" +
            (suite ? '<span class="dot wait">' + esc(suite) + "</span>" : "") +
            (item.f.v.prix ? '<span class="dot ok">' + esc(item.f.v.prix) + "</span>" : "") +
          "</div>" +
          '<div class="bar-mini"><i style="width:' + pct + '%"></i></div>' +
          "</a>";
      });
      html += "</div>";
    }

    html += '<section class="panel"><h2>Sauvegarde</h2>' +
      "<p>Tout est stocké sur cet appareil uniquement. iOS peut effacer les données d'un site resté longtemps sans visite — " +
      "ajoute le carnet à ton écran d'accueil, et exporte de temps en temps.</p>" +
      '<div class="acts wide">' +
      '<button type="button" class="act" id="export-all">Exporter tout</button>' +
      '<label class="act" for="import-file">Restaurer…</label>' +
      '<input type="file" id="import-file" accept="application/json,.json" hidden>' +
      "</div></section>";

    view.innerHTML = html;
    activeTour = null;
    setGauge(0);
    document.title = "Fiches clients — Carnet";
  }

  /* ---------- sauvegarde / restauration ---------- */

  function toutesLesCles() {
    var out = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(NS) === 0) { out.push(k); }
      }
    } catch (e) {}
    return out;
  }

  function exporterTout() {
    var data = {};
    toutesLesCles().forEach(function (k) {
      try { data[k] = localStorage.getItem(k); } catch (e) {}
    });
    var paquet = { format: "carnet-de-tournee", version: 1, exporte: new Date().toISOString(), data: data };
    var d = new Date();
    var nom = "carnet-sauvegarde-" + d.getFullYear() + "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + ".json";

    try {
      var blob = new Blob([JSON.stringify(paquet, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = nom;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      flash("Exporté");
    } catch (e) {
      copier(JSON.stringify(paquet));
      flash("Copié dans le presse-papier");
    }
  }

  function restaurer(file) {
    var fr = new FileReader();
    fr.onload = function () {
      var paquet;
      try { paquet = JSON.parse(fr.result); } catch (e) { flash("Fichier illisible"); return; }
      if (!paquet || paquet.format !== "carnet-de-tournee" || !paquet.data) {
        flash("Ce n'est pas une sauvegarde du carnet");
        return;
      }
      var n = Object.keys(paquet.data).length;
      if (!window.confirm("Restaurer " + n + " entrées ?\n\nCe qui existe déjà sur cet appareil sera écrasé par la sauvegarde.")) { return; }
      Object.keys(paquet.data).forEach(function (k) {
        if (k.indexOf(NS) !== 0) { return; }
        try { localStorage.setItem(k, paquet.data[k]); } catch (e) {}
      });
      flash("Restauré");
      render();
    };
    fr.onerror = function () { flash("Lecture impossible"); };
    fr.readAsText(file);
  }

  /* ================= rendu : une fiche ================= */

  function creerFiche(id) {
    var f = { nom: "", maj: Date.now(), v: {} };
    if (id.indexOf("t:") === 0) {
      var reste = id.slice(2);
      var coupe = reste.lastIndexOf(":");
      var found = findStop(reste.slice(0, coupe), reste.slice(coupe + 1));
      if (found) {
        var stop = found.stop, tour = found.tour;
        var rue = "";
        (tour.rues || []).forEach(function (r) { if (r.code === stop.rue) { rue = r.nom; } });
        var pre = {
          etab: stop.nom,
          activite: (stop.meta || "").split(" · ")[0],
          tel: stop.telAffiche || "",
          adresse: stop.adresse || ((stop.numero && stop.numero !== "—" ? stop.numero + " " : "") + rue)
        };
        PREFILL.forEach(function (k) { if (pre[k]) { f.v[k] = pre[k]; } });
        f.nom = stop.nom;
        f.src = { tour: tour.id, stop: stop.id };
      }
    }
    saveFiche(id, f);
    return f;
  }

  function champHtml(c, val) {
    var h = '<div class="fld' + (c.type === "pastilles" ? " fld--pills" : "") + '">';
    if (c.t) { h += '<label class="fld__lab"' + (c.type === "pastilles" ? "" : ' for="fk-' + c.k + '"') + ">" + c.t + "</label>"; }

    if (c.type === "pastilles") {
      var sel = val === undefined ? (c.multi ? [] : "") : val;
      h += '<div class="pills" data-fk="' + c.k + '" data-multi="' + (c.multi ? "1" : "0") +
           '" role="group"' + (c.t ? ' aria-label="' + esc(c.t) + '"' : "") + ">";
      c.opts.forEach(function (o) {
        var on = c.multi ? (Array.isArray(sel) && sel.indexOf(o) !== -1) : sel === o;
        h += '<button type="button" class="pill" data-val="' + esc(o) + '" aria-pressed="' + (on ? "true" : "false") + '">' + esc(o) + "</button>";
      });
      h += "</div>";
    } else if (c.type === "area") {
      h += '<textarea class="fld__in" id="fk-' + c.k + '" data-fk="' + c.k + '" rows="3">' + esc(val || "") + "</textarea>";
    } else {
      h += '<input class="fld__in" id="fk-' + c.k + '" data-fk="' + c.k + '" type="' + c.type +
           '" value="' + esc(val || "") + '"' +
           (c.type === "tel" ? ' inputmode="tel"' : "") +
           (c.type === "email" ? ' inputmode="email" autocapitalize="off"' : "") + ">";
    }
    h += "</div>";
    return h;
  }

  function renderFiche(id) {
    var f = getFiche(id) || creerFiche(id);
    var r = ficheRempli(f);
    var pct = Math.round(r.n / r.total * 100);
    var html = "";

    html += '<header class="intro fiche-head">';
    html += '<a class="backlink" href="#/fiches">← Toutes les fiches</a>';
    html += '<p class="eyebrow">Fiche de renseignement client</p>';
    html += "<h1>" + esc(ficheNom(id, f)) + "</h1>";
    html += '<p class="lede">' + r.n + " champ" + (r.n > 1 ? "s" : "") + " sur " + r.total +
            " · enregistrée automatiquement" + (f.maj ? ", dernière modif. le " + quand(f.maj) : "") + ".</p>";
    html += '<div class="bar-mini big"><i style="width:' + pct + '%"></i></div>';
    if (f.src) {
      var src = findStop(f.src.tour, f.src.stop);
      if (src) { html += '<p class="fiche-src">Ouverte depuis <a href="' + tourHref(src.tour) + '">' + src.tour.zone + "</a> · " + esc(src.stop.nom) + "</p>"; }
    }
    html += "</header>";

    html += '<form class="fiche" id="fiche-form" data-id="' + esc(id) + '" autocomplete="off">';
    FICHE.forEach(function (sec) {
      html += '<fieldset class="fsec"><legend>' + sec.s + "</legend>";
      sec.champs.forEach(function (c) { html += champHtml(c, f.v[c.k]); });
      html += "</fieldset>";
    });
    html += "</form>";

    html += '<section class="panel"><h2>Récupérer la fiche</h2>' +
      '<p>Copie tout le contenu en texte pour le coller dans un mail, un message, ou te le renvoyer.</p>' +
      '<div class="acts wide">' +
      '<button type="button" class="act" id="copy-fiche">Copier en texte</button>' +
      (navigator.share ? '<button type="button" class="act" id="share-fiche">Partager</button>' : "") +
      '<button type="button" class="act" id="print-fiche">Imprimer / PDF</button>' +
      "</div></section>";

    html += '<footer class="foot"><button type="button" id="del-fiche">Supprimer cette fiche</button></footer>';

    view.innerHTML = html;
    activeTour = null;
    activeFiche = id;
    setGauge(pct / 100);
    document.title = ficheNom(id, f) + " — Fiche client";
  }

  function ficheTexte(id, f) {
    var out = ["FICHE DE RENSEIGNEMENT CLIENT", ficheNom(id, f), ""];
    FICHE.forEach(function (sec) {
      var lignes = [];
      sec.champs.forEach(function (c) {
        var v = f.v[c.k];
        if (estVide(v)) { return; }
        if (Array.isArray(v)) { v = v.join(", "); }
        lignes.push((c.t ? c.t + " : " : "") + v);
      });
      if (lignes.length) {
        out.push(sec.s.toUpperCase());
        out = out.concat(lignes);
        out.push("");
      }
    });
    out.push("— Carnet de tournée · LinkedIA");
    return out.join("\n");
  }

  function copier(txt) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { flash("Copié"); },
        function () { copierVieux(txt); });
    } else { copierVieux(txt); }
  }
  function copierVieux(txt) {
    var ta = document.createElement("textarea");
    ta.value = txt;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, txt.length);
    try { document.execCommand("copy"); flash("Copié"); } catch (e) { flash("Copie impossible"); }
    document.body.removeChild(ta);
  }

  /* ================= indicateur ================= */

  var flashTimer = null;
  function flash(msg) {
    toast.textContent = msg;
    toast.setAttribute("data-on", "1");
    if (flashTimer) { clearTimeout(flashTimer); }
    flashTimer = setTimeout(function () { toast.removeAttribute("data-on"); }, 1400);
  }

  function setGauge(ratio) { gauge.style.width = Math.round(ratio * 100) + "%"; }

  function refreshScore(s) {
    var map = { ".s-ok b": s.interesse, ".s-wait b": s.rappeler, ".s-no b": s.refus, ".s-absent b": s.absent };
    Object.keys(map).forEach(function (sel) {
      var el = view.querySelector(sel);
      if (el) { el.textContent = map[sel]; }
    });
  }

  function majBarreFiche(id) {
    var f = getFiche(id);
    if (!f) { return; }
    var r = ficheRempli(f);
    var pct = Math.round(r.n / r.total * 100);
    var bar = view.querySelector(".bar-mini.big i");
    if (bar) { bar.style.width = pct + "%"; }
    setGauge(pct / 100);
    var h1 = view.querySelector("h1");
    if (h1) { h1.textContent = ficheNom(id, f); }
  }

  /* ================= écouteurs (posés une seule fois) ================= */

  var activeTour = null;
  var activeFiche = null;

  function bindOnce() {
    view.addEventListener("click", function (ev) {
      var t = ev.target;

      /* --- pastilles de fiche --- */
      var pill = t.closest ? t.closest(".pill") : null;
      if (pill && activeFiche) {
        var group = pill.parentNode;
        var key = group.dataset.fk;
        var multi = group.dataset.multi === "1";
        var val = pill.dataset.val;
        var f = getFiche(activeFiche);
        if (!f) { return; }

        if (multi) {
          var arr = Array.isArray(f.v[key]) ? f.v[key].slice() : [];
          var i = arr.indexOf(val);
          if (i === -1) { arr.push(val); } else { arr.splice(i, 1); }
          f.v[key] = arr;
          pill.setAttribute("aria-pressed", i === -1 ? "true" : "false");
        } else {
          var deja = f.v[key] === val;
          f.v[key] = deja ? "" : val;
          Array.prototype.forEach.call(group.querySelectorAll(".pill"), function (p) {
            p.setAttribute("aria-pressed", (!deja && p.dataset.val === val) ? "true" : "false");
          });
        }
        saveFiche(activeFiche, f);
        majBarreFiche(activeFiche);
        flash("Enregistré");
        return;
      }

      if (t.id === "copy-fiche" && activeFiche) {
        copier(ficheTexte(activeFiche, getFiche(activeFiche)));
        return;
      }
      if (t.id === "share-fiche" && activeFiche) {
        var ff = getFiche(activeFiche);
        navigator.share({ title: ficheNom(activeFiche, ff), text: ficheTexte(activeFiche, ff) })
          .catch(function () {});
        return;
      }
      if (t.id === "print-fiche") { window.print(); return; }

      if (t.id === "del-fiche" && activeFiche) {
        if (window.confirm("Supprimer définitivement cette fiche et tout ce qu'elle contient ?")) {
          dropFiche(activeFiche);
          activeFiche = null;
          location.hash = "#/fiches";
        }
        return;
      }

      if (t.id === "new-fiche") {
        var id = "libre:" + Date.now();
        creerFiche(id);
        location.hash = "#/fiche/" + encodeURIComponent(id);
        return;
      }

      if (t.id === "export-all") { exporterTout(); return; }

      /* --- carte --- */
      var ct = t.closest ? t.closest(".cartetour") : null;
      if (ct) { location.hash = "#/carte/" + encodeURIComponent(ct.dataset.tour); return; }
      var co = t.closest ? t.closest(".carteordre") : null;
      if (co) { write("carte:ordre", co.dataset.ordre); render(); return; }
      if (t.id === "carte-geo") { localiser(false); return; }
      if (t.id === "carte-depart") { localiser(true); return; }

      /* --- liste d'appels : filtres + compteur d'appels --- */
      var filt = t.closest ? t.closest(".filt") : null;
      if (filt && estAppels(activeTour)) {
        write("appels:filtre", filt.dataset.filtre);
        Array.prototype.forEach.call(filt.parentNode.querySelectorAll(".filt"), function (p) {
          p.setAttribute("aria-pressed", p === filt ? "true" : "false");
        });
        appliquerFiltre();
        return;
      }
      var telLink = t.closest ? t.closest(".act.tel") : null;
      if (telLink && estAppels(activeTour) && telLink.dataset.stop) {
        /* pas de preventDefault : le téléphone compose normalement */
        var cs = stopState(activeTour.id, telLink.dataset.stop);
        cs.a = (cs.a || 0) + 1;
        cs.t = Date.now();
        setStopState(activeTour.id, telLink.dataset.stop, cs);
        var ligne = view.querySelector('[data-calls="' + telLink.dataset.stop + '"]');
        if (ligne) { ligne.textContent = appelsLigne(cs); }
        return;
      }

      /* --- résultats de visite --- */
      var btn = t.closest ? t.closest(".out") : null;
      if (btn && activeTour) {
        var tour = activeTour;
        var stopId = btn.dataset.stop;
        var v = btn.dataset.v;
        var st = stopState(tour.id, stopId);
        st.o = (st.o === v) ? null : v;
        setStopState(tour.id, stopId, st);

        Array.prototype.forEach.call(btn.parentNode.querySelectorAll(".out"), function (b) {
          b.setAttribute("aria-pressed", (b.dataset.v === st.o) ? "true" : "false");
        });
        var stopEl = view.querySelector('.stop[data-id="' + stopId + '"]');
        if (st.o) { stopEl.setAttribute("data-out", st.o); } else { stopEl.removeAttribute("data-out"); }

        var s = statsOf(tour);
        setGauge(s.total ? s.done / s.total : 0);
        refreshScore(s);
        updateCounts();
        return;
      }

      if (t.id === "close-tour" && activeTour) {
        if (window.confirm("Clore la tournée et l'envoyer aux archives ?")) {
          write("closed:" + activeTour.id, true);
          location.hash = "#/archives";
        }
        return;
      }
      if (t.id === "reopen" && activeTour) {
        drop("closed:" + activeTour.id);
        location.hash = "#/actuelle";
      }
    });

    view.addEventListener("input", function (ev) {
      var t = ev.target;

      if (t.id === "appels-q") { appliquerFiltre(); return; }

      if (activeFiche && t.dataset && t.dataset.fk) {
        var f = getFiche(activeFiche);
        if (!f) { return; }
        f.v[t.dataset.fk] = t.value;
        saveFiche(activeFiche, f);
        majBarreFiche(activeFiche);
        flash("Enregistré");
        return;
      }

      if (activeTour && t.tagName === "TEXTAREA" && t.dataset.stop) {
        var st = stopState(activeTour.id, t.dataset.stop);
        st.n = t.value;
        setStopState(activeTour.id, t.dataset.stop, st);
        var det = t.closest("details");
        if (det) { det.dataset.filled = t.value ? "1" : "0"; }
      }
    });

    view.addEventListener("change", function (ev) {
      var t = ev.target;

      if (t.id === "import-file") {
        if (t.files && t.files[0]) { restaurer(t.files[0]); }
        t.value = "";
        return;
      }

      if (activeFiche && t.dataset && t.dataset.fk) {
        var f = getFiche(activeFiche);
        if (f) { f.v[t.dataset.fk] = t.value; saveFiche(activeFiche, f); majBarreFiche(activeFiche); }
        return;
      }
      if (activeTour && t.type === "checkbox" && t.dataset.kit !== undefined) {
        write("kit:" + activeTour.id + ":" + t.dataset.kit, t.checked);
      }
    });

    /* pas de rechargement de page sur les formulaires */
    view.addEventListener("submit", function (ev) { ev.preventDefault(); });
  }

  /* ================= routeur ================= */

  function render() {
    var hash = location.hash || "#/actuelle";
    if (carte) { carte.remove(); carte = null; }
    moi = null;
    carteJeton++;
    view.innerHTML = "";
    activeFiche = null;
    activeTour = null;
    window.scrollTo(0, 0);

    var mode = "actuelle";

    if (hash.indexOf("#/fiche/") === 0) {
      mode = "fiches";
      renderFiche(decodeURIComponent(hash.slice(8)));
    } else if (hash.indexOf("#/fiches") === 0) {
      mode = "fiches";
      renderFiches();
    } else if (hash.indexOf("#/carte") === 0) {
      /* #/carte  ·  #/carte/<liste>  ·  #/carte/<liste>/<stop> */
      mode = "carte";
      var cp = hash.slice(8).split("/");
      renderCarte(decodeURIComponent(cp[0] || ""), cp[1] || "");
    } else if (hash.indexOf("#/appels") === 0 || MODE === "appels") {
      /* la page séparée : la liste, la carte et les fiches */
      mode = "appels";
      renderAppels();
      var ap = hash.match(/^#\/appels\/([^/?]+)/);
      if (ap && APPELS) { focusStop(APPELS, ap[1]); }
    } else if (hash.indexOf("#/archives") === 0) {
      mode = "archives";
      renderArchives();
    } else if (hash.indexOf("#/t/") === 0) {
      /* #/t/<tournée>  ·  #/t/<tournée>/<stop> (arrivée depuis la carte) */
      var tp = hash.slice(4).split("/");
      var tour = tourById(decodeURIComponent(tp[0]));
      if (estAppels(tour)) { location.hash = "#/appels" + (tp[1] ? "/" + tp[1] : ""); return; }
      if (tour) {
        mode = isClosed(tour) ? "archives" : "actuelle";
        renderTour(tour);
        if (tp[1]) { focusStop(tour, tp[1]); }
      } else { location.hash = "#/actuelle"; return; }
    } else {
      var cur = courante();
      if (cur) { renderTour(cur); }
      else {
        view.innerHTML = '<header class="intro"><p class="eyebrow">Aucune tournée en cours</p>' +
          "<h1>Rien à démarcher aujourd'hui</h1>" +
          '<p class="lede">Toutes les tournées sont closes. Demande-moi d\'en préparer une nouvelle, ou consulte l\'historique.</p>' +
          '<a class="backlink" href="#/archives">Voir les tournées passées →</a></header>';
        setGauge(0);
      }
    }

    [[tabActuelle, "actuelle"], [tabAppels, "appels"], [tabCarte, "carte"], [tabArchives, "archives"], [tabFiches, "fiches"]]
      .forEach(function (p) { if (p[0]) { p[0].setAttribute("aria-current", mode === p[1] ? "page" : "false"); } });

    updateCounts();
  }

  function setCount(tab, txt) {
    var n = tab && tab.querySelector(".n");
    if (n) { n.textContent = txt; }
  }

  function updateCounts() {
    var cur = courante();
    var s = cur ? statsOf(cur) : { done: 0, total: 0 };
    var sa = APPELS ? statsOf(APPELS) : { done: 0, total: 0 };
    setCount(tabActuelle, s.total ? s.done + "/" + s.total : "");
    setCount(tabAppels, sa.total ? sa.done + "/" + sa.total : "");
    setCount(tabArchives, archivees().length || "");
    setCount(tabFiches, allFiches().length || "");
  }

  /* ================= thème ================= */

  function applyTheme(mode) {
    if (mode === "auto") { document.documentElement.removeAttribute("data-theme"); }
    else { document.documentElement.setAttribute("data-theme", mode); }
    themeBtn.textContent = mode === "dark" ? "☾" : mode === "light" ? "☀" : "◐";
    themeBtn.setAttribute("aria-label",
      "Thème : " + (mode === "dark" ? "sombre" : mode === "light" ? "clair" : "automatique"));
  }

  themeBtn.addEventListener("click", function () {
    var order = ["auto", "light", "dark"];
    var cur = read("theme", "auto");
    var next = order[(order.indexOf(cur) + 1) % order.length];
    write("theme", next);
    applyTheme(next);
  });

  applyTheme(read("theme", "auto"));

  /* ================= démarrage ================= */

  bindOnce();
  window.addEventListener("hashchange", render);
  render();

  /* le service worker du carnet ne couvre que /tournee/ */
  if (MODE === "carnet" && "serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
