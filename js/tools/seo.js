/* Tools: SEO meta tags + previews, robots.txt + sitemap.xml, JSON-LD. */
(function () {
  var PW = window.PW, esc = PW.esc;

  function tabs(el) {
    PW.$$('[data-tab]', el).forEach(function (b) {
      b.addEventListener('click', function () {
        var group = b.closest('.panel');
        PW.$$('[data-tab]', group).forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
        PW.$$('[data-pane]', group).forEach(function (p) { p.hidden = p.getAttribute('data-pane') !== b.getAttribute('data-tab'); });
      });
    });
  }
  PW.tabs = tabs;

  /* ---------- Meta tags ---------- */
  PW.tool({
    id: 'balises-seo', group: 'Référencement', icon: 'search',
    t: 'Balises SEO et réseaux sociaux',
    d: 'Title, description, Open Graph et Twitter : le code à coller dans <head>, avec l’aperçu Google et l’aperçu de partage.',
    render: function (el) {
      el.innerHTML =
        '<div class="tool-grid">' +
        '<form class="panel" id="mtForm" autocomplete="off">' +
          '<div class="field"><label for="mt-title">Titre de la page <span class="count" id="mtTitleC"></span></label><input id="mt-title" name="title" type="text" value="Atelier Martin — Céramiques faites main à Lyon"></div>' +
          '<div class="field"><label for="mt-desc">Description <span class="count" id="mtDescC"></span></label><textarea id="mt-desc" name="desc" rows="3">Bols, tasses et assiettes en grès, tournés et émaillés à la main dans notre atelier lyonnais. Livraison en France et en Europe.</textarea></div>' +
          '<div class="field"><label for="mt-url">Adresse de la page (URL canonique)</label><input id="mt-url" name="url" type="url" value="https://atelier-martin.fr/"></div>' +
          '<div class="field"><label for="mt-img">Image de partage <span class="hint">(1200 × 630 px, URL complète)</span></label><input id="mt-img" name="img" type="url" placeholder="https://atelier-martin.fr/og.jpg"></div>' +
          '<div class="row2"><div class="field"><label for="mt-site">Nom du site</label><input id="mt-site" name="site" type="text" value="Atelier Martin"></div>' +
          '<div class="field"><label for="mt-locale">Langue</label><select id="mt-locale" name="locale"><option>fr_FR</option><option>fr_BE</option><option>fr_CH</option><option>fr_CA</option><option>en_US</option><option>en_GB</option><option>en_CA</option><option>en_IN</option><option>en_AU</option><option>de_DE</option><option>es_ES</option><option>it_IT</option><option>pt_BR</option></select></div></div>' +
          '<div class="row2"><div class="field"><label for="mt-type">Type</label><select id="mt-type" name="type"><option value="website">Site / page</option><option value="article">Article</option><option value="product">Produit</option></select></div>' +
          '<div class="field"><label for="mt-x">Compte X / Twitter</label><input id="mt-x" name="x" type="text" placeholder="@ateliermartin"></div></div>' +
          '<div class="row2"><div class="field"><label for="mt-color">Couleur du navigateur mobile</label><input id="mt-color" name="color" type="color" value="#18233a"></div>' +
          '<div class="field"><label for="mt-robots">Indexation</label><select id="mt-robots" name="robots"><option value="index,follow">Indexer la page</option><option value="noindex,follow">Ne pas indexer</option></select></div></div>' +
        '</form>' +
        '<div class="out">' +
          '<div class="panel"><h3>Aperçu dans Google</h3><div class="serp" id="mtSerp"></div></div>' +
          '<div class="panel"><h3>Aperçu de partage</h3><div class="og-card" id="mtOg"></div></div>' +
          '<div class="panel">' + PW.codeBlock('mtCode', 'À coller dans <head>', 'meta-tags.html') + '</div>' +
        '</div></div>';

      var form = PW.$('#mtForm', el);
      PW.persistForm(form, 'pw-tool-meta');
      PW.wireCode(el);
      function counter(node, n, max) {
        node.textContent = n + ' / ' + max;
        node.className = 'count' + (n > max ? ' over' : '');
      }
      function update() {
        var d = PW.formData(form), host = PW.host(d.url) || 'exemple.com';
        counter(PW.$('#mtTitleC', el), d.title.length, 60);
        counter(PW.$('#mtDescC', el), d.desc.length, 155);
        var cut = function (s, n) { return s.length > n ? s.slice(0, n - 1).trim() + '…' : s; };
        PW.$('#mtSerp', el).innerHTML =
          '<div class="s-site"><span class="s-fav">' + esc((d.site || host).charAt(0)) + '</span><span><div>' + esc(d.site || host) + '</div><div class="s-url">' + esc(d.url || 'https://' + host) + '</div></span></div>' +
          '<div class="s-title">' + esc(cut(d.title || 'Titre de la page', 62)) + '</div>' +
          '<div class="s-desc">' + esc(cut(d.desc || 'Description de la page.', 158)) + '</div>';
        PW.$('#mtOg', el).innerHTML =
          '<div class="og-img">' + (d.img ? '<img src="' + esc(d.img) + '" alt="">' : 'Image 1200 × 630') + '</div>' +
          '<div class="og-body"><div class="og-host">' + esc(host.toUpperCase()) + '</div><div class="og-title">' + esc(d.title) + '</div><div class="og-desc">' + esc(cut(d.desc, 110)) + '</div></div>';
        var q = function (s) { return esc(s); };
        var lines = [
          '<title>' + q(d.title) + '</title>',
          '<meta name="description" content="' + q(d.desc) + '">',
          d.url ? '<link rel="canonical" href="' + q(d.url) + '">' : null,
          d.robots !== 'index,follow' ? '<meta name="robots" content="' + q(d.robots) + '">' : null,
          '<meta name="theme-color" content="' + q(d.color) + '">',
          '',
          '<!-- Open Graph (Facebook, LinkedIn, WhatsApp…) -->',
          '<meta property="og:type" content="' + q(d.type) + '">',
          '<meta property="og:title" content="' + q(d.title) + '">',
          '<meta property="og:description" content="' + q(d.desc) + '">',
          d.url ? '<meta property="og:url" content="' + q(d.url) + '">' : null,
          d.site ? '<meta property="og:site_name" content="' + q(d.site) + '">' : null,
          '<meta property="og:locale" content="' + q(d.locale) + '">',
          d.img ? '<meta property="og:image" content="' + q(d.img) + '">' : null,
          d.img ? '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">' : null,
          '',
          '<!-- X / Twitter -->',
          '<meta name="twitter:card" content="' + (d.img ? 'summary_large_image' : 'summary') + '">',
          d.x ? '<meta name="twitter:site" content="' + q(d.x.charAt(0) === '@' ? d.x : '@' + d.x) + '">' : null
        ].filter(function (l) { return l !== null; });
        PW.setCode('mtCode', lines.join('\n').replace(/\n{3,}/g, '\n\n') + '\n');
      }
      form.addEventListener('input', update);
      form.addEventListener('change', update);
      update();
    }
  });

  /* ---------- robots.txt + sitemap.xml ---------- */
  var BOTS = [
    ['GPTBot', 'OpenAI — entraînement des modèles'],
    ['OAI-SearchBot', 'OpenAI — recherche dans ChatGPT'],
    ['ClaudeBot', 'Anthropic — entraînement des modèles'],
    ['Claude-SearchBot', 'Anthropic — recherche dans Claude'],
    ['Google-Extended', 'Google — entraînement de Gemini (sans effet sur la recherche Google)'],
    ['Applebot-Extended', 'Apple — entraînement des modèles (sans effet sur Siri / Spotlight)'],
    ['CCBot', 'Common Crawl — jeu de données utilisé pour entraîner des IA'],
    ['PerplexityBot', 'Perplexity — moteur de réponses'],
    ['Bytespider', 'ByteDance — entraînement des modèles'],
    ['meta-externalagent', 'Meta — entraînement des modèles']
  ];

  PW.tool({
    id: 'robots-sitemap', group: 'Référencement', icon: 'robot',
    t: 'Générateur robots.txt et sitemap.xml',
    d: 'Dites aux moteurs ce qu’ils peuvent explorer, bloquez si vous le souhaitez les robots d’IA, et listez vos pages dans un sitemap.',
    render: function (el) {
      var bots = BOTS.map(function (b) { return '<label><input type="checkbox" name="bots" value="' + b[0] + '"> <span><code>' + b[0] + '</code> <span class="muted small">' + esc(b[1]) + '</span></span></label>'; }).join('');
      el.innerHTML =
        '<div class="tool-grid">' +
        '<form class="panel" id="rbForm" autocomplete="off">' +
          '<div class="field"><label for="rb-base">Adresse du site</label><input id="rb-base" name="base" type="url" value="https://atelier-martin.fr"></div>' +
          '<fieldset><legend class="legend">Moteurs de recherche</legend><div class="radio">' +
            '<label><input type="radio" name="mode" value="allow" checked> Autoriser l’exploration</label>' +
            '<label><input type="radio" name="mode" value="block"> Tout bloquer (site en préparation)</label></div></fieldset>' +
          '<div class="field"><label for="rb-dis">Dossiers à ne pas explorer <span class="hint">(un par ligne)</span></label><textarea id="rb-dis" name="dis" rows="3">/admin/\n/panier/</textarea></div>' +
          '<fieldset><legend class="legend">Robots d’IA à bloquer</legend><div class="checks">' + bots + '</div>' +
          '<p class="hint small mt">Bloquer un robot d’entraînement n’enlève pas votre site de Google. Tous les robots ne respectent pas robots.txt.</p></fieldset>' +
          '<div class="field"><label for="rb-pages">Pages du sitemap <span class="hint">(une adresse par ligne, relative ou complète)</span></label><textarea id="rb-pages" name="pages" rows="6">/\n/a-propos\n/boutique\n/contact\n/mentions-legales</textarea></div>' +
          '<div class="checks"><label><input type="checkbox" name="lastmod" data-single checked> Ajouter la date du jour (lastmod)</label></div>' +
        '</form>' +
        '<div class="out">' +
          '<div class="panel">' + PW.codeBlock('rbRobots', 'robots.txt — à la racine du site', 'robots.txt') + '</div>' +
          '<div class="panel">' + PW.codeBlock('rbMap', 'sitemap.xml — à la racine du site', 'sitemap.xml') + '</div>' +
        '</div></div>';

      var form = PW.$('#rbForm', el);
      PW.persistForm(form, 'pw-tool-robots');
      PW.wireCode(el);
      function update() {
        var d = PW.formData(form), base = (d.base || 'https://exemple.com').replace(/\/+$/, '');
        var r = '';
        (d.bots || []).forEach(function (b) { r += 'User-agent: ' + b + '\nDisallow: /\n\n'; });
        r += 'User-agent: *\n';
        if (d.mode === 'block') r += 'Disallow: /\n';
        else {
          var dis = d.dis.split(/\n/).map(function (s) { return s.trim(); }).filter(Boolean);
          r += dis.length ? dis.map(function (p) { return 'Disallow: ' + p; }).join('\n') + '\n' : 'Allow: /\n';
        }
        r += '\nSitemap: ' + base + '/sitemap.xml\n';
        PW.setCode('rbRobots', r);

        var today = new Date().toISOString().slice(0, 10);
        var urls = d.pages.split(/\n/).map(function (s) { return s.trim(); }).filter(Boolean).map(function (p) {
          var u = /^https?:\/\//.test(p) ? p : base + (p.charAt(0) === '/' ? p : '/' + p);
          return '  <url>\n    <loc>' + esc(u) + '</loc>\n' + (d.lastmod ? '    <lastmod>' + today + '</lastmod>\n' : '') + '  </url>';
        });
        PW.setCode('rbMap', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.join('\n') + '\n</urlset>\n');
      }
      form.addEventListener('input', update);
      form.addEventListener('change', update);
      update();
    }
  });

  /* ---------- JSON-LD ---------- */
  PW.tool({
    id: 'donnees-structurees', group: 'Référencement', icon: 'code',
    t: 'Données structurées (JSON-LD)',
    d: 'Aidez Google à comprendre qui vous êtes : entreprise, commerce local avec horaires, personne ou site. Code prêt à coller.',
    render: function (el) {
      el.innerHTML =
        '<div class="tool-grid">' +
        '<form class="panel" id="jlForm" autocomplete="off">' +
          '<div class="field"><label for="jl-type">Type</label><select id="jl-type" name="type"><option value="Organization">Entreprise ou association</option><option value="LocalBusiness">Commerce local (avec adresse et horaires)</option><option value="Person">Personne (portfolio, freelance)</option><option value="WebSite">Site web</option></select></div>' +
          '<div class="field"><label for="jl-name">Nom</label><input id="jl-name" name="name" type="text" value="Atelier Martin"></div>' +
          '<div class="field"><label for="jl-url">Adresse du site</label><input id="jl-url" name="url" type="url" value="https://atelier-martin.fr"></div>' +
          '<div class="field" data-not="WebSite"><label for="jl-logo">Logo ou photo (URL)</label><input id="jl-logo" name="logo" type="url"></div>' +
          '<div class="field"><label for="jl-desc">Description</label><textarea id="jl-desc" name="desc" rows="2">Céramiques faites main à Lyon.</textarea></div>' +
          '<div class="row2" data-not="WebSite"><div class="field"><label for="jl-email">Email</label><input id="jl-email" name="email" type="email"></div>' +
          '<div class="field"><label for="jl-phone">Téléphone</label><input id="jl-phone" name="phone" type="tel" placeholder="+33 4 00 00 00 00"></div></div>' +
          '<div data-only="LocalBusiness Organization">' +
            '<div class="field"><label for="jl-street">Rue</label><input id="jl-street" name="street" type="text"></div>' +
            '<div class="row2"><div class="field"><label for="jl-zip">Code postal</label><input id="jl-zip" name="zip" type="text"></div>' +
            '<div class="field"><label for="jl-city">Ville</label><input id="jl-city" name="city" type="text" value="Lyon"></div></div>' +
            '<div class="field"><label for="jl-country">Code pays <span class="hint">(FR, BE, CH, DE, US…)</span></label><input id="jl-country" name="country" type="text" value="FR" maxlength="2"></div></div>' +
          '<div data-only="LocalBusiness">' +
            '<div class="field"><label for="jl-hours">Horaires <span class="hint">(un créneau par ligne, ex. Mo-Fr 09:00-18:00)</span></label><textarea id="jl-hours" name="hours" rows="2">Tu-Sa 10:00-19:00</textarea></div>' +
            '<div class="field"><label for="jl-price">Gamme de prix</label><input id="jl-price" name="price" type="text" placeholder="€€"></div></div>' +
          '<div class="field" data-only="Person"><label for="jl-job">Métier</label><input id="jl-job" name="job" type="text" placeholder="Développeuse web freelance"></div>' +
          '<div class="field" data-not="WebSite"><label for="jl-same">Profils sociaux <span class="hint">(une URL par ligne)</span></label><textarea id="jl-same" name="same" rows="2"></textarea></div>' +
        '</form>' +
        '<div class="out"><div class="panel">' + PW.codeBlock('jlCode', 'À coller dans <head> ou en bas de <body>', 'schema.html') +
        '<p class="small muted mt">Testez le résultat avec le <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener">test des résultats enrichis</a> de Google.</p></div></div></div>';

      var form = PW.$('#jlForm', el);
      PW.persistForm(form, 'pw-tool-jsonld');
      PW.wireCode(el);
      function update() {
        var d = PW.formData(form), t = d.type;
        PW.$$('[data-only]', el).forEach(function (n) { n.hidden = n.getAttribute('data-only').split(' ').indexOf(t) === -1; });
        PW.$$('[data-not]', el).forEach(function (n) { n.hidden = n.getAttribute('data-not') === t; });
        var o = { '@context': 'https://schema.org', '@type': t, name: d.name || undefined, url: d.url || undefined, description: d.desc || undefined };
        if (t !== 'WebSite') {
          if (d.logo) o[t === 'Person' ? 'image' : 'logo'] = d.logo;
          if (d.email) o.email = d.email;
          if (d.phone) o.telephone = d.phone;
          var same = d.same.split(/\n/).map(function (s) { return s.trim(); }).filter(Boolean);
          if (same.length) o.sameAs = same;
        }
        if ((t === 'LocalBusiness' || t === 'Organization') && (d.street || d.city)) {
          o.address = { '@type': 'PostalAddress', streetAddress: d.street || undefined, postalCode: d.zip || undefined, addressLocality: d.city || undefined, addressCountry: (d.country || '').toUpperCase() || undefined };
        }
        if (t === 'LocalBusiness') {
          var h = d.hours.split(/\n/).map(function (s) { return s.trim(); }).filter(Boolean);
          if (h.length) o.openingHours = h.length === 1 ? h[0] : h;
          if (d.price) o.priceRange = d.price;
        }
        if (t === 'Person' && d.job) o.jobTitle = d.job;
        if (t === 'WebSite') o.inLanguage = 'fr';
        var json = JSON.stringify(o, null, 2).replace(/</g, '\\u003c');
        PW.setCode('jlCode', '<script type="application/ld+json">\n' + json + '\n</script>\n');
      }
      form.addEventListener('input', update);
      form.addEventListener('change', update);
      update();
    }
  });
})();
