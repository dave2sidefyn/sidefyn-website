// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://dave2sidefyn.github.io/sidefyn-website',
  base: '/sidefyn-website/',
  vite: {
    plugins: [tailwindcss()],
  },
});
