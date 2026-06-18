import { useAppState } from "@/context/AppContext";
import { DS } from "@/utils/tokens";

export default function ThemeToggle({ style = {} }) {
  const { s, d } = useAppState();
  const isDark = s.darkMode;
  return (
    <button
      onClick={() => d({ type: "TOGGLE_DARK" })}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        background: DS.s2, border: `1px solid ${DS.bd2}`,
        borderRadius: DS.r2, padding: "5px 11px",
        cursor: "pointer", fontSize: 11, fontWeight: 600,
        color: DS.t3, transition: "all 0.15s", flexShrink: 0,
        ...style,
      }}
    >
      <span style={{ fontSize: 14, lineHeight: 1 }}>{isDark ? "🌙" : "☀️"}</span>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
