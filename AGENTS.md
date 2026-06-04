# OGP Base Design System — Coding Agent Instructions

This repository contains the **OGP (Open Government Products) Base Design System** — the shared, accessible design foundation behind Singapore Government digital products: FormSG, Isomer, Vault, Redeem, and ScamShield.

Apply these rules whenever you build or modify UI, components, forms, landing pages, or any Singapore Government digital product interface.

---

## Core principles

- **Semantic tokens always, raw hex never.** The system has two layers: a global colour palette (never apply directly) and semantic tokens named by role (`interaction.main`, `base.content.strong`, `utility.feedback.critical`). Only use semantic tokens in components.
- **Themeable by design.** Re-pointing `--primary` (or the `--blue-*` scale) is the only change needed to re-brand a product. Never hardcode brand colour.
- **Accessibility is a hard requirement.** WCAG AA is the floor, not a target. Every colour pairing must meet AA contrast. Focus rings must always be visible. Touch targets must be ≥ 44 px. Every form field must have a visible label and an explicit error message.
- **Calm, flat, high-contrast.** No gradients in product UI, no heavy drop shadows, no decorative emoji. Flat fills, 1 px subtle borders, soft diffuse elevation only.
- **Sentence case for all labels, headings, and buttons.**

---

## Colour tokens

Use CSS custom properties from `references/colors_and_type.css`. Key semantic tokens:

```
--interaction-main-default   #4A61C0   primary buttons, links, active states
--interaction-main-hover     #3A476B   hover
--interaction-main-active    #2C3354   pressed/active
--base-content-strong        #2C2E34   headings
--base-content-default       #454953   body text
--base-content-light         #686868   captions, helper text
--base-canvas-default        #FFFFFF   page background
--base-canvas-alt            #F8F9F9   panel / alternate surface
--base-divider-subtle        #E9E9E9   borders, hairlines
--base-divider-medium        #C9CCCF   stronger borders
--utility-feedback-success   #00774E   success
--utility-feedback-warning   #CC8800   warning
--utility-feedback-critical  #C03434   error / destructive actions
--utility-focus-default      #1361F0   3 px focus ring (always visible)
```

To re-theme: override the `--blue-*` global scale in `:root`. All semantic tokens follow automatically.

---

## Typography

- **Typefaces:** Inter (UI) · IBM Plex Mono (code). Always load Inter with OpenType features `cv01,cv02,cv03,cv04,cv05,cv09,cv10`.
- **Tracking:** negative on all sizes (approximately –0.6 % to –2.2 %).
- **Product / app pages** — fixed sizes, Semibold (600) headings:
  - `h1` 40 px / 48 px · `h2` 32/40 · `h3` 24/32 · `h4` 20/28 · `h5` 18/24 · `h6` 16/24
  - `body-1` Regular 16/24 · `body-2` Regular 14/20
  - `caption` Medium 14/20 · `code` IBM Plex Mono 14/20
- **Landing / marketing pages** — responsive Light (300) display, scales at 480 px and 1280 px breakpoints:
  - `display-1`: 40 → 56 → 72 px · `display-2`: 40 → 56 → 64 px
- Minimum body text: 14 px. Minimum product text: 16 px.

---

## Spacing, radii, and elevation

- **Spacing scale (4 px base):** 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80
- **Border radius:** `4px` (buttons, inputs, cards, chips) · `8–16 px` (large cards) · `32px` (hero panels) · `9999px` (pills, avatars, tags)
- **Borders:** 1 px in `--base-divider-subtle` or `--base-divider-medium`
- **Shadows:** soft and diffuse only — `0 0 10px rgba(191,191,191,0.5)` or `0 1px 4px rgba(216,216,216,0.5)`. Many surfaces use a border instead of a shadow. No heavy drops.

---

## Components

**Button**
- Appearances: `solid` (filled) · `outline` (border, transparent) · `clear` (ghost/text)
- Colours: `main` · `sub` · `critical`
- Sizes: `xs` · `sm` · `md` (default) · `lg`
- Spec (md): height 44 px · radius 4 px · padding 10 px 16 px · Inter Medium 16/24 · min touch target 44 px
- States: default → hover → active → disabled → focus (always-visible 3 px `#1361F0` ring on keyboard focus)

**Form inputs**
- Height 44 px · 1 px border · 4 px radius · 16 px text
- Error state: `--utility-feedback-critical` border + error message below the field
- `FormControl` pattern: label (optionally numbered) → input → helper text or error message

**Icons**
- Use BoxIcons (line style) only.
- In React: inline SVG via the `Icon` component in `ui_kit/Kit.jsx`.
- In plain HTML: `<i class="bx bx-[name]">` loaded from BoxIcons CDN.
- Do not hand-draw icons. Do not use icon fonts from other CDNs. Do not use emoji as icons.

**Other components** (Accordion, Avatar, Badge, Banner, Breadcrumb, Card, Infobox, Link, Modal, Pagination, Search, Sidebar, Skeleton, Tab, Table, Tag, Toast, Toggle, Tooltip, NavBar, Footer) — see `references/design.md` for full specs. Match: 4 px radius, 1 px subtle borders, light shadows, sentence-case labels, semantic colour roles, always-visible focus ring.

---

## Voice and tone

- Address the citizen as **"you"**. Refer to the agency as **"we"**.
- Plain, direct, reassuring. Factual, calm, no hype.
- No exclamation marks. No jargon.
- Sentence case for all labels, headings, buttons, and menu items.
- Short imperative buttons: "Submit", "Save draft", "Log in", "Continue".
- Form questions get clear labels, optional helper text, and explicit error messages.

---

## Accessibility checklist

- [ ] All text/background pairs meet WCAG AA contrast (≥ 4.5:1 for body, ≥ 3:1 for large text)
- [ ] Keyboard focus is always visible — 3 px solid `#1361F0` ring, never hidden with `outline: none`
- [ ] All interactive elements ≥ 44 px in touch target size
- [ ] Every form field has a visible label (not just placeholder text)
- [ ] Error messages are explicit and appear below the field, not only as colour change
- [ ] Images have meaningful alt text (or `alt=""` if purely decorative)

---

## Files in this repository

| File | Purpose |
|---|---|
| `references/colors_and_type.css` | All CSS custom properties and typography utility classes. `@import` or copy into any project. |
| `references/design.md` | Complete design guide — full colour token tables, component specs, accessibility rules. |
| `ui_kit/Kit.jsx` | React component library with inline-SVG Icon. No external dependencies. |
| `ui_kit/kit.css` | Component styles. Override `--primary` in `:root` to re-theme. |
| `ui_kit/index.html` | Interactive demo. Open directly in browser — no build step. |
| `SKILL.md` | Claude Code skill entry point. |
| `.cursor/rules/ogp-design-system.mdc` | Cursor rule — auto-attaches to CSS, JSX, TSX, and HTML files. |
