import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

/* ── Soft Cool + Blue Design Tokens ──────────────────────────────── */
const T = {
  primary:   "#212427",
  primaryDk: "#212427",
  hero:      "linear-gradient(135deg, #F4F5F7 0%, #EEF1F4 60%, #F4F5F7 100%)",
  accent:    "#3D5A99",
  accentLt:  "#2F4677",
  secondary:   "#0D9488",
  secondaryDk: "#0F766E",
  surface:   "#F4F5F7",
  white:     "#FFFFFF",
  muted:     "#6B6B6B",
  border:    "#E4E7EB",
  valueBg:   "#EEF1F4",
  visionBg:  "#F4F5F7",
  ctaBg:     "#1F3A5F",
  ctaText:   "#FFFFFF",
  footerBg:  "#F4F5F7",
};

const wrap = { maxWidth: 1200, margin: "0 auto", padding: "0 40px" };
const sectionLabel = {
  fontSize: 11, fontWeight: 700, letterSpacing: 2,
  textTransform: "uppercase", color: T.accent, marginBottom: 12,
};

function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

/* ── Buttons ───────────────────────────────────────────────────────── */
function BtnPrimary({ children, onClick }) {
  const [h, hProps] = useHover();
  return (
    <button onClick={onClick} {...hProps} style={{
      padding: "14px 32px", borderRadius: 8, border: "none", cursor: "pointer",
      background: h ? T.accentLt : T.accent,
      color: T.ctaText, fontSize: 14, fontWeight: 700, letterSpacing: 0.3,
      boxShadow: h
        ? `0 0 0 4px rgba(61,90,153,0.25), 0 4px 16px rgba(61,90,153,0.4)`
        : `0 2px 8px rgba(61,90,153,0.35)`,
      transform: h ? "scale(1.03)" : "scale(1)",
      transition: "all 0.2s ease",
    }}>{children}</button>
  );
}

function BtnOutline({ children }) {
  const [h, hProps] = useHover();
  return (
    <button {...hProps} style={{
      padding: "14px 32px", borderRadius: 8, border: "none", cursor: "pointer",
      background: h ? T.secondaryDk : T.secondary,
      color: "#FFFFFF",
      fontSize: 14, fontWeight: 600, letterSpacing: 0.3,
      transform: h ? "scale(1.03)" : "scale(1)",
      transition: "all 0.2s ease",
    }}>{children}</button>
  );
}

/* ── Navbar ────────────────────────────────────────────────────────── */
function Nav({ onEnterApp }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollToPlatforms = () => {
    document.getElementById("platforms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      background: "#1F3A5F",
      borderBottom: "1px solid rgba(255,255,255,0.10)",
      transition: "all 0.3s ease", padding: "18px 0",
    }}>
      <div style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/qg-logo-gold.png" alt="Quantio Global" style={{ width: 46, height: "auto" }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#FFFFFF", letterSpacing: 2.5, textTransform: "uppercase", lineHeight: 1 }}>Quantio</div>
            <div style={{ fontSize: 9, fontWeight: 400, color: "rgba(255,255,255,0.55)", letterSpacing: 3.5, textTransform: "uppercase", marginTop: 2 }}>Global</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {["About", "Services", "Platforms", "Vision", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500,
              textDecoration: "none", padding: "7px 16px", borderRadius: 100,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              transition: "all 0.18s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.background = "rgba(61,90,153,0.35)";
                e.currentTarget.style.borderColor = "rgba(61,90,153,0.55)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              }}
            >{l}</a>
          ))}
          <div style={{ marginLeft: 8 }}>
            <BtnPrimary onClick={scrollToPlatforms}>Enter Platform</BtnPrimary>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero Graphic ──────────────────────────────────────────────────── */
