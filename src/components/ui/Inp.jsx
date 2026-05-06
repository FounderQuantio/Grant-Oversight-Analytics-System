import { DS } from "@/utils/tokens";
export default function Inp({ val, set, ph, icon, sx = {} }) {
  return (
    <div style={{position:"relative",display:"inline-flex",alignItems:"center",...sx}}>
      {icon && <span style={{position:"absolute",left:10,color:DS.t4,fontSize:13,pointerEvents:"none"}}>{icon}</span>}
      <input value={val} onChange={e=>set(e.target.value)} placeholder={ph}
        style={{width:"100%",padding:icon?"8px 12px 8px 32px":"8px 12px",borderRadius:DS.r2,border:`1px solid ${DS.bd2}`,fontSize:13,color:DS.t1,background:DS.surface,outline:"none",fontFamily:"inherit"}}/>
    </div>
  );
}