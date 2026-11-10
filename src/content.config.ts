import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const homework = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/homework' }),
  schema: ({ image }) => {
    const lines = z.union([z.string(), z.array(z.string())]).transform((v) => (Array.isArray(v) ? v : [v]));
    const fit = z.enum(['contain', 'cover']).default('contain');
    return z.object({
      title: z.string(),
      module: z.string().optional(),       // e.g. "wardrobe analysis"
      date: z.coerce.date(),
      summary: z.string().optional(),      // one line under the title
      cover: image().optional(),
      draft: z.boolean().default(false),   // true = hidden from the site
      form: z.boolean().default(false),    // true = this homework is the client questionnaire (src/data/questionnaire.ts)
      notes: z.array(z.string()).max(3).optional(), // (simple layout) handwritten notes around the cover

      // Home page collage: up to 3 photos pinned together with safety pins.
      sheets: z.array(z.object({ image: image(), fit })).max(3).optional(),

      // Case-study layout (all parts optional; numbered automatically in order).
      meta: z.array(z.object({ k: z.string(), v: z.string() })).optional(), // FOCUS / FORMAT / STATUS…
      start: z
        .object({
          portrait: image(),
          caption: lines.optional(),
          pieces: z.array(z.object({ image: image(), label: lines, note: z.string().optional(), fit, matte: z.boolean().default(false) })).max(3).default([]),
          palette: z.array(z.object({ name: z.string(), hex: z.string() })).optional(),
        })
        .optional(),
      notice: z
        .object({
          headline: z.string(),
          points: z.array(z.object({ label: z.string(), title: z.string(), body: z.string() })).max(3),
        })
        .optional(),
      outfits: z
        .object({
          headline: z.string(),
          items: z
            .array(
              z.object({
                image: image(),
                caption: z.string(),
                formula: z.string(),
                body: z.string(),
                piece: z.object({ image: image(), label: lines, note: z.string().optional() }).optional(),
              }),
            )
            .max(2),
        })
        .optional(),
      reflection: z.object({ headline: lines, body: z.string() }).optional(),

      // Outfit breakdowns (simple layout).
      looks: z
        .array(
          z.object({
            title: z.string().optional(),
            photo: image(),
            colour: z.string().default('#5b1424'),
            pieces: z.array(z.object({ image: image().optional(), note: z.string() })).default([]),
          }),
        )
        .optional(),
    });
  },
});

export const collections = { homework };
