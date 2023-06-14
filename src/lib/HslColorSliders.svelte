<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';
  import { round } from 'lodash-es';

  // ----- Props ----- //

  export let hue: number = 180;
  export let saturation: number = 100;
  export let lightness: number = 50;
  export let alpha: number = 1;

  export let colorful = false;

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

    const text = inputChangeEvent?.currentTarget?.value;
    const newValue = text ? Number.parseFloat(text) : hue;

    if (newValue && newValue !== Number.NaN) {
      hue = Math.round(Math.max(0, Math.min(360, newValue)));
      hueText = hue.toString();
    }
  };

  const onSaturationInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };

    const text = inputChangeEvent?.currentTarget?.value?.replace(/%/g, '');
    const newValue = text ? Number.parseFloat(text) : saturation;

    if (newValue && newValue !== Number.NaN) {
      saturation = Math.round(Math.max(0, Math.min(100, newValue)));
      saturationText = saturation.toString();
    }
  };

  const onLightnessInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };

    const text = inputChangeEvent?.currentTarget?.value?.replace(/%/g, '');
    const newValue = text ? Number.parseFloat(text) : lightness;

    if (newValue && newValue !== Number.NaN) {
      lightness = Math.round(Math.max(0, Math.min(100, newValue)));
      lightnessText = lightness.toString();
    }
  };

  const onAlphaInputchange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };

    const text = inputChangeEvent?.currentTarget?.value;
    const newValue = text ? Number.parseFloat(text) : alpha;

    if (newValue && newValue !== Number.NaN) {
      alpha = round(Math.max(0, Math.min(1, newValue)), 2);
      alphaText = alpha.toString();
    }
  };
</script>

<div class="sterling-hsl-color-sliders">
  <div class="slider hue">
    <Slider min={0} max={360} precision={0} bind:value={hue} {colorful} />
  </div>
  <Input bind:value={hueText} {colorful} on:change={(e) => onHueInputChange(e)} />
  <div class="slider saturation" style={`--hue:${hue};`}>
    <Slider min={0} max={100} precision={0} bind:value={saturation} {colorful} />
  </div>
  <Input bind:value={saturationText} {colorful} on:change={(e) => onSaturationInputChange(e)} />
  <div class="slider lightness" style={`--hue:${hue};--saturation:${saturation}%;`}>
    <Slider min={0} max={100} precision={0} bind:value={lightness} {colorful} />
  </div>
  <Input bind:value={lightnessText} {colorful} on:change={(e) => onLightnessInputChange(e)} />
  <div
    class="slider alpha"
    style={`--hue:${hue};--saturation:${saturation}%;--lightness:${lightness}%`}
  >
    <div class="alpha-hatch" />
    <div class="alpha-gradient" />
    <div class="alpha-slider">
      <Slider min={0} max={1} precision={2} step={0.01} bind:value={alpha} {colorful} />
    </div>
  </div>
  <Input bind:value={alphaText} {colorful} on:change={(e) => onAlphaInputchange(e)} />
</div>

<style>
  .sterling-hsl-color-sliders {
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 5em;
    column-gap: 0.5em;
    row-gap: 0.25em;
  }

  .hue {
    background: linear-gradient(
      to right,
      hsl(0, 100%, 50%) 0%,
      hsl(60, 100%, 50%) 17%,
      hsl(120, 100%, 50%) 33%,
      hsl(180, 100%, 50%) 50%,
      hsl(240, 100%, 50%) 67%,
      hsl(300, 100%, 50%) 83%,
      hsl(0, 100%, 50%) 100%
    );
  }

  .slider :global(.fill),
  .slider :global(.sterling-slider.colorful .fill) {
    background-color: transparent;
  }
  .slider :global(.track),
  .slider :global(.sterling-slider.colorful .track) {
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

  .lightness {
    background: linear-gradient(
      to right,
      hsl(var(--hue), var(--saturation), 0%) 0%,
      hsl(var(--hue), var(--saturation), 50%) 50%,
      hsl(var(--hue), var(--saturation), 100%) 100%
    );
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
</style>
