import { useState } from "react";
import { DS, RM, ROLES } from "@/utils/tokens";
import { Badge, Card, Chip, Btn, Spin } from "@/components/ui";
import { useAppState } from "@/context/AppContext";
import { useDetection } from "@/hooks/useDetection";
import { INIT_RULES } from "@/services/rulesEngine";

const TABS = [["rules","Detection Rules"],["graph","Graph Analytics"],["rbac","Access Control"]];

export default function Settings() {
  const { s, d } = useAppState();
  const { running, rerun } = useDetection();
  const [tab, setTab] = useState("rules");

  const byC = {};
  INIT_RULES.forEach(r=>{(byC[r.cat]=byC[r.cat]||[]).push(r);});

  return (
    <div>
      {/* Tab bar */}
      <div style={{display:"flex",gap:0,marginBottom:18,borderBottom:`1px solid ${DS.bd}`}}>
        {TABS.map(([id,l])=>(
          <button key={id} onClick={()=>setTab(id)} style={{padding:"8px 16px",border:"none",borderBottom:tab===id?`2px solid ${DS.p2}`:"2px solid transparent",background:"none",cursor:"pointer",fontSize:13,fontWeight:tab===id?700:400,color:tab===id?DS.p2:DS.t3}}>{l}</button>
        ))}
      </div>

      {/* Detection Rules */}
      {tab==="rules"&&(
        <div>
          <div style={{display:"flex",gap:10,marginBottom:16,alignItems:"center"}}>
            <Btn onClick={rerun} dis={running}>{running?<><Spin/> Running...</>:"▶ Re-run Full Detection"}</Btn>
            {s.mlStats&&<span style={{fontSize:12,color:DS.t3}}>Last scan: {s.mlStats.cnt} ML anomalies · {s.alerts.length} rule alerts · {(s.graphAlerts||[]).length} graph alerts</span>}
          </div>
          {Object.entries(byC).map(([cat,rules])=>(
            <div key={cat} style={{marginBottom:16}}>
              <div style={{fontSize:10,fontWeight:700,color:DS.t4,letterSpacing:.5,marginBottom:7,textTransform:"uppercase"}}>{cat}</div>
              <Card sx={{padding:0,overflow:"hidden"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{background:DS.s2}}>
                    {["On","ID","Rule Name","Severity","OMB","Threshold"].map(h=>(
                      <th key={h} style={{padding:"8px 12px",textAlign:"left",fontSize:10,fontWeight:700,color:DS.t3,borderBottom:`1px solid ${DS.bd}`}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {rules.map((r,i)=>(
                      <tr key={r.id} style={{background:i%2===0?DS.surface:DS.s2,borderBottom:`1px solid ${DS.bd}`,opacity:r.on?1:.5}}>
                        <td style={{padding:"8px 12px"}}><input type="checkbox" checked={r.on} onChange={()=>d({type:"RULE_TOG",id:r.id})} style={{accentColor:DS.p2,width:14,height:14,cursor:"pointer"}}/></td>
                        <td style={{padding:"8px 12px",fontSize:10,fontWeight:700,fontFamily:"monospace",color:DS.p2}}>{r.id}</td>
                        <td style={{padding:"8px 12px",fontSize:12,color:DS.t1}}>{r.name}</td>
                        <td style={{padding:"8px 12px"}}><Badge tier={r.sev} sm/></td>
                        <td style={{padding:"8px 12px",fontSize:10,color:DS.t3,fontFamily:"monospace"}}>{r.omb}</td>
                        <td style={{padding:"8px 12px",fontSize:11,color:DS.t3}}>{r.thr!=null?r.thr.toLocaleString():"—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Graph Analytics */}
      {tab==="graph"&&(
        <div>
          <p style={{fontSize:13,color:DS.t2,marginTop:0,marginBottom:14}}>Entity relationship fraud detection: shared addresses, bank routing, procurement concentration, and multi-hop network schemes across DS1–DS6.</p>
          {!(s.graphAlerts&&s.graphAlerts.length)
            ? <div style={{textAlign:"center",padding:"44px 20px",color:DS.t4}}>
                <div style={{fontSize:36,marginBottom:10,opacity:.6}}>🕸</div>
                <div style={{fontSize:14,fontWeight:700,color:DS.t2,marginBottom:4}}>No graph alerts</div>
                <div style={{fontSize:12,color:DS.t3}}>Run full detection to analyze entity relationships.</div>
              </div>
            : s.graphAlerts.map((a,i)=>(
                <Card key={i} sx={{marginBottom:10,borderLeft:`4px solid ${RM[a.sev]&&RM[a.sev].dot||DS.info}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:12,fontWeight:700,color:RM[a.sev]&&RM[a.sev].color}}>{(a.type||"").replace(/_/g," ")}</span>
                    <div style={{display:"flex",gap:6}}>
                      <Badge tier={a.sev} sm/>
                      <span style={{fontSize:10,color:DS.t3,background:DS.s2,padding:"2px 7px",borderRadius:4}}>Score: {a.gs}/100</span>
                    </div>
                  </div>
                  <p style={{margin:0,fontSize:12,color:DS.t2}}>{a.desc}</p>
                  {a.entities&&<div style={{marginTop:5,fontSize:10,color:DS.t3}}>Entities: {a.entities.slice(0,4).join(" · ")}{a.entities.length>4?` +${a.entities.length-4} more`:""}</div>}
                  {a.path&&<div style={{marginTop:4,fontSize:10,color:DS.t3}}>Path: {a.path.join(" ")}</div>}
                  {a.sharedGrants&&<div style={{marginTop:4,fontSize:10,color:DS.t3}}>Shared Grants: {a.sharedGrants.slice(0,3).join(", ")}{a.sharedGrants.length>3?` +${a.sharedGrants.length-3}`:""}</div>}
                </Card>
              ))
          }
        </div>
      )}

      {/* RBAC */}
      {tab==="rbac"&&(
        <div>
          <p style={{fontSize:13,color:DS.t2,marginTop:0,marginBottom:14}}>Role-based access controls. Switch your active role using the selector in the top header bar.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
            {Object.entries(ROLES).map(([k,r])=>(
              <Card key={k} sx={{border:`2px solid ${s.role===k?DS.p2:DS.bd}`,background:s.role===k?DS.p3:DS.surface}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <h4 style={{margin:0,fontSize:13,fontWeight:700,color:s.role===k?DS.p2:DS.t1}}>{r.icon} {r.label}</h4>
                  {s.role===k&&<Chip c={DS.p2} bg={DS.p3} bd={DS.p4} sm>Active</Chip>}
                </div>
                <div style={{fontSize:10,color:DS.t4,marginBottom:8}}>Views: {r.views.join(", ")}</div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {[["Edit Rules",r.canRules],["Close Cases",r.canClose],["All Cases",r.seeAll]].map(([l,v])=>(
                    <span key={l} style={{fontSize:9,padding:"2px 7px",borderRadius:20,background:v?DS.lBg:DS.cBg,color:v?DS.ok:DS.critical,fontWeight:700}}>{v?"✓":"✗"} {l}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}