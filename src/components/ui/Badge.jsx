import { RM } from "@/utils/tokens";
export default function Badge({ tier, sm }) {
  const rm = RM[tier] || RM.INFORMATIONAL;
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:sm?"2px 8px":"3px 10px",borderRadius:20,fontSize:sm?10:11,fontWeight:700,color:rm.color,background:rm.bg,border:`1px solid ${rm.bd}`,whiteSpace:"nowrap"}}>
      <span style={{width:6,height:6,borderRadius:"50%",background:rm.dot,flexShrink:0}}/>
      {tier}
    </span>
  );
}