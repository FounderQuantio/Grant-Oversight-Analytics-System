import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { DS, ROLES } from "@/utils/tokens";
import { Sidebar, Header, Notifications, SiteHeader, SiteFooter } from "@/components/layout";
import { Spin } from "@/components/ui";
import { useAppState } from "@/context/AppContext";
import Wizard from "@/pages/Wizard";
import HomePage from "@/pages/HomePage";
import QuantioLandingPreview from "@/pages/QuantioLandingPreview";
import Overview from "@/pages/Overview";
import Transactions from "@/pages/Transactions";
import Alerts from "@/pages/Alerts";
import Cases from "@/pages/Cases";
import Compliance from "@/pages/Compliance";
import Settings from "@/pages/Settings";
import AtAGlance from "@/pages/AtAGlance";

const VIEW_META = {
  "/fraud-guard":              { title:"Overview",           sub:"Portfolio risk · ROI calculator · DS1–DS6 real-time monitoring" },
  "/fraud-guard/alerts":       { title:"Alert Queue",        sub:"OMB 2 CFR 200 violations · Corrective actions · Case creation" },
  "/fraud-guard/transactions": { title:"Transactions",       sub:"150 real transactions (DS1–DS6) · ML risk scoring · Batch payment holds" },
  "/fraud-guard/cases":        { title:"Case Management",    sub:"Investigation workflow · Evidence packages · OIG report export" },
  "/fraud-guard/compliance":   { title:"Compliance Reports", sub:"OMB control matrix (CC-001–CC-010) · GAO Green Book · Audit readiness" },
  "/fraud-guard/glance":       { title:"Framework at a Glance", sub:"What FraudGuard is, who uses it, who benefits, cost, access, and key results" },
  "/fraud-guard/settings":     { title:"Settings",           sub:"Detection rules (R001–R010) · Graph analytics · Role-based access control" },
};

function LoadingScreen() {
  return (
    <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:DS.bg,flexDirection:"column",gap:13}}>
      <div style={{width:44,height:44,borderRadius:DS.r3,background:DS.p2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,color:"#fff"}}>G</div>
      <Spin/>
      <div style={{fontSize:12,color:DS.t3,fontWeight:600}}>Initializing FraudGuard Enterprise · Loading DS1–DS6…</div>
    </div>
  );
}

function Shell() {
  const location = useLocation();
  const navigate  = useNavigate();
  const { s }    = useAppState();
  const role     = ROLES[s.role] || ROLES.compliance;
  const meta     = VIEW_META[location.pathname] || { title:"FraudGuard", sub:"" };

  const pathToId = {
    "/fraud-guard":              "overview",
    "/fraud-guard/alerts":       "alerts",
    "/fraud-guard/transactions": "transactions",
    "/fraud-guard/cases":        "cases",
    "/fraud-guard/compliance":   "compliance",
    "/fraud-guard/glance":       "glance",
    "/fraud-guard/settings":     "settings",
  };
  const active    = pathToId[location.pathname] || "overview";
  const setActive = (id) => {
    const idToPath = {
      overview:     "/fraud-guard",
      alerts:       "/fraud-guard/alerts",
      transactions: "/fraud-guard/transactions",
      cases:        "/fraud-guard/cases",
      compliance:   "/fraud-guard/compliance",
      glance:       "/fraud-guard/glance",
      settings:     "/fraud-guard/settings",
    };
    navigate(idToPath[id] || "/fraud-guard");
  };

  if (s.wizard) return <Wizard />;

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:DS.bg,overflow:"hidden"}}>
      <SiteHeader/>
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        <Sidebar active={active} setActive={setActive}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <Header title={meta.title} sub={meta.sub}/>
          <main style={{flex:1,overflowY:"auto",padding:20}}>
            <Routes>
              <Route path="/"             element={<Overview/>}/>
              <Route path="/alerts"       element={<Alerts/>}/>
              <Route path="/transactions" element={<Transactions/>}/>
              <Route path="/cases"        element={<Cases/>}/>
              <Route path="/compliance"   element={<Compliance/>}/>
              <Route path="/glance"       element={<AtAGlance/>}/>
              <Route path="/settings"     element={role.views.includes("settings") ? <Settings/> : <Navigate to="/fraud-guard" replace/>}/>
              <Route path="*"             element={<Navigate to="/fraud-guard" replace/>}/>
            </Routes>
          </main>
        </div>
        <Notifications/>
      </div>
      <SiteFooter/>
    </div>
  );
}

function HomeRoute() {
  const navigate = useNavigate();
  return <HomePage onEnterFraudGuard={() => navigate("/fraud-guard")} />;
}

export default function App() {
  const { s } = useAppState();

  if (!s.loaded) return <LoadingScreen />;

  return (
    <>
      <Routes>
        <Route path="/"              element={<HomeRoute />} />
        <Route path="/preview"       element={<QuantioLandingPreview />} />
        <Route path="/fraud-guard/*" element={<Shell />} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
      <style>{`
        *, body { color: inherit; }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { transform: translateX(50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes barFill { from { width: 0; } to { width: 100%; } }
        button:not([disabled]):hover { filter: brightness(0.96); }
        tr:hover td { background: rgba(33,36,39,0.04) !important; }
      `}</style>
    </>
  );
}
