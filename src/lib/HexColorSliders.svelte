<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';

  // ----- Props ----- //

  /** The red value. */
  export let red: number = 0;

  /** The green value. */
  export let green: number = 0;

  /** The blue value. */
  export let blue: number = 0;

  /** The alpha value. */
  export let alpha: number = 255;

  /** Additional class names to apply. */
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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={`sterling-hex-color-sliders ${variant}`}
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
  style={`--red:${red};--green:${green};--blue:${blue}`}
>
  <Slider min={0} max={255} precision={0} bind:value={red} variant="red" />
  <Input bind:value={redText} variant="red" on:change={(e) => onRedInputChange(e)} />
  <Slider min={0} max={255} precision={0} bind:value={green} variant="green" />
  <Input bind:value={greenText} variant="green" on:change={(e) => onGreenInputChange(e)} />
  <Slider min={0} max={255} precision={0} bind:value={blue} variant="blue" />
  <Input bind:value={blueText} variant="blue" on:change={(e) => onBlueInputChange(e)} />
  <div class="alpha-hatch" />
  <div class="alpha-gradient" />
  <Slider min={0} max={255} precision={0} bind:value={alpha} variant="alpha" />
  <Input bind:value={alphaText} variant="alpha" on:change={(e) => onAlphaInputchange(e)} />
</div>
