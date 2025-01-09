// Svelte has a bug where it will think some Svelte code within string literals is code
// when placed within a .svelte file.  They are placed here as a workaround.
export const preBlocks = {
  npmInstall: `npm install @geoffcox/sterling-svelte`,
  yarnInstall: `yarn add @geoffcox/sterling-svelte`,
  addComponents: `<script>
  import Button from '@geoffcox/sterling-svelte/Button.svelte';
  import { Checkbox } from '@geoffcox/sterling-svelte';
</script>

<div>
  <Button>Hello sterling-svelte</Button>
  <Checkbox>Ready</Checkbox>
</div>`,
  npmInstallThemes: `npm install @geoffcox/sterling-svelte-themes`,
  yarnInstallThemes: `yarn add @geoffcox/sterling-svelte-themes`,
  importCss: `import '@geoffcox/sterling-svelte-themes/sterling.css';`,
  htmlLightDark: `<html class="light-mode"></html>`,
  importLightDark: `import { applyLightDarkMode } from '@geoffcox/sterling-svelte';

// TODO: Provide UI to toggle this between auto, light, or dark.
let mode = $state('auto');`,
  useLightDark: `<div use:applyLightDarkMode={{atDocumentRoot: true, mode}}>
  ...
</div>`,
  replImport: `<svelte:head>
  <link href="https://unpkg.com/@geoffcox/sterling-svelte-themes/css/sterling.css" rel="stylesheet">
</svelte:head>`
};
