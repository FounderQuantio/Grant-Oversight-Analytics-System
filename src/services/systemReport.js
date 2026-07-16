/**
 * System Report — generates a full findings report across the whole
 * FraudGuard workspace (all transactions, alerts, vendors, cases,
 * compliance readiness). Triggered from the Reports tab.
 */

const MATRIX_DEF = [
  {id:"CC-001",ctrl:"Payment Verification",       coso:"Control Activities",  gao:"OV1.10",omb:"2 CFR 200.305",    rule:"R001"},
  {id:"CC-002",ctrl:"Procurement Competition",    coso:"Control Activities",  gao:"AM1.03",omb:"2 CFR 200.320",    rule:"R005"},
  {id:"CC-003",ctrl:"Vendor Debarment Screen",    coso:"Control Environment", gao:"AM2.01",omb:"2 CFR 200.213",    rule:"R006"},
  {id:"CC-004",ctrl:"Conflict of Interest",       coso:"Control Environment", gao:"OV2.01",omb:"2 CFR 200.318(c)", rule:"R007"},
  {id:"CC-005",ctrl:"Period of Performance",      coso:"Monitoring",          gao:"OV1.05",omb:"2 CFR 200.309",    rule:"R008"},
  {id:"CC-006",ctrl:"FFR Reporting Timeliness",   coso:"Information & Comm.", gao:"OV4.01",omb:"2 CFR 200.328",    rule:"R004"},
  {id:"CC-007",ctrl:"New Vendor Vetting",         coso:"Control Activities",  gao:"AM2.02",omb:"2 CFR 200.318",    rule:"R002"},
  {id:"CC-008",ctrl:"Budget Variance Monitor",    coso:"Monitoring",          gao:"OV1.05",omb:"2 CFR 200.405",    rule:"R003"},
  {id:"CC-009",ctrl:"Transaction Structuring",    coso:"Control Activities",  gao:"AM1.05",omb:"31 U.S.C. 5324",   rule:"R009"},
  {id:"CC-010",ctrl:"Supporting Document Verify", coso:"Control Activities",  gao:"AM3.01",omb:"2 CFR 200.302",    rule:"R010"},
];

const SEV_ORDER = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFORMATIONAL"];
const CASE_STATUSES = ["OPEN", "IN_REVIEW", "ESCALATED", "RESOLVED", "CLOSED"];

const fmt = (n) => (n||0) >= 1e6 ? `$${((n||0)/1e6).toFixed(2)}M` : (n||0) >= 1e3 ? `$${((n||0)/1e3).toFixed(1)}K` : `$${(n||0).toLocaleString()}`;

export function buildSystemReportData(s) {
  const { txns = [], vens = [], alerts = [], cases = [], graphAlerts = [], mlStats } = s;

  const totalAmount  = txns.reduce((sum, t) => sum + (t.amount || 0), 0);
  const openAlerts   = alerts.filter(a => a.status === "OPEN").length;
  const critHigh     = alerts.filter(a => (a.severity === "CRITICAL" || a.severity === "HIGH") && a.status === "OPEN").length;
  const riskExposure = txns.filter(t => t.riskTier === "CRITICAL" || t.riskTier === "HIGH").reduce((sum, t) => sum + (t.amount || 0), 0);
  const openCases    = cases.filter(c => c.status === "OPEN").length;

  const sevCounts = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0, INFORMATIONAL: 0 };
  alerts.forEach(a => { if (sevCounts[a.severity] !== undefined) sevCounts[a.severity]++; });
  const totalAlerts = alerts.length || 1;

  const topVendors = vens.map(v => {
    const va = alerts.filter(a => a.vendorId === v.id);
    const score = Math.min(100, va.length * 12 + va.filter(a => a.severity === "CRITICAL").length * 15);
    return { ...v, alertCount: va.length, score };
  }).filter(v => v.alertCount > 0).sort((a, b) => b.score - a.score).slice(0, 10);

  const caseStatusCounts = { OPEN: 0, IN_REVIEW: 0, ESCALATED: 0, RESOLVED: 0, CLOSED: 0 };
  cases.forEach(c => { if (caseStatusCounts[c.status] !== undefined) caseStatusCounts[c.status]++; });

  const rh = (id) => alerts.some(a => a.ruleId === id);
  const matrix = MATRIX_DEF.map(c => ({ ...c, ok: !rh(c.rule) }));
  const effective = matrix.filter(c => c.ok).length;
  const readiness = Math.round((effective / matrix.length) * 100);

  return {
    generatedAt: new Date(),
    totalTxns: txns.length, totalAmount, openAlerts, critHigh, riskExposure, openCases,
    sevCounts, totalAlerts, topVendors, caseStatusCounts, totalCases: cases.length,
    matrix, effective, readiness,
    engines: {
      rulesActive: (s.rules || []).filter(r => r.on).length,
      rulesTotal: (s.rules || []).length,
      mlAnomalies: mlStats?.cnt || 0,
      mlBaselines: mlStats?.bases || 0,
      graphAlerts: graphAlerts.length,
    },
  };
}

