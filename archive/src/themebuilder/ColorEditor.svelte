<script lang="ts">
  import { round } from 'lodash-es';
  import { tick } from 'svelte';
  import tinyColor from 'tinycolor2';

  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Tab from '$lib/Tab.svelte';
  import TabList from '$lib/TabList.svelte';

  import CopyToClipboardIcon from './CopyToClipboardIcon.svelte';
  import type { ColorFormat } from './ColorEditor.types';
  import RgbColorEditor from './RgbColorEditor.svelte';
  import HslColorEditor from './HslColorEditor.svelte';

  // ----- Props ----- //

  export let colorFormat: ColorFormat = 'hsl';

  export let colorText: string = 'rgb(0,255,255)';

  export let hue: number = 0;
  export let saturation: number = 0;
  export let lightness: number = 0;

  export let red: number = 0;
  export let green: number = 0;
  export let blue: number = 0;

  /**
   * To round-trip convert between RGB and HSL, the minimum precision required is 3.
   * HSL values can have up to 19 decimal places when converted from RGB, but the
   * the colors cannot be distinguished between by the human eye.
   */
  export let precision: number = 3;

  // ----- State ----- //

  let updating = false;

  let hslWholeNumbers = false;

  $: {
    precision = hslWholeNumbers ? 0 : 3;
  }

  // ----- Update methods ----- //

  const updateFromRgb = async () => {
    if (!updating && (colorFormat === 'hex' || colorFormat === 'rgb')) {
      updating = true;
      const color = tinyColor({ r: red, g: green, b: blue });

      const hsl = color.toHsl();
      hue = hsl.h;
      saturation = hsl.s * 100;
      lightness = hsl.l * 100;

      switch (colorFormat) {
        case 'rgb':
          colorText = color.toRgbString();
          break;
        case 'hex':
          colorText = color.toHexString();
          break;
      }

      await tick();
      updating = false;
    }
  };

  const updateFromHsl = async () => {
    if (!updating && colorFormat === 'hsl') {
      updating = true;

      const color = tinyColor({ h: hue, s: saturation / 100, l: lightness / 100 });

      const rgb = color.toRgb();
      red = rgb.r;
      green = rgb.g;
      blue = rgb.b;

      // build a custom string to provide decimal precision
      colorText = `hsl(${round(hue, precision)}, ${round(saturation, precision)}%, ${round(
        lightness,
        precision
      )}%)`;

      await tick();
      updating = false;
    }
  };

  const updateColorsFromText = async () => {
    if (!updating) {
      updating = true;

      const color = tinyColor(colorText);

      if (color.isValid()) {
        const format = color.getFormat();
        switch (format) {
          case 'hsl':
            colorFormat = 'hsl';
            break;
          case 'rgb':
            colorFormat = 'rgb';
            break;
          case 'hex':
            colorFormat = 'hex';
            break;
          default:
        }

        const hsl = color.toHsl();
        hue = hsl.h;
        saturation = hsl?.s * 100;
        lightness = hsl?.l * 100;

        const rgb = color.toRgb();
        red = rgb.r;
        green = rgb.g;
        blue = rgb.b;

        // update colorText with the right HSL precision
        if (format === 'hsl') {
          colorText = `hsl(${round(hue, precision)}, ${round(saturation, precision)}%, ${round(
            lightness,
            precision
          )}%)`;
        }
      }
      await tick();
      updating = false;
    }
  };

  // ----- Reactions ----- //

  $: colorText, updateColorsFromText();

  $: colorFormat, precision, hue, saturation, lightness, updateFromHsl();

  $: colorFormat, red, green, blue, updateFromRgb();
</script>

<div class="color-editor">
  <div class="color-block" style={`background-color: rgb(${red}, ${green}, ${blue})`} />
  <div class="input-area">
    <Input bind:value={colorText} />
    <Button on:click={() => navigator.clipboard.writeText(colorText)}
      ><CopyToClipboardIcon /></Button
    >
  </div>
  <div class="tabs">
    <TabList bind:selectedValue={colorFormat}>
      <Tab value="hsl">hsl</Tab>
      <Tab value="hex">hex</Tab>
      <Tab value="rgb">rgb</Tab>
    </TabList>
  </div>
  <div class="editors">
    {#if colorFormat === 'rgb' || colorFormat === 'hex'}
      <RgbColorEditor bind:red bind:green bind:blue hexFormat={colorFormat === 'hex'} />
    {/if}
    {#if colorFormat === 'hsl'}
      <HslColorEditor bind:hue bind:saturation bind:lightness {precision} />
    {/if}
  </div>
  {#if colorFormat === 'hsl'}
    <div class="hsl-options">
      <Checkbox bind:checked={hslWholeNumbers}>Whole numbers</Checkbox>
    </div>
  {/if}
</div>

<style>
  .color-editor {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-template-rows: auto auto auto;
    align-items: center;
    column-gap: 0.5em;
  }

  .color-block {
    width: 2em;
    height: 2em;
    border: 1px dashed var(--stsv-common__border-color);
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
    justify-self: flex-end;
  }

  .input-area {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;
    column-gap: 0.5em;
  }

  .tabs {
    grid-row: 2 / span 1;
    grid-column: 1 / span 2;
  }

  .editors {
    grid-row: 3 / span 1;
    grid-column: 1 / span 2;
  }

  .hsl-options {
    padding-top: 0.5em;
    grid-row: 3 / span 1;
    grid-column: 3 / span 1;
    display: flex;
    justify-content: flex-end;
  }
</style>
