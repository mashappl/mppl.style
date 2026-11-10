import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const homework = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/homework' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      module: z.string().optional(),       // e.g. "module 1 · colour"
      date: z.coerce.date(),
      summary: z.string().optional(),
      cover: image().optional(),          // image path relative to this file
      draft: z.boolean().default(false),  // true = hidden from the site
      notes: z.array(z.string()).max(3).optional(), // handwritten notes with arrows around the cover photo
      // Outfit breakdowns: a cut-out photo of the look + the pieces that make it.
      looks: z
        .array(
          z.object({
            title: z.string().optional(),
            photo: image(),                       // best as a cut-out PNG (transparent background)
            colour: z.string().default('#5b1424'), // the puddle under the feet
            pieces: z.array(z.object({ image: image().optional(), note: z.string() })).default([]),
          }),
        )
        .optional(),
    }),
});

export const collections = { homework };
