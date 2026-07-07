import { DS, ROLES } from "@/utils/tokens";
import { Tip, Pick, ThemeToggle } from "@/components/ui";
import { useAppState } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import GSearch from "@/components/layout/GSearch";

export default function Header({ title, sub }) {
  const { s, d } = useAppState();
  const navigate  = useNavigate();
  const crit = s.alerts.filter(a=>a.severity==="CRITICAL"&&a.status==="OPEN").length;
  const role = ROLES[s.role] || ROLES.compliance;
  return (
    <div style={{height:55,background:DS.surface,borderBottom:`1px solid ${DS.bd}`,display:"flex",alignItems:"center",padding:"0 22px",gap:16,flexShrink:0,zIndex:100}}>
      <button
        onClick={() => navigate("/")}
        title="Back to Home"
        style={{background:"rgba(100,149,237,0.08)",border:"1px solid rgba(100,149,237,0.25)",borderRadius:DS.r2,padding:"5px 12px",cursor:"pointer",color:"#6495ED",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5,flexShrink:0,transition:"all 0.15s"}}
        onMouseEnter={e=>{e.currentTarget.style.background="rgba(100,149,237,0.16)";e.currentTarget.style.borderColor="rgba(100,149,237,0.45)";}}
        onMouseLeave={e=>{e.currentTarget.style.background="rgba(100,149,237,0.08)";e.currentTarget.style.borderColor="rgba(100,149,237,0.25)";}}
      >
        ← Home
      </button>
      <div style={{flex:"0 0 auto"}}>
        <h1 style={{margin:0,fontSize:15,fontWeight:800,color:DS.t1,letterSpacing:-.3}}>{title}</h1>
        {sub&&<p style={{margin:0,fontSize:10,color:DS.t4}}>{sub}</p>}
      </div>
      <div style={{flex:1,display:"flex",justifyContent:"center"}}><GSearch/></div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <ThemeToggle/>
        <Tip txt={`${crit} critical alert${crit!==1?"s":""} need action`}>
          <button style={{position:"relative",background:"none",border:"none",cursor:"pointer",padding:4,color:DS.t3,fontSize:18}}>
            🔔
            {crit>0&&<span style={{position:"absolute",top:-2,right:-2,background:DS.critical,color:"#fff",fontSize:9,fontWeight:800,borderRadius:20,padding:"1px 4px",minWidth:14,textAlign:"center"}}>{crit}</span>}
          </button>
        </Tip>
        <Pick val={s.role} set={v=>d({type:"SET_ROLE",v})} opts={Object.entries(ROLES).map(([k,r])=>({v:k,l:`${r.icon} ${r.label}`}))} sx={{fontSize:11}}/>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"4px 10px",borderRadius:DS.r2,background:DS.s2,border:`1px solid ${DS.bd}`}}>
          <div style={{width:26,height:26,borderRadius:"50%",background:DS.primary,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:10,fontWeight:800}}>MB</div>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:DS.t1}}>M. Bilal</div>
            <div style={{fontSize:9,color:DS.t3,lineHeight:1.2}}>{role.label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}