import Image from "next/image";
import { projectS } from "@/content/site";
import { Arrow, Eyebrow } from "./Chrome";
import styles from "./ProjectShowcase.module.css";

export function ProjectShowcase() {
  return <section id="project-s" aria-labelledby="project-heading" className={`${styles.section} section-shell`}>
    <div className={styles.topline}><span className="micro-label">{projectS.index}</span><span className="micro-label"><span className="status-dot" />{projectS.eyebrow.en}</span></div>
    <h2 id="project-heading" className={styles.accessibleTitle}>{projectS.title}</h2>
    <div className={styles.layout}>
      <div className={styles.poster}>
        <Image src={projectS.poster} alt={projectS.posterAlt} width={3375} height={4219} sizes="(max-width: 699px) calc(100vw - 50px), (max-width: 1100px) 46vw, 540px" />
      </div>
      <div className={styles.story}>
        <Eyebrow value={projectS.eyebrow} />
        <p className={`micro-label ${styles.descriptor}`}>{projectS.descriptor}</p>
        <h3>{projectS.kicker}</h3>
        <div className={styles.body}>{projectS.body.map(text => <p key={text}>{text}</p>)}</div>
        <a href="#signup" className="button button-light">{projectS.cta}<Arrow diagonal /></a>
        <dl className={styles.meta}>{projectS.meta.map(item => <div key={item.k}><dt>{item.k}</dt><dd>{item.v}</dd></div>)}</dl>
        <div className={styles.supportingStudio}>
          <span>Supporting studio</span>
          <Image src="/brand/supporting-studio-logo.webp" alt="Supporting studio" width={265} height={56} />
        </div>
      </div>
    </div>
  </section>;
}
