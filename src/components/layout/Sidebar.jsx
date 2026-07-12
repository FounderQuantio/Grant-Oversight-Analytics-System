import { DS, ROLES } from "@/utils/tokens";
import { useAppState } from "@/context/AppContext";

const NAV = [
  {id:"overview",    l:"Overview",    i:"▦", g:"main"},
  {id:"alerts",      l:"Alert Queue", i:"⚠", g:"main", badge:"alerts"},
  {id:"transactions",l:"Transactions",i:"≡", g:"main"},
  {id:"cases",       l:"Cases",       i:"📁",g:"main", badge:"cases"},
  {id:"compliance",  l:"Compliance",  i:"✓", g:"main"},
  {id:"glance",      l:"At a Glance", i:"📋",g:"sys"},
  {id:"settings",    l:"Settings",    i:"⚙", g:"sys"},
];

export default function Sidebar({ active, setActive }) {
  const { s } = useAppState();
  const role = ROLES[s.role] || ROLES.compliance;
  const bc = {
    alerts: s.alerts.filter(a=>a.severity==="CRITICAL"&&a.status==="OPEN").length,
    cases:  s.cases.filter(c=>c.status==="OPEN").length,
  };
  return (
    <aside style={{width:208,background:DS.side,display:"flex",flexDirection:"column",flexShrink:0,overflow:"hidden",borderRight:`1px solid ${DS.bd}`}}>
      <div style={{padding:"16px 14px 12px",borderBottom:`1px solid ${DS.bd}`}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:32,height:32,borderRadius:DS.r2,background:DS.sideAct,border:`1px solid ${DS.p3}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:DS.primary}}>FG</div>
          <div>
            <div style={{fontSize:13,fontWeight:800,color:DS.t1,letterSpacing:-.3}}>FraudGuard</div>
            <div style={{fontSize:9,color:DS.t4,fontWeight:600,letterSpacing:.5}}>GRANT INTELLIGENCE</div>
          </div>
        </div>
      </div>
      <nav style={{flex:1,padding:"10px 8px",overflowY:"auto"}}>
        {["main","sys"].map(grp=>(
          <div key={grp} style={{marginBottom:6}}>
            <div style={{fontSize:9,fontWeight:700,color:DS.t4,letterSpacing:1,padding:"5px 10px 3px",textTransform:"uppercase"}}>{grp==="main"?"Workspace":"System"}</div>
            {NAV.filter(n=>n.g===grp).filter(n=>role.views.includes(n.id)||n.id==="settings"||n.id==="glance").map(item=>{
              const isA=active===item.id;
              const count=item.badge?bc[item.badge]:0;
              return (
                <button key={item.id} onClick={()=>setActive(item.id)} style={{display:"flex",alignItems:"center",gap:9,width:"100%",padding:"8px 10px",marginBottom:1,border:"none",borderRadius:DS.r2,cursor:"pointer",background:isA?DS.sideAct:"transparent",color:isA?DS.primary:DS.t3,fontSize:12,fontWeight:isA?700:400,textAlign:"left",transition:"all .15s"}}>
                  <span style={{fontSize:13,opacity:.9}}>{item.i}</span>
                  <span style={{flex:1}}>{item.l}</span>
                  {count>0&&<span style={{background:DS.critical,color:"#fff",fontSize:9,fontWeight:800,borderRadius:20,padding:"1px 5px",minWidth:14,textAlign:"center"}}>{count}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div style={{padding:"8px 14px",borderTop:`1px solid ${DS.bd}`,fontSize:9,color:DS.t4,fontWeight:600}}>v4.1 Enterprise · DS1-DS6 · OMB 2 CFR 200</div>
    </aside>
  );
}