import Image from "next/image";
import Link from "next/link";
import { bandFor, sheetNo, type Project } from "@/lib/projects";
import flock from "@/data/flock-la.json";
import { FlockFigure, PipelineFigure } from "./Figures";
import { StatusDot } from "./Chrome";

function Plate({ project, n }: { project: Project; n: number }) {
  const caption =
    project.figure === "pipeline" ? "Pipeline" : project.figure === "flock" ? "Flock cameras, LA basin" : project.kicker;
  return (
    <div className="relative aspect-[16/10] max-w-full overflow-hidden border border-ink bg-paper-2 transition-[outline] group-hover:outline-2 group-hover:-outline-offset-2 group-hover:outline-orange">
      {project.figure === "pipeline" && <PipelineFigure />}
      {project.figure === "flock" && <FlockFigure />}
      {project.figure === "image" && project.image && (
        <Image src={project.image} alt={project.imageAlt ?? ""} fill sizes="(min-width: 900px) 60vw, 100vw" className="object-cover object-top" />
      )}
      <span className="label absolute top-2.5 left-3 bg-paper-2/80 px-1">
        Fig. {n} · {caption}
      </span>
      <span className="label absolute top-2.5 right-3 hidden bg-paper-2/80 px-1 sm:block">
        {project.figure === "flock" ? `${flock.shown.toLocaleString("en-US")} cameras plotted` : project.coords}
      </span>
    </div>
  );
}

/** A featured case study. `flip` mirrors the layout so two features never look identical. */
export function FeaturedProject({ project, n, flip = false }: { project: Project; n: number; flip?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-band={bandFor(project)}
      className="group grid gap-s4 pb-s6 lg:grid-cols-12 lg:items-end"
    >
      <div className={flip ? "lg:col-span-8 lg:col-start-5 lg:row-start-1" : "lg:col-span-8"}>
        <Plate project={project} n={n} />
      </div>
      <div className={flip ? "lg:col-span-4 lg:col-start-1 lg:row-start-1" : "lg:col-span-4"}>
        <span className="label">
          {sheetNo(project)} · {project.kicker}
        </span>
        <h3 className="mt-2.5 mb-3 font-serif text-[clamp(34px,4.4vw,60px)] leading-[0.98] tracking-[-0.015em] group-hover:text-orange-ink group-hover:italic">
          {project.title}
        </h3>
        <p>{project.summary}</p>
        <dl className="label mt-4 grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1.5 border-t border-ink pt-3">
          {project.facts.map((f) => (
            <div key={f.label} className="contents">
              <dt className="text-ink-2">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <span className="label mt-4 inline-block">Read the case study →</span>
      </div>
    </Link>
  );
}

export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <ol className="border-t border-ink">
      {projects.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/work/${p.slug}`}
            data-band={bandFor(p)}
            className="group grid grid-cols-[40px_1fr] items-baseline gap-x-4 gap-y-1 border-b border-ink py-5 lg:grid-cols-[64px_4.5fr_5fr_2.4fr_1.6fr]"
          >
            <span className="label">{sheetNo(p)}</span>
            <span className="font-serif text-[clamp(28px,3.6vw,44px)] leading-none group-hover:text-orange-ink group-hover:italic">
              {p.title}
            </span>
            <span className="col-start-2 max-w-[46ch] text-[15px] lg:col-start-auto">{p.summary}</span>
            <span className="label col-start-2 tabular-nums lg:col-start-auto">{p.coords}</span>
            <span className="col-start-2 lg:col-start-auto">
              <StatusDot status={p.status} />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
