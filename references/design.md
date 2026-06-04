# OGP Base Design System

The shared, themeable design system that underpins digital services built by
**Open Government Products (OGP)** and the Singapore Government — the foundation
behind products like FormSG, Isomer, Vault, Redeem and ScamShield. It is built
for **accessible, trustworthy, no-nonsense government services**: clear, calm,
high-contrast, and consistent across dozens of products.

> **Source:** reconstructed from `[OGP] Base Design System.fig`. It mirrors the
> public `@opengovsg/design-system` (a Chakra UI theme). When you need exact
> per-step colour tints or component tokens, pull them from the Figma Tokens
> plugin or the npm package — those are the source of truth.

---

## 1. The big idea: global → semantic, and themeable

This is **not** a fixed-colour system. It has two layers:

1. **Global palette** — raw colour scales (`blue`, `grey`, `green`, `red`,
   `yellow`, plus per-product `brand.primary` / `brand.secondary` and `skin`
   tones for illustrations). Each scale runs `50 → 900`. **You never apply
   global colours directly.**
2. **Semantic tokens** — named by *role*, not hue: `interaction.main`,
   `base.content.strong`, `utility.feedback.critical`, `base.divider.subtle`.
   You build everything with these.

Why: switching a product from one brand to another only requires re-pointing
`brand.primary`/`brand.secondary`; every semantic token (and therefore every
component) keeps working. `interaction.main` = "the primary action colour /
hierarchy," which is *not necessarily* the brand hue.

Every product ships its own palette (Form, Isomer, Redeem, ScamShield, Vault all
exist in the file). The values documented here are the **default Base theme**.

---

## 2. Content & voice

OGP government copy is **plain, direct, and reassuring**. Examples from the file:
*"We are an experimental development team that builds technology for the public
good."*

- **Person:** address the citizen as **"you"**; the agency is **"we"**. Never corporate-stiff.
- **Tone:** factual, helpful, calm. No hype, no exclamation marks, no jargon. Explain, don't sell.
- **Casing:** Sentence case for **everything** — headings, buttons, labels, menu items. Not Title Case.
- **Buttons / labels:** short imperative verbs ("Submit", "Save draft", "Log in", "Continue").
- **Emoji:** not used in product UI.
- **Numbers / forms:** questions get clear labels, optional helper text, and explicit error messages. Accessibility and clarity beat cleverness every time.

---

## 3. Colour

### Roles (use the semantic token, never the raw hex)
| Token | Default value | Use |
|---|---|---|
| `interaction.main.default` | `#4A61C0` | primary buttons, links, active states, focus accents |
| `interaction.main.hover` / `.active` | `#3A476B` / `#2C3354` | hover & pressed |
| `interaction.main-subtle` | `#F7F9FE` → `#E1EBFD` | tinted backgrounds, selected rows, info surfaces |
| `interaction.sub` | `#454953` | secondary / neutral emphasis |
| `interaction.critical` | `#C03434` | destructive actions |
| `base.content.strong` | `#2C2E34` | headings |
| `base.content.default` | `#454953` | body text |
| `base.content.light` | `#686868` | captions, helper, placeholder |
| `base.canvas.default` / `.alt` | `#FFFFFF` / `#F8F9F9` | page & panel backgrounds |
| `base.divider.subtle` / `.medium` | `#E9E9E9` / `#C9CCCF` | borders, hairlines |
| `utility.feedback.success` | `#00774E` | success |
| `utility.feedback.warning` | `#CC8800` | warning |
| `utility.feedback.critical` | `#C03434` | error |
| `utility.focus-default` | `#1361F0` | the **3px focus ring** (always visible on keyboard focus) |

### Global scales (source)
- **Blue / brand primary** `50 #F7F9FE · 100 #E1EBFD · 200 #ACC7FA · 500 #4A61C0 · 600 #3A476B · 800 #293044`
- **Grey** `50 #F8F9F9 · 100 #F0F0F1 · 200 #E9E9E9 · 300 #C9CCCF · 400 #BFBFBF · 500 #686868 · 700 #454953 · 900 #2C2E34`
- **Green** `50 #E2EEE8 · 600 #00774E · 900 #003523`
- **Red** `50 #FBE9E9 · 400 #EE4554 · 500 #C03434 · 900 #571717`
- **Yellow** `50 #FEF5D3 · 600 #CC8800 · 900 #3F2B00`
- **Skin tones** (illustrations only): `#F5B896 #EBA687 #D98F6F #BF7657 #9F634F #764738` …

> Every step in the global palette is tuned to a documented WCAG contrast ratio
> (most ≥ 4.5:1; the `50`/`900` ends hit AAA). **Accessibility is a hard
> requirement, not a nice-to-have** — never ship text below AA.

---

## 4. Typography

**One typeface: Inter.** Code/monospace uses **IBM Plex Mono** (Roboto Mono as
fallback). Inter is always set with OpenType features
`cv01,cv02,cv03,cv04,cv05,cv09,cv10` (and `tnum` for tabular figures). Tracking
is uniformly **tight and negative** (≈ −0.6% to −2.2%).

There are **two style families**:

