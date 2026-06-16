import React, { useState, useMemo } from "react";
import { DS, RM, SEV_O } from "@/utils/tokens";
import { Badge, Card, Inp, Btn, Empty } from "@/components/ui";
import { useAppState } from "@/context/AppContext";

export default function Alerts() {
  const { s, d } = useAppState();
  const [q,    setQ]    = useState("");
  const [sevF, setSevF] = useState("ALL");
  const [exp,  setExp]  = useState(null);
  const [created, setCreated] = useState(null);

  const filtered = useMemo(() =>
    [...s.alerts]
      .filter(a=>sevF==="ALL"||a.severity===sevF)
      .filter(a=>!q||((a.label||"").toLowerCase().includes(q.toLowerCase())||(a.desc||"").toLowerCase().includes(q.toLowerCase())||a.ruleId.includes(q.toUpperCase())||a.txnId.includes(q)))
      .sort((a,b)=>SEV_O[a.severity]-SEV_O[b.severity])
  , [s.alerts,sevF,q]);

  const mkCase = (a) => {
    const nc = {id:`CASE-${Date.now()}`,alertId:a.id,ruleId:a.ruleId,label:a.label,txnId:a.txnId,grantId:a.grantId,vendorId:a.vendorId,severity:a.severity,omb:a.omb,desc:a.desc,fix:a.fix,ctrl:a.ctrl,status:"OPEN",created:new Date().toISOString(),updated:new Date().toISOString(),notes:[],evidence:[{type:"ALERT",ref:a.id,ts:new Date().toISOString()}]};
    d({type:"CASE_NEW",v:nc});
    setCreated(nc.id);
    setTimeout(()=>setCreated(null),3000);
  };

  const sc = useMemo(() => {
    const c = {ALL:s.alerts.length,CRITICAL:0,HIGH:0,MEDIUM:0,LOW:0};
    s.alerts.forEach(a=>{if(c[a.severity]!==undefined)c[a.severity]++;});
    return c;
  }, [s.alerts]);

  return (
    <div>
      <div style={{display:"flex",gap:9,marginBottom:18}}>
        {["ALL","CRITICAL","HIGH","MEDIUM","LOW"].map(sv=>(
          <button key={sv} onClick={()=>setSevF(sv)} style={{flex:1,padding:"9px 6px",borderRadius:DS.r2,border:`1px solid ${sevF===sv?(RM[sv]&&RM[sv].dot||DS.p2):"rgba(255,255,255,0.08)"}`,background:sevF===sv?(RM[sv]&&RM[sv].bg||DS.p3):"rgba(255,255,255,0.04)",cursor:"pointer",textAlign:"center"}}>
            <div style={{fontSize:19,fontWeight:800,color:RM[sv]&&RM[sv].color||DS.p2}}>{sc[sv]||0}</div>
            <div style={{fontSize:10,fontWeight:700,color:RM[sv]&&RM[sv].color||DS.p2}}>{sv}</div>
          </button>
        ))}
      </div>
      {created&&<div style={{marginBottom:10,padding:"8px 14px",background:DS.lBg,border:`1px solid ${DS.lBd}`,borderRadius:DS.r2,fontSize:12,color:DS.ok,fontWeight:600}}>✅ Case {created} created.</div>}
      <Inp val={q} set={setQ} ph="Search alerts by label, rule, transaction ID..." icon="🔍" sx={{width:"100%",marginBottom:12}}/>
      <Card sx={{padding:0,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:DS.s2}}>
            {["Severity","Rule","Alert Description","Transaction","Amount","OMB Reference",""].map(h=>(
              <th key={h} style={{padding:"8px 11px",textAlign:"left",fontSize:10,fontWeight:700,color:DS.t3,borderBottom:`2px solid ${DS.bd}`,whiteSpace:"nowrap"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.length===0
              ? <tr><td colSpan={7}><Empty icon="✅" title="No alerts match" sub="All clear, or adjust filters."/></td></tr>
              : filtered.slice(0,100).map((a,i)=>{
                  const isE = exp===a.id;
                  return (
                    <React.Fragment key={a.id}>
                      <tr style={{background:i%2===0?DS.surface:DS.s2,borderBottom:`1px solid ${DS.bd}`,cursor:"pointer"}} onClick={()=>setExp(p=>p===a.id?null:a.id)}>
                        <td style={{padding:"8px 11px"}}><Badge tier={a.severity} sm/>{a.hold&&<span style={{marginLeft:4,fontSize:9,color:DS.critical}}>⛔</span>}</td>
                        <td style={{padding:"8px 11px",fontSize:10,fontWeight:700,fontFamily:"monospace",color:DS.p2}}>{a.ruleId}</td>
                        <td style={{padding:"8px 11px",fontSize:12,color:DS.t1,maxWidth:250}}><div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:500}}>{a.label||(a.desc||"").slice(0,60)}</div></td>
                        <td style={{padding:"8px 11px",fontSize:10,fontFamily:"monospace",color:DS.p2}}>{a.txnId}</td>
                        <td style={{padding:"8px 11px",fontSize:12,fontWeight:700,color:DS.t1}}>${(a.amount||0).toLocaleString()}</td>
                        <td style={{padding:"8px 11px",fontSize:10,color:DS.t3,fontFamily:"monospace"}}>{a.omb}</td>
                        <td style={{padding:"8px 11px",textAlign:"right"}}><Btn onClick={e=>{e.stopPropagation();mkCase(a);}} v="secondary" sz="sm">+ Case</Btn></td>
                      </tr>
                      {isE&&(
                        <tr style={{background:RM[a.severity]&&RM[a.severity].bg}}>
                          <td colSpan={7} style={{padding:"13px 18px",borderBottom:`1px solid ${RM[a.severity]&&RM[a.severity].bd}`}}>
                            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                              <div>
                                <div style={{fontSize:10,fontWeight:700,color:DS.t4,marginBottom:5}}>FULL DESCRIPTION</div>
                                <p style={{margin:"0 0 10px",fontSize:12,color:DS.t1,lineHeight:1.5}}>{a.desc}</p>
                                <div style={{fontSize:10,fontWeight:700,color:DS.t4,marginBottom:3}}>CONTROL FAILURE</div>
                                <div style={{fontSize:11,color:DS.t2}}>{a.ctrl||"N/A"} · COSO: {a.coso||"N/A"} · GAO: {a.gao||"N/A"}</div>
                              </div>
                              <div>
                                <div style={{fontSize:10,fontWeight:700,color:DS.critical,marginBottom:5}}>REQUIRED CORRECTIVE ACTION</div>
                                <div style={{fontSize:11,color:DS.t2,lineHeight:1.5,padding:"8px 10px",background:DS.cBg,borderRadius:DS.r1,border:`1px solid ${DS.cBd}`}}>{a.fix}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
            }
          </tbody>
        </table>
      </Card>
    </div>
  );
}