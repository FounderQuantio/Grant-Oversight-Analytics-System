import { DS } from "@/utils/tokens";
export default function Card({ children, sx = {}, p = 20 }) {
  return (
    <div style={{background:DS.surface,borderRadius:DS.r3,border:`1px solid ${DS.bd}`,boxShadow:DS.sh1,padding:p,...sx}}>
      {children}
    </div>
  );
}