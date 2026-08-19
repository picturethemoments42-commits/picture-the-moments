import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "metadataTitle", title: "Browser / SEO Title", type: "string" }),
        defineField({ name: "metadataDescription", title: "SEO Description", type: "text", rows: 3 })
      ]
    }),
    defineField({
      name: "hero",
      title: "Homepage Header",
      type: "object",
      fields: [
        defineField({
          name: "media",
          title: "Background Media",
          type: "object",
          fields: [
            defineField({ name: "type", title: "Type", type: "string", options: { list: ["image", "video"] }, initialValue: "image" }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true, metadata: ["lqip", "blurhash", "palette"] },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })]
            }),
            defineField({ name: "videoUrl", title: "Video URL", type: "url" }),
            defineField({
              name: "poster",
              title: "Video Poster",
              type: "image",
              options: { hotspot: true, metadata: ["lqip", "blurhash", "palette"] },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })]
            })
          ]
        }),
        defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "subheading", title: "Subheading", type: "string" }),
        defineField({ name: "ctaText", title: "CTA Button Text", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "ctaLink", title: "CTA Link", type: "string", validation: (Rule) => Rule.required() })
      ]
    }),
    defineField({ name: "manifesto", title: "Manifesto", type: "text", rows: 5 }),
    defineField({
      name: "highlights",
      title: "Highlight Projects (used when carousel mode is Curated)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      description: "Reorder by dragging. Ignored when the carousel mode is set to All Projects."
    }),
    defineField({
      name: "selectedWorks",
      title: "Selected Works (Carousel) Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string", initialValue: "Portfolio" }),
        defineField({ name: "title", title: "Section Title", type: "string", initialValue: "Selected Works", validation: (Rule) => Rule.required() }),
        defineField({ name: "description", title: "Section Description", type: "text", rows: 2 }),
        defineField({ name: "ctaText", title: "CTA Button Text", type: "string", initialValue: "View Full Portfolio" }),
        defineField({ name: "ctaLink", title: "CTA Link", type: "string", initialValue: "/projects" }),
        defineField({
          name: "mode",
          title: "Carousel Content",
          type: "string",
          options: {
            list: [
              { title: "All Projects (auto-populated)", value: "all" },
              { title: "Curated Highlight Projects", value: "curated" }
            ],
            layout: "radio"
          },
          initialValue: "all",
          validation: (Rule) => Rule.required(),
          description: "Choose whether the carousel shows your entire portfolio or only the highlights you reorder above."
        })
      ]
    }),
    defineField({
      name: "experience",
      title: "The Experience Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string", initialValue: "The Experience" }),
        defineField({ name: "title", title: "Section Title", type: "string", initialValue: "Unhurried, cinematic, and deeply personal.", validation: (Rule) => Rule.required() }),
        defineField({ name: "body", title: "Body Text", type: "text", rows: 6 }),
        defineField({ name: "ctaText", title: "CTA Button Text", type: "string", initialValue: "Explore The Experience" }),
        defineField({ name: "ctaLink", title: "CTA Link", type: "string", initialValue: "/about" })
      ]
    })
  ]
});
