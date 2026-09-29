"use client";

import { useEffect, useRef } from "react";

type BBox = { west: number; east: number; north: number; south: number };

const fmt = (lat: number, lon: number) =>
  `${Math.abs(lat).toFixed(4)}°${lat >= 0 ? "N" : "S"} ${Math.abs(lon).toFixed(4)}°${lon >= 0 ? "E" : "W"}`;

const HOME = fmt(34.0522, -118.2437);

/** Live latitude/longitude of the cursor over the contour map. Pointer devices only. */
export function CoordinateReadout() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;
    const el = ref.current;
    if (!el) return;
    el.hidden = false;

    const onMove = (e: PointerEvent) => {
      const svg = document.querySelector<SVGSVGElement>("svg.contours");
      const ctm = svg?.getScreenCTM();
      const r = svg?.getBoundingClientRect();
      if (!svg || !ctm || !r || e.clientY < r.top || e.clientY > r.bottom) {
        el.textContent = HOME;
        return;
      }
      const bbox: BBox = JSON.parse(svg.dataset.bbox!);
      const vb = svg.viewBox.baseVal;
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
      const lon = bbox.west + (p.x / vb.width) * (bbox.east - bbox.west);
      const lat = bbox.north - (p.y / vb.height) * (bbox.north - bbox.south);
      el.textContent = fmt(lat, lon);
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      hidden
      aria-hidden="true"
      className="pointer-events-none fixed right-4 bottom-4 z-20 bg-ink px-2.5 py-1.5 font-mono text-[11px] text-paper tabular-nums"
    >
      {HOME}
    </div>
  );
}
