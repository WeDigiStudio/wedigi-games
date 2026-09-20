# Handoff prompt — WeDigi Games site

Paste everything below the line into the 3D-capable builder. It is written to
stand alone: it assumes no access to this repo or this conversation.

If the tool *can* read the repo, tell it so — `web/src/content/site.ts` has all
the copy and `BRAND.md` the full system, and it should use those verbatim rather
than re-inventing them.

---

## Brief

Build the marketing site for **WeDigi Games**, a new indie game studio in South
India. It is the games label of WeDigi (which also has WeDigi Studio, an IT
services firm, and WeDigi Labs, an R&D arm).

The site has one job: make a visitor feel the world of our first game within
about three seconds of landing, and believe a serious studio is behind it. We
are new and have no shipped titles, so **atmosphere and craft are the entire
pitch.** A competent-but-generic site actively hurts us.

This must not look like a template. No centred-heading-over-three-cards-in-a-row
layout. If it could be reskinned into a SaaS landing page by swapping the colours,
it has failed.

---

## The game: Project S

Our first title. **"Project S" is the public working title** — use it as the
name, do not invent a final one.

- Atmospheric 2.5D side-scroller, built in **Unity**, PC first, no release date
- Direct references: **Limbo** and **Reanimal** (Tarsier). Also Inside.
- A small child alone in a landscape that remembers more than it should
- Visual language: pure **silhouette** against layered fog. Form reads as shape,
  never as a lit object. A single warm lantern is the only light source and the
  only colour in an otherwise cold, desaturated frame.
- Palette in-game: deep aubergine and magenta haze, near-black silhouettes,
  warm orange lantern light, occasional fire.
- The child has **glowing eyes** — the one point of brightness on the figure.

Screenshots for reference live in `web/public/atmos/` (10 frames). **Use them as
atmosphere only — blurred, parallaxed, pushed behind type. There must be no
screenshot gallery**: the game is still in production and we are deliberately
keeping it mysterious. Anything that reads as "here are screenshots of our game"
is wrong.

---

## The cultural direction: South India

This is the differentiator. We want to be read as **a South Indian studio**, not
a generic dark-indie studio.

Two motifs, both agreed:

1. **Kolam (கோலம்)** — the threshold floor-drawing: a grid of dots (*pulli*)
   with one continuous line looped around them. Use as **fine background
   texture** at low opacity, masked so it fades. Never as an ornament sitting on
   top of copy.
2. **Gopuram** — the stepped tower over a Dravidian temple gateway. Use as
   **silhouette**, on the horizon, layered and receding into fog. This is the
   same visual grammar as the game, which is why it works.

**Rooted, not decorated.** These should feel structural — the place the studio
is from — not stickers applied at the end. If you can strip the kolam and
gopurams out and the design is unchanged underneath, they were decoration.

---

## Brand assets and rules

### Logo
Artwork: the words **"WeDigi Games"** — `We` and `Games` in **white**, `Digi` in
**`#FF761E`**, on transparency.

⚠️ **It is a dark-background-only lockup.** On a white surface the white text
disappears and it looks like the logo just says "Digi". There is currently no
light-background variant and no SVG master. Never place it on a light surface.

File: `web/public/brand/wedigi-games-logo.png` (1376×462, transparent, already
cropped tight — the original was 2000×2000 with ~93% empty canvas).

### Colour
Sampled from the game's own screenshots, so the site and the game read as one
world.

| Token | Hex | Role |
|---|---|---|
| void | `#0A060D` | deepest ground |
| ink | `#120C16` | page background |
| aubergine | `#1C1222` | cards, panels |
| shroud | `#2A1B33` | raised surfaces |
| mauve | `#4A3352` | mid fog |
| fog | `#6B4A6E` | far fog |
| **ember** | **`#FF761E`** | **primary accent — exact logo orange** |
| ember-hi | `#FFA24D` | hover |
| lantern | `#FFC46B` | warm highlight, focus rings |
| text | `#F4ECF2` | primary text |
| muted | `#A697AE` | secondary text |
| line | `#33223D` | borders |

**Rule: ember means light.** It is only used for things that emit — the lantern,
the call to action, the Tamil word. Never a large background fill; in this world
orange is a light source. Text on ember is `#1a0d04`, not white.

### Type
- Display: **Anek Latin** (700)
- Tamil: **Anek Tamil**
- Body: **Inter**

Anek is an Ek Type superfamily drawn for Indic scripts, so the Latin and Tamil
cuts are designed as siblings. Do not substitute an unrelated Latin face — the
mismatch against Tamil is visible.

### Tamil
Five single common nouns are used as section labels:

