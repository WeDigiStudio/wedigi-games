import { Arrow, Eyebrow, Logo, Nav } from "@/components/Chrome";
import { HeroScene } from "@/components/HeroScene";
import { Intro } from "@/components/Intro";
import { Kolam } from "@/components/Kolam";
import { Reveal } from "@/components/Motion";
import { SignupForm } from "@/components/SignupForm";
import { ProjectTeam } from "@/components/ProjectTeam";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { family, footer, hero, pillars, signup, story, ui } from "@/content/site";

export default function Home() {
  return <>
    <Intro />
    <a href="#main" className="skip-link">{ui.skipContent}</a>
    <Nav />
    <main id="main">
      <section id="top" className="hero">
        <HeroScene />
        <div className="hero-copy">
          <Eyebrow value={hero.eyebrow} />
          <h1>{hero.headline.map((line, i) => <span key={line} className={i ? "hero-last-line" : ""}>{line}</span>)}</h1>
          <p className="hero-lede">{hero.lede}</p>
          <a className="button button-light" href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}<Arrow diagonal /></a>
        </div>
        <div className="hero-coordinate" aria-hidden="true"><span />{hero.worldLabel}</div>
        <div className="hero-footer">
          <a className="scroll-cue" href="#threshold"><span className="scroll-stem" aria-hidden="true" />{hero.scroll}</a>
          <p><span className="status-dot" />{hero.note}</p>
        </div>
      </section>

      <section id="threshold" className="threshold section-shell">
        <div className="threshold-line" aria-hidden="true" />
        <Reveal><p className="micro-label">{story.label}</p></Reveal>
        <Reveal><h2>{story.lines.map((line, i) => <span key={line} className={i === 2 ? "threshold-accent" : ""}>{line}</span>)}</h2></Reveal>
        <Reveal><p className="threshold-aside">{story.aside}</p></Reveal>
      </section>

      <ProjectShowcase />

      <ProjectTeam />

      <section id="studio" className="studio-section section-shell">
        <div className="studio-kolam" aria-hidden="true"><Kolam patternId="studio-kolam" /></div>
        <Reveal className="studio-intro"><Eyebrow value={pillars.eyebrow} /><h2>{pillars.heading}</h2><p>{pillars.intro}</p></Reveal>
        <div className="studio-principles">{pillars.items.map((item, i) => <Reveal key={item.n} delay={i * .1} className="principle"><span className="principle-number">{item.n}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></Reveal>)}</div>
      </section>

      <section id="family" className="family-section section-shell">
        <Reveal><Eyebrow value={family.eyebrow} /><div className="family-heading"><h2>{family.heading}</h2><p>{family.statement}</p></div></Reveal>
        <div className="family-list">{family.items.map((item, i) => {
          const content = <><span className="family-number">0{i + 1}</span><h3>{item.name}</h3><p>{item.body}</p><span className={item.current ? "current-label" : "family-destination"}>{item.cta}{item.href && <Arrow diagonal />}</span></>;
          return <Reveal key={item.name} delay={i * .08}>{item.href ? <a className="family-row" href={item.href}>{content}</a> : <div className={`family-row ${item.current ? "is-current" : ""}`}>{content}</div>}</Reveal>;
        })}</div>
      </section>

      <section id="signup" className="signup-section section-shell">
        <div className="signup-lamp" aria-hidden="true"><div className="lamp-wire" /><div className="lamp-roof" /><div className="lamp-glass" /><div className="lamp-foot" /><div className="lamp-aura" /></div>
        <Reveal className="signup-heading"><Eyebrow value={signup.eyebrow} /><h2>{signup.heading}</h2></Reveal>
        <Reveal delay={.12} className="signup-content"><p>{signup.body}</p><SignupForm /></Reveal>
      </section>
    </main>
    <footer className="site-footer section-shell">
      <div className="footer-top"><a href="#top" aria-label={ui.home}><Logo className="footer-logo" /></a><p>{footer.tagline}</p><a href="mailto:contact@wedigistudio.com" className="text-link">{footer.columns[2].links[0].label}<Arrow diagonal /></a></div>
      <nav aria-label={ui.footerNav} className="footer-links">{footer.columns[0].links.map((item) => <a key={item.label} href={item.href!}>{item.label}</a>)}</nav>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {ui.copyright}</span><span>{footer.made}</span><a href="#top" aria-label={ui.home}>↑</a></div>
    </footer>
  </>;
}
