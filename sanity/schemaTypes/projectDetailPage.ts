import { defineField, defineType } from "sanity";

export const projectDetailPage = defineType({
  name: "projectDetailPage",
  title: "Project Detail Page (Inner Pages)",
  type: "document",
  fields: [
    defineField({ name: "storyEyebrow", title: "Chapters / Story Eyebrow", type: "string", initialValue: "The Story" }),
    defineField({ name: "backLabel", title: "Back Link Label", type: "string", initialValue: "Back to Portfolio" }),
    defineField({ name: "backLink", title: "Back Link URL", type: "string", initialValue: "/projects" }),
    defineField({ name: "nextEyebrow", title: "Next Story Eyebrow", type: "string", initialValue: "Next" }),
    defineField({ name: "nextCtaText", title: "Next Story CTA Text", type: "string", initialValue: "Continue Exploring" }),
    defineField({ name: "metadataTitle", title: "Browser / SEO Title", type: "string", initialValue: "Picture the Moment" }),
    defineField({ name: "metadataDescription", title: "SEO Description", type: "text", rows: 3 })
  ]
});
