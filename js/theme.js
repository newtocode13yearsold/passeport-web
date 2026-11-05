/* Runs in <head> before the page paints, so a saved dark/light choice never
 * flashes the wrong colours. No choice saved = follow the system setting. */
(function () {
  document.documentElement.lang = 'fr';
  try {
    var t = localStorage.getItem('pw-theme');
    if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t);
  } catch (e) { /* private window: just follow the system */ }
})();
