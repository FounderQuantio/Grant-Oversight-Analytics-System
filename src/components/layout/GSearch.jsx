import { useState, useMemo, useRef, useEffect } from "react";
import { DS } from "@/utils/tokens";
import { Inp, Badge } from "@/components/ui";
import { useAppState } from "@/context/AppContext";

export default function GSearch() {
  const { s } = useAppState();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const h = e => { if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const results = useMemo(() => {
    if(!q.trim() || q.length < 2) return [];
    const ql = q.toLowerCase();
    const tR = s.txns.filter(x=>x.id.toLowerCase().includes(ql)||x.grantId.toLowerCase().includes(ql)||(x.invoiceRef||"").toLowerCase().includes(ql)).slice(0,3).map(x=>({type:"Transaction",icon:"📄",id:x.id,label:x.id,sub:`${x.grantId} · $${(x.amount||0).toLocaleString()}`,tier:x.riskTier}));
    const vR = s.vens.filter(x=>x.name.toLowerCase().includes(ql)||x.id.toLowerCase().includes(ql)).slice(0,2).map(x=>({type:"Vendor",icon:"🏢",id:x.id,label:x.name,sub:x.region,tier:x.debar?"CRITICAL":x.coi?"HIGH":"LOW"}));
    const aR = s.alerts.filter(x=>(x.label||"").toLowerCase().includes(ql)||x.ruleId.includes(ql.toUpperCase())).slice(0,3).map(x=>({type:"Alert",icon:"🚨",id:x.id,label:(x.label||"").slice(0,50),sub:x.omb,tier:x.severity}));
    return [...tR,...vR,...aR];
  }, [q, s]);

  const hi = (txt="") => {
    const i = txt.toLowerCase().indexOf(q.toLowerCase());
    if(i<0||!q) return txt;
    return <>{txt.slice(0,i)}<mark style={{background:"#FEF08A",padding:0,borderRadius:2}}>{txt.slice(i,i+q.length)}</mark>{txt.slice(i+q.length)}</>;
  };

  return (
    <div ref={ref} style={{position:"relative",flex:1,maxWidth:460}}>
      <Inp val={q} set={v=>{setQ(v);setOpen(true);}} ph="Search alerts, transactions, vendors..." icon="🔍" sx={{width:"100%"}}/>
      {open && results.length > 0 && (
        <div style={{position:"absolute",top:"calc(100% + 5px)",left:0,right:0,background:DS.surface,border:`1px solid ${DS.bd}`,borderRadius:DS.r2,boxShadow:DS.sh3,zIndex:9000,overflow:"hidden",maxHeight:300,overflowY:"auto"}}>
          {results.map(r=>(
            <div key={r.id} onClick={()=>{setQ("");setOpen(false);}} style={{padding:"9px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${DS.bd}`}}>
              <span style={{fontSize:15,flexShrink:0}}>{r.icon}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:600,color:DS.t1}}>{hi(r.label||"")}</div>
                <div style={{fontSize:10,color:DS.t3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.sub}</div>
              </div>
              <Badge tier={r.tier} sm/>
              <span style={{fontSize:10,color:DS.t4,flexShrink:0}}>{r.type}</span>
            </div>
          ))}
        </div>
      )}
      {open && q.length >= 2 && results.length === 0 && (
        <div style={{position:"absolute",top:"calc(100% + 5px)",left:0,right:0,background:DS.surface,border:`1px solid ${DS.bd}`,borderRadius:DS.r2,boxShadow:DS.sh3,zIndex:9000,padding:"16px",textAlign:"center",color:DS.t3,fontSize:12}}>No results for "{q}"</div>
      )}
    </div>
  );
}