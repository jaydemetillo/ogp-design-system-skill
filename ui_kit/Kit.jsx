// OGP UI Kit — all components in ONE Babel module (avoids cross-file helper
// collisions when several text/babel scripts share global scope).
const { useState } = React;

/* ========================= ICONS ========================= */
// Authentic BoxIcons paths copied from the design file, normalised to 24×24.
// Decorative icons load real SVG assets via CSS mask so they inherit color.
const ICON_PATHS = {
  "info-circle":  ["translate(2,2)", "M 10 0 C 4.486 0 0 4.486 0 10 C 0 15.514 4.486 20 10 20 C 15.514 20 20 15.514 20 10 C 20 4.486 15.514 0 10 0 Z M 11 15 L 9 15 L 9 9 L 11 9 L 11 15 Z M 11 7 L 9 7 L 9 5 L 11 5 L 11 7 Z"],
  "check-circle": ["translate(2,2)", "M 10 0 C 4.486 0 0 4.486 0 10 C 0 15.514 4.486 20 10 20 C 15.514 20 20 15.514 20 10 C 20 4.486 15.514 0 10 0 Z M 8.001 14.413 L 4.288 10.708 L 5.7 9.292 L 7.999 11.587 L 13.293 6.293 L 14.707 7.707 L 8.001 14.413 Z"],
  "x-circle":     ["translate(2,2)", "M 10 0 C 4.486 0 0 4.486 0 10 C 0 15.514 4.486 20 10 20 C 15.514 20 20 15.514 20 10 C 20 4.486 15.514 0 10 0 Z M 14.207 12.793 L 12.793 14.207 L 10 11.414 L 7.207 14.207 L 5.793 12.793 L 8.586 10 L 5.793 7.207 L 7.207 5.793 L 10 8.586 L 12.793 5.793 L 14.207 7.207 L 11.414 10 L 14.207 12.793 Z"],
  "error-circle": ["translate(2,2)", "M 9.953 0 C 4.465 0 0 4.486 0 10 C 0 15.514 4.486 20 10 20 C 15.514 20 20 15.514 20 10 C 20 4.486 15.493 0 9.953 0 Z M 10 18 C 5.589 18 2 14.411 2 10 C 2 5.589 5.567 2 9.953 2 C 14.391 2 18 5.589 18 10 C 18 14.411 14.411 18 10 18 Z", "M 9 5 L 11 5 L 11 12 L 9 12 L 9 5 Z M 9 13 L 11 13 L 11 15 L 9 15 L 9 13 Z"],
  "chevron-down": ["translate(6.293,9.293)", "M 10 0 L 5.707 4.293 L 1.414 0 L 0 1.414 L 5.707 7.121 L 11.414 1.414 L 10 0 Z"],
  "chevron-up":   ["translate(6.293,7.586)", "M 0 5.707 L 1.414 7.121 L 5.707 2.828 L 10 7.121 L 11.414 5.707 L 5.707 0 L 0 5.707 Z"],
  "x":            ["translate(6.293,6.344)", "M 9.899 0 L 5.656 4.242 L 1.414 0 L 0 1.414 L 4.242 5.656 L 0 9.898 L 1.414 11.312 L 5.656 7.07 L 9.899 11.312 L 11.313 9.898 L 7.071 5.656 L 11.313 1.414 L 9.899 0 Z"],
  "arrow-right":  ["translate(6,5.293)", "M 5.293 12 L 6.707 13.414 L 13.414 6.707 L 6.707 0 L 5.293 1.414 L 9.586 5.707 L 0 5.707 L 0 7.707 L 9.586 7.707 L 5.293 12 Z"],
};

