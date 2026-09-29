import { Contours } from "@/components/Contours";
import { SectionHead, SiteFooter, SiteHeader } from "@/components/Chrome";
import { FeaturedProject, ProjectIndex } from "@/components/Work";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  const projects = getProjects();
  const featured = projects.filter((p) => p.featured);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Los Angeles", addressRegion: "CA" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Washington" },
    sameAs: [site.github, site.linkedin],
  };

  return (
    <div className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main id="main">
        <section className="relative">
          <Contours />
          <div className="relative grid gap-s4 pt-[72px] pb-s6 lg:grid-cols-12 lg:pt-[132px] lg:pb-s7">
            <h1 className="font-serif text-[clamp(46px,8.6vw,128px)] leading-[0.92] tracking-[-0.022em] lg:col-span-10">
              I build AI that knows when to <em className="text-orange-ink">stop</em> and ask.
            </h1>
            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <p className="label">
                {site.role} · {site.location.replace(", CA", "")}
              </p>
              <p className="mt-2.5 max-w-[36ch] bg-paper/70">
                Agent pipelines with human approval gates, retrieval that cites its sources, and models that say
                what the data does and doesn&apos;t support.
              </p>
              <p className="label mt-4.5 flex flex-wrap gap-4.5">
                <a href="#work" className="link-underline">
                  See the work ↓
                </a>
                <a href="#contact" className="link-underline">
                  Get in touch
                </a>
              </p>
            </div>
          </div>
        </section>

        <section id="work" aria-labelledby="featured-h" className="scroll-mt-4">
          <SectionHead id="featured-h" left="§1 Featured surveys" right={`${featured.length} of ${projects.length}`} />
          {featured.map((p, i) => (
            <FeaturedProject key={p.slug} project={p} n={i + 1} flip={i % 2 === 1} />
          ))}
        </section>

        <section aria-labelledby="all-h">
          <SectionHead id="all-h" left="§2 All sheets" right="Status" />
          <ProjectIndex projects={projects} />
        </section>

        <section id="about" aria-labelledby="about-h" className="mt-s7 scroll-mt-4 pb-s7">
          <SectionHead id="about-h" left="§3 About" right="Field record" />
          <div className="grid gap-s5 lg:grid-cols-12">
            <p className="font-serif text-[clamp(24px,2.6vw,34px)] leading-[1.22] lg:col-span-7">
              I build AI systems that are allowed to fail safely: agent pipelines with human approval gates, retrieval
              that cites its sources, and statistical models that say what the data does and doesn&apos;t support. I
              came to it through GIS and data science, and I still think in maps.
            </p>
            <dl className="grid grid-cols-[auto_1fr] content-start gap-x-4 gap-y-2.5 text-[15px] lg:col-span-4 lg:col-start-9">
              {[
                ["Based", "Los Angeles, CA"],
                ["Studied", "B.S., GIS: Data Science, University of Washington"],
                ["Now", "AI Trainer (remote) · founder, Savowai"],
                ["Seeking", "Mid-level AI engineer and AI automation roles"],
                ["Tools", "TypeScript, Python, Next.js, Claude API, MCP, Postgres/pgvector, GeoPandas, DuckDB"],
              ].map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="label pt-[3px]">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-h" className="scroll-mt-4 pb-s6">
          <SectionHead id="contact-h" left="§4 Contact" right="Open to roles" />
          <a
            href={`mailto:${site.email}`}
            className="my-s3 mb-s5 block font-serif text-[clamp(30px,6.4vw,96px)] leading-none tracking-[-0.02em] break-words hover:text-orange-ink hover:italic"
          >
            {site.email}
          </a>
          <p className="label flex flex-wrap gap-7">
            <a href={site.github} className="link-underline" rel="me">
              GitHub
            </a>
            <a href={site.linkedin} className="link-underline" rel="me">
              LinkedIn
            </a>
            <a href={site.resume} className="link-underline">
              Résumé (PDF)
            </a>
          </p>
        </section>
      </main>
      <SiteFooter sheet="Sheet 00" />
    </div>
  );
}
