import { DS } from "@/utils/tokens";
import { useAppState } from "@/context/AppContext";

function lightT() {
  return { card: "#FFFFFF", border: "#E2E8F0", t1: "#0F172A", t2: "#334155", t3: "#64748B", t4: "#94A3B8", rowBg: "#F8FAFC", roiBg: "#EBF3FF", roiBorder: "#DBEAFE" };
}
function darkT() {
  return { card: "#1E293B", border: "#334155", t1: "#F1F5F9", t2: "#CBD5E1", t3: "#64748B", t4: "#475569", rowBg: "#0F2A45", roiBg: "#0C1E38", roiBorder: "#1E4060" };
}

export default function ROICalculator() {
  const { s, d } = useAppState();
  const { roi } = s;
  const upd = (k, v) => d({ type: "SET_ROI", v: { [k]: +v || 0 } });
  const dark = s.darkMode;
  const T = dark ? darkT() : lightT();

  const flagAmt  = s.txns.filter(t => t.riskTier !== "INFORMATIONAL").reduce((acc, t) => acc + (t.amount || 0), 0);
  const fPrev    = Math.round(flagAmt * 0.65 * 0.4);
  const findings = s.alerts.filter(a => a.severity === "CRITICAL" || a.severity === "HIGH").length;
  const auditSaved = findings * roi.findCost;
  const hrs = Math.round(s.alerts.length * 3.5);
  const laborSaved = hrs * roi.rate;
  const total  = fPrev + auditSaved + laborSaved;
  const roiPct = roi.sub > 0 ? Math.round((total / roi.sub - 1) * 100) : 0;

  const fmt = (n) => n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `$${(n / 1e3).toFixed(1)}K` : `$${n.toLocaleString()}`;

  const Slider = ({ k, label, min, max, step = 1000, display }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: T.t2 }}>{label}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: T.t1 }}>{display ? display(roi[k]) : `$${roi[k].toLocaleString()}`}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={roi[k]}
        onChange={e => upd(k, e.target.value)}
        style={{ width: "100%", accentColor: DS.p2, height: 4 }}
      />
    </div>
  );

  const ResultCard = ({ label, note, value, valueColor }) => (
    <div style={{ background: T.rowBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.t1 }}>{label}</div>
          <div style={{ fontSize: 11, color: T.t4, marginTop: 2 }}>{note}</div>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: valueColor || T.t1 }}>{value}</span>
      </div>
    </div>
  );

  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: T.t1 }}>ROI calculator</span>
        <span style={{ fontSize: 12, color: T.t3 }}>Adjust inputs to estimate return on investment</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        {/* Left: sliders */}
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: T.t4, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 18 }}>Your Organization</div>
          <Slider k="vol"      label="Annual grant portfolio"   min={100000}  max={50000000} step={100000} />
          <Slider k="findCost" label="Avg. audit finding cost"  min={5000}    max={200000}   step={5000} />
          <Slider k="rate"     label="Compliance staff rate"    min={30}      max={200}      step={5} display={v => `$${v}/hr`} />
          <Slider k="sub"      label="Fraud Guard annual cost"  min={0}       max={100000}   step={1000} />
        </div>

        {/* Right: results */}
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: T.t4, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 18 }}>Estimated Annual Return</div>
          <ResultCard label="Fraud prevented"  note={`${findings} high-risk txns × 65% recovery`} value={fmt(fPrev)}      valueColor="#16A34A" />
          <ResultCard label="Audit cost saved" note={`${findings} findings × $${roi.findCost.toLocaleString()}`} value={fmt(auditSaved)} />
          <ResultCard label="Staff hours saved" note={`${hrs} hrs × $${roi.rate}/hr`} value={fmt(laborSaved)} />
          {/* ROI total */}
          <div style={{ background: T.roiBg, border: `1px solid ${T.roiBorder}`, borderRadius: 10, padding: "20px 16px", textAlign: "center", marginTop: 4 }}>
            <div style={{ fontSize: 46, fontWeight: 900, color: DS.p2, lineHeight: 1, letterSpacing: -2 }}>
              {roiPct.toLocaleString()}%
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.t1, marginTop: 6 }}>Estimated annual ROI</div>
            <div style={{ fontSize: 11, color: T.t3, marginTop: 3 }}>
              ${total.toLocaleString()} benefit on ${roi.sub.toLocaleString()} cost
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
