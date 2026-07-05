import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const GOLD  = "#2563EB";
const GOLD3 = "rgba(37,99,235,0.18)";

function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter:()=>setH(true), onMouseLeave:()=>setH(false) }];
}

const NAV_LINKS = ["About","Services","Platforms","Vision","Contact"];

const PLATFORMS = [
  { mono:"FG",  name:"FraudGuard™ v4.1", tag:"Transaction Intelligence",      desc:"ML-powered fraud detection — 47 GAO-aligned rules, duplicate invoices, vendor collusion, shell entities." },
  { mono:"GG",  name:"GovGuard™",         tag:"Grant Lifecycle Management",    desc:"2 CFR 200 compliance automated from pre-award to closeout. Live risk scoring and audit packages." },
  { mono:"ERP", name:"ERP Platform",      tag:"Enterprise Resource Planning",  desc:"Unified financial and operational data across your agency. Streamline procurement and budget execution." },
  { mono:"CD",  name:"Control Dashboard", tag:"Operational Controls Overview", desc:"Single pane of glass across all active controls, exceptions, and remediation workflows." },
  { mono:"ARF", name:"Audit Readiness",   tag:"Audit Preparation & Evidence",  desc:"Build audit packages automatically. Map evidence to findings and walk into every review fully prepared." },
];

/* ── Nav ─────────────────────────────────────── */
function NavA() {
  return (
    <nav style={{ background:"var(--qg-surface)", padding:"16px 32px", borderRadius:10, display:"flex", gap:8, alignItems:"center", border:"1px solid var(--qg-border)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginRight:24 }}>
        <img src="/qg-logo-gold.png" alt="logo" style={{ width:40, height:"auto" }}/>
        <div>
          <div style={{ fontSize:14, fontWeight:800, color:GOLD, letterSpacing:2.5, textTransform:"uppercase", lineHeight:1 }}>Quantio</div>
          <div style={{ fontSize:8, color:"var(--qg-text-4)", letterSpacing:3.5, textTransform:"uppercase", marginTop:2 }}>Global</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:6 }}>
        {NAV_LINKS.map(l => {
          const [h,hp] = useHover();
          return (
            <a key={l} {...hp} href="#" style={{
              color: h ? GOLD : "var(--qg-text-2)",
              fontSize:13, fontWeight:500, textDecoration:"none",
              padding:"7px 16px", borderRadius:100,
              background: h ? "rgba(37,99,235,0.10)" : "var(--qg-border)",
              border:`1px solid ${h ? "rgba(37,99,235,0.30)" : "var(--qg-border-2)"}`,
              transition:"all 0.18s",
            }}>{l}</a>
          );
        })}
      </div>
      <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
        <ThemeToggle/>
        <div style={{ background:GOLD, color:"#FFFFFF", fontSize:13, fontWeight:700, padding:"9px 22px", borderRadius:100, cursor:"pointer" }}>Enter Platform</div>
      </div>
    </nav>
  );
}