// Multi-path decorative icons (authentic BoxIcons SVGs from the file), native viewBox.
const ICON_SVGS = {
  buildings: ["0 0 18 20", "M 16 0 L 6 0 C 4.897 0 4 0.897 4 2 L 4 8 L 2 8 C 0.897 8 0 8.897 0 10 L 0 19 C 0 19.552 0.447 20 1 20 L 17 20 C 17.553 20 18 19.552 18 19 L 18 2 C 18 0.897 17.103 0 16 0 Z M 2 10 L 8 10 L 8 18 L 2 18 L 2 10 Z M 16 18 L 10 18 L 10 10 C 10 8.897 9.103 8 8 8 L 6 8 L 6 2 L 16 2 L 16 18 Z", "M 8 4 L 10 4 L 10 6 L 8 6 L 8 4 Z M 12 4 L 14 4 L 14 6 L 12 6 L 12 4 Z M 12 8.031 L 14 8.031 L 14 10 L 12 10 L 12 8.031 Z M 12 12 L 14 12 L 14 14 L 12 14 L 12 12 Z M 4 12.001 L 6 12.001 L 6 14.001 L 4 14.001 L 4 12.001 Z"],
  file: ["0 0 16 20", "M 15.903 6.586 C 15.856 6.477 15.789 6.378 15.707 6.293 L 9.707 0.293 C 9.622 0.211 9.523 0.144 9.414 0.097 C 9.384 0.083 9.352 0.075 9.32 0.064 C 9.236 0.036 9.149 0.018 9.061 0.013 C 9.04 0.011 9.021 0 9 0 L 2 0 C 0.897 0 0 0.897 0 2 L 0 18 C 0 19.103 0.897 20 2 20 L 14 20 C 15.103 20 16 19.103 16 18 L 16 7 C 16 6.979 15.989 6.96 15.987 6.938 C 15.982 6.85 15.965 6.763 15.936 6.679 C 15.926 6.647 15.917 6.616 15.903 6.586 Z M 12.586 6 L 10 6 L 10 3.414 L 12.586 6 Z M 2 18 L 2 2 L 8 2 L 8 7 C 8 7.265 8.105 7.52 8.293 7.707 C 8.48 7.895 8.735 8 9 8 L 14 8 L 14.002 18 L 2 18 Z", "M 4 10 L 12 10 L 12 12 L 4 12 L 4 10 Z M 4 14 L 12 14 L 12 16 L 4 16 L 4 14 Z M 4 6 L 6 6 L 6 8 L 4 8 L 4 6 Z"],
  world: ["0 0 20 20", "M 10 0 C 4.486 0 0 4.486 0 10 C 0 15.514 4.486 20 10 20 C 15.514 20 20 15.514 20 10 C 20 4.486 15.514 0 10 0 Z M 2 10 C 2 9.101 2.156 8.238 2.431 7.431 L 4 9 L 6 11 L 6 13 L 8 15 L 9 16 L 9 17.931 C 5.061 17.436 2 14.072 2 10 Z M 16.33 14.873 C 15.677 14.347 14.687 14 14 14 L 14 13 C 14 11.896 13.104 11 12 11 L 8 11 L 8 9 L 8 8 C 9.104 8 10 7.104 10 6 L 10 5 L 11 5 C 12.104 5 13 4.104 13 3 L 13 2.589 C 15.928 3.778 18 6.65 18 10 C 18 11.835 17.373 13.522 16.33 14.873 Z"],
  lock: ["0 0 16 20", "M 8 0 C 5.243 0 3 2.243 3 5 L 3 7 L 2 7 C 0.897 7 0 7.897 0 9 L 0 18 C 0 19.103 0.897 20 2 20 L 14 20 C 15.103 20 16 19.103 16 18 L 16 9 C 16 7.897 15.103 7 14 7 L 13 7 L 13 5 C 13 2.243 10.757 0 8 0 Z M 5 5 C 5 3.346 6.346 2 8 2 C 9.654 2 11 3.346 11 5 L 11 7 L 5 7 L 5 5 Z M 14.002 18 L 9 18 L 9 15.722 C 9.595 15.375 10 14.737 10 14 C 10 12.897 9.103 12 8 12 C 6.897 12 6 12.897 6 14 C 6 14.736 6.405 15.375 7 15.722 L 7 18 L 2 18 L 2 9 L 14 9 L 14.002 18 L 14.002 18 Z"],
  warning: ["0 0 18.682 17.862", "M 8.342 6.862 L 10.342 6.862 L 10.342 11.862 L 8.342 11.862 L 8.342 6.862 Z M 8.341 12.862 L 10.341 12.862 L 10.341 14.862 L 8.341 14.862 L 8.341 12.862 Z", "M 11.109 1.062 C 10.761 0.407 10.083 0 9.341 0 C 8.599 0 7.921 0.407 7.573 1.063 L 0.235 14.926 C 0.072 15.23 -0.009 15.572 0.001 15.917 C 0.01 16.262 0.109 16.599 0.289 16.894 C 0.465 17.19 0.716 17.436 1.017 17.605 C 1.317 17.775 1.657 17.864 2.002 17.862 L 16.68 17.862 C 17.388 17.862 18.029 17.5 18.394 16.894 C 18.573 16.599 18.672 16.262 18.681 15.917 C 18.691 15.572 18.61 15.231 18.448 14.926 L 11.109 1.062 Z M 2.002 15.862 L 9.341 1.999 L 16.685 15.862 L 2.002 15.862 Z"],
};

function Icon(props) {
  const name = props.name, size = props.size || 24, extra = props.style || {};
  if (ICON_SVGS[name]) {
    const def = ICON_SVGS[name], vb = def[0], paths = def.slice(1);
    const st = Object.assign({ flex: "none", display: "inline-block", verticalAlign: "middle" }, extra);
    return (
      <svg width={size} height={size} viewBox={vb} fill="currentColor" style={st}>
        {paths.map((d, i) => <path key={i} d={d} fillRule="nonzero" />)}
      </svg>
    );
  }
  if (ICON_PATHS[name]) {
    const def = ICON_PATHS[name];
    const tf = def[0], paths = def.slice(1);
    const st = Object.assign({ flex: "none", display: "inline-block", verticalAlign: "middle" }, extra);
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={st}>
        <g transform={tf}>{paths.map((d, i) => <path key={i} d={d} />)}</g>
      </svg>
    );
  }
  const src = `url(icons/${name}.svg)`;
  const st = Object.assign({
    display: "inline-block", width: size, height: size, flex: "none", verticalAlign: "middle",
    backgroundColor: "currentColor",
    WebkitMask: `${src} center/contain no-repeat`, mask: `${src} center/contain no-repeat`,
  }, extra);
  return <span aria-hidden="true" style={st} />;
}

