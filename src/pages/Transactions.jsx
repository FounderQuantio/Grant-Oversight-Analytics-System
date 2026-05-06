import { useState, useMemo } from "react";
import { DS, RM } from "@/utils/tokens";
import { Badge, Chip, Card, Inp, Pick, Empty, Btn } from "@/components/ui";
import { useAppState } from "@/context/AppContext";
import { GRANT_DB } from "@/data/referenceData";
import TxnPanel from "@/components/TxnPanel";

const DS_PREFIXES = ["ALL","TXN-1","TXN-2","TXN-3","TXN-4","TXN-5","TXN-6"];
const DS_LABELS   = {"ALL":"All Datasets","TXN-1":"DS1 Clean (TX)","TXN-2":"DS2 Duplicates (TN)","TXN-3":"DS3 Fraud Network (AZ)","TXN-4":"DS4 Procurement (Midwest)","TXN-5":"DS5 Structuring (FL)","TXN-6":"DS6 ML Anomalies (NW)"};

function createCase(al, d) {
  const nc = {id:`CASE-${Date.now()}`,alertId:al.id,ruleId:al.ruleId,label:al.label,txnId:al.txnId,grantId:al.grantId,vendorId:al.vendorId,severity:al.severity,omb:al.omb,desc:al.desc,fix:al.fix,ctrl:al.ctrl,status:"OPEN",created:new Date().toISOString(),updated:new Date().toISOString(),notes:[],evidence:[{type:"ALERT",ref:al.id,ts:new Date().toISOString()}]};
  d({type:"CASE_NEW",v:nc});
  d({type:"LOG",act:"CASE_CREATED",detail:`${nc.id} for ${al.txnId}`});
}

