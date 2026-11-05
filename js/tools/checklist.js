/* Tool: launch checklist. Merges the to-do items of a country manual (and the
 * EU rules for EU countries) with the technical launch steps. Ticks are shared
 * with the country page, so checking a box in one place shows in the other. */
(function () {
  var PW = window.PW, esc = PW.esc;

  var TECH = [
    'Le site s’affiche bien sur un vrai téléphone.',
    'HTTPS est actif partout (redirection de http vers https).',
    'Chaque page a un titre et une description uniques.',
    'Favicon et image de partage (Open Graph) en place.',
    'Un sitemap.xml et un robots.txt sont publiés.',
    'Le site est déclaré dans Google Search Console et Bing Webmaster Tools.',
    'Les formulaires envoient bien leurs messages (testé).',
    'Les en-têtes de sécurité sont configurés.',
    'Une page 404 utile existe.',
    'Une sauvegarde complète a été faite avant le lancement.',
    'L’adresse email pro a SPF, DKIM et DMARC.',
    'Les contrastes et la navigation au clavier sont vérifiés.'
  ];

  /** Key shared with the country page (app.js uses the same formula). */
  PW.checkKey = function (code, sec, i) { return 'pw-check-' + code + '-' + sec + '-' + i; };

  function groups(code, opts) {
    var c = PW.countries.filter(function (x) { return x.code === code; })[0];
    var out = [];
    if (!c) return out;
    c.sections.forEach(function (s) {
      if (s.id === 'vente' && !opts.sell) return;
      if (s.id === 'autres' && !opts.ugc && !opts.mail) return;
      out.push({ title: c.name + ' — ' + s.t, items: s.do.map(function (txt, i) { return { txt: txt, key: PW.checkKey(c.code, s.id, i) }; }) });
    });
    if (c.eu) {
      var eu = PW.countries.filter(function (x) { return x.code === 'eu'; })[0];
      eu.sections.forEach(function (s) {
        var keep = (s.id === 'autres' && opts.ugc) || (s.id === 'taxes' && opts.sell) || (s.id === 'accessibilite' && opts.sell) || (s.id === 'ia' && opts.ai) || s.id === 'donnees';
        if (!keep) return;
        out.push({ title: 'Union européenne — ' + s.t, items: s.do.map(function (txt, i) { return { txt: txt, key: PW.checkKey('eu', s.id, i) }; }) });
      });
    }
    out.push({ title: 'Technique', items: TECH.map(function (txt, i) { return { txt: txt, key: 'pw-check-tech-' + i }; }) });
    return out;
  }

  PW.tool({
    id: 'checklist', group: 'Démarches', icon: 'check',
    t: 'Checklist de lancement par pays',
    d: 'Toutes les démarches d’un pays plus la check-list technique, à cocher au fur et à mesure. Vos coches restent sur cet appareil et s’impriment.',
    render: function (el, params) {
      var opts = PW.countries.filter(function (c) { return c.code !== 'eu'; }).map(function (c) {
        return '<option value="' + c.code + '">' + esc(c.name) + '</option>';
      }).join('');
      el.innerHTML =
        '<div class="tool-grid">' +
        '<form class="panel no-print" id="clForm">' +
          '<div class="field"><label for="cl-country">Pays où votre site est déclaré</label><select id="cl-country" name="country">' + opts + '</select></div>' +
          '<fieldset><legend class="legend">Votre site…</legend><div class="checks">' +
            '<label><input type="checkbox" name="sell" data-single> vend des produits ou des services en ligne</label>' +
            '<label><input type="checkbox" name="ugc" data-single> permet aux visiteurs de publier (commentaires, forum, avis)</label>' +
            '<label><input type="checkbox" name="mail" data-single> envoie une newsletter ou des emails commerciaux</label>' +
            '<label><input type="checkbox" name="ai" data-single> utilise un chatbot ou des contenus générés par IA</label></div></fieldset>' +
          '<div class="progress small"><span id="clCount">0 / 0</span> fait<div class="bar"><i id="clBar"></i></div></div>' +
          '<div class="btn-row mt"><button class="btn small" type="button" id="clCopy">Copier en Markdown</button>' +
          '<button class="btn small ghost" type="button" id="clSave">Enregistrer (.md)</button>' +
          '<button class="btn small ghost" type="button" id="clReset">Tout décocher</button></div>' +
        '</form>' +
        '<div id="clList"></div></div>';

      var form = PW.$('#clForm', el);
      PW.persistForm(form, 'pw-tool-checklist');
      if (params.pays && PW.countries.some(function (c) { return c.code === params.pays; })) form.country.value = params.pays;
      var list = PW.$('#clList', el), current = [];

      function render() {
        var d = PW.formData(form);
        current = groups(d.country, d);
        var name = (PW.countries.filter(function (c) { return c.code === d.country; })[0] || {}).name;
        list.innerHTML = '<h2 class="print-only">Checklist de lancement — ' + esc(name || '') + '</h2>' + current.map(function (g) {
          return '<div class="panel"><h3>' + esc(g.title) + '</h3><ul class="todo">' + g.items.map(function (it) {
            return '<li><label><input type="checkbox" data-key="' + it.key + '"' + (PW.store.get(it.key, false) ? ' checked' : '') + '><span>' + it.txt + '</span></label></li>';
          }).join('') + '</ul></div>';
        }).join('');
        count();
      }
      function count() {
        var boxes = PW.$$('input[data-key]', list), done = boxes.filter(function (b) { return b.checked; }).length;
        PW.$('#clCount', el).textContent = done + ' / ' + boxes.length;
        PW.$('#clBar', el).style.width = (boxes.length ? Math.round(done / boxes.length * 100) : 0) + '%';
      }
      list.addEventListener('change', function (e) {
        var k = e.target.getAttribute('data-key'); if (!k) return;
        PW.store.set(k, e.target.checked); count();
      });
      form.addEventListener('change', render);
      PW.confirmClick(PW.$('#clReset', el), 'Oui, tout décocher', function () {
        PW.$$('input[data-key]', list).forEach(function (b) { PW.store.del(b.getAttribute('data-key')); });
        render();
      });
      function markdown() {
        var tmp = document.createElement('div');
        var name = (PW.countries.filter(function (c) { return c.code === form.country.value; })[0] || {}).name || '';
        return '# Checklist de lancement — ' + name + '\n\n' + current.map(function (g) {
          return '## ' + g.title + '\n\n' + g.items.map(function (it) {
            tmp.innerHTML = it.txt;
            return '- [' + (PW.store.get(it.key, false) ? 'x' : ' ') + '] ' + tmp.textContent;
          }).join('\n');
        }).join('\n\n') + '\n';
      }
      PW.$('#clCopy', el).addEventListener('click', function () { PW.copy(markdown(), 'Checklist'); });
      PW.$('#clSave', el).addEventListener('click', function () {
        PW.download('checklist-' + form.country.value + '.md', markdown(), 'text/markdown;charset=utf-8');
      });
      render();
    }
  });
})();
