import { useState } from "react";
import { DS, RM } from "@/utils/tokens";

export default function Explain({ alert, txn, ven }) {
  const [whatIf, setWI] = useState(false);
  if(!alert) return null;
  const drvs = [];
  if(alert.ruleId==="R006") drvs.push({l:"SAM.gov debarment",       pts:40,c:DS.critical,d:"Vendor on active federal exclusion list"});
  if(alert.ruleId==="R007") drvs.push({l:"Conflict of interest",    pts:40,c:DS.critical,d:(ven&&ven.coiDetail)||"Entity relationship conflict"});
  if(alert.ruleId==="R001") drvs.push({l:"Duplicate invoice",       pts:25,c:DS.high,    d:`Matches prior transaction ${alert.meta&&alert.meta.dupOf}`});
  if(alert.ruleId==="R002") drvs.push({l:"New vendor large pay",    pts:25,c:DS.high,    d:`Vendor only ${alert.meta&&alert.meta.days}d old at payment`});
  if(alert.ruleId==="R005") drvs.push({l:"Sole-source undocumented",pts:25,c:DS.high,    d:"No competitive bid for >$250K contract"});
  if(alert.ruleId==="R008") drvs.push({l:"Post-period expenditure", pts:25,c:DS.high,    d:`${alert.meta&&alert.meta.over}d after grant end`});
  if(alert.ruleId==="R009") drvs.push({l:"Transaction structuring", pts:25,c:DS.high,    d:`${alert.meta&&alert.meta.count} payments just below $50K threshold`});
  if(alert.ruleId==="R010") drvs.push({l:"Missing documentation",   pts:15,c:DS.medium,  d:`Invoice ${alert.meta&&alert.meta.inv} lacks required docs`});
  if(txn&&txn.mlFlag)        drvs.push({l:`Statistical outlier (${txn.mlZ>0?"+":""}${txn.mlZ}σ)`,pts:Math.min(35,Math.round(Math.abs(txn.mlZ||0)*8)),c:DS.purple,d:"Amount outside 2.5σ category baseline"});
  const maxPts = drvs.reduce((s,x)=>s+x.pts,0)||1;
  const cfs = [];
  if(alert.ruleId==="R002") cfs.push("If vendor age >90 days → score drops by 25pts");
  if(alert.ruleId==="R009") cfs.push("If payments above $50K threshold → structuring flag cleared");
  if(txn&&txn.mlFlag)        cfs.push("If amount within 2σ of baseline → ML contributes 0pts");

  return (
    <div style={{marginTop:16,borderTop:`1px solid ${DS.bd}`,paddingTop:14}}>
      <div style={{fontSize:10,fontWeight:700,color:DS.t4,letterSpacing:.5,textTransform:"uppercase",marginBottom:10}}>🧠 AI Risk Explanation</div>
      {drvs.map((dr,i)=>(
        <div key={i} style={{marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}>
            <span style={{color:DS.t2}}>{dr.l}</span>
            <span style={{fontWeight:700,color:dr.c}}>+{dr.pts}pts</span>
          </div>
          <div style={{height:6,background:`${dr.c}20`,borderRadius:3,overflow:"hidden"}}>
            <div style={{width:`${(dr.pts/maxPts)*100}%`,height:"100%",background:dr.c,borderRadius:3,transition:"width .5s ease"}}/>
          </div>
          <div style={{fontSize:10,color:DS.t4,marginTop:2}}>{dr.d}</div>
        </div>
      ))}
      <div style={{padding:"9px 11px",background:DS.s2,borderRadius:DS.r2,border:`1px solid ${DS.bd}`,margin:"12px 0",fontSize:11,color:DS.t2,lineHeight:1.6}}>
        <strong style={{color:DS.t1}}>Plain-English: </strong>
        This transaction is <strong style={{color:RM[alert.severity]&&RM[alert.severity].color}}>{alert.severity}</strong> risk
        {drvs[0]&&<> primarily because <em>{drvs[0].l.toLowerCase()}</em> ({drvs[0].d})</>}
        {drvs[1]&&<>, and also because <em>{drvs[1].l.toLowerCase()}</em></>}.
        {" "}Action required per <strong>{alert.omb}</strong>.
      </div>
      <button onClick={()=>setWI(p=>!p)} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:DS.p2,fontWeight:600,padding:0,display:"flex",alignItems:"center",gap:4,marginBottom:8}}>
        {whatIf?"▼":"▶"} What-If Simulation
      </button>
      {whatIf&&(
        <div style={{padding:"9px 11px",background:"#FFFBEB",borderRadius:DS.r2,border:"1px solid #FDE68A",marginBottom:10}}>
          <div style={{fontSize:10,fontWeight:700,color:DS.warn,marginBottom:5}}>If conditions were resolved:</div>
          {cfs.length ? cfs.map((cf,i)=>(
            <div key={i} style={{fontSize:11,color:DS.t2,marginBottom:3,display:"flex",gap:5}}>
              <span style={{color:DS.ok,fontWeight:700}}>→</span>{cf}
            </div>
          )) : <div style={{fontSize:11,color:DS.t3}}>No direct counterfactuals for this rule type.</div>}
        </div>
      )}
      <div style={{padding:"9px 11px",background:DS.cBg,borderRadius:DS.r2,border:`1px solid ${DS.cBd}`}}>
        <div style={{fontSize:10,fontWeight:700,color:DS.critical,marginBottom:3}}>Required Corrective Action · {alert.omb}</div>
        <div style={{fontSize:11,color:DS.t2,lineHeight:1.5}}>{alert.fix}</div>
      </div>
    </div>
  );
}