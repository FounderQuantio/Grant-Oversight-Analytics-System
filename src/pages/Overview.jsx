import { useState, useMemo } from "react";
import { DS, RM } from "@/utils/tokens";
import { useAppState } from "@/context/AppContext";
import ROICalculator from "@/components/ROICalculator";

const DS_FILTERS = [
  { id: null,  label: "All datasets" },
  { id: "1",   label: "DS1 · Clean Baseline" },
  { id: "2",   label: "DS2 · Duplicate Payments" },
  { id: "3",   label: "DS3 · Vendor Fraud Network" },
  { id: "4",   label: "DS4 · Procurement Violations" },
  { id: "5",   label: "DS5 · Transaction Structuring" },
  { id: "6",   label: "DS6 · ML Anomalies" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May"];


function LineChart({ totalData, flaggedData, labels }) {
  const W = 480, H = 160;
  const pad = { t: 8, r: 12, b: 22, l: 8 };
  const iW = W - pad.l - pad.r;
  const iH = H - pad.t - pad.b;
  const maxV = Math.max(...totalData, ...flaggedData, 1);
  const xp = (i) => pad.l + (i / (labels.length - 1)) * iW;
  const yp = (v) => pad.t + iH - (v / maxV) * iH;

  const totalPts = totalData.map((v, i) => `${xp(i)},${yp(v)}`).join(" ");
  const flagPts  = flaggedData.map((v, i) => `${xp(i)},${yp(v)}`).join(" ");
  const areaPath = totalData.map((v, i) => `${i === 0 ? "M" : "L"} ${xp(i)} ${yp(v)}`).join(" ") +
    ` L ${xp(totalData.length - 1)} ${yp(0) + iH} L ${xp(0)} ${yp(0) + iH} Z`;
  const gridYs = [0.25, 0.5, 0.75].map(p => pad.t + iH * (1 - p));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: "block" }}>
      {gridYs.map((gy, i) => (
        <line key={i} x1={pad.l} y1={gy} x2={W - pad.r} y2={gy}
          style={{ stroke: "var(--qg-border)" }} strokeWidth={1} />
      ))}
      <path d={areaPath} fill="rgba(201,168,76,0.10)" />
      <polyline points={totalPts} fill="none" stroke="#C9A84C" strokeWidth={2} strokeLinejoin="round" />
      {totalData.map((v, i) => (
        <circle key={i} cx={xp(i)} cy={yp(v)} r={3}
          style={{ fill: "var(--qg-surface)" }} stroke="#C9A84C" strokeWidth={1.5} />
      ))}
      <polyline points={flagPts} fill="none" stroke="#EF4444" strokeWidth={1.5}
        strokeDasharray="4,3" strokeLinejoin="round" />
      {labels.map((l, i) => (
        <text key={i} x={xp(i)} y={H - 4} textAnchor="middle" fontSize="9"
          style={{ fill: "var(--qg-text-3)" }}>{l}</text>
      ))}
    </svg>
  );
}

function StatCard({ label, value, sub1, sub2, dot1, dot2, T }) {
  return (
    <div style={{
      background: T.card, border: `1px solid ${T.border}`, borderRadius: 12,
      padding: "18px 20px", flex: 1, minWidth: 0,
    }}>
      <div style={{ fontSize: 9, fontWeight: 600, color: T.t3, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: T.t1, lineHeight: 1, letterSpacing: -1, marginBottom: 10 }}>{value}</div>
      {sub1 && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: sub2 ? 4 : 0 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: dot1 || T.t4, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: T.t3 }}>{sub1}</span>
        </div>
      )}
      {sub2 && (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: dot2 || T.t4, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: T.t3 }}>{sub2}</span>
        </div>
      )}
    </div>
  );
}

