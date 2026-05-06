import { DS } from "@/utils/tokens";
export default function Pick({ val, set, opts, sx = {} }) {
  return (
    <select value={val} onChange={e=>set(e.target.value)}
      style={{padding:"8px 24px 8px 10px",borderRadius:DS.r2,border:`1px solid ${DS.bd2}`,fontSize:12,color:DS.t2,background:DS.surface,cursor:"pointer",fontFamily:"inherit",...sx}}>
      {opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}