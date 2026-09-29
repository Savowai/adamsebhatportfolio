import { ogSize, renderOg } from "@/lib/og";

export const alt = "Adam Sebhat, AI Engineer: I build AI that knows when to stop and ask.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ kicker: "AI Engineer", title: "I build AI that knows when to stop and ask.", coords: "34.0522°N 118.2437°W" });
}
