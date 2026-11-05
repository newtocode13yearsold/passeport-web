/* AI assistant under each manual. It uses the claude.ai viewer's "sample" capability:
 * Claude answers with the manual as context, on the viewer's own Claude account.
 * Outside claude.ai (local copy, other host) window.claude does not exist: the box says so. */
(function () {
  var PW = window.PW, esc = PW.esc;
  var hosted = !!(window.claude && typeof window.claude.use === 'function');
  var ready = hosted ? window.claude.use('sample').catch(function () { return null; }) : Promise.resolve(null);
  var blocked = false; // set after a permanent refusal (not_granted…) for the rest of the visit

  function plain(html) {
    return new DOMParser().parseFromString('<body>' + html, 'text/html').body.textContent.replace(/\s+/g, ' ').trim();
  }

  function rules(g, visible, locked) {
    var lines = visible.map(function (s, i) { return (i + 1) + '. ' + s.t + ' — ' + plain(s.b) + (s.ex ? '\n   Exemple : ' + s.ex.replace(/\n/g, '\n   ') : ''); });
    var rest = g.steps.slice(visible.length).map(function (s) { return s.t; });
    return 'Tu es l’assistant de Passeport Web, un site francophone qui aide à créer un site web et à le lancer dans les règles ' +
      '(fiches pour la France, la Belgique, la Suisse, l’Allemagne, l’Espagne, l’Italie, le Royaume-Uni, les États-Unis, le Canada, l’Inde, l’Australie et le Brésil).\n\n' +
      'Le lecteur est sur le manuel « ' + g.t + ' » : ' + g.d + '\n\nContenu du manuel :\n' + lines.join('\n') + '\n' +
      (locked ? '\nLes étapes suivantes font partie de la version premium, que le lecteur n’a pas débloquée : ' + rest.join(' ; ') + '. Réponds quand même à sa question, sans prétendre citer ces étapes.\n' : '') +
      '\nConsignes :\n' +
      '- Réponds en français, simplement, comme à un débutant, en 200 mots au plus sauf si on te demande plus de détails.\n' +
      '- Texte brut, sans Markdown : pas d’astérisques ni de #. Les listes avec des tirets sont permises.\n' +
      '- Appuie-toi sur le manuel ; précise quand ta réponse va au-delà.\n' +
      '- Pour une règle juridique, fiscale ou un chiffre : donne la règle générale, dis ce qui dépend du pays, et conseille de vérifier la source officielle ou un professionnel pour un cas important. Si tu ne sais pas, dis-le.\n' +
      '- Reste sur la création, la gestion et la conformité d’un site web ; sinon, recentre poliment.\n' +
      '- Ne demande jamais de mot de passe, de numéro de carte ni d’autre donnée sensible.';
  }

  PW.assistant = {};

  PW.assistant.html = function (g) {
    var sugg = ['Par quoi je commence ?', 'Explique l’étape « ' + g.steps[0].t + ' » plus simplement', 'Qu’est-ce qui change dans mon pays ?'];
    return '<section class="block ai" aria-labelledby="aiT">' +
      '<div class="ai-head">' + PW.icon('robot') + '<div><h2 id="aiT">Une question ? Demandez à l’assistant</h2>' +
        '<p class="small muted">' + PW.fr('Assistant IA (Claude) qui connaît ce manuel. Ses réponses peuvent contenir des erreurs : vérifiez avec les liens officiels avant une décision importante.') + '</p></div></div>' +
      '<div class="ai-log" id="aiLog" aria-live="polite"></div>' +
      '<div class="ai-sugg" id="aiSugg">' + sugg.map(function (s) { return '<button type="button" class="chip" data-q="' + esc(s) + '">' + esc(s) + '</button>'; }).join('') + '</div>' +
      '<form class="ai-form" id="aiForm">' +
        '<label class="sr" for="aiQ">Votre question</label>' +
        '<textarea id="aiQ" rows="2" maxlength="2000" placeholder="Ex. : je vends des bijoux depuis la Belgique, quelles étapes me concernent ?"></textarea>' +
        '<div class="btn-row"><button class="btn" type="submit" id="aiSend">Envoyer</button>' +
        '<button class="btn ghost" type="button" id="aiStop" hidden>Arrêter</button>' +
        '<button class="btn ghost small" type="button" id="aiNew" hidden>Nouvelle conversation</button></div>' +
      '</form>' +
      '<p class="ai-off note" id="aiOff" hidden></p></section>';
  };

  /** Wire the box; returns a cleanup function (aborts a running answer). */
  PW.assistant.wire = function (root, g, visible, locked) {
    var log = PW.$('#aiLog', root), form = PW.$('#aiForm', root), q = PW.$('#aiQ', root);
    var send = PW.$('#aiSend', root), stop = PW.$('#aiStop', root), fresh = PW.$('#aiNew', root);
    var sugg = PW.$('#aiSugg', root), off = PW.$('#aiOff', root);
    var turns = [], ctl = null, sample = null, gone = false;
    var RULES = rules(g, visible, locked);

    function disable(msg) {
      form.hidden = true; sugg.hidden = true;
      off.textContent = msg; off.hidden = false;
    }
    if (!hosted) disable('L’assistant fonctionne dans la version en ligne de Passeport Web, ouverte sur claude.ai.');
    else if (blocked) disable('L’assistant n’est pas autorisé pour cette page.');
    else {
      send.disabled = true; send.textContent = 'Connexion…';
      ready.then(function (s) {
        if (gone) return;
        if (!s) { disable('L’assistant n’est pas disponible ici.'); return; }
        sample = s; send.disabled = false; send.textContent = 'Envoyer';
      });
    }

    function bubble(role, text) {
      var b = document.createElement('div');
      b.className = 'ai-msg ' + role;
      var who = document.createElement('span'); who.className = 'ai-who'; who.textContent = role === 'me' ? 'Vous' : 'Assistant IA';
      var body = document.createElement('div'); body.className = 'ai-text'; body.textContent = text;
      b.appendChild(who); b.appendChild(body); log.appendChild(b);
      return body;
    }
    function busy(on) {
      send.hidden = on; stop.hidden = !on; q.disabled = on;
      PW.$$('button', sugg).forEach(function (x) { x.disabled = on; });
      fresh.hidden = on || !turns.length;
    }

    function ask(text) {
      text = String(text || '').trim();
      if (!text || !sample || ctl) return;
      sugg.hidden = true;
      bubble('me', text);
      turns.push({ role: 'user', content: text });
      while (turns.length > 16) turns.splice(0, 2); // keep the latest exchanges; RULES always stays first
      var out = bubble('ai', 'Réflexion…'); out.classList.add('thinking');
      q.value = ''; busy(true);
      ctl = new AbortController();
      sample([{ role: 'user', content: RULES }].concat(turns), {
        cache: false, signal: ctl.signal,
        onText: function (u) { out.classList.remove('thinking'); out.textContent = u.text; }
      }).then(function (r) {
        turns.push({ role: 'assistant', content: r.text });
        if (r.truncated) note(out, 'Réponse coupée : posez une question plus précise.');
      }, function (e) {
        var code = e && e.code;
        out.classList.remove('thinking');
        out.textContent = (e && e.text) || '';
        if (out.textContent) turns.push({ role: 'assistant', content: out.textContent });
        else turns.pop();
        if (code === 'cancelled') { if (!out.textContent) out.parentNode.remove(); return; }
        if (code === 'not_granted' || code === 'sampling_disabled' || code === 'not_declared' || code === 'capability_disabled' || code === 'capability_removed') {
          blocked = true; out.parentNode.remove();
          disable(code === 'not_granted' ? 'Vous n’avez pas autorisé l’assistant pour cette page. Rechargez-la pour changer d’avis.' : 'L’assistant n’est pas disponible pour ce compte.');
          return;
        }
        if (code === 'refused') { out.textContent = ''; note(out, 'L’assistant ne peut pas répondre à cette question. Reformulez-la.'); return; }
        note(out, code === 'rate_limited' ? 'Trop de questions d’un coup, ou limite d’utilisation atteinte : réessayez dans un moment.'
          : code === 'session_expired' ? 'Votre session claude.ai a expiré : reconnectez-vous puis réessayez.'
          : code === 'prompt_too_large' ? 'La conversation est trop longue : commencez-en une nouvelle.'
          : 'L’assistant n’a pas pu répondre. Réessayez.');
      }).then(function () {
        ctl = null;
        if (!gone) { busy(false); q.focus(); }
      });
    }
    function note(out, msg) {
      var p = document.createElement('p'); p.className = 'ai-note'; p.textContent = msg;
      out.parentNode.appendChild(p);
    }

    form.addEventListener('submit', function (e) { e.preventDefault(); ask(q.value); });
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); ask(q.value); }
    });
    sugg.addEventListener('click', function (e) { var b = e.target.closest('[data-q]'); if (b) ask(b.getAttribute('data-q')); });
    stop.addEventListener('click', function () { if (ctl) ctl.abort(); });
    fresh.addEventListener('click', function () { turns = []; log.innerHTML = ''; sugg.hidden = false; fresh.hidden = true; q.focus(); });

    return function () { gone = true; if (ctl) ctl.abort(); };
  };
})();
