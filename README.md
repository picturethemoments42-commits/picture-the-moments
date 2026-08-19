# Picture the Moment

A cinematic Indian wedding photography portfolio built with Next.js App Router, Sanity Studio, GSAP ScrollTrigger, Lenis smooth scrolling, and image-first editorial layouts.

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Sanity Studio is mounted at `http://localhost:3000/studio`.

The app includes polished fallback content, so it runs without Sanity credentials. Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to `.env.local` to connect live Sanity content.

## Sanity Studio (CMS)

Every page of the site is driven by Sanity. The Studio is available at `/studio` in the app, or standalone with `npm run studio` (`sanity dev`), `npm run studio:build`, and `npm run studio:deploy`.

### Connecting to a Sanity project

1. Create a project at [sanity.io/manage](https://manage.sanity.io).
2. Fill in `.env.local` (see `.env.example`):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` — your project id
   - `NEXT_PUBLIC_SANITY_DATASET` — defaults to `production`
   - `NEXT_PUBLIC_SANITY_API_VERSION` — defaults to `2026-08-06`
3. (Optional, to seed starter content) create an API token with editor/publish access at manage.sanity.io → API and set `SANITY_API_TOKEN`, then:

```bash
npm run studio:seed
```

The seed script creates the five singleton pages, the six sample projects, and uploads their images. It is idempotent — existing documents are left untouched.

### Content you can edit

- **Homepage** — the hero header (headline, subheading, CTA, background image/video), manifesto, the **Selected Works carousel** (section eyebrow, title, description, CTA, and whether it auto-lists *all projects* or only the curated *highlights* you reorder by dragging), **The Experience** section copy, and homepage SEO.
- **Projects** — every project page: title, slug, category, location, date, archive summary, cover image, a rich **Portable Text story**, and movable editorial **chapters** (story text, full-bleed image, image pair, or video).
- **Projects Page** (the `/projects` archive) — eyebrow, heading, intro, the "All" filter label, and SEO.
- **Project Detail Page** (the `/projects/[slug]` inner pages) — the story eyebrow used above the chapters, the back-to-portfolio link label/URL, the "Next story" CTA labels, and SEO.
- **Contact Page** — heading, intro, contact details, and the enquiry dropdown's event types.
- **Site Settings** — studio name, logo, Instagram/WhatsApp links, footer text, editable **navigation & footer links**, the nav CTA, and the site-wide SEO title/description.

## Performance Notes

- Sanity images use `@sanity/image-url`, responsive `sizes`, and LQIP blur placeholders when metadata exists.
- Hero imagery is loaded with `priority`; offscreen images are lazy by default.
- GSAP and Lenis run in client-only wrappers and respect `prefers-reduced-motion`.
- Project archive filtering is driven by each project's Sanity category field.
