import { DS } from "@/utils/tokens";
export default function Empty({ icon, title, sub, action }) {
  return (
    <div style={{textAlign:"center",padding:"44px 20px",color:DS.t4}}>
      <div style={{fontSize:36,marginBottom:10,opacity:.6}}>{icon}</div>
      <div style={{fontSize:14,fontWeight:700,color:DS.t2,marginBottom:4}}>{title}</div>
      {sub && <div style={{fontSize:12,color:DS.t3,marginBottom:14}}>{sub}</div>}
      {action}
    </div>
  );
}