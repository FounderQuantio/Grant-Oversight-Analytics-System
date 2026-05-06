import { DS } from "@/utils/tokens";
import { Card, Sec, Btn } from "@/components/ui";
import { useAppState } from "@/context/AppContext";

const MATRIX_DEF = [
  {id:"CC-001",ctrl:"Payment Verification",       coso:"Control Activities",  gao:"OV1.10",omb:"2 CFR 200.305",    rule:"R001"},
  {id:"CC-002",ctrl:"Procurement Competition",    coso:"Control Activities",  gao:"AM1.03",omb:"2 CFR 200.320",    rule:"R005"},
  {id:"CC-003",ctrl:"Vendor Debarment Screen",    coso:"Control Environment", gao:"AM2.01",omb:"2 CFR 200.213",    rule:"R006"},
  {id:"CC-004",ctrl:"Conflict of Interest",       coso:"Control Environment", gao:"OV2.01",omb:"2 CFR 200.318(c)", rule:"R007"},
  {id:"CC-005",ctrl:"Period of Performance",      coso:"Monitoring",          gao:"OV1.05",omb:"2 CFR 200.309",    rule:"R008"},
  {id:"CC-006",ctrl:"FFR Reporting Timeliness",   coso:"Information & Comm.", gao:"OV4.01",omb:"2 CFR 200.328",    rule:"R004"},
  {id:"CC-007",ctrl:"New Vendor Vetting",         coso:"Control Activities",  gao:"AM2.02",omb:"2 CFR 200.318",    rule:"R002"},
  {id:"CC-008",ctrl:"Budget Variance Monitor",    coso:"Monitoring",          gao:"OV1.05",omb:"2 CFR 200.405",    rule:"R003"},
  {id:"CC-009",ctrl:"Transaction Structuring",    coso:"Control Activities",  gao:"AM1.05",omb:"31 U.S.C. 5324",   rule:"R009"},
  {id:"CC-010",ctrl:"Supporting Document Verify", coso:"Control Activities",  gao:"AM3.01",omb:"2 CFR 200.302",    rule:"R010"},
];

export default function Compliance() {
  const { s } = useAppState();
  const rh = (id) => s.alerts.some(a=>a.ruleId===id);
  const matrix = MATRIX_DEF.map(c=>({...c,ok:!rh(c.rule)}));
  const eff   = matrix.filter(c=>c.ok).length;
  const score = Math.round(eff/matrix.length*100);
  const sc    = score>=80?DS.ok:score>=60?DS.warn:DS.critical;

  const expLog = () => {
    const csv = ["Timestamp,Action,Detail",...s.log.map(l=>`"${l.ts}","${l.act}","${l.detail||""}"`)].join("\n");
    const url  = URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
    const a    = document.createElement("a");
    a.href=url; a.download="fraudguard_audit.csv"; a.click();
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      {/* Readiness score */}
      <Card sx={{display:"flex",alignItems:"center",gap:22}}>
        <div style={{textAlign:"center",padding:"8px 22px",borderRight:`1px solid ${DS.bd}`}}>
          <div style={{fontSize:50,fontWeight:900,color:sc,lineHeight:1}}>{score}%</div>
          <div style={{fontSize:10,fontWeight:700,color:DS.t4,marginTop:3}}>AUDIT READINESS</div>
        </div>
        <div style={{flex:1}}>
          <div style={{height:8,background:`${sc}20`,borderRadius:4,overflow:"hidden",marginBottom:10}}>
            <div style={{width:`${score}%`,height:"100%",background:sc,borderRadius:4,transition:"width .8s"}}/>
          </div>
          <div style={{display:"flex",gap:18,fontSize:12}}>
            <div><strong style={{color:DS.ok}}>{eff}</strong><span style={{color:DS.t3}}> Effective</span></div>
            <div><strong style={{color:DS.critical}}>{matrix.length-eff}</strong><span style={{color:DS.t3}}> Deficient</span></div>
            <div><strong style={{color:DS.t1}}>{s.alerts.length}</strong><span style={{color:DS.t3}}> Total Alerts</span></div>
          </div>
        </div>
        <Btn onClick={expLog} v="secondary" sz="sm">↓ Export Audit Log</Btn>
      </Card>

      {/* Control matrix */}
      <Card sx={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"12px 16px",borderBottom:`1px solid ${DS.bd}`,background:DS.s2}}>
          <h4 style={{margin:0,fontSize:13,fontWeight:700}}>OMB 2 CFR 200 Internal Control Matrix (CC-001 – CC-010)</h4>
          <p style={{margin:"2px 0 0",fontSize:10,color:DS.t4}}>COSO Framework · GAO Green Book · Real-time status from active alerts · DS1–DS6</p>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:DS.side}}>
            {["ID","Control","COSO","GAO","OMB Citation","Status"].map(h=>(
              <th key={h} style={{padding:"9px 13px",textAlign:"left",fontSize:10,fontWeight:600,color:"#94A3B8"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {matrix.map((c,i)=>(
              <tr key={c.id} style={{background:i%2===0?DS.surface:DS.s2,borderBottom:`1px solid ${DS.bd}`}}>
                <td style={{padding:"9px 13px",fontSize:10,fontWeight:700,fontFamily:"monospace",color:DS.p2}}>{c.id}</td>
                <td style={{padding:"9px 13px",fontSize:12}}>{c.ctrl}</td>
                <td style={{padding:"9px 13px",fontSize:11,color:DS.t3}}>{c.coso}</td>
                <td style={{padding:"9px 13px",fontSize:11,fontFamily:"monospace",color:DS.t3}}>{c.gao}</td>
                <td style={{padding:"9px 13px",fontSize:11,fontFamily:"monospace",color:DS.t3}}>{c.omb}</td>
                <td style={{padding:"9px 13px"}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,color:c.ok?DS.ok:DS.critical,background:c.ok?DS.lBg:DS.cBg,border:`1px solid ${c.ok?DS.lBd:DS.cBd}`}}>
                    {c.ok?"✓ EFFECTIVE":"✗ DEFICIENT"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Audit log */}
      <Card>
        <Sec title={`System Audit Log (${s.log.length})`} action={<Btn onClick={expLog} v="ghost" sz="sm">Export CSV</Btn>}>
          <div style={{maxHeight:170,overflowY:"auto"}}>
            {s.log.length===0
              ? <div style={{color:DS.t4,fontSize:11}}>No events yet.</div>
              : s.log.slice(0,25).map((l,i)=>(
                  <div key={i} style={{display:"flex",gap:10,padding:"5px 0",borderBottom:`1px solid ${DS.bd}`,fontSize:10}}>
                    <span style={{color:DS.t4,flexShrink:0,fontFamily:"monospace"}}>{new Date(l.ts).toLocaleString()}</span>
                    <span style={{fontWeight:700,color:DS.t1}}>{l.act}</span>
                    <span style={{color:DS.t3,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.detail}</span>
                  </div>
                ))
            }
          </div>
        </Sec>
      </Card>
    </div>
  );
}