import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const font = (f: string) => readFile(join(process.cwd(), "assets", f));

/** Shared Open Graph card: a survey sheet with a title, a kicker and coordinates. */
export async function renderOg({ kicker, title, coords }: { kicker: string; title: string; coords: string }) {
  const [serif, mono] = await Promise.all([font("InstrumentSerif-Regular.ttf"), font("JetBrainsMono-Medium.ttf")]);
  const long = title.length > 34;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f1ede2",
          color: "#1a1a17",
          padding: "56px 64px",
          borderLeft: "28px solid #1a1a17",
          fontFamily: "Mono",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 2, borderBottom: "2px solid #1a1a17", paddingBottom: 18 }}>
          <span>ADAM SEBHAT</span>
          <span>{kicker.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", fontFamily: "Serif", fontSize: long ? 92 : 124, lineHeight: 0.95, letterSpacing: -2 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, letterSpacing: 2 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 18, height: 18, borderRadius: 9, background: "#e0521f" }} />
            {coords}
          </span>
          <span>ADAMSEBHATPORTFOLIO.VERCEL.APP</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
        { name: "Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
