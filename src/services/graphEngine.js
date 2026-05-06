/**
 * Graph Engine — Entity relationship fraud detection.
 * Detects: shared address, shared bank routing, multi-hop networks, procurement concentration.
 */
export function runGraph(txns, vens) {
  const out = [];

  const grp = (arr, k) => arr.reduce((acc, x) => {
    const v = x[k];
    if (!v) return acc;
    (acc[v] = acc[v] || []).push(x);
    return acc;
  }, {});

  const aG = grp(vens, 'addr');
  const bG = grp(vens, 'bank');

  for (const [v, g] of Object.entries(aG)) {
    if (g.length > 1)
      out.push({ type:'SHARED_ADDRESS', sev:'HIGH', entities:g.map(x=>x.name), gs:65,
        desc:`${g.length} vendors share address "${v.slice(0,40)}"` });
  }
  for (const [v, g] of Object.entries(bG)) {
    if (g.length > 1)
      out.push({ type:'SHARED_BANK_ROUTING', sev:'HIGH', entities:g.map(x=>x.name), gs:70,
        desc:`${g.length} vendors share bank routing "${v}"` });
  }

  // Multi-hop network detection
  for (let i = 0; i < vens.length; i++) {
    for (let j = i + 1; j < vens.length; j++) {
      const v1 = vens[i], v2 = vens[j];
      const sh = (v1.addr === v2.addr && v1.addr) || (v1.bank === v2.bank && v1.bank);
      if (!sh) continue;
      const g1 = txns.filter(t => t.vendorId === v1.id).map(t => t.grantId);
      const g2 = txns.filter(t => t.vendorId === v2.id).map(t => t.grantId);
      const shared = [...new Set(g1.filter(g => g2.includes(g)))];
      if (shared.length)
        out.push({ type:'MULTI_HOP_NETWORK', sev:'CRITICAL',
          path: [v1.name, '↔', v2.name], sharedGrants: shared, gs: 90,
          desc:`${v1.short||v1.name} & ${v2.short||v2.name} share attributes AND receive same-grant funds` });
    }
  }

  // Procurement concentration (vendor >40% of single grant spend)
  const byG = {};
  for (const t of txns) {
    if (!byG[t.grantId]) byG[t.grantId] = [];
    byG[t.grantId].push(t);
  }
  for (const [gid, ts] of Object.entries(byG)) {
    const tot = ts.reduce((s, t) => s + t.amount, 0);
    if (!tot) continue;
    const vs = {};
    for (const t of ts) vs[t.vendorId] = (vs[t.vendorId] || 0) + t.amount;
    for (const [vid, sp] of Object.entries(vs)) {
      const pct = sp / tot;
      if (pct >= 0.4) {
        const vn = vens.find(v => v.id === vid);
        out.push({ type:'PROCUREMENT_CONCENTRATION', sev: pct > 0.7 ? 'HIGH' : 'MEDIUM',
          grantId: gid, vendor: vn?.name || vid,
          pct: parseFloat((pct * 100).toFixed(1)),
          gs: Math.round(pct * 80),
          desc:`"${vn?.name||vid}" received ${(pct*100).toFixed(1)}% of ${gid} spend` });
      }
    }
  }
  return out;
}
