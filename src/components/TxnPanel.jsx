import { DS, RM, SEV_O } from "@/utils/tokens";
import { Badge, Chip, Card, Sec, Btn } from "@/components/ui";
import Explain from "@/components/Explainability";
import { useAppState } from "@/context/AppContext";

export default function TxnPanel({ txn, alerts, vens, onClose, onCase }) {
  const { d } = useAppState();
  const ven = vens.find(v=>v.id===txn.vendorId);
  const ta  = alerts.filter(a=>a.txnId===txn.id).sort((a,b)=>SEV_O[a.severity]-SEV_O[b.severity]);
  const rm  = RM[txn.riskTier]||RM.INFORMATIONAL;
  const top = ta[0];
  return (
    <div style={{position:"fixed",top:0,right:0,bottom:0,width:500,background:DS.surface,boxShadow:DS.sh3,zIndex:800,display:"flex",flexDirection:"column",borderLeft:`1px solid ${DS.bd}`}}>
      {/* Header */}
      <div style={{padding:"13px 18px",borderBottom:`1px solid ${DS.bd}`,display:"flex",alignItems:"center",gap:10,background:DS.s2}}>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:DS.t3,padding:2,lineHeight:1}}>←</button>
        <div style={{flex:1}}>
          <h3 style={{margin:0,fontSize:15,fontWeight:800,color:DS.t1}}>{txn.id}</h3>
          <p style={{margin:0,fontSize:10,color:DS.t4}}>
            {txn.grantId} · {txn.date} ·{" "}
            {txn.csvRisk && <span style={{color:txn.csvRisk==="Fraud"?DS.critical:txn.csvRisk==="Suspicious"?DS.high:DS.ok}}>CSV: {txn.csvRisk}</span>}
          </p>
        </div>
        <Badge tier={txn.riskTier}/>
        {txn.hold && <Chip c={DS.critical} bg={DS.cBg} bd={DS.cBd} sm>⛔ Hold</Chip>}
      </div>

      {/* Body */}
      <div style={{flex:1,overflowY:"auto",padding:18}}>
        {/* CGRS Score */}
        <Card sx={{marginBottom:14,background:rm.bg,border:`1px solid ${rm.bd}`}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:38,fontWeight:900,color:rm.color,lineHeight:1}}>{txn.riskScore}</div>
              <div style={{fontSize:9,fontWeight:700,color:rm.color}}>CGRS</div>
            </div>
            <div style={{flex:1}}>
              <div style={{height:7,background:`${rm.color}20`,borderRadius:4,overflow:"hidden",marginBottom:7}}>
                <div style={{width:`${txn.riskScore}%`,height:"100%",background:rm.color,borderRadius:4,transition:"width .6s ease"}}/>
              </div>
              <div style={{display:"flex",gap:14,fontSize:11}}>
                <div><span style={{color:DS.t4}}>Rules: </span><strong style={{color:DS.t1}}>{txn.ruleScore||0}</strong></div>
                <div><span style={{color:DS.t4}}>ML: </span><strong style={{color:DS.t1}}>{txn.mlScore||0}</strong></div>
                {txn.mlFlag&&<Chip c={DS.purple} bg="#F5F3FF" bd="#DDD6FE" sm>σ={txn.mlZ}</Chip>}
              </div>
            </div>
          </div>
        </Card>

        {/* Transaction details */}
        <Card sx={{marginBottom:14}}>
          <Sec title="Transaction Details" mb={10}>
            {[["Amount",`$${(txn.amount||0).toLocaleString()}`],["Grant",txn.grantId],["Category",txn.category],["Invoice",txn.invoiceRef||"—"],["Procurement",txn.procType],["Date",txn.date],["Grant End",txn.grantEnd],["Region",txn.region||"—"],["CSV Risk Label",txn.csvRisk||"—"],["Supporting Docs",txn.hasBidDoc?"YES":"NO"],["Missing Docs",txn.missingAmt?"YES":"NO"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${DS.bd}`,fontSize:12}}>
                <span style={{color:DS.t4}}>{l}</span>
                <span style={{color:DS.t1,fontWeight:600}}>{v}</span>
              </div>
            ))}
          </Sec>
        </Card>

        {/* Vendor */}
        {ven && (
          <Card sx={{marginBottom:14}}>
            <Sec title="Linked Vendor" mb={10}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div style={{width:34,height:34,borderRadius:DS.r2,background:DS.p3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🏢</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:DS.t1}}>{ven.name}</div>
                  <div style={{fontSize:10,color:DS.t4}}>{ven.region} · {ven.cat}</div>
                </div>
                <div style={{display:"flex",gap:4}}>
                  {ven.debar&&<Chip c={DS.critical} bg={DS.cBg} bd={DS.cBd} sm>🚫 Debarred</Chip>}
                  {ven.coi&&<Chip c={DS.high} bg={DS.hBg} bd={DS.hBd} sm>⚠ COI</Chip>}
                  {ven.sam?<Chip c={DS.ok} bg={DS.lBg} bd={DS.lBd} sm>SAM ✓</Chip>:<Chip c={DS.critical} bg={DS.cBg} bd={DS.cBd} sm>SAM ✗</Chip>}
                </div>
              </div>
              {[["Tax ID",ven.taxId],["Reg. Date",ven.reg],["Bank Routing",ven.bank],["Address",ven.addr]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"3px 0",borderBottom:`1px solid ${DS.bd}`}}>
                  <span style={{color:DS.t4}}>{l}</span>
                  <span style={{fontWeight:600,color:DS.t1}}>{v}</span>
                </div>
              ))}
            </Sec>
          </Card>
        )}

        {/* Rule violations */}
        {ta.length>0 && (
          <Card sx={{marginBottom:14}}>
            <Sec title={`Rule Violations (${ta.length})`} sub="OMB 2 CFR 200" mb={10}>
              {ta.map(a=>(
                <div key={a.id} style={{padding:"9px",marginBottom:7,borderRadius:DS.r2,background:RM[a.severity]&&RM[a.severity].bg,border:`1px solid ${RM[a.severity]&&RM[a.severity].bd}`,borderLeft:`3px solid ${RM[a.severity]&&RM[a.severity].dot}`}}>
                  <div style={{display:"flex",gap:8,marginBottom:3}}>
                    <span style={{fontSize:10,fontWeight:700,fontFamily:"monospace",color:RM[a.severity]&&RM[a.severity].color}}>{a.ruleId}</span>
                    <Badge tier={a.severity} sm/>
                    <span style={{fontSize:9,color:DS.t4,marginLeft:"auto"}}>{a.omb}</span>
                  </div>
                  <p style={{margin:"0 0 3px",fontSize:11,color:DS.t2}}>{a.label||a.desc}</p>
                  {a.ctrl&&<div style={{fontSize:9,color:DS.t4}}>Control: {a.ctrl} · COSO: {a.coso} · GAO: {a.gao}</div>}
                </div>
              ))}
              {top&&<Explain alert={top} txn={txn} ven={ven}/>}
            </Sec>
          </Card>
        )}
        {ta.length===0&&<div style={{background:DS.lBg,border:`1px solid ${DS.lBd}`,borderRadius:DS.r2,padding:"10px 14px",fontSize:12,color:DS.ok,marginBottom:14}}>✓ No rule violations for this transaction.</div>}
      </div>

      {/* Footer actions */}
      <div style={{padding:"10px 18px",borderTop:`1px solid ${DS.bd}`,display:"flex",gap:8,flexWrap:"wrap",background:DS.s2}}>
        {ta.length>0&&<Btn onClick={()=>onCase(ta[0])} sz="sm">Create Case</Btn>}
        {!txn.hold&&ta.some(a=>a.severity==="CRITICAL")&&<Btn onClick={()=>d({type:"HOLD",id:txn.id})} v="danger" sz="sm">⛔ Mark Payment Hold</Btn>}
        {txn.hold&&<Chip c={DS.critical} bg={DS.cBg} bd={DS.cBd} sm>⛔ Payment On Hold</Chip>}
        <Btn onClick={onClose} v="secondary" sz="sm">Close</Btn>
      </div>
    </div>
  );
}