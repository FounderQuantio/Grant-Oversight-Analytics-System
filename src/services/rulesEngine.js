// Rules Engine — OMB 2 CFR 200 violation detection
// R001-R010: all 10 detection rules

export const INIT_RULES = [
  {id:"R001",name:"Duplicate Invoice",           on:true,sev:"HIGH",     omb:"2 CFR 200.305(b)", thr:null,   cat:"Financial"},
  {id:"R002",name:"New Vendor Large Pay",         on:true,sev:"HIGH",     omb:"2 CFR 200.318",    thr:50000,  cat:"Vendor"},
  {id:"R003",name:"Overbudget Category",          on:true,sev:"MEDIUM",   omb:"2 CFR 200.405",    thr:1.1,    cat:"Budget"},
  {id:"R005",name:"Sole Source No Docs >$250K",   on:true,sev:"HIGH",     omb:"2 CFR 200.320",    thr:250000, cat:"Procurement"},
  {id:"R006",name:"Debarred Vendor",              on:true,sev:"CRITICAL", omb:"2 CFR 200.213",    thr:null,   cat:"Vendor"},
  {id:"R007",name:"Conflict of Interest",         on:true,sev:"CRITICAL", omb:"2 CFR 200.318(c)", thr:null,   cat:"Governance"},
  {id:"R008",name:"Period of Performance",        on:true,sev:"HIGH",     omb:"2 CFR 200.309",    thr:null,   cat:"Compliance"},
  {id:"R009",name:"Transaction Structuring",      on:true,sev:"HIGH",     omb:"31 U.S.C. 5324",   thr:50000,  cat:"Financial"},
  {id:"R010",name:"Missing Supporting Documents", on:true,sev:"MEDIUM",   omb:"2 CFR 200.302",    thr:null,   cat:"Documentation"},
];

const CTRL_INLINE = {
  R001:{ctrl:"CC-001",coso:"Control Activities",  gao:"OV1.10",fix:"Reject duplicate. Require unique invoice numbers per vendor per grant year per 2 CFR 200.305(b)."},
  R002:{ctrl:"CC-007",coso:"Control Activities",  gao:"AM2.02",fix:"Suspend payment. Verify vendor registration >= 90 days. Re-run SAM.gov check per 2 CFR 200.318."},
  R003:{ctrl:"CC-008",coso:"Monitoring",          gao:"OV1.05",fix:"Freeze category. Prepare budget modification SF-424A. Get grants officer approval per 2 CFR 200.405."},
  R005:{ctrl:"CC-002",coso:"Control Activities",  gao:"AM1.03",fix:"Suspend payment. Require competitive bid or sole-source justification >$250K per 2 CFR 200.320(f)."},
  R006:{ctrl:"CC-003",coso:"Control Environment", gao:"AM2.01",fix:"IMMEDIATE HOLD. Terminate contract. Report to OIG within 48hrs. Deobligate funds per 2 CFR 200.213."},
  R007:{ctrl:"CC-004",coso:"Control Environment", gao:"OV2.01",fix:"IMMEDIATE HOLD. Remove conflicted official. Refer to Ethics Office per 2 CFR 200.318(c)."},
  R008:{ctrl:"CC-005",coso:"Monitoring",          gao:"OV1.05",fix:"Hold pending disallowance review. Return unallowable costs to awarding agency per 2 CFR 200.309."},
  R009:{ctrl:"CC-009",coso:"Control Activities",  gao:"AM1.05",fix:"HOLD all payments in pattern. File SAR with FinCEN within 30 days per 31 U.S.C. 5324."},
  R010:{ctrl:"CC-010",coso:"Control Activities",  gao:"AM3.01",fix:"Hold payment until documentation provided. Request receipts and contracts per 2 CFR 200.302."},
};

export function humanLabel(ruleId, meta, txn, ven) {
  const amt = txn ? `$${(txn.amount||0).toLocaleString()}` : "";
  const vid = ven ? (ven.short||ven.id) : (txn ? txn.vendorId : "");
  switch(ruleId) {
    case "R001": return `Duplicate invoice ${meta.inv||""} — ${vid} → ${txn&&txn.grantId||""}`;
    case "R002": return `New vendor (${meta.days}d old) payment ${amt} — ${vid}`;
    case "R003": return `Budget overrun ${meta.pct}% in ${txn&&txn.category} — ${txn&&txn.grantId||""}`;
    case "R005": return `Sole-source >$250K without bid docs — ${vid} (${amt})`;
    case "R006": return `Payment to debarred vendor ${vid} — ${txn&&txn.grantId||""}`;
    case "R007": return `Conflict of interest: ${vid} — ${txn&&txn.grantId||""}`;
    case "R008": return `Transaction ${meta.over}d after grant end — ${vid}`;
    case "R009": return `Structuring: ${meta.count} payments just below $50K — ${vid}`;
    case "R010": return `Missing supporting documents: Invoice ${meta.inv||"N/A"}`;
    default:     return `Violation ${ruleId} — ${vid}`;
  }
}

