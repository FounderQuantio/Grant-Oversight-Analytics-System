import { useState } from "react";
import { DS } from "@/utils/tokens";
export default function Tip({ txt, children }) {
  const [on, set] = useState(false);
  return (
    <div style={{position:"relative",display:"inline-flex"}} onMouseEnter={()=>set(true)} onMouseLeave={()=>set(false)}>
      {children}
      {on && (
        <div style={{position:"absolute",bottom:"calc(100% + 6px)",left:"50%",transform:"translateX(-50%)",background:DS.t1,color:"#fff",padding:"5px 9px",borderRadius:DS.r1,fontSize:11,whiteSpace:"nowrap",zIndex:9999,pointerEvents:"none",boxShadow:DS.sh2,maxWidth:240,textAlign:"center"}}>
          {txt}
          <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",border:"4px solid transparent",borderTopColor:DS.t1}}/>
        </div>
      )}
    </div>
  );
}