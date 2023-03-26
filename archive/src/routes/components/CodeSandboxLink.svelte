<script lang="ts">
  import { getParameters } from 'codesandbox-import-utils/lib/api/define';
  import {
    APP_D_TS,
    APP_HTML,
    CODE_CONTENT,
    GITIGNORE,
    NPMRC,
    PACKAGE_JSON,
    PAGE_SVELTE,
    PAGE_TS,
    SANDBOX_CONFIG_JSON,
    SVELTE_CONFIG_JS,
    TSCONFIG_JSON,
    VITE_CONFIG_TS
  } from './codesandbox.constants';

  import Link from '$lib/Link.svelte';

  const parameters = getParameters({
    files: {
      'src/lib/Example.svelte': {
        isBinary: false,
        content: CODE_CONTENT
      },
      'src/routes/+page.svelte': {
        isBinary: false,
        content: PAGE_SVELTE
      },
      'src/routes/+page.ts': {
        isBinary: false,
        content: PAGE_TS
      },
      'src/app.d.ts': {
        isBinary: false,
        content: APP_D_TS
      },
      'src/app.html': {
        isBinary: false,
        content: APP_HTML
      },
      '.gitignore': {
        isBinary: false,
        content: GITIGNORE
      },
      '.npmrc': {
        isBinary: false,
        content: NPMRC
      },
      'package.json': {
        isBinary: false,
        content: PACKAGE_JSON
      },
      'sandbox.config.json': {
        isBinary: false,
        content: SANDBOX_CONFIG_JSON
      },
      'svelte.config.js': {
        isBinary: false,
        content: SVELTE_CONFIG_JS
      },
      'tsconfig.js': {
        isBinary: false,
        content: TSCONFIG_JSON
      },
      'vite.config.ts': {
        isBinary: false,
        content: VITE_CONFIG_TS
      }
    }
  });

  const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
</script>

<Link href={url} target="_blank">CodeSandbox</Link>
