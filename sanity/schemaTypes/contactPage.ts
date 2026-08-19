import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "intro", title: "Intro Text", type: "text", rows: 4 }),
    defineField({ name: "email", title: "Contact Email", type: "email", validation: (Rule) => Rule.required() }),
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({ name: "address", title: "Studio Location / Address", type: "text", rows: 3 }),
    defineField({
      name: "eventTypes",
      title: "Enquiry Event Types",
      type: "array",
      of: [{ type: "string" }]
    })
  ]
});
