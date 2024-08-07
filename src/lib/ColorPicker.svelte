<script lang="ts">
  import { tick } from 'svelte';
  import { TinyColor } from '@ctrl/tinycolor';

  import type { ColorFormat } from './ColorPicker.types';

  import Dropdown from './Dropdown.svelte';
  import Input from './Input.svelte';
  import Tab from './Tab.svelte';
  import TabList from './TabList.svelte';
  import RgbColorSliders from './RgbColorSliders.svelte';
  import HslColorSliders from './HslColorSliders.svelte';
  import HexColorSliders from './HexColorSliders.svelte';
  import { round } from 'lodash-es';
  import { trapKeyboardFocus } from './actions/trapKeyboardFocus';

  // ----- Constants ----- //

  const defaultColorText = '#000000';

  // ----- Props ----- //

  /** The color value in HEX, RGB, or HSL format */
  export let colorText: string = defaultColorText;

  /** The current color format */
  export let colorFormat: ColorFormat = 'hex';

  /** When true, the picker is disabled. */
  export let disabled: boolean = false;

  /** When true, the dropdown is open. */
  export let open: boolean = false;

  /** Additional class names to apply. */
  export let variant: string = '';

  /** Additional class names to apply to the value input. */
  export let valueVariant: string = '';

  /** Additional class names to apply to sliders. */
  export let sliderVariant: string = '';

  // ----- State ----- //

  let hue: number = 0;
  let saturation: number = 0;
  let lightness: number = 0;

  let red: number = 0;
  let green: number = 0;
  let blue: number = 0;

  let alpha: number = 1;
  let hexAlpha: number = 255;

  let updating = false;

  let tabListRef: TabList;
  let tabsRef: HTMLDivElement;

  // ----- Update HSL, RGB, Text ----- //

  const updateFromRgb = async () => {
    // tinycolor requires window
    if (globalThis.window) {
      if (!updating && (colorFormat === 'hex' || colorFormat === 'rgb')) {
        updating = true;

        const newAlpha = colorFormat === 'hex' ? hexAlpha / 255 : alpha;

        const color = new TinyColor({ r: red, g: green, b: blue, a: newAlpha });

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
    }
  };

  const updateFromHsl = async () => {
    // tinycolor requires window
    if (globalThis.window) {
      if (!updating && colorFormat === 'hsl') {
        updating = true;

        const color = new TinyColor({ h: hue, s: saturation / 100, l: lightness / 100, a: alpha });

        const rgb = color.toRgb();
        red = rgb.r;
        green = rgb.g;
        blue = rgb.b;

        colorText = color.toHslString();

        hexAlpha = Math.round(alpha * 255);

        await tick();

        updating = false;
      }
    }
  };

  const updateColorsFromText = async () => {
    // tinycolor requires window
    if (globalThis.window) {
      const color = new TinyColor(colorText);

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
    }
  };

  $: {
    globalThis.window;
    colorText;
    updateColorsFromText();
  }

  $: {
    globalThis.window;
    colorFormat;
    hue;
    saturation;
    lightness;
    alpha;
    updateFromHsl();
  }

  $: {
    globalThis.window;
    colorFormat;
    red;
    green;
    blue;
    alpha;
    hexAlpha;
    updateFromRgb();
  }

  // ----- Event handlers ----- //

  const onInputBlur = async () => {
    if (globalThis.window) {
      if (!updating) {
        if (colorText.trim().length === 0) {
          colorText = defaultColorText;
          return;
        }

        const color = new TinyColor(colorText);
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
    }
  };

  const onInputClick = (event: MouseEvent) => {
    event.stopPropagation();
    return false;
  };

  const onInputKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Tab':
        if (open) {
          setTimeout(() => {
            tabListRef?.focus();
          }, 0);
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
        break;
      case 'Escape':
        if (open) {
          open = false;
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
        break;
    }
    // prevent typing from bubbling to the dropdown
    event.stopImmediatePropagation();
  };

  // -----Initialization ----- //
  updateColorsFromText();
</script>

<div class={`sterling-color-picker ${variant}`}>
  <Dropdown
    {disabled}
    bind:open
    on:blur
    on:click
    on:copy
    on:cut
    on:dblclick
    on:dragend
    on:dragenter
    on:dragleave
    on:dragover
    on:dragstart
    on:drop
    on:focus
    on:focusin
    on:focusout
    on:keydown
    on:keypress
    on:keyup
    on:mousedown
    on:mouseenter
    on:mouseleave
    on:mousemove
    on:mouseover
    on:mouseout
    on:mouseup
    on:wheel
    on:paste
    {variant}
    {...$$restProps}
  >
    <div class="value" slot="value">
      <div class="color-box" style="background-color: {colorText}" />
      <Input
        bind:value={colorText}
        {disabled}
        on:blur={onInputBlur}
        on:click={onInputClick}
        on:keydown={onInputKeydown}
        spellcheck="false"
        variant={`composed ${valueVariant}`}
      />
    </div>
    <div class="sterling-color-picker-popup" use:trapKeyboardFocus>
      <div class="tabs" bind:this={tabsRef}>
        <TabList bind:this={tabListRef} bind:selectedValue={colorFormat}>
          <Tab value="hex">hex</Tab>
          <Tab value="rgb">rgb</Tab>
          <Tab value="hsl">hsl</Tab>
        </TabList>
      </div>
      <div class="sliders">
        {#if colorFormat === 'rgb'}
          <RgbColorSliders bind:red bind:green bind:blue bind:alpha variant={sliderVariant} />
        {:else if colorFormat === 'hex'}
          <HexColorSliders
            bind:red
            bind:green
            bind:blue
            bind:alpha={hexAlpha}
            variant={sliderVariant}
          />
        {:else if colorFormat === 'hsl'}
          <HslColorSliders
            bind:hue
            bind:saturation
            bind:lightness
            bind:alpha
            variant={sliderVariant}
          />
        {/if}
      </div>
    </div>
  </Dropdown>
</div>
