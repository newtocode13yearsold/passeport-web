/* Tool: cookie banner generator. Produces a small, dependency-free banner that
 * really blocks tracking scripts until the visitor accepts them. */
(function () {
  var PW = window.PW, esc = PW.esc;

  var TXT = {
    fr: { msg: 'Nous utilisons des cookies pour mesurer l’audience et améliorer le site. Vous pouvez accepter, refuser ou choisir.', accept: 'Tout accepter', refuse: 'Tout refuser', more: 'Personnaliser', save: 'Enregistrer mes choix', policy: 'En savoir plus', manage: 'Gérer les cookies', cats: { necessary: 'Nécessaires (toujours actifs)', analytics: 'Mesure d’audience', marketing: 'Publicité et réseaux sociaux', functional: 'Fonctionnalités (vidéos, cartes…)' } },
    en: { msg: 'We use cookies to measure audience and improve the site. You can accept, refuse or choose.', accept: 'Accept all', refuse: 'Refuse all', more: 'Customise', save: 'Save my choices', policy: 'Learn more', manage: 'Manage cookies', cats: { necessary: 'Necessary (always on)', analytics: 'Analytics', marketing: 'Advertising and social media', functional: 'Features (videos, maps…)' } }
  };

  function markup(d, preview) {
    var t = TXT[d.lang] || TXT.fr, cats = d.cats || [];
    var c = '<div class="cb ' + esc(d.position) + '" id="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookies"' + (preview ? '' : ' hidden') + '>\n' +
      '  <p>' + esc(d.msg || t.msg) + (d.policy ? ' <a href="' + esc(d.policy) + '">' + esc(t.policy) + '</a>' : '') + '</p>\n' +
      '  <div class="cb-choices" hidden>\n' +
      '    <label><input type="checkbox" checked disabled> ' + esc(t.cats.necessary) + '</label>\n' +
      cats.map(function (k) { return '    <label><input type="checkbox" data-cat="' + k + '"> ' + esc(t.cats[k]) + '</label>\n'; }).join('') +
      '  </div>\n' +
      '  <div class="cb-btns">\n' +
      '    <button type="button" class="cb-refuse">' + esc(t.refuse) + '</button>\n' +
      '    <button type="button" class="cb-accept">' + esc(t.accept) + '</button>\n' +
      (cats.length ? '    <button type="button" class="cb-more">' + esc(t.more) + '</button>\n    <button type="button" class="cb-save" hidden>' + esc(t.save) + '</button>\n' : '') +
      '  </div>\n</div>';
    return c;
  }

  function css(d) {
    var pos = { bottom: 'left:12px;right:12px;bottom:12px;', corner: 'right:12px;bottom:12px;width:min(340px,calc(100% - 24px));', center: 'left:50%;top:50%;transform:translate(-50%,-50%);width:min(400px,calc(100% - 24px));' }[d.position];
    return '#cookie-banner{position:fixed;' + pos + 'z-index:9999;padding:16px;border-radius:' + d.radius + 'px;background:' + d.bg + ';color:' + d.fg + ';font:14px/1.45 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.25)}\n' +
      '#cookie-banner[hidden],#cookie-banner [hidden]{display:none}\n' +
      '#cookie-banner p{margin:0 0 10px}\n#cookie-banner a{color:inherit}\n' +
      '#cookie-banner .cb-choices{display:grid;gap:6px;margin:0 0 12px}\n' +
      '#cookie-banner .cb-btns{display:flex;flex-wrap:wrap;gap:8px}\n' +
      '#cookie-banner button{font:600 13px system-ui,sans-serif;padding:9px 14px;border-radius:6px;cursor:pointer;border:1px solid ' + d.accent + '}\n' +
      '#cookie-banner .cb-accept,#cookie-banner .cb-refuse,#cookie-banner .cb-save{background:' + d.accent + ';color:' + d.accentFg + '}\n' +
      '#cookie-banner .cb-more{background:transparent;color:inherit;border-color:currentColor}\n' +
      '#cookie-banner button:focus-visible{outline:3px solid ' + d.accent + ';outline-offset:2px}\n';
  }

  function js(d) {
    var months = Math.max(1, Math.min(13, parseInt(d.months, 10) || 6));
    return '/* Bannière cookies — générée par Passeport Web. Aucun script de suivi ne\n' +
      ' * démarre avant l’accord du visiteur. Marquez vos scripts ainsi :\n' +
      ' *   <script type="text/plain" data-cookie-category="analytics" data-src="https://exemple.com/stats.js"></script>\n' +
      ' * Ajoutez un lien pour rouvrir le choix : <a href="#" data-cookie-settings>' + (TXT[d.lang] || TXT.fr).manage + '</a> */\n' +
      '(function () {\n' +
      '  var KEY = "cookie-consent", MAX_AGE = ' + months + ' * 30.44 * 864e5;\n' +
      '  var box = document.getElementById("cookie-banner");\n' +
      '  if (!box) return;\n' +
      '  var boxes = box.querySelectorAll("[data-cat]");\n' +
      '  function read() {\n' +
      '    try { var v = JSON.parse(localStorage.getItem(KEY)); if (v && Date.now() - v.date < MAX_AGE) return v.choices; } catch (e) {}\n' +
      '    return null;\n' +
      '  }\n' +
      '  function run(choices) {\n' +
      '    document.querySelectorAll("script[type=\\"text/plain\\"][data-cookie-category]").forEach(function (s) {\n' +
      '      if (!choices[s.getAttribute("data-cookie-category")] || s.hasAttribute("data-done")) return;\n' +
      '      var n = document.createElement("script");\n' +
      '      if (s.getAttribute("data-src")) n.src = s.getAttribute("data-src"); else n.text = s.text;\n' +
      '      s.setAttribute("data-done", ""); s.parentNode.insertBefore(n, s.nextSibling);\n' +
      '    });\n' +
      '  }\n' +
      '  function save(choices) {\n' +
      '    try { localStorage.setItem(KEY, JSON.stringify({ date: Date.now(), choices: choices })); } catch (e) {}\n' +
      '    box.hidden = true; run(choices);\n' +
      '  }\n' +
      '  function all(v) { var c = {}; boxes.forEach(function (b) { c[b.getAttribute("data-cat")] = v; }); return c; }\n' +
      '  function open() {\n' +
      '    var c = read() || {};\n' +
      '    boxes.forEach(function (b) { b.checked = !!c[b.getAttribute("data-cat")]; });\n' +
      '    box.hidden = false;\n' +
      '  }\n' +
      '  box.querySelector(".cb-accept").onclick = function () { save(all(true)); };\n' +
      '  box.querySelector(".cb-refuse").onclick = function () { save(all(false)); };\n' +
      '  var more = box.querySelector(".cb-more"), saveBtn = box.querySelector(".cb-save");\n' +
      '  if (more) more.onclick = function () { box.querySelector(".cb-choices").hidden = false; more.hidden = true; saveBtn.hidden = false; };\n' +
      '  if (saveBtn) saveBtn.onclick = function () { var c = {}; boxes.forEach(function (b) { c[b.getAttribute("data-cat")] = b.checked; }); save(c); };\n' +
      '  document.addEventListener("click", function (e) {\n' +
      '    if (e.target.closest("[data-cookie-settings]")) { e.preventDefault(); open(); }\n' +
      '  });\n' +
      '  var saved = read();\n' +
      '  if (saved) run(saved); else box.hidden = false;\n' +
      '})();\n';
  }

  PW.tool({
    id: 'banniere-cookies', group: 'Pages légales', icon: 'cookie',
    t: 'Générateur de bannière cookies',
    d: 'Une bannière légère et conforme (refus aussi simple que l’acceptation) qui bloque vraiment les traceurs avant le choix. Sans dépendance.',
    render: function (el) {
      el.innerHTML =
        '<div class="tool-grid">' +
        '<form class="panel" id="ckForm" autocomplete="off">' +
          '<div class="row2"><div class="field"><label for="ck-lang">Langue</label><select id="ck-lang" name="lang"><option value="fr">Français</option><option value="en">English</option></select></div>' +
          '<div class="field"><label for="ck-pos">Position</label><select id="ck-pos" name="position"><option value="bottom">Bandeau en bas</option><option value="corner">Coin en bas à droite</option><option value="center">Fenêtre au centre</option></select></div></div>' +
          '<div class="field"><label for="ck-msg">Message <span class="hint">(laissez vide pour le texte par défaut)</span></label><textarea id="ck-msg" name="msg" rows="3"></textarea></div>' +
          '<div class="field"><label for="ck-policy">Lien vers la politique cookies ou de confidentialité</label><input id="ck-policy" name="policy" type="text" placeholder="/confidentialite.html"></div>' +
          '<fieldset><legend class="legend">Catégories proposées</legend><div class="checks">' +
            '<label><input type="checkbox" name="cats" value="analytics" checked> Mesure d’audience</label>' +
            '<label><input type="checkbox" name="cats" value="marketing"> Publicité et réseaux sociaux</label>' +
            '<label><input type="checkbox" name="cats" value="functional"> Fonctionnalités (vidéos, cartes…)</label></div></fieldset>' +
          '<div class="row2"><div class="field"><label for="ck-bg">Fond</label><input id="ck-bg" name="bg" type="color" value="#18233a"></div>' +
          '<div class="field"><label for="ck-fg">Texte</label><input id="ck-fg" name="fg" type="color" value="#ffffff"></div></div>' +
          '<div class="row2"><div class="field"><label for="ck-accent">Boutons</label><input id="ck-accent" name="accent" type="color" value="#ffffff"></div>' +
          '<div class="field"><label for="ck-accentFg">Texte des boutons</label><input id="ck-accentFg" name="accentFg" type="color" value="#18233a"></div></div>' +
          '<div class="row2"><div class="field"><label for="ck-radius">Arrondi : <span id="ckRadiusV">10</span> px</label><input id="ck-radius" name="radius" type="range" min="0" max="24" value="10"></div>' +
          '<div class="field"><label for="ck-months">Durée du choix (mois)</label><input id="ck-months" name="months" type="number" min="1" max="13" value="6"><span class="hint">6 mois est la durée recommandée par la CNIL.</span></div></div>' +
        '</form>' +
        '<div class="out">' +
          '<div class="panel"><h3>Aperçu</h3><div class="cookie-stage" id="ckStage"><div class="fake">Votre page…</div></div>' +
          '<p class="small muted mt">Les deux boutons « accepter » et « refuser » ont exactement le même poids visuel : c’est ce que demandent la CNIL et la plupart des autorités européennes.</p></div>' +
          '<div class="panel"><div class="tabbar" role="tablist">' +
            '<button type="button" role="tab" aria-selected="true" data-tab="html">HTML</button>' +
            '<button type="button" role="tab" aria-selected="false" data-tab="css">CSS</button>' +
            '<button type="button" role="tab" aria-selected="false" data-tab="js">JavaScript</button></div>' +
            '<div data-pane="html">' + PW.codeBlock('ckHtml', 'À coller juste avant </body>', 'cookie-banner.html') + '</div>' +
            '<div data-pane="css" hidden>' + PW.codeBlock('ckCss', 'Dans votre feuille de style', 'cookie-banner.css') + '</div>' +
            '<div data-pane="js" hidden>' + PW.codeBlock('ckJs', 'Dans un fichier cookie-banner.js', 'cookie-banner.js') + '</div>' +
          '</div></div></div>';

      var form = PW.$('#ckForm', el);
      PW.persistForm(form, 'pw-tool-cookies');
      PW.wireCode(el);
      PW.$$('[data-tab]', el).forEach(function (b) {
        b.addEventListener('click', function () {
          PW.$$('[data-tab]', el).forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
          PW.$$('[data-pane]', el).forEach(function (p) { p.hidden = p.getAttribute('data-pane') !== b.getAttribute('data-tab'); });
        });
      });

      function update() {
        var d = PW.formData(form);
        PW.$('#ckRadiusV', el).textContent = d.radius;
        var stage = PW.$('#ckStage', el);
        stage.innerHTML = '<div class="fake">Votre page…</div>' + markup(d, true);
        var cb = stage.querySelector('.cb');
        cb.removeAttribute('id');
        cb.style.setProperty('--cb-bg', d.bg); cb.style.setProperty('--cb-fg', d.fg);
        cb.style.setProperty('--cb-accent', d.accent); cb.style.setProperty('--cb-accent-fg', d.accentFg);
        cb.style.setProperty('--cb-radius', d.radius + 'px');
        var more = cb.querySelector('.cb-more');
        if (more) more.addEventListener('click', function () {
          cb.querySelector('.cb-choices').hidden = false; more.hidden = true; cb.querySelector('.cb-save').hidden = false;
        });
        PW.$$('.cb-accept, .cb-refuse, .cb-save', cb).forEach(function (b) {
          b.addEventListener('click', function () { PW.toast('Dans votre site, la bannière se fermerait et le choix serait gardé ' + d.months + ' mois.'); });
        });
        PW.setCode('ckHtml', '<!-- Bannière cookies -->\n' + markup(d, false) + '\n<script src="/cookie-banner.js" defer></script>\n');
        PW.setCode('ckCss', css(d));
        PW.setCode('ckJs', js(d));
      }
      form.addEventListener('input', update);
      form.addEventListener('change', update);
      update();
    }
  });
})();
