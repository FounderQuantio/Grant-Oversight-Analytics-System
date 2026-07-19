/**
 * useDetection — re-runs all engines (rules, statistical, graph) on demand.
 * Used by the Settings page "Re-run Full Detection" button.
 */
import { useState } from "react";
import { runRules } from "@/services/rulesEngine";
import { runML, velAnomalies, scoreAll } from "@/services/mlEngine";
import { runGraph, graphScoresByVendor } from "@/services/graphEngine";
import { useAppState } from "@/context/AppContext";

export function useDetection() {
  const { s, d } = useAppState();
  const [running, setRunning] = useState(false);

  const rerun = () => {
    setRunning(true);
    // Defer to next tick so UI can show spinner
    setTimeout(() => {
      const { mlAlerts, B } = runML(s.txns);
      const alerts  = runRules(s.txns, s.vens, s.rules);
      const gAlerts = runGraph(s.txns, s.vens);
      const scored  = scoreAll(s.txns, alerts, graphScoresByVendor(gAlerts, s.vens));
      d({ type: "SET_ALERTS", v: alerts });
      d({ type: "SET_TXNS",   v: scored });
      d({ type: "SET_GRAPH",  v: gAlerts });
      d({ type: "SET_ML",     v: { cnt: mlAlerts.length, bases: Object.keys(B).length, vel: velAnomalies(scored) } });
      d({ type: "LOG", act: "FULL_RESCAN", detail: `${alerts.length} alerts · ${mlAlerts.length} statistical · ${gAlerts.length} graph` });
      setRunning(false);
    }, 500);
  };

  return { running, rerun };
}