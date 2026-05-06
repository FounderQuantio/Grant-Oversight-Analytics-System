import { DS } from "@/utils/tokens";
export default function Donut({ data, size=100 }) {
  const r=44, cx=60, cy=60;
  let cum=0;
  const tot=data.reduce((s,d)=>s+(d.v||0),0)||1;
  const segs=data.map(d=>{const start=cum;cum+=d.v||0;return{...d,start,end:cum};});
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      {segs.map((sg,i)=>{
        const sa=(sg.start/tot)*2*Math.PI-Math.PI/2;
        const ea=(sg.end/tot)*2*Math.PI-Math.PI/2;
        const x1=cx+r*Math.cos(sa), y1=cy+r*Math.sin(sa);
        const x2=cx+r*Math.cos(ea), y2=cy+r*Math.sin(ea);
        return <path key={i} d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${(sg.v||0)/tot>.5?1:0} 1 ${x2} ${y2} Z`} fill={sg.color} opacity={.9}/>;
      })}
      <circle cx={cx} cy={cy} r={28} fill={DS.surface}/>
    </svg>
  );
}