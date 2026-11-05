/* Tools: WCAG contrast checker, security headers builder, email DNS (SPF/DMARC). */
(function () {
  var PW = window.PW, esc = PW.esc;

  /* ---------- Contrast ---------- */
  function hexToRgb(h) {
    h = String(h || '').trim().replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    if (!/^[0-9a-f]{6}$/i.test(h)) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function rgbToHex(c) { return '#' + c.map(function (v) { return ('0' + Math.round(v).toString(16)).slice(-2); }).join(''); }
  function lum(c) {
    var a = c.map(function (v) { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  /** Nudge fg toward black or white until it reaches the target ratio on bg. */
  function fix(fg, bg, target) {
    var toward = lum(bg) > 0.18 ? [0, 0, 0] : [255, 255, 255];
    for (var t = 0; t <= 1.0001; t += 0.01) {
      var c = fg.map(function (v, i) { return v + (toward[i] - v) * t; });
      if (ratio(c, bg) >= target) return rgbToHex(c);
    }
    return rgbToHex(toward);
  }
  PW.contrastRatio = ratio; PW.hexToRgb = hexToRgb;

  PW.tool({
    id: 'contraste', group: 'Design et accessibilité', icon: 'contrast',
    t: 'Vérificateur de contraste',
    d: 'Vos couleurs de texte et de fond passent-elles les règles WCAG ? Le ratio, les niveaux AA et AAA, et une couleur corrigée si besoin.',
    render: function (el) {
      el.innerHTML =
        '<div class="tool-grid">' +
        '<form class="panel" id="ctForm" autocomplete="off">' +
          '<div class="field"><span>Couleur du texte</span><div class="btn-row"><input type="color" id="ct-fgp" aria-label="Choisir la couleur du texte"><input type="text" id="ct-fg" name="fg" value="#6b7c93" aria-label="Code de la couleur du texte"></div></div>' +
          '<div class="field"><span>Couleur du fond</span><div class="btn-row"><input type="color" id="ct-bgp" aria-label="Choisir la couleur du fond"><input type="text" id="ct-bg" name="bg" value="#ffffff" aria-label="Code de la couleur du fond"></div></div>' +
          '<button class="btn small ghost" type="button" id="ctSwap">Inverser texte et fond</button>' +
          '<p class="small muted mt">Règles WCAG 2.1 : 4,5:1 pour le texte normal, 3:1 pour le grand texte (24 px, ou 18,5 px en gras) et pour les icônes ou bordures de champs.</p>' +
        '</form>' +
        '<div class="out"><div class="swatch-pair" id="ctSwatch"><div class="big-t">Un grand titre</div><p>Un paragraphe de texte normal pour juger de la lisibilité, avec un <u>lien souligné</u>.</p></div>' +
        '<div class="verdict mt" id="ctOut" aria-live="polite"></div></div></div>';

      var form = PW.$('#ctForm', el), fg = PW.$('#ct-fg', el), bg = PW.$('#ct-bg', el), fgp = PW.$('#ct-fgp', el), bgp = PW.$('#ct-bgp', el);
      PW.persistForm(form, 'pw-tool-contrast');
      fgp.addEventListener('input', function () { fg.value = fgp.value; update(); });
      bgp.addEventListener('input', function () { bg.value = bgp.value; update(); });
      PW.$('#ctSwap', el).addEventListener('click', function () { var t = fg.value; fg.value = bg.value; bg.value = t; update(); });
      form.addEventListener('input', update);

      function update() {
        var a = hexToRgb(fg.value), b = hexToRgb(bg.value), out = PW.$('#ctOut', el);
        if (!a || !b) { out.className = 'verdict'; out.innerHTML = '<p>Entrez deux couleurs au format <code>#rrggbb</code>.</p>'; return; }
        fgp.value = rgbToHex(a); bgp.value = rgbToHex(b);
        var sw = PW.$('#ctSwatch', el);
        sw.style.setProperty('color', rgbToHex(a)); sw.style.setProperty('background', rgbToHex(b));
        var r = ratio(a, b), rs = r.toFixed(2).replace('.', ',');
        var tests = [['AA texte normal', 4.5], ['AA grand texte', 3], ['AAA texte normal', 7], ['AAA grand texte', 4.5], ['Icônes et bordures', 3]];
        var html = '<div class="big">' + rs + ':1</div><p>' + (r >= 4.5 ? 'Lisible pour tout le texte au niveau AA.' : r >= 3 ? 'Suffisant seulement pour le grand texte et les éléments graphiques.' : 'Trop faible : ce texte sera difficile à lire pour beaucoup de personnes.') + '</p><div class="meter">' +
          tests.map(function (t) { var ok = r >= t[1]; return '<span class="pill ' + (ok ? 'pass' : 'fail') + '">' + t[0] + ' : ' + (ok ? 'réussi' : 'échec') + '</span>'; }).join('') + '</div>';
        if (r < 4.5) {
          var f = fix(a, b, 4.5);
          html += '<p class="small mt">Couleur de texte la plus proche qui passe AA : <code>' + f + '</code> <button class="btn small ghost" type="button" data-use="' + f + '">Utiliser</button></p>';
        }
        out.className = 'verdict ' + (r >= 4.5 ? 'no' : 'yes');
        out.innerHTML = html;
        var use = out.querySelector('[data-use]');
        if (use) use.addEventListener('click', function () { fg.value = use.getAttribute('data-use'); update(); form.dispatchEvent(new Event('input')); });
      }
      update();
    }
  });

  /* ---------- Security headers ---------- */
  PW.tool({
    id: 'en-tetes-securite', group: 'Technique', icon: 'lock',
    t: 'Générateur d’en-têtes de sécurité',
    d: 'Content-Security-Policy, HSTS, Referrer-Policy… en quelques cases, pour Netlify, Cloudflare Pages, Vercel, Apache ou Nginx.',
    render: function (el) {
      el.innerHTML =
        '<div class="tool-grid">' +
        '<form class="panel" id="hdForm" autocomplete="off">' +
          '<h3>HTTPS</h3><div class="checks">' +
            '<label><input type="checkbox" name="hsts" data-single checked> HSTS : toujours utiliser HTTPS (2 ans)</label>' +
            '<label><input type="checkbox" name="sub" data-single checked> … y compris les sous-domaines</label>' +
            '<label><input type="checkbox" name="preload" data-single> … et demander l’inscription à la liste « preload »</label></div>' +
          '<h3 class="mt">Content-Security-Policy</h3>' +
          '<div class="checks">' +
            '<label><input type="checkbox" name="cspOn" data-single checked> Activer une CSP (n’autorise que vos propres fichiers par défaut)</label>' +
            '<label><input type="checkbox" name="reportOnly" data-single> Mode test (Report-Only) : signale sans bloquer</label>' +
            '<label><input type="checkbox" name="inlineStyle" data-single> Autoriser les styles en ligne (style="…")</label>' +
            '<label><input type="checkbox" name="imgHttps" data-single> Autoriser les images de n’importe quel site HTTPS</label>' +
            '<label><input type="checkbox" name="youtube" data-single> Autoriser les vidéos YouTube intégrées (youtube-nocookie.com)</label>' +
            '<label><input type="checkbox" name="frameSelf" data-single> Autoriser mon propre site à s’afficher dans une iframe</label></div>' +
          '<div class="field mt"><label for="hd-script">Autres sources de scripts <span class="hint">(séparées par des espaces)</span></label><input id="hd-script" name="script" type="text" placeholder="https://plausible.io"></div>' +
          '<div class="field"><label for="hd-connect">Autres sources de connexion (API, statistiques)</label><input id="hd-connect" name="connect" type="text" placeholder="https://plausible.io"></div>' +
          '<div class="field"><label for="hd-ref">Referrer-Policy</label><select id="hd-ref" name="ref"><option>strict-origin-when-cross-origin</option><option>no-referrer</option><option>same-origin</option><option>strict-origin</option></select></div>' +
        '</form>' +
        '<div class="out"><div class="panel"><div class="tabbar" role="tablist">' +
          '<button type="button" role="tab" aria-selected="true" data-tab="headers">_headers</button>' +
          '<button type="button" role="tab" aria-selected="false" data-tab="vercel">vercel.json</button>' +
          '<button type="button" role="tab" aria-selected="false" data-tab="apache">.htaccess</button>' +
          '<button type="button" role="tab" aria-selected="false" data-tab="nginx">Nginx</button>' +
          '<button type="button" role="tab" aria-selected="false" data-tab="meta">Balise meta</button></div>' +
          '<div data-pane="headers">' + PW.codeBlock('hdNetlify', 'Netlify et Cloudflare Pages : fichier _headers à la racine', '_headers') + '</div>' +
          '<div data-pane="vercel" hidden>' + PW.codeBlock('hdVercel', 'Vercel : vercel.json', 'vercel.json') + '</div>' +
          '<div data-pane="apache" hidden>' + PW.codeBlock('hdApache', 'Apache (hébergement mutualisé) : .htaccess', '.htaccess') + '</div>' +
          '<div data-pane="nginx" hidden>' + PW.codeBlock('hdNginx', 'Nginx : dans le bloc server', 'security-headers.conf') + '</div>' +
          '<div data-pane="meta" hidden>' + PW.codeBlock('hdMeta', 'Sans accès aux en-têtes : dans <head> (CSP seulement)', 'csp-meta.html') + '<p class="small muted mt">La balise meta ne permet ni HSTS ni frame-ancestors : c’est un dernier recours.</p></div>' +
        '</div><p class="note small">Commencez en mode test, ouvrez la console du navigateur, corrigez ce qui est bloqué, puis passez en mode normal. Vérifiez la note sur <a href="https://developer.mozilla.org/fr/observatory" target="_blank" rel="noopener">Mozilla Observatory</a>.</p></div></div>';

      var form = PW.$('#hdForm', el);
      PW.persistForm(form, 'pw-tool-headers');
      PW.wireCode(el); PW.tabs(el);

      function update() {
        var d = PW.formData(form), h = [];
        if (d.hsts) h.push(['Strict-Transport-Security', 'max-age=63072000' + (d.sub ? '; includeSubDomains' : '') + (d.preload ? '; preload' : '')]);
        var csp = null;
        if (d.cspOn) {
          var dir = [
            "default-src 'self'",
            "script-src 'self'" + (d.script ? ' ' + d.script : ''),
            "style-src 'self'" + (d.inlineStyle ? " 'unsafe-inline'" : ''),
            "img-src 'self' data:" + (d.imgHttps ? ' https:' : ''),
            "font-src 'self'",
            "connect-src 'self'" + (d.connect ? ' ' + d.connect : ''),
            d.youtube ? 'frame-src https://www.youtube-nocookie.com' : "frame-src 'none'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            'frame-ancestors ' + (d.frameSelf ? "'self'" : "'none'"),
            'upgrade-insecure-requests'
          ];
          csp = dir.join('; ');
          h.push([d.reportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy', csp]);
        }
        h.push(['X-Content-Type-Options', 'nosniff']);
        h.push(['X-Frame-Options', d.frameSelf ? 'SAMEORIGIN' : 'DENY']);
        h.push(['Referrer-Policy', d.ref]);
        h.push(['Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()']);
        h.push(['Cross-Origin-Opener-Policy', 'same-origin']);

        PW.setCode('hdNetlify', '/*\n' + h.map(function (x) { return '  ' + x[0] + ': ' + x[1]; }).join('\n') + '\n');
        PW.setCode('hdVercel', JSON.stringify({ headers: [{ source: '/(.*)', headers: h.map(function (x) { return { key: x[0], value: x[1] }; }) }] }, null, 2) + '\n');
        PW.setCode('hdApache', '<IfModule mod_headers.c>\n' + h.map(function (x) { return '  Header always set ' + x[0] + ' "' + x[1] + '"'; }).join('\n') + '\n</IfModule>\n');
        PW.setCode('hdNginx', h.map(function (x) { return 'add_header ' + x[0] + ' "' + x[1] + '" always;'; }).join('\n') + '\n');
        PW.setCode('hdMeta', csp ? '<meta http-equiv="Content-Security-Policy" content="' + esc(csp.replace(/; frame-ancestors [^;]+/, '')) + '">\n' : '<!-- Activez la CSP pour obtenir la balise -->\n');
      }
      form.addEventListener('input', update);
      form.addEventListener('change', update);
      update();
    }
  });

  /* ---------- Email DNS: SPF + DMARC ---------- */
  var SENDERS = [
    ['google', 'Google Workspace (Gmail)', 'include:_spf.google.com'],
    ['microsoft', 'Microsoft 365 (Outlook)', 'include:spf.protection.outlook.com'],
    ['proton', 'Proton Mail', 'include:_spf.protonmail.ch'],
    ['ovh', 'OVHcloud', 'include:mx.ovh.com'],
    ['infomaniak', 'Infomaniak', 'include:spf.infomaniak.ch'],
    ['gandi', 'Gandi Mail', 'include:_mailcust.gandi.net'],
    ['fastmail', 'Fastmail', 'include:spf.messagingengine.com'],
    ['ses', 'Amazon SES', 'include:amazonses.com'],
    ['mailgun', 'Mailgun', 'include:mailgun.org'],
    ['sendgrid', 'SendGrid', 'include:sendgrid.net']
  ];

  PW.tool({
    id: 'email-dns', group: 'Technique', icon: 'mail',
    t: 'Générateur SPF et DMARC',
    d: 'Les enregistrements DNS qui évitent que vos emails finissent en spam et que d’autres envoient des emails à votre nom.',
    render: function (el) {
      var checks = SENDERS.map(function (s) { return '<label><input type="checkbox" name="senders" value="' + s[0] + '"' + (s[0] === 'google' ? ' checked' : '') + '> ' + esc(s[1]) + '</label>'; }).join('');
      el.innerHTML =
        '<div class="tool-grid">' +
        '<form class="panel" id="emForm" autocomplete="off">' +
          '<div class="field"><label for="em-domain">Votre domaine</label><input id="em-domain" name="domain" type="text" value="atelier-martin.fr"></div>' +
          '<div class="checks"><label><input type="checkbox" name="none" data-single> Ce domaine n’envoie <strong>jamais</strong> d’email (le protéger contre l’usurpation)</label></div>' +
          '<div data-only="send"><fieldset class="mt"><legend class="legend">Services qui envoient des emails pour vous</legend><div class="checks">' + checks + '</div></fieldset>' +
          '<div class="field"><label for="em-extra">Autres valeurs SPF <span class="hint">(ex. include:… ou ip4:…)</span></label><input id="em-extra" name="extra" type="text"></div>' +
          '<div class="field"><label for="em-all">Que faire des autres serveurs ?</label><select id="em-all" name="all"><option value="~all">~all — marquer comme suspect (recommandé au début)</option><option value="-all">-all — rejeter</option></select></div>' +
          '<div class="field"><label for="em-p">Politique DMARC</label><select id="em-p" name="p"><option value="none">none — observer seulement (pour commencer)</option><option value="quarantine">quarantine — envoyer en spam</option><option value="reject">reject — refuser</option></select></div>' +
          '<div class="field"><label for="em-rua">Adresse qui reçoit les rapports DMARC</label><input id="em-rua" name="rua" type="email" placeholder="dmarc@atelier-martin.fr"></div></div>' +
        '</form>' +
        '<div class="out"><div class="panel"><h3>Enregistrements à créer chez votre registraire</h3><div id="emTable"></div></div>' +
          PW.codeBlock('emZone', 'Format fichier de zone (BIND)', 'zone-email.txt') +
          '<p class="note small mt">Le DKIM est propre à chaque service : il vous donne un nom (selecteur._domainkey) et une longue valeur à copier. Les enregistrements MX sont aussi fournis par votre service email. Vérifiez chaque valeur SPF dans la documentation de votre fournisseur.</p>' +
        '</div></div>';

      var form = PW.$('#emForm', el);
      PW.persistForm(form, 'pw-tool-email');
      PW.wireCode(el);
      function update() {
        var d = PW.formData(form), dom = (d.domain || 'exemple.com').replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
        PW.$$('[data-only="send"]', el).forEach(function (n) { n.hidden = d.none; });
        var rows = [];
        if (d.none) {
          rows.push(['TXT', dom, 'v=spf1 -all']);
          rows.push(['TXT', '_dmarc.' + dom, 'v=DMARC1; p=reject; adkim=s; aspf=s']);
          rows.push(['MX', dom, '0 .']);
        } else {
          var inc = SENDERS.filter(function (s) { return (d.senders || []).indexOf(s[0]) !== -1; }).map(function (s) { return s[2]; });
          if (d.extra) inc = inc.concat(d.extra.split(/\s+/).filter(Boolean));
          rows.push(['TXT', dom, ['v=spf1'].concat(inc).concat([d.all]).join(' ')]);
          rows.push(['TXT', '_dmarc.' + dom, 'v=DMARC1; p=' + d.p + (d.rua ? '; rua=mailto:' + d.rua : '') + '; adkim=r; aspf=r']);
          rows.push(['TXT', 'selecteur._domainkey.' + dom, '(valeur DKIM fournie par votre service)']);
        }
        var warn = '';
        var incCount = (rows[0][2].match(/include:/g) || []).length;
        if (incCount > 8) warn = '<p class="note warn small">SPF est limité à 10 recherches DNS : avec ' + incCount + ' « include », vous risquez de dépasser la limite.</p>';
        PW.$('#emTable', el).innerHTML = '<div class="tbl"><table><thead><tr><th>Type</th><th>Nom</th><th>Valeur</th></tr></thead><tbody>' +
          rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td><code>' + esc(r[1]) + '</code></td><td><code>' + esc(r[2]) + '</code></td></tr>'; }).join('') + '</tbody></table></div>' + warn;
        PW.setCode('emZone', rows.filter(function (r) { return r[2].charAt(0) !== '('; }).map(function (r) { return r[1] + '.\t3600\tIN\t' + r[0] + '\t' + (r[0] === 'TXT' ? '"' + r[2] + '"' : r[2]); }).join('\n') + '\n');
      }
      form.addEventListener('input', update);
      form.addEventListener('change', update);
      update();
    }
  });
})();
