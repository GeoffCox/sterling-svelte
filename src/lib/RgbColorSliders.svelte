<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import tinycolor from 'tinycolor2';

  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';
  import { round } from 'lodash-es';

  // ----- Props ----- //
  export let red: number = 0;
  export let green: number = 0;
  export let blue: number = 0;
  export let alpha: number = 0;

  export let hexFormat = false;

  export let alphaPrecision: number | undefined = 1;

  // ----- Events ----- //

  const dispatcher = createEventDispatcher();

  const raiseChange = () => {
    dispatcher('change', { red, green, blue });
  };

  $: red, green, blue, raiseChange();

  $: redText = hexFormat ? red.toString(16).padStart(2, '0') : red.toString();
  $: greenText = hexFormat ? green.toString(16).padStart(2, '0') : green.toString();
  $: blueText = hexFormat ? blue.toString(16).padStart(2, '0') : blue.toString();

  // ----- Event Handlers ----- //

  const getRgbValue = (text: string, current: number) => {
    let newValue = current;
    if (text) {
      if (text.match(/^0x/i)) {
        newValue = Number(text);
      } else if (text.match(/^x/i)) {
        newValue = Number('0' + text);
      } else if (text.match(/[a-f]+/i)) {
        newValue = Number('0x' + text);
      } else {
        newValue = Number(text);
      }
    }

    if (newValue && newValue !== Number.NaN) {
      current = Math.max(0, Math.min(255, newValue));
    }

    return current;
  };

  const onRedInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    red = getRgbValue(inputChangeEvent?.currentTarget?.value, red);
  };

  const onGreenInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    green = getRgbValue(inputChangeEvent?.currentTarget?.value, green);
  };

  const onBlueInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    blue = getRgbValue(inputChangeEvent?.currentTarget?.value, blue);
  };

  const onAlphaInputchange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    let text = inputChangeEvent?.currentTarget?.value?.replace(/%/g, '');

    let newValue = text ? Number.parseFloat(text) : alpha;

    if (newValue && newValue !== Number.NaN) {
      alpha = round(Math.max(0, Math.min(100, newValue)), alphaPrecision);
    }
  };

  // ----- Constants for gradient slider backgrounds ----- //

  const redOffsets = [
    { r: 0, offset: 0 },
    { r: 255, offset: 100 }
  ];

  const redStops = redOffsets
    .map((c) => `${tinycolor({ r: c.r, b: 0, g: 0 }).toRgbString()} ${c.offset}%`)
    .join(', ');

  const greenOffsets = [
    { g: 0, offset: 0 },
    { g: 255, offset: 100 }
  ];

  const greenStops = greenOffsets
    .map((c) => `${tinycolor({ r: 0, b: 0, g: c.g }).toRgbString()} ${c.offset}%`)
    .join(', ');

  const blueOffsets = [
    { b: 0, offset: 0 },
    { b: 255, offset: 100 }
  ];

  const blueStops = blueOffsets
    .map((c) => `${tinycolor({ r: 0, b: c.b, g: 0 }).toRgbString()} ${c.offset}%`)
    .join(', ');
</script>

<div class="sterling-rgb-color-sliders">
  <div class="slider red-slider" style={`background: linear-gradient(to right,${redStops});`}>
    <Slider min={0} max={255} precision={0} bind:value={red} />
  </div>
  <Input value={`${redText}`} on:change={(e) => onRedInputChange(e)} />
  <div class="slider green-slider" style={`background: linear-gradient(to right,${greenStops});`}>
    <Slider min={0} max={255} precision={0} bind:value={green} />
  </div>
  <Input value={`${greenText}`} on:change={(e) => onGreenInputChange(e)} />
  <div class="slider blue-slider" style={`background: linear-gradient(to right,${blueStops});`}>
    <Slider min={0} max={255} precision={0} bind:value={blue} />
  </div>
  <Input value={`${blueText}`} on:change={(e) => onBlueInputChange(e)} />
  <div class="alpha" style={`--red:${red};--green:${green};--blue:${blue}`}>
    <div class="alpha-hatch" />
    <div class="alpha-gradient" />
    <div class="slider alpha-slider">
      <Slider min={0} max={100} precision={alphaPrecision} bind:value={alpha} />
    </div>
  </div>
  <Input value={`${round(alpha, alphaPrecision)}`} on:change={(e) => onAlphaInputchange(e)} />
</div>

<style>
  .sterling-rgb-color-sliders {
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 4em;
    column-gap: 0.5em;
    row-gap: 0.25em;
  }

  .slider :global(.fill) {
    background-color: transparent;
  }

  .slider :global(.track) {
    background-color: transparent;
    background-image: linear-gradient(to right, #ffffff, #ffffff 1px, #000000 1px, #000000);
    background-size: 2px 100%;
    opacity: 0.1;
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
    opacity: 1;
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
