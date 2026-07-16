import { useState } from "react";
import { DS, ROLES } from "@/utils/tokens";
import { Tip, Pick, ThemeToggle } from "@/components/ui";
import { useAppState } from "@/context/AppContext";
import GSearch from "@/components/layout/GSearch";
import { exportSystemReport } from "@/services/systemReport";

export default function Header({ title, sub }) {
  const { s, d } = useAppState();
  const crit = s.alerts.filter(a=>a.severity==="CRITICAL"&&a.status==="OPEN").length;
  const role = ROLES[s.role] || ROLES.compliance;
  const [genBusy, setGenBusy] = useState(false);

  const handleGenerateReport = () => {
    setGenBusy(true);
    setTimeout(() => {
      exportSystemReport(s);
      setGenBusy(false);
    }, 300);
  };

  return (
    <div style={{height:55,background:"var(--qg-header-bg)",borderBottom:"1px solid rgba(255,255,255,0.10)",display:"flex",alignItems:"center",padding:"0 22px",gap:16,flexShrink:0,zIndex:100}}>
      <div style={{flex:"0 0 auto"}}>
        <h1 style={{margin:0,fontSize:15,fontWeight:800,color:"var(--qg-header-text)",letterSpacing:-.3}}>{title}</h1>
        {sub&&<p style={{margin:0,fontSize:10,color:"rgba(255,255,255,0.60)"}}>{sub}</p>}
      </div>
      <div style={{flex:1,display:"flex",justifyContent:"center"}}><GSearch/></div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <Tip txt="Download a full findings report (alerts, risk vendors, cases, audit readiness)">
          <button
            onClick={handleGenerateReport}
            disabled={genBusy}
            style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.10)",border:"1px solid rgba(255,255,255,0.22)",borderRadius:DS.r2,padding:"6px 13px",cursor:genBusy?"not-allowed":"pointer",color:"var(--qg-header-text)",fontSize:11,fontWeight:700,opacity:genBusy?.6:1,transition:"all 0.15s"}}
            onMouseEnter={e=>{if(!genBusy){e.currentTarget.style.background="rgba(255,255,255,0.18)";}}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.10)";}}
          >
            📄 {genBusy ? "Generating…" : "Download Report"}
          </button>
        </Tip>
        <ThemeToggle/>
        <Tip txt={`${crit} critical alert${crit!==1?"s":""} need action`}>
          <button style={{position:"relative",background:"none",border:"none",cursor:"pointer",padding:4,color:"var(--qg-header-text)",fontSize:18}}>
            🔔
            {crit>0&&<span style={{position:"absolute",top:-2,right:-2,background:DS.critical,color:"#fff",fontSize:9,fontWeight:800,borderRadius:20,padding:"1px 4px",minWidth:14,textAlign:"center"}}>{crit}</span>}
          </button>
        </Tip>
        <Pick val={s.role} set={v=>d({type:"SET_ROLE",v})} opts={Object.entries(ROLES).map(([k,r])=>({v:k,l:`${r.icon} ${r.label}`}))} sx={{fontSize:11}}/>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"4px 10px",borderRadius:DS.r2,background:"rgba(255,255,255,0.10)",border:"1px solid rgba(255,255,255,0.18)"}}>
          <div style={{width:26,height:26,borderRadius:"50%",background:DS.primary,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:10,fontWeight:800}}>MB</div>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:"var(--qg-header-text)"}}>M. Bilal</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.60)",lineHeight:1.2}}>{role.label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}