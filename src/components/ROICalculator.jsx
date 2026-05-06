import { DS } from "@/utils/tokens";
import { Card, Sec } from "@/components/ui";
import { useAppState } from "@/context/AppContext";

export default function ROICalculator() {
  const { s, d } = useAppState();
  const { roi } = s;
  const upd = (k,v) => d({type:"SET_ROI",v:{[k]:+v||0}});
  const flagAmt = s.txns.filter(t=>t.riskTier!=="INFORMATIONAL").reduce((acc,t)=>acc+(t.amount||0),0);
  const fPrev = Math.round(flagAmt*.65*.4);
  const findings = s.alerts.filter(a=>a.severity==="CRITICAL"||a.severity==="HIGH").length;
  const auditSaved = findings*roi.findCost;
  const hrs = Math.round(s.alerts.length*3.5);
  const laborSaved = hrs*roi.rate;
  const total = fPrev+auditSaved+laborSaved;
  const roiPct = roi.sub>0 ? Math.round((total/roi.sub-1)*100) : 0;

  const SL = ({k,l,min,max,step=1000,fmt=(v)=>`$${v.toLocaleString()}`}) => (
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
        <span style={{color:DS.t3}}>{l}</span>
        <span style={{fontWeight:700,color:DS.t1}}>{fmt(roi[k])}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={roi[k]} onChange={e=>upd(k,e.target.value)} style={{width:"100%",accentColor:DS.p2}}/>
    </div>
  );

  return (
    <Card sx={{border:`2px solid ${DS.p3}`}}>
      <Sec title="💰 ROI Calculator" sub="Adjust inputs to estimate your return on investment">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:DS.t4,letterSpacing:.5,marginBottom:12,textTransform:"uppercase"}}>Your Organization</div>
            <SL k="vol"      l="Annual Grant Portfolio"   min={100000}  max={50000000} step={100000}/>
            <SL k="findCost" l="Avg. Audit Finding Cost"  min={5000}    max={200000}   step={5000}/>
            <SL k="rate"     l="Compliance Staff $/hr"    min={30}      max={200}      step={5} fmt={v=>`$${v}/hr`}/>
            <SL k="sub"      l="FraudGuard Annual Cost"   min={0}       max={100000}   step={1000}/>
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:DS.t4,letterSpacing:.5,marginBottom:12,textTransform:"uppercase"}}>Estimated Return</div>
            {[[fPrev,DS.critical,"Fraud Prevented",`${findings} high-risk txns × 65% recovery`],[auditSaved,DS.high,"Audit Cost Saved",`${findings} findings × $${roi.findCost.toLocaleString()}`],[laborSaved,DS.medium,"Staff Hours Saved",`${hrs} hrs × $${roi.rate}/hr`]].map(([val,color,label,note])=>(
              <div key={label} style={{padding:"9px 12px",marginBottom:8,borderRadius:DS.r2,background:DS.s2,border:`1px solid ${DS.bd}`}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:11,color:DS.t3}}>{label}</span>
                  <span style={{fontSize:13,fontWeight:700,color}}>${val.toLocaleString()}</span>
                </div>
                <div style={{fontSize:10,color:DS.t4,marginTop:1}}>{note}</div>
              </div>
            ))}
            <div style={{padding:"14px",borderRadius:DS.r2,background:DS.p3,border:`2px solid ${DS.p2}`,textAlign:"center",marginTop:8}}>
              <div style={{fontSize:42,fontWeight:900,color:DS.p2,lineHeight:1}}>{roiPct}%</div>
              <div style={{fontSize:12,fontWeight:700,color:DS.p2}}>Estimated Annual ROI</div>
              <div style={{fontSize:10,color:DS.t3,marginTop:3}}>${total.toLocaleString()} benefit on ${roi.sub.toLocaleString()} cost</div>
            </div>
          </div>
        </div>
      </Sec>
    </Card>
  );
}