import { DS } from "@/utils/tokens";
export default function Spin() {
  return <div style={{display:"inline-block",width:15,height:15,border:`2px solid ${DS.bd2}`,borderTopColor:DS.p2,borderRadius:"50%",animation:"spin .7s linear infinite"}}/>;
}