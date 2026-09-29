// Builds src/data/la-contours.json: real elevation contours for central Los Angeles.
// Source: AWS Terrain Tiles (Terrarium encoding), public, no key needed.
// Run: node scripts/build-contours.mjs
import fs from "node:fs";
import { PNG } from "pngjs";
import { contours } from "d3-contour";

const Z = 11;
// Santa Monica Mountains down through downtown LA
const BBOX = { west: -118.52, east: -118.16, north: 34.2, south: 34.0 };
const INTERVAL_M = 50;
const OUT_W = 240; // sample grid width

const lon2x = (lon) => ((lon + 180) / 360) * 2 ** Z;
const lat2y = (lat) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** Z;
};

const x0 = lon2x(BBOX.west), x1 = lon2x(BBOX.east);
const y0 = lat2y(BBOX.north), y1 = lat2y(BBOX.south);
const tiles = new Map();

async function tile(tx, ty) {
  const key = `${tx}/${ty}`;
  if (!tiles.has(key)) {
    const url = `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${Z}/${tx}/${ty}.png`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    tiles.set(key, PNG.sync.read(Buffer.from(await res.arrayBuffer())));
  }
  return tiles.get(key);
}

const OUT_H = Math.round(OUT_W * ((y1 - y0) / (x1 - x0)));
const values = new Float64Array(OUT_W * OUT_H);
for (let j = 0; j < OUT_H; j++) {
  for (let i = 0; i < OUT_W; i++) {
    const fx = x0 + ((i + 0.5) / OUT_W) * (x1 - x0);
    const fy = y0 + ((j + 0.5) / OUT_H) * (y1 - y0);
    const t = await tile(Math.floor(fx), Math.floor(fy));
    const px = Math.min(255, Math.floor((fx % 1) * 256));
    const py = Math.min(255, Math.floor((fy % 1) * 256));
    const k = (py * 256 + px) * 4;
    values[j * OUT_W + i] = t.data[k] * 256 + t.data[k + 1] + t.data[k + 2] / 256 - 32768;
  }
}

const max = Math.max(...values);
const thresholds = [];
for (let v = INTERVAL_M; v < max; v += INTERVAL_M) thresholds.push(v);

const round = (n) => Math.round(n * 10) / 10;
// Drop vertices closer than MIN_STEP to the last kept one; keeps paths small.
const MIN_STEP = 1.6;
const thin = (ring) => {
  let last = ring[0];
  return ring.filter((p, i) => {
    if (i > 0 && Math.hypot(p[0] - last[0], p[1] - last[1]) < MIN_STEP) return false;
    last = p;
    return true;
  });
};
// Rings that reach the grid edge get closed along it, which draws a frame around the map.
// Break each ring wherever it touches the edge so only real contour lines remain.
const EDGE = 0.75;
const onEdge = ([x, y]) => x <= EDGE || y <= EDGE || x >= OUT_W - EDGE || y >= OUT_H - EDGE;
const toPath = (ring) => {
  let d = "";
  let pen = false;
  for (const p of [...ring, ring[0]]) {
    if (onEdge(p)) {
      pen = false;
      continue;
    }
    d += `${pen ? "L" : "M"}${round(p[0])} ${round(p[1])}`;
    pen = true;
  }
  return d;
};

const levels = contours().size([OUT_W, OUT_H]).smooth(true).thresholds(thresholds)(values)
  .map((c) => ({
    elevation: c.value,
    d: c.coordinates
      .flatMap((poly) => poly)
      .filter((ring) => ring.length > 12)
      .map(thin)
      .map(toPath)
      .join(""),
  }))
  .filter((l) => l.d);

fs.writeFileSync(
  new URL("../src/data/la-contours.json", import.meta.url),
  JSON.stringify({ bbox: BBOX, width: OUT_W, height: OUT_H, intervalM: INTERVAL_M, levels })
);
console.log(`${levels.length} levels, max ${Math.round(max)} m, ${OUT_W}x${OUT_H}`);
