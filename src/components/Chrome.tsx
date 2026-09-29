import Link from "next/link";
import { site } from "@/lib/site";

/** Coordinate ruler down the left edge of the sheet. */
export function Ruler() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-y-0 left-0 z-10 hidden w-7 border-r border-ink bg-paper md:block"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, var(--ink) 0 1px, transparent 1px 2.5vh), repeating-linear-gradient(to bottom, var(--ink) 0 1px, transparent 1px 12.5vh)",
        backgroundSize: "8px 100%, 14px 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {["34°12′N", "34°06′N", "34°00′N"].map((t, i) => (
        <span
          key={t}
          className="absolute left-1.5 font-mono text-[9px] [writing-mode:vertical-rl] rotate-180"
          style={{ top: `${20 + i * 25}%` }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-ink py-[18px]">
      <Link href="/" className="font-serif text-[22px] leading-none tracking-[-0.01em]">
        {site.name}
      </Link>
      <nav aria-label="Primary" className="label flex gap-[18px]">
        <Link href="/#work" className="hover:text-orange-ink">
          Work
        </Link>
        <Link href="/#about" className="hover:text-orange-ink">
          About
        </Link>
        <Link href="/#contact" className="hover:text-orange-ink">
          Contact
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter({ sheet }: { sheet: string }) {
  return (
    <footer className="label flex flex-wrap justify-between gap-3 border-t border-ink pt-4 pb-14">
      <span>
        {site.name} · {sheet}
      </span>
      <span>Surveyed 2026 · Los Angeles</span>
    </footer>
  );
}

export function SectionHead({ left, right, id }: { left: string; right?: string; id?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-t border-ink pt-3.5 pb-s5">
      <h2 id={id} className="label">
        {left}
      </h2>
      {right && <span className="label">{right}</span>}
    </div>
  );
}

export function StatusDot({ status }: { status: string }) {
  const hollow = status === "In progress";
  return (
    <span className="label inline-flex items-center gap-1.5">
      <i
        aria-hidden="true"
        className={`inline-block size-2 rounded-full ${hollow ? "border-[1.5px] border-orange-ink" : "bg-ink"}`}
      />
      {status}
    </span>
  );
}
