# OGP Base Design System — Claude Code Skill

A portable, plug-and-play Claude Code skill that gives Claude a complete working knowledge of the **OGP (Open Government Products) Base Design System** — the shared, accessible design foundation behind Singapore Government digital products like FormSG, Isomer, Vault, Redeem, and ScamShield.

> **Status:** Experimental personal test skill. Not an official OGP / Singapore Government release.

---

## What this skill does

When activated, Claude will generate UI, prototypes, mocks, forms, slides, and landing pages that faithfully match the OGP visual language — correct colour tokens, Inter typography, 4 px spacing scale, accessible components, and the calm, plain-language voice used across gov.sg products.

Claude will:
- **Use semantic colour tokens** (`interaction.main`, `base.content.strong`, `utility.feedback.critical`) — never raw hex
- **Set type in Inter** with the correct OpenType features, weights, and negative letter-spacing; IBM Plex Mono for code
- **Build accessible components** — 3 px focus rings, ≥ 44 px touch targets, labelled form fields with explicit error messages, WCAG AA contrast throughout
- **Re-theme on demand** — overriding one `--primary` variable cascades to every component
- **Output self-contained HTML artifacts** using the bundled CSS tokens and `ui_kit/` components

---

## Repository layout

```
ogo-design-system-skill/
├── README.md                     ← you are here
├── SKILL.md                      ← Claude Code skill entry point
├── references/
│   ├── design.md                 ← full design guide (colour, type, spacing, components, voice)
│   └── colors_and_type.css       ← CSS custom properties + typography utility classes
└── ui_kit/
    ├── Kit.jsx                   ← React component library + inline-SVG Icon
    ├── kit.css                   ← component styles (one --primary slot for theming)
    ├── index.html                ← working interactive demo (no build step required)
    └── README.md                 ← kit load-order notes
```

---

## Quick install

### Option A — Claude Code plugin (recommended)

Install this repository as a Claude Code plugin so the skill is always available in your projects.

```bash
# In your project root
claude plugin install git@github.com:jaydemetillo/ogo-design-system-skill.git
```

Then in any conversation type `/ogp-design-test-skill` to activate it.

### Option B — Copy into project

Copy the skill files into your project's `.claude/skills/` folder:

```bash
mkdir -p .claude/skills/ogp-design-test-skill
cp -r references ui_kit SKILL.md .claude/skills/ogp-design-test-skill/
```

### Option C — Use the zip

