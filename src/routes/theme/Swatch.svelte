<script lang="ts">
  import { onMount } from 'svelte';

  export let backgroundColor: string | undefined = undefined;
  export let borderColor: string | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let borderStyle: string | undefined = undefined;
  export let borderWidth: string | undefined = undefined;
  export let color: string | undefined = undefined;
  export let outlineColor: string | undefined = undefined;
  export let outlineOffset: string | undefined = undefined;
  export let outlineStyle: string | undefined = undefined;
  export let outlineWidth: string | undefined = undefined;

  // isPropSet avoids repeatedly comparing against undefined
  const isPropSet = {
    backgroundColor: backgroundColor !== undefined,
    borderColor: borderColor !== undefined,
    borderRadius: borderRadius !== undefined,
    borderStyle: borderStyle !== undefined,
    borderWidth: borderWidth !== undefined,
    borders: false,
    color: color !== undefined,
    outlineColor: outlineColor !== undefined,
    outlineOffset: outlineOffset !== undefined,
    outlineStyle: outlineStyle !== undefined,
    outlineWidth: outlineWidth !== undefined,
    outlines: false
  };

  isPropSet.borders =
    isPropSet.borderColor ||
    isPropSet.borderRadius ||
    isPropSet.borderStyle ||
    isPropSet.borderWidth;

  isPropSet.outlines =
    isPropSet.outlineColor ||
    isPropSet.outlineOffset ||
    isPropSet.outlineStyle ||
    isPropSet.outlineWidth;

  // ----- State ----- //

  let mounted = false;
  let clientWidth: number;
  let clientHeight: number;
  let swatchRef: HTMLDivElement;
  let backgroundColorTextRef: HTMLDivElement;
  let bordersTextRef: HTMLDivElement;
  let colorTextRef: HTMLDivElement;
  let outlinesTextRef: HTMLDivElement;
  let colorBlockRef: HTMLDivElement;

  let coordinates = {
    svg: { width: 0, height: 0 },
    backgroundDot: { x: 0, y: 0 },
    backgroundLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    borderDot: { x: 0, y: 0 },
    borderLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    colorDot: { x: 0, y: 0 },
    colorLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    outlinesDot: { x: 0, y: 0 },
    outlinesLine: { x1: 0, y1: 0, x2: 0, y2: 0 }
  };

  const updateCoordinates = () => {
    if (swatchRef) {
      const newCoordinates = coordinates;

      const swatchRect = swatchRef.getBoundingClientRect();
      const colorBlockRect = colorBlockRef.getBoundingClientRect();

      newCoordinates.svg = {
        width: swatchRect.width,
        height: swatchRect.height
      };

      if (backgroundColorTextRef) {
        const textRect = backgroundColorTextRef.getBoundingClientRect();
        newCoordinates.backgroundDot = {
          x: colorBlockRect.left - swatchRect.left + (colorBlockRect.width * 3) / 4,
          y: colorBlockRect.top - swatchRect.top + colorBlockRect.height / 5
        };
        newCoordinates.backgroundLine = {
          x1: newCoordinates.backgroundDot.x,
          y1: newCoordinates.backgroundDot.y,
          x2: textRect.left - swatchRect.left,
          y2: textRect.top - swatchRect.top + textRect.height / 2
        };
      }

      if (bordersTextRef) {
        const textRect = bordersTextRef.getBoundingClientRect();
        newCoordinates.borderDot = {
          x: colorBlockRect.left - swatchRect.left + colorBlockRect.width,
          y: colorBlockRect.top - swatchRect.top + colorBlockRect.height / 2
        };
        newCoordinates.borderLine = {
          x1: newCoordinates.borderDot.x,
          y1: newCoordinates.borderDot.y,
          x2: textRect.left - swatchRect.left,
          y2: textRect.top - swatchRect.top + textRect.height / 2
        };
      }

      if (colorTextRef) {
        const textRect = colorTextRef.getBoundingClientRect();
        newCoordinates.colorDot = {
          x: colorBlockRect.left - swatchRect.left + colorBlockRect.width / 2,
          y: colorBlockRect.top - swatchRect.top + colorBlockRect.height / 2 + 10
        };
        newCoordinates.colorLine = {
          x1: newCoordinates.colorDot.x,
          y1: newCoordinates.colorDot.y,
          x2: textRect.left - swatchRect.left,
          y2: textRect.top - swatchRect.top + textRect.height / 2
        };
      }

      if (outlinesTextRef) {
        const textRect = outlinesTextRef.getBoundingClientRect();
        newCoordinates.outlinesDot = {
          x: colorBlockRect.left - swatchRect.left + colorBlockRect.width + 3,
          y: colorBlockRect.top - swatchRect.top + colorBlockRect.height + 3
        };
        newCoordinates.outlinesLine = {
          x1: newCoordinates.outlinesDot.x,
          y1: newCoordinates.outlinesDot.y,
          x2: textRect.left - swatchRect.left,
          y2: textRect.top - swatchRect.top + textRect.height / 2
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

  const getCssValue = (value: string) => {
    if (value.startsWith('--')) {
      return `var(${value})`;
    }
    return value;
  };

  const cssVars: string[] = [];

  isPropSet.backgroundColor &&
    cssVars.push(`--swatch__background-color: ${getCssValue(backgroundColor!)};`);
  isPropSet.borderColor && cssVars.push(`--swatch__border-color: ${getCssValue(borderColor!)};`);
  isPropSet.borderRadius && cssVars.push(`--swatch__border-radius: ${getCssValue(borderRadius!)};`);
  isPropSet.borderStyle && cssVars.push(`--swatch__border-style: ${getCssValue(borderStyle!)};`);
  isPropSet.borderStyle && cssVars.push(`--swatch__border-width: ${getCssValue(borderWidth!)};`);
  isPropSet.color && cssVars.push(`--swatch__color: ${getCssValue(color!)};`);
  isPropSet.outlineColor && cssVars.push(`--swatch__outline-color: ${getCssValue(outlineColor!)};`);
  isPropSet.outlineOffset &&
    cssVars.push(`--swatch__outline-offset: ${getCssValue(outlineOffset!)};`);
  isPropSet.outlineStyle && cssVars.push(`--swatch__outline-style: ${getCssValue(outlineStyle!)};`);
  isPropSet.outlineWidth && cssVars.push(`--swatch__outline-width: ${getCssValue(outlineWidth!)};`);

  $: style = cssVars.join('');
</script>

<div bind:this={swatchRef} bind:clientWidth bind:clientHeight class="swatch" {style}>
  <div class="color-area">
    <div class="color-background" />
    <div bind:this={colorBlockRef} class="color-block"><span>T</span></div>
  </div>
  <div class="color-vars">
    {#if isPropSet.backgroundColor}
      <div bind:this={backgroundColorTextRef}>{backgroundColor}</div>
    {/if}
    {#if isPropSet.borders}
      <div bind:this={bordersTextRef}>
        {#if isPropSet.borderColor}
          <div>{borderColor}</div>
        {/if}
        {#if isPropSet.borderRadius}
          <div>{borderRadius}</div>
        {/if}
        {#if isPropSet.borderStyle}
          <div>{borderStyle}</div>
        {/if}
        {#if isPropSet.borderWidth}
          <div>{borderWidth}</div>
        {/if}
      </div>
    {/if}
    {#if isPropSet.color}
      <div bind:this={colorTextRef}>{color}</div>
    {/if}
    {#if isPropSet.outlines}
      <div bind:this={outlinesTextRef}>
        <div>{outlineColor}</div>
        <div>{outlineOffset}</div>
        <div>{outlineStyle}</div>
        <div>{outlineWidth}</div>
      </div>
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
      {#if isPropSet.backgroundColor}
        <line
          class="line"
          x1={coordinates.backgroundLine.x1}
          y1={coordinates.backgroundLine.y1}
          x2={coordinates.backgroundLine.x2}
          y2={coordinates.backgroundLine.y2}
        />
        <circle
          class="dot"
          cx={coordinates.backgroundDot.x}
          cy={coordinates.backgroundDot.y}
          r="3"
        />
      {/if}
      {#if isPropSet.borders}
        <line
          class="line"
          x1={coordinates.borderLine.x1}
          y1={coordinates.borderLine.y1}
          x2={coordinates.borderLine.x2}
          y2={coordinates.borderLine.y2}
        />
        <circle
          class="dot border-dot"
          cx={coordinates.borderDot.x}
          cy={coordinates.borderDot.y}
          r="3"
        />
      {/if}
      {#if isPropSet.color}
        <line
          class="line"
          x1={coordinates.colorLine.x1}
          y1={coordinates.colorLine.y1}
          x2={coordinates.colorLine.x2}
          y2={coordinates.colorLine.y2}
        />
        <circle class="dot" cx={coordinates.colorDot.x} cy={coordinates.colorDot.y} r="3" />
      {/if}
      {#if isPropSet.outlines}
        <line
          class="line"
          x1={coordinates.outlinesLine.x1}
          y1={coordinates.outlinesLine.y1}
          x2={coordinates.outlinesLine.x2}
          y2={coordinates.outlinesLine.y2}
        />
        <circle class="dot" cx={coordinates.outlinesDot.x} cy={coordinates.outlinesDot.y} r="3" />
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
    column-gap: 1em;
    min-width: 450px;
  }

  .color-area {
    display: grid;
    grid-column: 1 /2;
    grid-row: 1/ 2;
    place-content: stretch;
    place-items: stretch;
  }

  .color-background {
    grid-row-start: 1;
    grid-column-start: 1;
    background-color: transparent;
    background-image: repeating-linear-gradient(
        45deg,
        var(--stsv-Common__color) 25%,
        transparent 25%,
        transparent 75%,
        var(--stsv-Common__color) 75%,
        var(--stsv-Common__color)
      ),
      repeating-linear-gradient(
        45deg,
        var(--stsv-Common__color) 25%,
        var(--stsv-Common__background-color) 25%,
        var(--stsv-Common__background-color) 75%,
        var(--stsv-Common__color) 75%,
        var(--stsv-Common__color)
      );
    background-position: 0 0, 4px 4px;
    background-size: 8px 8px;
    opacity: 0.2;
  }

  .color-block {
    align-items: center;
    background-color: var(--swatch__background-color);
    border-color: var(--swatch__border-color, transparent);
    border-radius: var(--swatch__border-radius, 0);
    border-style: var(--swatch__border-style, solid);
    border-width: var(--swatch__border-width, var(--stsv-Common__border-width));
    outline-color: var(--swatch__outline-color);
    outline-offset: var(--swatch__outline-offset);
    outline-style: var(--swatch__outline-style);
    outline-width: var(--swatch__outline-width);
    color: var(--swatch__color);
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
    grid-column: 2 /3;
    grid-row: 1/ 2;
    row-gap: 1em;
  }

  .color-vars > div {
    border-left: 1px solid var(--stsv-Common__border-color);
    box-sizing: border-box;
    padding-left: 0.5em;
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

  .line {
    stroke: var(--stsv-Common__color);
    stroke-width: 1px;
  }

  .dot {
    fill: var(--stsv-Common__color);
  }
</style>