/* ========================= PRIMITIVES ========================= */
function Button(props) {
  const { variant = "solid", size = "md", icon, children, ...rest } = props;
  const cls = ["btn", `btn-${variant}`, size === "sm" && "btn-sm", size === "lg" && "btn-lg"].filter(Boolean).join(" ");
  return <button className={cls} {...rest}>{icon && <Icon name={icon} size={18} />}{children}</button>;
}
function IconButton(props) {
  const { icon, variant = "neutral", ...rest } = props;
  return <button className={`btn btn-${variant} icon-btn`} {...rest}><Icon name={icon} size={20} /></button>;
}
function Field(props) {
  const { label, optional, help, error, htmlFor, children } = props;
  return (
    <div className="field">
      {label && <label className="field-label" htmlFor={htmlFor}>{label}{optional && <span className="opt">  (optional)</span>}</label>}
      {help && !error && <span className="field-help">{help}</span>}
      {children}
      {error && <span className="field-error"><Icon name="error-circle" size={18} />{error}</span>}
    </div>
  );
}
function Input(props) { const { error, ...rest } = props; return <input className={"input" + (error ? " is-error" : "")} {...rest} />; }
function Textarea(props) { const { error, ...rest } = props; return <textarea className={"input" + (error ? " is-error" : "")} {...rest} />; }
function Checkbox(props) { const { label, ...rest } = props; return <label className="choice"><input type="checkbox" {...rest} /><span>{label}</span></label>; }
function Radio(props) { const { label, ...rest } = props; return <label className="choice"><input type="radio" {...rest} /><span>{label}</span></label>; }
function Toggle(props) {
  return <label className="toggle"><input type="checkbox" checked={props.checked} onChange={props.onChange} /><span className="track"></span></label>;
}
function Tag(props) { return <span className={"tag" + (props.grey ? " grey" : "")}>{props.children}</span>; }
function Badge(props) { return <span className={`badge ${props.tone || "info"}`}>{props.children}</span>; }
function Link(props) { const { children, ...rest } = props; return <a className="link" {...rest}>{children}</a>; }
function Avatar(props) { return <span className="avatar">{props.initials}</span>; }

/* ========================= SURFACES ========================= */
function Card(props) { return <div className={"card" + (props.shadow ? " card-shadow" : "")} style={props.style}>{props.children}</div>; }
function Tile(props) {
  return (
    <div className="tile" onClick={props.onClick}>
      {props.icon && <Icon name={props.icon} size={28} style={{ color: "var(--primary)" }} />}
      <h3 className="ogp-h3" style={{ marginTop: 12 }}>{props.title}</h3>
      <p className="ogp-small" style={{ marginTop: 4, color: "var(--body)" }}>{props.desc}</p>
    </div>
  );
}
const INFO_ICON = { info: "info-circle", success: "check-circle", warning: "warning", critical: "x-circle" };
function Infobox(props) {
  const tone = props.tone || "info";
  return <div className={`infobox ${tone}`}><Icon name={INFO_ICON[tone]} size={24} /><div>{props.children}</div></div>;
}
function Banner(props) {
  return <div className="banner"><Icon name={props.icon || "info-circle"} size={20} /><span>{props.children}</span></div>;
}
function Tabs(props) {
  return (
    <div className="tabs">
      {props.tabs.map((t) => <button key={t} className={"tab" + (t === props.value ? " active" : "")} onClick={() => props.onChange(t)}>{t}</button>)}
    </div>
  );
}
function Accordion(props) {
  const [open, setOpen] = useState(!!props.defaultOpen);
  return (
    <div className="acc">
      <button className="acc-head" onClick={() => setOpen(!open)}><span>{props.title}</span><Icon name={open ? "chevron-up" : "chevron-down"} size={22} /></button>
      {open && <div className="acc-body">{props.children}</div>}
    </div>
  );
}
function Toast(props) {
  return (
    <div className="toast">
      <Icon name="check-circle" size={20} style={{ color: "var(--success)" }} />
      <div style={{ flex: 1 }} className="ogp-body">{props.children}</div>
      {props.onClose && <span style={{ cursor: "pointer", color: "var(--muted)" }} onClick={props.onClose}><Icon name="x" size={20} /></span>}
    </div>
  );
}
function Modal(props) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 24 }} onClick={props.onClose}>
      <div className="card card-shadow" style={{ maxWidth: 480, width: "100%", background: "#fff", padding: 32 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <h2 className="ogp-h2">{props.title}</h2>
          <span style={{ cursor: "pointer", color: "var(--muted)" }} onClick={props.onClose}><Icon name="x" size={24} /></span>
        </div>
        <div className="ogp-body" style={{ marginTop: 12 }}>{props.children}</div>
        {props.footer && <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 24 }}>{props.footer}</div>}
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Button, IconButton, Field, Input, Textarea, Checkbox, Radio, Toggle, Tag, Badge, Link, Avatar, Card, Tile, Infobox, Banner, Tabs, Accordion, Toast, Modal });
