# WeDigi Games — Brand System v0.2

The indie games label of WeDigi. Source of truth for how the sub-brand looks,
sounds, and sits next to its siblings.

> **v0.2 supersedes v0.1.** The first pass was a generic dark-indie system
> (ember/mint, Space Grotesk). It has been replaced with a South Indian
> direction derived from the Project S art direction and the real logo artwork.

---

## 1. Where Games sits in the family

| Brand | What it does | Audience | Tone |
|---|---|---|---|
| **WeDigi Studio** | Services-based IT. Client work. | Businesses buying software | Professional, reliable |
| **WeDigi Labs** | Research + in-house products | Product users, early adopters | Curious, technical |
| **WeDigi Games** | Indie game development | Players, press, fellow devs | Warm, atmospheric, craft-obsessed |

The three-beat that explains the company in one line:

> **Studio builds for clients. Labs builds products. Games builds worlds.**

---

## 2. Positioning

**WeDigi Games makes small, hand-built games rooted in South India.**

- **Small scope, high finish.** A tight three-hour game people finish beats a
  sprawling one they abandon.
- **Rooted, not decorated.** South Indian myth and architecture are the
  foundation, not a skin applied at the end. This is the line that separates us
  from a studio that just picked an exotic setting.
- **Built in the open.** Devlogs and honest post-mortems. Before there is a
  catalogue, the making is the product.

Not work-for-hire game dev. Not live-service, gacha, or ad-driven mobile.

---

## 3. The logo

The master artwork is **"WeDigi Games"**: `We` and `Games` in **white**, `Digi`
in **`#FF761E`**, on transparency.

⚠️ **It is a dark-background lockup.** On a white or light surface the word
"Digi" floats alone because the rest of the wordmark is white and vanishes.
This is the single most likely way to misuse the brand.

- `web/public/brand/wedigi-games-logo.png` — cropped to content, 1376×462
- `site/assets/brand/logo-source.webp` (in `legacy/`) — the 2000×2000 original,
  ~93% of which is empty canvas

**Still needed:** an **SVG** master, and a **light-background variant** with the
white text swapped to ink. Until the light variant exists, do not put the logo
on any light surface.

Clear space: one cap-height of `D` on all sides. Never recolour `Digi`, never
stretch, never add effects.

---

## 4. Colour

Dark-first, sampled from the Project S screenshots. The game and the site are
one world.

| Token | Hex | Use |
|---|---|---|
| `--color-void` | `#0A060D` | Deepest ground; alternating sections |
| `--color-ink` | `#120C16` | Page background |
| `--color-aubergine` | `#1C1222` | Cards, panels |
| `--color-shroud` | `#2A1B33` | Raised surfaces |
| `--color-mauve` | `#4A3352` | Mid fog |
| `--color-fog` | `#6B4A6E` | Far fog, disabled text |
| `--color-ember` | `#FF761E` | **Primary accent** — the logo orange. CTAs, Tamil labels, the lamp. |
| `--color-ember-hi` | `#FFA24D` | Hover / highlight |
| `--color-lantern` | `#FFC46B` | Warm highlight, focus rings, success |
| `--color-text` | `#F4ECF2` | Primary text |
| `--color-muted` | `#A697AE` | Secondary text |
| `--color-line` | `#33223D` | Borders, hairlines |

**Rule:** ember is *light*. It is used for things that glow — the lamp, the
call to action, the Tamil word. It is never a background fill for large areas,
because in this world orange means a light source.

Text on ember uses `#1a0d04`, not white — orange is too light for white text.

---

## 5. Typography

| Role | Face | Notes |
|---|---|---|
| Display | **Anek Latin** 700 | Ek Type superfamily |
| Tamil | **Anek Tamil** | Sibling cut of the same family |
| Body / UI | **Inter** 400/500/600 | Legible at every size |

**Why Anek:** it is drawn by an Indian foundry as one superfamily across Indic
scripts, so the Latin and Tamil are designed to sit together. Pairing an
unrelated Latin face with a Tamil one produces a visible mismatch in weight and
rhythm — this avoids that by construction.

---

## 6. Motifs

### Kolam (கோலம்)
The threshold drawing: a grid of dots (*pulli*) with a continuous looped line.
Used as **fine background texture only** — low opacity, behind content, masked
so it fades out. Never an ornament sitting on top of copy.
→ `web/src/components/Kolam.tsx`

### Gopuram
The stepped temple gateway tower, drawn as **silhouette** — the same language
Project S uses, where form reads as a shape against fog. Used as a horizon line
between sections, with layers receding in opacity to imply depth.
→ `web/src/components/Gopuram.tsx`

### Lamplight
The single warm point light in a cold field is the core image of both the game
and the brand. Anything ember-coloured should feel like it is emitting light,
not painted that colour.

---

## 7. Tamil usage

⚠️ **All Tamil on the site is pending native-speaker review.**

Current policy: **single common nouns only**, used as section labels. Single
nouns were chosen deliberately because they carry no grammar to get wrong.

| Tamil | Translit | Meaning | Where |
|---|---|---|---|
| வணக்கம் | vanakkam | greetings | Hero |
| கைவினை | kaivinai | craft | Pillars |
| கதை | kathai | story | Project S |
| குடும்பம் | kudumbam | family | WeDigi family |
| விளக்கு | vilakku | lamp | Signup |

All of them live in `web/src/content/site.ts` and nowhere else. Tamil strings
carry `lang="ta"` so assistive tech switches pronunciation.

**Do not** write Tamil sentences or taglines without a native speaker drafting
them. Broken grammar in a heritage-led brand undoes the entire positioning.

---

## 8. Motion

The `ui-ux-pro-max` skill ranks *parallax-storytelling* as the matching style
and flags it `accessibility risk:high`. That is accepted, with mitigations:

- Everything eases `cubic-bezier(.2,.7,.2,1)`. Nothing bounces.
- Entrances: 20px rise + fade, 700ms, ~80ms stagger.
- Parallax layers drift ±8–16% of their own height. No scroll-jacking.
- **Every** motion component checks `useReducedMotion()` and renders the final
  static state. This is not optional.

---

## 9. Imagery

Project S footage is **atmosphere only** while the game is in production —
blurred, parallaxed, and scrimmed so it reads as depth behind type, never as a
viewable screenshot. There is deliberately **no gallery**.

When the game is ready to show properly, add a separate clean gallery
component. Do not achieve it by loosening the values in `Atmosphere.tsx`.

No stock photography, ever.

---

## 10. Open decisions

- [ ] Native-speaker review of all Tamil (§7)
- [ ] SVG logo master + light-background variant (§3)
- [ ] Final domain: `wedigigames.com` vs `games.wedigi.com`
- [ ] Mailing-list provider — `FORM_ENDPOINT` in `web/src/content/site.ts`
- [ ] Social handles: itch.io, Bluesky, YouTube
- [ ] OG image (1200×630) — currently unset
