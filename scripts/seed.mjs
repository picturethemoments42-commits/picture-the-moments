#!/usr/bin/env node
/**
 * Seed starter content into a Sanity dataset for this portfolio.
 *
 * Usage:
 *   1. Copy .env.example to .env.local
 *   2. Fill in NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN
 *   3. npm run studio:seed
 *
 * The script is idempotent: existing documents are left untouched unless you
 * pass --replace (e.g. `npm run studio:seed -- --replace`), which deletes and
 * recreates every seeded document so the local photos are used.
 *
 * Images are uploaded from the local source photos in the `public/`
 * directory (skipped on failure).
 */
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";

// When --replace is passed, existing seeded documents are deleted first so a
// stale starter dataset (previously seeded from stock photos) is fully
// replaced with the project's own imagery.
const replace = process.argv.includes("--replace");

try {
  process.loadEnvFile?.(".env.local");
} catch {
  // No .env.local — rely on the process environment instead.
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-06";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("✖ NEXT_PUBLIC_SANITY_PROJECT_ID is missing. Copy .env.example to .env.local and set it.");
  process.exit(1);
}
if (!token) {
  console.error("✖ SANITY_API_TOKEN is missing. Create one at manage.sanity.io → API → Add API token (with editor/publish access).");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

const log = (...args) => console.log("·", ...args);

const CONTENT_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp"
};

/**
 * Uploads a local source photo (relative to the `public/` directory) to Sanity.
 * @param {string} filePath File name relative to `public/`, e.g. "IMG_7753.JPG".
 * @param {string} name Short identifier used as a fallback asset filename.
 */
async function uploadImageFromFile(filePath, name) {
  try {
    const absolute = path.resolve(process.cwd(), "public", filePath);
    const buffer = await readFile(absolute);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || "image/jpeg";
    const filename = path.basename(filePath).replace(/[^\w.-]/g, "_") || `${name}.jpg`;
    return await client.assets.upload("image", buffer, { contentType, filename });
  } catch (error) {
    console.warn(`  ⚠ Could not upload "${filePath}" (${error.message}). Image may be missing.`);
    return null;
  }
}

function imageField(asset, alt) {
  return { _type: "image", alt, ...(asset ? { asset: { _type: "reference", _ref: asset._id } } : {}) };
}

const CATEGORIES = ["Wedding", "Pre-Wedding", "Portfolio", "Commercial", "Birthday", "Makeup Shoot", "Song Video"];

// Starter projects. Each image is sourced from the local `public/` directory
// (the real photos uploaded by the studio owner), so the seeded dataset uses
// the project's own imagery instead of stock photos.
const PROJECT_SEEDS = [
  {
    _id: "seed-aanya-rohan-jaipur",
    title: "Aanya & Rohan",
    slug: "aanya-rohan-jaipur",
    category: "Wedding",
    location: "Jaipur, Rajasthan",
    date: "2025-02-14",
    summary: "A palace wedding told through candlelight, marigold, and unhurried gestures.",
    cover: { file: "IMG_7753.JPG", alt: "Indian bride portrait in gold jewelry" },
    chapters: [
      {
        _type: "storyText",
        eyebrow: "The Prelude",
        title: "A celebration shaped by stone, silk, and evening light.",
        body: "Set against the arched courtyards of old Jaipur, the wedding unfolded like a quiet film. Every frame held texture: jasmine, antique gold, deep reds, and the gentle pressure of family history."
      },
      {
        _type: "fullBleedImage",
        imageUrl: "IMG_7756.JPG",
        alt: "Marigold and candlelight at the wedding ceremony",
        caption: "The sangeet moved from ritual to revelry as the courtyard filled with gold."
      },
      {
        _type: "imagePair",
        leftUrl: "IMG_7754.JPG",
        rightUrl: "IMG_7755.JPG",
        caption: "Small details, held close."
      }
    ]
  },
  {
    _id: "seed-royal-symphony-udaipur",
    title: "A Royal Symphony in Stone",
    slug: "royal-symphony-udaipur",
    category: "Pre-Wedding",
    location: "Udaipur, Rajasthan",
    date: "2025-01-20",
    summary: "An editorial pre-wedding story in palace corridors and lakeside dusk.",
    cover: { file: "IMG_7757.JPG", alt: "Elegant wedding couple under warm lights" },
    chapters: [
      {
        _type: "storyText",
        title: "The architecture became the witness.",
        body: "The session was composed as a series of quiet tableaux, using negative space and late sun to let the couple feel both intimate and monumental."
      },
      {
        _type: "fullBleedImage",
        imageUrl: "IMG_7758.JPG",
        alt: "Couple portrait in cinematic warm light"
      },
      {
        _type: "imagePair",
        leftUrl: "IMG_7759.JPG",
        rightUrl: "IMG_7760.JPG",
        caption: "Palace corridors, held in late light."
      }
    ]
  },
  {
    _id: "seed-midnight-mehfil",
    title: "Midnight Mehfil",
    slug: "midnight-mehfil",
    category: "Song Video",
    location: "Mumbai, Maharashtra",
    date: "2024-12-02",
    summary: "A music-led celebration with editorial portraits and luminous after-dark frames.",
    cover: { file: "IMG_7761.JPG", alt: "Wedding venue with warm string lights" },
    chapters: [
      {
        _type: "fullBleedImage",
        imageUrl: "IMG_7767.JPG",
        alt: "Dancers under warm after-dark lights",
        caption: "The evening built into a luminous, music-led finale."
      }
    ]
  },
  {
    _id: "seed-the-gold-room",
    title: "The Gold Room",
    slug: "the-gold-room",
    category: "Makeup Shoot",
    location: "Delhi NCR",
    date: "2024-10-18",
    summary: "Beauty portraits focused on texture, jewelry, and sculpted directional light.",
    cover: { file: "IMG_7762.JPG", alt: "Bride getting ready" },
    chapters: [
      {
        _type: "fullBleedImage",
        imageUrl: "IMG_7752.JPG",
        alt: "Jewelry and makeup details in rich light",
        caption: "Every texture — silk, gold, skin — rendered as a still life."
      }
    ]
  },
  {
    _id: "seed-velvet-noon",
    title: "Velvet Noon",
    slug: "velvet-noon",
    category: "Birthday",
    location: "Goa",
    date: "2024-09-07",
    summary: "A private coastal celebration with cinematic stills and a relaxed editorial pace.",
    cover: { file: "IMG_7764.JPG", alt: "Celebration table in warm light" },
    chapters: [
      {
        _type: "fullBleedImage",
        imageUrl: "IMG_7770.JPG",
        alt: "The celebration in a soft golden hour",
        caption: "Golden hour held the whole afternoon in a single frame."
      }
    ]
  },
  {
    _id: "seed-house-of-heirlooms",
    title: "House of Heirlooms",
    slug: "house-of-heirlooms",
    category: "Commercial",
    location: "Ahmedabad, Gujarat",
    date: "2024-08-11",
    summary: "A jewelry campaign photographed with tactile shadows and heritage styling.",
    cover: { file: "IMG_7766.JPG", alt: "Gold jewelry editorial still life" },
    chapters: [
      {
        _type: "imagePair",
        leftUrl: "IMG_7768.JPG",
        rightUrl: "IMG_7769.PNG",
        caption: "Tactile shadows and sculpted gold."
      }
    ]
  }
];