| Tamil | Translit | Meaning | Section |
|---|---|---|---|
| வணக்கம் | vanakkam | greetings | Hero |
| கைவினை | kaivinai | craft | Pillars |
| கதை | kathai | story | Project S |
| குடும்பம் | kudumbam | family | Family |
| விளக்கு | vilakku | lamp | Signup |

They are **single nouns on purpose** — no grammar to get wrong. **Do not write
Tamil sentences, taglines or headlines.** Broken grammar in a heritage-led brand
destroys the whole positioning. These are still pending native-speaker review.
Tag Tamil with `lang="ta"`.

---

## What to build

A **single cinematic scrolling one-pager**. Sections, in order:

1. **Hero** — the 3D scene. Headline: *"We build worlds out of darkness and
   lamplight."* (set "lamplight." in ember). Tamil eyebrow, lede, two CTAs
   ("Follow the build", "See Project S"), a small in-production note.
2. **Three pillars** — small scope/high finish · rooted not decorated · built in
   the open.
3. **Project S** — the game. Atmosphere, meta (Engine: Unity, Platform: PC
   first, Status: In production, Release: TBA), a "work-in-progress footage"
   marker. No gallery.
4. **The family** — WeDigi Studio / Labs / Games, with Games marked current.
   The one-liner that positions everything: *"Studio builds for clients. Labs
   builds products. We build worlds."*
5. **Devlog signup** — email capture.
6. **Footer**.

Exact copy is in `web/src/content/site.ts`. Keep all copy in one content file —
no strings hardcoded in components.

---

## The intro (cold open)

On first load: a **Limbo-style child silhouette** surfaces out of the dark, its
**eyes ignite white**, the light blooms outward, and the curtain lifts onto the
page.

Non-negotiables:
- dismissible by click, by any key, and by a hard timeout — it must never trap a visitor
- skipped entirely under `prefers-reduced-motion`
- plays once per session, not on every navigation
- ideally rendered before hydration so there is no flash of page content first

---

## Technical requirements

Current stack (extend it, or replace it and say so): **Next.js 16 · React 19 ·
Tailwind v4 · framer-motion · three.js + React Three Fiber**, statically
prerendered.

- Must build and lint clean. Next 16 enforces React Compiler rules: no setState
  synchronously inside an effect, and no mutating values returned from hooks
  (for R3F, take `camera`/`pointer` off the `useFrame` state argument, and
  attach fog/background declaratively rather than assigning onto `scene`).
- **Three-tier degradation, all three required:** live scene → single frozen
  frame under `prefers-reduced-motion` → still image where WebGL is
  unavailable. A WebGL failure must still look deliberate, never an empty box.
- Must hold up on a phone. Real mobile performance, not just a mobile layout.
- Accessibility: AA contrast on all text over the scene, visible focus states,
  keyboard reachable, `lang="ta"` on Tamil.

---

## Traps — hit while building the current version

Please avoid repeating these. Each one cost real time.

1. **Never draw near-black on near-black.** Silhouettes were filled `#0A060D`
   against a `#120C16` background — they rendered perfectly and were completely
   invisible. Same error again on the intro figure (`#000105` on `#05030A`). A
   silhouette needs a *lighter* haze to read against. Check contrast against the
   actual backdrop, and verify by screenshot — "it is in the DOM" is not "it is
   visible".

2. **The camera fov is vertical — compose for aspect ratio.** With a 42°
   vertical fov, a portrait phone viewport collapses to roughly **±0.8 world
   units of horizontal room** at the subject plane. A scene laid out for
   widescreen (subjects at x = 2.7, background at x = 18) is entirely off-frame
   on a phone. Portrait needs its own camera height, look-at target and subject
   positions. Both failure modes are easy to hit: too close fills the screen
   with a giant head, too far projects the subject to dead centre behind the
   headline.

3. **Do not over-darken the atmosphere.** The source frames are already
   near-black. Stacking blur + brightness reduction + a flat scrim + gradients
   erased them entirely, so the site paid for the imagery and showed nothing.
   Use *shaped* scrims — heavy where copy sits, open where the light is.

4. **Additive glows blow out fast.** Two eye sprites at a generous scale merged
   into one headlight and ate the head silhouette. Tight halos, low opacity.

---

## Acceptance criteria

- Reads unmistakably as a game studio, not a software company
- The 3D has genuine depth — layered, fogged, parallaxed — and is clearly not
  CSS gradients faking it
- Gopurams and fog are plainly visible, on both desktop and phone
- The intro lands emotionally and never blocks anyone
- Could not be mistaken for a template
- Builds and lints clean; degrades properly without WebGL
