import autoAdapter from '@sveltejs/adapter-auto';
import staticAdapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const dev = process.env.NODE_ENV === 'development';
const publishing = process.env.STERLING_SVELTE_PUBLISH === 'true';

const pathsBase = publishing ? '/demos/sterling-svelte' : '';
const routes = publishing ? 'src/routes/(app)' : 'src/routes';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [preprocess()],
  kit: {
    adapter: publishing ? staticAdapter() : autoAdapter(),
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
