# OGP Base Design System — AI Coding Agent Instructions

Plug-and-play instructions for AI coding agents that make Claude Code, Cursor, and OpenAI Codex produce UI that matches the **OGP (Open Government Products) Base Design System** — the shared, accessible design foundation behind Singapore Government digital products: FormSG, Isomer, Vault, Redeem, and ScamShield.

> **Status:** Experimental personal packaging. Not an official OGP / Singapore Government release.

---

## What this gives you

Once installed for your tool of choice, your AI assistant will:

- Use **semantic colour tokens** (`--interaction-main-default`, `--base-content-strong`, `--utility-feedback-critical`) — never raw hex
- Set type in **Inter** with correct OpenType features, weights, and negative letter-spacing; IBM Plex Mono for code
- Build **accessible components** — 3 px focus rings, ≥ 44 px touch targets, labelled form fields with explicit error messages, WCAG AA contrast throughout
- Follow **OGP voice and tone** — sentence case, plain language, "you" for the citizen, "we" for the agency
- **Re-theme on demand** — overriding one `--primary` variable cascades to every component
- Output self-contained HTML artifacts or production React using the bundled CSS tokens and `ui_kit/` components

---

## Install

### Claude Code

**Option A — Plugin (recommended)**

```bash
claude plugin install git@github.com:jaydemetillo/ogp-design-system-skill.git
```

Then activate in any conversation:
```
/ogp-design-test-skill
```

**Option B — Copy into project**

```bash
mkdir -p .claude/skills/ogp-design-test-skill
git clone --depth 1 git@github.com:jaydemetillo/ogp-design-system-skill.git /tmp/ogp-skill
cp -r /tmp/ogp-skill/{SKILL.md,references,ui_kit} .claude/skills/ogp-design-test-skill/
```

**Option C — Zip download**

