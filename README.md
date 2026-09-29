# Adam Sebhat · Portfolio

Personal portfolio at [adamsebhatportfolio.vercel.app](https://adamsebhatportfolio.vercel.app).
The design is a cartographic survey sheet: contour lines from real Los Angeles elevation data,
a live coordinate readout, and projects filed as numbered sheets.

Next.js 16 (App Router), TypeScript, Tailwind CSS v4, MDX. Fully static.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, also type-checks
```

## Add a new project

Every project is one MDX file in `content/projects/`. The home page, the index, the case-study
page, the sitemap and the share image are all generated from it. No layout code changes.

1. Create `content/projects/<slug>.mdx`. The filename becomes the URL: `/work/<slug>`.
2. Fill in the frontmatter:

   ```yaml
   ---
   title: "xR RAG"
   titleEm: RAG               # optional: one word set in italic orange on the case study
   order: 6                   # position in the list (1 = first)
   featured: false            # true puts it in "Featured surveys" on the home page
   kicker: RAG                # short category label
   summary: "One sentence for the project list."
   dek: "One or two sentences under the case-study title. Also the SEO description."
   status: In progress        # Shipped | In progress | Running
   coords: "51.5072°N 0.1276°W"
   role: "Solo: retrieval, evaluation, site"
   timeline: "Oct 2026 – present"
   stack: ["Python", "pgvector", "Next.js"]
   links:                     # or `links: []` if nothing is public yet
     - { label: "Live site", href: "https://..." }
     - { label: "GitHub", href: "https://github.com/Savowai/..." }
   facts:                     # shown on the featured card; only needed if featured
     - { label: "Stack", value: "Python · pgvector" }
   figure: image              # image | pipeline | flock
   image: /work/xr-rag.png    # screenshot in public/work/, used when figure is image
   imageAlt: "What the screenshot shows"
   ---
   ```

3. Write the case study below the frontmatter. Use Markdown plus these components:

   ```mdx
   <Chapter n="i." label="Problem">
   Markdown paragraphs, lists, **bold**, `code` and tables all work in here.
   </Chapter>

   <Stats items={[["3,025", "cameras mapped"], ["2,993", "census tracts"]]} />

   <Shot src="/work/xr-rag.png" alt="..." caption="Fig. 3 · ..." />

   <Steps caption="Fig. 4 · ..." items={[["Trigger", "What starts it"], ["Call", "What it does"]]} />

   <Decisions>
     <Decision title="A decision.">Why it was made.</Decision>
   </Decisions>
   ```

   Keep the story shape: **Problem → Process → Result**.

4. Add a screenshot to `public/work/` if you have one. To capture a live site at the same size
   as the others:

   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
     --window-size=1440,900 --virtual-time-budget=8000 \
     --screenshot="$PWD/public/work/<slug>.png" https://your-site.vercel.app
   ```

5. Run `npm run build` to check it, then commit and push. Vercel deploys `main` automatically.

## Where things live

| Path | What it is |
| --- | --- |
| `content/projects/*.mdx` | Project content |
| `src/lib/site.ts` | Name, email, links, résumé path |
| `src/app/globals.css` | Design tokens (color, type, spacing) |
| `src/components/mdx/` | Components available inside MDX |
| `src/data/*.json` | Generated map data (see below) |
| `public/Adam_Sebhat_Resume.pdf` | Public résumé (no phone number) |

## Map data

The contour lines and the Flock camera map are real data, generated once and committed.

```bash
node scripts/build-contours.mjs     # LA elevation contours from AWS Terrain Tiles
node scripts/build-camera-map.mjs "<flock repo>/web/public/data/cameras_la.geojson"
```

## Quality bar

Lighthouse 95+ in every category on mobile and desktop, no horizontal scroll at 360px,
keyboard navigable with visible focus, and all motion off under `prefers-reduced-motion`.