### Fixed styles — for product/app pages (size never changes)
| Token | Size / line-height | Weight |
|---|---|---|
| `h1` | 40 / 48 | Semibold 600 |
| `h2` | 32 / 40 | Semibold 600 |
| `h3` | 24 / 32 | Semibold 600 |
| `h4` | 20 / 28 | Semibold 600 |
| `h5` | 18 / 24 | Semibold 600 |
| `h6` | 16 / 24 | Semibold 600 |
| `subhead` | 16 / 24 | Semibold 600 |
| `body-1` | 16 / 24 | Regular 400 |
| `body-2` | 14 / 20 | Regular 400 |
| `caption` | 14 / 20 or 12 / 16 | Medium 500 / Regular 400 |
| `code` | 14 / 20 | IBM Plex Mono |

### Responsive styles — for landing pages (fluid, scale at breakpoints)
Display headings are set **Light (300)** and scale up across breakpoints
(`0–479` → `480–1279` → `1280+`):
- `responsive-display-01`: 40 → 56 → **72**
- `responsive-display-02`: 40 → 56 → **64**

Rule of thumb: **product UI = fixed Semibold headings; marketing/landing = responsive Light display.** Body never goes below 14px; product text min 16px.

---

## 5. Spacing, radii, elevation

- **Spacing** is a **4px base scale**: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80. Layout gaps observed: 8/16/24 inside components, 32/48/64/80 between sections.
- **Radii:** `4px` is the workhorse (buttons, inputs, cards, chips, tags). `8–16px` for larger cards. `32px` for hero/feature panels. `full` for pills, tags, and avatars.
- **Borders:** hairline `1px` in `base.divider.subtle` (`#E9E9E9`) / `medium` (`#C9CCCF`). Inputs and outline buttons use a visible 1px border.
- **Elevation is light.** Soft, diffuse, low-opacity shadows — never heavy drop shadows. Typical card: `0 0 10px rgba(191,191,191,0.5)` or `0 1px 4px rgba(216,216,216,0.5)`. Many surfaces use a **border instead of a shadow**.
- **No gradients** in product UI; flat fills only. (Illustrations may use colour, but components stay flat.)

---

## 6. Components

The library is large and built on a consistent **variant API** (Chakra-style:
`appearance` × `colourScheme` × `size` × `state`). Key ones:

### Button
- **Appearance:** `Solid` (filled), `Outline` (border, transparent fill), `Clear` (text only / ghost), `Inverse` (for dark backgrounds).
- **Colour:** `Main` (primary), `Sub` (neutral), `Critical` (destructive), `Neutral`, `Inverse`, `White`.
- **Size:** `xs`, `sm`, `md`, `lg`.
- **Spec (md):** height **44px**, radius **4px**, padding **10px 16px**, label **Inter Medium 16/24, −1.1%**. Solid Main = `interaction.main` fill, white label. Min touch target 44px on mobile.
- States: default → hover (darker) → active (darker still) → disabled (greyed) → with a visible **3px focus ring** on keyboard focus.

### Forms (a major strength of this system)
Inputs (text / textarea / number / phone), Combobox, Multiselect, Date/Time,
Radio, Checkbox, Attachment, Rich Text Editor — all share a **FormControl**
pattern: question label (optionally numbered, with tooltip / "Optional" tag /
description), the input, and a helper or error message below. Error state uses
`utility.feedback.critical` border + message. Default input: 1px border,
`4px` radius, 44px height, 16px text.

### Others present
Accordion, Avatar, Badge, Banner, Breadcrumb, Card, Tile, Dropdown menu/list,
Infobox (info/warning/error callouts), Link, Modal, Pagination, Progress
indicator, Search, Sidebar, Skeleton (loading), Tab / Tab Group / Vertical Tab,
Table, Tag, Toast, Toggle, Tooltip + walkthrough, Navigation, Footer, Singpass /
generic Login, Floating help button.

When recreating any component, match: 4px radius, 1px subtle borders, light
shadows, sentence-case labels, the semantic colour roles, and an always-visible
focus ring.

---

## 7. Iconography & illustration

- **Icons:** the **BoxIcons** set (the `Icon/*` names — `chevron-down`, `x`,
  `world`, `link-external`, `radio-circle-marked` — are BoxIcons). Line style,
  consistent stroke. For HTML mocks load BoxIcons from CDN
  (`https://unpkg.com/boxicons@latest/css/boxicons.min.css`, use `<i class='bx bx-x'>`),
  or `react-icons/bi`. Don't hand-draw icons.
- **Illustrations:** flat, friendly, human-centred spot illustrations with the
  documented `skin` tone palette. Used on empty states, onboarding, landing.
- **No emoji** as iconography.

---

## 8. Layout & accessibility

- **Grid / breakpoints:** mobile-first; the meaningful breakpoints are **480px**
  (mobile→tablet) and **1280px** (→desktop). Responsive type scales at these.
- **Accessibility is the headline value.** Every colour pairing is contrast-rated;
  keyboard focus is always visible (3px `#1361F0` ring); forms have labels,
  helper text and explicit errors; touch targets ≥ 44px. Treat WCAG AA as the
  floor.

---

## 9. Files in this system
- `design.md` — this document.
- `colors_and_type.css` — ready-to-use CSS custom properties + type classes. `@import` or copy it into any mock.
- `ui_kit/` — high-fidelity component recreations (`index.html` interactive demo, `Kit.jsx`, `kit.css`) + an `Icon` component with authentic BoxIcons paths.
- `preview/` — Design System tab specimen cards (type, colour, spacing, components).
- `SKILL.md` — agent skill entry point.

**To re-theme:** override the `--blue-*` (brand.primary) and accent scales in
`:root`; the semantic tokens and components follow automatically.
