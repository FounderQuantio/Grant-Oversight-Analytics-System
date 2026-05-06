import { DS } from "@/utils/tokens";
export default function Chip({ children, c, bg, bd, sm }) {
  return (
    <span style={{display:"inline-block",padding:sm?"2px 8px":"3px 10px",borderRadius:20,fontSize:sm?10:11,fontWeight:600,color:c||DS.p2,background:bg||DS.p3,border:`1px solid ${bd||DS.p4}`,whiteSpace:"nowrap"}}>
      {children}
    </span>
  );
}