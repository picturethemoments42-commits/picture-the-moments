"use client";

import { useMemo, useState } from "react";
import { ProjectTile } from "./ProjectTile";
import type { Project } from "@/lib/types";

export function ArchiveFilter({ projects, filterAllLabel = "All" }: { projects: Project[]; filterAllLabel?: string }) {
  const categories = useMemo(() => [filterAllLabel, ...Array.from(new Set(projects.map((project) => project.category)))], [projects, filterAllLabel]);
  const [active, setActive] = useState(filterAllLabel);
  const filtered = active === filterAllLabel ? projects : projects.filter((project) => project.category === active);

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition ${
              active === category ? "border-gold bg-gold text-espresso" : "border-ivory/25 text-muted hover:border-gold hover:text-gold"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, index) => (
          <ProjectTile key={project._id} project={project} priority={index < 2} tall={index % 3 === 1} />
        ))}
      </div>
    </>
  );
}
