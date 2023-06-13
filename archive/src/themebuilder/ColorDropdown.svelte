<script lang="ts">
  import { round } from 'lodash-es';
  import { tick } from 'svelte';
  import tinyColor from 'tinycolor2';

  import type { ColorFormat } from './ColorEditor.types';

  import Checkbox from '$lib/Checkbox.svelte';
  import Dropdown from '$lib/Dropdown.svelte';
  import Input from '$lib/Input.svelte';
  import Tab from '$lib/Tab.svelte';
  import TabList from '$lib/TabList.svelte';
  import RgbColorSliders from '$lib/RgbColorSliders.svelte';
  import HslColorSliders from '$lib/HslColorSliders.svelte';

  // ----- Props ----- //

  export let colorText = '#00ffff';
  export let colorFormat: ColorFormat = 'hsl';

  /**
   * To round-trip convert between RGB and HSL, the minimum precision required is 3.
   * HSL values can have up to 19 decimal places when converted from RGB, but the
   * the colors cannot be distinguished between by the human eye.
   */
  export let precision: number = 3;

  // ----- State ----- //

  let hue: number = 0;
  let saturation: number = 0;
  let lightness: number = 0;

  let red: number = 0;
  let green: number = 0;
  let blue: number = 0;

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
      colorText = `hsl(${round(hue, precision)},${round(saturation, precision)}%,${round(
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
          colorText = `hsl(${round(hue, precision)},${round(saturation, precision)}%,${round(
            lightness,
            precision
          )}%)`;
        }
      }
      await tick();
      updating = false;
    }
  };

  const onInputClick = (event: MouseEvent) => {
    event.stopPropagation();
    return false;
  };

  // ----- Reactions ----- //

  $: colorText, updateColorsFromText();

  $: colorFormat, precision, hue, saturation, lightness, updateFromHsl();

  $: colorFormat, red, green, blue, updateFromRgb();
</script>

<div class="color-dropdown">
  <Dropdown>
    <div class="value" slot="value">
      <div class="color-box" style="background-color: {colorText}" />
      <Input bind:value={colorText} composed on:click={onInputClick} spellcheck="false" />
    </div>
    <div class="popup">
      <div class="tabs">
        <TabList bind:selectedValue={colorFormat}>
          <Tab value="hsl">hsl</Tab>
          <Tab value="hex">hex</Tab>
          <Tab value="rgb">rgb</Tab>
        </TabList>
      </div>
      <div class="editors">
        {#if colorFormat === 'rgb' || colorFormat === 'hex'}
          <RgbColorSliders bind:red bind:green bind:blue hexFormat={colorFormat === 'hex'} />
        {/if}
        {#if colorFormat === 'hsl'}
          <HslColorSliders bind:hue bind:saturation bind:lightness {precision} />
        {/if}
      </div>
      {#if colorFormat === 'hsl'}
        <div class="hsl-options">
          <Checkbox bind:checked={hslWholeNumbers}>Whole numbers</Checkbox>
        </div>
      {/if}
    </div>
  </Dropdown>
</div>

<style>
  .value {
    display: grid;
    align-items: center;
    grid-template-columns: auto auto;
    column-gap: 0.5em;
  }

  .color-box {
    margin: 0.5em;
    width: 1em;
    height: 1em;
    border: 1px dashed var(--stsv-common__border-color);
  }

  .popup {
    width: fit-content;
    min-width: 500px;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    align-items: center;
  }

  .hsl-options {
    padding-top: 0.5em;
    display: flex;
    justify-content: flex-end;
  }
</style>
