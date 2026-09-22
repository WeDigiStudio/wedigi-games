/**
 * Single source of truth for every word on the site.
 *
 * ── TAMIL REVIEW REQUIRED ────────────────────────────────────────────────
 * Every Tamil string below is a SINGLE COMMON NOUN, chosen deliberately so
 * there is no grammar to get wrong. They still need a native speaker to sign
 * off before this site goes public. Transliteration and meaning are given for
 * each one so a reviewer can check them without reading code.
 *
 *   வணக்கம்    vanakkam   greetings
 *   கைவினை     kaivinai   craft / handiwork
 *   கதை        kathai     story
 *   குடும்பம்   kudumbam   family
 *   விளக்கு     vilakku    lamp
 *
 * To change or remove them, edit `ta` fields here only — nothing else in the
 * codebase hardcodes Tamil.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Eyebrow = { ta: string; translit: string; en: string };

export const brand = {
  name: "WeDigi Games",
  parent: "WeDigi",
  tagline: "Small, hand-built games from South India.",
  description:
    "WeDigi Games is the indie games label of WeDigi. We build small, atmospheric games rooted in South Indian myth, light and landscape.",
  /** Canonical origin. Every absolute URL in metadata, sitemap and structured data derives from this. */
  url: "https://wedigigames.com",
  email: "contact@wedigistudio.com",
};

/** Search and social metadata. Title and description are what appear in Google results. */
export const seo = {
  title: "WeDigi Games — Indie Game Studio from South India | Project S",
  description:
    "WeDigi Games is an independent game studio from South India making small, atmospheric games rooted in Tamil folklore. Our first game, Project S, is in production for Steam and PC.",
  keywords: [
    "WeDigi Games",
    "Project S",
    "indie game studio",
    "South Indian game studio",
    "Tamil game",
    "Tamil folklore game",
    "Indian indie games",
    "atmospheric adventure game",
    "2.5D adventure",
    "Steam game",
  ],
  ogImageAlt: "WeDigi Games — Project S official announcement poster: a child in silhouette beside a lantern and a burning village.",
  locale: "en_IN",
};

export const nav = [
  { label: "Project S", href: "#project-s" },
  { label: "Our Story", href: "#studio" },
  { label: "The Family", href: "#family" },
];

export const ui = {
  skipIntro: "Click or press any key to enter",
  introSkipLabel: "Skip intro",
  skipContent: "Skip to content",
  home: "WeDigi Games — home",
  mainNav: "Main",
  footerNav: "Footer",
  updates: "Stay in the loop",
  menu: "Open navigation",
  closeMenu: "Close navigation",
  pauseScene: "Pause scene",
  playScene: "Play scene",
  notLive: "Not live yet",
  copyright: "WeDigi. All rights reserved.",
};

export const hero = {
  eyebrow: { ta: "வணக்கம்", translit: "vanakkam", en: "Independent games. South Indian soul." } as Eyebrow,
  headline: ["Enter the", "unknown."],
  lede: "Small, hand-built worlds. The kind that stay with you long after the screen goes dark.",
  ctaPrimary: { label: "Discover Project S", href: "#project-s" },
  ctaSecondary: { label: "Meet the studio", href: "#studio" },
  note: "Our first world is taking shape.",
  chapter: "001 / A world in the making",
  scroll: "Venture further",
  worldLabel: "Project S — atmosphere study",
};

export const story = {
  label: "Not every story needs to be told in words.",
  lines: ["A light in the distance.", "A shape in the fog.", "A world that remembers."],
  aside: "We make games for the feeling you can’t quite put into words.",
};

export const pillars = {
  eyebrow: { ta: "கைவினை", translit: "kaivinai", en: "What we are about" } as Eyebrow,
  heading: "From a small corner of the world.",
  intro: "We’re WeDigi Games, an independent studio from South India. We follow the strange ideas. Obsess over the small things. And make every moment mean something.",
  items: [
    {
      n: "01",
      title: "Small scope, high finish",
      body: "Intimate worlds. Deliberate details. Experiences that earn every minute you spend in them.",
    },
    {
      n: "02",
      title: "Rooted, not decorated",
      body: "The stories, architecture and quiet rituals of South India live in the foundations of our worlds.",
    },
    {
      n: "03",
      title: "Built in the open",
      body: "The experiments. The wrong turns. The moments it finally clicks. We’re sharing the making, as it happens.",
    },
  ],
};

