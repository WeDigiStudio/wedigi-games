/* ============================================================
   WeDigi Games — landing site behaviour
   ============================================================ */

/* ------------------------------------------------------------------
   CONFIG — the one line to change when the mailing list is chosen.
   Point this at your provider's form-submit URL, e.g.
     Buttondown:  https://buttondown.email/api/emails/embed-subscribe/<user>
     ConvertKit:  https://app.convertkit.com/forms/<id>/subscriptions
     Formspree:   https://formspree.io/f/<id>
   While it is empty the form does NOT pretend to work: it falls back to
   opening the visitor's mail client so nobody's address is silently dropped.
   ------------------------------------------------------------------ */
const FORM_ENDPOINT = '';
const FALLBACK_EMAIL = 'hello@wedigistudio.com';

/* ── Footer year ─────────────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Sticky nav state ────────────────────────────────────────── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

/* ── Scroll reveals ──────────────────────────────────────────── */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if (reduced || !('IntersectionObserver' in window)) {
  reveals.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // Stagger siblings so lists cascade rather than pop as a block.
      const siblings = [...entry.target.parentElement.children].filter(n => n.classList.contains('reveal'));
      const delay = Math.max(0, siblings.indexOf(entry.target)) * 60;
      setTimeout(() => entry.target.classList.add('in'), delay);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  reveals.forEach(el => io.observe(el));
}

/* ── Mailing-list form ───────────────────────────────────────── */
const form = document.getElementById('signup-form');
const input = document.getElementById('email');
const status = document.getElementById('form-status');

const setStatus = (msg, kind) => {
  status.textContent = msg;
  status.className = 'form-status' + (kind ? ' is-' + kind : '');
};

const looksLikeEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

form.addEventListener('submit', async event => {
  event.preventDefault();
  const email = input.value.trim();

  if (!looksLikeEmail(email)) {
    input.setAttribute('aria-invalid', 'true');
    setStatus('That address does not look right — mind checking it?', 'error');
    input.focus();
    return;
  }
  input.removeAttribute('aria-invalid');

  // No provider wired up yet: hand off to the visitor's mail client instead
  // of showing a success message for a signup that never happened.
  if (!FORM_ENDPOINT) {
    const subject = encodeURIComponent('Devlog signup');
    const body = encodeURIComponent('Add me to the WeDigi Games devlog list: ' + email);
    location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
    setStatus('Opening your mail app — send that message and you are on the list.', 'ok');
    return;
  }

  const button = form.querySelector('button');
  button.disabled = true;
  setStatus('Signing you up…');

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);

    form.reset();
    setStatus('You are in. We will only mail when there is something worth showing.', 'ok');
  } catch (error) {
    console.error('[signup]', error);
    setStatus(`Something broke on our end. Mail ${FALLBACK_EMAIL} and we will add you by hand.`, 'error');
  } finally {
    button.disabled = false;
  }
});

/* ── Unclaimed social links ──────────────────────────────────── */
// Remove this block once the hrefs in the footer point somewhere real.
document.querySelectorAll('a[data-social]').forEach(link => {
  link.addEventListener('click', event => {
    if (link.getAttribute('href') !== '#') return;
    event.preventDefault();
    setStatus('That account is not live yet — the handles are still being claimed.');
    document.getElementById('signup').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  });
});
