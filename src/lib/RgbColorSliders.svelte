<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';
  import { round } from 'lodash-es';

  // ----- Props ----- //

  /** The red value. */
  export let red: number = 0;

  /** The green value. */
  export let green: number = 0;

  /** The blue value. */
  export let blue: number = 0;

  /** The alpha value. */
  export let alpha: number = 1;

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- State ----- //
  let redText = red.toString();
  let greenText = green.toString();
  let blueText = blue.toString();
  let alphaText = alpha.toString();

  $: {
    redText = red.toString();
  }

  $: {
    greenText = green.toString();
  }

  $: {
    blueText = blue.toString();
  }

  $: {
    alphaText = alpha.toString();
  }

  // ----- Events ----- //

  const dispatcher = createEventDispatcher();

  const raiseChange = () => {
    dispatcher('change', { red, green, blue, alpha });
  };

  $: red, green, blue, alpha, raiseChange();

  // ----- Event Handlers ----- //

  const parseRgbValue = (text?: string, defaultValue: number = 0) => {
    if (!text) {
      return defaultValue;
    }

    const newValue = text ? Number.parseFloat(text) : defaultValue;

    if (newValue && newValue !== Number.NaN) {
      return Math.round(Math.max(0, Math.min(255, newValue)));
    }

    return defaultValue;
  };

  const onRedInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };

    red = parseRgbValue(inputChangeEvent?.currentTarget?.value, red);
  };

  const onGreenInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };

    green = parseRgbValue(inputChangeEvent?.currentTarget?.value, green);
  };

  const onBlueInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };

    blue = parseRgbValue(inputChangeEvent?.currentTarget?.value, blue);
  };

  const onAlphaInputchange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };

    const text = inputChangeEvent?.currentTarget?.value;
    const newValue = text ? Number.parseFloat(text) : alpha;

    if (newValue && newValue !== Number.NaN) {
      alpha = round(Math.max(0, Math.min(1, newValue)), 2);
    }
  };
</script>

<div class={`sterling-rgb-color-sliders ${variant}`}>
  <div class="slider red-slider">
    <Slider min={0} max={255} precision={0} bind:value={red} {variant} />
  </div>
  <Input bind:value={redText} {variant} on:change={(e) => onRedInputChange(e)} />
  <div class="slider green-slider">
    <Slider min={0} max={255} precision={0} bind:value={green} {variant} />
  </div>
  <Input bind:value={greenText} {variant} on:change={(e) => onGreenInputChange(e)} />
  <div class="slider blue-slider">
    <Slider min={0} max={255} precision={0} bind:value={blue} {variant} />
  </div>
  <Input bind:value={blueText} {variant} on:change={(e) => onBlueInputChange(e)} />
  <div class="alpha" style={`--red:${red};--green:${green};--blue:${blue}`}>
    <div class="alpha-hatch" />
    <div class="alpha-gradient" />
    <div class="slider alpha-slider">
      <Slider min={0} max={1} precision={2} bind:value={alpha} {variant} />
    </div>
  </div>
  <Input bind:value={alphaText} {variant} on:change={(e) => onAlphaInputchange(e)} />
</div>
