import type { PortableTextBlock } from "next-sanity";

export type ImageAsset = {
  alt?: string;
  lqip?: string;
  url?: string;
  asset?: {
    _ref?: string;
    _id?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
};

export type Media = {
  type: "image" | "video";
  image?: ImageAsset;
  videoUrl?: string;
  poster?: ImageAsset;
};

export type ProjectCategory =
  | "Wedding"
  | "Pre-Wedding"
  | "Portfolio"
  | "Commercial"
  | "Birthday"
  | "Makeup Shoot"
  | "Song Video";

export type Project = {
  _id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  location: string;
  date: string;
  summary?: string;
  coverImage: ImageAsset;
  story?: PortableTextBlock[];
  chapters?: StoryChapter[];
};

export type StoryChapter =
  | {
      _type: "storyText";
      eyebrow?: string;
      title: string;
      body: string;
    }
  | {
      _type: "fullBleedImage";
      image: ImageAsset;
      caption?: string;
    }
  | {
      _type: "imagePair";
      left: ImageAsset;
      right: ImageAsset;
      caption?: string;
    }
  | {
      _type: "videoBlock";
      videoUrl: string;
      poster?: ImageAsset;
      caption?: string;
    };

export type SelectedWorksSection = {
  eyebrow: string;
  title: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  mode: "all" | "curated";
};

export type ExperienceSection = {
  eyebrow?: string;
  title: string;
  body?: string;
  ctaText?: string;
  ctaLink?: string;
};

export type HomePage = {
  hero: {
    media: Media;
    headline: string;
    subheading?: string;
    ctaText: string;
    ctaLink: string;
  };
  manifesto: string;
  highlights: Project[];
  selectedWorks?: SelectedWorksSection;
  experience?: ExperienceSection;
  seo?: {
    metadataTitle?: string;
    metadataDescription?: string;
  };
};

export type ProjectsPage = {
  eyebrow: string;
  title: string;
  intro: string;
  filterAllLabel: string;
  metadataTitle?: string;
  metadataDescription?: string;
};

export type ProjectDetailPage = {
  storyEyebrow: string;
  backLabel: string;
  backLink: string;
  nextEyebrow?: string;
  nextCtaText: string;
  metadataTitle?: string;
  metadataDescription?: string;
};

export type ContactPage = {
  heading: string;
  intro: string;
  email: string;
  phone: string;
  address: string;
  eventTypes: string[];
};

export type NavLink = {
  label: string;
  href: string;
};

export type SiteSettings = {
  studioName: string;
  logo?: ImageAsset;
  instagramUrl?: string;
  whatsappUrl?: string;
  footerText: string;
  navLinks: NavLink[];
  footerLinks: NavLink[];
  navCtaLabel?: string;
  navCtaLink?: string;
  metadataTitle?: string;
  metadataDescription?: string;
};
