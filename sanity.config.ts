import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "cinematic_wedding_portfolio",
  title: "Picture the moments",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Homepage").child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem().title("Projects Page").child(S.document().schemaType("projectsPage").documentId("projectsPage")),
            S.listItem().title("Project Detail Page").child(S.document().schemaType("projectDetailPage").documentId("projectDetailPage")),
            S.listItem().title("Contact Page").child(S.document().schemaType("contactPage").documentId("contactPage")),
            S.listItem().title("Site Settings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !["homePage", "projectsPage", "projectDetailPage", "contactPage", "siteSettings"].includes(item.getId() || ""))
          ])
    }),
    visionTool()
  ],
  schema: { types: schemaTypes }
});
