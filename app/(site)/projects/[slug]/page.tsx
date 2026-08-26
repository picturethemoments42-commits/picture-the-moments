import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import { CtaSection } from "@/components/CtaSection";
import { SanityImage } from "@/components/SanityImage";
import { Reveal } from "@/components/Motion";
import { getProject, getProjectDetailPage, getProjects } from "@/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [project, detailPage] = await Promise.all([getProject(slug), getProjectDetailPage()]);
  return {
    title: project ? `${project.title} | ${detailPage.metadataTitle || "Picture the moments"}` : detailPage.metadataTitle || "Project",
    description: project?.summary || detailPage.metadataDescription || undefined
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const [project, detailPage, allProjects] = await Promise.all([getProject(slug), getProjectDetailPage(), getProjects()]);
  if (!project) notFound();

  const currentIndex = allProjects.findIndex((item) => item.slug === project.slug);
  const next = currentIndex >= 0 ? allProjects[(currentIndex + 1) % allProjects.length] : allProjects[0] || null;
  const hasStory = Boolean(project.story?.length || project.chapters?.length);

  return (
    <main>
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <Link
          href={detailPage.backLink}
          className="absolute left-6 top-24 z-20 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted transition hover:text-gold md:left-8 md:top-28"
        >
          <ArrowLeft size={14} /> {detailPage.backLabel}
        </Link>
        <div className="image-vignette absolute inset-0">
          <SanityImage image={project.coverImage} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent" />
        <div className="relative z-10 mx-auto grid w-full max-w-container gap-8 px-6 pb-24 md:grid-cols-12 md:px-8">
          <div className="md:col-span-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">{project.location}</p>
            <h1 className="font-serif text-4xl leading-tight text-ivory md:text-6xl">{project.title}</h1>
            {project.summary ? <p className="mt-5 max-w-2xl text-lg font-light leading-8 text-muted">{project.summary}</p> : null}
          </div>
          <div className="flex items-end gap-3 md:col-span-4 md:justify-end">
            <span className="border border-ivory/35 px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted">{project.category}</span>
            <span className="border border-ivory/35 px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted">{new Date(project.date).getFullYear()}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-container px-6 py-28 md:px-8 md:py-36">
        {hasStory ? (
          <div className="mb-16 flex items-center gap-6">
            <div className="h-px flex-1 bg-gold/20" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{detailPage.storyEyebrow || "The Story"}</p>
            <div className="h-px flex-1 bg-gold/20" />
          </div>
        ) : null}

        <div className="grid gap-16">
          {project.chapters?.map((chapter, index) => {
            if (chapter._type === "storyText") {
              return (
                <Reveal key={index} className="grid gap-8 md:grid-cols-12">
                  <div className="md:col-span-5 md:col-start-2">
                    <div className="mb-8 h-24 w-px bg-gradient-to-b from-gold to-transparent" />
                    {chapter.eyebrow ? <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">{chapter.eyebrow}</p> : null}
                    <h2 className="font-serif text-4xl leading-tight text-ivory">{chapter.title}</h2>
                  </div>
                  <p className="text-base font-light leading-8 text-muted md:col-span-5 md:col-start-8">{chapter.body}</p>
                </Reveal>
              );
            }
            if (chapter._type === "fullBleedImage") {
              return (
                <Reveal key={index} className="relative h-[76vh] w-full overflow-hidden">
                  <div className="image-vignette absolute inset-0">
                    <SanityImage image={chapter.image} fill sizes="100vw" className="object-cover" />
                  </div>
                  {chapter.caption ? <p className="absolute bottom-6 left-6 max-w-md text-sm text-muted md:left-8">{chapter.caption}</p> : null}
                </Reveal>
              );
            }
            if (chapter._type === "imagePair") {
              return (
                <Reveal key={index}>
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="image-vignette relative h-[62vh] overflow-hidden">
                      <SanityImage image={chapter.left} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </div>
                    <div className="image-vignette relative h-[62vh] overflow-hidden md:mt-20">
                      <SanityImage image={chapter.right} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </div>
                  </div>
                  {chapter.caption ? <p className="mt-5 text-sm text-muted">{chapter.caption}</p> : null}
                </Reveal>
              );
            }
            if (chapter._type === "videoBlock") {
              return (
                <Reveal key={index} className="relative overflow-hidden">
                  <video className="aspect-video w-full object-cover" controls preload="metadata" poster={chapter.poster?.url}>
                    <source src={chapter.videoUrl} />
                  </video>
                  {chapter.caption ? <p className="mt-5 text-sm text-muted">{chapter.caption}</p> : null}
                </Reveal>
              );
            }
            return null;
          })}
        </div>

        {project.story?.length ? (
          <article className="mx-auto mt-24 max-w-3xl space-y-5 text-base font-light leading-8 text-muted">
            <PortableText value={project.story} />
          </article>
        ) : null}
      </section>

      {next ? (
        <section className="px-6 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-container">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">{detailPage.nextEyebrow || "Next"}</p>
            <Link href={`/projects/${next.slug}`} className="group flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <h2 className="font-serif text-4xl leading-tight text-ivory transition group-hover:text-gold md:text-6xl">{next.title}</h2>
              <span className="btn-primary shrink-0">{detailPage.nextCtaText}</span>
            </Link>
          </div>
        </section>
      ) : null}

      <CtaSection />
    </main>
  );
}