async function documentExists(id) {
  const found = await client.fetch(`*[_id == $id][0]._id`, { id });
  return Boolean(found);
}

async function deleteIfExists(id) {
  if (await documentExists(id)) {
    log(`removing existing document "${id}" for replacement`);
    await client.delete(id);
  }
}

async function createIfMissing(id, body) {
  if (await documentExists(id)) {
    if (!replace) {
      log(`skipping existing document "${id}"`);
      return false;
    }
    await deleteIfExists(id);
  }
  await client.create({ _id: id, ...body });
  log(`created "${id}"`);
  return true;
}

async function buildChapters(chapters, name) {
  const built = [];
  for (let i = 0; i < chapters.length; i += 1) {
    const chapter = chapters[i];
    if (chapter._type === "storyText") {
      built.push({ ...chapter });
      continue;
    }
    if (chapter._type === "fullBleedImage") {
      const asset = await uploadImageFromFile(chapter.imageUrl, `${name}-chapter-${i}`);
      built.push({ _type: "fullBleedImage", image: imageField(asset, chapter.alt), caption: chapter.caption });
      continue;
    }
    if (chapter._type === "imagePair") {
      const left = await uploadImageFromFile(chapter.leftUrl, `${name}-chapter-${i}-left`);
      const right = await uploadImageFromFile(chapter.rightUrl, `${name}-chapter-${i}-right`);
      built.push({
        _type: "imagePair",
        left: imageField(left, `${chapter.caption || name} — left`),
        right: imageField(right, `${chapter.caption || name} — right`),
        caption: chapter.caption
      });
    }
  }
  return built;
}

