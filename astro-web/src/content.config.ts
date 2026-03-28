import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const glosarioCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glosario' }),
  schema: z.object({
    title: z.string().max(250),
    description: z.string().max(400),
    category: z.string().max(100).optional(),
    related: z.array(z.string().max(250)).max(10).optional(),
  })
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(250),
    description: z.string().max(400).optional(),
    author: z.string().max(100).optional(),
    // IMPORTANTE: Mantenemos string().max(50) envéz de .datetime() porque el CMS heredado 
    // usa un formato humano en español ("Enero 4, 2026") y la fecha real es interpolada allí.
    date: z.string().max(50).optional(),
    tags: z.array(z.string().max(100)).max(20).optional(),
    link: z.string().url().or(z.string().startsWith('/')).optional(),
    image: z.string().optional(),
  }).passthrough()
});

const articulosCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articulos' }),
  schema: z.object({
    title: z.string().max(250),
    description: z.string().max(400).optional(),
    author: z.string().max(100).optional(),
    date: z.string().max(50).optional(),
    tags: z.array(z.string().max(100)).max(20).optional(),
    category: z.string().max(100).optional(),
    link: z.string().url().or(z.string().startsWith('/')).optional(),
    image: z.string().optional(),
  }).passthrough()
});

const estandaresCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/estandares' }),
  schema: z.object({
    acronym: z.string().max(50),
    title: z.string().max(250),
    description: z.string().max(400).optional(),
    category: z.string().max(100).optional(),
    version: z.string().max(50).optional(),
    link: z.string().url().or(z.string().startsWith('/')).optional(),
  })
});

const comparativosCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/comparativos' }),
  schema: z.object({
    title: z.string().max(250),
    description: z.string().max(400).optional(),
    date: z.string().max(50).optional(),
    link: z.string().url().or(z.string().startsWith('/')).optional(),
  })
});

const radarCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/radar' }),
  schema: z.object({
    title: z.string().max(250),
    date: z.string().max(50).optional(),
    description: z.string().max(400).optional(),
    link: z.string().url().or(z.string().startsWith('/')).optional(),
    image: z.string().optional(),
  }).passthrough()
});

const quizCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/quiz' }),
  schema: z.object({
    title: z.string().max(250),
    description: z.string().max(400).optional(),
    category: z.string().max(100).optional(),
    link: z.string().url().or(z.string().startsWith('/')).optional(),
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