export default function Overview() {
  const { s } = useAppState();
  const [activeDS, setActiveDS] = useState(null);
  const [timeRange, setTimeRange] = useState("YTD");
  const T = {
    card: DS.surface, border: DS.bd,
    t1: DS.t1, t2: DS.t2, t3: DS.t3, t4: DS.t4,
    pillBg: DS.s2, sectionLabel: DS.t4,
  };

  const filteredTxns = useMemo(() => {
    if (!activeDS) return s.txns;
    return s.txns.filter(t => t.id.startsWith(`TXN-${activeDS}`));
  }, [activeDS, s.txns]);

  const filteredAlerts = useMemo(() => {
    if (!activeDS) return s.alerts;
    return s.alerts.filter(a => a.txnId && a.txnId.startsWith(`TXN-${activeDS}`));
  }, [activeDS, s.alerts]);

  const totalAmount  = filteredTxns.reduce((sum, t) => sum + (t.amount || 0), 0);
  const openAlerts   = filteredAlerts.filter(a => a.status === "OPEN").length;
  const critHigh     = filteredAlerts.filter(a => (a.severity === "CRITICAL" || a.severity === "HIGH") && a.status === "OPEN").length;
  const riskExposure = filteredTxns.filter(t => t.riskTier === "CRITICAL" || t.riskTier === "HIGH").reduce((sum, t) => sum + (t.amount || 0), 0);
  const openCases    = s.cases.filter(c => c.status === "OPEN").length;

  const sc = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0, INFORMATIONAL: 0 };
  filteredAlerts.forEach(a => { if (sc[a.severity] !== undefined) sc[a.severity]++; });
  const totalSev = Math.max(Object.values(sc).reduce((s, v) => s + v, 0), 1);

  const monthTotals = MONTHS.map((_, i) => {
    const m = i + 1;
    return filteredTxns.filter(t => new Date(t.date).getMonth() + 1 === m).reduce((sum, t) => sum + (t.amount || 0), 0);
  });
  const flaggedTotals = MONTHS.map((_, i) => {
    const m = i + 1;
    return filteredTxns.filter(t => new Date(t.date).getMonth() + 1 === m && (t.riskTier === "CRITICAL" || t.riskTier === "HIGH")).reduce((sum, t) => sum + (t.amount || 0), 0);
  });

  const topVendors = s.vens.map(v => {
    const va = filteredAlerts.filter(a => a.vendorId === v.id);
    const score = Math.min(100, va.length * 12 + va.filter(a => a.severity === "CRITICAL").length * 15);
    return { ...v, alertCount: va.length, score };
  }).filter(v => v.alertCount > 0).sort((a, b) => b.score - a.score).slice(0, 4);
  const maxScore = Math.max(...topVendors.map(v => v.score), 1);

  const critAlerts = filteredAlerts.filter(a => a.severity === "CRITICAL" || a.severity === "HIGH").slice(0, 5);

  const fmt = (n) => n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `$${(n / 1e3).toFixed(1)}K` : `$${n.toLocaleString()}`;

  const SEVS = [
    { label: "Critical",      color: "#EF4444", count: sc.CRITICAL },
    { label: "High",          color: "#F97316", count: sc.HIGH },
    { label: "Medium",        color: "#EAB308", count: sc.MEDIUM },
    { label: "Low",           color: "#22C55E", count: sc.LOW },
    { label: "Informational", color: "#94A3B8", count: sc.INFORMATIONAL },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, color: T.t1 }}>

      {/* Page header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.t1, letterSpacing: -0.5 }}>Overview</h1>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: T.t3 }}>Real-time grant integrity across all active programs</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* DS selector */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${T.border}`, borderRadius: 8, padding: "6px 12px", background: T.card, fontSize: 12, color: T.t2, cursor: "default" }}>
            <span style={{ fontWeight: 600 }}>
              {activeDS ? DS_FILTERS.find(f => f.id === activeDS)?.label : "All datasets"}
            </span>
            <span style={{ color: T.t4 }}>▾</span>
          </div>
          {/* Time range */}
          <div style={{ display: "flex", border: `1px solid ${T.border}`, borderRadius: 8, overflow: "hidden", background: T.card }}>
            {["30d", "90d", "YTD"].map(r => (
              <button key={r} onClick={() => setTimeRange(r)} style={{
                padding: "6px 12px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
                background: timeRange === r ? "#C9A84C" : "transparent",
                color: timeRange === r ? "#fff" : T.t3,
              }}>{r}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Dataset filter pills */}
      <div>
        <div style={{ fontSize: 9, fontWeight: 700, color: T.sectionLabel, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>Active Datasets</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {DS_FILTERS.map(f => {
            const isActive = activeDS === f.id;
            return (
              <button key={String(f.id)} onClick={() => setActiveDS(f.id)} style={{
                padding: "5px 14px", borderRadius: 20, border: `1px solid ${isActive ? "#C9A84C" : T.border}`,
                background: isActive ? "#C9A84C" : T.pillBg,
                color: isActive ? "#fff" : T.t2,
                fontSize: 12, fontWeight: isActive ? 700 : 400, cursor: "pointer",
                transition: "all 0.15s",
              }}>{f.label}</button>
            );
          })}
        </div>
      </div>

      {/* KPI stat cards */}
      <div style={{ display: "flex", gap: 12 }}>
        <StatCard T={T} label="Transactions"   value={filteredTxns.length} sub1={`${fmt(totalAmount)} total`} dot1={DS.p2} />
        <StatCard T={T} label="Open Alerts"    value={openAlerts} sub1={`${critHigh} critical / high`} dot1="#F97316" />
        <StatCard T={T} label="Risk Exposure"  value={fmt(riskExposure)} sub1="Critical + High txns" dot1="#EF4444" />
        <StatCard T={T} label="ML Anomalies"   value={s.mlStats?.cnt ?? 0} sub1={`${s.mlStats?.bases ?? 0} baselines`} dot1="#EAB308" />
        <StatCard T={T} label="Network Alerts" value={s.graphAlerts?.length ?? 0} sub1="Graph patterns" dot1="#EF4444" />
        <StatCard T={T} label="Open Cases"     value={openCases} sub1={`${s.cases.length} total`} dot1={DS.p2} />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 14 }}>

        {/* Line chart */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "20px 20px 12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.t1 }}>Disbursement flow · 12 weeks</div>
            <div style={{ display: "flex", gap: 16, fontSize: 11, color: T.t3 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <svg width="20" height="2" style={{ display: "inline-block" }}><line x1="0" y1="1" x2="20" y2="1" stroke="#C9A84C" strokeWidth="2"/></svg>
                Total
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <svg width="20" height="2" style={{ display: "inline-block" }}><line x1="0" y1="1" x2="20" y2="1" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,2"/></svg>
                Flagged
              </div>
            </div>
          </div>
          <div style={{ height: 160 }}>
            <LineChart totalData={monthTotals} flaggedData={flaggedTotals} labels={MONTHS} />
          </div>
        </div>

        {/* Risk distribution */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.t1, marginBottom: 16 }}>Risk distribution</div>
          {/* Gradient bar */}
          <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
            {SEVS.map((seg, i) => (
              <div key={i} style={{ width: `${(seg.count / totalSev) * 100}%`, background: seg.color, minWidth: seg.count > 0 ? 3 : 0 }} />
            ))}
          </div>
          {/* List */}
          {SEVS.map((row, i) => (
            <div key={row.label} style={{
              display: "flex", alignItems: "center", padding: "7px 0",
              borderBottom: i < SEVS.length - 1 ? `1px solid ${T.border}` : "none",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: row.color, display: "inline-block", marginRight: 10, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 13, color: T.t2 }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.t1, width: 22, textAlign: "right" }}>{row.count}</span>
              <span style={{ fontSize: 11, color: T.t4, width: 38, textAlign: "right" }}>{Math.round(row.count / totalSev * 100)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vendors + Alerts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

        {/* Top risk vendors */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: T.t1 }}>Top risk vendors</span>
            <span style={{ fontSize: 12, color: "#C9A84C", cursor: "pointer", fontWeight: 600 }}>View all →</span>
          </div>
          {topVendors.length === 0 && (
            <div style={{ color: T.t4, fontSize: 12, textAlign: "center", padding: "20px 0" }}>✅ No flagged vendors</div>
          )}
          {topVendors.map((v, i) => (
            <div key={v.id} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "11px 0",
              borderBottom: i < topVendors.length - 1 ? `1px solid ${T.border}` : "none",
            }}>
              <span style={{ fontSize: 13, color: T.t3, width: 16, fontWeight: 500 }}>{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.t1 }}>{v.short || v.name}</div>
                <div style={{ fontSize: 11, color: T.t3 }}>{v.region} · {v.alertCount} alert{v.alertCount !== 1 ? "s" : ""}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, width: 120 }}>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: T.border, overflow: "hidden" }}>
                  <div style={{
                    width: `${(v.score / maxScore) * 100}%`, height: "100%", borderRadius: 3,
                    background: v.score > 70 ? "#EF4444" : v.score > 40 ? "#F97316" : "#EAB308",
                  }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: T.t1, minWidth: 24, textAlign: "right" }}>{v.score}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent critical alerts */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: T.t1 }}>Recent critical alerts</span>
            <span style={{ fontSize: 12, color: "#C9A84C", cursor: "pointer", fontWeight: 600 }}>View all →</span>
          </div>
          {critAlerts.length === 0 && (
            <div style={{ color: T.t4, fontSize: 12, textAlign: "center", padding: "20px 0" }}>✅ No critical alerts</div>
          )}
          {critAlerts.map((a, i) => {
            const dotColor = RM[a.severity]?.dot || T.t4;
            const txnAmt = (s.txns.find(t => t.id === a.txnId)?.amount) || 0;
            return (
              <div key={a.id} style={{
                display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0",
                borderBottom: i < critAlerts.length - 1 ? `1px solid ${T.border}` : "none",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: dotColor, marginTop: 4, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: T.t1, lineHeight: 1.4 }}>{a.label || a.description || "Alert"}</div>
                  <div style={{ fontSize: 10, color: T.t4, marginTop: 2 }}>{a.ruleId} · {a.omb}</div>
                </div>
                {txnAmt > 0 && (
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.t1, whiteSpace: "nowrap" }}>{fmt(txnAmt)}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ROICalculator />
    </div>
  );
}
