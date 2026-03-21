import { z, defineCollection } from 'astro:content';

const glosarioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    related: z.array(z.string()).optional(),
  })
});

export const collections = {
  'glosario': glosarioCollection,
};
