/**
 * Design Tokens — single source of truth for all colours, shadows, radii.
 * Imported by components that still need JS-level token access (inline styles / SVG).
 */
export const DS = {
  primary:"#0F4C8A", p2:"#1A6DD4", p3:"#EBF3FF", p4:"#DBEAFE",
  critical:"#C0392B", cBg:"#FDF2F1", cBd:"#FBBCB6",
  high:"#C05621",     hBg:"#FFF7ED", hBd:"#FBD38D",
  medium:"#92640A",   mBg:"#FFFBEB", mBd:"#FDE68A",
  low:"#166534",      lBg:"#F0FDF4", lBd:"#BBF7D0",
  info:"#475569",     iBg:"#F8FAFC", iBd:"#E2E8F0",
  bg:"#F1F5F9", surface:"#FFFFFF", s2:"#F8FAFC",
  bd:"#E2E8F0", bd2:"#CBD5E1",
  t1:"#0F172A", t2:"#1E293B", t3:"#475569", t4:"#94A3B8",
  side:"#0A2540", sideAct:"#1D4ED8",
  ok:"#16A34A", warn:"#D97706", purple:"#7C3AED", teal:"#0D9488",
  sh1:"0 1px 3px rgba(0,0,0,.07),0 1px 2px rgba(0,0,0,.04)",
  sh2:"0 4px 12px rgba(15,76,138,.09),0 2px 4px rgba(0,0,0,.05)",
  sh3:"0 20px 40px rgba(15,76,138,.13),0 8px 16px rgba(0,0,0,.07)",
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
