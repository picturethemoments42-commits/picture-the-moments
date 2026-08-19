import { defineField, defineType } from "sanity";

export const projectsPage = defineType({
  name: "projectsPage",
  title: "Projects Page (Archive)",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string", initialValue: "The Archive" }),
    defineField({ name: "title", title: "Page Heading", type: "string", initialValue: "Stories across rituals, cities, and light.", validation: (Rule) => Rule.required() }),
    defineField({ name: "intro", title: "Intro Text", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "filterAllLabel", title: "Filter \"All\" Label", type: "string", initialValue: "All" }),
    defineField({ name: "metadataTitle", title: "Browser / SEO Title", type: "string" }),
    defineField({ name: "metadataDescription", title: "SEO Description", type: "text", rows: 3 })
  ]
});
