import { useState } from "react";
import { DS, ROLES } from "@/utils/tokens";
import { Badge, Chip, Card, Sec, Btn, Empty } from "@/components/ui";
import { useAppState } from "@/context/AppContext";
import { exportReport } from "@/services/reportExport";

const CS_C = {OPEN:DS.critical,IN_REVIEW:DS.high,ESCALATED:DS.purple,RESOLVED:DS.ok,CLOSED:DS.info};
const CS_ST = ["OPEN","IN_REVIEW","ESCALATED","RESOLVED","CLOSED"];

export default function Cases() {
  const { s, d } = useAppState();
  const role = ROLES[s.role]||ROLES.compliance;
  const [sel,     setSel]     = useState(null);
  const [note,    setNote]    = useState("");
  const [filt,    setFilt]    = useState("ALL");
  const [conf,    setConf]    = useState(null);
  const [permErr, setPermErr] = useState("");

  const selC     = sel ? s.cases.find(c=>c.id===sel) : null;
  const myCases  = s.cases.filter(c=>role.seeAll||!c.assignedTo||c.assignedTo===s.role);
  const filtered = myCases.filter(c=>filt==="ALL"||c.status===filt);

  const updStatus = (cid, st) => {
    if(st==="CLOSED"&&!role.canClose) { setPermErr("Your role cannot close cases."); setTimeout(()=>setPermErr(""),3000); return; }
    if(st==="CLOSED"&&!conf) { setConf({cid,st}); return; }
    d({type:"CASE_UPD",v:{id:cid,status:st,updated:new Date().toISOString()}});
    d({type:"LOG",act:"CASE_STATUS",detail:`${cid} -> ${st}`});
    setConf(null);
  };

  const addNote = () => {
    if(!note.trim()||!selC) return;
    d({type:"CASE_UPD",v:{id:selC.id,notes:[...selC.notes,{text:note,author:role.label,ts:new Date().toISOString()}],updated:new Date().toISOString()}});
    setNote("");
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:0,height:"calc(100vh - 120px)"}}>
      {permErr&&<div style={{padding:"8px 16px",background:DS.cBg,border:`1px solid ${DS.cBd}`,borderRadius:DS.r2,fontSize:12,color:DS.critical,fontWeight:600,marginBottom:8}}>⛔ {permErr}</div>}
      {conf&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Card sx={{maxWidth:340,boxShadow:DS.sh3}}>
            <h3 style={{margin:"0 0 8px",fontSize:15,color:DS.t1}}>Close this case?</h3>
            <p style={{margin:"0 0 18px",fontSize:12,color:DS.t2}}>This marks the investigation complete. You can reopen if needed.</p>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <Btn onClick={()=>setConf(null)} v="secondary" sz="sm">Cancel</Btn>
              <Btn onClick={()=>updStatus(conf.cid,conf.st)} v="danger" sz="sm">Close Case</Btn>
            </div>
          </Card>
        </div>
      )}
      <div style={{display:"flex",gap:0,flex:1,overflow:"hidden"}}>
        {/* Case list */}
        <div style={{width:268,flexShrink:0,background:DS.surface,borderRight:`1px solid ${DS.bd}`,display:"flex",flexDirection:"column",borderRadius:`${DS.r3} 0 0 ${DS.r3}`,boxShadow:DS.sh1,overflow:"hidden"}}>
          <div style={{padding:"11px 13px",borderBottom:`1px solid ${DS.bd}`}}>
            <h4 style={{margin:"0 0 8px",fontSize:13,fontWeight:700,color:DS.t1}}>Cases ({filtered.length})</h4>
            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
              {["ALL",...CS_ST].map(st=>(
                <button key={st} onClick={()=>setFilt(st)} style={{padding:"2px 7px",borderRadius:20,fontSize:9,fontWeight:700,border:`1px solid ${filt===st?"transparent":DS.bd2}`,cursor:"pointer",background:filt===st?(CS_C[st]||DS.p2):DS.s2,color:filt===st?"#fff":DS.t3}}>{st}</button>
              ))}
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto"}}>
            {filtered.length===0
              ? <Empty icon="📁" title="No cases" sub="Create from Alert Queue."/>
              : filtered.map(c=>(
                  <div key={c.id} onClick={()=>setSel(c.id)} style={{padding:"10px 13px",borderBottom:`1px solid ${DS.bd}`,cursor:"pointer",background:sel===c.id?DS.p3:"transparent",borderLeft:sel===c.id?`3px solid ${DS.p2}`:"3px solid transparent",transition:"background .1s"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <span style={{fontSize:10,fontWeight:700,color:DS.p2,fontFamily:"monospace"}}>{c.id}</span>
                      <span style={{fontSize:9,fontWeight:700,color:CS_C[c.status]}}>{c.status}</span>
                    </div>
                    <div style={{fontSize:11,color:DS.t2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:3}}>{(c.label||c.desc||"").slice(0,52)}...</div>
                    <Badge tier={c.severity} sm/>
                  </div>
                ))
            }
          </div>
        </div>

        {/* Case workspace */}
        <div style={{flex:1,background:DS.s2,borderRadius:`0 ${DS.r3} ${DS.r3} 0`,border:`1px solid ${DS.bd}`,borderLeft:"none",display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:DS.sh1}}>
          {!selC
            ? <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}><Empty icon="📁" title="Select a case" sub="Click a case to open the investigation workspace."/></div>
            : <>
                <div style={{padding:"13px 18px",background:DS.surface,borderBottom:`1px solid ${DS.bd}`,display:"flex",alignItems:"center",gap:11}}>
                  <div style={{flex:1}}>
                    <h3 style={{margin:0,fontSize:15,fontWeight:800,color:DS.t1}}>{selC.id}</h3>
                    <p style={{margin:"2px 0 0",fontSize:10,color:DS.t4}}>Created {new Date(selC.created).toLocaleDateString()} · {selC.grantId||"—"} · {selC.omb}</p>
                  </div>
                  <Badge tier={selC.severity}/>
                  <span style={{fontSize:11,fontWeight:700,color:CS_C[selC.status],background:`${CS_C[selC.status]}15`,padding:"3px 9px",borderRadius:20}}>{selC.status}</span>
                  <Btn onClick={()=>exportReport(selC,s.alerts,s.txns,s.vens)} v="ok" sz="sm">📄 Export Report</Btn>
                </div>
                <div style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:13}}>
                  <Card>
                    <div style={{fontSize:12,color:DS.t2,lineHeight:1.6,marginBottom:10}}>{selC.label||selC.desc}</div>
                    {selC.fix&&<div style={{padding:"8px 10px",background:DS.cBg,border:`1px solid ${DS.cBd}`,borderRadius:DS.r1,fontSize:11,color:DS.t2}}><strong style={{color:DS.critical}}>Required Action ({selC.omb}):</strong> {selC.fix}</div>}
                  </Card>
                  <Card><Sec title="Status Workflow" sub="Click to transition" mb={10}>
                    <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                      {CS_ST.map(st=>(
                        <button key={st} onClick={()=>updStatus(selC.id,st)} style={{padding:"5px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,background:selC.status===st?CS_C[st]:`${CS_C[st]}15`,color:selC.status===st?"#fff":CS_C[st],transition:"all .15s"}}>
                          {selC.status===st?"● ":""}{st}
                        </button>
                      ))}
                    </div>
                  </Sec></Card>
                  <Card><Sec title={`Investigation Notes (${selC.notes.length})`} mb={10}>
                    {selC.notes.map((n,i)=>(
                      <div key={i} style={{marginBottom:8,padding:"8px 10px",background:DS.s2,borderRadius:DS.r2,border:`1px solid ${DS.bd}`}}>
                        <div style={{display:"flex",gap:6,marginBottom:3}}>
                          <div style={{width:20,height:20,borderRadius:"50%",background:DS.primary,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:8,fontWeight:800}}>MB</div>
                          <span style={{fontSize:11,fontWeight:600,color:DS.t1}}>{n.author}</span>
                          <span style={{fontSize:9,color:DS.t4}}>{new Date(n.ts).toLocaleString()}</span>
                        </div>
                        <p style={{margin:0,fontSize:11,color:DS.t2,lineHeight:1.5}}>{n.text}</p>
                      </div>
                    ))}
                    <div style={{display:"flex",gap:7,marginTop:6}}>
                      <input value={note} onChange={e=>setNote(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addNote()} placeholder="Add investigation note..." style={{flex:1,padding:"7px 10px",borderRadius:DS.r2,border:`1px solid ${DS.bd2}`,fontSize:12,fontFamily:"inherit",color:DS.t1,background:DS.surface}}/>
                      <Btn onClick={addNote} sz="sm">Add</Btn>
                    </div>
                  </Sec></Card>
                  <Card><Sec title="Evidence Bundle" mb={10}>
                    {selC.evidence&&selC.evidence.map((e,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",fontSize:11,borderBottom:`1px solid ${DS.bd}`}}>
                        <span style={{padding:"1px 6px",borderRadius:3,background:DS.p3,color:DS.p2,fontWeight:700,fontSize:10}}>{e.type}</span>
                        <span style={{color:DS.t2,fontFamily:"monospace"}}>{e.ref}</span>
                        <span style={{color:DS.t4,marginLeft:"auto"}}>{new Date(e.ts).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </Sec></Card>
                </div>
              </>
          }
        </div>
      </div>
    </div>
  );
}