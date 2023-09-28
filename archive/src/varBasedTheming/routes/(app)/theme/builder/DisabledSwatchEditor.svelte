<script lang="ts">
  import { onMount } from 'svelte';

  import ColorPicker from '$lib/ColorPicker.svelte';
  import Input from '$lib/Input.svelte';
  import SvelteIcon from '../../SvelteIcon.svelte';
  import Slider from '$lib/Slider.svelte';

  export let color1Name: string | undefined = undefined;
  export let color1Value: string | undefined = undefined;

  export let color2Name: string | undefined = undefined;
  export let color2Value: string | undefined = undefined;

  export let stripeAngle: string | undefined = undefined;
  export let stripeAngleValue: string | undefined = undefined;

  export let stripeWidth: string | undefined = undefined;
  export let stripeWidthValue: string | undefined = undefined;

  // if values are not set then use the name as a CSS variable value
  const getVarValue = (name: string | undefined) => {
    if (name) {
      if (name.startsWith('--')) {
        return `var(${name})`;
      }
      return `var(--${name})`;
    }

    return undefined;
  };

  color1Value = color1Value || getVarValue(color1Name);
  color2Value = color2Value || getVarValue(color2Name);
  stripeAngleValue = stripeAngleValue || getVarValue(stripeAngle);
  stripeWidthValue = stripeWidthValue || getVarValue(stripeWidth);

  // ----- State ----- //

  let mounted = false;
  let clientWidth: number;
  let clientHeight: number;
  let swatchRef: HTMLDivElement;
  let colorBlockRef: HTMLDivElement;
  let color1NameRef: HTMLDivElement;
  let color2NameRef: HTMLDivElement;
  let stripeAngleNameRef: HTMLDivElement;
  let stripeWidthNameRef: HTMLDivElement;

  let coordinates = {
    svg: { width: 0, height: 0 },
    colorsDot: { x: 0, y: 0 },
    colorsLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    colorsEdgeLine: { x1: 0, y1: 0, x2: 0, y2: 0 }
  };

  // isPropSet avoids repeatedly comparing against undefined
  const isPropSet = {
    color1: color1Name !== undefined,
    color2: color2Name !== undefined,
    stripeAngle: stripeAngle !== undefined,
    stripeWidth: stripeWidth !== undefined,
    colors: false
  };

  isPropSet.colors = isPropSet.color1 || isPropSet.color2;

  const edgeLineNudge = 6;

  const updateCoordinates = () => {
    if (swatchRef) {
      const swatchRect = swatchRef.getBoundingClientRect();
      const colorBlockRect = colorBlockRef.getBoundingClientRect();

      const newCoordinates = coordinates;
      newCoordinates.svg = {
        width: swatchRect.width,
        height: swatchRect.height
      };

      let firstColorNameRef: HTMLDivElement | undefined = undefined;
      let lastColorNameRef: HTMLDivElement | undefined = undefined;

      firstColorNameRef =
        color1NameRef || color2NameRef || stripeAngleNameRef || stripeWidthNameRef;
      lastColorNameRef = stripeWidthNameRef || stripeAngleNameRef || color2NameRef || color1NameRef;

      if (firstColorNameRef && lastColorNameRef) {
        const textRect1 = firstColorNameRef.getBoundingClientRect();
        const textRect2 = lastColorNameRef.getBoundingClientRect();
        newCoordinates.colorsDot = {
          x: colorBlockRect.left - swatchRect.left - 8 + colorBlockRect.width,
          y: colorBlockRect.top - swatchRect.top + colorBlockRect.height / 2
        };
        newCoordinates.colorsLine = {
          x1: newCoordinates.colorsDot.x,
          y1: newCoordinates.colorsDot.y,
          x2: textRect1.left - swatchRect.left - edgeLineNudge,
          y2: textRect1.top - swatchRect.top + (textRect2.bottom - textRect1.top) / 2
        };
        newCoordinates.colorsEdgeLine = {
          x1: textRect1.left - swatchRect.left - edgeLineNudge,
          y1: textRect1.top - swatchRect.top + 1,
          x2: textRect2.left - swatchRect.left - edgeLineNudge,
          y2: textRect2.bottom - swatchRect.top - 1
        };
      }

      coordinates = { ...newCoordinates };
    }
  };

  $: clientWidth, clientHeight, updateCoordinates();

  // ----- Event Handlers -----//

  onMount(() => {
    updateCoordinates();
    mounted = true;
  });

  // ----- CSS vars ----- //

  let style = '';
  const updateStyle = () => {
    const cssVars: string[] = [];

    isPropSet.color1 && cssVars.push(`--swatch__color1: ${color1Value};`);
    isPropSet.color2 && cssVars.push(`--swatch__color2: ${color2Value};`);
    isPropSet.stripeAngle && cssVars.push(`--swatch__stripe-angle: ${stripeAngleValue};`);
    isPropSet.stripeWidth && cssVars.push(`--swatch__stripe-width: ${stripeWidthValue};`);

    style = cssVars.join('');
  };

  $: color1Value, color2Value, stripeAngleValue, stripeWidthValue, updateStyle();
