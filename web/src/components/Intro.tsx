import { brand, ui } from "@/content/site";

// Runs after the server-rendered curtain, independently of React or WebGL.
const bootstrap = `(() => {
  const root = document.documentElement;
  const curtain = document.getElementById('cold-open');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let played = false;
  try { played = sessionStorage.getItem('wdg-intro-played') === '1'; } catch {}
  if (!curtain || played || motion.matches) return;
  root.dataset.intro = 'playing';
  let timer;
  const dismiss = () => {
    delete root.dataset.intro;
    try { sessionStorage.setItem('wdg-intro-played', '1'); } catch {}
    clearTimeout(timer);
    curtain.removeEventListener('click', dismiss);
    window.removeEventListener('keydown', dismiss);
    motion.removeEventListener('change', dismiss);
  };
  curtain.addEventListener('click', dismiss);
  window.addEventListener('keydown', dismiss);
  motion.addEventListener('change', dismiss);
  timer = setTimeout(dismiss, 2200);
})();`;

export function Intro() {
  return (
    <>
      <div id="cold-open" className="cold-open" aria-hidden="true">
        <div className="cold-open-haze" />
        <div className="cold-open-bloom" />
        <svg width="200" height="260" viewBox="0 0 200 260" className="cold-open-child">
          <g fill="#030206">
            <path d="M88 168 q-3 34 -5 62 q0 6 7 6 q6 0 6-6 q1-30 2-58 Z" />
            <path d="M108 168 q4 33 7 61 q1 6 -6 7 q-6 0-7-6 q-2-30 -3-58 Z" />
            <path d="M100 92 q-19 3 -20 26 q-1 26 4 52 q16 5 33 0 q6-27 4-53 q-2-22 -21-25 Z" />
            <path d="M81 104 q-9 6 -11 28 q-2 20 0 34 q1 6 7 5 q5-1 4-7 q-2-14 0-30 q1-14 6-22 Z" />
            <path d="M119 104 q9 7 11 29 q2 20 0 33 q-1 6 -7 5 q-5-1 -4-7 q2-14 0-29 q-1-14 -6-23 Z" />
            <path d="M94 78 h12 v16 h-12 Z" />
            <ellipse cx="100" cy="62" rx="27" ry="29" />
          </g>
          <g className="cold-open-eyes" fill="#fff8ec">
            <circle cx="91" cy="60" r="3.2" />
            <circle cx="109" cy="60" r="3.2" />
          </g>
        </svg>
        <div className="cold-open-caption"><p>{brand.name}</p><p>{ui.skipIntro}</p></div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
    </>
  );
}
