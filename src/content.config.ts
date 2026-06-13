import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { eras } from './data/eras';

// Coarse "era" bucket shared across collections, used for grouping/filtering
// on the timeline page and for the EraNav component. Keep in sync with
// `src/data/eras.ts`.
const eraIds = eras.map((e) => e.id) as [string, ...string[]];
const eraEnum = z.enum(eraIds);

const timelineEvents = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/timeline-events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Human-readable in-universe date, exactly as it should be displayed
      // (e.g. "c. M25", "c. 005.M31", "Year 999.M41 onward").
      displayDate: z.string(),
      // Numeric value used purely for chronological ordering on the
      // timeline page. See CONTENT_GUIDE.md for the sortKey convention.
      sortKey: z.number(),
      // Coarse era bucket for grouping/EraNav.
      era: eraEnum,
      // Short 1-2 sentence summary shown on cards/lists.
      summary: z.string(),
      // Factions/groups involved, for tagging/filtering.
      factions: z.array(z.string()).default([]),
      // Free-form tags.
      tags: z.array(z.string()).default([]),
      // Optional link to a fuller lore article.
      relatedLoreEntry: reference('lore-entries').optional(),
      // Optional links to other related timeline events.
      relatedEvents: z.array(reference('timeline-events')).default([]),
      // Optional illustrative image (must be original/public-domain - no GW art).
      image: image().optional(),
      imageAlt: z.string().optional(),
      // Hide drafts from production builds.
      draft: z.boolean().default(false),
    }),
});

const loreEntries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lore-entries' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      era: eraEnum,
      // Optional: lets a "worldview" article also anchor itself on the timeline.
      sortKey: z.number().optional(),
      factions: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      relatedEntries: z.array(reference('lore-entries')).default([]),
      relatedEvents: z.array(reference('timeline-events')).default([]),
      image: image().optional(),
      imageAlt: z.string().optional(),
      draft: z.boolean().default(false),
      // Reminder flag (not rendered): confirms the body text is your own
      // original summary/paraphrase, not copied from GW/Lexicanum.
      originalSummary: z.boolean().default(true),
    }),
});

const factions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/factions' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortName: z.string(),
      summary: z.string(),
      alignment: z.enum(['Imperium', 'Chaos', 'Xenos', 'Other']).optional(),
      tags: z.array(z.string()).default([]),
      relatedEntries: z.array(reference('lore-entries')).default([]),
      image: image().optional(),
      imageAlt: z.string().optional(),
      draft: z.boolean().default(false),
      // True until this faction page has real, original content written.
      placeholder: z.boolean().default(true),
    }),
});

export const collections = {
  'timeline-events': timelineEvents,
  'lore-entries': loreEntries,
  factions,
};
