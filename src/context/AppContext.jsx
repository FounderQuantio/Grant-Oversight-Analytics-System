import React, { createContext, useContext, useReducer, useEffect } from "react";
import { buildRealTxns } from "@/data/transactions";
import { VEND_DB } from "@/data/referenceData";
import { INIT_RULES, runRules } from "@/services/rulesEngine";
import { runML, velAnomalies, scoreAll } from "@/services/mlEngine";
import { runGraph } from "@/services/graphEngine";

function reducer(s, a) {
  switch (a.type) {
    case "INIT": return {...s,...a.p,loaded:true,notifs:[{id:1,type:"ok",msg:`FraudGuard ready. ${(a.p.txns||[]).length} transactions (DS1-DS6) · ${(a.p.alerts||[]).length} alerts detected.`,ts:Date.now()}]};
    case "SET_ALERTS":  return {...s,alerts:a.v};
    case "SET_TXNS":    return {...s,txns:a.v};
    case "SET_GRAPH":   return {...s,graphAlerts:a.v};
    case "SET_ML":      return {...s,mlStats:a.v};
    case "SET_ROI":     return {...s,roi:{...s.roi,...a.v}};
    case "SET_ROLE":    return {...s,role:a.v};
    case "WIZARD_OK":   return {...s,wizard:false};
    case "HOLD":        return {...s,txns:s.txns.map(t=>t.id===a.id?{...t,hold:true}:t),alerts:s.alerts.map(al=>al.txnId===a.id?{...al,hold:true}:al)};
    case "HOLD_BATCH":  return {...s,txns:s.txns.map(t=>a.ids.includes(t.id)?{...t,hold:true}:t)};
    case "CASE_NEW":    return {...s,cases:[a.v,...s.cases],notifs:[{id:Date.now(),type:"ok",msg:`Case ${a.v.id} created.`,ts:Date.now()},...s.notifs].slice(0,20)};
    case "CASE_UPD":    return {...s,cases:s.cases.map(c=>c.id===a.v.id?{...c,...a.v}:c),log:[{id:Date.now(),act:"CASE_UPDATED",detail:`${a.v.id} -> ${a.v.status||"updated"}`,ts:new Date().toISOString()},...s.log].slice(0,500)};
    case "RULE_TOG":    return {...s,rules:s.rules.map(r=>r.id===a.id?{...r,on:!r.on}:r)};
    case "DISMISS":     return {...s,notifs:s.notifs.filter(n=>n.id!==a.id)};
    case "LOG":         return {...s,log:[{id:Date.now(),act:a.act,detail:a.detail,ts:new Date().toISOString()},...s.log].slice(0,500)};
    case "TOGGLE_DARK": return {...s,darkMode:!s.darkMode};
    default: return s;
  }
}

const INIT_STATE = {
  loaded:false, wizard:true, role:"compliance",
  txns:[],vens:[],alerts:[],cases:[],rules:INIT_RULES,
  log:[],notifs:[],graphAlerts:[],mlStats:null,
  roi:{vol:15000000,findCost:25000,rate:65,sub:12000},
  darkMode:false,
};

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [s, d] = useReducer(reducer, INIT_STATE);

  useEffect(() => {
    document.documentElement.dataset.theme = s.darkMode ? "dark" : "light";
  }, [s.darkMode]);

  useEffect(() => {
    const txns = buildRealTxns();
    const vens = VEND_DB.map(v=>({...v}));
    const {mlAlerts,B} = runML(txns);
    const alerts = runRules(txns,vens,INIT_RULES);
    const scored = scoreAll(txns,alerts);
    for(const v of vens) v.spend = scored.filter(t=>t.vendorId===v.id).reduce((acc,t)=>acc+(t.amount||0),0);
    const gAlerts = runGraph(scored,vens);
    d({type:"INIT",p:{txns:scored,vens,alerts,graphAlerts:gAlerts,mlStats:{cnt:mlAlerts.length,bases:Object.keys(B).length,vel:velAnomalies(scored)}}});
  },[]);
  return <Ctx.Provider value={{s,d}}>{children}</Ctx.Provider>;
}

export const useAppState = () => useContext(Ctx);