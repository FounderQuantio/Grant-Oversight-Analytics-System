import { DS } from "@/utils/tokens";
const SZ = { sm:{padding:"5px 12px",fontSize:12,gap:4}, md:{padding:"8px 16px",fontSize:13,gap:5}, lg:{padding:"10px 22px",fontSize:14,gap:6} };
const VARS = {
  primary:  {background:"#1B3A5C",color:"#fff",     border:"none"},
  secondary:{background:DS.surface,color:DS.t2,     border:`1px solid ${DS.bd2}`},
  danger:   {background:DS.cBg,   color:DS.critical,border:`1px solid ${DS.cBd}`},
  ghost:    {background:"transparent",color:DS.t3,  border:"none"},
  ok:       {background:DS.lBg,   color:DS.ok,      border:`1px solid ${DS.lBd}`},
  purple:   {background:"#F5F3FF",color:DS.purple,  border:"1px solid #DDD6FE"},
};
export default function Btn({ onClick, children, v = "primary", sz = "md", dis, sx = {} }) {
  return (
    <button onClick={dis ? undefined : onClick} style={{display:"inline-flex",alignItems:"center",borderRadius:DS.r2,cursor:dis?"not-allowed":"pointer",fontWeight:600,opacity:dis?.5:1,fontFamily:"inherit",transition:"all .15s",...SZ[sz],...(VARS[v]||VARS.primary),...sx}}>
      {children}
    </button>
  );
}