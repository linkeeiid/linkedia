/* ==================================================================
   Carnet de tournée — logique
   Aucune dépendance. Tout est stocké en local sur le téléphone.
   ================================================================== */
(function () {
  "use strict";

  var NS = "carnet:v1:";
  var view = document.getElementById("view");
  var tabActuelle = document.getElementById("tab-actuelle");
  var tabArchives = document.getElementById("tab-archives");
  var gauge = document.getElementById("gauge");
  var themeBtn = document.getElementById("theme");

  var OUTCOMES = [
    { v: "interesse", t: "Intéressé", cls: "ok" },
    { v: "rappeler", t: "À rappeler", cls: "wait" },
    { v: "refus", t: "Non", cls: "no" },
    { v: "absent", t: "Absent", cls: "absent" }
  ];

  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin",
              "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  var JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

  /* ---------------- stockage ---------------- */

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

  function stopState(tourId, stopId) {
    return read("st:" + tourId + ":" + stopId, { o: null, n: "" });
  }
  function setStopState(tourId, stopId, st) {
    write("st:" + tourId + ":" + stopId, st);
  }

  function isClosed(tour) {
    return tour.statut === "archivee" || read("closed:" + tour.id, false) === true;
  }

  /* ---------------- données ---------------- */

  var TOURNEES = window.TOURNEES || [];

  function tourById(id) {
    for (var i = 0; i < TOURNEES.length; i++) {
      if (TOURNEES[i].id === id) { return TOURNEES[i]; }
    }
    return null;
  }
  function courante() {
    for (var i = 0; i < TOURNEES.length; i++) {
      if (!isClosed(TOURNEES[i])) { return TOURNEES[i]; }
    }
    return null;
  }
  function archivees() {
    return TOURNEES.filter(isClosed).sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    });
  }
  function stopsOf(tour) {
    var out = [];
    (tour.blocs || []).forEach(function (b) {
      (b.stops || []).forEach(function (s) { out.push(s); });
    });
    return out;
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

  /* ---------------- rendu : une tournée ---------------- */

  function chipsHtml(chips) {
    if (!chips || !chips.length) { return ""; }
    return '<div class="chips">' + chips.map(function (c) {
      var cls = "chip" + (c.flag ? " flag" : "") + (c.web ? " web" : "");
      return '<span class="' + cls + '">' + c.t + "</span>";
    }).join("") + "</div>";
  }

  function actsHtml(stop) {
    var a = [];
    if (stop.tel) {
      a.push('<a class="act tel" href="tel:' + stop.tel + '">' + stop.telAffiche + "</a>");
    }
    if (stop.google) {
      a.push('<a class="act" href="https://www.google.com/search?q=' +
        encodeURIComponent(stop.google) + '" target="_blank" rel="noopener">Google</a>');
    }
    if (stop.lien) {
      a.push('<a class="act" href="' + stop.lien.url + '" target="_blank" rel="noopener">' + stop.lien.t + "</a>");
    }
    return a.length ? '<div class="acts">' + a.join("") + "</div>" : "";
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
          '<div class="card__top">' +
            '<span class="card__num">' + stop.numero + "</span>" +
            '<h3 class="card__name">' + stop.nom + "</h3>" +
          "</div>" +
          '<p class="card__meta">' + stop.meta + "</p>" +
          '<p class="card__why">' + stop.pourquoi + "</p>" +
          chipsHtml(stop.chips) +
          actsHtml(stop) +
          outcomeHtml(tour.id, stop) +
          '<details class="notes" data-filled="' + (st.n ? "1" : "0") + '">' +
            "<summary>Notes" + (st.n ? " ●" : "") + "</summary>" +
            '<textarea data-stop="' + stop.id + '" placeholder="Interlocuteur, objection, suite à donner…"></textarea>' +
          "</details>" +
        "</div>" +
      "</div>";
  }

  function renderTour(tour) {
    var closed = isClosed(tour);
    var st = statsOf(tour);
    var html = "";

    html += '<header class="intro">';
    html += '<p class="eyebrow">' + (closed ? "Tournée close · " : "") + dateLongue(tour.date) +
            " · " + tour.zone + "</p>";
    html += "<h1>" + tour.titre + "</h1>";
    if (tour.resume) { html += '<p class="lede">' + tour.resume + "</p>"; }

    if (st.total) {
      html += '<div class="score">';
      html += '<div class="s-ok"><b>' + st.interesse + "</b><span>intéressés</span></div>";
      html += '<div class="s-wait"><b>' + st.rappeler + "</b><span>à rappeler</span></div>";
      html += '<div class="s-no"><b>' + st.refus + "</b><span>non</span></div>";
      html += '<div class="s-absent"><b>' + st.absent + "</b><span>absents</span></div>";
      html += "</div>";
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
        html += '<div class="pause"><div class="pause__rail"></div>' +
          '<p class="pause__msg"><strong>' + bloc.heure + " · " + bloc.quoi + ".</strong> " +
          bloc.pause + "</p></div>";
        return;
      }
      html += '<section class="block"><div class="block__head">' +
        '<span class="block__time">' + bloc.heure + "</span>" +
        '<span class="block__what">' + bloc.quoi + "</span></div>";
      bloc.stops.forEach(function (s) { html += stopHtml(tour, s); });
      html += "</section>";
    });

    if (!st.total) {
      html += '<p class="empty">Aucun commerce saisi pour cette tournée.</p>';
    }

    if (tour.equipes && tour.equipes.length) {
      html += '<section class="panel"><h2>Ne pas y entrer</h2>' +
        "<p>Ces commerces ont déjà un site correct. Passe devant sans t'arrêter.</p>" +
        '<ul class="skiplist">';
      tour.equipes.forEach(function (e) {
        html += "<li><b>" + e.nom + "</b> <code>" + e.site + "</code></li>";
      });
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
      html += '<a class="backlink" href="#/archives">← Retour aux archives</a><br>';
      html += '<button type="button" id="reopen">Remettre cette tournée en cours</button>';
    } else {
      html += "<p>Tes résultats et tes notes restent enregistrés sur ce téléphone, même si tu fermes la page.</p>";
      html += '<button type="button" id="close-tour">Clore la tournée et l\'envoyer aux archives</button>';
    }
    html += "</footer>";

    view.innerHTML = html;

    /* remplir les textarea après insertion (jamais via innerHTML) */
    stopsOf(tour).forEach(function (stop) {
      var ta = view.querySelector('textarea[data-stop="' + stop.id + '"]');
      if (ta) { ta.value = stopState(tour.id, stop.id).n || ""; }
    });

    activeTour = tour;
    setGauge(st.total ? st.done / st.total : 0);
    document.title = "Tournée " + tour.zone + " — Carnet";
  }

  /* Les écouteurs sont posés UNE fois sur #view et lisent activeTour :
     les reposer à chaque rendu les empilerait. */
  var activeTour = null;

  function bindOnce() {
    view.addEventListener("click", function (ev) {
      var tour = activeTour;
      if (!tour) { return; }
      var btn = ev.target.closest ? ev.target.closest(".out") : null;
      if (btn) {
        var stopId = btn.dataset.stop;
        var val = btn.dataset.v;
        var st = stopState(tour.id, stopId);
        st.o = (st.o === val) ? null : val;
        setStopState(tour.id, stopId, st);

        var group = btn.parentNode;
        Array.prototype.forEach.call(group.querySelectorAll(".out"), function (b) {
          b.setAttribute("aria-pressed", (b.dataset.v === st.o) ? "true" : "false");
        });
        var stopEl = view.querySelector('.stop[data-id="' + stopId + '"]');
        if (st.o) { stopEl.setAttribute("data-out", st.o); }
        else { stopEl.removeAttribute("data-out"); }

        var s = statsOf(tour);
        setGauge(s.total ? s.done / s.total : 0);
        refreshScore(s);
        return;
      }

      if (ev.target.id === "close-tour") {
        if (window.confirm("Clore la tournée et l'envoyer aux archives ?")) {
          write("closed:" + tour.id, true);
          location.hash = "#/archives";
        }
        return;
      }
      if (ev.target.id === "reopen") {
        drop("closed:" + tour.id);
        location.hash = "#/actuelle";
      }
    });

    view.addEventListener("input", function (ev) {
      var tour = activeTour;
      var t = ev.target;
      if (tour && t.tagName === "TEXTAREA" && t.dataset.stop) {
        var st = stopState(tour.id, t.dataset.stop);
        st.n = t.value;
        setStopState(tour.id, t.dataset.stop, st);
        var det = t.closest("details");
        if (det) { det.dataset.filled = t.value ? "1" : "0"; }
      }
    });

    view.addEventListener("change", function (ev) {
      var tour = activeTour;
      var t = ev.target;
      if (tour && t.type === "checkbox" && t.dataset.kit !== undefined) {
        write("kit:" + tour.id + ":" + t.dataset.kit, t.checked);
      }
    });
  }

  function refreshScore(s) {
    var map = { ".s-ok b": s.interesse, ".s-wait b": s.rappeler, ".s-no b": s.refus, ".s-absent b": s.absent };
    Object.keys(map).forEach(function (sel) {
      var el = view.querySelector(sel);
      if (el) { el.textContent = map[sel]; }
    });
  }

  function setGauge(ratio) {
    gauge.style.width = Math.round(ratio * 100) + "%";
  }

  /* ---------------- rendu : archives ---------------- */

  function renderArchives() {
    var list = archivees();
    var html = "";

    html += '<header class="intro">';
    html += '<p class="eyebrow">Historique</p>';
    html += "<h1>Tournées passées</h1>";
    html += '<p class="lede">Les rues déjà faites, avec leurs résultats. Sers-t\'en pour ne jamais repasser deux fois au même endroit.</p>';
    html += "</header>";

    /* relances toutes tournées confondues */
    var relances = [];
    TOURNEES.forEach(function (t) {
      stopsOf(t).forEach(function (stop) {
        var st = stopState(t.id, stop.id);
        if (st.o === "rappeler" || st.o === "interesse") {
          relances.push({ tour: t, stop: stop, st: st });
        }
      });
    });

    if (relances.length) {
      html += '<section class="followup"><h2>À relancer — ' + relances.length + "</h2><ul>";
      relances.forEach(function (r) {
        html += "<li>";
        html += '<span class="dot ' + (r.st.o === "interesse" ? "ok" : "wait") + '"></span>';
        html += "<b>" + r.stop.nom + "</b>";
        if (r.stop.tel) { html += ' <a href="tel:' + r.stop.tel + '">' + r.stop.telAffiche + "</a>"; }
        html += "<small>" + dateCourte(r.tour.date) + " · " + r.tour.zone +
                (r.st.n ? " · " + escapeText(r.st.n) : "") + "</small>";
        html += "</li>";
      });
      html += "</ul></section>";
    }

    if (!list.length) {
      html += '<p class="empty">Aucune tournée archivée pour le moment.<br>Clos une tournée depuis l\'onglet « Actuelle » et elle apparaîtra ici.</p>';
    } else {
      html += '<div class="archive">';
      list.forEach(function (t) {
        var s = statsOf(t);
        html += '<a class="arch" href="#/t/' + t.id + '">';
        html += '<div class="arch__date">' + dateCourte(t.date) + "</div>";
        html += '<div class="arch__nom">' + t.titre + "</div>";
        html += '<div class="arch__zone">' + t.zone + "</div>";
        html += '<div class="arch__ligne">';
        if (s.total) {
          html += '<span class="dot">' + "<em>" + s.done + "/" + s.total + "</em> démarchés</span>";
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

  function escapeText(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---------------- routeur ---------------- */

  function render() {
    var hash = location.hash || "#/actuelle";
    view.innerHTML = "";
    window.scrollTo(0, 0);

    var mode = "actuelle";
    var tour = null;

    if (hash.indexOf("#/t/") === 0) {
      tour = tourById(hash.slice(4));
      mode = tour && !isClosed(tour) ? "actuelle" : "archives";
    } else if (hash.indexOf("#/archives") === 0) {
      mode = "archives";
    } else {
      tour = courante();
    }

    tabActuelle.setAttribute("aria-current", mode === "actuelle" ? "page" : "false");
    tabArchives.setAttribute("aria-current", mode === "archives" ? "page" : "false");

    if (hash.indexOf("#/archives") === 0) {
      renderArchives();
    } else if (tour) {
      renderTour(tour);
    } else {
      view.innerHTML = '<header class="intro"><p class="eyebrow">Aucune tournée en cours</p>' +
        "<h1>Rien à démarcher aujourd'hui</h1>" +
        '<p class="lede">Toutes les tournées sont closes. Demande-moi d\'en préparer une nouvelle, ou consulte l\'historique.</p>' +
        '<a class="backlink" href="#/archives">Voir les tournées passées →</a></header>';
      setGauge(0);
    }

    updateCounts();
  }

  function updateCounts() {
    var cur = courante();
    var s = cur ? statsOf(cur) : { done: 0, total: 0 };
    tabActuelle.querySelector(".n").textContent = s.total ? s.done + "/" + s.total : "";
    tabArchives.querySelector(".n").textContent = archivees().length || "";
  }

  /* ---------------- thème ---------------- */

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

  /* ---------------- démarrage ---------------- */

  bindOnce();
  window.addEventListener("hashchange", render);
  render();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
