import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { StageSchematic } from "../Figures";

/** A numbered chapter of a case study: roman numeral + label on the left, prose on the right. */
function Chapter({ n, label, children }: { n: string; label: string; children: ReactNode }) {
  return (
    <section className="grid gap-s4 pt-s6 lg:grid-cols-12" aria-label={label}>
      <div className="lg:col-span-3">
        <span className="block font-serif text-[64px] leading-none text-orange-ink" aria-hidden="true">
          {n}
        </span>
        <h2 className="label">{label}</h2>
      </div>
      <div className="prose-survey lg:col-span-7 lg:col-start-4">{children}</div>
    </section>
  );
}

/** Label/description rows, e.g. the steps of the shared agent loop. */
function Steps({ caption, items }: { caption: string; items: [string, string][] }) {
  return (
    <figure className="border border-ink bg-paper-2 px-3.5 pt-3 pb-3">
      <ol>
        {items.map(([k, v], i) => (
          <li
            key={k}
            className="grid grid-cols-[112px_1fr] gap-3 border-b border-ink/30 py-2.5 text-[14px] leading-snug last:border-b-0"
          >
            <b className="label text-orange-ink">
              {String(i + 1).padStart(2, "0")} {k}
            </b>
            <span>{v}</span>
          </li>
        ))}
      </ol>
      <figcaption className="label mt-2">{caption}</figcaption>
    </figure>
  );
}

/** Numbered decisions. Children are <Decision title="...">text</Decision>. */
function Decisions({ children }: { children: ReactNode }) {
  return <ol className="border-t border-ink [counter-reset:d]">{children}</ol>;
}

function Decision({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="grid grid-cols-[40px_1fr] border-b border-ink py-3.5 [counter-increment:d] before:font-mono before:text-[11px] before:leading-[2.2] before:content-[counter(d,decimal-leading-zero)]">
      <span>
        <b className="font-semibold">{title}</b> {children}
      </span>
    </li>
  );
}

/** Big numbers. Only use for figures that are the point. */
function Stats({ items }: { items: [string, string][] }) {
  return (
    <div className="grid grid-cols-2 border-t border-ink lg:grid-cols-4">
      {items.map(([v, l]) => (
        <div key={l} className="border-b border-ink py-4 pr-3">
          <strong className="block font-serif text-[clamp(40px,5vw,60px)] leading-none font-normal text-orange-ink tabular-nums">
            {v}
          </strong>
          <span className="label">{l}</span>
        </div>
      ))}
    </div>
  );
}

function Shot({ src, alt, caption, width = 1440, height = 900 }: { src: string; alt: string; caption: string; width?: number; height?: number }) {
  return (
    <figure>
      <div className="max-w-full overflow-hidden border border-ink">
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 900px) 60vw, 100vw" className="h-auto w-full" />
      </div>
      <figcaption className="label mt-2">{caption}</figcaption>
    </figure>
  );
}

/** A short video that plays in the page. Vertical clips are held to a phone width. */
function Clip({ src, poster, caption, vertical = false, wide = false, label }: { src: string; poster?: string; caption: string; vertical?: boolean; wide?: boolean; label: string }) {
  return (
    <figure>
      <div className={`max-w-full overflow-hidden border border-ink bg-ink ${vertical ? "mx-auto w-full max-w-[340px]" : ""}`}>
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          aria-label={label}
          className={`block h-auto w-full ${vertical ? "aspect-[9/16]" : wide ? "aspect-video" : "aspect-[16/10]"}`}
        />
      </div>
      <figcaption className="label mt-2">{caption}</figcaption>
    </figure>
  );
}

function Table(props: ComponentProps<"table">) {
  return (
    <div className="table-scroll" role="region" aria-label="Table" tabIndex={0}>
      <table {...props} />
    </div>
  );
}

export const mdxComponents = { Chapter, Steps, Decisions, Decision, Stats, Shot, Clip, StageSchematic, table: Table };
