// Builds src/data/flock-la.json from the Flock analysis repo's camera GeoJSON.
// Run: node scripts/build-camera-map.mjs "<path to flock-demographics-analysis>/web/public/data/cameras_la.geojson"
import fs from "node:fs";

const src = process.argv[2];
if (!src) throw new Error("Pass the path to cameras_la.geojson");
const { features } = JSON.parse(fs.readFileSync(src, "utf8"));

const flock = features
  .filter((f) => f.properties.category.startsWith("Flock"))
  .map((f) => f.geometry.coordinates);

// Crop to the populated basin so the plate isn't mostly desert.
const BBOX = { west: -118.7, east: -117.7, north: 34.35, south: 33.7 };
const inBox = flock.filter(([lon, lat]) => lon >= BBOX.west && lon <= BBOX.east && lat >= BBOX.south && lat <= BBOX.north);

const W = 800;
const kx = Math.cos((((BBOX.north + BBOX.south) / 2) * Math.PI) / 180);
const H = Math.round((W * (BBOX.north - BBOX.south)) / ((BBOX.east - BBOX.west) * kx));
const px = ([lon, lat]) => [
  Math.round(((lon - BBOX.west) / (BBOX.east - BBOX.west)) * W),
  Math.round(((BBOX.north - lat) / (BBOX.north - BBOX.south)) * H),
];

// One path of zero-length segments; round caps draw each as a dot.
const seen = new Set();
const d = inBox
  .map(px)
  .filter(([x, y]) => (seen.has(`${x},${y}`) ? false : seen.add(`${x},${y}`)))
  .map(([x, y]) => `M${x} ${y}h0`)
  .join("");

fs.writeFileSync(
  new URL("../src/data/flock-la.json", import.meta.url),
  JSON.stringify({ bbox: BBOX, width: W, height: H, total: flock.length, shown: inBox.length, d })
);
console.log(`${flock.length} Flock cameras in LA County, ${inBox.length} in frame, ${W}x${H}`);
