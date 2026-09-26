/* The Hanukkah Fairy: site behavior. Vanilla, no build step. */
(function () {
  'use strict';

  /* ---------- CONFIG: fill these in before deploy ----------
     MC_URL: Mailchimp "post-json" endpoint for the audience (same pattern as kitchenblockparty).
             Audience > Signup forms > Embedded form > copy the action URL, swap /post? for /post-json?
     PREORDER_URL: retailer link (Amazon, Bookshop.org, etc). Leave empty to keep the button hidden. */
  var MC_URL = '';
  var PREORDER_URL = '';

  /* ---------- sparkles ---------- */
  function seedSparkles(host, count) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var s = document.createElement('span');
      var dot = Math.random() < 0.45;
      s.className = 'sparkle' + (dot ? ' sparkle--dot' : '');
      s.style.left = (Math.random() * 100).toFixed(2) + '%';
      s.style.top = (Math.random() * 100).toFixed(2) + '%';
      var size = dot ? 3 + Math.random() * 4 : 8 + Math.random() * 12;
      s.style.width = size.toFixed(1) + 'px';
      s.style.height = size.toFixed(1) + 'px';
      s.style.setProperty('--dur', (2.2 + Math.random() * 3).toFixed(2) + 's');
      s.style.setProperty('--delay', (Math.random() * 4).toFixed(2) + 's');
      frag.appendChild(s);
    }
    host.appendChild(frag);
  }
  document.querySelectorAll('.sparkles').forEach(function (host) {
    seedSparkles(host, host.classList.contains('sparkles--few') ? 26 : 54);
  });

  /* ---------- fit display lines: explicit breaks only, shrink until every line fits ---------- */
  function fitDisplay() {
    document.querySelectorAll('.display, .statement, .coda p, .bubble').forEach(function (el) {
      el.style.fontSize = '';
      var size = parseFloat(getComputedStyle(el).fontSize);
      var floor = el.classList.contains('bubble') ? 12 : 16;
      var guard = 0;
      while (el.scrollWidth > el.clientWidth + 1 && size > floor && guard++ < 40) {
        size -= 1;
        el.style.fontSize = size + 'px';
      }
    });
  }
  var fitTimer;
  window.addEventListener('resize', function () { clearTimeout(fitTimer); fitTimer = setTimeout(fitDisplay, 120); });
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(fitDisplay); }
  fitDisplay();

  /* ---------- mobile menu ---------- */
  var burger = document.querySelector('.nav__burger');
  var menu = document.getElementById('mobile-menu');
  function closeMenu() {
    menu.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
  }
  burger.addEventListener('click', function () {
    var open = menu.hidden;
    menu.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
  });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) closeMenu(); });

  /* ---------- pre-order button ---------- */
  document.querySelectorAll('[data-preorder]').forEach(function (a) {
    if (PREORDER_URL) { a.href = PREORDER_URL; a.hidden = false; }
  });

  /* ---------- email capture (Mailchimp JSONP) ---------- */
  function setStatus(form, msg, kind) {
    var el = form.querySelector('.capture__status');
    el.textContent = msg;
    el.className = 'capture__status' + (kind ? ' is-' + kind : '');
  }
  function jsonp(url, cb) {
    var name = 'mcCallback' + Date.now() + Math.floor(Math.random() * 1000);
    var script = document.createElement('script');
    var done = false;
    window[name] = function (data) { done = true; cb(null, data); cleanup(); };
    function cleanup() { delete window[name]; if (script.parentNode) script.parentNode.removeChild(script); }
    script.src = url + '&c=' + name;
    script.onerror = function () { cb(new Error('network')); cleanup(); };
    setTimeout(function () { if (!done) { cb(new Error('timeout')); cleanup(); } }, 12000);
    document.body.appendChild(script);
  }
  document.querySelectorAll('[data-capture]').forEach(function (form) {
    var input = form.querySelector('input[type="email"]');
    var btn = form.querySelector('button');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = input.value.trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
      input.setAttribute('aria-invalid', String(!ok));
      if (!ok) { setStatus(form, 'That email looks off. One more try?', 'err'); input.focus(); return; }
      if (!MC_URL) {
        setStatus(form, 'List not connected yet. Set MC_URL in js/site.js.', 'err');
        return;
      }
      btn.disabled = true;
      setStatus(form, 'Sending...');
      jsonp(MC_URL + '&EMAIL=' + encodeURIComponent(email), function (err, data) {
        btn.disabled = false;
        if (err || !data) { setStatus(form, 'Hmm, that did not go through. Try again in a sec.', 'err'); return; }
        if (data.result === 'success') {
          form.reset();
          setStatus(form, 'MAZEL! You are on the list.', 'ok');
        } else {
          var msg = String(data.msg || '').replace(/^\d+\s*-\s*/, '');
          if (/already subscribed/i.test(msg)) msg = 'You are already on the list. Mazel anyway.';
          setStatus(form, msg || 'Something went sideways. Try again?', 'err');
        }
      });
    });
  });

  // Sticky CTA (mobile)
  const stickyCTA = document.querySelector('[data-sticky-cta]');
  if (stickyCTA) {
    let lastScroll = 0;
    const showAt = 800; // Show after scrolling 800px
    const hideAt = document.querySelector('#dibs')?.offsetTop - 100 || 9999;
    
    const toggleSticky = () => {
      const scroll = window.scrollY;
      const atForm = scroll >= hideAt;
      
      if (scroll > showAt && scroll > lastScroll && !atForm) {
        stickyCTA.hidden = false;
        stickyCTA.setAttribute('data-visible', '');
      } else {
        stickyCTA.removeAttribute('data-visible');
      }
      lastScroll = scroll;
    };
    
    window.addEventListener('scroll', toggleSticky, { passive: true });
    toggleSticky();
  }

  // Countdown timer
  const countdown = document.querySelector('[data-launch]');
  if (countdown) {
    const launch = new Date(countdown.dataset.launch).getTime();
    const update = () => {
      const now = Date.now();
      const diff = launch - now;
      if (diff <= 0) {
        countdown.querySelector('.countdown__label').textContent = 'The book is here!';
        countdown.querySelector('.countdown__digits').hidden = true;
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      countdown.querySelector('.days').textContent = days;
      countdown.querySelector('.hours').textContent = hours;
    };
    setInterval(update, 60000);
    update();
  }

  // Scroll-triggered reveals
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.field, .cast, .plush').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
