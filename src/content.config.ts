import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const chapters = defineCollection({
  loader: glob({ base: "./src/content/chapters", pattern: "**/*.md" }),
  schema: z.object({
    workedOn: z.coerce.date().optional(),
  }),
});

export const collections = { chapters };
