<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';
  import { round } from 'lodash-es';

  // ----- Props ----- //

  /** The hue value. */
  export let hue: number = 0;

  /** The saturation value. */
  export let saturation: number = 0;

  /** The lightness value. */
  export let lightness: number = 0;

  /** The alpha value. */
  export let alpha: number = 1;

  /** Additional class names to apply. */
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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={`sterling-hsl-color-sliders ${variant}`}
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
  {...$$restProps}
  style={`--hue:${hue};--saturation:${saturation}%;--lightness:${lightness}%`}
>
  <Slider min={0} max={360} precision={0} bind:value={hue} variant="hue" />
  <Input bind:value={hueText} variant="hue" on:change={(e) => onHueInputChange(e)} />
  <Slider min={0} max={100} precision={0} bind:value={saturation} variant="saturation" />
  <Input
    bind:value={saturationText}
    variant="saturation"
    on:change={(e) => onSaturationInputChange(e)}
  />
  <Slider min={0} max={100} precision={0} bind:value={lightness} variant="lightness" />
  <Input
    bind:value={lightnessText}
    variant="lightness"
    on:change={(e) => onLightnessInputChange(e)}
  />
  <div class="alpha-hatch" />
  <div class="alpha-gradient" />
  <Slider min={0} max={1} precision={2} step={0.01} bind:value={alpha} variant="alpha" />
  <Input bind:value={alphaText} variant="alpha" on:change={(e) => onAlphaInputchange(e)} />
</div>
