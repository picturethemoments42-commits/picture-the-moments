#!/usr/bin/env node
/**
 * Seed starter content into a Sanity dataset for this portfolio.
 *
 * Usage:
 *   1. Copy .env.example to .env.local
 *   2. Fill in NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN
 *   3. npm run studio:seed
 *
 * The script is idempotent: existing documents are left untouched and
 * images are uploaded from the starter Unsplash URLs (skipped on failure).
 */
import { createClient } from "@sanity/client";

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

async function uploadImageFromUrl(url, name) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = Buffer.from(await res.arrayBuffer());
    return await client.assets.upload("image", buffer, { contentType, filename: `${name}.jpg` });
  } catch (error) {
    console.warn(`  ⚠ Could not upload "${url}" (${error.message}). Document created without this image.`);
    return null;
  }
}

function imageField(asset, alt) {
  return { _type: "image", alt, ...(asset ? { asset: { _type: "reference", _ref: asset._id } } : {}) };
}

const CATEGORIES = ["Wedding", "Pre-Wedding", "Portfolio", "Commercial", "Birthday", "Makeup Shoot", "Song Video"];

// Starter projects. Image URLs match the app's fallback content so the
// seeded dataset looks complete out of the box.
const PROJECT_SEEDS = [
  {
    _id: "seed-aanya-rohan-jaipur",
    title: "Aanya & Rohan",
    slug: "aanya-rohan-jaipur",
    category: "Wedding",
    location: "Jaipur, Rajasthan",
    date: "2025-02-14",
    summary: "A palace wedding told through candlelight, marigold, and unhurried gestures.",
    cover: { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85", alt: "Indian bride portrait in gold jewelry" },
    chapters: [
      {
        _type: "storyText",
        eyebrow: "The Prelude",
        title: "A celebration shaped by stone, silk, and evening light.",
        body: "Set against the arched courtyards of old Jaipur, the wedding unfolded like a quiet film. Every frame held texture: jasmine, antique gold, deep reds, and the gentle pressure of family history."
      },
      {
        _type: "fullBleedImage",
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85",
        alt: "Wedding couple walking through a heritage venue",
        caption: "The sangeet moved from ritual to revelry as the courtyard filled with gold."
      },
      {
        _type: "imagePair",
        leftUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
        rightUrl: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85",
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
    cover: { url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=85", alt: "Elegant wedding couple under warm lights" },
    chapters: [
      {
        _type: "storyText",
        title: "The architecture became the witness.",
        body: "The session was composed as a series of quiet tableaux, using negative space and late sun to let the couple feel both intimate and monumental."
      },
      {
        _type: "fullBleedImage",
        imageUrl: "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?auto=format&fit=crop&w=1800&q=85",
        alt: "Couple portrait in cinematic warm light"
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
    cover: { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85", alt: "Wedding venue with warm string lights" },
    chapters: []
  },
  {
    _id: "seed-the-gold-room",
    title: "The Gold Room",
    slug: "the-gold-room",
    category: "Makeup Shoot",
    location: "Delhi NCR",
    date: "2024-10-18",
    summary: "Beauty portraits focused on texture, jewelry, and sculpted directional light.",
    cover: { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85", alt: "Bride getting ready" },
    chapters: []
  },
  {
    _id: "seed-velvet-noon",
    title: "Velvet Noon",
    slug: "velvet-noon",
    category: "Birthday",
    location: "Goa",
    date: "2024-09-07",
    summary: "A private coastal celebration with cinematic stills and a relaxed editorial pace.",
    cover: { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=85", alt: "Celebration table in warm light" },
    chapters: []
  },
  {
    _id: "seed-house-of-heirlooms",
    title: "House of Heirlooms",
    slug: "house-of-heirlooms",
    category: "Commercial",
    location: "Ahmedabad, Gujarat",
    date: "2024-08-11",
    summary: "A jewelry campaign photographed with tactile shadows and heritage styling.",
    cover: { url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=85", alt: "Gold jewelry editorial still life" },
    chapters: []
  }
];

async function documentExists(id) {
  const found = await client.fetch(`*[_id == $id][0]._id`, { id });
  return Boolean(found);
}

async function createIfMissing(id, body) {
  if (await documentExists(id)) {
    log(`skipping existing document "${id}"`);
    return false;
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
      const asset = await uploadImageFromUrl(chapter.imageUrl, `${name}-chapter-${i}`);
      built.push({ _type: "fullBleedImage", image: imageField(asset, chapter.alt), caption: chapter.caption });
      continue;
    }
    if (chapter._type === "imagePair") {
      const left = await uploadImageFromUrl(chapter.leftUrl, `${name}-chapter-${i}-left`);
      const right = await uploadImageFromUrl(chapter.rightUrl, `${name}-chapter-${i}-right`);
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
      projectIds.push(seed._id);
      log(`skipping existing project "${seed.slug}"`);
      continue;
    }
    const coverAsset = await uploadImageFromUrl(seed.cover.url, `${seed.slug}-cover`);
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
  const heroImage = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85";
  const heroAsset = await uploadImageFromUrl(heroImage, "home-hero");

  await createIfMissing("siteSettings", {
    _type: "siteSettings",
    studioName: "Picture the Moment",
    instagramUrl: "https://instagram.com/",
    whatsappUrl: "https://wa.me/910000000000?text=Hello%2C%20I%27d%20love%20to%20enquire%20about%20a%20wedding%20story.",
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
    metadataTitle: "Picture the Moment | Cinematic Wedding Photography",
    metadataDescription: "Picture the Moment — cinematic Indian wedding photography, powered by Next.js and Sanity."
  });

  await createIfMissing("homePage", {
    _type: "homePage",
    seo: {
      _type: "seo",
      metadataTitle: "Home | Picture the Moment",
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
    metadataTitle: "Archive | Picture the Moment",
    metadataDescription: "Explore the complete wedding photography archive — every story, city, and light."
  });

  await createIfMissing("projectDetailPage", {
    _type: "projectDetailPage",
    storyEyebrow: "The Story",
    backLabel: "Back to Portfolio",
    backLink: "/projects",
    nextEyebrow: "Next",
    nextCtaText: "Continue Exploring",
    metadataTitle: "Picture the Moment",
    metadataDescription: "A project story told through cinematic wedding photography."
  });

  await createIfMissing("contactPage", {
    _type: "contactPage",
    heading: "Begin Your Story",
    intro: "Tell us where the celebration begins. We accept a limited number of commissions so every story has the time and attention it deserves.",
    email: "hello@picturethemoment.in",
    phone: "+91 00000 00000",
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