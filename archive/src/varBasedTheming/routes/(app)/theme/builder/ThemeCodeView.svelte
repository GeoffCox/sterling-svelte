<script lang="ts">
  import type { Theme } from '$lib';
  import TextArea from '$lib/TextArea.svelte';

  export let theme: Theme;

  const generateThemeCode = (theme: Theme) => {
    const themeCode = Object.entries(theme)
      .map(([key, value]) => `  '${key}'': '${value}',`)
      .join('\n');

    return `export const customTheme = {\n${themeCode}\n};`;
  };

  $: themeCode = generateThemeCode(theme);
</script>

<TextArea bind:value={themeCode} autoHeight spellCheck={false} />