function HeroGraphic() {
  return (
    <svg viewBox="0 0 480 400" fill="none" style={{ width: "100%", maxWidth: 480, opacity: 0.9 }}>
      {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="40" y1={60+i*70} x2="440" y2={60+i*70} stroke="rgba(33,36,39,0.04)" strokeWidth="1"/>)}
      {[0,1,2,3,4,5].map(i => <line key={`v${i}`} x1={40+i*80} y1="40" x2={40+i*80} y2="360" stroke="rgba(33,36,39,0.04)" strokeWidth="1"/>)}
      {[[240,180,22],[120,100,14],[360,120,16],[160,280,12],[340,270,18],[440,200,10],[80,220,10],[290,90,10]].map(([cx,cy,r],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r+7} fill="rgba(61,90,153,0.07)"/>
          <circle cx={cx} cy={cy} r={r} fill={i===0 ? T.accent : `rgba(61,90,153,${0.2+i*0.07})`}/>
        </g>
      ))}
      {[[240,180,120,100],[240,180,360,120],[240,180,160,280],[240,180,340,270],[120,100,80,220],[360,120,440,200],[360,120,290,90],[340,270,440,200]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(61,90,153,0.2)" strokeWidth="1.5"/>
      ))}
      <circle cx="240" cy="180" r="38" stroke="rgba(61,90,153,0.22)" strokeWidth="1.5" strokeDasharray="6 4"/>
      <circle cx="240" cy="180" r="56" stroke="rgba(61,90,153,0.09)" strokeWidth="1" strokeDasharray="4 6"/>
      {[0.4,0.65,0.85,0.55,0.9].map((h,i) => (
        <rect key={i} x={310+i*22} y={320-h*60} width={14} height={h*60} rx="3" fill={`rgba(61,90,153,${0.25+i*0.14})`}/>
      ))}
      <text x="310" y="335" fill="rgba(33,36,39,0.2)" fontSize="9" fontFamily="monospace">RISK SCORE</text>
      <text x="100" y="94"  fill="rgba(33,36,39,0.35)" fontSize="9" fontFamily="monospace">GOV</text>
      <text x="346" y="114" fill="rgba(33,36,39,0.35)" fontSize="9" fontFamily="monospace">FIN</text>
      <text x="143" y="276" fill="rgba(33,36,39,0.35)" fontSize="9" fontFamily="monospace">RISK</text>
      <text x="325" y="265" fill="rgba(33,36,39,0.35)" fontSize="9" fontFamily="monospace">ADV</text>
    </svg>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────── */
