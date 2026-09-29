import { getProject, getProjects } from "@/lib/projects";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Case study by Adam Sebhat";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug)!;
  return renderOg({ kicker: p.kicker, title: p.title, coords: p.coords });
}
