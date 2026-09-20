"use client";

import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { atmos, ui } from "@/content/site";

const Scene = dynamic(() => import("./three/Scene").then((m) => m.Scene), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

/** The still remains underneath during loading, renderer errors and context loss. */
export function HeroScene() {
  const reduced = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [lost, setLost] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let visible = true;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    // Keep the real canvas mounted so the browser can restore its context.
    const onLost = (event: Event) => { event.preventDefault(); setLost(true); };
    const onRestored = () => setLost(false);
    element.addEventListener("webglcontextlost", onLost, true);
    element.addEventListener("webglcontextrestored", onRestored, true);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      element.removeEventListener("webglcontextlost", onLost, true);
      element.removeEventListener("webglcontextrestored", onRestored, true);
    };
  }, []);
  return (
    <>
      <div ref={container} className="hero-world" aria-hidden="true">
        <Image src={atmos.hero} alt="" fill priority sizes="100vw" className="world-still" />
        <div className={`world-canvas ${ready && !lost ? "is-ready" : ""}`}><SceneBoundary><Scene still={reduced !== false || paused} active={active} onReady={onReady} /></SceneBoundary></div>
        <div className="world-vignette" />
        <div className="world-grain" />
      </div>
      {!lost && ready && !reduced && <button className="world-toggle" type="button" onClick={() => setPaused(!paused)} aria-label={paused ? ui.playScene : ui.pauseScene} aria-pressed={paused}>
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">{paused ? <path d="m5 3 8 5-8 5z" fill="currentColor" /> : <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" />}</svg>
        <span>{paused ? ui.playScene : ui.pauseScene}</span>
      </button>}
    </>
  );
}
