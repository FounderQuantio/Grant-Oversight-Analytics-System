/**
 * Report Export — generates OIG-style HTML audit evidence packages.
 * Triggered from the Case Management view.
 */
import { CTRL_MAP } from '../data/controlMap.js';

export function exportReport(c, alerts, txns, vens) {
  const t   = txns.find(x => x.id === c.txnId);
  const v   = vens.find(x => x.id === c.vendorId);
  const ta  = alerts.filter(a => a.txnId === c.txnId);
  const now = new Date().toLocaleString('en-US', { dateStyle:'long', timeStyle:'short' });
  const sl  = (c.severity || '').toLowerCase();

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>FraudGuard Report – ${c.id}</title>
<style>
  body{font-family:Arial,sans-serif;font-size:12px;color:#1e293b;margin:40px;line-height:1.6}
  h1{font-size:20px;color:#0F4C8A;border-bottom:3px solid #1A6DD4;padding-bottom:8px}
  h2{font-size:14px;color:#1A6DD4;border-left:4px solid #1A6DD4;padding-left:9px;margin:22px 0 8px}
  table{width:100%;border-collapse:collapse;margin:8px 0 14px}
  td,th{border:1px solid #e2e8f0;padding:6px 10px;font-size:11px}
  th{background:#0A2540;color:#fff;font-weight:600}
  tr:nth-child(even){background:#f8fafc}
  .badge{display:inline-block;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700}
  .critical{background:#FDF2F1;color:#C0392B;border:1px solid #FBBCB6}
  .high{background:#FFF7ED;color:#C05621;border:1px solid #FBD38D}
  .medium{background:#FFFBEB;color:#92640A;border:1px solid #FDE68A}
  .low{background:#F0FDF4;color:#166534;border:1px solid #BBF7D0}
  .box{background:#EBF3FF;border:1px solid #BFDBFE;border-radius:6px;padding:12px;margin:10px 0}
  .alert-row{background:#FDF2F1;border:1px solid #FBBCB6;border-left:4px solid #C0392B;border-radius:4px;padding:10px;margin:6px 0}
  .footer{margin-top:36px;border-top:1px solid #e2e8f0;padding-top:10px;font-size:10px;color:#94a3b8;text-align:center}
</style></head><body>
<h1>⚖ OIG Investigation Report — Audit Evidence Package</h1>
<div style="display:flex;justify-content:space-between;font-size:11px;color:#64748b;margin-bottom:18px">
  <span><b>Case:</b> ${c.id}</span>
  <span><b>Generated:</b> ${now}</span>
  <span><b>System:</b> FraudGuard Grant Intelligence v4.1 Enterprise</span>
</div>
<div class="box"><b>Executive Summary</b><br>
This report documents a <span class="badge ${sl}">${c.severity}</span> severity compliance finding detected by FraudGuard automated rule-based and statistical anomaly detection, aligned with OMB 2 CFR 200 Uniform Guidance.
</div>
<h2>1. Case Details</h2>
<table><tr><th>Field</th><th>Value</th></tr>
  <tr><td>Case ID</td><td>${c.id}</td></tr>
  <tr><td>Severity</td><td><span class="badge ${sl}">${c.severity}</span></td></tr>
  <tr><td>Status</td><td>${c.status}</td></tr>
  <tr><td>Grant Program</td><td>${c.grantId||'N/A'}</td></tr>
  <tr><td>Regulatory Reference</td><td>${c.omb||'N/A'}</td></tr>
  <tr><td>Detection Rule</td><td>${c.ruleId} – ${c.label||c.desc||''}</td></tr>
  <tr><td>Date Created</td><td>${new Date(c.created).toLocaleDateString()}</td></tr>
  <tr><td>Payment Hold</td><td>${t&&t.hold?"<b style='color:#C0392B'>YES – PAYMENT FLAGGED</b>":'No'}</td></tr>
</table>
<h2>2. Transaction Details</h2>
${t ? `<table><tr><th>Field</th><th>Value</th></tr>
  <tr><td>Transaction ID</td><td>${t.id}</td></tr>
  <tr><td>Amount</td><td><b>$${(t.amount||0).toLocaleString()}</b></td></tr>
  <tr><td>Date</td><td>${t.date}</td></tr>
  <tr><td>Cost Category</td><td>${t.category}</td></tr>
  <tr><td>Invoice Ref</td><td>${t.invoiceRef||'N/A'}</td></tr>
  <tr><td>Procurement Type</td><td>${t.procType||'N/A'}</td></tr>
  <tr><td>Risk Score (CGRS)</td><td>${t.riskScore}/100 — ${t.riskTier}</td></tr>
  <tr><td>ML Anomaly</td><td>${t.mlFlag?'Yes – Z-Score: '+t.mlZ:'No'}</td></tr>
</table>` : '<p>Transaction details unavailable.</p>'}
<h2>3. Vendor Profile</h2>
${v ? `<table><tr><th>Field</th><th>Value</th></tr>
  <tr><td>Vendor Name</td><td><b>${v.name}</b></td></tr>
  <tr><td>Region</td><td>${v.region}</td></tr>
  <tr><td>Tax ID</td><td>${v.taxId||'N/A'}</td></tr>
  <tr><td>Registration Date</td><td>${v.reg||'N/A'}</td></tr>
  <tr><td>SAM.gov Status</td><td>${v.sam?'✓ Registered':'✗ NOT Registered'}</td></tr>
  <tr><td>Debarment Status</td><td><b style="color:${v.debar?'#C0392B':'#166534'}">${v.debar?'DEBARRED':'Active – No Exclusion'}</b></td></tr>
  <tr><td>Conflict of Interest</td><td>${v.coi?'YES – '+(v.coiDetail||''):'None identified'}</td></tr>
</table>` : '<p>Vendor details unavailable.</p>'}
<h2>4. Triggered Detection Rules</h2>
${ta.map(a=>`<div class="alert-row">
  <b>${a.ruleId}</b> <span class="badge ${(a.severity||'').toLowerCase()}">${a.severity}</span> · ${a.omb}<br>
  <em>${a.label||a.desc}</em><br>
  <b>Control Failure:</b> ${a.ctrl||'N/A'} · <b>COSO:</b> ${a.coso||'N/A'} · <b>GAO:</b> ${a.gao||'N/A'}
</div>`).join('')||'<p>No rule violations recorded.</p>'}
<h2>5. Required Corrective Action</h2>
<div class="alert-row">${c.fix||CTRL_MAP[c.ruleId]?.fix||'Review findings and take appropriate corrective action per OMB 2 CFR 200.'}</div>
<h2>6. Investigation Notes</h2>
${c.notes?.length ? c.notes.map(n=>`<div style="margin:5px 0;padding:6px 10px;background:#f8fafc;border-radius:4px;border:1px solid #e2e8f0"><b>${n.author}</b> · ${new Date(n.ts).toLocaleString()}<br>${n.text}</div>`).join('') : '<p>No investigation notes recorded.</p>'}
<h2>7. Evidence Bundle</h2>
<table><tr><th>Type</th><th>Reference</th><th>Date</th></tr>
${c.evidence?.length ? c.evidence.map(e=>`<tr><td>${e.type}</td><td>${e.ref}</td><td>${new Date(e.ts).toLocaleDateString()}</td></tr>`).join('') : "<tr><td colspan='3'>No evidence records.</td></tr>"}
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
  a.download = `FraudGuard_${c.id}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
