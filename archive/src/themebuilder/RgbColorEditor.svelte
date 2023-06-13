<script lang="ts">
  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';
  import Switch from '$lib/Switch.svelte';
  import { createEventDispatcher } from 'svelte';
  import tinycolor from 'tinycolor2';

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

  export let red: number = 0;
  export let green: number = 0;
  export let blue: number = 0;

  export let hexFormat = false;

  const dispatcher = createEventDispatcher();

  const raiseChange = () => {
    dispatcher('change', { red, green, blue });
  };

  $: red, green, blue, hexFormat, raiseChange();

  $: redText = hexFormat ? red.toString(16).padStart(2, '0') : red.toString();
  $: greenText = hexFormat ? green.toString(16).padStart(2, '0') : green.toString();
  $: blueText = hexFormat ? blue.toString(16).padStart(2, '0') : blue.toString();

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
</script>

<div class="hsl-color-editor">
  <div class="red-slider" style={`background: linear-gradient(to right,${redStops});`}>
    <Slider min={0} max={255} precision={0} bind:value={red} />
  </div>
  <Input value={`${redText}`} on:change={(e) => onRedInputChange(e)} />
  <div class="green-slider" style={`background: linear-gradient(to right,${greenStops});`}>
    <Slider min={0} max={255} precision={0} bind:value={green} />
  </div>
  <Input value={`${greenText}`} on:change={(e) => onGreenInputChange(e)} />
  <div class="blue-slider" style={`background: linear-gradient(to right,${blueStops});`}>
    <Slider min={0} max={255} precision={0} bind:value={blue} />
  </div>
  <Input value={`${blueText}`} on:change={(e) => onBlueInputChange(e)} />
</div>

<style>
  .hsl-color-editor {
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 4em;
    column-gap: 0.5em;
    row-gap: 0.25em;
  }

  .hsl-color-editor :global(.fill) {
    background-color: transparent;
  }
  .hsl-color-editor :global(.track) {
    background-color: transparent;
    opacity: 0.1;
    background-image: linear-gradient(to right, #ffffff, #ffffff 1px, #000000 1px, #000000);
    background-size: 2px 100%;
  }
</style>
