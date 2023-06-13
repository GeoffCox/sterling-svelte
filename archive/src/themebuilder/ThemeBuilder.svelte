<script lang="ts">
  import { List, lightTheme } from '$lib';
  import ListItem from '$lib/ListItem.svelte';
  import { parseBem } from '../../parseBem';
  import ColorEditor from './ColorEditor.svelte';
  import RadiusEditor from './RadiusEditor.svelte';
  import WidthEditor from './WidthEditor.svelte';

  const theme = Object.assign({}, lightTheme);

  const themeVars = Object.keys(theme);

  let previousSelectedThemeVar = '';
  let selectedThemeVar = '';
  let colorText = '#00ffff';
  let width = 10;

  $: {
    if (previousSelectedThemeVar !== selectedThemeVar) {
      colorText = theme[selectedThemeVar] as string;
      previousSelectedThemeVar = selectedThemeVar;
    } else {
      theme[selectedThemeVar] = colorText;
    }
  }

  const getThemeVarType = (varName: string) => {
    const bem = parseBem(varName);
    if (bem.element.includes('color')) {
      return 'color';
    }
    if (bem.element.includes('width')) {
      return 'width';
    }
    if (bem.element.includes('offset')) {
      return 'offset';
    }
    if (bem.element.includes('radius')) {
      return 'radius';
    }

    return 'unknown';
  };

  $: themeVarType = getThemeVarType(selectedThemeVar);
</script>

<div class="builder">
  <div class="var-picker">
    <List bind:selectedValue={selectedThemeVar}>
      {#each themeVars as themeVar}
        <ListItem value={themeVar}>{themeVar}</ListItem>
      {/each}
    </List>
  </div>
  <div class="edit">
    <div>{selectedThemeVar}</div>
    {#if themeVarType === 'color'}
      <ColorEditor bind:colorText />
    {:else if themeVarType === 'width'}
      <WidthEditor />
    {:else if themeVarType === 'offset'}
      <WidthEditor />
    {:else if themeVarType === 'radius'}
      <RadiusEditor />
    {/if}
  </div>
</div>

<style>
  .builder {
    width: 100%;
    display: grid;
    grid-template-columns: 450px 1fr;
    align-items: flex-start;
    column-gap: 1em;
  }
  .var-picker {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1em;
    height: 200px;
  }
</style>
