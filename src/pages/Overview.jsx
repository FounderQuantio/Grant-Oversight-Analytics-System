import { DS, RM } from "@/utils/tokens";
import { Card, Sec, Chip, Tip } from "@/components/ui";
import { Spark, MBar, Donut } from "@/components/charts";
import { useAppState } from "@/context/AppContext";
import ROICalculator from "@/components/ROICalculator";
import Badge from "@/components/ui/Badge";

function KPI({ icon, label, value, sub, tip, color, spark }) {
  return (
    <Card sx={{flex:1,minWidth:130}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <div style={{width:32,height:32,borderRadius:DS.r2,background:`${color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{icon}</div>
        {spark && <Spark data={spark} color={color} w={58} h={26}/>}
      </div>
      <div style={{fontSize:24,fontWeight:800,color:DS.t1,letterSpacing:-.5}}>{value}</div>
      <Tip txt={tip}>
        <div style={{fontSize:11,fontWeight:600,color:DS.t2,marginTop:2,cursor:"help",borderBottom:`1px dashed ${DS.bd2}`,display:"inline"}}>{label}</div>
      </Tip>
      {sub && <div style={{fontSize:10,color:DS.t3,marginTop:2}}>{sub}</div>}
    </Card>
  );
}

export default function Overview() {
  const { s } = useAppState();
  const { txns, alerts, vens, cases, graphAlerts, mlStats } = s;
  const sc = {CRITICAL:0,HIGH:0,MEDIUM:0,LOW:0,INFORMATIONAL:0};
  alerts.forEach(a=>{if(sc[a.severity]!==undefined) sc[a.severity]++;});
  const riskExp = txns.filter(t=>t.riskTier==="CRITICAL"||t.riskTier==="HIGH").reduce((acc,t)=>acc+(t.amount||0),0);
  const regions = ["Southwest","Southeast","Midwest","Northwest","Northeast"];
  const regionSpend = regions.map(r=>txns.filter(t=>t.region===r).reduce((s,t)=>s+(t.amount||0),0));
  const wk = Array.from({length:8},(_,i)=>({l:`W${i+1}`,v:txns.filter(t=>new Date(t.date)>=new Date(Date.now()-(7-i)*7*864e5)&&new Date(t.date)<new Date(Date.now()-(6-i)*7*864e5)).reduce((s,t)=>s+(t.amount||0),0)}));
  const donut = [{label:"Critical",v:sc.CRITICAL||.1,color:DS.critical},{label:"High",v:sc.HIGH||.1,color:DS.high},{label:"Medium",v:sc.MEDIUM||.1,color:DS.medium},{label:"Low",v:sc.LOW||.1,color:DS.low}];
  const topV = vens.map(v=>({...v,ac:alerts.filter(a=>a.vendorId===v.id).length})).sort((a,b)=>b.ac-a.ac).slice(0,5);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      {/* Dataset banner */}
      <div style={{padding:"8px 14px",background:DS.p3,border:`1px solid ${DS.p4}`,borderRadius:DS.r2,fontSize:11,color:DS.primary,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{fontWeight:700}}>📊 Active Datasets:</span>
        {["DS1 Clean Baseline (TX)","DS2 Duplicate Payments (TN)","DS3 Vendor Fraud Network (AZ/SW)","DS4 Procurement Violations (Midwest)","DS5 Split Transactions (FL)","DS6 ML Anomalies (Pacific NW)"].map(d=>(
          <span key={d} style={{background:DS.p4,borderRadius:DS.r1,padding:"1px 7px",fontWeight:600}}>{d}</span>
        ))}
      </div>

      {/* KPI strip */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <KPI icon="📄" label="Transactions"   value={txns.length}  sub={`$${(txns.reduce((a,t)=>a+(t.amount||0),0)/1e6).toFixed(2)}M total`} color={DS.p2}     tip="Total grant expenditure transactions (DS1-DS6)" spark={wk.map(w=>w.v)}/>
        <KPI icon="🚨" label="Open Alerts"    value={alerts.filter(a=>a.status==="OPEN").length} sub={`${sc.CRITICAL} critical`} color={DS.critical} tip="Active rule violations requiring review" spark={[3,5,4,7,8,6,9,alerts.length]}/>
        <KPI icon="💰" label="Risk Exposure"  value={`$${(riskExp/1e6).toFixed(2)}M`} sub="Critical+High txns" color={DS.high}   tip="Dollar value of high-risk transactions" spark={regionSpend}/>
        <KPI icon="🧠" label="ML Anomalies"   value={mlStats?mlStats.cnt:0} sub={mlStats?`${mlStats.bases} baselines`:"—"} color={DS.purple} tip="Z-score outliers (|z|>2.5σ)"/>
        <KPI icon="🕸" label="Network Alerts" value={graphAlerts?graphAlerts.length:0} sub="Graph patterns" color={DS.teal}   tip="Entity relationship fraud patterns"/>
        <KPI icon="📁" label="Open Cases"     value={cases.filter(c=>c.status==="OPEN").length} sub={`${cases.length} total`} color={DS.purple} tip="Active investigation cases"/>
      </div>

      {/* Charts row */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 250px",gap:16}}>
        <Card><Sec title="Grant Spend — 8 Weeks" sub="Weekly transaction volume across all 6 datasets"><MBar data={wk} h={80} color={DS.p2}/></Sec></Card>
        <Card><Sec title="Risk Distribution">
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <Donut data={donut} size={90}/>
            <div style={{flex:1}}>{donut.map(d=>(
              <div key={d.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"3px 0",fontSize:11}}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <span style={{width:7,height:7,borderRadius:"50%",background:d.color,display:"inline-block"}}/>
                  <span style={{color:DS.t2}}>{d.label}</span>
                </div>
                <span style={{fontWeight:700,color:d.color}}>{Math.floor(d.v)}</span>
              </div>
            ))}</div>
          </div>
        </Sec></Card>
      </div>

      {/* Vendor + Alerts row */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Card><Sec title="Top Risk Vendors" sub="Most flagged across DS1-DS6">
          {topV.map((v,i)=>(
            <div key={v.id} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:i<4?`1px solid ${DS.bd}`:"none"}}>
              <div style={{width:24,height:24,borderRadius:DS.r1,background:DS.p3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:DS.p2,flexShrink:0}}>{i+1}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:600,color:DS.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.name}</div>
                <div style={{fontSize:10,color:DS.t4}}>{v.region}</div>
              </div>
              {v.debar&&<Chip c={DS.critical} bg={DS.cBg} bd={DS.cBd} sm>Debarred</Chip>}
              {v.coi&&<Chip c={DS.high} bg={DS.hBg} bd={DS.hBd} sm>COI</Chip>}
              <div style={{fontSize:12,fontWeight:700,color:v.ac>0?DS.critical:DS.t3}}>{v.ac} alerts</div>
            </div>
          ))}
        </Sec></Card>
        <Card><Sec title="Recent Critical Alerts">
          {alerts.filter(a=>a.severity==="CRITICAL"||a.severity==="HIGH").slice(0,5).map((a,i)=>(
            <div key={a.id} style={{display:"flex",gap:9,padding:"7px 0",borderBottom:i<4?`1px solid ${DS.bd}`:"none"}}>
              <div style={{width:3,borderRadius:2,background:RM[a.severity]&&RM[a.severity].dot,flexShrink:0,alignSelf:"stretch"}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:11,fontWeight:600,color:DS.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{(a.label||"").slice(0,55)}</div>
                <div style={{fontSize:10,color:DS.t4,marginTop:1}}>{a.ruleId} · {a.omb}</div>
              </div>
              <Badge tier={a.severity} sm/>
            </div>
          ))}
          {alerts.length===0&&<div style={{color:DS.t4,fontSize:12,textAlign:"center",padding:"20px 0"}}>✅ No alerts — system is clean.</div>}
        </Sec></Card>
      </div>

      <ROICalculator/>
    </div>
  );
}