export const projectS = {
  poster: "/atmos/Project S - Official Announcement Poster.png",
  posterAlt: "Project S official announcement poster: a child in silhouette beside a lantern and a burning village. Game in production for Steam and PC.",
  eyebrow: { ta: "கதை", translit: "kathai", en: "In production" } as Eyebrow,
  title: "Project S",
  kicker: "Some things are waiting in the dark.",
  descriptor: "An atmospheric 2.5D adventure",
  index: "Our first game / 001",
  cta: "Follow its story",
  body: [
    "A child. A fading light. A landscape that remembers more than it should. Find your way through a world of silhouettes, uneasy silence, and things half-seen.",
    "Project S is the working title of our first game. Still being made. Still keeping its secrets.",
  ],
  meta: [
    { k: "Rooted in", v: "Tamil Folklore" },
    { k: "Platform", v: "PC First" },
    { k: "Status", v: "In Production" },
    { k: "Release", v: "To Be Announced" },
  ],
  status: "Work in progress",
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string | null;
  photoPosition?: string;
};

export const projectTeam = {
  label: "The people behind the world",
  heading: "The Team behind Project S",
  description: "Together, we bring the unknown to life.",
  portraitPlaceholder: "Portrait coming soon",
  // Replace these placeholders with names, roles and local /team/ photo paths.
  members: [
    { id: "01", name: "Mohammed Arshad Ismail", role: "Lead Programmer", photo: "/atmos/Mohammed Arshad Ismail.jpeg" },
    { id: "02", name: "Naveen K", role: "Environment Artist", photo: "/atmos/Naveen.jpeg" },
    { id: "03", name: "Prince Rohith A", role: "Junior Programmer", photo: "/atmos/Prince Rohith.jpeg" },
    { id: "04", name: "Nitish", role: "Level Designer", photo: "/atmos/Nitish.jpeg" },
  ] as TeamMember[],
};

export const family = {
  eyebrow: { ta: "குடும்பம்", translit: "kudumbam", en: "The family" } as Eyebrow,
  heading: "Different crafts. One restless spirit.",
  statement: "Studio builds for clients. Labs builds products. We build worlds.",
  items: [
    {
      name: "WeDigi Studio",
      body: "Services-based IT. The client work that keeps the lights on and the standards high.",
      dot: "#6E8BFF",
      href: "https://wedigistudio.com",
      cta: "wedigistudio.com",
    },
    {
      name: "WeDigi Labs",
      body: "Research and in-house products. Where we build the things nobody asked us for yet.",
      dot: "#00E5C4",
      href: null,
      cta: "",
    },
    {
      name: "WeDigi Games",
      body: "Indie games out of South India. Small, strange, finished. You are here.",
      dot: "#FF761E",
      href: null,
      cta: "You are here",
      current: true,
    },
  ],
};

export const signup = {
  eyebrow: { ta: "விளக்கு", translit: "vilakku", en: "Stay close" } as Eyebrow,
  heading: "Keep a light on.",
  body: "Follow Project S out of the dark. New worlds, work in progress, and letters from the studio. Only when there’s something worth sharing.",
  placeholder: "you@example.com",
  cta: "Count me in",
  emailLabel: "Email address",
  invalid: "That address does not look right — mind checking it?",
  mailSubject: "Devlog signup",
  mailBody: "Add me to the WeDigi Games devlog list:",
  mailOpened: "Send the request from your mail app. We will confirm when you have been added.",
  fallbackNote: "Signup currently opens your mail app to request a place on the devlog list.",
  busy: "Signing you up…",
  success: "You are in. We will only mail when there is something worth showing.",
  error: "Something broke on our end. Mail {email} and we will add you by hand.",
};

export const footer = {
  tagline: "Small, hand-built games from South India. A WeDigi label.",
  columns: [
    {
      title: "Studio",
      links: [
        { label: "Project S", href: "#project-s" },
        { label: "About", href: "#studio" },
        { label: "WeDigi family", href: "#family" },
      ],
    },
    {
      // TODO: claim these handles, then replace href with the real URLs.
      title: "Elsewhere",
      links: [
        { label: "itch.io", href: null },
        { label: "Bluesky", href: null },
        { label: "YouTube", href: null },
      ],
    },
    {
      // TODO: swap to @wedigigames.com once the domain and mail are set up.
      title: "Contact",
      links: [
        { label: "contact@wedigistudio.com", href: "mailto:contact@wedigistudio.com" },
        { label: "Press enquiries", href: "mailto:press@wedigistudio.com" },
      ],
    },
  ],
  made: "Made in South India, shipped with stubbornness.",
};

/**
 * Mailing-list endpoint. Empty on purpose: while it is unset the form hands off
 * to the visitor's mail client instead of faking a successful signup.
 * Set to a Buttondown / ConvertKit / Formspree submit URL to go live.
 */
export const FORM_ENDPOINT = "";
export const FALLBACK_EMAIL = "contact@wedigistudio.com";

/** Screenshots used as atmosphere only — never as a gallery, per art direction. */
export const atmos = {
  hero: "/atmos/project-s-forest.png",
  projectS: "/atmos/project-s-fire.png",
  deep: "/atmos/project-s-ruins.png",
};
