import { useState } from "react";
import { DS } from "@/utils/tokens";
import { Card } from "@/components/ui";

const QUICK_REF = [
  {
    id: "what", label: "What is it?", icon: "📋",
    short: "An AI-enabled fraud detection dashboard that screens every federal grant transaction in real time — built to OMB 2 CFR Part 200, the GAO Green Book, and the COSO Framework.",
    detail: "FraudGuard is a production-ready grant intelligence platform that gives financial governance officers, compliance teams, and external auditors a live view of fraud risk across federally funded grant programs — before a transaction becomes an audit finding.\n\nUnlike a static compliance checklist, FraudGuard runs continuously: every transaction is scored the moment it's recorded, combining rule-based detection, machine-learning anomaly scoring, and relationship-graph analysis that surfaces patterns a human reviewer would miss.\n\nThe platform ships with six real fraud scenario datasets pre-loaded — 150 transactions across duplicate invoices, vendor collusion networks, procurement violations, transaction structuring, and ML-flagged anomalies — so your team can see exactly how detection works before connecting live data.",
    bullets: [
      { label: "10 OMB-aligned detection rules (R001–R010):", text: "A configurable rule engine covering duplicate payments, split purchases, structuring thresholds, and sole-source procurement red flags." },
      { label: "ML + Graph Engine:", text: "Z-score anomaly detection per grant/category baseline, plus shared-address, bank-routing, and procurement-concentration graph analysis." },
      { label: "Full case lifecycle:", text: "OPEN → ESCALATED → CLOSED workflow with notes, evidence bundling, and one-click OIG-style HTML audit export." },
      { label: "Compliance Matrix:", text: "CC-001–CC-010 internal controls mapped directly to COSO and GAO Green Book references." },
    ],
    callout: "FraudGuard answers the question every grantor agency and recipient organization eventually asks: \"How do we catch fraud before the audit — not after?\" Six embedded real-world fraud datasets let you see the answer in minutes, not months.",
  },
  {
    id: "who", label: "Who uses it?", icon: "👥",
    short: "Financial governance officers, compliance teams, investigators, and external auditors at agencies and organizations that disburse or receive federal grant funding.",
    detail: "FraudGuard is built around role-based access control, so every user sees exactly the workspace their job requires — nothing more, nothing less. Four roles ship out of the box, each scoped to a different slice of the platform:",
    bullets: [
      { label: "System Admin:", text: "Full visibility across every module, plus the ability to toggle detection rules live and manage the audit log." },
      { label: "Compliance Officer:", text: "Overview, alerts, transactions, cases, and the compliance matrix — can close cases but not edit detection rules." },
      { label: "Investigator:", text: "Overview, alerts, transactions, and cases — focused on working the queue, no rule configuration or case closure." },
      { label: "External Auditor:", text: "Read-only access to the overview dashboard and compliance matrix — everything needed for an audit walkthrough." },
    ],
    callout: "Same data, four different lenses — a compliance officer triaging today's alert queue and an external auditor reviewing last quarter's controls never have to fight over what they're allowed to see.",
  },
  {
    id: "why", label: "Who benefits?", icon: "🏛️",
    short: "Grantor agencies, program recipients, and taxpayers — fewer improper payments caught earlier, before funds leave the door instead of after the audit finding.",
    detail: "Every dollar FraudGuard flags before disbursement is a dollar that never has to be clawed back, disputed, or written off as an improper payment. That benefit compounds across three groups:",
    bullets: [
      { label: "Grantor agencies:", text: "Real-time visibility into fraud risk across the entire portfolio, instead of relying on annual single-audit sampling to catch problems months later." },
      { label: "Recipient organizations:", text: "An early-warning system that protects their own compliance standing — a pattern caught internally never becomes a finding in someone else's audit report." },
      { label: "Taxpayers:", text: "Fewer federal dollars lost to fraud, waste, and improper payment before they reach the communities the grant was meant to serve." },
    ],
    callout: "The ROI Calculator on the Overview dashboard lets any of these stakeholders run the numbers themselves — audit cost saved, staff hours saved, and net return, using their own grant portfolio size.",
  },
  {
    id: "cost", label: "Cost", icon: "💰",
    short: "A subscription-based platform — the built-in ROI calculator shows your audit-cost and staff-hour savings against FraudGuard's annual cost, so the return is transparent before you commit.",
    detail: "FraudGuard is licensed as an annual subscription, scaled to the size of the grant portfolio being monitored. Rather than publish a flat rate, the Overview dashboard includes an interactive ROI Calculator so every prospective customer can model their own numbers:",
    bullets: [
      { label: "Annual grant portfolio:", text: "$100K – $50M — the total federal award volume being monitored." },
      { label: "Average audit finding cost:", text: "$5,000 – $200,000 — what a single improper-payment finding typically costs to resolve." },
      { label: "Compliance staff rate:", text: "$30 – $200/hr — loaded cost of the staff hours FraudGuard's automation replaces." },
      { label: "FraudGuard annual cost:", text: "$0 – $100,000 — the platform's own subscription cost, weighed directly against the savings above." },
    ],
    callout: "Move any slider on the Overview dashboard and the calculator recomputes audit cost saved, staff hours saved, and net ROI percentage in real time.",
  },
  {
    id: "access", label: "How to access", icon: "🔓",
    short: "A 3-step onboarding wizard — tell us your organization type, connect your data source, and launch your first scan in minutes.",
    detail: "There's no lengthy implementation project standing between signup and your first fraud scan. The Setup Guide walks every new organization through exactly three steps:",
    bullets: [
      { label: "1 · Organization:", text: "Select your organization type — municipality, state agency, nonprofit, tribal government, housing authority, or federal contractor — so FraudGuard pre-configures the right detection rules and OMB templates." },
      { label: "2 · Data Source:", text: "Choose how you'll provide transaction data — direct upload, ERP integration, or one of the six embedded demo datasets to explore the platform risk-free first." },
      { label: "3 · Launch Scan:", text: "Run your first detection pass and watch the alert queue, risk distribution, and compliance matrix populate live." },
    ],
    callout: "Most organizations complete setup and see their first flagged transaction in under ten minutes.",
  },
  {
    id: "result", label: "Key result", icon: "📊",
    short: "10 OMB detection rules · ML + graph anomaly engine · 6 real fraud datasets (150 transactions) · one-click OIG-style case export · full COSO / GAO Green Book alignment.",
    detail: null,
    bullets: [],
    callout: null,
  },
];

