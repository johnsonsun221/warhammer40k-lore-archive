# Content Guide

This file documents the conventions used by the content collections in
`src/content/`, so future-you doesn't have to reverse-engineer them later.

## Collections

There are three collections, defined in `src/content.config.ts`:

- **`timeline-events`** (`src/content/timeline-events/*.md`) - individual
  historical events shown on the `/timeline/` page.
- **`lore-entries`** (`src/content/lore-entries/*.md`) - longer "encyclopedia"
  articles shown on `/lore/` and `/lore/[slug]/`.
- **`factions`** (`src/content/factions/*.md`) - faction overview pages shown
  on `/factions/` and `/factions/[slug]/`.

## The `sortKey` convention (timeline ordering)

Warhammer 40k dates are written in-universe as things like `"c. M25"`,
`"c. 005.M31"`, or `"Year 999.M41"`. The `displayDate` field holds this
free-form string exactly as you want it shown.

For sorting on the timeline page, every `timeline-events` entry also needs a
numeric `sortKey`. The convention is:

- `sortKey: 0` is roughly the founding of the Imperium (start of M1).
- For dates **within the Imperial calendar** (M1 onward):
  `sortKey = (millennium - 1) * 1000 + yearWithinMillennium`
  - Example: `"c. 005.M31"` &rarr; `(31 - 1) * 1000 + 5 = 30005`
  - Example: `"999.M41"` &rarr; `(41 - 1) * 1000 + 999 = 40999`
- For dates **before the Imperium** (Age of Strife, Dark Age of Technology,
  etc.), use **negative numbers** or rough estimates below 0 - exact
  precision doesn't matter, only that earlier events get a smaller number
  than later ones.
- For "circa a whole millennium" dates (e.g. `"c. M25"`), use the
  millennium's starting year as an estimate, e.g. `(25 - 1) * 1000 = 24000`.

Only relative ordering matters - `displayDate` is what readers actually see.

## The `era` field

`era` is a shared enum (see `src/data/eras.ts` and the `eraEnum` in
`src/content.config.ts`) used to group events on the timeline and to power
the `EraNav` jump-links. Current values:

- `dark-age-of-technology`
- `age-of-strife`
- `great-crusade`
- `horus-heresy`
- `age-of-the-imperium`
- `age-of-apostasy`
- `era-indomitus`
- `other`

To add a new era, add it to the array in `src/data/eras.ts` - the Zod enum
in `content.config.ts` reads from this same array, so it stays in sync
automatically.

## Writing original content

All `summary` fields and Markdown body text should be **your own words** -
your own summaries, interpretations, and notes. Do not copy text verbatim
from Games Workshop books/website, Lexicanum, Wahapedia, or similar sources.
The `originalSummary: true` field on `lore-entries` is a reminder flag for
this (not rendered on the page).

## Images

All `image` fields are optional. If you don't have original artwork or
photos of your own models, leave it out - cards and pages fall back to a
CSS-drawn placeholder box (see `.placeholder-art` in
`src/styles/global.css`). **Do not add Games Workshop artwork** to this
repo.

## Frontmatter templates

### `timeline-events/*.md`

```yaml
---
title: ""
displayDate: ""       # e.g. "c. 005.M31"
sortKey: 0             # see convention above
era: "other"
summary: ""
factions: []
tags: []
relatedLoreEntry: ""   # optional, id of a lore-entries file (no extension)
relatedEvents: []      # optional, ids of other timeline-events files
draft: false
---
```

### `lore-entries/*.md`

```yaml
---
title: ""
summary: ""
era: "other"
sortKey: 0              # optional - only if this article anchors to the timeline
factions: []
tags: []
relatedEntries: []      # ids of other lore-entries files
relatedEvents: []       # ids of timeline-events files
originalSummary: true
draft: false
---
```

### `factions/*.md`

```yaml
---
title: ""
shortName: ""
summary: ""
alignment: "Imperium"  # "Imperium" | "Chaos" | "Xenos" | "Other"
tags: []
relatedEntries: []
placeholder: true        # set to false once you've written real content
draft: false
---
```
