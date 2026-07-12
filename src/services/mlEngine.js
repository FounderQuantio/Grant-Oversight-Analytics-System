/**
 * ML Engine — Real Z-score statistical anomaly detection.
 * Pure functions; no React dependencies.
 */

/** Compute per-grant/category mean and std deviation */
export function computeBaselines(txns) {
  const G = {};
  for (const t of txns) {
    if (!t.amount) continue;
    const k = `${t.grantId}|${t.category}`;
    if (!G[k]) G[k] = [];
    G[k].push(t.amount);
  }
  const B = {};
  for (const [k, vs] of Object.entries(G)) {
    const n = vs.length;
    const m = vs.reduce((a, b) => a + b, 0) / n;
    const sd = Math.sqrt(vs.reduce((s, x) => s + Math.pow(x - m, 2), 0) / Math.max(n, 1));
    B[k] = { m, sd, n };
  }
  return B;
}

/** Run Z-score ML anomaly detection (mutates txns.mlZ / mlFlag) */
export function runML(txns) {
  const B = computeBaselines(txns);
  const mlAlerts = [];
  for (const t of txns) {
    if (!t.amount) continue;
    const b = B[`${t.grantId}|${t.category}`];
    if (!b || b.sd < 1 || b.n < 3) continue;
    const z = (t.amount - b.m) / b.sd;
    t.mlZ    = parseFloat(z.toFixed(2));
    t.mlFlag = Math.abs(z) > 2.5;
    if (t.mlFlag) {
      mlAlerts.push({
        txnId: t.id, z, mean: b.m, sd: b.sd,
        dir: z > 0 ? 'OVER' : 'UNDER',
        sc:  Math.min(100, Math.round(Math.abs(z) * 12)),
        desc: `$${t.amount.toLocaleString()} deviates ${Math.abs(z).toFixed(1)}σ from "${t.category}" mean`,
      });
    }
  }
  return { mlAlerts, B };
}

/** Detect velocity anomalies: 2.5× increase month-over-month per grant */
export function velAnomalies(txns) {
  const now = Date.now();
  const G = {};
  for (const t of txns) {
    if (!G[t.grantId]) G[t.grantId] = [];
    G[t.grantId].push(t);
  }
  const out = [];
  for (const [gid, ts] of Object.entries(G)) {
    const c = ts.filter(t => new Date(t.date) >= new Date(now - 30 * 864e5))
               .reduce((s, t) => s + t.amount, 0);
    const p = ts.filter(t => new Date(t.date) >= new Date(now - 60 * 864e5) &&
                             new Date(t.date) <  new Date(now - 30 * 864e5))
               .reduce((s, t) => s + t.amount, 0);
    if (p > 0 && c / p > 2.5) out.push({ gid, ratio: (c / p).toFixed(1), cur: c, prev: p });
  }
  return out;
}

/** Composite Grant Risk Score (CGRS) */
export function cgrs(rPts, mlZ, gScore = 0) {
  const ml = Math.min(100, Math.abs(mlZ || 0) * 12);
  const s  = Math.round(Math.min(100, rPts) * 0.45 + ml * 0.35 + Math.min(100, gScore) * 0.20);
  if (s >= 70) return { s, tier: 'CRITICAL',      color: '#C0392B' };
  if (s >= 50) return { s, tier: 'HIGH',           color: '#C05621' };
  if (s >= 30) return { s, tier: 'MEDIUM',         color: '#92640A' };
  if (s >= 10) return { s, tier: 'LOW',            color: '#166534' };
  return           { s, tier: 'INFORMATIONAL', color: '#475569' };
}

/** Apply composite scores to all transactions (mutates in place) */
export function scoreAll(txns, alerts, graphScoreByVendor = {}) {
  const out = [...txns];
  for (const t of out) {
    const ta   = alerts.filter(a => a.txnId === t.id);
    const rPts = Math.min(100, ta.reduce((s, a) => s + (a.pts || 0), 0));
    const gScore = graphScoreByVendor[t.vendorId] || 0;
    const { s, tier, color } = cgrs(rPts, t.mlZ, gScore);
    t.riskScore = s;
    t.riskTier  = tier;
    t.riskColor = color;
    t.ruleScore = rPts;
    t.graphScore = gScore;
    t.mlScore   = Math.min(100, Math.round(Math.abs(t.mlZ || 0) * 12));
    t.alertIds  = ta.map(a => a.id);
  }
  return out;
}
