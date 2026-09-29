import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export type ProjectStatus = "Shipped" | "In progress" | "Running";

export type Project = {
  slug: string;
  title: string;
  /** One word of the title to set in italic orange, e.g. "one" */
  titleEm?: string;
  order: number;
  featured: boolean;
  kicker: string;
  summary: string;
  dek: string;
  status: ProjectStatus;
  coords: string;
  role: string;
  timeline: string;
  stack: string[];
  links: { label: string; href: string }[];
  facts: { label: string; value: string }[];
  figure: "pipeline" | "flock" | "image";
  image?: string;
  imageAlt?: string;
  body: string;
};

const DIR = path.join(process.cwd(), "content/projects");

export const getProjects = cache((): Project[] =>
  fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, f), "utf8"));
      type Optional = "featured" | "links" | "facts" | "figure";
      const fm = data as Omit<Project, "slug" | "body" | Optional> & Partial<Pick<Project, Optional>>;
      const project: Project = {
        featured: false,
        links: [],
        facts: [],
        figure: "image",
        ...fm,
        slug: f.replace(/\.mdx$/, ""),
        body: content,
      };
      return project;
    })
    .sort((a, b) => a.order - b.order),
);

export const getProject = (slug: string) => getProjects().find((p) => p.slug === slug);

/** The next project in reading order, wrapping to the first. */
export function getNextProject(slug: string) {
  const all = getProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return all[(i + 1) % all.length];
}

/** Contour band a project lights up on hover (five bands, one per sheet slot). */
export const bandFor = (p: Project) => (p.order - 1) % 5;

export const sheetNo = (p: Project) => String(p.order).padStart(2, "0");
