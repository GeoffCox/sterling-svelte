<script lang="ts">
  import { round } from 'lodash-es';
  import { createEventDispatcher, tick } from 'svelte';
  import tinycolor from 'tinycolor2';

  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';

  // ----- Hue range ----- //

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

  // ----- Props ----- //

  export let hue: number = 180;
  export let saturation: number = 100;
  export let lightness: number = 50;

  /**
   * To round-trip convert between RGB and HSL, the minimum precision required is 3.
   * HSL values can have up to 19 decimal places when converted from RGB, but the
   * the colors cannot be distinguished between by the human eye.
   */
  export let precision: number = 3;

  // ----- State ----- //

  let updating = false;

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
      hue = Math.max(0, Math.min(360, newValue));
    }
  };

  const onSaturationInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    let text = inputChangeEvent?.currentTarget?.value?.replace(/%/g, '');

    let newValue = text ? Number.parseFloat(text) : saturation;

    if (newValue && newValue !== Number.NaN) {
      saturation = Math.max(0, Math.min(100, newValue));
    }
  };

  const onLightnessInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    let text = inputChangeEvent?.currentTarget?.value?.replace(/%/g, '');

    let newValue = text ? Number.parseFloat(text) : lightness;

    if (newValue && newValue !== Number.NaN) {
      lightness = Math.max(0, Math.min(100, newValue));
    }
  };
</script>

<div class="hsl-color-editor">
  <div class="hue" style={`background: linear-gradient(to right,${hueStops});`}>
    <Slider min={0} max={360} {precision} bind:value={hue} />
  </div>
  <Input value={`${round(hue, precision)}`} on:change={(e) => onHueInputChange(e)} />
  <div class="saturation" style={`--hue:${hue};`}>
    <Slider min={0} max={100} {precision} bind:value={saturation} />
  </div>
  <Input value={`${round(saturation, precision)}`} on:change={(e) => onSaturationInputChange(e)} />
  <div class="lightness" style={`--hue:${hue};--saturation:${saturation}%;`}>
    <Slider min={0} max={100} {precision} bind:value={lightness} />
  </div>
  <Input value={`${round(lightness, precision)}`} on:change={(e) => onLightnessInputChange(e)} />
</div>

<style>
  .hsl-color-editor {
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
    background-image: linear-gradient(to right, #ffffff, #ffffff 1px, #000000 1px, #000000);
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
</style>