/* ── Card ────────────────────────────────────── */
function CardZ({ p }) {
  const [h,hp] = useHover();
  return (
    <div {...hp} style={{
      background: h ? "var(--qg-surface-2)" : "var(--qg-surface)",
      borderRadius:14, padding:"26px 24px",
      border:`1px solid ${h ? "rgba(37,99,235,0.25)" : "var(--qg-border)"}`,
      display:"flex", flexDirection:"column", gap:14, cursor:"pointer",
      transform:h?"translateY(-4px)":"translateY(0)",
      transition:"all 0.25s",
      boxShadow: h ? "var(--qg-shadow-gold)" : "none",
    }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{
            width:44, height:44, borderRadius:10, flexShrink:0,
            background: h ? "rgba(37,99,235,0.18)" : "rgba(37,99,235,0.10)",
            border:`1px solid ${h?"rgba(37,99,235,0.45)":"rgba(37,99,235,0.22)"}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:p.mono.length>2?10:12, fontWeight:800, color:GOLD,
            transition:"all 0.2s",
          }}>{p.mono}</div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:"var(--qg-text-1)" }}>{p.name}</div>
            <div style={{ fontSize:10, color:GOLD, fontWeight:600, letterSpacing:0.4, marginTop:1 }}>{p.tag}</div>
          </div>
        </div>
        <div style={{
          width:34, height:34, borderRadius:"50%", flexShrink:0,
          background: h ? GOLD : "var(--qg-border)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:15, color: h ? "#FFFFFF" : "var(--qg-text-3)",
          transition:"all 0.22s",
        }}>↗</div>
      </div>
      <p style={{ fontSize:12.5, color:"var(--qg-text-3)", lineHeight:1.82, margin:0, flex:1 }}>{p.desc}</p>
      <div style={{ fontSize:11, fontWeight:700, color:GOLD, letterSpacing:0.9, textTransform:"uppercase", opacity:h?1:0.38, transition:"opacity 0.2s" }}>
        Open Platform →
      </div>
    </div>
  );
}

/* ── Row ─────────────────────────────────────── */
function PlatformRow({ p, i }) {
  const [h,hp] = useHover();
  return (
    <div {...hp} style={{
      display:"flex", alignItems:"center", gap:20,
      padding:"20px 24px", cursor:"pointer",
      background: h ? "var(--qg-surface-2)" : "transparent",
      borderRadius:12,
      borderBottom: i < 4 ? "1px solid var(--qg-border)" : "none",
      transition:"all 0.2s",
    }}>
      <div style={{ fontSize:12, fontWeight:700, color:"var(--qg-text-4)", width:20, flexShrink:0, textAlign:"right" }}>0{i+1}</div>
      <div style={{
        width:40, height:40, borderRadius:9, flexShrink:0,
        background: h ? GOLD3 : "rgba(37,99,235,0.08)",
        border:`1px solid ${h ? "rgba(37,99,235,0.40)" : "rgba(37,99,235,0.18)"}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:p.mono.length>2?9:11, fontWeight:800, color:GOLD,
        transition:"all 0.2s",
      }}>{p.mono}</div>
      <div style={{ width:210, flexShrink:0 }}>
        <div style={{ fontSize:14, fontWeight:700, color:h?"var(--qg-text-1)":"var(--qg-text-2)" }}>{p.name}</div>
        <div style={{ fontSize:10, color:GOLD, fontWeight:600, letterSpacing:0.4, marginTop:2 }}>{p.tag}</div>
      </div>
      <div style={{ width:1, height:32, background:"var(--qg-border-2)", flexShrink:0 }}/>
      <p style={{ fontSize:12.5, color:"var(--qg-text-3)", lineHeight:1.7, margin:0, flex:1 }}>{p.desc}</p>
      <div style={{
        flexShrink:0, padding:"9px 20px", borderRadius:8,
        border:`1px solid ${h ? GOLD : "rgba(37,99,235,0.25)"}`,
        background: h ? GOLD3 : "transparent",
        color:GOLD, fontSize:12, fontWeight:700, letterSpacing:0.5,
        whiteSpace:"nowrap", transition:"all 0.2s",
        display:"flex", alignItems:"center", gap:8,
      }}>
        Open Platform
        <span style={{ transform:h?"translateX(3px)":"translateX(0)", transition:"transform 0.2s", display:"inline-block" }}>→</span>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────── */
export default function QuantioLandingPreview() {
  const SectionLabel = ({ text, note }) => (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
      <div style={{ background:GOLD, color:"#FFFFFF", fontSize:10, fontWeight:800, letterSpacing:2, padding:"4px 12px", borderRadius:4, textTransform:"uppercase" }}>{text}</div>
      {note && <span style={{ color:"var(--qg-text-3)", fontSize:12 }}>{note}</span>}
    </div>
  );

  return (
    <div style={{ background:"var(--qg-bg)", minHeight:"100vh", fontFamily:"Inter,-apple-system,sans-serif", padding:"52px 0 80px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 44px" }}>

        <div style={{ marginBottom:52 }}>
          <h1 style={{ color:"var(--qg-text-1)", fontSize:26, fontWeight:700, margin:"0 0 6px" }}>Nav A + Card Z — Unified Gold</h1>
          <p style={{ color:"var(--qg-text-3)", fontSize:13, margin:0 }}>All accent colors replaced with single brand gold · Two layout options for the platforms section</p>
        </div>

        <div style={{ marginBottom:56 }}>
          <SectionLabel text="Nav A" note="Pill buttons · single gold accent · hover to interact"/>
          <NavA/>
        </div>

        <div style={{ marginBottom:56 }}>
          <SectionLabel text="Layout Option 1 — Grid" note="3 + 2 card grid · all gold · Card Z style"/>
          <div style={{ background:"var(--qg-surface-2)", borderRadius:16, padding:"40px 32px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18, marginBottom:18 }}>
              {PLATFORMS.slice(0,3).map(p => <CardZ key={p.name} p={p}/>)}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18, maxWidth:660, margin:"0 auto" }}>
              {PLATFORMS.slice(3).map(p => <CardZ key={p.name} p={p}/>)}
            </div>
          </div>
        </div>

        <div style={{ marginBottom:40 }}>
          <SectionLabel text="Layout Option 2 — Line by Line" note="All 5 tools in rows · scannable · compact"/>
          <div style={{ background:"var(--qg-surface-2)", borderRadius:16, padding:"16px 16px" }}>
            {PLATFORMS.map((p,i) => <PlatformRow key={p.name} p={p} i={i}/>)}
          </div>
        </div>

        <div style={{ background:"rgba(37,99,235,0.08)", border:"1px solid rgba(37,99,235,0.22)", borderRadius:8, padding:"16px 24px" }}>
          <div style={{ color:GOLD, fontSize:13, fontWeight:700, marginBottom:6 }}>Which layout do you prefer?</div>
          <div style={{ color:"var(--qg-text-3)", fontSize:12, lineHeight:1.8 }}>
            <strong style={{ color:"var(--qg-text-2)" }}>Grid (Option 1)</strong> — visual, card-based, each tool gets breathing room.<br/>
            <strong style={{ color:"var(--qg-text-2)" }}>Line by Line (Option 2)</strong> — all 5 tools visible at once, scannable like a product table.<br/>
            Or say <strong style={{ color:GOLD }}>"combine both"</strong> — show the list first, then expand to cards.
          </div>
        </div>

      </div>
    </div>
  );
}
