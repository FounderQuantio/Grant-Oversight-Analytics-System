import { DS } from "@/utils/tokens";

const GOVGUARD_URL = "https://grant-management-saas-git-main-founderquantios-projects.vercel.app";

const STATS = [
  { value: "$1.8T", label: "Federal grants disbursed annually",   color: DS.p2     },
  { value: "7–10%", label: "Estimated lost to fraud & waste",     color: "#EF4444" },
  { value: "340+",  label: "OMB compliance controls automated",   color: "#10B981" },
  { value: "72hrs", label: "Avg. detection time — done manually", color: "#F59E0B" },
];

const PRODUCTS = [
  {
    mono: "FG",
    name: "Fraud Guard",
    tag: "Transaction Intelligence",
    pitch: "Stop fraud before funds leave the door. ML-powered screening catches duplicate invoices, vendor collusion, and shell entities in real time — not after an OIG audit.",
    cta: "Enter Fraud Guard",
    accent: DS.p2,
    internal: true,
  },
  {
    mono: "GG",
    name: "Gov Guard",
    tag: "Grant Lifecycle Management",
    pitch: "From pre-award to closeout, every compliance checkpoint covered. Automated 2 CFR 200 controls, live risk scoring, and audit packages built as you work.",
    cta: "Enter Gov Guard",
    accent: "#6366F1",
    url: GOVGUARD_URL,
  },
  {
    mono: "ERP",
    name: "ERP",
    tag: "Enterprise Resource Planning",
    pitch: "Unified financial and operational data across your agency. Streamline procurement, budget execution, and reporting in one integrated platform built for government.",
    cta: "Enter ERP",
    accent: "#10B981",
    url: "https://erp-framework.vercel.app",
  },
  {
    mono: "CD",
    name: "Control Dashboard",
    tag: "Operational Controls Overview",
    pitch: "A single pane of glass across all active controls, exceptions, and remediation workflows. Know your control environment status at a glance — before the auditor does.",
    cta: "Enter Control Dashboard",
    accent: "#8B5CF6",
    url: "https://icm-dashboard.vercel.app",
  },
  {
    mono: "ARF",
    name: "Audit Readiness Framework",
    tag: "Audit Preparation & Evidence",
    pitch: "Build audit packages automatically as work happens. Map evidence to findings, track remediation status, and walk into every review with documentation already done.",
    cta: "Enter Audit Readiness",
    accent: "#F59E0B",
    url: "https://audit-readiness.vercel.app",
  },
];

function ProductCard({ p, onEnterFraudGuard }) {
  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid #E2E8F0",
      borderRadius: DS.r3,
      padding: "24px",
      display: "flex", flexDirection: "column", gap: 14,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: DS.r2,
          background: p.accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: p.mono.length > 2 ? 10 : 13,
          fontWeight: 800, color: "#fff", letterSpacing: "-0.3px",
          flexShrink: 0,
        }}>{p.mono}</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{p.name}</div>
          <div style={{ fontSize: 11, color: p.accent, fontWeight: 600, letterSpacing: 0.3 }}>{p.tag}</div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "#475569", lineHeight: 1.7, flex: 1 }}>{p.pitch}</p>
      <button
        onClick={p.internal ? onEnterFraudGuard : p.url ? () => { window.location.href = p.url; } : undefined}
        style={{
          padding: "10px 20px",
          background: p.accent, color: "#fff",
          border: "none", borderRadius: DS.r2,
          fontSize: 13, fontWeight: 700, cursor: p.url || p.internal ? "pointer" : "default",
          textAlign: "center", opacity: !p.url && !p.internal ? 0.6 : 1,
        }}
      >{p.cta} →</button>
    </div>
  );
}

