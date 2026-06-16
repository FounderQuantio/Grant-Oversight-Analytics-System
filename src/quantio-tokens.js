/**
 * Quantio Global — Shared Design Tokens (JS)
 * ─────────────────────────────────────────────
 * Drop into any React / JS codebase.
 * Import: import { QT, QS } from './quantio-tokens';
 *
 * QT  — token values (use in inline styles / style objects)
 * QS  — pre-built style objects (spread directly onto elements)
 * QSF — style factory functions that accept state (hover, active, etc.)
 */

// ─── 1. COLOUR TOKENS ────────────────────────────────────────────────────────

export const COLORS = {
  // Brand gold
  gold:           "#C9A84C",
  goldLight:      "#D4AA50",
  goldDim:        "rgba(201,168,76,0.55)",
  goldTint1:      "rgba(201,168,76,0.18)",
  goldTint2:      "rgba(201,168,76,0.12)",
  goldTint3:      "rgba(201,168,76,0.08)",
  goldBorder:     "rgba(201,168,76,0.25)",
  goldBorderH:    "rgba(201,168,76,0.45)",

  // Backgrounds
  bg:             "#141414",
  sidebar:        "#1A1A1A",
  surface:        "#1C1C1C",
  surface2:       "#242424",
  overlay:        "rgba(0,0,0,0.72)",

  // Borders
  border:         "rgba(255,255,255,0.08)",
  border2:        "rgba(255,255,255,0.13)",
  borderStrong:   "rgba(255,255,255,0.22)",

  // Text
  text1:          "#FFFFFF",
  text2:          "rgba(255,255,255,0.85)",
  text3:          "rgba(255,255,255,0.50)",
  text4:          "rgba(255,255,255,0.30)",

  // Semantic
  red:            "#EF4444", redBg:    "rgba(239,68,68,0.13)",  redBd:    "rgba(239,68,68,0.28)",
  orange:         "#F97316", orangeBg: "rgba(249,115,22,0.13)", orangeBd: "rgba(249,115,22,0.28)",
  yellow:         "#EAB308", yellowBg: "rgba(234,179,8,0.13)",  yellowBd: "rgba(234,179,8,0.28)",
  green:          "#22C55E", greenBg:  "rgba(34,197,94,0.13)",  greenBd:  "rgba(34,197,94,0.28)",
  purple:         "#A78BFA", purpleBg: "rgba(167,139,250,0.13)",purpleBd: "rgba(167,139,250,0.28)",
  teal:           "#2DD4BF", tealBg:   "rgba(45,212,191,0.13)", tealBd:   "rgba(45,212,191,0.28)",
};

// ─── 2. TYPOGRAPHY TOKENS ────────────────────────────────────────────────────

export const TYPE = {
  font:     '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontMono: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',

  // Sizes (numeric, in px — pass as fontSize in inline styles)
  xs:  9,
  sm:  11,
  base: 13,
  md:  14,
  lg:  15,
  xl:  18,
  "2xl": 22,
  "3xl": 28,
  "4xl": 36,

  // Weights
  normal: 400,
  medium: 500,
  semi:   600,
  bold:   700,
  extra:  800,
  black:  900,

  // Line heights
  tight:  1.25,
  base:   1.5,
  loose:  1.8,
};

// ─── 3. SPACING TOKENS ───────────────────────────────────────────────────────

export const SPACE = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  10: 40,
  12: 48,
  16: 64,
};

// ─── 4. SHAPE TOKENS ─────────────────────────────────────────────────────────

export const RADIUS = {
  sm:     "4px",
  md:     "8px",
  lg:     "12px",
  xl:     "14px",
  "2xl":  "20px",
  pill:   "100px",
  circle: "50%",
};

// ─── 5. SHADOW TOKENS ────────────────────────────────────────────────────────

export const SHADOW = {
  sm:   "0 1px 3px rgba(0,0,0,0.30), 0 1px 2px rgba(0,0,0,0.20)",
  md:   "0 4px 12px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.20)",
  lg:   "0 20px 48px rgba(0,0,0,0.60), 0 8px 16px rgba(0,0,0,0.30)",
  gold: "0 0 0 1px rgba(201,168,76,0.20), 0 20px 48px rgba(0,0,0,0.60)",
};

// ─── 6. MAIN TOKEN EXPORT (shorthand QT) ─────────────────────────────────────
// Usage: import { QT } from './quantio-tokens'
//        <div style={{ background: QT.surface, color: QT.text1 }}>

export const QT = {
  ...COLORS,
  ...SHADOW,
  font:   TYPE.font,
  mono:   TYPE.fontMono,
  r:      RADIUS,
  sp:     SPACE,
};


