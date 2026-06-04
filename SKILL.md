---
name: ogp-design-test-skill
description: Generate well-branded, accessible interfaces and assets in the OGP (Open Government Products) Base Design System — the themeable system behind Singapore Government digital services (FormSG, Isomer, Vault, ScamShield). Use whenever building or styling UI, prototypes, mocks, slides, or landing pages that should look like a Singapore Government / OGP product. Provides the colour system (global → semantic), Inter type scale, spacing/radii, reusable components, and an inline-SVG icon set.
license: Experimental — personal test skill, not an official OGP release.
---

# OGP Design Test Skill

An experimental, portable packaging of the OGP Base Design System for use in
Claude Code / cowork. **This is a personal test skill, not an official OGP asset.**

## When to use
Apply this whenever the user asks for an interface, prototype, mock, form, slide,
or landing page that should follow OGP / Singapore Government styling — or asks to
restyle something "to match gov.sg / OGP".

## How to use it
1. **Read `references/design.md` first.** It is the complete guide: colour roles,
   the two type families, spacing, components, voice, and accessibility rules.
2. **Pull in `references/colors_and_type.css`** — ready-made CSS custom properties
   and type classes. `@import` it or paste its `:root` block into any HTML you build.
3. **For components, fork `ui_kit/`** — `Kit.jsx` (all components + an inline-SVG
   `Icon`) and `kit.css`. `ui_kit/index.html` is a working reference. The
   `ui_kit/README.md` explains the load order.

## Non-negotiable rules (summary — see design.md for detail)
- **Build with semantic tokens, not raw hex.** `interaction.main` for primary
  actions, `base.content.*` for text, `utility.feedback.*` for status,
  `base.divider.*` for borders.
- **Themeable:** the system commits to no brand colour. Swap the single
  `--primary` value in `kit.css` (or the `--blue-*` scale in `colors_and_type.css`)
  to re-theme; everything else follows.
- **Type:** Inter everywhere (with `cv01–cv10` font-features), IBM Plex Mono for
  code. Fixed Semibold headings for product UI; responsive Light display for
  landing pages. Negative letter-spacing. **Sentence case for all labels.**
- **Look:** 4px radius, 1px subtle borders, light/diffuse shadows (often a border
  instead of a shadow), flat fills. **No gradients, no emoji.** Calm, clear, high-contrast.
- **Accessibility is the headline value:** WCAG AA minimum, always-visible 3px
  `#1361F0` focus ring, ≥44px touch targets, labelled fields with explicit errors.
- **Icons:** use the inline-SVG `Icon` in `Kit.jsx` (authentic BoxIcons paths).
  Don't hand-draw icons, don't rely on an icon font/CDN, don't use emoji.
- **Voice:** plain, direct, reassuring. "You" = the citizen, "we" = the agency. No hype.

## Output
- **Visual artifacts** (mocks, prototypes, slides, landing pages): write
  self-contained HTML, pull in `colors_and_type.css` / the kit, and show the file.
- **Production code:** apply the rules here and mirror `@opengovsg/design-system`
  token names where possible.
- Keep all JSX in **one** `text/babel` script — splitting across files collides
  on the in-browser transformer's helper names.

If invoked with no specific brief, ask what to build, ask a few scoping questions
(product UI vs landing page, which product/theme, variations wanted), then act as
an expert OGP designer.

## Contents
```
ogp-design-test-skill/
├── SKILL.md                      ← this file
├── references/
│   ├── design.md                 ← full design guide
│   └── colors_and_type.css       ← tokens + type classes
└── ui_kit/
    ├── Kit.jsx                    ← components + inline-SVG Icon
    ├── kit.css                    ← component styles (one --primary slot)
    ├── index.html                ← working reference / demo
    └── README.md
```
