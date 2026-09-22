import Image from "next/image";
import { projectTeam } from "@/content/site";
import { Reveal } from "./Motion";
import styles from "./ProjectTeam.module.css";

export function ProjectTeam() {
  return <section id="team" aria-labelledby="team-heading" className={`${styles.section} section-shell`}>
    <Reveal>
      <p className={`micro-label ${styles.label}`}>{projectTeam.label}</p>
      <div className={styles.heading}>
        <h2 id="team-heading">{projectTeam.heading}</h2>
        <p>{projectTeam.description}</p>
      </div>
    </Reveal>
    <div className={styles.grid}>
      {projectTeam.members.map((member, index) => <Reveal key={member.id} delay={index * .07}>
        <article className={styles.card}>
          <div className={styles.portrait}>
            {member.photo ? <Image src={member.photo} alt={`Portrait of ${member.name}`} fill sizes="(max-width: 519px) 90vw, (max-width: 1000px) 44vw, 22vw" style={{ objectPosition: member.photoPosition ?? "50% 35%" }} /> : <div className={styles.placeholder}>
              <svg viewBox="0 0 240 300" aria-hidden="true"><ellipse cx="120" cy="115" rx="35" ry="44" /><path d="M38 300v-44c0-49 32-77 82-77s82 28 82 77v44Z" /></svg>
              <span>{projectTeam.portraitPlaceholder}</span>
            </div>}
            <span className={styles.number} aria-hidden="true">{member.id}</span>
          </div>
          <div className={styles.caption}><h3>{member.name}</h3><p>{member.role}</p></div>
        </article>
      </Reveal>)}
    </div>
  </section>;
}