export default function HomePage({ onEnterFraudGuard }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#EEF2F7",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "inherit",
    }}>

      {/* Layer 1: Official Trust Banner — Light Gray */}
      <div style={{ width: "100%", background: "#F1F5F9", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 1100, padding: "5px 24px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12 }}>🇺🇸</span>
          <span style={{ fontSize: 11, color: "#475569" }}>An official website of the United States government.</span>
          <span style={{
            fontSize: 11, color: DS.p2, cursor: "pointer", fontWeight: 600,
            borderBottom: "1px dashed #93C5FD",
          }}>Here's how you know ▾</span>
        </div>
      </div>

      {/* Layer 2: Brand Anchor — Slate Gray-Blue */}
      <div style={{ width: "100%", background: "#1B3A5C", display: "flex", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ width: "100%", maxWidth: 1100, padding: "13px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo + nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: DS.r2, background: DS.p2,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, color: "#fff", fontSize: 16, flexShrink: 0,
              }}>G</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>FounderQuantio</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", letterSpacing: 1, textTransform: "uppercase" }}>Platform Suite</div>
              </div>
            </div>
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.12)" }} />
            {["Policies", "National Briefs", "Audits & Data", "Agency Tools"].map((item, i) => (
              <span key={i} style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.65)", cursor: "pointer", whiteSpace: "nowrap" }}>{item}</span>
            ))}
          </div>

          {/* Right utilities */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.2)", borderRadius: DS.r2,
              padding: "5px 12px", cursor: "pointer", whiteSpace: "nowrap",
            }}>Compliance Frameworks ▾</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: DS.r2, padding: "5px 12px" }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>🔍</span>
              <input
                placeholder="Search federal frameworks..."
                style={{ background: "none", border: "none", outline: "none", fontSize: 11, color: "#fff", width: 180 }}
              />
            </div>
            <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.15)" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>EN ▾</span>
            <div style={{ background: DS.p2, color: "#fff", fontSize: 11, fontWeight: 700, padding: "6px 16px", borderRadius: DS.r2, cursor: "pointer" }}>Sign In</div>
          </div>
        </div>
      </div>

      {/* Layer 3: Navigation Bar — Pure White */}
      <div style={{ width: "100%", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "center", marginBottom: 48 }}>
        <div style={{ width: "100%", maxWidth: 1100, padding: "0 24px", display: "flex", alignItems: "center" }}>
          {[
            { label: "Policies & Frameworks", active: false },
            { label: "National Briefs & Press", active: false },
            { label: "Audits & Data Transparency", active: false },
            { label: "Agency Tools", active: false },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "12px 20px", fontSize: 12, fontWeight: 600,
              color: i === 0 ? "#0F172A" : "#475569",
              cursor: "pointer",
              borderBottom: i === 0 ? `2px solid ${DS.p2}` : "2px solid transparent",
            }}>{item.label}</div>
          ))}
        </div>
      </div>

      {/* Page content */}
      <div style={{ width: "100%", maxWidth: 1100, padding: "48px 24px 60px" }}>

        {/* Hero */}
        <div style={{ maxWidth: 640, marginBottom: 44, textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
          <h1 style={{
            margin: "0 0 16px",
            fontSize: "clamp(28px, 3.5vw, 40px)",
            fontWeight: 400, color: "#1B2F4A",
            lineHeight: 1.3, letterSpacing: "0.2px",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}>
            Every dollar of federal funding,<br />accounted for and protected.
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: "#334155", lineHeight: 1.75 }}>
            Grant fraud costs taxpayers over <strong style={{ color: "#0F172A" }}>$126 billion a year</strong>. Most of it goes
            undetected until the audit — by then, the money is gone. GovGuard™ puts automated
            intelligence between disbursement and loss.
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16, width: "100%", marginBottom: 44,
        }}>
          {STATS.map((s) => (
            <div key={s.label} style={{
              padding: "18px 20px",
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: DS.r3,
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", marginBottom: 6, letterSpacing: "-0.5px" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#475569", lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Section label */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
          Platform Products
        </div>

        {/* Product cards — row 1: 3 cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 20 }}>
          {PRODUCTS.slice(0, 3).map(p => <ProductCard key={p.name} p={p} onEnterFraudGuard={onEnterFraudGuard} />)}
        </div>

        {/* Product cards — row 2: 2 cards centered */}
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          {PRODUCTS.slice(3).map(p => (
            <div key={p.name} style={{ flex: "0 0 calc((100% - 40px) / 3)" }}>
              <ProductCard p={p} onEnterFraudGuard={onEnterFraudGuard} />
            </div>
          ))}
        </div>

      </div>

      {/* Pre-Footer: Impact Stats Bar */}
      <div style={{ width: "100%", background: "#1B3A5C", display: "flex", justifyContent: "center", marginTop: "auto" }}>
        <div style={{ width: "100%", maxWidth: 1100, padding: "28px 36px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { stat: "$126B+",    label: "Lost to grant fraud annually"   },
            { stat: "<3%",       label: "Anomalies caught manually"      },
            { stat: "2 CFR 200", label: "One missed control = clawbacks" },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "0 32px",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1, marginBottom: 8 }}>{item.stat}</div>
              <div style={{ fontSize: 12, color: "#94C4E8", fontWeight: 500, letterSpacing: 0.2 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Directory Footer */}
      <div style={{ width: "100%", background: "#0F2035", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 1100, padding: "36px 36px 0" }}>

          {/* Link columns */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginBottom: 32 }}>
            {[
              {
                heading: "Resource Links",
                links: ["Documentation", "Developer API", "Data Exports", "System Status"],
              },
              {
                heading: "Legal & Compliance",
                links: ["FOIA Requests", "Accessibility Statement", "Section 508 Compliance", "Vulnerability Disclosure Policy"],
              },
              {
                heading: "Agency Policies",
                links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Admin"],
              },
            ].map((col) => (
              <div key={col.heading}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 14 }}>{col.heading}</div>
                {col.links.map(link => (
                  <div key={link} style={{ fontSize: 12, color: "#94C4E8", marginBottom: 9, cursor: "pointer" }}>{link}</div>
                ))}
              </div>
            ))}
          </div>

          {/* Sub-footer */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: DS.r1, background: DS.p2, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 13 }}>G</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>FounderQuantio Platform Suite</span>
            </div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>© 2026 Official National System. All rights reserved.</span>
          </div>

        </div>
      </div>

    </div>
  );
}
