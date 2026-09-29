import flock from "@/data/flock-la.json";

/** Fig. 1 on the home page: the Savowai pipeline drawn as a surveyed route. */
export function PipelineFigure() {
  const stops = [
    { x: 100, y: 330, label: "SCOUT", lx: 78, ly: 370 },
    { x: 300, y: 196, label: "RESEARCH", lx: 262, ly: 170 },
    { x: 520, y: 300, label: "BUILD", lx: 496, ly: 340 },
    { x: 720, y: 160, label: "OUTREACH", lx: 674, ly: 134 },
  ];
  const gates = [
    [202, 280],
    [422, 236],
    [622, 256],
  ];
  return (
    <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full" role="img" aria-label="Pipeline route: scout, research, build, outreach, with a human approval gate between each stage.">
      <path
        d="M60 330 C180 330 200 190 330 190 S520 330 620 250 S720 150 760 150"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeDasharray="6 6"
      />
      <g fontFamily="var(--font-mono)" fontSize="15" fill="var(--ink)">
        {stops.map((s) => (
          <g key={s.label}>
            <circle cx={s.x} cy={s.y} r="9" fill="var(--orange)" />
            <text x={s.lx} y={s.ly}>
              {s.label}
            </text>
          </g>
        ))}
        {gates.map(([x, y]) => (
          <path key={x} d={`M${x - 12} ${y} l12 -12 l12 12 l-12 12z`} fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1.5" />
        ))}
        <text x="60" y="460" fill="var(--ink-2)">
          ◇ = human approval gate
        </text>
      </g>
    </svg>
  );
}

/** Fig. 2: every mapped Flock camera in the LA basin, from the analysis repo's data. */
export function FlockFigure() {
  return (
    <svg
      viewBox={`0 0 ${flock.width} ${flock.height}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label={`${flock.shown.toLocaleString()} mapped Flock license-plate cameras across the Los Angeles basin.`}
    >
      <path d={flock.d} stroke="var(--orange)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
    </svg>
  );
}

/** Stage diagram used in the Savowai case study. */
export function StageSchematic() {
  const agents = [
    ["ARIA", "scout"],
    ["MARCUS", "research"],
    ["RILEY", "build site"],
    ["JORDAN", "outreach"],
  ];
  return (
    <figure className="border border-ink bg-paper-2 px-3.5 pt-4.5 pb-3">
      <div className="table-scroll">
        <svg viewBox="0 0 720 190" className="block h-auto w-full min-w-[520px]" role="img" aria-label="Aria scouts, Marcus researches, Riley builds, Jordan writes outreach. A human approval gate sits between every stage, and the approval queue is the only path to a real action.">
          <g fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink)">
            <line x1="40" y1="80" x2="690" y2="80" stroke="var(--ink)" strokeWidth="1.5" />
            {agents.map(([name, role], i) => {
              const x = 20 + i * 195;
              return (
                <g key={name}>
                  <rect x={x} y="58" width="120" height="44" fill="var(--paper)" stroke="var(--ink)" />
                  <text x={x + 14} y="78">
                    {name}
                  </text>
                  <text x={x + 14} y="94" fill="var(--ink-2)">
                    {role}
                  </text>
                  {i < 3 && <path d={`M${x + 150} 80 l12 -12 l12 12 l-12 12z`} fill="var(--orange)" />}
                </g>
              );
            })}
            <path d="M182 104 V150 H572 V104" fill="none" stroke="var(--ink)" strokeDasharray="4 4" />
            <text x="236" y="172">
              queue/decide: the only path to a real action
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="label mt-2.5">Fig. 3 · Stages and approval gates (◆)</figcaption>
    </figure>
  );
}
