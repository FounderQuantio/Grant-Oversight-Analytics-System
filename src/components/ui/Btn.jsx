import { DS } from "@/utils/tokens";
const SZ = { sm:{padding:"5px 12px",fontSize:12,gap:4}, md:{padding:"8px 16px",fontSize:13,gap:5}, lg:{padding:"10px 22px",fontSize:14,gap:6} };
const VARS = {
  primary:  {background:"#6495ED",color:"#FFFFFF",  border:"none",            borderRadius:"100px"},
  secondary:{background:DS.s2,    color:DS.t1,      border:`1px solid ${DS.bd2}`, borderRadius:"100px"},
  danger:   {background:DS.cBg,   color:DS.critical,border:`1px solid ${DS.cBd}`},
  ghost:    {background:"transparent",color:DS.t3,  border:"none"},
  ok:       {background:DS.lBg,   color:DS.ok,      border:`1px solid ${DS.lBd}`},
  purple:   {background:"rgba(124,58,237,0.12)",color:DS.purple,border:"1px solid rgba(124,58,237,0.30)"},
};
export default function Btn({ onClick, children, v = "primary", sz = "md", dis, sx = {} }) {
  return (
    <button onClick={dis ? undefined : onClick} style={{display:"inline-flex",alignItems:"center",borderRadius:DS.r2,cursor:dis?"not-allowed":"pointer",fontWeight:600,opacity:dis?.5:1,fontFamily:"inherit",transition:"all .15s",...SZ[sz],...(VARS[v]||VARS.primary),...sx}}>
      {children}
    </button>
  );
}