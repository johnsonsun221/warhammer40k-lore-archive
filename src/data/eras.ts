// Single source of truth for the "era" buckets used to group/filter
// timeline events, lore entries, and the EraNav component.
// Keep this list in sync with the `eraEnum` in `src/content.config.ts`.
export const eras = [
  { id: 'dark-age-of-technology', label: 'Dark Age of Technology' },
  { id: 'age-of-strife', label: 'Age of Strife' },
  { id: 'great-crusade', label: 'The Great Crusade' },
  { id: 'horus-heresy', label: 'The Horus Heresy' },
  { id: 'age-of-the-imperium', label: 'Age of the Imperium' },
  { id: 'age-of-apostasy', label: 'Age of Apostasy' },
  { id: 'era-indomitus', label: 'Era Indomitus' },
  { id: 'other', label: 'Other' },
] as const;

export type EraId = (typeof eras)[number]['id'];

export function eraLabel(id: string): string {
  return eras.find((e) => e.id === id)?.label ?? id;
}
