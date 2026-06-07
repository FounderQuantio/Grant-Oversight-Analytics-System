import { DS } from "@/utils/tokens";

const GOVGUARD_URL = "https://grant-management-saas-git-main-founderquantios-projects.vercel.app";

const STATS = [
  { value: "$1.8T", label: "Federal grants disbursed annually" },
  { value: "7–10%", label: "Estimated lost to fraud & waste" },
  { value: "340+",  label: "OMB compliance controls" },
  { value: "72hrs", label: "Avg. time to detect anomalies — manually" },
];

const PRODUCTS = [
  {
    icon: "🛡",
    name: "Fraud Guard",
    tag: "Transaction Intelligence",
    pitch: "Stop fraud before funds leave the door. ML-powered screening catches duplicate invoices, vendor collusion, and shell entities in real time — not after an OIG audit.",
    cta: "Enter Fraud Guard",
    accent: DS.p2,
    accentBg: "rgba(26,109,212,0.15)",
    internal: true,
  },
  {
    icon: "🏛",
    name: "Gov Guard",
    tag: "Grant Lifecycle Management",
    pitch: "From pre-award to closeout, every compliance checkpoint covered. Automated 2 CFR 200 controls, live risk scoring, and audit packages built as you work.",
    cta: "Enter Gov Guard",
    accent: "#6366F1",
    accentBg: "rgba(99,102,241,0.15)",
    url: GOVGUARD_URL,
  },
  {
    icon: "⚙️",
    name: "ERP",
    tag: "Enterprise Resource Planning",
    pitch: "Unified financial and operational data across your agency. Streamline procurement, budget execution, and reporting in one integrated platform built for government.",
    cta: "Enter ERP",
    accent: "#10B981",
    accentBg: "rgba(16,185,129,0.15)",
    url: null,
  },
  {
    icon: "📋",
    name: "Controlled Dashboard",
    tag: "Operational Controls Overview",
    pitch: "A single pane of glass across all active controls, exceptions, and remediation workflows. Know your control environment status at a glance — before the auditor does.",
    cta: "Enter Controlled Dashboard",
    accent: "#8B5CF6",
    accentBg: "rgba(139,92,246,0.15)",
    url: null,
  },
  {
    icon: "📁",
    name: "Audit Readiness Framework",
    tag: "Audit Preparation & Evidence",
    pitch: "Build audit packages automatically as work happens. Map evidence to findings, track remediation status, and walk into every review with documentation already done.",
    cta: "Enter Audit Readiness Framework",
    accent: "#F59E0B",
    accentBg: "rgba(245,158,11,0.15)",
    url: null,
  },
];

export default function HomePage({ onEnterFraudGuard }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#1E3A5F",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "48px 24px 60px",
      fontFamily: "inherit",
    }}>

      {/* Nav bar */}
      <div style={{
        width: "100%", maxWidth: 1000,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 72,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: DS.r2,
            background: DS.p2, display: "flex", alignItems: "center",
            justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 16,
          }}>G</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>FounderQuantio</span>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: 0.5 }}>
          OMB 2 CFR 200 · GAO Green Book
        </div>
      </div>

      {/* Hero */}
      <div style={{ textAlign: "center", maxWidth: 700, marginBottom: 56 }}>
        <div style={{
          display: "inline-block",
          fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
          color: DS.p2, textTransform: "uppercase",
          background: "rgba(26,109,212,0.15)",
          padding: "5px 14px", borderRadius: 50, marginBottom: 20,
        }}>
          Federal Grant Oversight Platform
        </div>
        <h1 style={{
          margin: "0 0 18px",
          fontSize: "clamp(28px, 4.5vw, 48px)",
          fontWeight: 800, color: "#fff",
          lineHeight: 1.18, letterSpacing: "-0.8px",
        }}>
          Every dollar of federal funding,<br />accounted for and protected.
        </h1>
        <p style={{
          margin: 0, fontSize: 15,
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.75, maxWidth: 540,
          marginLeft: "auto", marginRight: "auto",
        }}>
          Grant fraud costs taxpayers over <strong style={{ color: "rgba(255,255,255,0.8)" }}>$126 billion a year</strong>.
          Most of it goes undetected until the audit — by then, the money is gone.
          GovGuard™ puts automated intelligence between disbursement and loss.
        </p>
      </div>

      {/* Stats bar */}
      <div style={{
        display: "flex", gap: 0, flexWrap: "wrap", justifyContent: "center",
        maxWidth: 800, width: "100%",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: DS.r3, marginBottom: 56, overflow: "hidden",
      }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            flex: "1 1 180px",
            padding: "22px 20px",
            textAlign: "center",
            borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
          }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Product cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 20, maxWidth: 1100, width: "100%", marginBottom: 56,
      }}>
        {PRODUCTS.map(p => (
          <div key={p.name} style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: DS.r3, padding: "32px 28px",
            display: "flex", flexDirection: "column", gap: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: DS.r2,
                background: p.accentBg,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
              }}>{p.icon}</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>{p.name}</div>
                <div style={{ fontSize: 11, color: p.accent, fontWeight: 600, letterSpacing: 0.5 }}>{p.tag}</div>
              </div>
            </div>
            <p style={{
              margin: 0, fontSize: 13,
              color: "rgba(255,255,255,0.55)", lineHeight: 1.7, flex: 1,
            }}>{p.pitch}</p>
            <button
              onClick={p.internal ? onEnterFraudGuard : p.url ? () => { window.location.href = p.url; } : undefined}
              style={{
                padding: "11px 20px",
                background: p.accent, color: "#fff",
                border: "none", borderRadius: DS.r2,
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                textAlign: "center",
              }}
            >{p.cta} →</button>
          </div>
        ))}
      </div>

      {/* Why it matters strip */}
      <div style={{
        maxWidth: 760, width: "100%",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: DS.r3, padding: "24px 28px",
        display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start",
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap", paddingTop: 2 }}>
          Why it matters
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, flex: 1 }}>
          Federal agencies and municipalities face increasing scrutiny from the OIG and GAO.
          A single missed control under 2 CFR 200 can trigger clawbacks, suspension of funding,
          or debarment. Manual spreadsheet reviews catch less than 3% of anomalies before disbursement.
          GovGuard™ automates what auditors look for — so your team stays ahead of findings, not behind them.
        </p>
      </div>

    </div>
  );
}
