import { defineArrayMember, defineField, defineType } from "sanity";

const categories = ["Wedding", "Pre-Wedding", "Portfolio", "Commercial", "Birthday", "Makeup Shoot", "Song Video"];

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categories.map((title) => ({ title, value: title })) },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: "location", title: "Location", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", title: "Archive Summary", type: "text", rows: 3 }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true, metadata: ["lqip", "blurhash", "palette"] },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "story",
      title: "Portable Text Story",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          name: "storyImage",
          title: "Story Image",
          type: "image",
          options: { hotspot: true, metadata: ["lqip", "blurhash", "palette"] },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" })
          ]
        })
      ]
    }),
    defineField({
      name: "chapters",
      title: "Editorial Chapters",
      type: "array",
      of: [
        defineArrayMember({
          name: "storyText",
          title: "Story Text",
          type: "object",
          fields: [
            defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "body", title: "Body", type: "text", rows: 5, validation: (Rule) => Rule.required() })
          ]
        }),
        defineArrayMember({
          name: "fullBleedImage",
          title: "Full Bleed Image",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true, metadata: ["lqip", "blurhash", "palette"] },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
              validation: (Rule) => Rule.required()
            }),
            defineField({ name: "caption", title: "Caption", type: "string" })
          ]
        }),
        defineArrayMember({
          name: "imagePair",
          title: "Image Pair",
          type: "object",
          fields: [
            defineField({
              name: "left",
              title: "Left Image",
              type: "image",
              options: { hotspot: true, metadata: ["lqip", "blurhash", "palette"] },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })]
            }),
            defineField({
              name: "right",
              title: "Right Image",
              type: "image",
              options: { hotspot: true, metadata: ["lqip", "blurhash", "palette"] },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })]
            }),
            defineField({ name: "caption", title: "Caption", type: "string" })
          ]
        }),
        defineArrayMember({
          name: "videoBlock",
          title: "Video",
          type: "object",
          fields: [
            defineField({ name: "videoUrl", title: "Video URL", type: "url", validation: (Rule) => Rule.required() }),
            defineField({
              name: "poster",
              title: "Poster Image",
              type: "image",
              options: { hotspot: true, metadata: ["lqip", "blurhash", "palette"] },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })]
            }),
            defineField({ name: "caption", title: "Caption", type: "string" })
          ]
        })
      ]
    })
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" }
  }
});
