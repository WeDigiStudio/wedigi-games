"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { brand, nav, ui, type Eyebrow as EyebrowType } from "@/content/site";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={diagonal ? "arrow-diagonal" : ""}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.4" /></svg>;
}
export function Eyebrow({ value, className = "" }: { value: EyebrowType; className?: string }) {
  return <p className={`eyebrow ${className}`}><span lang="ta" className="tamil">{value.ta}</span><span className="eyebrow-line" aria-hidden="true" /><span>{value.en}</span></p>;
}
export function Logo({ className = "", width = 150 }: { className?: string; width?: number }) {
  return <Image src="/brand/wedigi-games-logo.png" alt={brand.name} width={width} height={Math.round(width * 462 / 1376)} priority className={className} />;
}
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 35);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);
  return <header className={`site-header ${scrolled || open ? "is-solid" : ""}`}>
    <a href="#top" aria-label={ui.home} onClick={() => setOpen(false)}><Logo className="header-logo" /></a>
    <nav aria-label={ui.mainNav} id="main-navigation" className={`main-navigation ${open ? "is-open" : ""}`}>
      {nav.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      <a href="#signup" className="nav-cta" onClick={() => setOpen(false)}>{ui.updates}<Arrow diagonal /></a>
    </nav>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? ui.closeMenu : ui.menu} onClick={() => setOpen(!open)}>
      <span /><span />
    </button>
  </header>;
}
