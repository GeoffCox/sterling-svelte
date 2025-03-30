import autoAdapter from '@sveltejs/adapter-auto';
import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';
const publishing = process.env.STERLING_SVELTE_PUBLISH === 'true';

const pathsBase = publishing ? '/docs/sterling-svelte' : '';
const routes = publishing ? 'src/routes/(app)' : 'src/routes';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess()],
  kit: {
    adapter: staticAdapter(),
    paths: {
      base: pathsBase,
      relative: false
    },
    files: {
      routes
    }
  }
};

export default config;
