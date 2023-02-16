<script lang="ts">
  import { applyDarkTheme, applyLightTheme, applyTheme, Select, toggleDarkTheme } from '$lib';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { oceanTheme } from './oceanTheme';

  const themeNames: string[] = ['automatic (light/dark)', 'light', 'dark', 'ocean (dark)'];
  let themeIndex = 0;

  let mounted = false;

  const setTheme = (node: HTMLElement, index: number) => {
    const themeParams = { atDocumentRoot: true };
    switch (index) {
      case 1:
        applyLightTheme(node, themeParams);
        break;
      case 2:
        applyDarkTheme(node, themeParams);
        break;
      case 3:
        applyTheme(node, { ...themeParams, theme: oceanTheme });
        break;
      case 0:
      default:
        toggleDarkTheme(node, themeParams);
        break;
    }
  };

  const applyCurrentTheme = (node: HTMLElement, params: { index: number }) => {
    setTheme(node, params.index);
    return {
      destroy() {},
      update(params: { index: number }) {
        setTheme(node, params.index);
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
    const index = themeNames.indexOf(getThemeCookie());
    if (index !== -1) {
      themeIndex = index;
    }
  };

  $: mounted && setThemeCookie(themeNames[themeIndex]);

  onMount(() => {
    mounted = true;
    loadThemeFromCookie();
  });
</script>

<div>
  {#if mounted}
    <div class="layout" use:applyCurrentTheme={{ index: themeIndex }}>
      <div class="header">
        <div class="title">sterling-svelte (in progress)</div>
        <div class="subtitle">
          A modern, accessible, and lightweight UI component library for Svelte.
        </div>
        <div class="select-theme">
          <Select items={themeNames} bind:selectedIndex={themeIndex}>
            <svelte:fragment slot="label">Theme</svelte:fragment>
          </Select>
        </div>
      </div>

      <div class="content">
        <div class="nav">
          <a href="{base}/">Overview</a>
          <a href="{base}/theme">Theme</a>
          <div class="nav-header">Components</div>
          <div class="nav-section">
            <a href="{base}/components/button">Button</a>
            <a href="{base}/components/checkbox">Checkbox</a>
            <a href="{base}/components/dialog">Dialog</a>
            <a href="{base}/components/input">Input</a>
            <a href="{base}/components/label">Label</a>
            <a href="{base}/components/list">List</a>
            <a href="{base}/components/menu">Menu</a>
            <a href="{base}/components/menubar">MenuBar</a>
            <a href="{base}/components/menubutton">MenuButton</a>
            <a href="{base}/components/menuitem">MenuItem</a>
            <a href="{base}/components/menuseparator">MenuSeparator</a>
            <a href="{base}/components/progress">Progress</a>
            <a href="{base}/components/radio">Radio</a>
            <a href="{base}/components/select">Select</a>
            <a href="{base}/components/slider">Slider</a>
            <a href="{base}/components/switch">Switch</a>
            <a href="{base}/components/tab">Tab</a>
            <a href="{base}/components/tablist">TabList</a>
            <a href="{base}/components/textarea">TextArea</a>
            <a href="{base}/components/tree">Tree</a>
            <a href="{base}/components/treechevron">TreeChevron</a>
            <a href="{base}/components/treeitem">TreeItem</a>
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
    color: var(--Common__color);
    background-color: var(--Common__background-color);
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
    background-color: var(--Layer__background-color--1);
    color: var(--Layer__color--1);
  }

  :global(pre) {
    padding: 1em;
  }

  :global(blockquote) {
    background-color: var(--Layer__background-color--1);
    color: var(--Display__color--info);
    padding: 1em;
    margin: 0;
  }

  :global(table) {
    border: 1px solid var(--Common__border-color);
    width: max-content;
    border-collapse: collapse;
  }

  :global(th) {
    font-weight: lighter;
    font-size: 1.1em;
    background: var(--Display__background-color);
    color: var(----Display__color);
    padding: 0.5em;
    text-align: start;
    border: 1px solid var(--Common__border-color);
  }

  :global(td) {
    padding: 0.5em;
    text-align: start;
    border: 1px solid var(--Common__border-color);
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
    background-color: var(--Common__background-color);
    border-right: 1px solid var(--Common__border-color);
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
    color: var(--Common__color);
  }

  .nav a:hover {
    text-decoration: underline;
  }

  .component {
    display: flex;
    flex-direction: column;
    place-content: start;
    place-items: start;
    padding: 0 20px 150px 20px;
  }
</style>