function QuickRefItem({ item, isOpen, onToggle }) {
  return (
    <Card sx={{ padding: 0, overflow: "hidden", borderColor: isOpen ? DS.p3 : DS.bd, boxShadow: isOpen ? DS.sh2 : DS.sh1 }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%", background: isOpen ? DS.sideAct : "transparent",
          border: "none", cursor: "pointer",
          display: "grid", gridTemplateColumns: "44px 1fr 28px", alignItems: "center",
          textAlign: "left", padding: "10px 6px", fontFamily: "inherit", transition: "background .15s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
        <div>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", color: isOpen ? DS.primary : DS.t1, display: "block" }}>{item.label}</span>
          <span style={{ fontSize: 12, color: DS.t3, marginTop: 2, lineHeight: 1.45, display: "block" }}>{item.short}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: DS.t4, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .25s" }}>⌄</div>
      </button>
      {isOpen && item.detail && (
        <div style={{ padding: "0 20px 20px 44px", borderTop: `1px solid ${DS.bd}` }}>
          {item.detail.split("\n\n").map((p, i) => (
            <p key={i} style={{ fontSize: 12.5, color: DS.t3, lineHeight: 1.75, margin: "14px 0 0" }}>{p}</p>
          ))}
          {item.bullets.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "flex", flexDirection: "column", gap: 7 }}>
              {item.bullets.map((b, i) => (
                <li key={i} style={{ fontSize: 12, color: DS.t3, lineHeight: 1.65 }}>
                  <span style={{ color: DS.t1, fontWeight: 700 }}>{b.label}</span> {b.text}
                </li>
              ))}
            </ul>
          )}
          {item.callout && (
            <div style={{ background: DS.p3, borderLeft: `3px solid ${DS.primary}`, borderRadius: "0 6px 6px 0", padding: "10px 14px", marginTop: 14, fontSize: 12, fontStyle: "italic", color: DS.t2, lineHeight: 1.65 }}>
              {item.callout}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default function AtAGlance() {
  const [open, setOpen] = useState("what");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 760 }}>
      {QUICK_REF.map(item => (
        <QuickRefItem
          key={item.id}
          item={item}
          isOpen={open === item.id}
          onToggle={() => setOpen(open === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}
