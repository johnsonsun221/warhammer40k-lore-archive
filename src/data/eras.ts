// Single source of truth for the "era" buckets used to group/filter
// timeline events, lore entries, and the EraNav component.
// Keep this list in sync with the `eraEnum` in `src/content.config.ts`.
export const eras = [
  { id: 'dark-age-of-technology', label: '科技黑暗時代' },
  { id: 'age-of-strife', label: '紛爭之世' },
  { id: 'great-crusade', label: '大遠征' },
  { id: 'horus-heresy', label: '荷魯斯之亂' },
  { id: 'age-of-the-imperium', label: '帝國時代' },
  { id: 'age-of-apostasy', label: '叛教時代' },
  { id: 'era-indomitus', label: '不屈紀元' },
  { id: 'other', label: '其他' },
] as const;

export type EraId = (typeof eras)[number]['id'];

export function eraLabel(id: string): string {
  return eras.find((e) => e.id === id)?.label ?? id;
}

// Display labels for the faction `alignment` enum (the stored values stay in
// English so they keep matching the content.config.ts schema).
const alignmentLabels: Record<string, string> = {
  Imperium: '帝國',
  Chaos: '混沌',
  Xenos: '異種',
  Other: '其他',
};

export function alignmentLabel(id: string): string {
  return alignmentLabels[id] ?? id;
}
