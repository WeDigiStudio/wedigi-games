import { brand, ui } from "@/content/site";
import { introBootstrap } from "./intro-sequence.mjs";
import styles from "./Intro.module.css";

export function Intro() {
  return (
    <>
      <div id="cold-open" className={styles.overlay}>
        <div className={styles.veil} aria-hidden="true" />
        <div className={styles.mistFar} aria-hidden="true" />
        <div className={styles.presence} aria-hidden="true">
          {/* A partial, out-of-focus contour; its identity stays outside the frame. */}
          <svg viewBox="0 0 600 1000" preserveAspectRatio="none">
            <path fill="#020309" d="M185-100C151 24 238 53 216 148C198 204 131 188 92 282C42 403 97 467 56 563L-28 810L62 886L185 572C204 535 218 558 202 658L131 1090H473L420 676C405 580 438 538 469 621L535 839L628 800L534 440C519 332 480 217 388 193C340 176 374 98 348 43C321-11 290-28 300-100Z" />
          </svg>
        </div>
        <div className={styles.mistNear} aria-hidden="true" />
        <p className={styles.signature} aria-hidden="true">{brand.name}</p>
        <button type="button" className={styles.skip} title={ui.skipIntro}>{ui.introSkipLabel}<span aria-hidden="true">↗</span></button>
      </div>
      <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
    </>
  );
}
