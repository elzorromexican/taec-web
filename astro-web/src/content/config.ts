import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Un esquema base flexible para no romper archivos Markdown antiguos que no tengan todos los datos.
// Con passthrough() permitimos que cualquier otra variable en el frontmatter pase sin error.
const baseSchema = z.object({
  title: z.string().optional(),
  titulo: z.string().optional(),
  category: z.string().optional(),
  categoria: z.string().optional(),
  date: z.any().optional(),
  fecha: z.any().optional(),
  description: z.string().optional(),
  image: z.string().optional()
}).passthrough();

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: baseSchema
  }),
  articulos: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articulos" }),
    schema: baseSchema
  }),
  radar: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/radar" }),
    schema: baseSchema
  }),
  glosario: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/glosario" }),
    schema: baseSchema
  }),
  // Preparado para el futuro desarrollo que mencionaste:
  recursos: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/recursos" }),
    schema: baseSchema
  })
};