export function exportSystemReport(s) {
  const d = buildSystemReportData(s);
  const now = d.generatedAt.toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
  const sc = d.readiness >= 80 ? '#22C55E' : d.readiness >= 60 ? '#F59E0B' : '#EF4444';

  const sevRow = (label, color) => {
    const n = d.sevCounts[label] || 0;
    const pct = ((n / d.totalAlerts) * 100).toFixed(1);
    return `<tr><td><span class="badge" style="background:${color}1A;color:${color};border:1px solid ${color}40">${label}</span></td><td>${n}</td><td>${pct}%</td></tr>`;
  };

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>FraudGuard Findings Report — ${d.generatedAt.toISOString().slice(0,10)}</title>
<style>
  body{font-family:Arial,sans-serif;font-size:12px;color:#212427;margin:40px;line-height:1.6}
  h1{font-size:21px;color:#1F3A5F;border-bottom:3px solid #3D5A99;padding-bottom:8px}
  h2{font-size:14px;color:#3D5A99;border-left:4px solid #3D5A99;padding-left:9px;margin:26px 0 8px}
  table{width:100%;border-collapse:collapse;margin:8px 0 14px}
  td,th{border:1px solid #E4E7EB;padding:6px 10px;font-size:11px;text-align:left}
  th{background:#1F3A5F;color:#fff;font-weight:600}
  tr:nth-child(even){background:#F4F5F7}
  .badge{display:inline-block;padding:2px 9px;border-radius:12px;font-size:10px;font-weight:700}
  .stat-grid{display:flex;gap:14px;margin:12px 0 20px;flex-wrap:wrap}
  .stat{flex:1;min-width:130px;background:#F4F5F7;border:1px solid #E4E7EB;border-radius:8px;padding:12px 14px}
  .stat .v{font-size:22px;font-weight:800;color:#1F3A5F}
  .stat .l{font-size:9.5px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:#6B7280;margin-top:2px}
  .box{background:#EEF1F4;border:1px solid #C9D2DE;border-radius:6px;padding:12px;margin:10px 0;font-size:11.5px}
  .footer{margin-top:36px;border-top:1px solid #E4E7EB;padding-top:10px;font-size:10px;color:#9AA3AF;text-align:center}
  .readiness{font-size:40px;font-weight:900;color:${sc}}
</style></head><body>

<h1>🛡 FraudGuard™ Grant Intelligence — Findings Report</h1>
<div style="display:flex;justify-content:space-between;font-size:11px;color:#6B7280;margin-bottom:10px">
  <span><b>Generated:</b> ${now}</span>
  <span><b>System:</b> FraudGuard Grant Intelligence v4.1 Enterprise</span>
  <span><b>Dataset:</b> DS1–DS6 (${d.totalTxns} transactions)</span>
</div>

<div class="box"><b>Executive Summary</b><br>
Across ${d.totalTxns} transactions (${fmt(d.totalAmount)} total disbursed), FraudGuard's three-engine hybrid detection (rules + ML + graph analytics) identified ${d.totalAlerts} alerts, of which ${d.critHigh} remain open at CRITICAL/HIGH severity, representing ${fmt(d.riskExposure)} in flagged risk exposure. ${d.totalCases} case(s) have been opened for investigation. Current OMB 2 CFR 200 audit readiness stands at ${d.readiness}%.
</div>

<div class="stat-grid">
  <div class="stat"><div class="v">${d.totalTxns}</div><div class="l">Transactions</div></div>
  <div class="stat"><div class="v">${d.openAlerts}</div><div class="l">Open Alerts</div></div>
  <div class="stat"><div class="v">${fmt(d.riskExposure)}</div><div class="l">Risk Exposure</div></div>
  <div class="stat"><div class="v">${d.openCases}</div><div class="l">Open Cases</div></div>
  <div class="stat"><div class="v" style="color:${sc}">${d.readiness}%</div><div class="l">Audit Readiness</div></div>
</div>

<h2>1. Detection Engine Overview</h2>
<table><tr><th>Engine</th><th>Coverage</th><th>Output</th></tr>
  <tr><td>Rules Engine</td><td>${d.engines.rulesActive} / ${d.engines.rulesTotal} rules active</td><td>${d.sevCounts.CRITICAL + d.sevCounts.HIGH + d.sevCounts.MEDIUM + d.sevCounts.LOW} rule-based alerts</td></tr>
  <tr><td>ML Z-Score Engine</td><td>${d.engines.mlBaselines} vendor/category baselines</td><td>${d.engines.mlAnomalies} statistical anomalies flagged</td></tr>
  <tr><td>Graph Analytics Engine</td><td>Vendor relationship network</td><td>${d.engines.graphAlerts} network-pattern alerts</td></tr>
</table>

<h2>2. Alert Severity Breakdown</h2>
<table><tr><th>Severity</th><th>Count</th><th>% of Total</th></tr>
  ${sevRow('CRITICAL', '#EF4444')}
  ${sevRow('HIGH', '#F97316')}
  ${sevRow('MEDIUM', '#F59E0B')}
  ${sevRow('LOW', '#22C55E')}
  ${sevRow('INFORMATIONAL', '#6B7280')}
</table>

<h2>3. Top Risk Vendors</h2>
<table><tr><th>Vendor</th><th>Region</th><th>Alert Count</th><th>Risk Score</th><th>Debarment</th></tr>
${d.topVendors.length ? d.topVendors.map(v => `<tr><td><b>${v.name}</b></td><td>${v.region||'N/A'}</td><td>${v.alertCount}</td><td>${v.score}/100</td><td>${v.debar ? '<b style="color:#EF4444">DEBARRED</b>' : 'Active'}</td></tr>`).join('') : '<tr><td colspan="5">No vendors with active alerts.</td></tr>'}
</table>

<h2>4. Case Management Summary</h2>
<table><tr><th>Status</th><th>Count</th></tr>
  ${CASE_STATUSES.map(st => `<tr><td>${st.replace('_',' ')}</td><td>${d.caseStatusCounts[st] || 0}</td></tr>`).join('')}
</table>

<h2>5. OMB 2 CFR 200 Compliance Readiness</h2>
<div style="display:flex;align-items:center;gap:20px;margin-bottom:10px">
  <div class="readiness">${d.readiness}%</div>
  <div style="font-size:11.5px;color:#6B7280">${d.effective} of ${d.matrix.length} internal controls currently effective (COSO / GAO Green Book aligned)</div>
</div>
<table><tr><th>ID</th><th>Control</th><th>COSO</th><th>GAO</th><th>OMB Citation</th><th>Status</th></tr>
${d.matrix.map(c => `<tr><td><b>${c.id}</b></td><td>${c.ctrl}</td><td>${c.coso}</td><td>${c.gao}</td><td>${c.omb}</td><td>${c.ok ? '<span class="badge" style="background:#22C55E1A;color:#22C55E;border:1px solid #22C55E40">✓ EFFECTIVE</span>' : '<span class="badge" style="background:#EF44441A;color:#EF4444;border:1px solid #EF444440">✗ DEFICIENT</span>'}</td></tr>`).join('')}
</table>

<div class="footer">
  FraudGuard Grant Intelligence Platform v4.1 Enterprise · Muhammad Bilal FCA FCCA CFA<br>
  OMB 2 CFR 200 · GAO Green Book · COSO · Dataset: DS1–DS6 · MIT License<br>
  CONFIDENTIAL – Authorized Personnel Only · ${now}
</div></body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `FraudGuard_Findings_Report_${d.generatedAt.toISOString().slice(0,10)}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
