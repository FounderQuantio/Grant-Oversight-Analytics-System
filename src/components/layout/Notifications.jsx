import { DS } from "@/utils/tokens";
import { useAppState } from "@/context/AppContext";

export default function Notifications() {
  const { s, d } = useAppState();
  return (
    <div style={{position:"fixed",bottom:20,right:20,zIndex:9999,display:"flex",flexDirection:"column",gap:8,pointerEvents:"none"}}>
      {s.notifs.slice(0,4).map(n=>(
        <div key={n.id} style={{background:DS.surface,border:`1px solid ${n.type==="ok"?DS.lBd:DS.cBd}`,borderLeft:`4px solid ${n.type==="ok"?DS.ok:DS.critical}`,borderRadius:DS.r2,padding:"10px 14px",boxShadow:DS.sh3,display:"flex",alignItems:"center",gap:10,minWidth:280,maxWidth:400,pointerEvents:"all",animation:"slideIn .2s ease"}}>
          <span style={{fontSize:14}}>{n.type==="ok"?"✅":"🚨"}</span>
          <span style={{flex:1,fontSize:12,color:DS.t2,fontWeight:500}}>{n.msg}</span>
          <button onClick={()=>d({type:"DISMISS",id:n.id})} style={{background:"none",border:"none",cursor:"pointer",color:DS.t4,fontSize:16,padding:0,lineHeight:1}}>×</button>
        </div>
      ))}
    </div>
  );
}