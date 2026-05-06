import { DS } from "@/utils/tokens";
export default function Sec({ title, sub, action, children, mb = 14 }) {
  return (
    <div>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:mb}}>
        <div>
          <h3 style={{margin:0,fontSize:14,fontWeight:700,color:DS.t1,letterSpacing:-.2}}>{title}</h3>
          {sub && <p style={{margin:"2px 0 0",fontSize:11,color:DS.t4}}>{sub}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}