// Shared by the pre-hydration bootstrap and its regression tests.
export const INTRO_TIMING = Object.freeze({ prepare: 1400, pass: 1120, scene: 3000, release: 650, deadline: 6000 });

export const introBootstrap = `(() => {
  const root = document.documentElement;
  const curtain = document.getElementById('cold-open');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const replay = new URLSearchParams(window.location.search).get('intro') === 'replay';
  let played = false;
  try { played = sessionStorage.getItem('wdg-intro-played') === '1'; } catch {}
  if (!curtain || motion.matches || (played && !replay)) return;
  if (window.location.hash && window.location.hash !== '#top' && !replay) return;

  root.dataset.intro = 'preparing';
  try { sessionStorage.setItem('wdg-intro-played', '1'); } catch {}
  let started = false;
  let closed = false;
  let observer;
  let prepareTimer, passTimer, sceneTimer, releaseTimer, deadlineTimer;

  const cleanup = () => {
    observer?.disconnect();
    [prepareTimer, passTimer, sceneTimer, releaseTimer, deadlineTimer].forEach(clearTimeout);
    curtain.removeEventListener('click', dismiss);
    window.removeEventListener('keydown', dismiss);
    window.removeEventListener('wheel', dismiss);
    window.removeEventListener('touchmove', dismiss);
    window.removeEventListener('pagehide', finishNow);
    document.removeEventListener('visibilitychange', onVisibility);
    motion.removeEventListener('change', finishNow);
  };
  const close = (immediate) => {
    // A reduced-motion change can still finish an in-progress release.
    if (closed && !immediate) return;
    closed = true;
    cleanup();
    if (immediate) {
      delete root.dataset.intro;
    } else {
      root.dataset.intro = 'releasing';
      releaseTimer = setTimeout(() => { delete root.dataset.intro; }, ${INTRO_TIMING.release});
    }
  };
  const dismiss = () => close(false);
  const finishNow = () => close(true);
  const onVisibility = () => { if (document.hidden) finishNow(); };
  const start = () => {
    if (started || closed) return;
    started = true;
    observer?.disconnect();
    clearTimeout(prepareTimer);
    root.dataset.intro = 'playing';
    passTimer = setTimeout(() => window.dispatchEvent(new Event('wdg:intro-pass')), ${INTRO_TIMING.pass});
    sceneTimer = setTimeout(dismiss, ${INTRO_TIMING.scene});
  };
  const checkScene = () => {
    if (document.querySelector('.world-canvas.is-ready')) start();
  };

  curtain.addEventListener('click', dismiss);
  window.addEventListener('keydown', dismiss);
  window.addEventListener('wheel', dismiss, { passive: true });
  window.addEventListener('touchmove', dismiss, { passive: true });
  window.addEventListener('pagehide', finishNow);
  document.addEventListener('visibilitychange', onVisibility);
  motion.addEventListener('change', finishNow);
  deadlineTimer = setTimeout(finishNow, ${INTRO_TIMING.deadline});
  // Observe readiness instead of remounting or replacing the real hero scene.
  observer = new MutationObserver(checkScene);
  observer.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
  prepareTimer = setTimeout(start, ${INTRO_TIMING.prepare});
  checkScene();
})();`;
