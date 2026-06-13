// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://johnsonsun221.github.io',
  base: '/warhammer40k-lore-archive',
  integrations: [mdx()]
});