import { ogSize, renderOg } from "@/lib/og";

export const alt = "Adam Sebhat, AI Engineer: agentic systems, retrieval pipelines, and evaluation.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ kicker: "AI Engineer", title: "Agentic systems, retrieval pipelines, and evaluation.", coords: "34.0522°N 118.2437°W" });
}
