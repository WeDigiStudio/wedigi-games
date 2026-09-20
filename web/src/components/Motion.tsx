"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Scroll-triggered entrance. When the visitor prefers reduced motion this
 * renders the final state immediately — no transform, no fade, no delay.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "p" | "h2";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      className={`reveal-content ${className}`}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * Parallax wrapper. `speed` is how far the layer drifts across its own scroll
 * range, in percent of its height. Negative moves against the scroll.
 * Returns a plain div under reduced motion.
 */
export function Parallax({
  children,
  speed = 12,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed}%`, `${speed}%`]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, height: "100%", width: "100%", position: "relative" }}>{children}</motion.div>
    </div>
  );
}

/**
 * Slow breathing glow for lamp elements. Static when motion is reduced.
 *
 * Renders a <span>, not a <div>: these sit inside <p> elements, where a div is
 * invalid HTML and makes React's hydration fail outright.
 */
export function LampFlicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{children}</span>;

  return (
    <motion.span
      className={className}
      animate={{ opacity: [0.82, 1, 0.9, 1, 0.86] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}
