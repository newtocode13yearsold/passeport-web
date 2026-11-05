/* Small helpers shared by every page and tool. */
(function () {
  var PW = window.PW = window.PW || {};

  /** Escape text before putting it in innerHTML. */
  PW.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  PW.$ = function (sel, root) { return (root || document).querySelector(sel); };
  PW.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /** localStorage that never throws (private windows, blocked storage). */
  PW.store = {
    get: function (k, fallback) {
      try { var v = localStorage.getItem(k); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
    },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  };

  var toastTimer;
  PW.toast = function (msg) {
    var t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2200);
  };

  PW.copy = function (text, label) {
    function done() { PW.toast((label || 'Texte') + ' copié dans le presse-papiers'); }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.className = 'sr';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { PW.toast('Copie impossible : sélectionnez le texte à la main'); }
      ta.remove();
    }
  };

  // Hosted on claude.ai the page runs in a frame that blocks <a download>; files go through
  // the viewer's "downloads" capability instead (the viewer confirms each save). Anywhere
  // else window.claude does not exist and a normal download link is used.
  var hosted = !!(window.claude && typeof window.claude.use === 'function');
  var saver = hosted ? window.claude.use('downloads').catch(function () { return null; }) : null;

  // File types the claude.ai viewer accepts as is; anything else (.ico, .xml, .htaccess…) is wrapped in a .zip.
  var SAVE_OK = /\.(gif|png|jpe?g|webp|txt|json|md|csv|html|svg|pdf|zip)$/i;

  var CRC = (function () {
    var t = [];
    for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
    return t;
  })();
  function crc32(u8) { var c = 0xFFFFFFFF; for (var i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }

  /** Minimal .zip writer (no compression): files = [{name, data: Uint8Array}] -> Blob. */
  PW.zip = function (files) {
    var enc = new TextEncoder(), parts = [], central = [], offset = 0;
    files.forEach(function (f) {
      var name = enc.encode(f.name), crc = crc32(f.data), size = f.data.length;
      var lh = new DataView(new ArrayBuffer(30));
      lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true);
      lh.setUint16(12, 0x0021, true); lh.setUint32(14, crc, true); lh.setUint32(18, size, true); lh.setUint32(22, size, true);
      lh.setUint16(26, name.length, true);
      var ch = new DataView(new ArrayBuffer(46));
      ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true);
      ch.setUint16(14, 0x0021, true); ch.setUint32(16, crc, true); ch.setUint32(20, size, true); ch.setUint32(24, size, true);
      ch.setUint16(28, name.length, true); ch.setUint32(42, offset, true);
      parts.push(lh.buffer, name, f.data); central.push(ch.buffer, name);
      offset += 30 + name.length + size;
    });
    var cdSize = central.reduce(function (s, b) { return s + b.byteLength; }, 0);
    var end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
    end.setUint32(12, cdSize, true); end.setUint32(16, offset, true);
    return new Blob(parts.concat(central, [end.buffer]), { type: 'application/zip' });
  };

  PW.download = function (filename, content, type) {
    var blob = content instanceof Blob ? content : new Blob([content], { type: type || 'text/plain;charset=utf-8' });
    if (hosted) {
      var ready = SAVE_OK.test(filename) ? Promise.resolve({ name: filename, blob: blob })
        : blob.arrayBuffer().then(function (buf) {
          return { name: filename.replace(/^[._]+/, '').replace(/\.[^.]+$/, '') + '.zip', blob: PW.zip([{ name: filename, data: new Uint8Array(buf) }]) };
        });
      Promise.all([saver, ready]).then(function (r) {
        var dl = r[0], file = r[1];
        if (!dl) { PW.toast('Enregistrement indisponible ici : copiez le contenu à la place'); return; }
        dl.save({ filename: file.name, data: file.blob }).then(function () {
          if (file.name !== filename) { PW.toast(file.name + ' enregistré : ' + filename + ' est dedans'); return; }
          PW.toast(filename + ' enregistré');
        }, function (err) {
          var code = err && err.code;
          if (code === 'declined') return;
          if (code === 'rejected_extension' || code === 'extension_not_enabled') PW.toast('Ce type de fichier ne s’enregistre pas ici : copiez le contenu et créez le fichier ' + filename);
          else if (code === 'rate_limited') PW.toast('Une demande d’enregistrement est déjà ouverte');
          else PW.toast('Enregistrement impossible : copiez le contenu à la place');
        });
      });
      return;
    }
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    PW.toast(filename + ' téléchargé');
  };

  /** Two-step button instead of window.confirm (which hosted frames refuse): first click arms, second click acts. */
  PW.confirmClick = function (btn, armedLabel, action) {
    var label = btn.textContent, timer = null;
    btn.addEventListener('click', function () {
      if (btn.getAttribute('data-armed')) {
        clearTimeout(timer); btn.removeAttribute('data-armed'); btn.textContent = label;
        action();
        return;
      }
      btn.setAttribute('data-armed', '1'); btn.textContent = armedLabel;
      timer = setTimeout(function () { btn.removeAttribute('data-armed'); btn.textContent = label; }, 4000);
    });
  };

  PW.slug = function (s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  PW.host = function (url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return ''; }
  };

  /** "2026-11" -> "novembre 2026" */
  PW.monthName = function (ym) {
    var m = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    var p = String(ym || '').split('-');
    return p.length === 2 ? m[+p[1] - 1] + ' ' + p[0] : ym;
  };

  /** Code block with copy + download buttons. Returns HTML; wire with PW.wireCode. */
  PW.codeBlock = function (id, title, filename) {
    return '<div class="code" id="' + id + '">' +
      '<div class="code-bar"><strong class="small">' + PW.esc(title) + '</strong>' +
      '<div class="btn-row"><button class="btn small" type="button" data-copy>Copier</button>' +
      (filename ? '<button class="btn small ghost" type="button" data-dl="' + PW.esc(filename) + '">Télécharger</button>' : '') +
      '</div></div><pre tabindex="0"></pre></div>';
  };
  PW.wireCode = function (root) {
    PW.$$('.code', root).forEach(function (box) {
      if (box._wired) return; box._wired = true;
      box.addEventListener('click', function (e) {
        var pre = box.querySelector('pre');
        if (e.target.closest('[data-copy]')) PW.copy(pre.textContent, 'Code');
        var dl = e.target.closest('[data-dl]');
        if (dl) PW.download(dl.getAttribute('data-dl'), pre.textContent);
      });
    });
  };
  PW.setCode = function (id, text) {
    var pre = document.querySelector('#' + id + ' pre');
    if (pre) pre.textContent = text;
  };

  /** Read every named input of a form into a plain object (checkbox groups -> arrays). */
  PW.formData = function (form) {
    var o = {};
    PW.$$('input, select, textarea', form).forEach(function (el) {
      if (!el.name) return;
      if (el.type === 'checkbox') {
        if (el.hasAttribute('data-single')) { o[el.name] = el.checked; return; }
        o[el.name] = o[el.name] || [];
        if (el.checked) o[el.name].push(el.value);
      } else if (el.type === 'radio') {
        if (el.checked) o[el.name] = el.value;
      } else {
        o[el.name] = el.value.trim();
      }
    });
    return o;
  };

  /** Save / restore a tool form across visits (per tool). */
  PW.persistForm = function (form, key) {
    var saved = PW.store.get(key, null);
    if (saved) {
      PW.$$('input, select, textarea', form).forEach(function (el) {
        if (!el.name || !(el.name in saved)) return;
        var v = saved[el.name];
        if (el.type === 'checkbox') el.checked = el.hasAttribute('data-single') ? !!v : (Array.isArray(v) && v.indexOf(el.value) !== -1);
        else if (el.type === 'radio') el.checked = (v === el.value);
        else el.value = v;
      });
    }
    form.addEventListener('input', function () { PW.store.set(key, PW.formData(form)); });
    form.addEventListener('change', function () { PW.store.set(key, PW.formData(form)); });
  };

  PW.debounce = function (fn, ms) {
    var t; return function () { var a = arguments, c = this; clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, ms); };
  };

  /** Tool registry: each js/tools/*.js file calls PW.tool({...}). */
  PW.tools = [];
  PW.tool = function (def) { PW.tools.push(def); };
  PW.toolById = function (id) { return PW.tools.filter(function (t) { return t.id === id; })[0]; };

  PW.countries = [];
})();
