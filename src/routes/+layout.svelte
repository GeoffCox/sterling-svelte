<script lang="ts">
  import { applyDarkTheme, applyLightTheme, applyTheme, Select, toggleDarkTheme } from '$lib';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { oceanTheme } from './oceanTheme';
  import Input from '$lib/Input.svelte';
  import ListItem from '$lib/ListItem.svelte';

  const themes: Record<string, string> = {
    auto: 'automatic light/dark',
    light: 'light',
    dark: 'dark',
    ocean: 'ocean (dark)'
  };

  const components = [
    'Button',
    'Checkbox',
    'Dialog',
    'Input',
    'Label',
    'List',
    'ListItem',
    'Menu',
    'MenuBar',
    'MenuButton',
    'MenuItem',
    'MenuSeparator',
    'Progress',
    'Radio',
    'Select',
    'Slider',
    'Switch',
    'Tab',
    'TabList',
    'TextArea',
    'Tooltip',
    'Tree',
    'TreeChevron',
    'TreeItem',
    'TreeItemDisplay'
  ];

  let mounted = false;
  let currentTheme = 'auto';
  let filterText = '';

  $: filteredComponents =
    filterText && filterText.trim().length > 0
      ? components.filter((x) => x.toLowerCase().includes(filterText.trim().toLowerCase()))
      : components;

  const setTheme = (node: HTMLElement, themeKey: string) => {
    const themeParams = { atDocumentRoot: true };
    switch (themeKey) {
      case 'light':
        applyLightTheme(node, themeParams);
        break;
      case 'dark':
        applyDarkTheme(node, themeParams);
        break;
      case 'ocean':
        applyTheme(node, { ...themeParams, theme: oceanTheme });
        break;
      case 'auto':
      default:
        toggleDarkTheme(node, themeParams);
        break;
    }
  };

  const applyCurrentTheme = (node: HTMLElement, params: { themeKey: string }) => {
    setTheme(node, params.themeKey);
    return {
      destroy() {},
      update(params: { themeKey: string }) {
        setTheme(node, params.themeKey);
      }
    };
  };

  const parseCookie = () => {
    const pairs = document.cookie.split(';');

    const result: Record<string, string> = {};

    pairs.forEach((pair) => {
      const nameValue = pair.split('=');
      if (nameValue[0]) {
        result[nameValue[0]] = nameValue[1] ?? '';
      }
    });

    return result;
  };

  const defaultCookieExpiresMs = 30 * 24 * 60 * 60 * 1000;
  const setCookie = (name: string, value: string, expiresMs: number = defaultCookieExpiresMs) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + expiresMs);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getThemeCookie = () => {
    if (document) {
      const cookies = parseCookie();
      return cookies['sterling-docs-theme'];
    }
    return '';
  };

  const setThemeCookie = (themeName: string) => {
    if (document) {
      setCookie('sterling-docs-theme', themeName);
    }
  };

  const loadThemeFromCookie = () => {
    currentTheme = getThemeCookie() || currentTheme;
  };

  $: mounted && setThemeCookie(currentTheme);

  onMount(() => {
    mounted = true;
    loadThemeFromCookie();
  });
</script>

<div>
  {#if mounted}
    <div class="layout" use:applyCurrentTheme={{ themeKey: currentTheme }}>
      <div class="header">
        <div class="title">sterling-svelte (in progress)</div>
        <div class="subtitle">
          A modern, accessible, lightweight UI component library for Svelte.
        </div>
        <div class="select-theme">
          <Select bind:selectedValue={currentTheme}>
            <svelte:fragment slot="label">Theme</svelte:fragment>
            <svelte:fragment slot="value" let:selectedValue
              ><span> {selectedValue && themes[selectedValue]}</span></svelte:fragment
            >
            {#each Object.keys(themes) as themeKey}
              <ListItem value={themeKey}>{themes[themeKey]}</ListItem>
            {/each}
          </Select>
        </div>
      </div>

      <div class="content">
        <div class="nav">
          <a href="{base}/">Overview</a>
          <a href="{base}/theme">Theme</a>
          <div class="filter">
            <Input bind:value={filterText} type="search">
              <span slot="label">Filter Components</span>
            </Input>
          </div>
          <div class="nav-header">Components</div>
          <div class="nav-section">
            {#each filteredComponents as component}
              <a href="{base}/components/{component.toLowerCase()}">{component}</a>
            {/each}
          </div>
        </div>
        <div class="component">
          <slot />
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  @import '@fontsource/overpass';
  @import '@fontsource/fira-mono';

  :global(:root) {
    color: var(--stsv-Common__color);
    background-color: var(--stsv-Common__background-color);
  }

  :global(html) {
    padding: 0;
    margin: 0;
  }

  :global(body) {
    font-family: 'Overpass', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
      Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
  }

  :global(h1),
  :global(h2),
  :global(h3) {
    margin-block-start: 0.7em;
    margin-block-end: 0.25em;
  }

  :global(p) {
    margin-block-start: 0.25em;
    margin-block-end: 0.25em;
    line-height: 1.6em;
  }

  :global(pre),
  :global(code) {
    font-family: 'FiraMono', monospace;
    background-color: var(--stsv-Layer__background-color--1);
    color: var(--stsv-Layer__color--1);
  }

  :global(pre) {
    padding: 1em;
  }

  :global(blockquote) {
    background-color: var(--stsv-Layer__background-color--1);
    color: var(--stsv-Display__color--info);
    padding: 1em;
    margin: 0;
  }

  :global(table) {
    border: 1px solid var(--stsv-Common__border-color);
    width: max-content;
    border-collapse: collapse;
  }

  :global(th) {
    font-weight: lighter;
    font-size: 1.1em;
    background: var(--stsv-Display__background-color);
    color: var(--stsv---Display__color);
    padding: 0.5em;
    text-align: start;
    border: 1px solid var(--stsv-Common__border-color);
  }

  :global(td) {
    padding: 0.5em;
    text-align: start;
    border: 1px solid var(--stsv-Common__border-color);
  }

  :global(li) {
    margin-bottom: 0.5em;
    margin-block-start: 0.5em;
  }

  .layout {
    padding: 0 3em;
  }

  .header {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    column-gap: 3em;
    padding: 2em 0;
    width: fit-content;
  }

  .header .title {
    font-size: 1.6em;
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
  }

  .header .subtitle {
    font-size: 1.2em;
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
  }

  .header .select-theme {
    min-width: 250px;
    justify-self: flex-end;
    grid-row: 1 / span 2;
    grid-column: 2 / span 1;
  }

  .content {
    display: grid;
    grid-template-columns: auto 1fr;
    margin-top: 1em;
  }

  .nav {
    display: flex;
    flex-direction: column;
    background-color: var(--stsv-Common__background-color);
    border-right: 1px solid var(--stsv-Common__border-color);
    padding: 1em;
  }

  .nav-section {
    padding-left: 0.25em;
  }

  .nav-header {
    font-size: 0.8em;
    font-variant: small-caps;
    margin-top: 2em;
  }

  .nav a {
    display: block;
    text-decoration: none;
    margin: 0.5em 0;
    font-size: 1em;
    color: var(--stsv-Common__color);
  }

  .nav a:hover {
    text-decoration: underline;
  }

  .filter {
    margin-top: 3em;
  }

  .component {
    display: flex;
    flex-direction: column;
    place-content: start;
    place-items: start;
    padding: 0 20px 150px 20px;
  }
</style>
