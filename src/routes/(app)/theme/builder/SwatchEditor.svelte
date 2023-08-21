<script lang="ts">
  import { onMount } from 'svelte';

  import ColorPicker from '$lib/ColorPicker.svelte';
  import Input from '$lib/Input.svelte';

  export let backgroundColorName: string | undefined = undefined;
  export let backgroundColorValue: string | undefined = undefined;

  export let borderColorName: string | undefined = undefined;
  export let borderColorValue: string | undefined = undefined;

  export let borderRadiusName: string | undefined = undefined;
  export let borderRadiusValue: string | undefined = undefined;

  export let borderStyleName: string | undefined = undefined;
  export let borderStyleValue: string | undefined = undefined;

  export let borderWidthName: string | undefined = undefined;
  export let borderWidthValue: string | undefined = undefined;

  export let colorName: string | undefined = undefined;
  export let colorValue: string | undefined = undefined;

  export let outlineColorName: string | undefined = undefined;
  export let outlineColorValue: string | undefined = undefined;

  export let outlineOffsetName: string | undefined = undefined;
  export let outlineOffsetValue: string | undefined = undefined;

  export let outlineStyleName: string | undefined = undefined;
  export let outlineStyleValue: string | undefined = undefined;

  export let outlineWidthName: string | undefined = undefined;
  export let outlineWidthValue: string | undefined = undefined;

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

  backgroundColorValue = backgroundColorValue || getVarValue(backgroundColorName);
  borderColorValue = borderColorValue || getVarValue(borderColorName);
  borderRadiusValue = borderRadiusValue || getVarValue(borderRadiusName);
  borderStyleValue = borderStyleValue || getVarValue(borderStyleName);
  borderWidthValue = borderWidthValue || getVarValue(borderWidthName);
  colorValue = colorValue || getVarValue(colorName);
  outlineColorValue = outlineColorValue || getVarValue(outlineColorName);
  outlineOffsetValue = outlineOffsetValue || getVarValue(outlineOffsetName);
  outlineStyleValue = outlineStyleValue || getVarValue(outlineStyleName);
  outlineWidthValue = outlineWidthValue || getVarValue(outlineWidthName);

  // ----- State ----- //

  let mounted = false;
  let clientWidth: number;
  let clientHeight: number;
  let swatchRef: HTMLDivElement;
  let colorBlockRef: HTMLDivElement;
  let backgroundColorNameRef: HTMLDivElement;
  let borderColorNameRef: HTMLDivElement;
  let borderRadiusNameRef: HTMLDivElement;
  let borderStyleNameRef: HTMLDivElement;
  let borderWidthNameRef: HTMLDivElement;
  let colorNameRef: HTMLDivElement;
  let outlineColorNameRef: HTMLDivElement;
  let outlineOffsetNameRef: HTMLDivElement;
  let outlineStyleNameRef: HTMLDivElement;
  let outlineWidthNameRef: HTMLDivElement;

  let coordinates = {
    svg: { width: 0, height: 0 },
    backgroundDot: { x: 0, y: 0 },
    backgroundLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    backgroundEdgeLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    bordersDot: { x: 0, y: 0 },
    bordersLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    bordersEdgeLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    colorDot: { x: 0, y: 0 },
    colorLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    colorEdgeLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    outlinesDot: { x: 0, y: 0 },
    outlinesLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    outlinesEdgeLine: { x1: 0, y1: 0, x2: 0, y2: 0 }
  };

  // isPropSet avoids repeatedly comparing against undefined
  const isPropSet = {
    backgroundColor: backgroundColorName !== undefined,
    borderColor: borderColorName !== undefined,
    borderRadius: borderRadiusName !== undefined,
    borderStyle: borderStyleName !== undefined,
    borderWidth: borderWidthName !== undefined,
    borders: false,
    color: colorName !== undefined,
    outlineColor: outlineColorName !== undefined,
    outlineOffset: outlineOffsetName !== undefined,
    outlineStyle: outlineStyleName !== undefined,
    outlineWidth: outlineWidthName !== undefined,
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

      if (backgroundColorNameRef) {
        const nameRef = backgroundColorNameRef.getBoundingClientRect();
        newCoordinates.backgroundDot = {
          x: colorBlockRect.left - swatchRect.left + (colorBlockRect.width * 3) / 4,
          y: colorBlockRect.top - swatchRect.top + colorBlockRect.height / 5
        };
        newCoordinates.backgroundLine = {
          x1: newCoordinates.backgroundDot.x,
          y1: newCoordinates.backgroundDot.y,
          x2: nameRef.left - swatchRect.left - edgeLineNudge,
          y2: nameRef.top - swatchRect.top + nameRef.height / 2
        };
        newCoordinates.backgroundEdgeLine = {
          x1: nameRef.left - swatchRect.left - edgeLineNudge,
          y1: nameRef.top - swatchRect.top + 1,
          x2: nameRef.left - swatchRect.left - edgeLineNudge,
          y2: nameRef.bottom - swatchRect.top - 1
        };
      }

      let firstBordersTextRef: HTMLDivElement | undefined = undefined;
      let lastBordersTextRef: HTMLDivElement | undefined = undefined;

      firstBordersTextRef =
        borderColorNameRef || borderRadiusNameRef || borderStyleNameRef || borderWidthNameRef;
      lastBordersTextRef =
        borderWidthNameRef || borderStyleNameRef || borderRadiusNameRef || borderColorNameRef;

      if (firstBordersTextRef && lastBordersTextRef) {
        const textRect1 = firstBordersTextRef.getBoundingClientRect();
        const textRect2 = lastBordersTextRef.getBoundingClientRect();
        newCoordinates.bordersDot = {
          x: colorBlockRect.left - swatchRect.left - 2 + colorBlockRect.width,
          y: colorBlockRect.top - swatchRect.top + colorBlockRect.height / 2
        };
        newCoordinates.bordersLine = {
          x1: newCoordinates.bordersDot.x,
          y1: newCoordinates.bordersDot.y,
          x2: textRect1.left - swatchRect.left - edgeLineNudge,
          y2: textRect1.top - swatchRect.top + (textRect2.bottom - textRect1.top) / 2
        };
        newCoordinates.bordersEdgeLine = {
          x1: textRect1.left - swatchRect.left - edgeLineNudge,
          y1: textRect1.top - swatchRect.top + 1,
          x2: textRect2.left - swatchRect.left - edgeLineNudge,
          y2: textRect2.bottom - swatchRect.top - 1
        };
      }

      if (colorNameRef) {
        const textRect = colorNameRef.getBoundingClientRect();
        newCoordinates.colorDot = {
          x: colorBlockRect.left - swatchRect.left + colorBlockRect.width / 2,
          y: colorBlockRect.top - swatchRect.top + colorBlockRect.height / 2 + 10
        };
        newCoordinates.colorLine = {
          x1: newCoordinates.colorDot.x,
          y1: newCoordinates.colorDot.y,
          x2: textRect.left - swatchRect.left - edgeLineNudge,
          y2: textRect.top - swatchRect.top + textRect.height / 2
        };
        newCoordinates.colorEdgeLine = {
          x1: textRect.left - swatchRect.left - edgeLineNudge,
          y1: textRect.top - swatchRect.top + 1,
          x2: textRect.left - swatchRect.left - edgeLineNudge,
          y2: textRect.bottom - swatchRect.top - 1
        };
      }

      const firstOutlineNameRef =
        outlineColorNameRef || outlineOffsetNameRef || outlineStyleNameRef || outlineWidthNameRef;
      const lastOutlineNameRef =
        outlineWidthNameRef || outlineStyleNameRef || outlineOffsetNameRef || outlineColorNameRef;

      if (firstOutlineNameRef && lastOutlineNameRef) {
        const textRect1 = firstOutlineNameRef.getBoundingClientRect();
        const textRect2 = lastOutlineNameRef.getBoundingClientRect();

        newCoordinates.outlinesDot = {
          x: colorBlockRect.left - swatchRect.left + colorBlockRect.width,
          y: colorBlockRect.top - swatchRect.top + colorBlockRect.height
        };

        newCoordinates.outlinesLine = {
          x1: newCoordinates.outlinesDot.x,
          y1: newCoordinates.outlinesDot.y,
          x2: textRect1.left - swatchRect.left - edgeLineNudge,
          y2: textRect1.top - swatchRect.top + (textRect2.bottom - textRect1.top) / 2
        };

        newCoordinates.outlinesEdgeLine = {
          x1: textRect1.left - swatchRect.left - edgeLineNudge,
          y1: textRect1.top - swatchRect.top,
          x2: textRect2.left - swatchRect.left - edgeLineNudge,
          y2: textRect2.bottom - swatchRect.top
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

    isPropSet.backgroundColor &&
      cssVars.push(`--swatch__background-color: ${backgroundColorValue};`);
    isPropSet.borderColor && cssVars.push(`--swatch__border-color: ${borderColorValue};`);
    isPropSet.borderRadius && cssVars.push(`--swatch__border-radius: ${borderRadiusValue};`);
    isPropSet.borderStyle && cssVars.push(`--swatch__border-style: ${borderStyleValue};`);
    isPropSet.borderStyle && cssVars.push(`--swatch__border-width: ${borderWidthValue};`);
    isPropSet.color && cssVars.push(`--swatch__color: ${colorValue};`);
    isPropSet.outlineColor && cssVars.push(`--swatch__outline-color: ${outlineColorValue};`);
    isPropSet.outlineOffset && cssVars.push(`--swatch__outline-offset: ${outlineOffsetValue};`);
    isPropSet.outlineStyle && cssVars.push(`--swatch__outline-style: ${outlineStyleValue};`);
    isPropSet.outlineWidth && cssVars.push(`--swatch__outline-width: ${outlineWidthValue};`);

    style = cssVars.join('');
  };

  $: backgroundColorName,
    backgroundColorValue,
    borderColorName,
    borderColorValue,
    borderRadiusName,
    borderRadiusValue,
    borderStyleName,
    borderStyleValue,
    borderWidthName,
    borderWidthValue,
    colorName,
    colorValue,
    outlineColorName,
    outlineColorValue,
    outlineOffsetName,
    outlineOffsetValue,
    outlineStyleName,
    outlineStyleValue,
    outlineWidthName,
    outlineWidthValue,
    updateStyle();
</script>

<div bind:this={swatchRef} bind:clientWidth bind:clientHeight class="swatch" {style}>
  <div class="color-area">
    <div class="color-background" />
    <div bind:this={colorBlockRef} class="color-block"><span>T</span></div>
  </div>
  <div class="color-vars">
    {#if isPropSet.backgroundColor}
      <div bind:this={backgroundColorNameRef} class="background-prop background-color-name">
        {backgroundColorName}
      </div>
      <ColorPicker bind:colorText={backgroundColorValue} />
    {/if}
    {#if isPropSet.backgroundColor && isPropSet.borders}
      <div class="prop-spacer" />
      <div class="prop-spacer" />
    {/if}
    {#if isPropSet.borderColor}
      <div bind:this={borderColorNameRef} class="border-color-name">
        {borderColorName}
      </div>
      <ColorPicker bind:colorText={borderColorValue} />
    {/if}
    {#if isPropSet.borderRadius}
      <div bind:this={borderRadiusNameRef} class="border-radius-name">
        {borderRadiusName}
      </div>
      <Input bind:value={borderRadiusValue} />
    {/if}
    {#if isPropSet.borderStyle}
      <div bind:this={borderStyleNameRef} class="border-style-name">
        {borderStyleName}
      </div>
      <Input bind:value={borderStyleValue} />
    {/if}
    {#if isPropSet.borderWidth}
      <div bind:this={borderWidthNameRef} class="border-width-name">
        {borderWidthName}
      </div>
      <Input bind:value={borderWidthValue} />
    {/if}
    {#if (isPropSet.backgroundColor || isPropSet.borders) && isPropSet.color}
      <div class="prop-spacer" />
      <div class="prop-spacer" />
    {/if}
    {#if isPropSet.color}
      <div bind:this={colorNameRef} class="color-prop color-name">
        {colorName}
      </div>
      <ColorPicker bind:colorText={colorValue} />
    {/if}
    {#if (isPropSet.backgroundColor || isPropSet.borders || isPropSet.color) && isPropSet.outlines}
      <div class="prop-spacer" />
      <div class="prop-spacer" />
    {/if}
    {#if isPropSet.outlineColor}
      <div bind:this={outlineColorNameRef} class="outline-color-name">
        {outlineColorName}
      </div>
      <ColorPicker bind:colorText={outlineColorValue} />
    {/if}
    {#if isPropSet.outlineOffset}
      <div bind:this={outlineOffsetNameRef} class="outline-offset-name">
        {outlineOffsetName}
      </div>
      <Input bind:value={outlineOffsetValue} />
    {/if}
    {#if isPropSet.outlineStyle}
      <div bind:this={outlineStyleNameRef} class="outline-style-name">
        {outlineStyleName}
      </div>
      <Input bind:value={outlineStyleValue} />
    {/if}
    {#if isPropSet.outlineWidth}
      <div bind:this={outlineWidthNameRef} class="outline-width-name">
        {outlineWidthName}
      </div>
      <Input bind:value={outlineWidthValue} />
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
        <line
          class="line"
          stroke="red"
          x1={coordinates.backgroundEdgeLine.x1}
          y1={coordinates.backgroundEdgeLine.y1}
          x2={coordinates.backgroundEdgeLine.x2}
          y2={coordinates.backgroundEdgeLine.y2}
        />
      {/if}
      {#if isPropSet.borders}
        <line
          class="line"
          x1={coordinates.bordersLine.x1}
          y1={coordinates.bordersLine.y1}
          x2={coordinates.bordersLine.x2}
          y2={coordinates.bordersLine.y2}
        />
        <circle
          class="dot border-dot"
          cx={coordinates.bordersDot.x}
          cy={coordinates.bordersDot.y}
          r="3"
        />
        <line
          class="line"
          stroke="red"
          x1={coordinates.bordersEdgeLine.x1}
          y1={coordinates.bordersEdgeLine.y1}
          x2={coordinates.bordersEdgeLine.x2}
          y2={coordinates.bordersEdgeLine.y2}
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
        <line
          class="line"
          stroke="red"
          x1={coordinates.colorEdgeLine.x1}
          y1={coordinates.colorEdgeLine.y1}
          x2={coordinates.colorEdgeLine.x2}
          y2={coordinates.colorEdgeLine.y2}
        />
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
        <line
          class="line"
          stroke="red"
          x1={coordinates.outlinesEdgeLine.x1}
          y1={coordinates.outlinesEdgeLine.y1}
          x2={coordinates.outlinesEdgeLine.x2}
          y2={coordinates.outlinesEdgeLine.y2}
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
    background-color: var(--swatch__background-color);
    border-color: var(--swatch__border-color, transparent);
    border-radius: var(--swatch__border-radius, 0);
    border-style: var(--swatch__border-style, solid);
    border-width: var(--swatch__border-width, 2px);
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
    grid-template-columns: auto auto;
    grid-column: 2 /3;
    grid-row: 1/ 2;
    row-gap: 0.25em;
    column-gap: 1em;
    align-items: center;
  }

  .prop-spacer {
    height: 1em;
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