export default function Transactions() {
  const { s, d } = useAppState();
  const [q,       setQ]        = useState("");
  const [tF,      setTF]       = useState("ALL");
  const [gF,      setGF]       = useState("ALL");
  const [dsF,     setDsF]      = useState("ALL");
  const [holdOnly, setHoldOnly] = useState(false);
  const [mlOnly,   setMlOnly]   = useState(false);
  const [sort,    setSort]     = useState({c:"riskScore",asc:false});
  const [sel,     setSel]      = useState(null);
  const [page,    setPage]     = useState(0);
  const [selected,setSelected] = useState(new Set());
  const PER = 15;

  const filtered = useMemo(() => {
    let t = [...s.txns];
    if(q)       t = t.filter(x=>x.id.toLowerCase().includes(q.toLowerCase())||x.grantId.toLowerCase().includes(q.toLowerCase())||(x.invoiceRef||"").toLowerCase().includes(q.toLowerCase()));
    if(tF!=="ALL")  t = t.filter(x=>x.riskTier===tF);
    if(gF!=="ALL")  t = t.filter(x=>x.grantId===gF);
    if(dsF!=="ALL") t = t.filter(x=>x.id.startsWith(dsF));
    if(holdOnly) t = t.filter(x=>x.hold);
    if(mlOnly)   t = t.filter(x=>x.mlFlag);
    t.sort((a,b)=>{const av=a[sort.c],bv=b[sort.c];if(typeof av==="number")return sort.asc?av-bv:bv-av;return sort.asc?String(av).localeCompare(String(bv)):String(bv).localeCompare(String(av));});
    return t;
  }, [s.txns,q,tF,gF,dsF,holdOnly,mlOnly,sort]);

  const paged = filtered.slice(page*PER,(page+1)*PER);
  const pages = Math.ceil(filtered.length/PER);
  const toggleSel = id => setSelected(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});
  const batchHold = () => {d({type:"HOLD_BATCH",ids:[...selected]});setSelected(new Set());};

  const TH = ({c,l,w}) => (
    <th onClick={()=>setSort(p=>({c,asc:p.c===c?!p.asc:false}))}
      style={{padding:"9px 11px",textAlign:"left",fontSize:10,fontWeight:700,color:DS.t3,cursor:"pointer",width:w,whiteSpace:"nowrap",background:DS.s2,borderBottom:`2px solid ${sort.c===c?DS.p2:DS.bd}`,userSelect:"none"}}>
      {l}{sort.c===c?(sort.asc?" ↑":" ↓"):""}
    </th>
  );

  return (
    <div>
      {sel && (
        <TxnPanel txn={sel} alerts={s.alerts} vens={s.vens}
          onClose={()=>setSel(null)}
          onCase={al=>{createCase(al,d);setSel(null);}}/>
      )}
      <div style={{display:"flex",gap:9,marginBottom:13,flexWrap:"wrap",alignItems:"center"}}>
        <Inp val={q} set={v=>{setQ(v);setPage(0);}} ph="Search ID, grant, invoice..." icon="🔍" sx={{flex:1,minWidth:190}}/>
        <Pick val={tF}  set={v=>{setTF(v);setPage(0);}} opts={[{v:"ALL",l:"All Risk Tiers"},...["CRITICAL","HIGH","MEDIUM","LOW","INFORMATIONAL"].map(v=>({v,l:v}))]}/>
        <Pick val={dsF} set={v=>{setDsF(v);setPage(0);}} opts={DS_PREFIXES.map(v=>({v,l:DS_LABELS[v]||v}))}/>
        <Pick val={gF}  set={v=>{setGF(v);setPage(0);}} opts={[{v:"ALL",l:"All Grants"},...GRANT_DB.map(g=>({v:g.id,l:`${g.id} — ${g.name.slice(0,26)}`}))]}/>
        <label style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:DS.t2,cursor:"pointer"}}><input type="checkbox" checked={holdOnly} onChange={e=>setHoldOnly(e.target.checked)}/> Holds Only</label>
        <label style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:DS.t2,cursor:"pointer"}}><input type="checkbox" checked={mlOnly}   onChange={e=>setMlOnly(e.target.checked)}/> ML Anomalies</label>
        {selected.size>0&&<Btn onClick={batchHold} v="danger" sz="sm">⛔ Hold ({selected.size})</Btn>}
        <div style={{fontSize:11,color:DS.t3,marginLeft:"auto"}}>{filtered.length} results</div>
      </div>
      <Card sx={{padding:0,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>
            <TH c="id" l="Transaction ID" w="120px"/>
            <TH c="riskScore" l="Risk Score" w="130px"/>
            <TH c="amount" l="Amount" w="105px"/>
            <TH c="grantId" l="Grant" w="150px"/>
            <TH c="vendorId" l="Vendor" w="165px"/>
            <TH c="category" l="Category" w="115px"/>
            <TH c="date" l="Date" w="95px"/>
            <th style={{padding:"9px 11px",width:"75px",background:DS.s2,borderBottom:`2px solid ${DS.bd}`}}/>
          </tr></thead>
          <tbody>
            {paged.length===0
              ? <tr><td colSpan={8}><Empty icon="📄" title="No transactions match" sub="Adjust filters."/></td></tr>
              : paged.map((t,i)=>{
                  const rm  = RM[t.riskTier]||RM.INFORMATIONAL;
                  const vn  = s.vens.find(v=>v.id===t.vendorId);
                  const isChk = selected.has(t.id);
                  const rowBg = t.hold?"#FDF2F1":t.riskTier==="CRITICAL"?DS.cBg:t.riskTier==="HIGH"?`${DS.hBg}88`:i%2===0?DS.surface:DS.s2;
                  return (
                    <tr key={t.id} style={{background:rowBg,cursor:"pointer",borderBottom:`1px solid ${DS.bd}`}}>
                      <td style={{padding:"8px 11px",fontSize:11,fontFamily:"monospace",fontWeight:700,color:DS.p2}}
                        onClick={e=>{e.stopPropagation();toggleSel(t.id);}}>
                        {isChk?"☑":"☐"} {t.id}{t.hold&&<span style={{marginLeft:4,fontSize:9,color:DS.critical}}>⛔</span>}
                      </td>
                      <td style={{padding:"8px 11px"}} onClick={()=>setSel(t)}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <div style={{width:30,height:5,background:`${rm.color}22`,borderRadius:2,overflow:"hidden"}}>
                            <div style={{width:`${t.riskScore}%`,height:"100%",background:rm.color,borderRadius:2}}/>
                          </div>
                          <Badge tier={t.riskTier} sm/>
                          {t.mlFlag&&<Chip c={DS.purple} bg="#F5F3FF" bd="#DDD6FE" sm>σ</Chip>}
                        </div>
                      </td>
                      <td style={{padding:"8px 11px",fontSize:13,fontWeight:700,color:DS.t1}} onClick={()=>setSel(t)}>${(t.amount||0).toLocaleString()}</td>
                      <td style={{padding:"8px 11px",fontSize:11,color:DS.t2}} onClick={()=>setSel(t)}>{t.grantId}</td>
                      <td style={{padding:"8px 11px",fontSize:11,color:DS.t2}} onClick={()=>setSel(t)}>
                        <div style={{display:"flex",alignItems:"center",gap:4}}>
                          {vn&&vn.short}
                          {vn&&vn.debar&&<span style={{fontSize:9,color:DS.critical}}>🚫</span>}
                          {vn&&vn.coi&&<span style={{fontSize:9,color:DS.high}}>⚠</span>}
                        </div>
                      </td>
                      <td style={{padding:"8px 11px",fontSize:11,color:DS.t3}} onClick={()=>setSel(t)}>{t.category}</td>
                      <td style={{padding:"8px 11px",fontSize:11,color:DS.t3}} onClick={()=>setSel(t)}>{t.date}</td>
                      <td style={{padding:"8px 11px",textAlign:"right"}} onClick={()=>setSel(t)}>
                        {t.alertIds&&t.alertIds.length>0&&<span style={{fontSize:10,fontWeight:700,color:DS.critical,background:DS.cBg,padding:"1px 5px",borderRadius:20}}>{t.alertIds.length}</span>}
                      </td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>
        {pages>1&&(
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 14px",borderTop:`1px solid ${DS.bd}`,background:DS.s2}}>
            <div style={{fontSize:11,color:DS.t3}}>Page {page+1}/{pages} · {filtered.length} records</div>
            <div style={{display:"flex",gap:6}}>
              <Btn onClick={()=>setPage(p=>Math.max(0,p-1))} dis={page===0} v="secondary" sz="sm">← Prev</Btn>
              <Btn onClick={()=>setPage(p=>Math.min(pages-1,p+1))} dis={page>=pages-1} v="secondary" sz="sm">Next →</Btn>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}