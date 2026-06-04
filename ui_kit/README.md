# OGP UI Kit

A high-fidelity, cosmetic recreation of the OGP Base Design System components,
for prototyping government-service interfaces. Recreated from
`[OGP] Base Design System.fig` (Button, Form inputs, Infobox, Card, Tabs, etc.).

## Files
- **index.html** — interactive demo: a mock "Apply for a grant" service page
  (form with validation, tabs, modal confirmation, toast) plus a component gallery.
- **Kit.jsx** — all components in one module (Button, IconButton, Field, Input,
  Textarea, Checkbox, Radio, Toggle, Tag, Badge, Link, Avatar, Card, Tile,
  Infobox, Banner, Tabs, Accordion, Toast, Modal) + an `Icon` component with
  authentic BoxIcons paths inlined from the Figma file.
- **kit.css** — lean component styles. One swappable `--primary` slot (theme-neutral).

## Usage
```html
<link href="kit.css" rel="stylesheet" />
<!-- React 18 + Babel (pinned) -->
<script type="text/babel" src="Kit.jsx"></script>
<!-- then use window.Button, window.Field, window.Icon, … in your own script -->
```

## Notes
- **Theme-neutral by design:** no brand committed. Swap the single `--primary`
  value in `kit.css` to re-theme; all components follow.
- **Icons** are inline SVG (real BoxIcons paths from the file) — no icon-font or
  CDN dependency, so they render reliably offline.
- Keep all JSX in **one** Babel script — splitting across multiple `text/babel`
  files causes helper-name collisions in the in-browser transformer.
- Cosmetic recreation: validation/flows are faked for demonstration, not production.
