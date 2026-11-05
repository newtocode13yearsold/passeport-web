/* Passeport Web — router, pages and search.
 * Routes are plain hash names (letters, digits, hyphens) so they also work as shareable artifact links:
 *   #accueil  #pays  #pays-fr  #pays-fr--taxes  #manuels  #manuel-:id  #outils  #outil-:id  #outil-:id--fr
 *   #liens  #a-propos */
(function () {
  var PW = window.PW, esc = PW.esc, app = document.getElementById('app');

  /** French spacing: non-breaking space before : ; ? ! » and inside numbers/units. */
  PW.fr = function (s) {
    return String(s == null ? '' : s)
      .replace(/ ([:;?!»])/g, ' $1')
      .replace(/« /g, '« ')
      .replace(/(\d) (?=\d{3}\b)/g, '$1 ')
      .replace(/(\d) (?=(€|%|£|\$|CHF|AUD|R\$|₹|lakh|km|h\b|jours|mois|ans|heures|salariés|personnes|caractères)\b|€|%|£|₹)/g, '$1 ');
  };
  var fr = PW.fr;

  var COUNTRIES = function () { return PW.countries.filter(function (c) { return c.code !== 'eu'; }); };
  var byCode = function (code) { return PW.countries.filter(function (c) { return c.code === code; })[0]; };
  var GROUP_ORDER = ['Union européenne', 'Europe hors UE', 'Amériques', 'Asie et Océanie'];
  var TOOL_GROUPS = ['Pages légales', 'Démarches', 'Référencement', 'Technique', 'Design et accessibilité'];

  var CHANGES = [
    ['2025-06', 'Union européenne', 'L’acte européen sur l’accessibilité s’applique aux sites de commerce en ligne.', 'eu', 'accessibilite'],
    ['2025-07', 'Union européenne', 'Fin de la plateforme européenne de règlement des litiges : le lien n’est plus obligatoire dans les CGV.', 'eu', 'vente'],
    ['2026-02', 'Royaume-Uni', 'Certains cookies de statistiques et de fonctionnement sont dispensés de consentement ; immatriculer une Ltd coûte 100 £.', 'uk', 'donnees'],
    ['2026-04', 'Royaume-Uni', 'Making Tax Digital : les sole traders au-delà de 50 000 £ tiennent leurs comptes avec un logiciel compatible.', 'uk', 'taxes'],
    ['2026-04', 'États-Unis', 'Règle COPPA renforcée pour les sites qui visent les moins de 13 ans.', 'us', 'donnees'],
    ['2026-08', 'Union européenne', 'Obligations de transparence de l’AI Act : un chatbot doit se présenter comme une IA.', 'eu', 'ia'],
    ['2026-09', 'France', 'Toutes les entreprises doivent pouvoir recevoir des factures électroniques.', 'fr', 'vente'],
    ['2026-12', 'Australie', 'Les décisions automatisées doivent être décrites dans la privacy policy.', 'au', 'donnees'],
    ['2027-05', 'Inde', 'Fin du délai de mise en conformité au DPDP Act (consentement, sécurité, fuites de données).', 'in', 'donnees']
  ];

  /* ---------- small renderers ---------- */
  function crumbs(list) {
    return '<nav class="crumbs" aria-label="Fil d’Ariane"><a href="#accueil">Accueil</a>' + list.map(function (c) {
      return '<span aria-hidden="true">/</span>' + (c[1] ? '<a href="' + c[1] + '">' + esc(c[0]) + '</a>' : '<span aria-current="page">' + esc(c[0]) + '</span>');
    }).join('') + '</nav>';
  }
  function linkList(links) {
    return '<ul class="linklist">' + links.map(function (l) {
      return '<li><a href="' + esc(l.u) + '" target="_blank" rel="noopener">' + esc(l.t) + '</a><span class="host">' + esc(PW.host(l.u)) + '</span>' +
        (l.d ? '<span class="d">' + fr(esc(l.d)) + '</span>' : '') + '</li>';
    }).join('') + '</ul>';
  }
  function toolChips(ids, pays) {
    return '<div class="related-tools">' + ids.map(function (id) {
      var t = PW.toolById(id); if (!t) return '';
      return '<a class="chip" href="#outil-' + id + (pays ? '--' + pays : '') + '">' + PW.icon(t.icon) + esc(t.t) + '</a>';
    }).join('') + '</div>';
  }
  function setTitle(t) { document.title = t ? t + ' — Passeport Web' : 'Passeport Web'; }

  function guilloche() {
    var p = '', W = 1200, H = 560;
    for (var i = 0; i < 22; i++) {
      var d = '';
      for (var x = 0; x <= W; x += 10) {
        var y = H * 0.56 + (i - 11) * 9 + 46 * Math.sin(x / 70 + i * 0.42) + 18 * Math.sin(x / 23 - i * 0.3);
        d += (x === 0 ? 'M' : 'L') + x + ' ' + y.toFixed(1);
      }
      p += '<path d="' + d + '"/>';
    }
    for (var k = 0; k < 12; k++) {
      var r = '';
      for (var a = 0; a <= 360; a += 2) {
        var t = a * Math.PI / 180, rad = 150 + 26 * Math.sin(9 * t + k * 0.52);
        r += (a === 0 ? 'M' : 'L') + (980 + rad * Math.cos(t)).toFixed(1) + ' ' + (140 + rad * Math.sin(t)).toFixed(1);
      }
      p += '<path d="' + r + 'Z"/>';
    }
    return '<svg class="guilloche" viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + p + '</svg>';
  }

  function stampsHtml() {
    return COUNTRIES().map(function (c, i) {
      var s = c.stamp || {};
      return '<a class="stamp ' + (s.shape || 'rect') + ' ink-' + (s.ink || 'red') + ' stamp-in" href="#pays-' + c.code + '" data-r="' + (s.r || -3) + '" data-d="' + (0.15 + i * 0.07).toFixed(2) + '">' +
        '<span>' + PW.flag(c.code, 'st-flag', c.name) + '<span class="st-name">' + esc(c.name) + '</span><span class="st-date">' + esc(c.verified.split('-').reverse().join('/')) + '</span></span></a>';
    }).join('');
  }
  function applyStampVars(root) {
    PW.$$('.stamp[data-r]', root).forEach(function (s) {
      s.style.setProperty('--r', s.getAttribute('data-r') + 'deg');
      s.style.setProperty('--d', s.getAttribute('data-d') + 's');
    });
  }

  /* ---------- pages ---------- */
  function home() {
    setTitle('');
    var steps = [
      ['Déclarer l’activité', 'Si le site rapporte de l’argent, il faut presque toujours un statut.', '#pays', 'Choisir le pays'],
      ['Réserver le domaine', 'Court, facile à dire, avec la bonne extension.', '#manuel-nom-de-domaine', 'Lire le manuel'],
      ['Construire et héberger', 'Sans code, avec un CMS ou à la main ; souvent gratuit.', '#manuel-mise-en-ligne', 'Mettre en ligne'],
      ['Écrire les pages légales', 'Mentions légales, confidentialité, CGV.', '#outil-mentions-legales', 'Générer'],
      ['Régler cookies et données', 'Consentement, statistiques respectueuses.', '#outil-banniere-cookies', 'Créer la bannière'],
      ['Vérifier et lancer', 'Mobile, sécurité, référencement.', '#outil-checklist', 'Ouvrir la checklist']
    ];
    var tools = PW.tools.slice(0, 6);
    app.innerHTML =
      '<section class="hero">' + guilloche() +
        '<div class="hero-inner">' +
          '<div><h1>Votre site, en règle dans 12 pays.</h1>' +
          '<p class="lede">Les démarches pour déclarer votre site et votre activité, pays par pays. Des générateurs gratuits pour les pages obligatoires. Et les liens officiels pour tout vérifier.</p>' +
          '<div class="hero-cta"><a class="btn" href="#pays">Choisir mon pays</a><a class="btn ghost" href="#outils">Voir les ' + PW.tools.length + ' outils</a></div></div>' +
          '<div class="passport-page" aria-label="Les 12 pays couverts"><div class="passport-head"><span>Visas</span><span>Vérifié en ' + PW.monthName('2026-11') + '</span></div>' +
          '<div class="stamps">' + stampsHtml() + '</div>' +
          '<div class="mrz" aria-hidden="true">P&lt;WEB&lt;&lt;PASSEPORT&lt;&lt;FRA&lt;BEL&lt;CHE&lt;DEU&lt;ESP&lt;ITA&lt;GBR&lt;USA&lt;CAN&lt;IND&lt;AUS&lt;BRA&lt;&lt;&lt;&lt;</div></div>' +
        '</div></section>' +
      '<div class="page">' +
        '<section class="block"><h2>Par où commencer</h2><p class="sub">Le parcours complet tient en six étapes. Chacune renvoie au bon manuel ou au bon outil.</p>' +
          '<ol class="route">' + steps.map(function (s) { return '<li><strong>' + esc(s[0]) + '</strong><p>' + fr(esc(s[1])) + '</p><a href="' + s[2] + '">' + esc(s[3]) + '</a></li>'; }).join('') + '</ol></section>' +
        '<section class="block"><h2>Ce qui change en 2026</h2><p class="sub">Les nouvelles règles récentes ou à venir, par date.</p>' +
          '<ol class="timeline">' + CHANGES.map(function (c) {
            return '<li><a class="tl" href="#pays-' + c[3] + '--' + c[4] + '"><span class="tl-date">' + esc(PW.monthName(c[0])) + '</span><span><strong>' + esc(c[1]) + '</strong> ' + fr(esc(c[2])) + '</span></a></li>';
          }).join('') + '</ol></section>' +
        '<section class="block"><h2>Outils gratuits</h2><p class="sub">Tout se passe dans votre navigateur : rien n’est envoyé à un serveur.</p>' +
          '<div class="tool-groups">' + [tools.slice(0, 3), tools.slice(3, 6)].map(function (col) {
            return '<div>' + col.map(toolRow).join('') + '</div>';
          }).join('') + '</div><p class="mt"><a href="#outils">Voir les ' + PW.tools.length + ' outils</a></p></section>' +
        '<section class="block"><h2>Manuels pratiques</h2><p class="sub">Valables dans tous les pays : domaine, hébergement, email, référencement, sécurité.</p>' +
          guideList(PW.guides.slice(0, 6)) + '<p class="mt"><a href="#manuels">Voir les ' + PW.guides.length + ' manuels</a></p></section>' +
      '</div>';
    applyStampVars(app);
  }

  function toolRow(t) {
    return '<a class="tool-row" href="#outil-' + t.id + '"><span class="ic-box">' + PW.icon(t.icon) + '</span><span><span class="t-name">' + esc(t.t) + '</span><br><span class="t-desc">' + fr(esc(t.d)) + '</span></span></a>';
  }
  function guideList(list) {
    return '<ul class="guide-list">' + list.map(function (g) {
      return '<li><a href="#manuel-' + g.id + '"><span class="g-t">' + esc(g.t) + '</span><span class="g-d">' + fr(esc(g.d)) + '</span><span class="g-meta">' + PW.icon('clock') + ' ' + fr(esc(g.time)) + ', ' + g.steps.length + ' étapes' + premiumTag(g) + '</span></a></li>';
    }).join('') + '</ul>';
  }
  function premiumTag(g) {
    if (!g.premium) return '';
    return PW.premium.isUnlocked(g) ? '<span class="tag free">débloqué</span>' : '<span class="tag premium">' + PW.icon('lock') + 'premium</span>';
  }

  function countriesPage() {
    setTitle('Les 12 pays');
    var list = COUNTRIES();
    var groups = GROUP_ORDER.map(function (g) {
      var items = list.filter(function (c) { return c.group === g; });
      return '<section><h2>' + esc(g) + '</h2><ul class="country-list">' + items.map(countryItem).join('') + '</ul></section>';
    }).join('');
    var eu = byCode('eu');
    app.innerHTML = '<div class="page">' + crumbs([['Pays']]) +
      '<div class="page-head"><h1>Choisissez votre pays</h1><p>Une fiche par pays : déclarer l’activité, nom de domaine, pages obligatoires, données personnelles, vente en ligne, taxes et accessibilité. Chaque étape se coche.</p></div>' +
      '<div class="country-groups">' + groups +
        '<section><h2>Règles communes</h2><ul class="country-list">' + countryItem(eu) + '</ul></section></div>' +
      '<section class="block"><h2>Les 12 pays en un tableau</h2><p class="sub">Les réponses courtes. Les détails et les sources sont dans chaque fiche.</p>' +
        '<div class="tbl"><table class="compare"><thead><tr><th>Pays</th><th>Déclarer le site ?</th><th>Page obligatoire</th><th>Autorité des données</th><th>Seuil de taxe</th></tr></thead><tbody>' +
        list.map(function (c) {
          return '<tr><th scope="row"><a href="#pays-' + c.code + '">' + PW.flag(c.code, 'flag', c.name) + ' ' + esc(c.name) + '</a></th><td>' + fr(esc(c.facts[0][1])) + '</td><td>' + fr(esc(c.facts[2][1])) + '</td><td>' + fr(esc(c.facts[3][1])) + '</td><td>' + fr(esc(c.facts[4][1])) + '</td></tr>';
        }).join('') + '</tbody></table></div></section></div>';
  }
  function countryItem(c) {
    return '<li><a href="#pays-' + c.code + '">' + PW.flag(c.code, 'flag', c.name) + '<span class="c-name">' + esc(c.name) + '</span><span class="c-sum">' + fr(esc(c.summary)) + '</span></a></li>';
  }

  function countryPage(code, params) {
    var c = byCode(code);
    if (!c) return notFound();
    setTitle(c.name);
    var secs = c.sections.map(function (s, si) {
      return '<section class="sec" id="sec-' + s.id + '"><h2><span class="n">' + (si + 1) + '</span>' + esc(s.t) + '</h2>' +
        (s.i ? '<p class="intro">' + fr(s.i) + '</p>' : '') +
        '<ul class="todo">' + s.do.map(function (txt, i) {
          var k = PW.checkKey(c.code, s.id, i);
          return '<li><label><input type="checkbox" data-key="' + k + '"' + (PW.store.get(k, false) ? ' checked' : '') + '><span>' + fr(txt) + '</span></label></li>';
        }).join('') + '</ul>' +
        (s.n || []).map(function (n) { return '<p class="note ' + (n[0] === 'info' ? '' : n[0]) + '">' + fr(n[1]) + '</p>'; }).join('') +
        '</section>';
    }).join('');
    var members = c.code === 'eu' ? '<p class="note">Fiches des pays de l’UE : ' + COUNTRIES().filter(function (x) { return x.eu; }).map(function (x) { return '<a href="#pays-' + x.code + '">' + esc(x.name) + '</a>'; }).join(', ') + '.</p>' : '';
    var euNote = c.eu ? '<p class="note">' + PW.flag('eu', 'flag flag-inline', 'Union européenne') + ' Pays de l’UE : les <a href="#pays-eu">règles communes européennes</a> (RGPD, DSA, accessibilité, TVA OSS) s’appliquent aussi.</p>' : '';
    app.innerHTML = '<div class="page">' + crumbs([['Pays', '#pays'], [c.name]]) +
      '<div class="c-hero"><div>' +
        '<div class="c-title">' + PW.flag(c.code, 'flag', c.name) + '<h1>' + esc(c.name) + '</h1></div>' +
        '<p class="verified">' + PW.icon('stamp') + ' Fiche vérifiée en ' + esc(PW.monthName(c.verified)) + '</p>' +
        '<p class="page-head-p">' + fr(esc(c.summary)) + '</p>' + euNote + members +
        '<div class="btn-row mt">' + (c.tools.indexOf('mentions-legales') !== -1 ? '<a class="btn" href="#outil-mentions-legales--' + c.code + '">Générer mes mentions légales</a>' : '') +
        '<a class="btn ghost" href="#outil-checklist--' + (c.code === 'eu' ? 'fr' : c.code) + '">Ouvrir la checklist</a></div>' +
      '</div>' +
      '<aside class="datapage" aria-label="L’essentiel"><h2>L’essentiel</h2><dl>' + c.facts.map(function (f) {
        return '<div><dt>' + esc(f[0]) + '</dt><dd>' + fr(esc(f[1])) + '</dd></div>';
      }).join('') + '</dl><div class="mrz" aria-hidden="true">' + esc(c.mrz) + '</div></aside></div>' +
      '<div class="doc"><nav class="toc" aria-label="Sommaire"><strong>Sommaire</strong><ol>' +
        c.sections.map(function (s) { return '<li><a href="#pays-' + c.code + '--' + s.id + '" data-sec="' + s.id + '">' + esc(s.t) + '</a></li>'; }).join('') +
        '<li><a href="#pays-' + c.code + '--liens" data-sec="liens">Liens officiels</a></li></ol>' +
        '<div class="progress"><span id="cProg"></span><div class="bar"><i id="cBar"></i></div></div></nav>' +
      '<div class="prose">' + secs +
        '<section class="sec" id="sec-liens"><h2><span class="n">' + PW.icon('link') + '</span>Liens officiels</h2>' + linkList(c.links) + '</section>' +
        '<section class="sec"><h2><span class="n">' + PW.icon('pen') + '</span>Outils pour ce pays</h2>' + toolChips(c.tools, c.code === 'eu' ? '' : c.code) + '</section>' +
        '<p class="src mt">Ce guide résume les règles en vigueur à la date indiquée. Il ne remplace pas un conseil juridique : vérifiez toujours avec la source officielle.</p>' +
      '</div></div></div>';

    var prog = PW.$('#cProg'), bar = PW.$('#cBar');
    function count() {
      var b = PW.$$('.todo input[data-key]', app), d = b.filter(function (x) { return x.checked; }).length;
      prog.textContent = d + ' étape' + (d > 1 ? 's' : '') + ' sur ' + b.length;
      bar.style.width = (b.length ? Math.round(d / b.length * 100) : 0) + '%';
    }
    app.addEventListener('change', onCheck);
    count();
    function onCheck(e) {
      var k = e.target.getAttribute && e.target.getAttribute('data-key'); if (!k) return;
      PW.store.set(k, e.target.checked); count();
    }
    cleanup.push(function () { app.removeEventListener('change', onCheck); });
    tocSpy();
    if (params.s) scrollToSec(params.s);
  }

  function scrollToSec(id) {
    var t = document.getElementById('sec-' + id);
    if (t) requestAnimationFrame(function () { t.scrollIntoView({ block: 'start' }); });
  }
  function tocSpy() {
    if (!('IntersectionObserver' in window)) return;
    var links = PW.$$('.toc a[data-sec]', app);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id.replace('sec-', '');
        links.forEach(function (l) { l.classList.toggle('on', l.getAttribute('data-sec') === id); });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    PW.$$('.sec[id]', app).forEach(function (s) { io.observe(s); });
    cleanup.push(function () { io.disconnect(); });
  }

  function guidesPage() {
    setTitle('Manuels');
    app.innerHTML = '<div class="page">' + crumbs([['Manuels']]) +
      '<div class="page-head"><h1>Manuels pratiques</h1><p>Pas à pas, sans jargon. Ces manuels valent pour tous les pays ; les règles propres à chaque pays sont dans les <a href="#pays">fiches pays</a>.</p>' +
      '<p class="note">' + fr(PW.icon('lock') + ' <strong>' + PW.premium.list().length + ' manuels premium</strong>, plus détaillés : valeurs exactes, exemples à copier, sources officielles. ' +
        PW.shop.prices.guide + ' € l’unité ou ' + PW.shop.prices.pack + ' € les ' + PW.premium.list().length + ', par virement. Les premières étapes restent gratuites, et chaque manuel a son assistant IA.') + '</p></div>' +
      guideList(PW.guides) + '</div>';
  }

  function stepHtml(s) {
    return '<li><h3>' + esc(s.t) + '</h3><div class="step-b"><p>' + fr(s.b) + '</p>' +
      (s.ex ? '<div class="ex"><button class="btn small ghost ex-copy" type="button" data-ex>Copier</button><pre tabindex="0"><code>' + esc(s.ex) + '</code></pre></div>' : '') +
      '</div></li>';
  }

  function guidePage(id) {
    var i = PW.guides.findIndex(function (g) { return g.id === id; }), g = PW.guides[i];
    if (!g) return notFound();
    setTitle(g.t);
    var prev = PW.guides[i - 1], next = PW.guides[i + 1];
    var locked = !PW.premium.isUnlocked(g), visible = locked ? g.steps.slice(0, g.free || 2) : g.steps;
    app.innerHTML = '<div class="page">' + crumbs([['Manuels', '#manuels'], [g.t]]) +
      '<div class="page-head"><h1>' + esc(g.t) + '</h1><p>' + fr(esc(g.d)) + '</p><p class="small muted">' + PW.icon('clock') + ' ' + fr(esc(g.time)) + ' de lecture, ' + g.steps.length + ' étapes' + premiumTag(g) + '</p></div>' +
      '<div class="prose"><ol class="steps">' + visible.map(stepHtml).join('') + '</ol>' +
      (locked ? PW.premium.box(g) : '') +
      PW.assistant.html(g) +
      (g.tools ? '<section class="block"><h2>Outils utiles</h2>' + toolChips(g.tools) + '</section>' : '') +
      (g.links && !locked ? '<section class="block"><h2>Liens</h2>' + linkList(g.links) + '</section>' : '') +
      '<nav class="block pager" aria-label="Manuels voisins">' +
        (prev ? '<a href="#manuel-' + prev.id + '"><span class="small muted">Manuel précédent</span><br>' + esc(prev.t) + '</a>' : '<span></span>') +
        (next ? '<a class="next" href="#manuel-' + next.id + '"><span class="small muted">Manuel suivant</span><br>' + esc(next.t) + '</a>' : '') +
      '</nav></div></div>';
    if (locked) PW.premium.wire(app, g, function () { cleanup.forEach(function (f) { f(); }); cleanup = []; guidePage(id); });
    cleanup.push(PW.assistant.wire(app, g, visible, locked));
    function onEx(e) {
      var b = e.target.closest('[data-ex]'); if (!b) return;
      PW.copy(b.parentNode.querySelector('pre').textContent, 'Exemple');
    }
    app.addEventListener('click', onEx);
    cleanup.push(function () { app.removeEventListener('click', onEx); });
  }

  function toolsPage() {
    setTitle('Outils');
    app.innerHTML = '<div class="page">' + crumbs([['Outils']]) +
      '<div class="page-head"><h1>Les outils</h1><p>Générateurs et vérificateurs gratuits. Tout fonctionne dans votre navigateur : vos réponses restent sur votre appareil.</p></div>' +
      '<div class="tool-groups">' + TOOL_GROUPS.map(function (gr) {
        var items = PW.tools.filter(function (t) { return t.group === gr; });
        return items.length ? '<section class="tool-group"><h2>' + esc(gr) + '</h2>' + items.map(toolRow).join('') + '</section>' : '';
      }).join('') + '</div></div>';
  }

  function toolPage(id, params) {
    var t = PW.toolById(id);
    if (!t) return notFound();
    setTitle(t.t);
    app.innerHTML = '<div class="page">' + crumbs([['Outils', '#outils'], [t.t]]) +
      '<div class="page-head"><h1>' + esc(t.t) + '</h1><p>' + fr(esc(t.d)) + '</p></div>' +
      '<div id="toolRoot"></div>' +
      '<section class="block no-print"><h2>Autres outils</h2>' + toolChips(PW.tools.filter(function (x) { return x.id !== id; }).map(function (x) { return x.id; })) + '</section></div>';
    t.render(PW.$('#toolRoot'), params);
  }

  function linksPage(params) {
    setTitle('Liens utiles');
    var official = { id: 'officiel', t: 'Sites officiels par pays', items: [] };
    var cats = PW.linkCats.concat([official]);
    var active = params.cat || 'tout';
    app.innerHTML = '<div class="page">' + crumbs([['Liens']]) +
      '<div class="page-head"><h1>Liens utiles</h1><p>Une sélection d’outils sérieux pour créer, tester et faire connaître votre site, plus tous les sites officiels des 12 pays. Les liens marqués « gratuit » ont au moins une offre gratuite.</p></div>' +
      '<div class="filters no-print" role="group" aria-label="Filtrer par catégorie">' +
        '<button class="chip" type="button" data-cat="tout" aria-pressed="' + (active === 'tout') + '">Tout</button>' +
        cats.map(function (c) { return '<button class="chip" type="button" data-cat="' + c.id + '" aria-pressed="' + (active === c.id) + '">' + esc(c.t) + '</button>'; }).join('') +
      '</div>' +
      '<div class="field no-print lf"><label class="sr" for="lfq">Filtrer les liens</label><input id="lfq" type="search" placeholder="Filtrer : photos, DNS, Stripe…"></div>' +
      '<div class="links-grid" id="linksGrid"></div></div>';

    function draw() {
      var q = norm(PW.$('#lfq').value);
      var html = '';
      PW.linkCats.forEach(function (c) {
        if (active !== 'tout' && active !== c.id) return;
        var items = c.items.filter(function (l) { return !q || norm(l.t + ' ' + l.d).indexOf(q) !== -1; });
        if (!items.length) return;
        html += '<section class="link-cat"><h2>' + esc(c.t) + '</h2><ul class="linklist">' + items.map(function (l) {
          return '<li><a href="' + esc(l.u) + '" target="_blank" rel="noopener">' + esc(l.t) + '</a>' + (l.free ? '<span class="tag free">gratuit</span>' : '') + '<span class="d">' + fr(esc(l.d)) + '</span></li>';
        }).join('') + '</ul></section>';
      });
      if (active === 'tout' || active === 'officiel') {
        var off = '';
        PW.countries.forEach(function (c) {
          var items = c.links.filter(function (l) { return !q || norm(l.t + ' ' + l.d + ' ' + c.name).indexOf(q) !== -1; });
          if (!items.length) return;
          off += '<section class="link-cat"><h2>' + PW.flag(c.code, 'flag', c.name) + esc(c.name) + '</h2>' + linkList(items) + '</section>';
        });
        if (off && html) html += '<h2 class="links-sep">Sites officiels par pays</h2>';
        html += off;
      }
      PW.$('#linksGrid').innerHTML = html || '<p class="empty">Aucun lien ne correspond. Essayez un autre mot.</p>';
    }
    PW.$$('[data-cat]', app).forEach(function (b) {
      b.addEventListener('click', function () {
        active = b.getAttribute('data-cat');
        PW.$$('[data-cat]', app).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        draw();
      });
    });
    PW.$('#lfq').addEventListener('input', draw);
    draw();
  }

  function aboutPage() {
    setTitle('À propos et sources');
    app.innerHTML = '<div class="page">' + crumbs([['À propos']]) +
      '<div class="page-head"><h1>À propos et sources</h1></div><div class="prose">' +
      '<h2>Ce que fait ce site</h2><p>' + fr('Passeport Web rassemble, pour 12 pays, ce qu’il faut faire pour lancer un site dans les règles : déclarer son activité, réserver un nom de domaine, publier les pages obligatoires, respecter les lois sur les données, vendre en ligne, gérer les taxes. Des outils gratuits produisent les pages et le code dont vous avez besoin.') + '</p>' +
      '<h2>D’où viennent les informations</h2><p>' + fr('Chaque fiche s’appuie sur les textes et les sites officiels du pays, listés en bas de la fiche. Les points qui ont changé récemment (seuils de TVA, frais d’immatriculation, nouvelles lois) ont été revérifiés en novembre 2026. Les fiches portent leur date de vérification.') + '</p>' +
      '<p class="note warn">' + fr('<strong>Ce n’est pas un avis juridique.</strong> Les règles changent et chaque situation est différente. Pour une activité réglementée, une boutique importante ou un doute, demandez à un avocat, un comptable ou la chambre de commerce du pays.') + '</p>' +
      '<h2>Votre vie privée ici</h2><p>' + fr('Ce site n’utilise aucun cookie, aucun traceur et aucune statistique. Les polices sont hébergées sur le site lui-même. Ce que vous tapez dans les outils et les cases que vous cochez sont gardés uniquement dans votre navigateur (stockage local) ; rien n’est envoyé à un serveur. Vider les données du site efface tout.') + '</p>' +
      '<div class="btn-row"><button class="btn ghost small" type="button" id="wipe">Effacer mes données sur cet appareil</button></div>' +
      '<h2>Crédits</h2><p>' + fr('Polices Inter et Fraunces (licence SIL OFL), Special Elite (licence Apache 2.0). Drapeaux simplifiés dessinés pour le site.') + '</p></div></div>';
    PW.confirmClick(PW.$('#wipe'), 'Oui, tout effacer', function () {
      // Purchased manuals stay unlocked: the buyer paid for them.
      try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf('pw-') === 0 && k !== 'pw-unlocked') localStorage.removeItem(k); }); } catch (e) { /* ignore */ }
      PW.toast('Données effacées');
    });
  }

  function notFound() {
    setTitle('Page introuvable');
    app.innerHTML = '<div class="page notfound"><div class="stamp ink-red rect" data-r="-6" data-d="0"><span><span class="st-name">Refusé</span><span class="st-date">Page introuvable</span></span></div>' +
      '<h1>Cette page n’existe pas</h1><p>Le lien est peut-être ancien. Repartez de l’accueil ou cherchez ce qu’il vous faut.</p><div class="btn-row"><a class="btn" href="#accueil">Retour à l’accueil</a><a class="btn ghost" href="#pays">Voir les pays</a></div></div>';
    applyStampVars(app);
  }

  /* ---------- router ---------- */
  var cleanup = [];
  // "#pays-fr--taxes" -> parts ['pays', 'fr'], params {s: 'taxes'}; "#outil-checklist--in" -> ['outils', 'checklist'], {pays: 'in'}.
  function parse() {
    var h = decodeURIComponent(location.hash.replace(/^#/, '')).toLowerCase();
    var cut = h.indexOf('--'), name = cut === -1 ? h : h.slice(0, cut), extra = cut === -1 ? '' : h.slice(cut + 2);
    var params = {}, parts;
    if (!name || name === 'accueil') parts = [];
    else if (['pays', 'manuels', 'outils', 'liens', 'a-propos'].indexOf(name) !== -1) parts = [name];
    else if (name.indexOf('pays-') === 0) { parts = ['pays', name.slice(5)]; if (extra) params.s = extra; }
    else if (name.indexOf('manuel-') === 0) parts = ['manuels', name.slice(7)];
    else if (name.indexOf('outil-') === 0) { parts = ['outils', name.slice(6)]; if (extra) params.pays = extra; }
    else parts = ['introuvable'];
    return { parts: parts, params: params };
  }
  var lastPage = '';
  function route() {
    var r = parse(), p = r.parts, key = p.join('/');
    // A sommaire link on the same country page only scrolls: keep the page (and its listeners).
    var samePage = key === lastPage && p[0] === 'pays' && p[1];
    lastPage = key;
    if (samePage && r.params.s) { scrollToSec(r.params.s); return; }
    cleanup.forEach(function (f) { f(); }); cleanup = [];
    var map = { pays: p[1] ? function () { countryPage(p[1], r.params); } : countriesPage,
      manuels: p[1] ? function () { guidePage(p[1]); } : guidesPage,
      outils: p[1] ? function () { toolPage(p[1], r.params); } : toolsPage,
      liens: function () { linksPage(r.params); }, 'a-propos': aboutPage };
    (p.length === 0 ? home : map[p[0]] || notFound)();
    PW.$$('.mainnav a').forEach(function (a) {
      if (a.getAttribute('data-nav') === p[0]) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (!r.params.s) window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', route);

  /* ---------- search ---------- */
  function norm(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/<[^>]+>/g, ' '); }
  var index = null;
  function buildIndex() {
    index = [];
    PW.countries.forEach(function (c) {
      index.push({ t: c.name, k: 'Pays', u: '#pays-' + c.code, x: norm(c.name + ' ' + c.summary + ' ' + c.facts.map(function (f) { return f.join(' '); }).join(' ')), w: 3 });
      c.sections.forEach(function (s) {
        index.push({ t: c.name + ' — ' + s.t, k: 'Fiche pays', u: '#pays-' + c.code + '--' + s.id, x: norm(c.name + ' ' + s.t + ' ' + (s.i || '') + ' ' + s.do.join(' ') + ' ' + (s.n || []).map(function (n) { return n[1]; }).join(' ')), w: 1 });
      });
    });
    PW.tools.forEach(function (t) { index.push({ t: t.t, k: 'Outil', u: '#outil-' + t.id, x: norm(t.t + ' ' + t.d + ' ' + t.group), w: 4 }); });
    PW.guides.forEach(function (g) { index.push({ t: g.t, k: 'Manuel', u: '#manuel-' + g.id, x: norm(g.t + ' ' + g.d + ' ' + g.steps.map(function (s) { return s.t + ' ' + s.b; }).join(' ')), w: 2 }); });
    PW.linkCats.forEach(function (c) { c.items.forEach(function (l) { index.push({ t: l.t, k: 'Lien — ' + c.t, u: l.u, x: norm(l.t + ' ' + l.d + ' ' + c.t), w: 1, ext: true }); }); });
  }
  // Same idea, different word per country: "tva" also finds GST, VAT, IVA…
  var SYN = [
    ['tva', 'gst', 'vat', 'iva', 'mwst', 'taxe', 'sales tax', 'tps', 'tvh', 'impot'],
    ['mentions', 'impressum', 'aviso legal', 'note legali', 'legal notice', 'imprint', 'identification'],
    ['cookies', 'cookie', 'traceurs', 'consentement'],
    ['rgpd', 'gdpr', 'dsgvo', 'donnees personnelles', 'lgpd', 'dpdp', 'lprpde', 'pipeda', 'nlpd', 'ccpa', 'privacy'],
    ['declarer', 'declaration', 'immatriculer', 'enregistrer', 'statut', 'registration'],
    ['domaine', 'domain', 'dns', 'registrar'],
    ['accessibilite', 'rgaa', 'wcag', 'handicap', 'eaa', 'ada'],
    ['vendre', 'vente', 'boutique', 'e-commerce', 'cgv', 'consommateur'],
    ['inde', 'india'], ['royaume-uni', 'royaume uni', 'angleterre', 'britain', 'uk'], ['etats-unis', 'etats unis', 'usa', 'americ'],
    ['allemagne', 'germany', 'deutschland'], ['espagne', 'spain', 'espana'], ['italie', 'italy', 'italia'], ['suisse', 'switzerland', 'schweiz'],
    ['belgique', 'belgium'], ['bresil', 'brazil', 'brasil'], ['australie', 'australia'], ['canada', 'quebec'], ['ue', 'europe', 'union europeenne']
  ];
  function alts(w) {
    for (var i = 0; i < SYN.length; i++) if (SYN[i].indexOf(w) !== -1) return SYN[i];
    return [w];
  }
  function has(text, a) {
    // Short words (uk, ue, ada…) must match a whole word, longer ones any part of a word.
    return a.some(function (x) { return x.length <= 3 ? new RegExp('(^|[^a-z])' + x + '([^a-z]|$)').test(text) : text.indexOf(x) !== -1; });
  }
  function search(q) {
    if (!index) buildIndex();
    var words = norm(q).split(/\s+/).filter(function (w) { return w.length > 1; }).map(alts);
    if (!words.length) return [];
    return index.map(function (e) {
      var ok = words.every(function (a) { return has(e.x, a); });
      if (!ok) return null;
      var title = norm(e.t);
      var score = e.w + words.filter(function (a) { return has(title, a); }).length * 5;
      return { e: e, s: score };
    }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).slice(0, 8).map(function (r) { return r.e; });
  }
  var qInput = PW.$('#q'), box = PW.$('#searchResults'), sel = -1, results = [];
  function showResults() {
    results = search(qInput.value); sel = -1;
    if (!qInput.value.trim()) { box.hidden = true; return; }
    box.innerHTML = results.length ? results.map(function (r, i) {
      return '<a href="' + esc(r.u) + '" data-i="' + i + '"' + (r.ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(r.t) + '<span class="kind">' + esc(r.k) + '</span></a>';
    }).join('') : '<div class="none">Aucun résultat. Essayez « TVA », « Impressum », « cookies »…</div>';
    box.hidden = false;
  }
  qInput.addEventListener('input', PW.debounce(showResults, 120));
  qInput.addEventListener('focus', function () { if (qInput.value.trim()) showResults(); });
  qInput.addEventListener('keydown', function (e) {
    var links = PW.$$('a', box);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); if (!links.length) return;
      sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
      links.forEach(function (l, i) { l.classList.toggle('on', i === sel); });
    } else if (e.key === 'Escape') { box.hidden = true; }
  });
  PW.$('#searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var r = results[sel >= 0 ? sel : 0]; if (!r) return;
    box.hidden = true; qInput.blur();
    // A real link click (not window.open): it is the only way out that works inside a hosted frame.
    var link = PW.$$('a', box)[sel >= 0 ? sel : 0];
    if (r.ext && link) link.click(); else location.hash = r.u.slice(1);
  });
  box.addEventListener('click', function (e) { if (e.target.closest('a')) { box.hidden = true; qInput.value = ''; } });
  document.addEventListener('click', function (e) { if (!e.target.closest('.search')) box.hidden = true; });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); qInput.focus(); }
  });

  /* ---------- theme ---------- */
  PW.$('#themeBtn').addEventListener('click', function () {
    var root = document.documentElement, cur = root.getAttribute('data-theme');
    var dark = cur ? cur === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('pw-theme', next); } catch (e) { /* ignore */ }
  });

  // Forms are page UI only: nothing is ever sent anywhere (hosted frames have nowhere to send it).
  document.addEventListener('submit', function (e) { e.preventDefault(); });
  // The skip link focuses the content instead of changing the route.
  var skip = PW.$('.skip');
  if (skip) skip.addEventListener('click', function (e) { e.preventDefault(); app.focus(); });

  route();
})();
