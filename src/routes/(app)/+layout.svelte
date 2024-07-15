<script lang="ts">
  import '$lib/css/sterling.css';
  import { applyLightDarkMode } from '$lib';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import Link from '$lib/Link.svelte';
  import MenuItem from '$lib/MenuItem.svelte';
  import MenuButton from '$lib/MenuButton.svelte';
  import HamburgerIcon from './_shared/icons/HamburgerIcon.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';
  import FilterIcon from './_shared/icons/FilterIcon.svelte';
  import CodeTheme from './_shared/CodeTheme.svelte';
  import GitHubIcon from './_shared/icons/GitHubIcon.svelte';
  import ModeSlider from './_shared/ModeSlider.svelte';
  import Nav from './_shared/Nav.svelte';
  import Dropdown from '$lib/Dropdown.svelte';
  import { navigating } from '$app/stores';

  const themes: Record<string, string> = {
    auto: 'automatic light/dark',
    light: 'light',
    dark: 'dark',
    ocean: 'ocean (dark)',
    fluentLight: 'fluent-ui-esque (light)'
  };

  let mounted = false;
  let currentTheme = 'auto';

  let mode = 'auto';
  let hamburgerOpen = false;

  $: {
    if ($navigating !== null) {
      hamburgerOpen = false;
    }
  }

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

<div
  class="root"
  use:applyLightDarkMode={{
    atDocumentRoot: true,
    mode: mode === 'auto' ? 'auto' : mode === 'dark' ? 'dark' : 'light'
  }}
>
  <div class="spa">
    <div class="layout">
      <div class="header">
        <div class="title">
          <span>sterling-svelte</span>
          <span style="font-size: 0.7em">&nbsp;{import.meta.env.PACKAGE_VERSION}</span>
        </div>
        <div class="subtitle">
          A modern, accessible, lightweight UI component library for Svelte.
        </div>
        <div class="mode">
          <ModeSlider bind:mode />
        </div>
        <div class="github">
          <Link href="http://github.com/GeoffCox/sterling-svelte" variant="ghost">
            <div class="github-icon"><GitHubIcon /></div>
          </Link>
        </div>
        <div class="hamburger-menu">
          <Dropdown bind:open={hamburgerOpen} variant="composed">
            <svelte:fragment slot="icon">
              <div class="hamburger-icon">
                <HamburgerIcon />
              </div>
            </svelte:fragment>
            <div class="hamburger-nav"><Nav /></div>
          </Dropdown>
        </div>
      </div>
      <div class="nav">
        <div class="nav-container">
          <Nav />
        </div>
      </div>
      <div class="content">
        <div class="content-container">
          <CodeTheme theme={mode}>
            <slot />
          </CodeTheme>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* ----- Global ----- */
  @import '@fontsource/open-sans';
  @import '@fontsource/source-code-pro';

  :global(:root) {
    color: var(--stsv-common__color);
    background-color: var(--stsv-common__background-color);
  }

  :global(html) {
    padding: 0;
    margin: 0;
  }

  :global(body) {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 1em;
    min-height: 100vh;
    overflow: hidden;
  }

  :global(h1),
  :global(h2),
  :global(h3) {
    margin-block-start: 0.7em;
    margin-block-end: 0.5em;
  }

  :global(h1) {
    font-size: 1.8em;
    font-weight: normal;
  }

  :global(h2) {
    font-size: 1.4em;
    font-weight: normal;
  }

  :global(h3) {
    font-size: 1.1em;
    font-weight: normal;
  }

  :global(p) {
    margin-block-start: 0.25em;
    margin-block-end: 0.25em;
    line-height: 1.6em;
  }

  :global(code) {
    font-family: 'Source Code Pro', monospace;
    font-weight: bold;
    color: var(--stsv-common__color);
    background-color: var(--stsv-common__background-color--faint);
  }

  :global(pre) {
    font-family: 'Source Code Pro', monospace;
    font-weight: bold;
    color: var(--stsv-common__color);
    background-color: var(--stsv-common__background-color--faint);
    border: 1px solid var(--stsv-common__background-color--secondary);
    padding: 1em;
    text-wrap: wrap;
  }

  :global(pre code) {
    background-color: unset;
  }

  :global(blockquote) {
    background-color: var(--stsv-common__background-color--faint);
    color: var(--stsv-common__color--secondary);
    padding: 1em;
    margin: 0;
  }

  :global(table) {
    border: 1px solid var(--stsv-common__border-color);
    width: max-content;
    border-collapse: collapse;
  }

  :global(th) {
    font-weight: lighter;
    font-size: 1.1em;
    background: var(--stsv-common__background-color--secondary);
    color: var(--stsv-Common__color--secondary);
    padding: 0.5em;
    text-align: start;
    border: 1px solid var(--stsv-common__border-color);
  }

  :global(td) {
    padding: 0.5em;
    text-align: start;
    border: 1px solid var(--stsv-common__border-color);
  }

  :global(li) {
    margin-bottom: 0.5em;
    margin-block-start: 0.5em;
  }

  /* ----- Layout ----- */

  .root {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .spa {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    place-content: stretch;
    place-items: stretch;
    overflow: hidden;
    margin: 1em;
    padding: 0;
    height: calc(100% - 2em);
  }

  .layout {
    grid-row: 1;
    grid-column: 1;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: 'header header' 'nav content';
    align-items: stretch;
    align-content: stretch;
    padding: 0;
    color: var(--stsv-common__color);
    overflow: hidden;
  }

  .header {
    grid-area: header;
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    grid-template-rows: auto auto;
    grid-template-areas: 'burger title mode github' '. subtitle mode github';
    align-items: center;
    padding: 1em;
    border-bottom: 1px solid var(--stsv-common__border-color);
  }

  .header .title {
    grid-area: title;
    font-size: 1.6em;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    align-items: center;
    min-width: 250px;
  }

  .header .subtitle {
    grid-area: subtitle;
    font-size: 0.9em;
  }

  .header .mode {
    grid-area: mode;
    display: grid;
    justify-items: flex-end;
    justify-self: flex-end;
    align-items: center;
  }

  .header .github {
    grid-area: github;
    display: grid;
    justify-items: flex-end;
    justify-self: flex-end;
    align-items: center;
    margin-left: 1em;
  }

  .header .github .github-icon {
    width: 50px;
    height: 50px;
  }

  .hamburger-menu {
    grid-area: burger;
    display: none;
    align-self: center;
    justify-self: flex-end;
  }

  .hamburger-icon {
    display: grid;
    place-content: center;
    place-items: center;
    padding: 0.25em;
  }

  .hamburger-nav {
    height: 400px;
    overflow-y: scroll;
    background-color: var(--stsv-common__background-color);
  }

  .nav {
    grid-area: nav;
    overflow-y: scroll;
    background-color: var(--stsv-common__background-color);
    border-right: 1px solid var(--stsv-common__border-color);
    padding: 1em;
  }

  .content {
    grid-area: content;
    overflow-y: scroll;
    padding: 1em;
  }

  @media (max-width: 1000px) {
    .nav {
      display: none;
    }
    .hamburger-menu {
      display: block;
    }
  }

  @media (max-width: 600px) {
    .header {
      grid-template-columns: auto 1fr auto auto;
      grid-template-rows: auto auto auto;
      grid-template-areas: '. . mode github' 'burger title title title' '. subtitle subtitle subtitle';
    }
  }
</style>
