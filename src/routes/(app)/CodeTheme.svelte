<script lang="ts">
  import { assets } from '$app/paths';
  import { onMount } from 'svelte';

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
      let themeLink = document.head.querySelector('link[sterling-code-theme]');

      if (themeLink) {
        themeLink.remove();
      }

      themeLink = document.createElement('link');
      themeLink.setAttribute('sterling-code-theme', 'true');
      themeLink.setAttribute('href', `${assets}/` + themeFile);
      themeLink.setAttribute('rel', 'stylesheet');
      document.head.appendChild(themeLink);
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
