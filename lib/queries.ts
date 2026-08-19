import { client, hasSanityConfig } from "./sanity";
import { contactPage, homePage, projectDetailPage, projects, projectsPage, siteSettings } from "./fallback-data";
import type { ContactPage, HomePage, Project, ProjectDetailPage, ProjectsPage, SiteSettings } from "./types";

const imageFields = `{
  alt,
  "lqip": asset->metadata.lqip,
  asset
}`;

const projectFields = `{
  _id,
  title,
  "slug": slug.current,
  category,
  location,
  date,
  summary,
  coverImage ${imageFields},
  story,
  chapters[]{
    ...,
    image ${imageFields},
    left ${imageFields},
    right ${imageFields},
    poster ${imageFields}
  }
}`;

/**
 * Runs a Sanity query and falls back to the given demo content when the
 * dataset is empty, the document is missing, or the API is unreachable —
 * so the site always renders instead of crashing at build or runtime.
 */
async function fetchWithFallback<T>(fetchData: () => Promise<T | null>, fallback: T): Promise<T> {
  try {
    const data = await fetchData();
    return data ?? fallback;
  } catch (error) {
    console.warn("[sanity] Fetch failed, using fallback content:", error instanceof Error ? error.message : error);
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasSanityConfig) return siteSettings;
  return fetchWithFallback(
    () =>
      client.fetch<SiteSettings | null>(`*[_type == "siteSettings"][0]{
    studioName,
    logo ${imageFields},
    instagramUrl,
    whatsappUrl,
    footerText,
    navLinks,
    footerLinks,
    navCtaLabel,
    navCtaLink,
    metadataTitle,
    metadataDescription
  }`),
    siteSettings
  );
}

export async function getHomePage(): Promise<HomePage> {
  let page: HomePage | null = null;
  if (hasSanityConfig) {
    page = await fetchWithFallback<HomePage | null>(
      () =>
        client.fetch<HomePage | null>(`*[_type == "homePage"][0]{
      hero{
        media{
          type,
          image ${imageFields},
          videoUrl,
          poster ${imageFields}
        },
        headline,
        subheading,
        ctaText,
        ctaLink
      },
      manifesto,
      "highlights": highlights[]->${projectFields},
      selectedWorks{
        eyebrow,
        title,
        description,
        ctaText,
        ctaLink,
        mode
      },
      experience{
        eyebrow,
        title,
        body,
        ctaText,
        ctaLink
      },
      seo{
        metadataTitle,
        metadataDescription
      }
    }`),
      null
    );
  }

  const data = page || homePage;

  // When the carousel is set to "All Projects", populate it with the full
  // project list (fallback or live Sanity) instead of the curated highlights.
  if (data.selectedWorks?.mode === "all") {
    data.highlights = await getProjects();
  }

  return data;
}

export async function getProjects(): Promise<Project[]> {
  if (!hasSanityConfig) return projects;
  return fetchWithFallback(
    () =>
      client
        .fetch<Project[]>(`*[_type == "project"] | order(date desc) ${projectFields}`)
        .then((data) => (data?.length ? data : null)),
    projects
  );
}

export async function getProject(slug: string): Promise<Project | null> {
  const fallbackProject = projects.find((project) => project.slug === slug) || null;
  if (!hasSanityConfig) return fallbackProject;
  return fetchWithFallback(
    () => client.fetch<Project | null>(`*[_type == "project" && slug.current == $slug][0] ${projectFields}`, { slug }),
    fallbackProject
  );
}

export async function getProjectsPage(): Promise<ProjectsPage> {
  if (!hasSanityConfig) return projectsPage;
  return fetchWithFallback(
    () =>
      client.fetch<ProjectsPage | null>(`*[_type == "projectsPage"][0]{
    eyebrow,
    title,
    intro,
    filterAllLabel,
    metadataTitle,
    metadataDescription
  }`),
    projectsPage
  );
}

export async function getProjectDetailPage(): Promise<ProjectDetailPage> {
  if (!hasSanityConfig) return projectDetailPage;
  return fetchWithFallback(
    () =>
      client.fetch<ProjectDetailPage | null>(`*[_type == "projectDetailPage"][0]{
    storyEyebrow,
    backLabel,
    backLink,
    nextEyebrow,
    nextCtaText,
    metadataTitle,
    metadataDescription
  }`),
    projectDetailPage
  );
}

export async function getContactPage(): Promise<ContactPage> {
  if (!hasSanityConfig) return contactPage;
  return fetchWithFallback(
    () =>
      client.fetch<ContactPage | null>(`*[_type == "contactPage"][0]{
    heading,
    intro,
    email,
    phone,
    address,
    eventTypes
  }`),
    contactPage
  );
}
