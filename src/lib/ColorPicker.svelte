<script lang="ts">
  import { tick } from 'svelte';
  import tinycolor from '@ctrl/tinycolor';

  import type { ColorFormat } from './ColorPicker.types';

  import Dropdown from './Dropdown.svelte';
  import Input from './Input.svelte';
  import Tab from './Tab.svelte';
  import TabList from './TabList.svelte';
  import RgbColorSliders from './RgbColorSliders.svelte';
  import HslColorSliders from './HslColorSliders.svelte';
  import HexColorSliders from './HexColorSliders.svelte';
  import { round } from 'lodash-es';

  // ----- Props ----- //

  export let colorText = '#00ffff';
  export let colorFormat: ColorFormat = 'hsl';

  // ----- State ----- //

  let hue: number = 0;
  let saturation: number = 0;
  let lightness: number = 0;

  let red: number = 0;
  let green: number = 0;
  let blue: number = 0;

  let alpha: number = 1;
  let hexAlpha: number = 255;

  let open = false;
  let updating = false;

  let tabListRef: TabList;
  let tabsRef: HTMLDivElement;

  // ----- Update HSL, RGB, Text ----- //

  const updateFromRgb = async () => {
    if (!updating && (colorFormat === 'hex' || colorFormat === 'rgb')) {
      updating = true;

      const newAlpha = colorFormat === 'hex' ? hexAlpha / 255 : alpha;

      const color = tinycolor({ r: red, g: green, b: blue, a: newAlpha });

      const hsl = color.toHsl();
      hue = Math.round(hsl.h);
      saturation = Math.round(hsl.s * 100);
      lightness = Math.round(hsl.l * 100);

      switch (colorFormat) {
        case 'rgb':
          colorText = color.toRgbString();
          hexAlpha = Math.round(alpha * 255);
          break;
        case 'hex':
          colorText = alpha === 100 ? color.toHexString() : color.toHex8String();
          alpha = round(hexAlpha / 255, 2);
          break;
      }

      await tick();
      updating = false;
    }
  };

  const updateFromHsl = async () => {
    if (!updating && colorFormat === 'hsl') {
      updating = true;

      const color = tinycolor({ h: hue, s: saturation / 100, l: lightness / 100, a: alpha });

      const rgb = color.toRgb();
      red = rgb.r;
      green = rgb.g;
      blue = rgb.b;

      colorText = color.toHslString();

      hexAlpha = Math.round(alpha * 255);

      await tick();

      updating = false;
    }
  };

  const updateColorsFromText = async () => {
    const color = tinycolor(colorText);

    if (color.isValid) {
      if (!updating) {
        updating = true;

        switch (color.format) {
          case 'hsl':
            colorFormat = 'hsl';
            break;
          case 'rgb':
            colorFormat = 'rgb';
            break;
          case 'hex':
          case 'hex4':
          case 'hex8':
            colorFormat = 'hex';
            break;
          default:
            break;
        }

        const hsl = color.toHsl();
        hue = Math.round(hsl.h);
        saturation = Math.round(hsl.s * 100);
        lightness = Math.round(hsl.l * 100);

        const rgb = color.toRgb();
        red = rgb.r;
        green = rgb.g;
        blue = rgb.b;

        if (rgb.a) {
          alpha = hsl.a;
          hexAlpha = Math.round(alpha * 255);
        }

        await tick();
        updating = false;
      }
    }
  };

  $: colorText, updateColorsFromText();

  $: colorFormat, hue, saturation, lightness, alpha, updateFromHsl();

  $: colorFormat, red, green, blue, alpha, hexAlpha, updateFromRgb();

  // ----- Event handlers ----- //

  const onInputBlur = async () => {
    if (!updating) {
      const color = tinycolor(colorText);
      if (color.isValid) {
        updating = true;
        switch (colorFormat) {
          case 'hsl':
            colorText = color.toHslString();
            break;
          case 'rgb':
            colorText = color.toRgbString();
            break;
          case 'hex':
            colorText = alpha === 1 ? color.toHexString() : color.toHex8String();
            break;
          default:
            break;
        }
        await tick();
        updating = false;
      }
    }
  };

  const onInputClick = (event: MouseEvent) => {
    event.stopPropagation();
    return false;
  };

  const onInputKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Tab' && open) {
      setTimeout(() => {
        tabListRef?.focus();
        console.log('tab');
      }, 0);
      event.preventDefault();
    }
  };

  // -----Initialization ----- //
  updateColorsFromText();
</script>

<div class="sterling-color-picker">
  <Dropdown bind:open>
    <div class="value" slot="value">
      <div class="color-box" style="background-color: {colorText}" />
      <div class="color-text">
        <Input
          bind:value={colorText}
          composed
          on:blur={onInputBlur}
          on:click={onInputClick}
          on:keydown={onInputKeydown}
          spellcheck="false"
        />
      </div>
    </div>
    <div class="popup">
      <div class="tabs" bind:this={tabsRef}>
        <TabList bind:this={tabListRef} bind:selectedValue={colorFormat}>
          <Tab value="hsl">hsl</Tab>
          <Tab value="hex">hex</Tab>
          <Tab value="rgb">rgb</Tab>
        </TabList>
      </div>
      <div class="sliders">
        {#if colorFormat === 'rgb'}
          <RgbColorSliders bind:red bind:green bind:blue bind:alpha />
        {:else if colorFormat === 'hex'}
          <HexColorSliders bind:red bind:green bind:blue bind:alpha={hexAlpha} />
        {:else if colorFormat === 'hsl'}
          <HslColorSliders bind:hue bind:saturation bind:lightness bind:alpha />
        {/if}
      </div>
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
</style>
