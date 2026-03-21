import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const glosarioCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glosario' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    related: z.array(z.string()).optional(),
  })
});

export const collections = {
  'glosario': glosarioCollection,
};
