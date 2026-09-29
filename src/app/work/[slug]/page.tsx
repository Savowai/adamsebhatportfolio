import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { SiteFooter, SiteHeader, StatusDot } from "@/components/Chrome";
import { mdxComponents } from "@/components/mdx";
import { getNextProject, getProject, getProjects, sheetNo } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.dek,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.dek, url: `/work/${p.slug}` },
  };
}

/** Sets the word named in `titleEm` in italic orange. */
function Title({ text, em }: { text: string; em?: string }) {
  if (!em || !text.includes(em)) return <>{text}</>;
  const [a, b] = text.split(em);
  return (
    <>
      {a}
      <em className="text-orange-ink">{em}</em>
      {b}
    </>
  );
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);
  const total = getProjects().length;

  return (
    <div className="wrap">
      <SiteHeader />
      <main id="main">
        <article>
          <header className="pt-14 pb-s5 lg:pt-24 lg:pb-s6">
            <p className="label flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-3">
              <span>
                Sheet {sheetNo(project)} · {project.kicker}
              </span>
              <span className="tabular-nums">{project.coords}</span>
              <StatusDot status={project.status} />
            </p>
            <h1 className="mt-3.5 font-serif text-[clamp(48px,9vw,136px)] leading-[0.9] tracking-[-0.025em]">
              <Title text={project.title} em={project.titleEm} />
            </h1>
            <p className="mt-s4 max-w-[34ch] font-serif text-[clamp(20px,2.2vw,28px)] leading-[1.3]">{project.dek}</p>
          </header>

          <dl className="grid grid-cols-2 border-y border-ink lg:grid-cols-4">
            {[
              ["Role", project.role],
              ["Timeline", project.timeline],
              ["Stack", project.stack.join(", ")],
            ].map(([k, v]) => (
              <div key={k} className="py-3.5 pr-3.5 lg:border-l lg:border-ink lg:pl-3.5 lg:first:border-l-0 lg:first:pl-0">
                <dt className="label">{k}</dt>
                <dd className="mt-1.5 text-[15px]">{v}</dd>
              </div>
            ))}
            <div className="py-3.5 pr-3.5 lg:border-l lg:border-ink lg:pl-3.5">
              <dt className="label">Links</dt>
              <dd className="mt-1.5 flex flex-wrap gap-x-4 text-[15px]">
                {project.links.length === 0 && <span className="text-ink-2">Not public yet</span>}
                {project.links.map((l) => (
                  <a key={l.href} href={l.href} className="link-underline">
                    {l.label} ↗
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          <MDXRemote
            source={project.body}
            components={mdxComponents}
            // Content is our own repo's MDX; JSX props like items={[...]} need expressions enabled.
            options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>

        <Link href={`/work/${next.slug}`} className="group mt-s7 block border-y border-ink py-s5">
          <span className="label">Next sheet · {sheetNo(next)}</span>
          <span className="mt-2 block font-serif text-[clamp(40px,6vw,84px)] leading-none group-hover:text-orange-ink group-hover:italic">
            {next.title} →
          </span>
        </Link>
      </main>
      <div className="mt-s6">
        <SiteFooter sheet={`Sheet ${sheetNo(project)} of ${String(total).padStart(2, "0")}`} />
      </div>
    </div>
  );
}
