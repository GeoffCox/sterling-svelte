export const preBlocks = {
  install1: `npm install @geoffcox/sterling-svelte`,
  install2: `yarn add @geoffcox/sterling-svelte`,
  importCss1: `import '@geoffcox/sterling-svelte/css/sterling.css';`,
  importCss2: `<svelte:head>
  <link href="https://unpkg.com/@geoffcox/sterling-svelte/dist/css/sterling.css" rel="stylesheet">
</svelte:head>`,
  darkLightMode: `<script lang="ts">
  import { applyLightDarkMode } from '@geoffcox/sterling-svelte';
</script>
`,
  firstButton: `<script>
  import Button from '@geoffcox/sterling-svelte/Button.svelte';
  import { Checkbox } from '@geoffcox/sterling-svelte';
</script>

<div>
  <Button>Hello sterling-svelte</Button>
  <Checkbox>Ready</Checkbox>
</div>`
};