// ─── 7. PRE-BUILT STYLE OBJECTS (QS) ─────────────────────────────────────────
// Spread these directly onto elements:
// <div style={{ ...QS.card }}>

export const QS = {

  page: {
    minHeight: "100vh",
    background: COLORS.bg,
    fontFamily: TYPE.font,
    color: COLORS.text1,
    WebkitFontSmoothing: "antialiased",
  },

  // ── Nav ──────────────────────────────────────────────────────────────────
  nav: {
    height: 60,
    background: "rgba(26,26,26,0.96)",
    borderBottom: `1px solid ${COLORS.border}`,
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    gap: 16,
    position: "sticky",
    top: 0,
    zIndex: 100,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },

  navLinkInactive: {
    color: "rgba(255,255,255,0.70)",
    fontSize: 13,
    fontWeight: TYPE.medium,
    textDecoration: "none",
    padding: "7px 16px",
    borderRadius: RADIUS.pill,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    transition: "all 0.18s",
    cursor: "pointer",
  },

  navLinkActive: {
    color: COLORS.gold,
    background: COLORS.goldTint2,
    border: `1px solid ${COLORS.goldBorder}`,
  },

  // ── Sidebar ──────────────────────────────────────────────────────────────
  sidebar: {
    width: 208,
    background: COLORS.sidebar,
    borderRight: `1px solid ${COLORS.border}`,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    flexShrink: 0,
    overflow: "hidden",
  },

  sidebarHeader: {
    padding: "16px 14px 12px",
    borderBottom: `1px solid ${COLORS.border}`,
  },

  sidebarItemInactive: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    width: "100%",
    padding: "8px 10px",
    marginBottom: 1,
    border: "none",
    borderRadius: RADIUS.md,
    cursor: "pointer",
    background: "transparent",
    color: "rgba(255,255,255,0.50)",
    fontSize: 12,
    fontWeight: TYPE.normal,
    textAlign: "left",
    transition: "all 0.15s",
  },

  sidebarItemActive: {
    background: COLORS.goldTint1,
    color: COLORS.gold,
    fontWeight: TYPE.bold,
  },

  // ── Cards ─────────────────────────────────────────────────────────────────
  card: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: RADIUS.xl,
    padding: 24,
    transition: "all 0.25s",
  },

  cardHover: {
    background: COLORS.surface2,
    borderColor: "rgba(201,168,76,0.20)",
    boxShadow: SHADOW.gold,
    transform: "translateY(-4px)",
  },

  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.lg,
    background: COLORS.goldTint2,
    border: `1px solid rgba(201,168,76,0.22)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: TYPE.extra,
    color: COLORS.gold,
    flexShrink: 0,
    transition: "all 0.2s",
  },

  cardIconHover: {
    background: COLORS.goldTint1,
    borderColor: COLORS.goldBorderH,
  },

  cardArrow: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.circle,
    background: "rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    color: "rgba(255,255,255,0.22)",
    flexShrink: 0,
    transition: "all 0.22s",
  },

  cardArrowHover: {
    background: COLORS.gold,
    color: "#1A1A1A",
  },

  // ── Buttons ───────────────────────────────────────────────────────────────
  btnBase: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "9px 22px",
    borderRadius: RADIUS.pill,
    border: "none",
    cursor: "pointer",
    fontFamily: TYPE.font,
    fontSize: 13,
    fontWeight: TYPE.bold,
    letterSpacing: "0.2px",
    transition: "all 0.18s",
    whiteSpace: "nowrap",
    textDecoration: "none",
  },

  btnPrimary: {
    background: COLORS.gold,
    color: "#1A1A1A",
  },

  btnSecondary: {
    background: "rgba(255,255,255,0.06)",
    color: COLORS.text2,
    border: `1px solid ${COLORS.border2}`,
  },

  btnGhost: {
    background: "transparent",
    color: COLORS.text3,
    border: "none",
  },

  btnDanger: {
    background: COLORS.redBg,
    color: COLORS.red,
    border: `1px solid ${COLORS.redBd}`,
  },

  btnHome: {
    background: COLORS.goldTint2,
    color: COLORS.gold,
    border: `1px solid ${COLORS.goldBorder}`,
    padding: "5px 12px",
    borderRadius: RADIUS.md,
    fontSize: 12,
    fontWeight: TYPE.bold,
    cursor: "pointer",
    transition: "all 0.15s",
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    textDecoration: "none",
  },

  // ── Filter Pills ──────────────────────────────────────────────────────────
  pillInactive: {
    padding: "3px 10px",
    borderRadius: RADIUS.pill,
    border: `1px solid ${COLORS.border2}`,
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.65)",
    fontSize: 9,
    fontWeight: TYPE.bold,
    cursor: "pointer",
    transition: "all 0.15s",
  },

  pillActive: {
    background: COLORS.gold,
    color: "#1A1A1A",
    borderColor: "transparent",
  },

  // ── Inputs ────────────────────────────────────────────────────────────────
  input: {
    width: "100%",
    padding: "9px 14px",
    background: COLORS.surface,
    border: `1px solid ${COLORS.border2}`,
    borderRadius: RADIUS.md,
    color: COLORS.text1,
    fontFamily: TYPE.font,
    fontSize: 13,
    outline: "none",
    transition: "all 0.18s",
    appearance: "none",
    colorScheme: "dark",
  },

  inputFocus: {
    borderColor: COLORS.goldBorder,
    boxShadow: `0 0 0 3px ${COLORS.goldTint3}`,
  },

  // ── Tables ────────────────────────────────────────────────────────────────
  tableHead: {
    padding: "10px 14px",
    textAlign: "left",
    fontSize: 9,
    fontWeight: TYPE.bold,
    color: COLORS.text3,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    background: COLORS.surface2,
    borderBottom: `1px solid ${COLORS.border2}`,
    whiteSpace: "nowrap",
  },

  tableCell: {
    padding: "10px 14px",
    borderBottom: `1px solid ${COLORS.border}`,
    color: COLORS.text2,
    verticalAlign: "middle",
    fontSize: 13,
  },

  // ── Badges ────────────────────────────────────────────────────────────────
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "2px 8px",
    borderRadius: RADIUS.pill,
    fontSize: 9,
    fontWeight: TYPE.bold,
    whiteSpace: "nowrap",
  },

  badgeCritical: { background: COLORS.redBg,    color: COLORS.red,    border: `1px solid ${COLORS.redBd}` },
  badgeHigh:     { background: COLORS.orangeBg,  color: COLORS.orange, border: `1px solid ${COLORS.orangeBd}` },
  badgeMedium:   { background: COLORS.yellowBg,  color: COLORS.yellow, border: `1px solid ${COLORS.yellowBd}` },
  badgeLow:      { background: COLORS.greenBg,   color: COLORS.green,  border: `1px solid ${COLORS.greenBd}` },
  badgeGold:     { background: COLORS.goldTint2, color: COLORS.gold,   border: `1px solid ${COLORS.goldBorder}` },
  badgeMuted:    { background: "rgba(255,255,255,0.06)", color: COLORS.text3, border: `1px solid ${COLORS.border}` },
};


// ─── 8. STYLE FACTORIES (QSF) — for hover / active state  ──────────────────
// Usage: style={{ ...QSF.card(isHovered) }}

export const QSF = {

  card: (hover) => ({
    ...QS.card,
    ...(hover ? QS.cardHover : {}),
  }),

  cardIcon: (hover) => ({
    ...QS.cardIcon,
    ...(hover ? QS.cardIconHover : {}),
  }),

  cardArrow: (hover) => ({
    ...QS.cardArrow,
    ...(hover ? QS.cardArrowHover : {}),
  }),

  navLink: (active) => ({
    ...QS.navLinkInactive,
    ...(active ? QS.navLinkActive : {}),
  }),

  sidebarItem: (active) => ({
    ...QS.sidebarItemInactive,
    ...(active ? QS.sidebarItemActive : {}),
  }),

  pill: (active, activeStyle = {}) => ({
    ...QS.pillInactive,
    ...(active ? { ...QS.pillActive, ...activeStyle } : {}),
  }),

  input: (focused) => ({
    ...QS.input,
    ...(focused ? QS.inputFocus : {}),
  }),

  btn: (variant = "primary") => ({
    ...QS.btnBase,
    ...(QS[`btn${variant.charAt(0).toUpperCase() + variant.slice(1)}`] || QS.btnPrimary),
  }),

  btnHome: (hover) => ({
    ...QS.btnHome,
    ...(hover ? { background: COLORS.goldTint1, borderColor: COLORS.goldBorderH } : {}),
  }),
};


// ─── 9. CONVENIENCE HOOK (React) ─────────────────────────────────────────────
// Import and use in React components only:
//   import { useHover } from './quantio-tokens';
//   const [h, hProps] = useHover();
//   <div {...hProps} style={QSF.card(h)}>
//
// NOTE: Copy this function into your component file if your bundler
//       doesn't support hooks in shared utility files.

// Paste this into any React component file:
// function useHover() {
//   const [h, setH] = useState(false);
//   return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
// }
