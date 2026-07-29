/* ==================================================================
   Carnet de tournée — logique
   Aucune dépendance. Tout est stocké en local sur l'appareil.
   ================================================================== */
(function () {
  "use strict";

  var NS = "carnet:v1:";
  var FPREF = "fiche:";

  var view = document.getElementById("view");
  var tabActuelle = document.getElementById("tab-actuelle");
  var tabArchives = document.getElementById("tab-archives");
  var tabFiches = document.getElementById("tab-fiches");
  var gauge = document.getElementById("gauge");
  var themeBtn = document.getElementById("theme");
  var toast = document.getElementById("toast");

  var OUTCOMES = [
    { v: "interesse", t: "Intéressé" },
    { v: "rappeler", t: "À rappeler" },
    { v: "refus", t: "Non" },
    { v: "absent", t: "Absent" }
  ];

  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin",
              "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  var JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

  var TOURNEES = window.TOURNEES || [];
  var FICHE = window.FICHE || [];
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
    return null;
  }
  function courante() {
    for (var i = 0; i < TOURNEES.length; i++) { if (!isClosed(TOURNEES[i])) { return TOURNEES[i]; } }
    return null;
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
    if (stop.tel) { a.push('<a class="act tel" href="tel:' + stop.tel + '">' + stop.telAffiche + "</a>"); }
    if (stop.google) {
      a.push('<a class="act" href="https://www.google.com/search?q=' +
        encodeURIComponent(stop.google) + '" target="_blank" rel="noopener">Google</a>');
    }
    if (stop.lien) {
      a.push('<a class="act" href="' + stop.lien.url + '" target="_blank" rel="noopener">' + stop.lien.t + "</a>");
    }
    var fid = "t:" + tour.id + ":" + stop.id;
    var f = getFiche(fid);
    a.push('<a class="act fiche' + (f ? " on" : "") + '" href="#/fiche/' + encodeURIComponent(fid) + '">' +
      (f ? "Fiche ✓" : "Fiche client") + "</a>");
    return '<div class="acts">' + a.join("") + "</div>";
  }

  function outcomeHtml(tourId, stop) {
    var cur = stopState(tourId, stop.id).o;
    return '<div class="outcome" role="group" aria-label="Résultat de la visite">' +
      OUTCOMES.map(function (o) {
        return '<button type="button" class="out" data-stop="' + stop.id + '" data-v="' + o.v +
          '" aria-pressed="' + (cur === o.v ? "true" : "false") + '">' + o.t + "</button>";
      }).join("") + "</div>";
  }

  function stopHtml(tour, stop) {
    var st = stopState(tour.id, stop.id);
    return '<div class="stop ' + stop.rue + '" data-id="' + stop.id + '"' +
        (st.o ? ' data-out="' + st.o + '"' : "") + ">" +
        '<div class="rail"><span class="node">' + stop.n + "</span></div>" +
        '<div class="card">' +
          '<div class="card__top"><span class="card__num">' + stop.numero + "</span>" +
          '<h3 class="card__name">' + stop.nom + "</h3></div>" +
          '<p class="card__meta">' + stop.meta + "</p>" +
          '<p class="card__why">' + stop.pourquoi + "</p>" +
          chipsHtml(stop.chips) +
          actsHtml(tour, stop) +
          outcomeHtml(tour.id, stop) +
          '<details class="notes" data-filled="' + (st.n ? "1" : "0") + '">' +
            "<summary>Notes rapides" + (st.n ? " ●" : "") + "</summary>" +
            '<textarea data-stop="' + stop.id + '" placeholder="Un mot sur le passage. Le détail va dans la fiche client."></textarea>' +
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

    html += '<footer class="foot">';
    if (closed) {
      html += '<a class="backlink" href="#/archives">← Retour aux archives</a><br>' +
              '<button type="button" id="reopen">Remettre cette tournée en cours</button>';
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

  /* ================= rendu : archives ================= */

  function renderArchives() {
    var list = archivees();
    var html = "";

    html += '<header class="intro"><p class="eyebrow">Historique</p><h1>Tournées passées</h1>' +
      '<p class="lede">Les rues déjà faites, avec leurs résultats. Sers-t\'en pour ne jamais repasser deux fois au même endroit.</p></header>';

    var relances = [];
    TOURNEES.forEach(function (t) {
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
          adresse: (stop.numero && stop.numero !== "—" ? stop.numero + " " : "") + rue
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
      if (src) { html += '<p class="fiche-src">Ouverte depuis <a href="#/t/' + src.tour.id + '">' + src.tour.zone + "</a> · " + esc(src.stop.nom) + "</p>"; }
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
    } else if (hash.indexOf("#/archives") === 0) {
      mode = "archives";
      renderArchives();
    } else if (hash.indexOf("#/t/") === 0) {
      var tour = tourById(hash.slice(4));
      if (tour) {
        mode = isClosed(tour) ? "archives" : "actuelle";
        renderTour(tour);
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

    tabActuelle.setAttribute("aria-current", mode === "actuelle" ? "page" : "false");
    tabArchives.setAttribute("aria-current", mode === "archives" ? "page" : "false");
    tabFiches.setAttribute("aria-current", mode === "fiches" ? "page" : "false");

    updateCounts();
  }

  function updateCounts() {
    var cur = courante();
    var s = cur ? statsOf(cur) : { done: 0, total: 0 };
    tabActuelle.querySelector(".n").textContent = s.total ? s.done + "/" + s.total : "";
    tabArchives.querySelector(".n").textContent = archivees().length || "";
    tabFiches.querySelector(".n").textContent = allFiches().length || "";
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

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
