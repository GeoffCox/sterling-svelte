<script lang="ts">
  import { onMount, tick } from 'svelte';

  export let theme: string;
  let autoIsDark = false;

  const getThemeFile = (theme: string, autoIsDark: boolean) => {
    switch (theme) {
      case 'auto':
        if (autoIsDark) {
          return 'prism-vsc-dark-plus.css';
        } else {
          return 'prism-vs.css';
        }
      case 'dark':
        return 'prism-vsc-dark-plus.css';
      case 'ocean':
        return 'prism-night-owl.css';
      case 'light':
      default:
        return 'prism-vs.css';
    }
  };

  const updateTheme = async (theme: string, autoIsDark: boolean) => {
    const themeFile = getThemeFile(theme, autoIsDark);
    if (themeFile) {
      const stylesToRemove: Element[] = [];
      let styleToKeep: Element | undefined = undefined;

      document.head.querySelectorAll('style[data-vite-dev-id]').forEach((value) => {
        const stylePath = value.getAttribute('data-vite-dev-id');
        if (stylePath?.includes(`/${themeFile}`)) {
          styleToKeep = value as Element;
        } else if (stylePath?.includes('/prism-')) {
          stylesToRemove.push(value as Element);
        }
      });

      stylesToRemove.forEach((style) => {
        (style as HTMLStyleElement).disabled = true;
      });

      if (styleToKeep !== undefined) {
        (styleToKeep as HTMLStyleElement).disabled = false;
      } else {
        await import(`./${themeFile}`);
      }
    }
  };

  $: updateTheme(theme, autoIsDark);

  const mediaChangeHandler = (e: MediaQueryListEvent) => {
    autoIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  onMount(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    matchMedia.addEventListener('change', mediaChangeHandler);

    autoIsDark = matchMedia.matches;

    return () => {
      matchMedia.removeEventListener('change', mediaChangeHandler);
    };
  });
</script>

<slot />
