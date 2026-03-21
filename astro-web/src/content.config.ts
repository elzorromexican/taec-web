import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const glosarioCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glosario' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    related: z.array(z.string()).optional(),
  })
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/articulos' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/estandares' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/comparativos' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string().optional(),
    link: z.string().optional(),
  })
});

const radarCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/radar' }),
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    description: z.string().optional(),
    link: z.string().optional(),
  })
});

const quizCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/quiz' }),
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