Download the `ogp-design-system-skill-v1.0.0.zip` from [Releases](https://github.com/jaydemetillo/ogo-design-system-skill/releases) and unzip it into `.claude/skills/`.

---

## Using the skill

Once installed, start a Claude conversation and say something like:

- *"Build me a FormSG-style contact form"*
- *"Create an OGP landing page for a government digital service"*
- *"Restyle this dashboard to look like a gov.sg product"*
- *"Generate an accessible OGP badge / tag / alert component"*

Claude will read `SKILL.md` → `references/design.md` → `references/colors_and_type.css`, then produce pixel-accurate, accessible HTML or React output.

If invoked with no brief, Claude will ask scoping questions (product UI vs landing page, which product/theme, desired variations) before designing.

---

## Design system reference

### Colour

The system is **semantic-token-first**. Two layers:

| Layer | Example | Rule |
|---|---|---|
| Global palette | `--blue-500: #4A61C0` | Source of truth. Never apply directly. |
| Semantic tokens | `--interaction-main-default: var(--blue-500)` | Always use these in components. |

Key semantic roles:

| Token | Default | Use |
|---|---|---|
| `--interaction-main-default` | `#4A61C0` | Primary buttons, links, active states |
| `--interaction-main-hover` | `#3A476B` | Hover state |
| `--base-content-strong` | `#2C2E34` | Headings |
| `--base-content-default` | `#454953` | Body text |
| `--base-canvas-default` | `#FFFFFF` | Page background |
| `--base-divider-subtle` | `#E9E9E9` | Borders, hairlines |
| `--utility-feedback-critical` | `#C03434` | Error / destructive |
| `--utility-focus-default` | `#1361F0` | 3 px keyboard focus ring |

Full scale and all tokens in [`references/colors_and_type.css`](references/colors_and_type.css).

### Typography

**One typeface: Inter** (with `cv01–cv10` OpenType features). IBM Plex Mono for code. Tracking is uniformly negative.

Two style families:

| Family | When | Weight |
|---|---|---|
| Fixed (`.h1`–`.h6`, `.body-1`, `.body-2`) | Product / app pages | Semibold headings, Regular body |
| Responsive (`.display-1`, `.display-2`) | Landing / marketing pages | Light (300), scales at 480 px and 1280 px |

Minimum body text: 14 px. Minimum product text: 16 px.

### Spacing & radii

- **Spacing:** 4 px base scale — `4, 8, 12, 16, 24, 32, 40, 48, 64, 80`
- **Radii:** `4 px` (buttons, inputs, cards) · `8–16 px` (larger cards) · `32 px` (hero panels) · `full` (pills, avatars)
- **Borders:** `1 px` in `--base-divider-subtle` / `--base-divider-medium`
- **Elevation:** soft, diffuse shadows only — `0 0 10px rgba(191,191,191,0.5)`. Many surfaces use a border instead of a shadow.
- **No gradients** in product UI.

### Components

The `ui_kit/Kit.jsx` ships these components:

| Component | Variants |
|---|---|
| `Button` | `solid` / `outline` / `clear`; `main` / `sub` / `critical`; `xs` / `sm` / `md` / `lg` |
| `Badge` / `Tag` | Colour-coded status chips |
| `Input` / `Textarea` | With error state, helper text |
| `FormControl` | Label + input + helper/error |
| `Checkbox` / `Radio` | OGP-styled, accessible |
| `Card` | Subtle border + light shadow |
| `Infobox` | Info / Warning / Error callout |
| `Icon` | Inline-SVG BoxIcons (no CDN dependency) |
| `NavBar` | Product top navigation |
| `Footer` | Standard gov.sg footer |

### Iconography

Icons are **BoxIcons** (line style). The `Icon` component in `Kit.jsx` includes authentic SVG paths — no external font or CDN required. Do not use emoji as icons.

### Voice & tone

| Rule | Example |
|---|---|
| Address citizens as "you" | "Your application has been submitted." |
| Refer to the agency as "we" | "We will review your request within 3 working days." |
| Sentence case everywhere | "Submit application" not "Submit Application" |
| Short imperative buttons | "Submit", "Save draft", "Log in" |
| No hype or exclamation marks | — |

---

## Re-theming

Override the `--blue-*` scale (and optionally `--primary`) in `:root` — all semantic tokens and components follow automatically:

```css
:root {
  /* Example: re-theme to a green brand */
  --blue-500: #00774E;
  --blue-600: #0c5132;
  --blue-100: #c0ddcd;
  --blue-50:  #e2eee8;
}
```

---

## Accessibility requirements (non-negotiable)

- **WCAG AA** contrast for all text — AA is the floor, not a target
- **3 px focus ring** in `#1361F0` — always visible on keyboard focus, never hidden with `outline: none`
- **≥ 44 px touch targets** on mobile
- **Labelled form fields** — every input has a visible label, helper text, and an explicit error message
- **No decorative emoji** in UI

---

## Relationship to `@opengovsg/design-system`

This skill mirrors the token naming conventions of the public [`@opengovsg/design-system`](https://github.com/opengovsg/design-system) npm package (a Chakra UI theme). For production React apps, use that package. This skill is optimised for **rapid AI-assisted prototyping** — self-contained HTML/JSX with no build pipeline.

---

## Contributing

This is an experimental personal skill. Issues and pull requests are welcome. If you work at OGP and would like to adopt or extend this, feel free to reach out.

---

## License

Experimental — personal test skill, not an official OGP release. The OGP Design System itself belongs to Open Government Products / GovTech Singapore.