function Hero({ onEnterApp }) {
  return (
    <section style={{ background: T.hero, minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 80px" }}>
      <div style={{ ...wrap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{ ...sectionLabel, marginBottom: 20 }}>
            Finance Governance · Risk Management · Digital Transformation
          </div>
          <h1 style={{ fontFamily: "var(--qg-font-display)", fontSize: 54, fontWeight: 700, color: "#212427", lineHeight: 1.12, margin: "0 0 24px", letterSpacing: -1.5 }}>
            Governing Capital.<br/>
            <span style={{ color: T.accent }}>Engineering</span> Trust.<br/>
            Transforming Finance.
          </h1>
          <p style={{ fontSize: 17, color: "rgba(33,36,39,0.65)", lineHeight: 1.82, margin: "0 0 40px", maxWidth: 480 }}>
            Quantio Global delivers finance governance, risk intelligence, and digital
            transformation advisory to financial institutions, corporations, and
            governments — at scale, with precision.
          </p>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <BtnPrimary onClick={() => document.getElementById("platforms")?.scrollIntoView({ behavior: "smooth" })}>Enter Platform</BtnPrimary>
            <BtnOutline>Explore Services →</BtnOutline>
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 56, paddingTop: 32, borderTop: "1px solid rgba(33,36,39,0.08)" }}>
            {[["$1.8T+","Federal capital governed"],["15+ yrs","Senior advisory"],["3","Continents served"]].map(([v,l]) => (
              <div key={v}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#212427" }}>{v}</div>
                <div style={{ fontSize: 11, color: "rgba(33,36,39,0.4)", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <HeroGraphic />
        </div>
      </div>
    </section>
  );
}

/* ── About ─────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{ background: T.white, padding: "100px 0" }}>
      <div style={{ ...wrap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <p style={sectionLabel}>ABOUT QUANTIO GLOBAL</p>
          <h2 style={{ fontFamily: "var(--qg-font-display)", fontSize: 40, fontWeight: 700, color: T.primary, lineHeight: 1.2, margin: "0 0 24px", letterSpacing: -0.8 }}>
            Built for Complexity.<br/>Designed for Impact.
          </h2>
          <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.88, margin: "0 0 20px" }}>
            Quantio Global is a premier advisory firm operating at the intersection of financial
            governance, regulatory intelligence, and digital transformation. We serve CFOs, CROs,
            and government executives who cannot afford ambiguity — where decisions carry
            systemic consequence.
          </p>
          <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.88, margin: 0 }}>
            Our work spans financial institutions, multinational corporates, and public-sector
            bodies across emerging and established markets. Senior expertise, independent
            judgment, and measurable outcomes — every engagement.
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg viewBox="0 0 320 320" width="300" height="300" fill="none">
            <rect x="40" y="40" width="100" height="100" rx="12" fill="rgba(26,26,26,0.05)" stroke={T.primary} strokeWidth="1.5"/>
            <rect x="180" y="40" width="100" height="100" rx="12" fill="rgba(61,90,153,0.1)" stroke={T.accent} strokeWidth="1.5"/>
            <rect x="40" y="180" width="100" height="100" rx="12" fill="rgba(61,90,153,0.1)" stroke={T.accent} strokeWidth="1.5"/>
            <rect x="180" y="180" width="100" height="100" rx="12" fill="rgba(26,26,26,0.05)" stroke={T.primary} strokeWidth="1.5"/>
            <text x="90" y="97" textAnchor="middle" fontSize="11" fill={T.primary} fontWeight="600">GOVERN</text>
            <text x="230" y="97" textAnchor="middle" fontSize="11" fill={T.accent} fontWeight="600">RISK</text>
            <text x="90" y="237" textAnchor="middle" fontSize="11" fill={T.accent} fontWeight="600">DIGITAL</text>
            <text x="230" y="237" textAnchor="middle" fontSize="11" fill={T.primary} fontWeight="600">ADVISORY</text>
            <line x1="140" y1="90" x2="180" y2="90" stroke={T.border} strokeWidth="1.5" strokeDasharray="4 3"/>
            <line x1="140" y1="230" x2="180" y2="230" stroke={T.border} strokeWidth="1.5" strokeDasharray="4 3"/>
            <line x1="90" y1="140" x2="90" y2="180" stroke={T.border} strokeWidth="1.5" strokeDasharray="4 3"/>
            <line x1="230" y1="140" x2="230" y2="180" stroke={T.border} strokeWidth="1.5" strokeDasharray="4 3"/>
            <circle cx="160" cy="160" r="18" fill={T.accent}/>
            <text x="160" y="165" textAnchor="middle" fontSize="13" fill={T.ctaText} fontWeight="900">Q</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ── Services ──────────────────────────────────────────────────────── */
const SERVICES = [
  { icon:"⚖", title:"Financial Governance & Compliance",  desc:"Designing the frameworks that make financial systems trustworthy — from OMB 2 CFR 200 compliance to internal control architecture and audit readiness." },
  { icon:"📊", title:"Risk Management & Controls",         desc:"Quantifying exposure, engineering controls, and embedding risk intelligence into operations — so your organization acts before risk becomes loss." },
  { icon:"⚡", title:"Digital Finance Transformation",     desc:"Modernizing legacy financial infrastructure through AI-enabled automation, data architecture, and compliance platforms built for government-grade security." },
  { icon:"🌐", title:"Strategic Advisory",                 desc:"Senior counsel to executives navigating transformation, M&A integration, regulatory change, and cross-border expansion. Independent. Confidential." },
];

function ServiceCard({ s }) {
  const [h, hProps] = useHover();
  return (
    <div {...hProps} style={{
      background: T.white, border: `1px solid ${T.border}`,
      borderRadius: 12, padding: "36px 28px",
      borderTop: `3px solid ${T.accent}`,
      boxShadow: h ? "0 16px 48px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
      transform: h ? "translateY(-5px)" : "translateY(0)",
      transition: "all 0.25s ease",
    }}>
      <div style={{ fontSize: 30, marginBottom: 18 }}>{s.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: T.primary, margin: "0 0 12px", lineHeight: 1.3 }}>{s.title}</h3>
      <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.82, margin: 0 }}>{s.desc}</p>
    </div>
  );
}

function Services() {
  return (
    <section id="services" style={{ background: T.surface, padding: "100px 0" }}>
      <div style={wrap}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>WHAT WE DO</p>
          <h2 style={{ fontFamily: "var(--qg-font-display)", fontSize: 40, fontWeight: 700, color: T.primary, margin: "0 auto", maxWidth: 560, lineHeight: 1.2, letterSpacing: -0.8 }}>
            Precision Advisory.<br/>Across Every Dimension of Finance.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {SERVICES.map(s => <ServiceCard key={s.title} s={s}/>)}
        </div>
      </div>
    </section>
  );
}

/* ── Platforms ─────────────────────────────────────────────────────── */
const PLATFORMS = [
  {
    mono: "FG", name: "FraudGuard™ v4.1",
    tag:  "Transaction Intelligence",
    desc: "ML-powered fraud detection — duplicate invoices, vendor collusion, shell entities, and 47 GAO-aligned rules. Stop fraud before funds leave the door.",
    internal: true,
  },
  {
    mono: "GG", name: "GovGuard™",
    tag:  "Grant Lifecycle Management",
    desc: "From pre-award to closeout, every 2 CFR 200 compliance checkpoint automated. Live risk scoring, corrective action plans, and audit packages built as you work.",
    url:  "https://grant-management-saas-git-main-founderquantios-projects.vercel.app",
  },
  {
    mono: "ERP", name: "ERP Platform",
    tag:  "Enterprise Resource Planning",
    desc: "Unified financial and operational data across your agency. Streamline procurement, budget execution, and reporting in one integrated government-grade platform.",
    url:  "https://erp-framework.vercel.app",
  },
  {
    mono: "CD", name: "Control Dashboard",
    tag:  "Operational Controls Overview",
    desc: "A single pane of glass across all active controls, exceptions, and remediation workflows. Know your control environment status before the auditor does.",
    url:  "https://icm-dashboard.vercel.app",
  },
  {
    mono: "ARF", name: "Audit Readiness",
    tag:  "Audit Preparation & Evidence",
    desc: "Build audit packages automatically as work happens. Map evidence to findings, track remediation, and walk into every review with documentation already done.",
    url:  "https://audit-readiness.vercel.app",
  },
];

function PlatformCard({ p, onEnterFraudGuard }) {
  const [h, hProps] = useHover();
  const handleClick = () => {
    if (p.internal) { onEnterFraudGuard(); return; }
    if (p.url) window.open(p.url, "_blank", "noopener,noreferrer");
  };
  return (
    <div {...hProps} onClick={handleClick} style={{
      background: h ? "rgba(61,90,153,0.05)" : "#FFFFFF",
      border: `1px solid ${h ? "rgba(61,90,153,0.20)" : "rgba(33,36,39,0.06)"}`,
      borderRadius: 14, padding: "26px 24px",
      display: "flex", flexDirection: "column", gap: 14,
      cursor: "pointer",
      boxShadow: h ? "0 0 0 1px rgba(61,90,153,0.13), 0 12px 32px rgba(33,36,39,0.12)" : "none",
      transform: h ? "translateY(-4px)" : "translateY(0)",
      transition: "all 0.25s",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, flexShrink: 0,
            background: h ? "rgba(61,90,153,0.18)" : "rgba(61,90,153,0.10)",
            border: `1px solid ${h ? "rgba(61,90,153,0.45)" : "rgba(61,90,153,0.22)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: p.mono.length > 2 ? 10 : 12, fontWeight: 800,
            color: T.accent, transition: "all 0.2s",
          }}>{p.mono}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#212427" }}>{p.name}</div>
            <div style={{ fontSize: 10, color: T.accent, fontWeight: 600, letterSpacing: 0.4, marginTop: 1 }}>{p.tag}</div>
          </div>
        </div>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
          background: h ? T.accent : "rgba(33,36,39,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, color: h ? "#FFFFFF" : "rgba(33,36,39,0.22)",
          transition: "all 0.22s",
        }}>↗</div>
      </div>
      <p style={{ fontSize: 12.5, color: "rgba(33,36,39,0.45)", lineHeight: 1.82, margin: 0, flex: 1 }}>{p.desc}</p>
      <div style={{
        fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: 0.9,
        opacity: h ? 1 : 0.38, transition: "opacity 0.2s",
        textTransform: "uppercase",
      }}>Open Platform →</div>
    </div>
  );
}

function Platforms({ onEnterFraudGuard }) {
  return (
    <section id="platforms" style={{ background: "#F4F5F7", padding: "100px 0" }}>
      <div style={wrap}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>OUR PLATFORMS</p>
          <h2 style={{ fontFamily: "var(--qg-font-display)", fontSize: 40, fontWeight: 700, color: "#212427", margin: "0 auto", maxWidth: 600, lineHeight: 1.2, letterSpacing: -0.8 }}>
            Five Integrated Tools.<br/>One Compliance Ecosystem.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(33,36,39,0.45)", margin: "20px auto 0", maxWidth: 520, lineHeight: 1.75 }}>
            The Quantio Global Compliance Suite — purpose-built for federal grant management,
            financial governance, and enterprise risk control.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {PLATFORMS.slice(0, 3).map(p => <PlatformCard key={p.name} p={p} onEnterFraudGuard={onEnterFraudGuard}/>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 20, maxWidth: 820, margin: "20px auto 0" }}>
          {PLATFORMS.slice(3).map(p => <PlatformCard key={p.name} p={p} onEnterFraudGuard={onEnterFraudGuard}/>)}
        </div>
      </div>
    </section>
  );
}

/* ── Value Prop ────────────────────────────────────────────────────── */
function ValueProp() {
  return (
    <section style={{ background: T.valueBg, padding: "100px 0" }}>
      <div style={{ ...wrap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <p style={sectionLabel}>WHY QUANTIO GLOBAL</p>
          <h2 style={{ fontFamily: "var(--qg-font-display)", fontSize: 40, fontWeight: 700, color: "#212427", margin: 0, lineHeight: 1.2, letterSpacing: -0.8 }}>
            Why Global Executives<br/>Choose Quantio
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {[
            ["Independence","No conflicts. No product sales. Pure advisory."],
            ["Intelligence","Every engagement backed by proprietary analytical frameworks and AI-enabled tooling."],
            ["Scale","From single-entity governance reviews to multi-jurisdiction transformation programs."],
            ["Accountability","We measure impact in dollars protected, controls strengthened, and systems transformed."],
          ].map(([title, body]) => (
            <div key={title} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, marginTop: 9, flexShrink: 0 }}/>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#212427", marginBottom: 5 }}>{title}</div>
                <div style={{ fontSize: 14, color: "rgba(33,36,39,0.5)", lineHeight: 1.75 }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Vision ────────────────────────────────────────────────────────── */
function Vision() {
  return (
    <section id="vision" style={{ background: T.visionBg, padding: "120px 0" }}>
      <div style={{ ...wrap, textAlign: "center" }}>
        <p style={{ ...sectionLabel, textAlign: "center", marginBottom: 24 }}>OUR VISION</p>
        <blockquote style={{
          fontFamily: "var(--qg-font-display)", fontSize: 36, fontWeight: 600, color: "#212427",
          lineHeight: 1.55, margin: "0 auto 28px",
          maxWidth: 820, fontStyle: "italic", letterSpacing: -0.5,
        }}>
          "A world where every dollar of public and institutional capital is governed
          with intelligence, transparency, and accountability."
        </blockquote>
        <p style={{ fontSize: 13, color: T.accent, fontWeight: 700, letterSpacing: 2, margin: 0 }}>— QUANTIO GLOBAL</p>
      </div>
    </section>
  );
}

/* ── Mission ───────────────────────────────────────────────────────── */
function Mission() {
  return (
    <section style={{ background: T.white, padding: "100px 0" }}>
      <div style={wrap}>
        <div style={{ borderLeft: `4px solid ${T.accent}`, paddingLeft: 40, maxWidth: 800, margin: "0 auto" }}>
          <p style={sectionLabel}>OUR MISSION</p>
          <h2 style={{ fontFamily: "var(--qg-font-display)", fontSize: 32, fontWeight: 700, color: T.primary, margin: "0 0 20px", lineHeight: 1.3, letterSpacing: -0.5 }}>
            Strengthening the Systems That Govern Capital.
          </h2>
          <p style={{ fontSize: 17, color: T.muted, lineHeight: 1.88, margin: "0 0 18px" }}>
            To strengthen the governance systems that underpin financial institutions and
            governments — enabling measurable transformation through technology, expertise,
            and independent judgment.
          </p>
          <p style={{ fontSize: 17, color: T.muted, lineHeight: 1.88, margin: 0 }}>
            We exist to make financial systems more resilient, more transparent, and more
            accountable — at every scale of operation.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ───────────────────────────────────────────────────────────── */
function CTA({ onEnterApp }) {
  return (
    <section id="contact" style={{ background: T.ctaBg, padding: "100px 0" }}>
      <div style={{ ...wrap, textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--qg-font-display)", fontSize: 44, fontWeight: 700, color: T.ctaText, margin: "0 0 20px", lineHeight: 1.2, letterSpacing: -0.8 }}>
          Ready to Elevate Your<br/>Governance Standard?
        </h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", margin: "0 auto 48px", maxWidth: 540, lineHeight: 1.8 }}>
          Whether navigating regulatory change, modernizing financial infrastructure, or
          building controls that last — Quantio Global is your strategic partner.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button onClick={onEnterApp} style={{ padding: "16px 36px", borderRadius: 8, border: "none", cursor: "pointer", background: "#FFFFFF", color: T.accent, fontSize: 15, fontWeight: 700, letterSpacing: 0.2 }}>
            Partner With Us
          </button>
          <button style={{ padding: "16px 36px", borderRadius: 8, cursor: "pointer", background: "transparent", border: "2px solid rgba(255,255,255,0.35)", color: T.ctaText, fontSize: 15, fontWeight: 600 }}>
            Schedule a Consultation →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: T.footerBg, padding: "52px 0" }}>
      <div style={{ ...wrap, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <img src="/qg-logo-gold.png" alt="Quantio Global" style={{ width: 38, height: "auto" }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#212427", letterSpacing: 2.5, textTransform: "uppercase", lineHeight: 1 }}>Quantio</div>
              <div style={{ fontSize: 8, fontWeight: 400, color: "rgba(33,36,39,0.4)", letterSpacing: 3.5, textTransform: "uppercase", marginTop: 2 }}>Global</div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "rgba(33,36,39,0.3)", margin: 0 }}>Finance Governance · Risk Management · Digital Transformation</p>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {["About","Services","Contact","Privacy"].map(l => (
            <a key={l} href="#" style={{ fontSize: 13, color: "rgba(33,36,39,0.4)", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "#212427"}
              onMouseLeave={e => e.target.style.color = "rgba(33,36,39,0.4)"}
            >{l}</a>
          ))}
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 13, color: "rgba(33,36,39,0.4)", margin: 0 }}>contact@quantioglobal.net</p>
          <p style={{ fontSize: 11, color: "rgba(33,36,39,0.2)", margin: "6px 0 0" }}>© 2026 Quantio Global. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */
export default function HomePage({ onEnterFraudGuard }) {
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <Nav onEnterApp={onEnterFraudGuard}/>
      <Hero onEnterApp={onEnterFraudGuard}/>
      <About/>
      <Services/>
      <Platforms onEnterFraudGuard={onEnterFraudGuard}/>
      <ValueProp/>
      <Vision/>
      <Mission/>
      <CTA onEnterApp={onEnterFraudGuard}/>
      <Footer/>
    </div>
  );
}
