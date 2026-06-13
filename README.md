# Warhammer 40k Lore Archive

A personal, non-commercial Warhammer 40,000 fan site built with
[Astro](https://astro.build). Its main focus is a **lore & timeline
knowledge base** - my own notes on the setting's worldview and major
historical events - plus placeholder sections for hobby projects, battle
reports, fan creations, and a model wishlist.

This is an unofficial fan project. Warhammer 40,000 and all related IP
belong to Games Workshop Limited.

## Project Structure

```text
/
├── astro.config.mjs        # site/base config for GitHub Pages
├── src/
│   ├── content.config.ts   # content collection schemas
│   ├── content/
│   │   ├── timeline-events/  # entries for the /timeline/ page
│   │   ├── lore-entries/     # entries for /lore/ and /lore/[slug]/
│   │   └── factions/         # entries for /factions/ and /factions/[slug]/
│   ├── components/
│   ├── layouts/
│   ├── styles/global.css   # "grimdark" theme (colors, fonts)
│   ├── data/eras.ts         # shared list of timeline eras
│   └── pages/
└── .github/workflows/deploy.yml  # GitHub Pages deployment
```

See [`CONTENT_GUIDE.md`](./CONTENT_GUIDE.md) for how to add new timeline
events, lore entries, and factions (including the `sortKey` dating
convention).

## Commands

| Command           | Action                                       |
| :----------------- | :------------------------------------------- |
| `npm install`      | Install dependencies                          |
| `npm run dev`       | Start local dev server at `localhost:4321`    |
| `npm run build`     | Build the production site to `./dist/`        |
| `npm run preview`   | Preview the production build locally          |

## Deployment

This site is configured for **GitHub Pages** via
`.github/workflows/deploy.yml`, using `astro.config.mjs`'s `site`/`base`
settings (`https://<username>.github.io/<repo-name>`).

One-time setup after pushing to GitHub:

1. In the repo, go to **Settings &rarr; Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**.
3. Push to `main` - the included workflow will build and deploy
   automatically.

If you rename the repo or use a custom domain, update `site` and `base` in
`astro.config.mjs` accordingly (and add a `public/CNAME` file for a custom
domain).
