import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const webUrl = z.url({ protocol: /^https?$/ });
const calendarDate = z.preprocess(value => value instanceof Date && Number.isFinite(value.getTime())
  ? value.toISOString().slice(0, 10) : value, z.iso.date());

const writing = defineCollection({
  loader: glob({
    base: './src/content/writing',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    section: z.enum(['writing', 'projects']).default('writing'),
    projectTitle: z.string().trim().min(1).optional(),
    includeInWritingIndex: z.boolean().default(false),
    author: z.literal('Axel Rodriguez'),
    publishedAt: calendarDate,
    updatedAt: calendarDate.optional(),
    language: z.enum(['en', 'es']),
    tags: z.array(z.string().trim().min(1)).default([]),
    type: z.enum([
      'technical-article', 'research-note', 'experiment',
      'case-study', 'project-documentation', 'scientific-publication',
    ]),
    draft: z.boolean().default(true),
    translationId: z.string().trim().min(1).optional(),
    images: z.array(z.object({
      src: z.string().regex(/^\/images\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\.(?:png|jpe?g|webp)$/),
      alt: z.string().trim().min(1),
      caption: z.string().trim().min(1),
      width: z.int().positive(),
      height: z.int().positive(),
    })).default([]),
    references: z.array(z.object({ label: z.string().trim().min(1), url: webUrl })).default([]),
    relatedRepository: z.url({ protocol: /^https$/ }).optional(),
  }).refine(data => !data.updatedAt || data.updatedAt >= data.publishedAt, {
    path: ['updatedAt'],
    message: 'The update date must be on or after the publication date.',
  }),
});

export const collections = { writing };
