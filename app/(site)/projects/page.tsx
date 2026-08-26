import { ArchiveFilter } from "@/components/ArchiveFilter";
import { CtaSection } from "@/components/CtaSection";
import { getProjects, getProjectsPage } from "@/lib/queries";

export async function generateMetadata() {
  const page = await getProjectsPage();
  return {
    title: page.metadataTitle || "Archive | Picture the moments",
    description: page.metadataDescription || undefined
  };
}

export default async function ProjectsPage() {
  const [projects, page] = await Promise.all([getProjects(), getProjectsPage()]);

  return (
    <main className="px-6 pb-28 pt-40 md:px-8">
      <section className="mx-auto max-w-container">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">{page.eyebrow}</p>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <h1 className="font-serif text-4xl leading-tight text-ivory md:col-span-7 md:text-6xl">{page.title}</h1>
          <p className="text-base font-light leading-8 text-muted md:col-span-4 md:col-start-9">{page.intro}</p>
        </div>
        <div className="gold-divider my-12" />
        <ArchiveFilter projects={projects} filterAllLabel={page.filterAllLabel} />
      </section>

      <CtaSection />
    </main>
  );
}
