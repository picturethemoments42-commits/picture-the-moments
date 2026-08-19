import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SanityImage } from "./SanityImage";
import type { Project } from "@/lib/types";

export function ProjectTile({ project, priority = false, tall = false }: { project: Project; priority?: boolean; tall?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group image-vignette relative block overflow-hidden ${tall ? "h-[72vh]" : "h-[56vh]"} min-h-[420px]`}
    >
      <SanityImage
        image={project.coverImage}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 42vw, 90vw"
        className="object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/10 to-transparent opacity-90" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-8">
        <div>
          <span className="mb-3 inline-flex border border-ivory/45 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold">
            {project.category}
          </span>
          <h3 className="font-serif text-3xl text-ivory md:text-4xl">{project.title}</h3>
          <p className="mt-2 text-sm text-muted">{project.location}</p>
        </div>
        <ArrowUpRight className="shrink-0 text-gold opacity-0 transition group-hover:opacity-100" strokeWidth={1.2} />
      </div>
    </Link>
  );
}
