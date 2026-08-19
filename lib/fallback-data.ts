import type { ContactPage, HomePage, Project, ProjectDetailPage, ProjectsPage, SiteSettings } from "./types";

const image = (url: string, alt: string) => ({ url, alt });

export const projects: Project[] = [
  {
    _id: "jaipur",
    title: "Aanya & Rohan",
    slug: "aanya-rohan-jaipur",
    category: "Wedding",
    location: "Jaipur, Rajasthan",
    date: "2025-02-14",
    summary: "A palace wedding told through candlelight, marigold, and unhurried gestures.",
    coverImage: image("https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85", "Indian bride portrait in gold jewelry"),
    chapters: [
      {
        _type: "storyText",
        eyebrow: "The Prelude",
        title: "A celebration shaped by stone, silk, and evening light.",
        body: "Set against the arched courtyards of old Jaipur, the wedding unfolded like a quiet film. Every frame held texture: jasmine, antique gold, deep reds, and the gentle pressure of family history."
      },
      {
        _type: "fullBleedImage",
        image: image("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85", "Wedding couple walking through a heritage venue"),
        caption: "The sangeet moved from ritual to revelry as the courtyard filled with gold."
      },
      {
        _type: "imagePair",
        left: image("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85", "Wedding rings and details"),
        right: image("https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85", "Wedding reception lights"),
        caption: "Small details, held close."
      }
    ]
  },
  {
    _id: "udaipur",
    title: "A Royal Symphony in Stone",
    slug: "royal-symphony-udaipur",
    category: "Pre-Wedding",
    location: "Udaipur, Rajasthan",
    date: "2025-01-20",
    summary: "An editorial pre-wedding story in palace corridors and lakeside dusk.",
    coverImage: image("https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=85", "Elegant wedding couple under warm lights"),
    chapters: [
      {
        _type: "storyText",
        title: "The architecture became the witness.",
        body: "The session was composed as a series of quiet tableaux, using negative space and late sun to let the couple feel both intimate and monumental."
      },
      {
        _type: "fullBleedImage",
        image: image("https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?auto=format&fit=crop&w=1800&q=85", "Couple portrait in cinematic warm light")
      }
    ]
  },
  {
    _id: "mumbai",
    title: "Midnight Mehfil",
    slug: "midnight-mehfil",
    category: "Song Video",
    location: "Mumbai, Maharashtra",
    date: "2024-12-02",
    summary: "A music-led celebration with editorial portraits and luminous after-dark frames.",
    coverImage: image("https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85", "Wedding venue with warm string lights"),
    chapters: []
  },
  {
    _id: "makeup",
    title: "The Gold Room",
    slug: "the-gold-room",
    category: "Makeup Shoot",
    location: "Delhi NCR",
    date: "2024-10-18",
    summary: "Beauty portraits focused on texture, jewelry, and sculpted directional light.",
    coverImage: image("https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85", "Bride getting ready")
  },
  {
    _id: "birthday",
    title: "Velvet Noon",
    slug: "velvet-noon",
    category: "Birthday",
    location: "Goa",
    date: "2024-09-07",
    summary: "A private coastal celebration with cinematic stills and a relaxed editorial pace.",
    coverImage: image("https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=85", "Celebration table in warm light")
  },
  {
    _id: "commercial",
    title: "House of Heirlooms",
    slug: "house-of-heirlooms",
    category: "Commercial",
    location: "Ahmedabad, Gujarat",
    date: "2024-08-11",
    summary: "A jewelry campaign photographed with tactile shadows and heritage styling.",
    coverImage: image("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=85", "Gold jewelry editorial still life")
  }
];

export const siteSettings: SiteSettings = {
  studioName: "Picture the Moment",
  instagramUrl: "https://instagram.com/",
  whatsappUrl: "https://wa.me/910000000000?text=Hello%2C%20I%27d%20love%20to%20enquire%20about%20a%20wedding%20story.",
  footerText: "Capturing the soul of Indian heritage.",
  navLinks: [
    { label: "Portfolio", href: "/projects" },
    { label: "The Experience", href: "/about" },
    { label: "Stories", href: "/projects/aanya-rohan-jaipur" },
    { label: "Contact", href: "/contact" }
  ],
  footerLinks: [
    { label: "Portfolio", href: "/projects" },
    { label: "Experience", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Studio", href: "/studio" }
  ],
  navCtaLabel: "Book a Consultation",
  navCtaLink: "/contact",
  metadataTitle: "Picture the Moment | Cinematic Wedding Photography",
  metadataDescription: "Picture the Moment — cinematic Indian wedding photography, powered by Next.js and Sanity."
};

export const homePage: HomePage = {
  hero: {
    media: {
      type: "image",
      image: image("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85", "Cinematic Indian wedding ceremony in warm light")
    },
    headline: "Stories Told in Gold",
    subheading: "Cinematic wedding photography rooted in Indian heritage",
    ctaText: "Begin Your Story",
    ctaLink: "/contact"
  },
  manifesto:
    "We do not merely take photographs; we craft cinematic narratives of profound emotional weight. Rooted in the opulence of Indian heritage and the minimalism of contemporary editorial design, we capture the unseen moments: the unhurried glances, rich textures, and timeless legacy of your celebration.",
  highlights: projects.slice(0, 3),
  selectedWorks: {
    eyebrow: "Portfolio",
    title: "Selected Works",
    description: "A rotating selection from the archive — every frame a chapter.",
    ctaText: "View Full Portfolio",
    ctaLink: "/projects",
    mode: "all"
  },
  experience: {
    eyebrow: "The Experience",
    title: "Unhurried, cinematic, and deeply personal.",
    body: "From the first call to the final gallery, every commission is planned like an editorial production and held like a family archive. We build the visual language around your people, rituals, clothes, music, and place.",
    ctaText: "Explore The Experience",
    ctaLink: "/about"
  },
  seo: {
    metadataTitle: "Home | Picture the Moment",
    metadataDescription: "Cinematic Indian wedding photography rooted in heritage, texture, and unhurried storytelling."
  }
};

export const projectsPage: ProjectsPage = {
  eyebrow: "The Archive",
  title: "Stories across rituals, cities, and light.",
  intro: "Browse the complete archive. Filters are generated from project categories in Sanity, so new service types can be added without changing the UI.",
  filterAllLabel: "All",
  metadataTitle: "Archive | Picture the Moment",
  metadataDescription: "Explore the complete wedding photography archive — every story, city, and light."
};

export const projectDetailPage: ProjectDetailPage = {
  storyEyebrow: "The Story",
  backLabel: "Back to Portfolio",
  backLink: "/projects",
  nextEyebrow: "Next",
  nextCtaText: "Continue Exploring",
  metadataTitle: "Picture the Moment",
  metadataDescription: "A project story told through cinematic wedding photography."
};

export const contactPage: ContactPage = {
  heading: "Begin Your Story",
  intro: "Tell us where the celebration begins. We accept a limited number of commissions so every story has the time and attention it deserves.",
  email: "hello@picturethemoment.in",
  phone: "+91 00000 00000",
  address: "New Delhi, India. Available for celebrations worldwide.",
  eventTypes: ["Wedding", "Pre-Wedding", "Portfolio", "Commercial", "Birthday", "Makeup Shoot", "Song Video"]
};
