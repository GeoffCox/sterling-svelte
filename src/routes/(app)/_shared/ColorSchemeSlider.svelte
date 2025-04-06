<svelte:options runes={true} />

<script module lang="ts">
  const parseCookies = () => {
    const pairs = globalThis.document.cookie.split(';');

    const result: Record<string, string> = {};

    pairs.forEach((pair) => {
      const nameValue = pair.split('=');
      if (nameValue[0]) {
        result[nameValue[0]] = nameValue[1] ?? '';
      }
    });

    return result;
  };

  const getCookie = (name: string) => {
    const cookies = parseCookies();
    return cookies[name];
  };

  const defaultCookieExpiresMs = 30 * 24 * 60 * 60 * 1000;
  const setCookie = (name: string, value: string, expiresMs: number = defaultCookieExpiresMs) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + expiresMs);
    globalThis.document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };
</script>

<script lang="ts">
  import Button from '$lib/Button.svelte';
  import Slider from '$lib/Slider.svelte';
  import AutoModeIcon from './icons/AutoModeIcon.svelte';
  import DarkModeIcon from './icons/DarkModeIcon.svelte';
  import LightModeIcon from './icons/LightModeIcon.svelte';
  import { colorScheme as colorSchemeAction } from '$lib/actions/colorScheme';
  import { onMount } from 'svelte';

  type Props = {
    colorScheme?: string;
    cookieName?: string;
  };

  let { colorScheme = $bindable('light dark'), cookieName }: Props = $props();

  const saveColorScheme = (value: string) => {
    if (globalThis.document && cookieName) {
      setCookie(cookieName, value);
    }
  };

  const loadColorScheme = () => {
    if (globalThis.document && cookieName) {
      const cookies = parseCookies();
      colorScheme = cookies['sterling-docs-color-scheme'] || colorScheme;
    }
  };

  let sliderValue = $derived(colorScheme === 'light dark' ? 1 : colorScheme === 'light' ? 0 : 2);

  const onSliderChange = (value: number) => {
    switch (value) {
      case 0:
        colorScheme = 'light';
        break;
      case 1:
        colorScheme = 'light dark';
        break;
      case 2:
        colorScheme = 'dark';
        break;
      default:
        colorScheme = 'light dark';
        break;
    }
  };

  onMount(() => {
    loadColorScheme();
  });

  $effect(() => {
    saveColorScheme(colorScheme);
  });
</script>

<div class="mode-select" use:colorSchemeAction={{ value: colorScheme }}>
  <div class="icon light">
    <Button class="square tool" onclick={() => (colorScheme = 'light')}>
      <LightModeIcon width="1em" height="1em" fill="hsl(39, 100%, 45%)" />
    </Button>
  </div>
  <div class="icon auto">
    <Button class="square tool" onclick={() => (colorScheme = 'light dark')}>
      <AutoModeIcon width="1em" height="1em" />
    </Button>
  </div>
  <div class="icon dark">
    <Button class="square tool" onclick={() => (colorScheme = 'dark')}>
      <DarkModeIcon width="1em" height="1em" fill="hsl(198, 100%, 40%)" />
    </Button>
  </div>

  <div class="slider">
    <Slider min={0} max={2} step={1} precision={0} value={sliderValue} onChange={onSliderChange} />
  </div>
</div>

<style>
  .mode-select {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;
    grid-template-areas: 'light auto dark' 'slider slider slider';
    align-items: center;
    justify-items: center;
  }

  .light {
    grid-area: light;
  }

  /* .light :global(svg) {
    grid-area: light;
    color: hsl(39, 100%, 45%);
  } */

  .auto {
    grid-area: auto;
  }

  .dark {
    grid-area: dark;
  }

  /* .dark :global(svg) {
    color: hsl(198, 100%, 40%);
  } */

  .slider {
    grid-area: slider;
    justify-self: stretch;
    margin: 0 0.85em;
  }
</style>
