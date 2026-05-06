import { DS } from "@/utils/tokens";
export default function MBar({ data, h=70, color=DS.p2 }) {
  if(!data || !data.length) return null;
  const mx=Math.max(...data.map(d=>d.v),1);
  const bw=Math.floor((260-data.length*3)/data.length);
  return (
    <svg viewBox={`0 0 260 ${h+18}`} width="100%" height={h+18}>
      {data.map((d,i)=>{
        const bh=Math.max(2,(d.v/mx)*(h-4));
        const x=i*(bw+3);
        return (
          <g key={i}>
            <rect x={x} y={h-bh} width={bw} height={bh} rx={2} fill={color} opacity={.85}/>
            <text x={x+bw/2} y={h+13} textAnchor="middle" fontSize="7" fill={DS.t4}>{d.l}</text>
          </g>
        );
      })}
    </svg>
  );
}