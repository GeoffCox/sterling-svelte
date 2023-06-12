<script lang="ts">
  import { round } from 'lodash-es';
  import { tick } from 'svelte';
  import tinyColor from 'tinycolor2';

  import type { ColorFormat } from './ColorPicker.types';

  import Checkbox from '$lib/Checkbox.svelte';
  import Dropdown from '$lib/Dropdown.svelte';
  import Input from '$lib/Input.svelte';
  import Tab from '$lib/Tab.svelte';
  import TabList from '$lib/TabList.svelte';
  import RgbColorSliders from '$lib/RgbColorSliders.svelte';
  import HslColorSliders from '$lib/HslColorSliders.svelte';
  import {
    getColorFormat,
    parseColor,
    toHexString,
    toHsl,
    toHslString,
    toRgb,
    toRgbString,
    type HslColor,
    type RgbColor,
    getLeastChangedHsl
  } from './colorSpace';

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

  let alpha: number = 100;

  // ----- State ----- //

  let updating = false;

  let hslWholeNumbers = false;

  $: {
    precision = hslWholeNumbers ? 0 : 3;
  }

  // ----- Update HSL, RGB, Text ----- //

  const updateFromRgb = async () => {
    if (!updating && (colorFormat === 'hex' || colorFormat === 'rgb')) {
      updating = true;

      const hsl = toHsl({ red, green, blue, alpha }, precision);
      hue = hsl.hue;
      saturation = hsl.saturation;
      lightness = hsl.lightness;

      switch (colorFormat) {
        case 'rgb':
          colorText = toRgbString({ red, green, blue, alpha });
          break;
        case 'hex':
          colorText = toHexString({ red, green, blue, alpha });
          break;
      }

      await tick();
      updating = false;
    }
  };

  const updateFromHsl = async () => {
    if (!updating && colorFormat === 'hsl') {
      updating = true;

      hue = round(hue, precision);
      saturation = round(saturation, precision);
      lightness = round(lightness, precision);

      const rgb = toRgb({ hue, saturation, lightness, alpha });
      red = rgb.red;
      green = rgb.green;
      blue = rgb.blue;

      colorText = toHslString({ hue, saturation, lightness, alpha });

      await tick();

      updating = false;
    }
  };

  const updateColorsFromText = async () => {
    const parsed = parseColor(colorText, precision);

    if (parsed && !updating) {
      updating = true;
      const { color, format } = parsed;

      console.log('parsed', format, color);
      colorFormat = format;
      switch (parsed.format) {
        case 'hsl':
          const hsl = color as HslColor;

          const newHsl = getLeastChangedHsl(
            {
              hue,
              saturation,
              lightness,
              alpha
            },
            hsl
          );

          console.log('least changed', hsl, newHsl);

          hue = newHsl.hue;
          saturation = newHsl.saturation;
          lightness = newHsl.lightness;
          alpha = newHsl.alpha ?? 100;
          break;
        case 'rgb':
        case 'hex':
          const rgb = color as RgbColor;
          red = rgb.red;
          green = rgb.green;
          blue = rgb.blue;
          alpha = rgb.alpha ?? 100;
          break;
      }

      await tick();
      updating = false;
    }
  };

  $: colorText, updateColorsFromText();

  $: colorFormat, precision, hue, saturation, lightness, alpha, updateFromHsl();

  $: colorFormat, red, green, blue, alpha, updateFromRgb();

  // ----- Event handlers ----- //

  const onInputBlur = async () => {
    // const color = tinyColor(colorText);
    // if (color.isValid()) {
    //   const newColorText = getHslString();
    //   if (newColorText !== colorText) {
    //     console.log('onInputBlur', colorText, newColorText);
    //     updating = true;
    //     colorText = newColorText;
    //     await tick();
    //     updating = false;
    //   }
    // }
  };

  const onInputClick = (event: MouseEvent) => {
    event.stopPropagation();
    return false;
  };
</script>

<div class="sterling-color-picker">
  <Dropdown>
    <div class="value" slot="value">
      <div class="color-box" style="background-color: {colorText}" />
      <div class="color-text">
        <Input
          bind:value={colorText}
          composed
          on:blur={onInputBlur}
          on:click={onInputClick}
          spellcheck="false"
        />
      </div>
    </div>
    <div class="popup">
      <div class="tabs">
        <TabList bind:selectedValue={colorFormat}>
          <Tab value="hsl">hsl</Tab>
          <Tab value="hex">hex</Tab>
          <Tab value="rgb">rgb</Tab>
        </TabList>
      </div>
      <div class="sliders">
        {#if colorFormat === 'rgb' || colorFormat === 'hex'}
          <RgbColorSliders
            bind:red
            bind:green
            bind:blue
            bind:alpha
            hexFormat={colorFormat === 'hex'}
          />
        {/if}
        {#if colorFormat === 'hsl'}
          <HslColorSliders bind:hue bind:saturation bind:lightness bind:alpha {precision} />
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
    justify-items: stretch;
    grid-template-columns: auto 1fr;
    padding-left: 0.5em;
  }

  .color-box {
    width: 1em;
    height: 1em;
    border: 1px dashed var(--stsv-common__border-color);
  }

  .color-text {
    display: grid;
    place-content: stretch;
    place-items: stretch;
    width: fit-content;
  }

  .popup {
    width: fit-content;
    min-width: 500px;
    display: grid;
    align-items: center;
    padding: 0.25em;
  }

  .hsl-options {
    padding-top: 0.5em;
    display: flex;
    justify-content: flex-end;
  }
</style>
