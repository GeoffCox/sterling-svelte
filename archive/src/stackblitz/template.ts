import type { Project } from '@stackblitz/sdk';

const APP_SVELTE = `<script lang="ts">  
import '@geoffcox/sterling-svelte/css/sterling.css';
import { applyLightDarkMode } from '@geoffcox/sterling-svelte';
import Example from './Example.svelte';
</script>

<main>
  <div use:applyLightDarkMode={{
    atDocumentRoot: true,
    mode: 'auto'
  }}>   
    <h1>Example</h1>
    <Example />
  </div>
</main>
`;

const INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Svelte + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`;

const MAIN_TS = `import App from './App.svelte';

const app = new App({
  target: document.getElementById('app')!,
})

export default app
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
    "@sveltejs/vite-plugin-svelte": "^3.1.1",
    "@tsconfig/svelte": "^5.0.4",
    "svelte": "^4.2.17",
    "svelte-check": "^3.8.0",
    "tslib": "^2.6.2",
    "typescript": "^5.2.2",
    "vite": "^5.2.12"
  },
  "dependencies": {
    "@geoffcox/sterling-svelte": "1.0.9"
  }
}
`;

const SVELTE_CONFIG_JS = `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}`;

const TSCONFIG_JSON = `{
  "extends": "@tsconfig/svelte/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "useDefineForClassFields": true,
    "module": "ESNext",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "target": "ESNext",
  },
  "include": ["src/**/*.ts", "src/**/*.js", "src/**/*.svelte"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`;

const TSCONFIG_NODE_JSON = `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true
  },
  "include": ["vite.config.ts"]
}`;

const VITE_CONFIG_TS = `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
})`;

const VITE_ENV_D_TS = `/// <reference types="svelte" />
/// <reference types="vite/client" />`;

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
    'src/vite-env.d.ts': VITE_ENV_D_TS
  }
};
