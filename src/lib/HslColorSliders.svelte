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
  export let variant: string = '';

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

<div class={`sterling-hsl-color-sliders ${variant}`}>
  <div class="slider hue">
    <Slider min={0} max={360} precision={0} bind:value={hue} {variant} />
  </div>
  <Input bind:value={hueText} {variant} on:change={(e) => onHueInputChange(e)} />
  <div class="slider saturation" style={`--hue:${hue};`}>
    <Slider min={0} max={100} precision={0} bind:value={saturation} {variant} />
  </div>
  <Input bind:value={saturationText} {variant} on:change={(e) => onSaturationInputChange(e)} />
  <div class="slider lightness" style={`--hue:${hue};--saturation:${saturation}%;`}>
    <Slider min={0} max={100} precision={0} bind:value={lightness} {variant} />
  </div>
  <Input bind:value={lightnessText} {variant} on:change={(e) => onLightnessInputChange(e)} />
  <div
    class="slider alpha"
    style={`--hue:${hue};--saturation:${saturation}%;--lightness:${lightness}%`}
  >
    <div class="alpha-hatch" />
    <div class="alpha-gradient" />
    <div class="alpha-slider">
      <Slider min={0} max={1} precision={2} step={0.01} bind:value={alpha} {variant} />
    </div>
  </div>
  <Input bind:value={alphaText} {variant} on:change={(e) => onAlphaInputchange(e)} />
</div>
