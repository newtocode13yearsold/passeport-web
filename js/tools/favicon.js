/* Tool: favicon generator. Draws a letter or emoji on a shape with <canvas>,
 * then exports favicon.ico (16/32/48), SVG, Apple touch icon and PWA icons. */
(function () {
  var PW = window.PW, esc = PW.esc;

  var FONTS = {
    sans: '700 {s}px Inter, system-ui, sans-serif',
    serif: '700 {s}px Fraunces, Georgia, serif',
    mono: '700 {s}px ui-monospace, Consolas, monospace'
  };

  function draw(size, d) {
    var c = document.createElement('canvas');
    c.width = c.height = size;
    var x = c.getContext('2d');
    var r = d.shape === 'circle' ? size / 2 : d.shape === 'rounded' ? size * 0.22 : 0;
    if (d.shape !== 'none') {
      x.fillStyle = d.bg;
      x.beginPath();
      if (x.roundRect) x.roundRect(0, 0, size, size, r); else x.rect(0, 0, size, size);
      x.fill();
    }
    x.fillStyle = d.fg;
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.font = FONTS[d.font].replace('{s}', Math.round(size * d.scale / 100));
    x.fillText(d.text || 'A', size / 2, size * 0.54);
    return c;
  }

  function svg(d) {
    var r = d.shape === 'circle' ? 50 : d.shape === 'rounded' ? 22 : 0;
    var fam = { sans: 'system-ui, sans-serif', serif: 'Georgia, serif', mono: 'ui-monospace, monospace' }[d.font];
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      (d.shape !== 'none' ? '<rect width="100" height="100" rx="' + r + '" fill="' + esc(d.bg) + '"/>' : '') +
      '<text x="50" y="54" text-anchor="middle" dominant-baseline="central" font-family="' + fam + '" font-weight="700" font-size="' + d.scale + '" fill="' + esc(d.fg) + '">' + esc(d.text || 'A') + '</text></svg>\n';
  }

  function toBlob(canvas) {
    return new Promise(function (res) { canvas.toBlob(res, 'image/png'); });
  }

  /** Pack PNG images into one .ico file (PNG-in-ICO, supported everywhere since Vista). */
  function ico(blobs, sizes) {
    return Promise.all(blobs.map(function (b) { return b.arrayBuffer(); })).then(function (bufs) {
      var head = 6 + 16 * bufs.length, total = head + bufs.reduce(function (s, b) { return s + b.byteLength; }, 0);
      var out = new Uint8Array(total), v = new DataView(out.buffer);
      v.setUint16(0, 0, true); v.setUint16(2, 1, true); v.setUint16(4, bufs.length, true);
      var off = head;
      bufs.forEach(function (b, i) {
        var e = 6 + i * 16, s = sizes[i] >= 256 ? 0 : sizes[i];
        v.setUint8(e, s); v.setUint8(e + 1, s); v.setUint8(e + 2, 0); v.setUint8(e + 3, 0);
        v.setUint16(e + 4, 1, true); v.setUint16(e + 6, 32, true);
        v.setUint32(e + 8, b.byteLength, true); v.setUint32(e + 12, off, true);
        out.set(new Uint8Array(b), off); off += b.byteLength;
      });
      return new Blob([out], { type: 'image/x-icon' });
    });
  }

  PW.tool({
    id: 'favicon', group: 'Design et accessibilité', icon: 'image',
    t: 'Générateur de favicon',
    d: 'Une lettre ou un emoji, deux couleurs : l’outil crée favicon.ico, la version SVG, l’icône Apple et les icônes d’application, avec le code HTML.',
    render: function (el) {
      el.innerHTML =
        '<div class="tool-grid">' +
        '<form class="panel" id="fvForm" autocomplete="off">' +
          '<div class="field"><label for="fv-text">Lettres ou emoji <span class="hint">(1 à 2 caractères)</span></label><input id="fv-text" name="text" type="text" maxlength="4" value="AM"></div>' +
          '<div class="row2"><div class="field"><label for="fv-bg">Fond</label><input id="fv-bg" name="bg" type="color" value="#2146c7"></div>' +
          '<div class="field"><label for="fv-fg">Texte</label><input id="fv-fg" name="fg" type="color" value="#ffffff"></div></div>' +
          '<div class="row2"><div class="field"><label for="fv-shape">Forme</label><select id="fv-shape" name="shape"><option value="rounded">Carré arrondi</option><option value="circle">Rond</option><option value="square">Carré</option><option value="none">Sans fond</option></select></div>' +
          '<div class="field"><label for="fv-font">Police</label><select id="fv-font" name="font"><option value="sans">Sans empattement</option><option value="serif">Avec empattement</option><option value="mono">Machine à écrire</option></select></div></div>' +
          '<div class="field"><label for="fv-scale">Taille du texte : <span id="fvScaleV">56</span> %</label><input id="fv-scale" name="scale" type="range" min="30" max="90" value="56"></div>' +
          '<div class="field"><label for="fv-name">Nom de l’application <span class="hint">(pour le manifest)</span></label><input id="fv-name" name="name" type="text" value="Atelier Martin"></div>' +
        '</form>' +
        '<div class="out"><div class="panel"><h3>Aperçu</h3><div class="fav-previews" id="fvPrev"></div>' +
          '<div class="btn-row mt"><button class="btn small" type="button" id="fvZip">Tout enregistrer (.zip)</button>' +
          '<button class="btn small ghost" type="button" id="fvIco">favicon.ico</button>' +
          '<button class="btn small ghost" type="button" id="fvSvg">favicon.svg</button>' +
          '<button class="btn small ghost" type="button" data-png="180">apple-touch-icon.png</button>' +
          '<button class="btn small ghost" type="button" data-png="192">icon-192.png</button>' +
          '<button class="btn small ghost" type="button" data-png="512">icon-512.png</button></div></div>' +
          '<div class="panel">' + PW.codeBlock('fvHtml', 'À coller dans <head>', 'favicon-head.html') + '</div>' +
          '<div class="panel">' + PW.codeBlock('fvManifest', 'manifest.webmanifest (facultatif)', 'manifest.webmanifest') + '</div>' +
        '</div></div>';

      var form = PW.$('#fvForm', el), d;
      PW.persistForm(form, 'pw-tool-favicon');
      PW.wireCode(el);

      function update() {
        d = PW.formData(form); d.scale = +d.scale || 56;
        PW.$('#fvScaleV', el).textContent = d.scale;
        var prev = PW.$('#fvPrev', el); prev.innerHTML = '';
        [[16, 32], [32, 64], [180, 90], [512, 128]].forEach(function (p) {
          var fig = document.createElement('figure');
          var cv = draw(p[0], d);
          cv.style.width = cv.style.height = p[1] + 'px';
          cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', 'Icône ' + p[0] + ' pixels');
          fig.appendChild(cv);
          var cap = document.createElement('figcaption'); cap.textContent = p[0] + ' × ' + p[0];
          fig.appendChild(cap); prev.appendChild(fig);
        });
        PW.setCode('fvHtml',
          '<link rel="icon" href="/favicon.ico" sizes="48x48">\n' +
          '<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n' +
          '<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n' +
          '<link rel="manifest" href="/manifest.webmanifest">\n');
        PW.setCode('fvManifest', JSON.stringify({
          name: d.name || 'Mon site', short_name: (d.name || 'Mon site').slice(0, 12),
          icons: [{ src: '/icon-192.png', type: 'image/png', sizes: '192x192' }, { src: '/icon-512.png', type: 'image/png', sizes: '512x512' }],
          theme_color: d.bg, background_color: '#ffffff', display: 'standalone', start_url: '/'
        }, null, 2) + '\n');
      }
      form.addEventListener('input', update);
      form.addEventListener('change', update);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
      update();

      PW.$('#fvIco', el).addEventListener('click', function () {
        var sizes = [16, 32, 48];
        Promise.all(sizes.map(function (s) { return toBlob(draw(s, d)); }))
          .then(function (b) { return ico(b, sizes); })
          .then(function (blob) { PW.download('favicon.ico', blob); });
      });
      PW.$('#fvSvg', el).addEventListener('click', function () { PW.download('favicon.svg', svg(d), 'image/svg+xml'); });
      PW.$('#fvZip', el).addEventListener('click', function () {
        var icoSizes = [16, 32, 48], enc = new TextEncoder();
        var bytes = function (b) { return b.arrayBuffer().then(function (x) { return new Uint8Array(x); }); };
        Promise.all([
          Promise.all(icoSizes.map(function (s) { return toBlob(draw(s, d)); })).then(function (b) { return ico(b, icoSizes); }).then(bytes),
          toBlob(draw(180, d)).then(bytes), toBlob(draw(192, d)).then(bytes), toBlob(draw(512, d)).then(bytes)
        ]).then(function (r) {
          PW.download('favicons.zip', PW.zip([
            { name: 'favicon.ico', data: r[0] }, { name: 'favicon.svg', data: enc.encode(svg(d)) },
            { name: 'apple-touch-icon.png', data: r[1] }, { name: 'icon-192.png', data: r[2] }, { name: 'icon-512.png', data: r[3] },
            { name: 'manifest.webmanifest', data: enc.encode(PW.$('#fvManifest pre', el).textContent) },
            { name: 'a-coller-dans-head.html', data: enc.encode(PW.$('#fvHtml pre', el).textContent) }
          ]));
        });
      });
      PW.$$('[data-png]', el).forEach(function (b) {
        b.addEventListener('click', function () {
          var s = +b.getAttribute('data-png');
          toBlob(draw(s, d)).then(function (blob) { PW.download(s === 180 ? 'apple-touch-icon.png' : 'icon-' + s + '.png', blob); });
        });
      });
    }
  });
})();
