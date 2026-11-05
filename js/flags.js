/* Simplified SVG flags, drawn once in a hidden sprite and reused with <use>.
 * Emoji flags show as two letters on Windows, so the site draws its own.
 * PW.flag('fr') returns the markup for one flag. */
(function () {
  var PW = window.PW;

  function star(cx, cy, R, r, n) {
    var pts = [];
    for (var i = 0; i < n * 2; i++) {
      var a = Math.PI / n * i - Math.PI / 2;
      var rad = i % 2 ? r : R;
      pts.push((cx + rad * Math.cos(a)).toFixed(2) + ',' + (cy + rad * Math.sin(a)).toFixed(2));
    }
    return '<polygon points="' + pts.join(' ') + '"/>';
  }

  function usStars() {
    var s = '';
    for (var row = 0; row < 9; row++) {
      var cols = row % 2 ? 5 : 6;
      for (var c = 0; c < cols; c++) {
        var x = 6.3 + c * 12.6 + (row % 2 ? 6.3 : 0);
        var y = 5.4 + row * 5.4;
        s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.9"/>';
      }
    }
    return s;
  }

  function usStripes() {
    var s = '';
    for (var i = 0; i < 13; i += 2) s += '<rect y="' + (i * 100 / 13).toFixed(3) + '" width="190" height="' + (100 / 13).toFixed(3) + '" fill="#B22234"/>';
    return s;
  }

  function euStars() {
    var s = '';
    for (var i = 0; i < 12; i++) {
      var a = Math.PI * 2 / 12 * i;
      s += star(15 + 6 * Math.sin(a), 10 - 6 * Math.cos(a), 1.1, .45, 5);
    }
    return s;
  }

  var V3 = 'viewBox="0 0 30 20"';
  var symbols = {
    fr: V3 + '><rect width="10" height="20" fill="#0055A4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#EF4135"/>',
    be: V3 + '><rect width="10" height="20" fill="#000"/><rect x="10" width="10" height="20" fill="#FDDA24"/><rect x="20" width="10" height="20" fill="#EF3340"/>',
    it: V3 + '><rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#CE2B37"/>',
    de: V3 + '><rect width="30" height="6.67" fill="#000"/><rect y="6.67" width="30" height="6.67" fill="#DD0000"/><rect y="13.33" width="30" height="6.67" fill="#FFCE00"/>',
    es: V3 + '><rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/>',
    ch: V3 + '><rect width="30" height="20" fill="#DA291C"/><rect x="13" y="4" width="4" height="12" fill="#fff"/><rect x="9" y="8" width="12" height="4" fill="#fff"/>',
    uk: 'viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice"><clipPath id="ukc"><path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z"/></clipPath>' +
      '<rect width="60" height="30" fill="#012169"/><path d="M0,0L60,30M60,0L0,30" stroke="#fff" stroke-width="6"/>' +
      '<path d="M0,0L60,30M60,0L0,30" clip-path="url(#ukc)" stroke="#C8102E" stroke-width="4"/>' +
      '<path d="M30,0v30M0,15h60" stroke="#fff" stroke-width="10"/><path d="M30,0v30M0,15h60" stroke="#C8102E" stroke-width="6"/>',
    us: 'viewBox="0 0 190 100" preserveAspectRatio="xMidYMid slice"><rect width="190" height="100" fill="#fff"/>' + usStripes() +
      '<rect width="76" height="53.85" fill="#3C3B6E"/><g fill="#fff">' + usStars() + '</g>',
    ca: 'viewBox="0 0 40 20" preserveAspectRatio="xMidYMid slice"><rect width="40" height="20" fill="#fff"/><rect width="10" height="20" fill="#D52B1E"/><rect x="30" width="10" height="20" fill="#D52B1E"/>' +
      '<path fill="#D52B1E" d="M20,3L21.5,6L23,5.3L22.5,9L25,6.8L25.6,8.3L27.8,7.9L27,10.4L28,11L24.5,13.9L25,15.3L20.7,14.8L20.8,17.5L19.2,17.5L19.3,14.8L15,15.3L15.5,13.9L12,11L13,10.4L12.2,7.9L14.4,8.3L15,6.8L17.5,9L17,5.3L18.5,6Z"/>',
    in: V3 + '><rect width="30" height="6.67" fill="#FF9933"/><rect y="6.67" width="30" height="6.67" fill="#fff"/><rect y="13.33" width="30" height="6.67" fill="#138808"/>' +
      '<circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" stroke-width=".55"/><circle cx="15" cy="10" r=".6" fill="#000080"/>' +
      '<path d="M15,7.4V12.6M12.4,10H17.6M13.16,8.16L16.84,11.84M16.84,8.16L13.16,11.84" stroke="#000080" stroke-width=".25"/>',
    au: 'viewBox="0 0 40 20" preserveAspectRatio="xMidYMid slice"><rect width="40" height="20" fill="#012169"/><use href="#f-uk" width="20" height="10"/>' +
      '<g fill="#fff">' + star(10, 15, 3, 1.3, 7) + star(30, 16.5, 1.5, .65, 7) + star(25.5, 8.5, 1.5, .65, 7) + star(30, 3.8, 1.5, .65, 7) + star(34.2, 7.5, 1.5, .65, 7) + star(32, 10.6, .9, .4, 5) + '</g>',
    br: 'viewBox="0 0 30 21" preserveAspectRatio="xMidYMid slice"><rect width="30" height="21" fill="#009C3B"/><polygon points="15,2 28,10.5 15,19 2,10.5" fill="#FFDF00"/>' +
      '<circle cx="15" cy="10.5" r="5.2" fill="#002776"/><path d="M10,9.4C13,8.6 17.5,9.2 20,11.4" stroke="#fff" stroke-width=".9" fill="none"/>',
    eu: V3 + '><rect width="30" height="20" fill="#003399"/><g fill="#FFCC00">' + euStars() + '</g>'
  };

  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="0" height="0" class="sr"><defs>';
  Object.keys(symbols).forEach(function (k) { sprite += '<symbol id="f-' + k + '" ' + symbols[k] + '</symbol>'; });
  sprite += '</defs></svg>';
  document.body.insertAdjacentHTML('afterbegin', sprite);

  PW.flag = function (code, cls, label) {
    return '<svg class="' + (cls || 'flag') + '" viewBox="0 0 30 20" preserveAspectRatio="none" role="img" aria-label="' +
      PW.esc(label || ('Drapeau ' + code.toUpperCase())) + '"><use href="#f-' + code + '"/></svg>';
  };
})();
