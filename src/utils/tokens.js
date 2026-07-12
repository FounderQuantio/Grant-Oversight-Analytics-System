/**
 * Design Tokens — all colour values reference CSS custom properties so they
 * automatically respond to the [data-theme] attribute on <html>.
 */
export const DS = {
  primary:"var(--qg-gold)", p2:"var(--qg-gold-light)", p3:"var(--qg-gold-tint-2)", p4:"var(--qg-gold-tint-3)",
  critical:"var(--qg-red)",  cBg:"var(--qg-red-bg)",    cBd:"var(--qg-red-border)",
  high:"var(--qg-orange)",   hBg:"var(--qg-orange-bg)", hBd:"var(--qg-orange-border)",
  medium:"var(--qg-yellow)", mBg:"var(--qg-yellow-bg)", mBd:"var(--qg-yellow-border)",
  low:"var(--qg-green)",     lBg:"var(--qg-green-bg)",  lBd:"var(--qg-green-border)",
  info:"var(--qg-info)",     iBg:"var(--qg-info-bg)",   iBd:"var(--qg-info-border)",
  bg:"var(--qg-bg)", surface:"var(--qg-surface)", s2:"var(--qg-surface-2)",
  bd:"var(--qg-border)", bd2:"var(--qg-border-2)",
  t1:"var(--qg-text-1)", t2:"var(--qg-text-2)", t3:"var(--qg-text-3)", t4:"var(--qg-text-4)",
  side:"var(--qg-sidebar)", sideAct:"var(--qg-gold-tint-1)",
  ok:"var(--qg-green)", warn:"var(--qg-yellow)", purple:"var(--qg-purple)", teal:"var(--qg-teal)",
  sh1:"var(--qg-shadow-sm)", sh2:"var(--qg-shadow-md)", sh3:"var(--qg-shadow-lg)",
  r1:"var(--qg-radius-sm)", r2:"var(--qg-radius-md)", r3:"var(--qg-radius-lg)",
};

/** Risk level colour/badge maps keyed by severity string */
export const RM = {
  CRITICAL:     { color:DS.critical, bg:DS.cBg, bd:DS.cBd, dot:"#EF4444" },
  HIGH:         { color:DS.high,     bg:DS.hBg, bd:DS.hBd, dot:"#F97316" },
  MEDIUM:       { color:DS.medium,   bg:DS.mBg, bd:DS.mBd, dot:"#EAB308" },
  LOW:          { color:DS.low,      bg:DS.lBg, bd:DS.lBd, dot:"#22C55E" },
  INFORMATIONAL:{ color:DS.info,     bg:DS.iBg, bd:DS.iBd, dot:DS.t4    },
};

/** Severity sort order (lower = higher priority) */
export const SEV_O = { CRITICAL:0, HIGH:1, MEDIUM:2, LOW:3, INFORMATIONAL:4 };

/** Alert risk points by severity */
export const SEV_P = { CRITICAL:40, HIGH:25, MEDIUM:15, LOW:5 };

/** Case status colours */
export const CS_C = {
  OPEN:DS.critical, IN_REVIEW:DS.high,
  ESCALATED:DS.purple, RESOLVED:DS.ok, CLOSED:DS.info,
};
export const CS_ST = ["OPEN","IN_REVIEW","ESCALATED","RESOLVED","CLOSED"];

/** Role-based access control definitions */
export const ROLES = {
  admin:        { label:"System Admin",       icon:"🛡", color:"#7C3AED", views:["overview","alerts","transactions","cases","compliance","settings"], canClose:true,  canRules:true,  seeAll:true  },
  compliance:   { label:"Compliance Officer", icon:"👤", color:"#1D4ED8", views:["overview","alerts","transactions","cases","compliance"],             canClose:true,  canRules:false, seeAll:true  },
  investigator: { label:"Investigator",       icon:"🔍", color:"#0D9488", views:["overview","alerts","transactions","cases"],                          canClose:false, canRules:false, seeAll:false },
  auditor:      { label:"External Auditor",   icon:"📋", color:"#92640A", views:["overview","compliance"],                                             canClose:false, canRules:false, seeAll:false },
};

/** Sidebar navigation config */
export const NAV = [
  { id:"overview",     l:"Overview",     i:"▦", g:"main" },
  { id:"alerts",       l:"Alert Queue",  i:"⚠", g:"main", badge:"alerts" },
  { id:"transactions", l:"Transactions", i:"≡", g:"main" },
  { id:"cases",        l:"Cases",        i:"📁", g:"main", badge:"cases"  },
  { id:"compliance",   l:"Compliance",   i:"✓", g:"main" },
  { id:"glance",       l:"At a Glance",  i:"📋", g:"sys"  },
  { id:"settings",     l:"Settings",     i:"⚙", g:"sys"  },
];