Download [`ogp-design-system-skill-v1.0.0.zip`](https://github.com/jaydemetillo/ogp-design-system-skill/releases/latest) from Releases, then:

```bash
unzip ogp-design-system-skill-v1.0.0.zip -d .claude/skills/ogp-design-test-skill/
```

---

### Cursor

**Option A — Copy rule file into your project (recommended)**

```bash
mkdir -p .cursor/rules
curl -fsSL https://raw.githubusercontent.com/jaydemetillo/ogp-design-system-skill/main/.cursor/rules/ogp-design-system.mdc \
  -o .cursor/rules/ogp-design-system.mdc
```

The rule auto-attaches whenever you open `.tsx`, `.jsx`, `.css`, `.scss`, or `.html` files. No further setup needed.

**Option B — Clone and copy**

```bash
git clone --depth 1 git@github.com:jaydemetillo/ogp-design-system-skill.git /tmp/ogp-skill
mkdir -p .cursor/rules
cp /tmp/ogp-skill/.cursor/rules/ogp-design-system.mdc .cursor/rules/
```

**Option C — Global rules (applies to all Cursor projects)**

1. Open Cursor → **Settings → Cursor Settings → Rules**
2. Click **Add rule** and paste the contents of [`.cursor/rules/ogp-design-system.mdc`](.cursor/rules/ogp-design-system.mdc)

Commit the `.cursor/rules/` folder to your repository so your whole team gets the same AI behaviour.

---

### OpenAI Codex CLI

**Option A — Project-level (this repo or your project)**

```bash
# From your project root
curl -fsSL https://raw.githubusercontent.com/jaydemetillo/ogp-design-system-skill/main/AGENTS.md \
  -o AGENTS.md
```

Codex automatically reads `AGENTS.md` from the Git root and any parent directory down to your working directory.

**Option B — Global (all Codex projects)**

```bash
mkdir -p ~/.codex
curl -fsSL https://raw.githubusercontent.com/jaydemetillo/ogp-design-system-skill/main/AGENTS.md \
  -o ~/.codex/AGENTS.md
```

**Option C — Clone and copy**

```bash
git clone --depth 1 git@github.com:jaydemetillo/ogp-design-system-skill.git /tmp/ogp-skill

# Project-level
cp /tmp/ogp-skill/AGENTS.md ./AGENTS.md

# — or global —
mkdir -p ~/.codex && cp /tmp/ogp-skill/AGENTS.md ~/.codex/AGENTS.md
```

> If you already have an `AGENTS.md` in your project, append the contents of this repo's `AGENTS.md` to it rather than overwriting.

---

## Repository layout

```
ogp-design-system-skill/
├── README.md                              ← you are here
├── SKILL.md                               ← Claude Code skill entry point
├── AGENTS.md                              ← OpenAI Codex CLI instructions
├── .cursor/
│   └── rules/
│       └── ogp-design-system.mdc          ← Cursor rule (auto-attaches to UI files)
├── references/
│   ├── design.md                          ← full design guide
│   └── colors_and_type.css                ← CSS custom properties + type classes
├── ui_kit/
│   ├── Kit.jsx                            ← React components + inline-SVG Icon
│   ├── kit.css                            ← component styles (one --primary slot)
│   ├── index.html                         ← interactive demo, no build step
│   └── README.md                          ← kit load-order notes
└── package.json
```

---

## Design system reference

### Colour

The system is **semantic-token-first**. Two layers — global palette (source, never apply directly) and semantic tokens (always use in components):

| Token | Default | Use |
|---|---|---|
| `--interaction-main-default` | `#4A61C0` | Primary buttons, links, active states |
| `--interaction-main-hover` | `#3A476B` | Hover |
| `--interaction-main-active` | `#2C3354` | Pressed / active |
| `--base-content-strong` | `#2C2E34` | Headings |
| `--base-content-default` | `#454953` | Body text |
| `--base-content-light` | `#686868` | Captions, helper text |
| `--base-canvas-default` | `#FFFFFF` | Page background |
| `--base-canvas-alt` | `#F8F9F9` | Panel / alternate surface |
| `--base-divider-subtle` | `#E9E9E9` | Borders, hairlines |
| `--base-divider-medium` | `#C9CCCF` | Stronger borders |
| `--utility-feedback-success` | `#00774E` | Success |
| `--utility-feedback-warning` | `#CC8800` | Warning |
| `--utility-feedback-critical` | `#C03434` | Error / destructive |
| `--utility-focus-default` | `#1361F0` | 3 px keyboard focus ring |

Full global palette and all tokens → [`references/colors_and_type.css`](references/colors_and_type.css)

### Typography

**One typeface: Inter** (with `cv01–cv10` OpenType features). IBM Plex Mono for code. Tracking is uniformly negative.

| Family | When | Weight |
|---|---|---|
| Fixed (`.h1`–`.h6`, `.body-1`, `.body-2`) | Product / app pages | Semibold headings, Regular body |
| Responsive (`.display-1`, `.display-2`) | Landing / marketing pages | Light (300), scales at 480 px and 1280 px |

Key fixed sizes: `h1` 40/48 · `h2` 32/40 · `h3` 24/32 · `h4` 20/28 · `body-1` Regular 16/24 · `body-2` Regular 14/20

### Spacing, radii, and elevation

| Property | Values |
|---|---|
| Spacing scale | 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 px |
| Radii | 4 px (default) · 8–16 px (large cards) · 32 px (hero) · 9999 px (pills) |
| Borders | 1 px in `--base-divider-subtle` or `--base-divider-medium` |
| Shadows | Soft, diffuse only — `0 0 10px rgba(191,191,191,0.5)`. Many surfaces use border instead. No heavy drops. |
| Gradients | None in product UI |

### Components (`ui_kit/Kit.jsx`)

| Component | Variants |
|---|---|
| `Button` | `solid` / `outline` / `clear` × `main` / `sub` / `critical` × `xs` / `sm` / `md` / `lg` |
| `Input` / `Textarea` | With error state and helper text |
| `FormControl` | Label + input + helper/error (the standard form pattern) |
| `Checkbox` / `Radio` | OGP-styled, accessible |
| `Badge` / `Tag` | Colour-coded status chips |
| `Card` | Subtle border + light shadow |
| `Infobox` | Info / Warning / Error callout |
| `Icon` | Inline-SVG BoxIcons — no CDN or font dependency |
| `NavBar` | Product top navigation |
| `Footer` | Standard gov.sg footer |

### Voice and tone

| Rule | Example |
|---|---|
| Citizen = "you" | "Your application has been submitted." |
| Agency = "we" | "We will respond within 3 working days." |
| Sentence case everywhere | "Submit application" not "Submit Application" |
| Short imperative buttons | "Submit", "Save draft", "Log in" |
| No hype or exclamation marks | — |

### Accessibility requirements

- WCAG AA contrast minimum for all text (≥ 4.5:1 body, ≥ 3:1 large text)
- 3 px focus ring in `#1361F0` — always visible on keyboard focus, never `outline: none`
- ≥ 44 px touch targets on mobile
- Every form field has a visible label (not just placeholder text)
- Error messages are explicit and appear below the field
- No decorative emoji in UI

### Re-theming

Override the `--blue-*` scale in `:root`. All semantic tokens and every component re-theme automatically:

```css
:root {
  /* Example: ScamShield red theme */
  --blue-500: #C03434;
  --blue-600: #9B2727;
  --blue-100: #FBE9E9;
  --blue-50:  #FEF2F2;
}
```

---

## Relationship to `@opengovsg/design-system`

This repository mirrors the token naming of the public [`@opengovsg/design-system`](https://github.com/opengovsg/design-system) npm package (a Chakra UI theme). For production React apps, use that package directly. This repo is optimised for **AI-assisted prototyping** — zero-dependency HTML/JSX that any AI coding agent can generate without a build pipeline.

---

## Contributing

Issues and pull requests welcome. If you work at OGP and want to adopt, extend, or keep this in sync with the official design system, feel free to reach out.

---

## License

MIT. The OGP Design System itself belongs to Open Government Products / GovTech Singapore.
