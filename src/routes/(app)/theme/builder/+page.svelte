<script lang="ts">
  import { applyTheme, lightTheme, darkTheme } from '$lib';
  import Button from '$lib/Button.svelte';
  import Tab from '$lib/Tab.svelte';
  import TabList from '$lib/TabList.svelte';
  import Gallery from '../../_shared/gallery/Gallery.svelte';
  import ThemeEditView from './ThemeEditView.svelte';
  import ResetThemeDialog from './ResetThemeDialog.svelte';
  import ThemeCodeView from './ThemeCodeView.svelte';

  let theme = Object.assign({}, lightTheme) as Record<string, string>;
  let selectedView = 'edit';

  let resetDialogOpen = false;
  let resetToTheme = 'light';

  const onResetTheme = () => {
    resetDialogOpen = true;
  };

  const onResetDialogClose = (event: CustomEvent<{ returnValue: string }>) => {
    switch (event.detail.returnValue) {
      case 'light':
        theme = Object.assign({}, lightTheme) as Record<string, string>;
        break;
      case 'dark':
        theme = Object.assign({}, darkTheme) as Record<string, string>;
        break;
    }
  };
</script>

<div class="theme-builder">
  <div class="header">
    <div class="title">Theme Builder</div>
    <div class="actions">
      <Button on:click={onResetTheme}>Reset</Button>
    </div>
    <div class="tabs">
      <TabList bind:selectedValue={selectedView}>
        <Tab value="edit">Edit</Tab>
        <Tab value="preview">Preview</Tab>
        <Tab value="code">Code</Tab>
      </TabList>
    </div>
  </div>
  {#if selectedView === 'edit'}
    <ThemeEditView {theme} />
  {:else if selectedView == 'preview'}
    <div use:applyTheme={{ theme }}>
      <Gallery />
    </div>
  {:else if selectedView == 'code'}
    <ThemeCodeView {theme} />
  {/if}
  <ResetThemeDialog bind:open={resetDialogOpen} bind:resetToTheme on:close={onResetDialogClose} />
</div>

<style>
  .header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 'title .' 'tabs actions';
    justify-items: stretch;
    align-items: center;
  }

  .title {
    grid-area: title;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .actions {
    grid-area: actions;
    display: flex;
    justify-content: flex-end;
  }

  .tabs {
    grid-area: tabs;
    width: fit-content;
  }
</style>
