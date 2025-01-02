// Svelte has a bug where it will think some Svelte code within string literals is code
// when placed within a .svelte file.  They are placed here as a workaround.
export const preBlocks = {
  prefersColorSchemeDark: `<script lang="ts">
  import { prefersColorSchemeDark } from '@geoffcox/sterling-svelte';
</script>

<div>The user prefers dark mode: {$prefersColorSchemeDark}</div>
`,
  prefersReducedMotion: `<script lang="ts">
  import { prefersReducedMotion } from '@geoffcox/sterling-svelte';
</script>

<div>The user prefers reduced motion: {$prefersReducedMotion}</div>
`,
  usingKeyboard: `<script lang="ts">
  import { usingKeyboard } from '@geoffcox/sterling-svelte';
</script>

<div>The user is currently using the keyboard: {$usingKeyboard}</div>
`
};
