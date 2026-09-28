<svelte:options runes={true} />

<script lang="ts">
  import { navigating } from '$app/stores';
  import Dropdown from '$lib/Dropdown.svelte';
  import Link from '$lib/Link.svelte';
  import '@fontsource/atkinson-hyperlegible';
  import '@fontsource/source-code-pro';
  import '@geoffcox/sterling-svelte-themes/sterling.css';
  //import '../../../../sterling-svelte-themes/css/sterling.css';
  import ColorSchemeSlider from './_shared/ColorSchemeSlider.svelte';
  import GitHubIcon from './_shared/icons/GitHubIcon.svelte';
  import HamburgerIcon from './_shared/icons/HamburgerIcon.svelte';
  import Nav from './_shared/Nav.svelte';

  let { children } = $props();

  let hamburgerOpen = $state(false);

  $effect(() => {
    if ($navigating !== null) {
      hamburgerOpen = false;
    }
  });
</script>

<div class="root">
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
          <ColorSchemeSlider cookieName="sterling-docs-color-scheme" />
        </div>
        <div class="github">
          <Link href="http://github.com/GeoffCox/sterling-svelte" class="ghost">
            <div class="github-icon"><GitHubIcon /></div>
          </Link>
        </div>
        <div class="hamburger-menu">
          <Dropdown bind:open={hamburgerOpen} class="composed">
            {#snippet icon()}
              <div class="hamburger-icon">
                <HamburgerIcon />
              </div>
            {/snippet}
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
        {@render children()}
      </div>
    </div>
  </div>
</div>

<style>
  /* ----- Global ----- */

  :global(:root) {
    color: var(--stsv-common__color);
    background-color: var(--stsv-common__background-color);
  }

  :global(html) {
    padding: 0;
    margin: 0;
  }

  :global(body) {
    font-family: 'Atkinson Hyperlegible', sans-serif;
    /* font-family: 'Open Sans', sans-serif;  */
    margin: 0;
    padding: 0;
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
    margin-block-start: 0em;
    margin-block-end: 1em;
    line-height: 1.6em;
  }

  :global(code) {
    font-family: 'Source Code Pro', monospace;
    color: var(--stsv-common__color);
    background-color: var(--stsv-common__background-color--secondary);
  }

  :global(pre) {
    font-family: 'Source Code Pro', monospace;
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
    place-items: stretch;
    place-content: stretch;
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

  @media (max-width: 800px) {
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
