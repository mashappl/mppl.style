import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const homework = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/homework' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      module: z.string().optional(),       // e.g. "Module 1 · Colour"
      date: z.coerce.date(),
      summary: z.string().optional(),
      cover: image().optional(),          // path to an image next to the file
      draft: z.boolean().default(false),  // true = hidden from the site
    }),
});

export const collections = { homework };
