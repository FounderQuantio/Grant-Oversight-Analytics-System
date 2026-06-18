import { useState } from "react";
import { DS } from "@/utils/tokens";
import { Card, Btn, Spin, ThemeToggle } from "@/components/ui";
import { useAppState } from "@/context/AppContext";

const ORGS = ["Municipality / County","Nonprofit / Housing Authority","State Agency","Tribal Government","Federal Contractor / Developer"];
const SRCS = [
  {l:"Demo Dataset (DS1-DS6)", d:"150 pre-loaded real sample records across 6 fraud scenarios", e:"🎯"},
  {l:"Upload CSV File",        d:"CSV from any accounting system",  e:"📁"},
  {l:"QuickBooks / Sage",      d:"Export from QuickBooks or Sage",  e:"📊"},
  {l:"SAP / Oracle ERP",       d:"Direct ERP connection",           e:"🔗"},
  {l:"Manual Entry",           d:"Enter transactions manually",     e:"✏️"},
];
const STEPS = [{l:"Organization",d:"Tell us about your org"},{l:"Data Source",d:"How you will provide data"},{l:"Launch Scan",d:"Run first detection"}];

export default function Wizard() {
  const { s, d } = useAppState();
  const [step, setStep]  = useState(0);
  const [org,  setOrg]   = useState("");
  const [src,  setSrc]   = useState("Demo Dataset (DS1-DS6)");
  const [going, setGoing] = useState(false);
  const [done,  setDone]  = useState(false);

  const finish = () => {
    setGoing(true);
    setTimeout(() => { setDone(true); setTimeout(() => d({type:"WIZARD_OK"}), 2200); }, 1600);
  };

  if(done) return (
    <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:DS.bg,flexDirection:"column",gap:14}}>
      <div style={{width:60,height:60,borderRadius:"50%",background:DS.lBg,border:`2px solid ${DS.lBd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>✅</div>
      <h2 style={{margin:0,color:DS.t1,fontSize:22,fontWeight:800}}>We found {s.alerts.length} alerts in your data</h2>
      <p style={{margin:0,color:DS.t3,fontSize:14}}>{s.alerts.filter(a=>a.severity==="CRITICAL").length} critical · {s.alerts.filter(a=>a.severity==="HIGH").length} high severity across 6 fraud datasets</p>
      <div style={{width:220,height:4,background:DS.bd,borderRadius:2,overflow:"hidden",marginTop:6}}>
        <div style={{width:"100%",height:"100%",background:DS.p2,animation:"barFill 1.8s ease forwards"}}/>
      </div>
      <p style={{color:DS.t4,fontSize:12,margin:0}}>Opening your dashboard…</p>
    </div>
  );

  return (
    <div style={{height:"100vh",display:"flex",background:DS.bg}}>
      {/* Left panel */}
      <div style={{width:300,background:DS.side,borderRight:`1px solid ${DS.bd}`,display:"flex",flexDirection:"column",padding:"40px 26px",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:44}}>
          <div style={{width:34,height:34,borderRadius:DS.r2,background:DS.sideAct,border:`1px solid ${DS.p3}`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:DS.primary,fontSize:12}}>FG</div>
          <div style={{fontWeight:800,fontSize:15,color:DS.t1}}>FraudGuard Enterprise</div>
        </div>
        <div style={{fontSize:10,fontWeight:700,color:DS.t4,letterSpacing:1,marginBottom:18,textTransform:"uppercase"}}>Setup Guide</div>
        {STEPS.map((st,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:18,opacity:i>step?.4:1}}>
            <div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:i===step?"#fff":DS.t3,background:i<step?DS.ok:i===step?DS.primary:DS.bd2}}>{i<step?"✓":i+1}</div>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:i===step?DS.t1:DS.t3}}>{st.l}</div>
              <div style={{fontSize:10,color:DS.t4}}>{st.d}</div>
            </div>
          </div>
        ))}
        <div style={{marginTop:"auto",fontSize:11,color:DS.t3,lineHeight:1.6}}>
          <div style={{fontWeight:700,marginBottom:4,color:DS.t2}}>📊 Dataset Coverage</div>
          DS1 Clean · DS2 Duplicates · DS3 Fraud Network · DS4 Procurement · DS5 Structuring · DS6 ML Anomalies
        </div>
      </div>

      {/* Right panel */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{display:"flex",justifyContent:"flex-end",padding:"14px 20px",borderBottom:`1px solid ${DS.bd}`}}>
          <ThemeToggle/>
        </div>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:48}}>
        <div style={{maxWidth:500,width:"100%"}}>
          <div style={{fontSize:10,fontWeight:700,color:"#C9A84C",letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>Step {step+1} of 3</div>

          {step===0 && <>
            <h2 style={{margin:"0 0 6px",fontSize:24,fontWeight:800,color:DS.t1}}>What type of organization are you?</h2>
            <p style={{margin:"0 0 24px",color:DS.t3,fontSize:13}}>We will pre-configure detection rules and OMB templates for your grant type.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {ORGS.map(o=>(
                <button key={o} onClick={()=>setOrg(o)} style={{padding:"14px",borderRadius:DS.r2,border:`2px solid ${org===o?"#C9A84C":DS.bd}`,background:org===o?"rgba(201,168,76,0.10)":DS.surface,cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                  <div style={{fontSize:12,fontWeight:700,color:org===o?"#C9A84C":DS.t1}}>{o}</div>
                </button>
              ))}
            </div>
            <div style={{marginTop:22,display:"flex",justifyContent:"flex-end"}}><Btn onClick={()=>org&&setStep(1)} dis={!org}>Next: Data Source →</Btn></div>
          </>}

          {step===1 && <>
            <h2 style={{margin:"0 0 6px",fontSize:24,fontWeight:800,color:DS.t1}}>How will you provide your data?</h2>
            <p style={{margin:"0 0 22px",color:DS.t3,fontSize:13}}>The demo dataset contains 150 transactions across 6 fraud scenarios (DS1-DS6).</p>
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {SRCS.map(sr=>(
                <button key={sr.l} onClick={()=>setSrc(sr.l)} style={{padding:"13px 16px",borderRadius:DS.r2,border:`2px solid ${src===sr.l?"#C9A84C":DS.bd}`,background:src===sr.l?"rgba(201,168,76,0.10)":DS.surface,cursor:"pointer",display:"flex",alignItems:"center",gap:12,fontFamily:"inherit"}}>
                  <span style={{fontSize:20,flexShrink:0}}>{sr.e}</span>
                  <div style={{textAlign:"left",flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:src===sr.l?"#C9A84C":DS.t1}}>{sr.l}</div>
                    <div style={{fontSize:10,color:DS.t3}}>{sr.d}</div>
                  </div>
                  {src===sr.l&&<span style={{color:"#C9A84C",fontWeight:800,marginLeft:"auto"}}>✓</span>}
                </button>
              ))}
            </div>
            <div style={{marginTop:20,display:"flex",gap:10,justifyContent:"flex-end"}}>
              <Btn onClick={()=>setStep(0)} v="secondary">← Back</Btn>
              <Btn onClick={()=>src&&setStep(2)} dis={!src}>Next: Launch →</Btn>
            </div>
          </>}

          {step===2 && <>
            <h2 style={{margin:"0 0 6px",fontSize:24,fontWeight:800,color:DS.t1}}>Ready to scan for fraud</h2>
            <p style={{margin:"0 0 20px",color:DS.t3,fontSize:13}}><strong>{org}</strong> · <strong>{src}</strong></p>
            <Card sx={{background:"rgba(201,168,76,0.06)",border:"1px solid rgba(201,168,76,0.20)",marginBottom:18}}>
              <div style={{fontSize:13,fontWeight:700,color:"#C9A84C",marginBottom:8}}>📋 Pre-configured for your organization</div>
              {["OMB 2 CFR 200 Uniform Guidance rules active (R001-R010)","SAM.gov debarment & COI screening enabled","Statistical anomaly detection (Z-score) ready","Graph entity relationship analysis enabled","150 real transactions across DS1-DS6 loaded"].map(txt=>(
                <div key={txt} style={{fontSize:12,color:DS.t2,marginBottom:3}}>✓ {txt}</div>
              ))}
            </Card>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <Btn onClick={()=>setStep(1)} v="secondary">← Back</Btn>
              <Btn onClick={finish} dis={going} sz="lg">{going?<><Spin/> Scanning your data...</>:"🚀 Run First Fraud Detection"}</Btn>
            </div>
          </>}
        </div>
      </div>
      </div>
    </div>
  );
}