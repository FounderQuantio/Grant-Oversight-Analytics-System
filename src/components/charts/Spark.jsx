export default function Spark({ data, color, w=80, h=28 }) {
  if(!data || data.length < 2) return null;
  const mx=Math.max(...data,1), mn=Math.min(...data,0), rng=mx-mn||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-mn)/rng)*(h-4)-2}`).join(" ");
  const lastY=h-((data[data.length-1]-mn)/rng)*(h-4)-2;
  return (
    <svg width={w} height={h} style={{display:"block"}}>
      <polyline fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" points={pts}/>
      <circle cx={w} cy={lastY} r={3} fill={color}/>
    </svg>
  );
}