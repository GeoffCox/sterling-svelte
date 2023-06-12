<script lang="ts">
  import { round } from 'lodash-es';
  import { createEventDispatcher } from 'svelte';
  import tinycolor from 'tinycolor2';

  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';

  // ----- Props ----- //

  export let hue: number = 180;
  export let saturation: number = 100;
  export let lightness: number = 50;
  export let alpha: number = 100;

  /**
   * To round-trip convert between RGB and HSL, the minimum precision required is 3.
   * HSL values can have up to 19 decimal places when converted from RGB, but the
   * the colors cannot be distinguished between by the human eye.
   */
  export let precision: number = 3;

  export let alphaPrecision: number | undefined = 0;

  // ----- State ----- //
  let hueText = hue.toString();
  let saturationText = saturation.toString();
  let lightnessText = lightness.toString();
  let alphaText = alpha.toString();

  $: {
    hueText = hue.toString();
  }

  $: {
    saturationText = saturation.toString();
  }

  $: {
    lightnessText = lightness.toString();
  }

  $: {
    alphaText = alpha.toString();
  }

  // ----- Events ----- //

  const dispatcher = createEventDispatcher();

  const raiseChange = (hue: number, saturation: number, lightness: number) => {
    dispatcher('change', { hue, saturation, lightness });
  };

  $: raiseChange(hue, saturation, lightness);

  // ----- Event Handlers ----- //

  const onHueInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    let text = inputChangeEvent?.currentTarget?.value;

    let newValue = text ? Number.parseFloat(text) : hue;

    if (newValue && newValue !== Number.NaN) {
      hue = round(Math.max(0, Math.min(360, newValue)), precision);
      hueText = hue.toString();
    }
  };

  const onSaturationInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    let text = inputChangeEvent?.currentTarget?.value?.replace(/%/g, '');

    let newValue = text ? Number.parseFloat(text) : saturation;

    if (newValue && newValue !== Number.NaN) {
      saturation = round(Math.max(0, Math.min(100, newValue)), precision);
      saturationText = saturation.toString();
    }
  };

  const onLightnessInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    let text = inputChangeEvent?.currentTarget?.value?.replace(/%/g, '');

    let newValue = text ? Number.parseFloat(text) : lightness;

    if (newValue && newValue !== Number.NaN) {
      lightness = round(Math.max(0, Math.min(100, newValue)), precision);
      lightnessText = lightness.toString();
    }
  };

  const onAlphaInputchange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    let text = inputChangeEvent?.currentTarget?.value?.replace(/%/g, '');

    let newValue = text ? Number.parseFloat(text) : alpha;

    if (newValue && newValue !== Number.NaN) {
      alpha = round(Math.max(0, Math.min(100, newValue)), alphaPrecision);
      alphaText = alpha.toString();
    }
  };

  // ----- Constants for gradient slider backgrounds ----- //

  const hues = [
    { hue: 0, offset: 0 },
    { hue: 60, offset: 17 },
    { hue: 120, offset: 33 },
    { hue: 180, offset: 50 },
    { hue: 240, offset: 67 },
    { hue: 300, offset: 83 },
    { hue: 0, offset: 100 }
  ];

  const hueStops = hues
    .map((h) => `${tinycolor({ h: h.hue, s: 1, l: 0.5 }).toHslString()} ${h.offset}%`)
    .join(', ');
</script>

<div class="sterling-hsl-color-sliders">
  <div class="hue" style={`background: linear-gradient(to right,${hueStops});`}>
    <Slider min={0} max={360} {precision} bind:value={hue} />
  </div>
  <Input bind:value={hueText} on:change={(e) => onHueInputChange(e)} />
  <div class="saturation" style={`--hue:${hue};`}>
    <Slider min={0} max={100} {precision} bind:value={saturation} />
  </div>
  <Input bind:value={saturationText} on:change={(e) => onSaturationInputChange(e)} />
  <div class="lightness" style={`--hue:${hue};--saturation:${saturation}%;`}>
    <Slider min={0} max={100} {precision} bind:value={lightness} />
  </div>
  <Input bind:value={lightnessText} on:change={(e) => onLightnessInputChange(e)} />
  <div class="alpha" style={`--hue:${hue};--saturation:${saturation}%;--lightness:${lightness}%`}>
    <div class="alpha-hatch" />
    <div class="alpha-gradient" />
    <div class="alpha-slider">
      <Slider min={0} max={100} precision={alphaPrecision} bind:value={alpha} />
    </div>
  </div>
  <Input value={`${round(alpha, alphaPrecision)}`} on:change={(e) => onAlphaInputchange(e)} />
</div>

<style>
  .sterling-hsl-color-sliders {
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 5em;
    column-gap: 0.5em;
    row-gap: 0.25em;
  }

  .hue :global(.fill) {
    background-color: transparent;
  }
  .hue :global(.track) {
    background-color: transparent;
    opacity: 0.1;
    background-image: linear-gradient(to right, #7f3a3a, #ffffff 1px, #000000 1px, #000000);
    background-size: 2px 100%;
  }

  .saturation {
    background: linear-gradient(
      to right,
      hsl(var(--hue), 0%, 50%) 0%,
      hsl(var(--hue), 100%, 50%) 100%
    );
  }

  .saturation :global(.fill) {
    background-color: transparent;
  }
  .saturation :global(.track) {
    background-color: transparent;
    opacity: 0.1;
    background-image: linear-gradient(to right, #ffffff, #ffffff 1px, #000000 1px, #000000);
    background-size: 2px 100%;
  }

  .lightness {
    background: linear-gradient(
      to right,
      hsl(var(--hue), var(--saturation), 0%) 0%,
      hsl(var(--hue), var(--saturation), 50%) 50%,
      hsl(var(--hue), var(--saturation), 100%) 100%
    );
  }

  .lightness :global(.fill) {
    background-color: transparent;
  }
  .lightness :global(.track) {
    background-color: transparent;
    opacity: 0.1;
    background-image: linear-gradient(to right, #ffffff, #ffffff 1px, #000000 1px, #000000);
    background-size: 2px 100%;
  }

  .alpha {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    place-content: stretch;
    place-items: stretch;
  }

  .alpha-gradient,
  .alpha-hatch,
  .alpha-slider {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
  }

  .alpha-hatch {
    background-color: #eee;
    opacity: 0.1;
    background-image: repeating-linear-gradient(
        45deg,
        #444 25%,
        transparent 25%,
        transparent 75%,
        #444 75%,
        #444
      ),
      repeating-linear-gradient(45deg, #444 25%, #eee 25%, #eee 75%, #444 75%, #444),
      repeating-linear-gradient(-45deg, #444 25%, transparent 25%, transparent 75%, #444 75%, #444),
      repeating-linear-gradient(-45deg, #444 25%, #eee 25%, #eee 75%, #444 75%, #444);
    background-position: 0 0, 4px 4px;
    background-size: 8px 8px;
  }

  .alpha-gradient {
    background: linear-gradient(
      to right,
      hsla(var(--hue), var(--saturation), var(--lightness), 0) 0%,
      hsla(var(--hue), var(--saturation), var(--lightness), 1) 100%
    );
  }

  .alpha :global(.fill) {
    background-color: transparent;
  }
  .alpha :global(.track) {
    background-color: transparent;
    background-image: linear-gradient(to right, #ffffff, #ffffff 1px, #000000 1px, #000000);
    background-size: 2px 100%;
    opacity: 0.1;
  }
</style>
