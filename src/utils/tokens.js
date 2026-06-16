/**
 * Design Tokens — single source of truth for all colours, shadows, radii.
 * Imported by components that still need JS-level token access (inline styles / SVG).
 */
export const DS = {
  primary:"#C9A84C", p2:"#D4AA50", p3:"rgba(201,168,76,0.12)", p4:"rgba(201,168,76,0.08)",
  critical:"#EF4444", cBg:"rgba(239,68,68,0.13)",  cBd:"rgba(239,68,68,0.28)",
  high:"#F97316",     hBg:"rgba(249,115,22,0.13)", hBd:"rgba(249,115,22,0.28)",
  medium:"#EAB308",   mBg:"rgba(234,179,8,0.13)",  mBd:"rgba(234,179,8,0.28)",
  low:"#22C55E",      lBg:"rgba(34,197,94,0.13)",  lBd:"rgba(34,197,94,0.28)",
  info:"rgba(255,255,255,0.40)", iBg:"rgba(255,255,255,0.05)", iBd:"rgba(255,255,255,0.10)",
  bg:"#141414", surface:"#1C1C1C", s2:"#242424",
  bd:"rgba(255,255,255,0.08)", bd2:"rgba(255,255,255,0.13)",
  t1:"#FFFFFF", t2:"rgba(255,255,255,0.85)", t3:"rgba(255,255,255,0.50)", t4:"rgba(255,255,255,0.30)",
  side:"#1A1A1A", sideAct:"rgba(201,168,76,0.15)",
  ok:"#22C55E", warn:"#EAB308", purple:"#A78BFA", teal:"#2DD4BF",
  sh1:"0 1px 3px rgba(0,0,0,0.30),0 1px 2px rgba(0,0,0,0.20)",
  sh2:"0 4px 12px rgba(0,0,0,0.35),0 2px 4px rgba(0,0,0,0.20)",
  sh3:"0 20px 40px rgba(0,0,0,0.55),0 8px 16px rgba(0,0,0,0.30)",
  r1:"4px", r2:"8px", r3:"12px",
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
  { id:"settings",     l:"Settings",     i:"⚙", g:"sys"  },
];
