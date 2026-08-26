import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "studioName", title: "Studio Name", type: "string", initialValue: "Picture The Moments", validation: (Rule) => Rule.required() }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true, metadata: ["lqip", "blurhash", "palette"] },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })]
    }),
    defineField({ name: "instagramUrl", title: "Instagram Profile Link", type: "url" }),
    defineField({ name: "whatsappUrl", title: "WhatsApp Contact Link", type: "url" }),
    defineField({ name: "footerText", title: "Footer Text", type: "string" }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          name: "navLink",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href", title: "Link", type: "string", validation: (Rule) => Rule.required() })
          ]
        }
      ],
      description: "Links shown in the top navigation bar."
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [
        {
          name: "footerLink",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href", title: "Link", type: "string", validation: (Rule) => Rule.required() })
          ]
        }
      ],
      description: "Links shown in the footer."
    }),
    defineField({ name: "navCtaLabel", title: "Navigation CTA Label", type: "string", initialValue: "Book a Consultation" }),
    defineField({ name: "navCtaLink", title: "Navigation CTA Link", type: "string", initialValue: "/contact" }),
    defineField({ name: "metadataTitle", title: "Site Browser / SEO Title", type: "string" }),
    defineField({ name: "metadataDescription", title: "Site SEO Description", type: "text", rows: 3 })
  ]
});
