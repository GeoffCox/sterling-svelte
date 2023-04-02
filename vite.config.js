import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(require('./package.json').version)
  }
};

export default config;
