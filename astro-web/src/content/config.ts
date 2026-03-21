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

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    date: z.string().optional(),
    tags: z.array(z.string()).optional(),
    link: z.string().optional(),
  })
});

const articulosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    date: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    link: z.string().optional(),
  })
});

const estandaresCollection = defineCollection({
  type: 'content',
  schema: z.object({
    acronym: z.string(),
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    version: z.string().optional(),
    link: z.string().optional(),
  })
});

const comparativosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string().optional(),
    link: z.string().optional(),
  })
});

const radarCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    description: z.string().optional(),
    link: z.string().optional(),
  })
});

const quizCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    link: z.string().optional(),
  })
});

export const collections = {
  'glosario': glosarioCollection,
  'blog': blogCollection,
  'articulos': articulosCollection,
  'estandares': estandaresCollection,
  'comparativos': comparativosCollection,
  'radar': radarCollection,
  'quiz': quizCollection,
};
