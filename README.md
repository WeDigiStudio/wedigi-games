# WeDigi Games

The indie games label of **WeDigi**.

> Studio builds for clients. Labs builds products. Games builds worlds.

| | |
|---|---|
| **Game engine** | Unity (C#) |
| **In production** | Project S — atmospheric side-scroller, PC first |
| **Site stack** | Next.js 16 · React 19 · Tailwind v4 · framer-motion 13 · three.js + React Three Fiber |
| **Brand system** | [BRAND.md](BRAND.md) |

---

## Layout

```
WeDigiGames/
├── BRAND.md              Brand system (read before touching design)
├── HANDOFF-PROMPT.md     Self-contained brief for external 3D tooling
└── web/                  The site
    ├── src/
    │   ├── app/          layout.tsx · page.tsx · globals.css (tokens) · icons
    │   ├── components/   Intro · HeroScene · Kolam · Gopuram · Motion · Chrome · SignupForm
    │   │   └── three/    Scene.tsx (composition, camera, fog) · primitives.tsx (gopuram, figure, lantern)
    │   └── content/
    │       └── site.ts   ← ALL copy, including every Tamil string
    ├── tests/            intro bootstrap tests (npm run test)
    └── public/
        ├── brand/        logo artwork (cropped PNG + 2000×2000 original)
        └── atmos/        Project S frames (atmosphere use only)
```

**Every word on the site lives in `web/src/content/site.ts`.** Copy changes do
not require touching a component.

## Running it

```bash
npm run dev
```

From the repo root; proxies to `web/`. Serves on <http://localhost:3000>.

`npm run build` · `npm run lint` · `npm run test` · `npm run start` work the same way.

## Deploying

Hosted on **Vercel**, connected to this GitHub repo. Pushes to `main` deploy to
production; every other branch gets a preview URL.

> **The Next.js app is in `web/`, not at the repo root.** Vercel's **Root
> Directory** must be set to `web` (Settings → Build & Deployment → Root
> Directory). Without it Vercel builds from the root — where `package.json`
> only proxies to `web/` — finds no output, and serves `404: NOT_FOUND` on
> every path while reporting a perfectly successful build. This is not fixable
> from `vercel.json`; Root Directory is a project setting only.

With that set, framework detection, build command and output directory are all
automatic. No `vercel.json` is needed.

Pages are statically prerendered, but the app is *not* a static export — see
the note in `web/next.config.ts` before adding `output: "export"`.

---

## Before it goes live

- [ ] **Native-speaker review of all Tamil.** Five single nouns, all in
      `site.ts`, each with transliteration and meaning in [BRAND.md §7](BRAND.md).
      They were kept to single nouns so there is no grammar to be wrong — but
      they still need signing off.
- [ ] **Mailing list** — set `FORM_ENDPOINT` in `web/src/content/site.ts`.
      Until then the form deliberately opens the visitor's mail client rather
      than faking a successful signup.
- [ ] **Logo variants** — need an SVG master and a light-background version.
      The current artwork is white text + orange `Digi`, so it is
      **dark-backgrounds only**; on white, only "Digi" is visible.
- [ ] **Social handles** — claim them, then fill the `null` hrefs in the
      `footer.columns` "Elsewhere" block. They currently render as plain text,
      not dead links.
- [ ] **Contact addresses** — still `@wedigistudio.com`.
- [ ] **OG image** — 1200×630, then wire into `openGraph.images` in `layout.tsx`.
- [ ] **Domain** — `wedigigames.com` vs `games.wedigi.com`.

## Notes for whoever picks this up

- **Project S footage is atmosphere only.** No gallery while the game is in
  production. `Atmosphere.tsx` blurs and scrims each frame on purpose — if you
  want a real gallery later, add a separate component rather than loosening
  those values.
- **Motion must degrade.** Every animated component checks `useReducedMotion()`.
  The chosen style is flagged high accessibility risk; the static fallback is
  what makes it acceptable.
- The whole project is one git repo rooted here, pushed to
  [WeDigiStudio/wedigi-games](https://github.com/WeDigiStudio/wedigi-games).
  The nested repo `create-next-app` made inside `web/` has been removed.
- Node is v20.16.0 here; some tooling wants ≥20.19. Builds pass, but expect
  `EBADENGINE` warnings until Node is bumped.
- Python scripts on this machine need `py -3` from PowerShell — plain `python`
  hits the Microsoft Store alias.

## The 3D hero

`web/src/components/three/` renders the hero in real three.js — genuine depth
layers separated by exponential fog, not CSS gradients.

- **`primitives.tsx`** — extruded gopuram geometry, the child figure (built from
  capsules/spheres; at silhouette scale only the contour survives, so a modelled
  mesh would buy nothing), and the lantern with its point light.
- **`Scene.tsx`** — composition, camera rig, fog.

**Composition is aspect-aware, and this is the part to understand before moving
anything.** The camera's 42° fov is *vertical*. On a portrait phone the
horizontal field collapses to about ±0.8 world units at the subject plane, so a
layout authored for a widescreen hero simply falls outside the frame. Portrait
therefore gets its own camera height, look-at target and subject positions —
see the comments in `Contents`. Changing one number without re-checking the
projection will push the figure off-screen or blow it up into a giant head.

Degradation, in order: live scene → frozen single frame
(`prefers-reduced-motion`) → still image (no WebGL2). The still also remains
underneath while the scene loads and when the renderer fails or loses context.
The render loop pauses offscreen and in hidden tabs; pixel ratio is capped at
1.25. Portrait places the scene in the lower part of the hero, below the copy.

### Intro

`Intro.tsx` is the cold open: the figure surfaces, its eyes ignite, the curtain
lifts. It is dismissible by click, any key, and a hard timeout, is skipped
entirely under reduced motion, and plays once per session. Drop the
`SESSION_KEY` check to make it play on every load.

The curtain is server-rendered and activated by a small inline bootstrap before
the page content. It runs independently of hydration and dismisses after 3.4
seconds, with CSS also hiding it at the end of its animation. With JavaScript
disabled the intro stays hidden and the content remains visible. The bootstrap
tests cover dismissal, returning sessions, reduced motion, and blocked storage.
