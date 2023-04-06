import type { Project } from '@stackblitz/sdk';

const APP_SVELTE = `<script lang="ts">  
import { applyLightTheme} from '@geoffcox/sterling-svelte';
import Example from './Example.svelte';
</script>

<main>
  <div use:applyLightTheme>   
    <h1>Example</h1>
    <Example />
  </div>
</main>
`;

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- <link rel="icon" type="image/svg+xml" href="/vite.svg" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>sterling-svelte examples</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`;

const MAIN_TS = `import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app;
`;

const PACKAGE_JSON = `{
  "name": "vite-svelte-ts-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^2.0.3",
    "@tsconfig/svelte": "^3.0.0",
    "svelte": "^3.57.0",
    "svelte-check": "^2.10.3",
    "tslib": "^2.5.0",
    "typescript": "^5.0.2",
    "vite": "^4.2.1"
  },
  "dependencies": {
    "@geoffcox/sterling-svelte": "0.0.22"
  }
}
`;

const SVELTE_CONFIG_JS = `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}
`;

const TSCONFIG_JSON = `{
  "extends": "@tsconfig/svelte/tsconfig.json",
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "isolatedModules": true
  },
  "include": ["src/**/*.d.ts", "src/**/*.ts", "src/**/*.js", "src/**/*.svelte"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`;

const TSCONFIG_NODE_JSON = `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler"
  },
  "include": ["vite.config.ts"]
}`;

const VITE_CONFIG_TS = `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
})
`;

const VITE_ENV_D_TS = `/// <reference types="svelte" />
/// <reference types="vite/client" />
`;

export const sterlingSvelteProject: Project = {
  title: 'Dynamically Generated sterling-svelte Project',
  description: 'svelte-sterling dynamic project',
  template: 'node',
  files: {
    'index.html': INDEX_HTML,
    'package.json': PACKAGE_JSON,
    'svelte.config.js': SVELTE_CONFIG_JS,
    'tsconfig.json': TSCONFIG_JSON,
    'tsconfig.node.json': TSCONFIG_NODE_JSON,
    'vite.config.ts': VITE_CONFIG_TS,
    'src/App.svelte': APP_SVELTE,
    'src/main.ts': MAIN_TS,
    'src/vite.env.ts': VITE_ENV_D_TS
  }
};
