<script lang="ts">
  import { applyDarkTheme, applyLightTheme, applyTheme, Select, toggleDarkTheme } from '$lib';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { oceanTheme } from './oceanTheme';
  import Input from '$lib/Input.svelte';
  import Field from '$lib/Field.svelte';
  import Link from '$lib/Link.svelte';
  import MenuItem from '$lib/MenuItem.svelte';
  import MenuButton from '$lib/MenuButton.svelte';
  import HamburgerIcon from './HamburgerIcon.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';
  import FilterIcon from './FilterIcon.svelte';
  import ThemeIcon from './ThemeIcon.svelte';
  import CodeTheme from './CodeTheme.svelte';
  import GitHubIcon from './GitHubIcon.svelte';

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
    'Dropdown',
    'Field',
    'Input',
    'Label',
    'Link',
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

  const onNavMenuSelect = (event: CustomEvent<any>) => {
    const url = event.detail.value;
    window.location.href = url;
  };

  const onThemeSelect = (event: CustomEvent<any>) => {
    currentTheme = event.detail.value;
  };
</script>

<div>
  {#if mounted}
    <div class="layout" use:applyCurrentTheme={{ themeKey: currentTheme }}>
      <div class="header">
        <div class="hamburger-menu">
          <MenuButton
            value="components"
            shape="circular"
            variant="ghost"
            on:select={onNavMenuSelect}
          >
            <HamburgerIcon />
            <svelte:fragment slot="items">
              <MenuItem value="{base}/" text="Overview" />
              <MenuItem value="{base}/topics/gettingStarted" text="Getting Started" />
              <MenuItem value="{base}/topics/roadmap" text="Roadmap" />
              <MenuItem value="{base}/theme" text="Theme" />
              <MenuItem value="{base}/topics/actions" text="Actions" />
              <MenuSeparator />
              {#each filteredComponents as component}
                <MenuItem value="{base}/components/{component.toLowerCase()}" text={component} />
              {/each}
            </svelte:fragment>
          </MenuButton>
        </div>
        <div class="title">
          <span>sterling-svelte</span>
          <span style="font-size: 0.7em">&nbsp;{import.meta.env.PACKAGE_VERSION}</span>
        </div>
        <div class="subtitle">
          A modern, accessible, lightweight UI component library for Svelte.
        </div>
        <div class="select-theme">
          <MenuButton value="theme" on:select={onThemeSelect} shape="circular">
            <ThemeIcon />
            <svelte:fragment slot="items">
              {#each Object.keys(themes) as themeKey}
                <MenuItem value={themeKey} text={themes[themeKey]} />
              {/each}
            </svelte:fragment>
          </MenuButton>
        </div>
        <div class="github">
          <Link href="http://github.com/GeoffCox/sterling-svelte" variant="ghost">
            <div class="github-icon"><GitHubIcon /></div>
          </Link>
        </div>
      </div>

      <div class="content">
        <div class="nav">
          <div class="nav-section">
            <Link href="{base}/" variant="ghost">Overview</Link>
            <Link href="{base}/topics/gettingStarted" variant="ghost">Getting Started</Link>
            <Link href="{base}/topics/roadmap" variant="ghost">Roadmap</Link>
            <Link href="{base}/theme" variant="ghost">Theme</Link>
            <Link href="{base}/topics/actions" variant="ghost">Actions</Link>
          </div>
          <div class="nav-header">Components</div>
          <div class="filter">
            <Field for="filter-components">
              <div class="filter-flex">
                <Input id="filter-components" bind:value={filterText} composed />
                <FilterIcon />
              </div>
            </Field>
          </div>
          <div class="nav-section">
            {#each filteredComponents as component}
              <Link href="{base}/components/{component.toLowerCase()}" variant="ghost"
                >{component}</Link
              >
            {/each}
          </div>
        </div>
        <div class="component">
          <CodeTheme theme={currentTheme}>
            <slot />
          </CodeTheme>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* ----- Global ----- */
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
    font-size: 0.9em;
    font-family: Menlo, Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', 'Courier New', monospace;
  }

  :global(blockquote) {
    background-color: var(--stsv-Layer__background-color--1);
    color: var(--stsv-Info__color);
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

  /* ----- Layout ----- */

  .layout {
    padding: 0 3em;
  }

  .header {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    grid-template-rows: auto auto;
    padding: 2em 0 1em 0;
    border-bottom: 1px solid var(--stsv-Common__border-color);
  }

  .header .hamburger-menu {
    align-self: flex-start;
    justify-self: flex-end;
    font-size: 0.8em;
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
    margin-right: 0.5em;
  }

  .header .title {
    font-size: 1.6em;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    align-items: center;
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;
    min-width: 250px;
  }

  .header .subtitle {
    font-size: 0.9em;
    grid-row: 2 / span 1;
    grid-column: 2 / span 1;
  }

  .header .select-theme {
    display: grid;
    justify-items: flex-end;
    justify-self: flex-end;
    align-items: center;
    grid-row: 1 / span 2;
    grid-column: 3 / span 1;
    margin-left: 1em;
  }

  .header .github {
    display: grid;
    justify-items: flex-end;
    justify-self: flex-end;
    align-items: center;
    grid-row: 1 / span 2;
    grid-column: 4 / span 1;
    margin-left: 1em;
  }

  .header .github .github-icon {
    width: 50px;
    height: 50px;
  }

  .content {
    display: grid;
    grid-template-columns: auto 1fr;
    margin-top: 0.25em;
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
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: 0.25em;
    justify-content: flex-start;
    justify-items: flex-start;
  }

  .nav-header {
    font-size: 0.8em;
    font-variant: small-caps;
    margin: 1em 0 0.5em 0;
  }

  .filter {
    margin: 0 0 0.5em 0;
  }

  .filter-flex {
    display: flex;
    align-items: center;
    padding-right: 0.25em;
  }

  .component {
    display: flex;
    flex-direction: column;
    place-content: start;
    place-items: start;
    padding: 0 1em 10em 1em;
  }

  @media (max-width: 1000px) {
    .nav {
      display: none;
    }
  }
</style>