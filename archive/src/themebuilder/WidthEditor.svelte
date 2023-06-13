<script lang="ts">
  import Button from '$lib/Button.svelte';
  import Input from '$lib/Input.svelte';
  import { onMount } from 'svelte';

  import { round } from 'lodash-es';

  // ----- Constants ----- //

  const pxValues = [1, 2, 4, 8, 12, 16];
  const emValues = [0.0625, 0.125, 0.25, 0.5, 0.75, 1];
  const ptValues = [1.333, 2.667, 5.333, 10.667, 16, 21.333];

  // ----- Props ----- //
  export let width: string = '1em';
  export let unit: string = 'em';
  export let value: number = 1;

  // ----- State ----- //
  let emSizeInPx: number = 16;

  // ----- Helpers ----- //

  // a width is a number followed by a unit
  // the unit can be any characters a-z, characters A-Z, or %
  // there can be white space between the number and the unit
  // The number portion may be a float adn have a decimal point
  // the CSS unit may be missing in which case it is assumed to be px
  const parseWidth = (width: string) => {
    const match = width.match(/(\d+(\.\d+)?)\s*([a-zA-Z%]*)/);
    if (match) {
      return {
        value: parseFloat(match[1]),
        unit: match[3] || 'px'
      };
    }
    return null;
  };

  $: {
    const parsedWidth = parseWidth(width);
    if (parsedWidth) {
      value = parsedWidth.value;
      unit = parsedWidth.unit;
    }
  }

  const setValue = (newValue: number) => () => {
    value = newValue;
    width = `${value}${unit}`;
  };

  const setUnit = (newUnit: string) => () => {
    switch (unit) {
      case 'em':
        switch (newUnit) {
          case 'px':
            value = value * emSizeInPx;
            break;
          case 'pt':
            value = round((value * emSizeInPx * 96) / 72, 3);
            break;
        }
        break;
      case 'px':
        switch (newUnit) {
          case 'em':
            value = value / emSizeInPx;
            break;
          case 'pt':
            //96px = 72pt
            value = round((value * 96) / 72, 3);
            break;
        }
        break;
      case 'pt':
        switch (newUnit) {
          case 'px':
            //96px = 72pt
            value = round((value * 72) / 96, 3);
            break;
          case 'em':
            value = round(((value / emSizeInPx) * 72) / 96, 3);
            break;
        }
    }

    unit = newUnit;
    width = `${value}${unit}`;
  };

  onMount(() => {
    if (window && document) {
      const emFontSize = window.getComputedStyle(document.body).getPropertyValue('font-size');
      const parsedEmFontSize = parseWidth(emFontSize);
      if (parsedEmFontSize && parsedEmFontSize.unit === 'px') {
        emSizeInPx = parsedEmFontSize.value;
      }
    }
  });
</script>

<div class="width-editor" style={`--current-width: ${width}`}>
  <div class="width-input">
    <Input bind:value={width} />
  </div>
  <div class="units">
    <Button on:click={setUnit('em')}>em</Button>
    <Button on:click={setUnit('px')}>px</Button>
    <Button on:click={setUnit('pt')}>pt</Button>
  </div>
  <div class="sizes">
    {#if unit === 'px'}
      {#each pxValues as pxValue}
        <Button on:click={setValue(pxValue)}>{pxValue}px</Button>
      {/each}
    {:else if unit === 'em'}
      {#each emValues as emValue}
        <Button on:click={setValue(emValue)}>{emValue}em</Button>
      {/each}
    {:else if unit === 'pt'}
      {#each ptValues as ptValue}
        <Button on:click={setValue(ptValue)}>{ptValue}pt</Button>
      {/each}
    {/if}
  </div>
  <div class="preview" />
</div>

<style>
  .width-editor {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    align-items: center;
    justify-content: flex-start;
    column-gap: 0.5em;
    row-gap: 0.5em;
  }

  .width-input {
    display: grid;
    justify-items: stretch;
  }

  .units {
    font-size: 0.8em;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    column-gap: 0.125em;
  }

  .sizes {
    font-size: 0.8em;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    column-gap: 0.125em;
    grid-row-start: 2;
    grid-column: 1 / span 3;
  }

  .preview {
    grid-row: 3 / span 1;
    grid-column: 1 / span 3;
    justify-self: stretch;
    align-self: flex-start;
    background-color: var(--stsv-common__border-color);
    height: var(--current-width);
  }
</style>