async function seedProjects() {
  const projectIds = [];
  for (let i = 0; i < PROJECT_SEEDS.length; i += 1) {
    const seed = PROJECT_SEEDS[i];
    if (await documentExists(seed._id)) {
      if (!replace) {
        projectIds.push(seed._id);
        log(`skipping existing project "${seed.slug}"`);
        continue;
      }
      await deleteIfExists(seed._id);
    }
    const coverAsset = await uploadImageFromFile(seed.cover.file, `${seed.slug}-cover`);
    const chapters = await buildChapters(seed.chapters, seed.slug);
    await client.create({
      _id: seed._id,
      _type: "project",
      title: seed.title,
      slug: { _type: "slug", current: seed.slug },
      category: seed.category,
      location: seed.location,
      date: seed.date,
      summary: seed.summary,
      coverImage: imageField(coverAsset, seed.cover.alt),
      chapters
    });
    projectIds.push(seed._id);
    log(`created project "${seed.slug}"`);
  }
  return projectIds;
}
async function seedSingletons(projectIds) {
  const heroImage = "IMG_4677.JPG";
  const heroAsset = await uploadImageFromFile(heroImage, "home-hero");

  await createIfMissing("siteSettings", {
    _type: "siteSettings",
    studioName: "Picture The Moments",
    instagramUrl: "https://www.instagram.com/picture.the_moments",
    whatsappUrl: "https://wa.me/918437807609?text=Hello%2C%20I%27d%20love%20to%20enquire%20about%20a%20wedding%20story.",
    footerText: "Capturing the soul of Indian heritage.",
    navLinks: [
      { _key: "nav1", _type: "navLink", label: "Portfolio", href: "/projects" },
      { _key: "nav2", _type: "navLink", label: "The Experience", href: "/about" },
      { _key: "nav3", _type: "navLink", label: "Stories", href: "/projects/aanya-rohan-jaipur" },
      { _key: "nav4", _type: "navLink", label: "Contact", href: "/contact" }
    ],
    footerLinks: [
      { _key: "foot1", _type: "footerLink", label: "Portfolio", href: "/projects" },
      { _key: "foot2", _type: "footerLink", label: "Experience", href: "/about" },
      { _key: "foot3", _type: "footerLink", label: "Contact", href: "/contact" },
      { _key: "foot4", _type: "footerLink", label: "Studio", href: "/studio" }
    ],
    navCtaLabel: "Book a Consultation",
    navCtaLink: "/contact",
    metadataTitle: "Picture the moments | Cinematic Wedding Photography",
    metadataDescription: "Picture the moments — cinematic Indian wedding photography, powered by Next.js and Sanity."
  });

  await createIfMissing("homePage", {
    _type: "homePage",
    seo: {
      _type: "seo",
      metadataTitle: "Home | Picture the moments",
      metadataDescription: "Cinematic Indian wedding photography rooted in heritage, texture, and unhurried storytelling."
    },
    hero: {
      _type: "hero",
      media: {
        _type: "media",
        type: "image",
        image: imageField(heroAsset, "Cinematic Indian wedding ceremony in warm light")
      },
      headline: "Stories Told in Gold",
      subheading: "Cinematic wedding photography rooted in Indian heritage",
      ctaText: "Begin Your Story",
      ctaLink: "/contact"
    },
    manifesto:
      "We do not merely take photographs; we craft cinematic narratives of profound emotional weight. Rooted in the opulence of Indian heritage and the minimalism of contemporary editorial design, we capture the unseen moments: the unhurried glances, rich textures, and timeless legacy of your celebration.",
    highlights: projectIds.slice(0, 3).map((_id, index) => ({ _key: `hl${index}`, _type: "reference", _ref: _id })),
    selectedWorks: {
      _type: "selectedWorks",
      eyebrow: "Portfolio",
      title: "Selected Works",
      description: "A rotating selection from the archive — every frame a chapter.",
      ctaText: "View Full Portfolio",
      ctaLink: "/projects",
      mode: "all"
    },
    experience: {
      _type: "experience",
      eyebrow: "The Experience",
      title: "Unhurried, cinematic, and deeply personal.",
      body: "From the first call to the final gallery, every commission is planned like an editorial production and held like a family archive. We build the visual language around your people, rituals, clothes, music, and place.",
      ctaText: "Explore The Experience",
      ctaLink: "/about"
    }
  });

  await createIfMissing("projectsPage", {
    _type: "projectsPage",
    eyebrow: "The Archive",
    title: "Stories across rituals, cities, and light.",
    intro: "Browse the complete archive. Filters are generated from project categories in Sanity, so new service types can be added without changing the UI.",
    filterAllLabel: "All",
    metadataTitle: "Archive | Picture the moments",
    metadataDescription: "Explore the complete wedding photography archive — every story, city, and light."
  });

  await createIfMissing("projectDetailPage", {
    _type: "projectDetailPage",
    storyEyebrow: "The Story",
    backLabel: "Back to Portfolio",
    backLink: "/projects",
    nextEyebrow: "Next",
    nextCtaText: "Continue Exploring",
    metadataTitle: "Picture the moments",
    metadataDescription: "A project story told through cinematic wedding photography."
  });

  await createIfMissing("contactPage", {
    _type: "contactPage",
    heading: "Begin Your Story",
    intro: "Tell us where the celebration begins. We accept a limited number of commissions so every story has the time and attention it deserves.",
    email: "hello@picturethemoment.in",
    phone: "+91 84378 07609",
    address: "New Delhi, India. Available for celebrations worldwide.",
    eventTypes: CATEGORIES
  });
}

async function main() {
  console.log(`Seeding dataset "${dataset}" of project "${projectId}"…`);
  const projectIds = await seedProjects();
  await seedSingletons(projectIds);
  console.log("✓ Seed complete. Open http://localhost:3000/studio to edit the content.");
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});