</script>

<div bind:this={swatchRef} bind:clientWidth bind:clientHeight class="swatch" {style}>
  <div class="color-area">
    <div class="color-background" />
    <div bind:this={colorBlockRef} class="color-block"><SvelteIcon /></div>
    <div class="disabled-block" />
  </div>
  <div class="color-vars">
    {#if isPropSet.color1}
      <div bind:this={color1NameRef} class="color1-name">
        {color1Name}
      </div>
      <ColorPicker bind:colorText={color1Value} />
    {/if}
    {#if isPropSet.color2}
      <div bind:this={color2NameRef} class="color2-name">
        {color2Name}
      </div>
      <ColorPicker bind:colorText={color2Value} />
    {/if}
    {#if isPropSet.stripeAngle}
      <div bind:this={stripeAngleNameRef} class="stripe-angle-name">
        {stripeAngle}
      </div>
      <Input bind:value={stripeAngleValue} />
    {/if}
    {#if isPropSet.stripeWidth}
      <div bind:this={stripeWidthNameRef} class="stripe-width-name">
        {stripeWidth}
      </div>
      <Input bind:value={stripeWidthValue} />
    {/if}
  </div>
  {#if mounted}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox={`0 0 ${coordinates.svg.width} ${coordinates.svg.height}`}
      xml:space="preserve"
      class="diagram"
    >
      {#if isPropSet.colors}
        <line
          class="line"
          x1={coordinates.colorsLine.x1}
          y1={coordinates.colorsLine.y1}
          x2={coordinates.colorsLine.x2}
          y2={coordinates.colorsLine.y2}
        />
        <circle class="dot" cx={coordinates.colorsDot.x} cy={coordinates.colorsDot.y} r="3" />
        <line
          class="line"
          stroke="red"
          x1={coordinates.colorsEdgeLine.x1}
          y1={coordinates.colorsEdgeLine.y1}
          x2={coordinates.colorsEdgeLine.x2}
          y2={coordinates.colorsEdgeLine.y2}
        />
      {/if}
    </svg>
  {/if}
</div>

<style>
  .swatch {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 90px auto;
    grid-template-rows: auto;
    place-items: stretch;
    place-content: stretch;
    position: relative;
    column-gap: 2em;
    min-width: 450px;
  }

  .color-area {
    display: grid;
    grid-column: 1 /2;
    grid-row: 1/ 2;
    place-content: stretch;
    place-items: stretch;
    align-self: center;
  }

  .color-background {
    grid-row-start: 1;
    grid-column-start: 1;
    background-color: transparent;
    background-image: repeating-linear-gradient(
        45deg,
        var(--stsv-common__color) 25%,
        transparent 25%,
        transparent 75%,
        var(--stsv-common__color) 75%,
        var(--stsv-common__color)
      ),
      repeating-linear-gradient(
        45deg,
        var(--stsv-common__color) 25%,
        var(--stsv-common__background-color) 25%,
        var(--stsv-common__background-color) 75%,
        var(--stsv-common__color) 75%,
        var(--stsv-common__color)
      );
    background-position: 0 0, 4px 4px;
    background-size: 8px 8px;
    opacity: 0.2;
  }

  .color-block {
    align-items: center;
    background: white;
    background-color: var(--stsv-common__background-color);
    border-color: var(--stsv-common__border-color);
    border-radius: 0;
    border-style: solid;
    border-width: 2px;
    display: grid;
    grid-row-start: 1;
    grid-column-start: 1;
    height: 50px;
    justify-items: center;
    margin: 1em;
    place-self: center;
    width: 50px;
    z-index: 1;
  }

  .disabled-block {
    align-items: center;
    background: repeating-linear-gradient(
      var(--swatch__stripe-angle),
      var(--swatch__color1),
      var(--swatch__color1) var(--swatch__stripe-width),
      var(--swatch__color2) var(--swatch__stripe-width),
      var(--swatch__color2) calc(2 * var(--swatch__stripe-width))
    );
    display: grid;
    grid-row-start: 1;
    grid-column-start: 1;
    height: 50px;
    justify-items: center;
    margin: 1em;
    place-self: center;
    width: 50px;
    z-index: 1;
  }

  .color-vars {
    align-self: center;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto auto;
    grid-column: 2 /3;
    grid-row: 1/ 2;
    row-gap: 0.25em;
    column-gap: 1em;
    align-items: center;
  }

  .diagram {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }

  svg {
    pointer-events: none;
  }

  .line {
    stroke: var(--stsv-common__color);
    stroke-width: 1px;
  }

  .dot {
    fill: var(--stsv-common__color);
  }
</style>