export function mkAlert(ruleId, txn, ven, meta, sev, rules) {
  const rule = (rules||INIT_RULES).find(r=>r.id===ruleId)||{sev:"MEDIUM",omb:"2 CFR 200"};
  const cm   = CTRL_INLINE[ruleId]||{ctrl:"CC-GEN",coso:"General",gao:"N/A",fix:"Review and remediate."};
  const label = humanLabel(ruleId, meta||{}, txn, ven);
  return {
    id:`ALT-${ruleId}-${txn.id}`,
    ruleId, severity: sev||rule.sev||"MEDIUM",
    txnId:txn.id, vendorId:txn.vendorId, grantId:txn.grantId,
    amount:txn.amount, omb:rule.omb||"2 CFR 200",
    label, desc:label, fix:cm.fix,
    ctrl:cm.ctrl, coso:cm.coso, gao:cm.gao,
    meta, status:"OPEN", hold:false,
    ts:new Date().toISOString(),
  };
}

export function runRules(txns, vens, rules) {
  const active = (rules||INIT_RULES).filter(r=>r.on).map(r=>r.id);
  const alerts = [];

  if(active.includes("R001")) {
    const seen = {};
    txns.forEach(t=>{
      if(!t.invoiceRef) return;
      const k = `${t.vendorId}::${t.invoiceRef}`;
      if(seen[k]) {
        const ven = vens.find(v=>v.id===t.vendorId);
        alerts.push(mkAlert("R001",t,ven,{inv:t.invoiceRef,dupOf:seen[k]},"HIGH",rules));
      } else { seen[k]=t.id; }
    });
  }

  if(active.includes("R002")) {
    txns.forEach(t=>{
      const ven=vens.find(v=>v.id===t.vendorId);
      if(!ven) return;
      const days=Math.floor((new Date(t.date)-new Date(ven.reg))/(864e5));
      if(days>=0&&days<90&&(t.amount||0)>50000)
        alerts.push(mkAlert("R002",t,ven,{days},"HIGH",rules));
    });
  }

  if(active.includes("R003")) {
    const catSpend={};
    txns.forEach(t=>{const k=`${t.grantId}::${t.category}`;catSpend[k]=(catSpend[k]||0)+(t.amount||0);});
    const BUDGET_LIMIT=500000;
    Object.entries(catSpend).forEach(([k,sp])=>{
      if(sp>BUDGET_LIMIT*1.1) {
        const t=txns.find(x=>k.startsWith(x.grantId));
        if(t){const ven=vens.find(v=>v.id===t.vendorId);alerts.push(mkAlert("R003",t,ven,{pct:Math.round((sp/BUDGET_LIMIT)*100)},"MEDIUM",rules));}
      }
    });
  }

  if(active.includes("R005")) {
    txns.forEach(t=>{
      if(t.procType==="Sole Source"&&(t.amount||0)>250000&&!t.hasBidDoc){
        const ven=vens.find(v=>v.id===t.vendorId);
        alerts.push(mkAlert("R005",t,ven,{},"HIGH",rules));
      }
    });
  }

  if(active.includes("R006")) {
    txns.forEach(t=>{
      const ven=vens.find(v=>v.id===t.vendorId);
      if(ven&&ven.debar) alerts.push(mkAlert("R006",t,ven,{},"CRITICAL",rules));
    });
  }

  if(active.includes("R007")) {
    txns.forEach(t=>{
      const ven=vens.find(v=>v.id===t.vendorId);
      if(ven&&ven.coi) alerts.push(mkAlert("R007",t,ven,{},"CRITICAL",rules));
    });
  }

  if(active.includes("R008")) {
    txns.forEach(t=>{
      if(!t.grantEnd) return;
      const over=Math.floor((new Date(t.date)-new Date(t.grantEnd))/(864e5));
      if(over>0){const ven=vens.find(v=>v.id===t.vendorId);alerts.push(mkAlert("R008",t,ven,{over},"HIGH",rules));}
    });
  }

  if(active.includes("R009")) {
    const vgP={};
    txns.forEach(t=>{
      const k=`${t.vendorId}::${t.grantId}`;
      vgP[k]=vgP[k]||[];
      if((t.amount||0)>=40000&&(t.amount||0)<50000) vgP[k].push(t);
    });
    Object.entries(vgP).forEach(([,pmts])=>{
      if(pmts.length>=3) pmts.forEach(t=>{
        const ven=vens.find(v=>v.id===t.vendorId);
        alerts.push(mkAlert("R009",t,ven,{count:pmts.length},"HIGH",rules));
      });
    });
  }

  if(active.includes("R010")) {
    txns.forEach(t=>{
      if(t.missingAmt||(t.amount===0&&!t.invoiceRef)){
        const ven=vens.find(v=>v.id===t.vendorId);
        alerts.push(mkAlert("R010",t,ven,{inv:t.invoiceRef},"MEDIUM",rules));
      }
    });
  }

  return alerts;
}