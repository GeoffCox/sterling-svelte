export const CODE_CONTENT = `<script lang="ts">
  import { applyLightTheme} from '@geoffcox/sterling-svelte';
  import Button from '@geoffcox/sterling-svelte/Button.svelte';
</script>

<div use:applyLightTheme>
  <Button>Welcome to sterling-svelte</Button>
</div>`;

export const APP_D_TS = `// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {}
`;

export const APP_HTML = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-prefetch>
		<div>%sveltekit.body%</div>
	</body>
</html>
`;

export const GITIGNORE = `.DS_Store
node_modules
/build
/.svelte-kit
/package
.env
.env.*
!.env.example
.vercel
.output`;

export const NPMRC = `engine-strict=true`;

export const PACKAGE_JSON = `{
"name": "sterling-svelte-example",
"version": "0.0.1",
"scripts": {
    "dev": "vite dev"
},
"devDependencies": {
    "@geoffcox/sterling-svelte": "^0.0.20",
    "@sveltejs/adapter-auto": "^1.0.0",
    "@sveltejs/kit": "^1.0.0",
    "@sveltejs/package": "^1.0.0",
    "svelte": "^3.54.0",
    "svelte-check": "^2.9.2",
    "tslib": "^2.4.1",
    "typescript": "^4.9.3",
    "vite": "^4.0.0"
},
"type": "module",
"keywords": [],
"description": ""
}
  `;

export const PAGE_SVELTE = `<script>
import Example from '$lib/Example.svelte';
</script>

<svelte:head>
	<title>sterling-svelte</title>
	<meta name="description" content="sterling-svelte example" />
</svelte:head>

<Example/>
`;

export const PAGE_TS = `export const prerender = true;`;

export const SANDBOX_CONFIG_JSON = `{
    "container": {
        "node": "16",
        "startScript": "dev"
    }
}`;

export const SVELTE_CONFIG_JS = `import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
  },
};

export default config;
`;

export const TSCONFIG_JSON = `{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true
	}
}
`;

export const VITE_CONFIG_TS = `import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()]
};

export default config;
`;
