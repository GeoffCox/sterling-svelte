<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';

  // ----- Props ----- //
  export let red: number = 0;
  export let green: number = 0;
  export let blue: number = 0;
  export let alpha: number = 255;
  export let variant: string = '';

  // ----- State ----- //
  let redText = red.toString(16).padStart(2, '0');
  let greenText = green.toString(16).padStart(2, '0');
  let blueText = blue.toString(16).padStart(2, '0');
  let alphaText = alpha.toString(16).padStart(2, '0');

  $: {
    redText = red.toString(16).padStart(2, '0');
  }

  $: {
    greenText = green.toString(16).padStart(2, '0');
  }

  $: {
    blueText = blue.toString(16).padStart(2, '0');
  }

  $: {
    alphaText = alpha.toString(16).padStart(2, '0');
  }

  // ----- Events ----- //

  const dispatcher = createEventDispatcher();

  const raiseChange = () => {
    dispatcher('change', { red, green, blue, alpha });
  };

  $: red, green, blue, alpha, raiseChange();

  // ----- Event Handlers ----- //

  const onRedInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    const text = inputChangeEvent?.currentTarget?.value;
    red = text ? Number.parseInt(text, 16) : red;
  };

  const onGreenInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    const text = inputChangeEvent?.currentTarget?.value;
    green = text ? Number.parseInt(text, 16) : green;
  };

  const onBlueInputChange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    const text = inputChangeEvent?.currentTarget?.value;
    blue = text ? Number.parseInt(text, 16) : blue;
  };

  const onAlphaInputchange = (event: Event) => {
    const inputChangeEvent = event as Event & {
      currentTarget: EventTarget & HTMLInputElement;
    };
    const text = inputChangeEvent?.currentTarget?.value;
    alpha = text ? Number.parseInt(text, 16) : alpha;
  };
</script>

<div class={`sterling-hex-color-sliders ${variant}`}>
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
      <Slider min={0} max={255} precision={0} bind:value={alpha} {variant} />
    </div>
  </div>
  <Input bind:value={alphaText} {variant} on:change={(e) => onAlphaInputchange(e)} />
</div>
