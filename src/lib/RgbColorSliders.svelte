<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';
  import { round } from 'lodash-es';

  // ----- Props ----- //
  export let red: number = 0;
  export let green: number = 0;
  export let blue: number = 0;
  export let alpha: number = 1;

  export let colorful = false;

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

<div class="sterling-rgb-color-sliders">
  <div class="slider red-slider">
    <Slider {colorful} min={0} max={255} precision={0} bind:value={red} />
  </div>
  <Input {colorful} bind:value={redText} on:change={(e) => onRedInputChange(e)} />
  <div class="slider green-slider">
    <Slider {colorful} min={0} max={255} precision={0} bind:value={green} />
  </div>
  <Input {colorful} bind:value={greenText} on:change={(e) => onGreenInputChange(e)} />
  <div class="slider blue-slider">
    <Slider {colorful} min={0} max={255} precision={0} bind:value={blue} />
  </div>
  <Input {colorful} bind:value={blueText} on:change={(e) => onBlueInputChange(e)} />
  <div class="alpha" style={`--red:${red};--green:${green};--blue:${blue}`}>
    <div class="alpha-hatch" />
    <div class="alpha-gradient" />
    <div class="slider alpha-slider">
      <Slider {colorful} min={0} max={1} precision={2} bind:value={alpha} />
    </div>
  </div>
  <Input {colorful} bind:value={alphaText} on:change={(e) => onAlphaInputchange(e)} />
</div>

<style>
  .sterling-rgb-color-sliders {
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 4em;
    column-gap: 0.5em;
    row-gap: 0.25em;
  }

  .slider :global(.fill),
  .slider :global(.sterling-slider.colorful .fill) {
    background-color: transparent;
  }

  .slider :global(.track),
  .slider :global(.sterling-slider.colorful .track) {
    background-color: transparent;
    background-image: linear-gradient(to right, #ffffff, #ffffff 1px, #000000 1px, #000000);
    background-size: 2px 100%;
    opacity: 0.1;
  }

  .red-slider {
    background: linear-gradient(to right, black 0%, rgb(255, 0, 0) 100%);
  }

  .green-slider {
    background: linear-gradient(to right, black 0%, rgb(0, 255, 0) 100%);
  }

  .blue-slider {
    background: linear-gradient(to right, black 0%, rgb(0, 0, 255) 100%);
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
      rgba(var(--red), var(--green), var(--blue), 0) 0%,
      rgba(var(--red), var(--green), var(--blue), 100) 100%
    );
  }
</style>
