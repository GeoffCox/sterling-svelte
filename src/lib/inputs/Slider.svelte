<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { round } from 'lodash-es';
  import { v4 as uuid } from 'uuid';

  import Label from '../display/Label.svelte';

  // ----- Props ----- //

  /**
   * The value of the slider.
   */
  export let value: number = 0;

  /**
   * The minimum value of the slider.
   */
  export let min: number = 0;

  /**
   * The maximum value of the slider.
   */
  export let max: number = 100;

  /**
   * The value the slider can step by
   */
  export let step: number | undefined = undefined;

  /**
   * The number of decimal places to round the value to.
   * If min, max, or step have higher precision (more decimal places), that precision will be used.
   */
  export let precision: number = 0;

  /*
   * If the slider should be displayed vertically.
   */
  export let vertical: boolean = false;

  /**
   * If the slider is disabled.
   */
  export let disabled: boolean = false;

  const inputId = uuid();

  let sliderRef: HTMLDivElement;

  // -----Events----- //

  const dispatch = createEventDispatcher();

  const raiseChange = (newValue: number) => {
    dispatch('change', { value: newValue });
  };

  // ----- Value tracking ----- //

  const getPrecision = (value?: number): number => {
    if (value !== undefined && Number !== null && !Number.isNaN(value)) {
      const text = value.toString();
      const position = text.indexOf('.');
      if (position !== -1) {
        const fraction = text.substring(position + 1);
        if (fraction) {
          return fraction.length;
        }
      }
    }
    return 0;
  };

  // use the highest precision
  $: highestPrecision = Math.max(
    precision,
    getPrecision(min),
    getPrecision(max),
    getPrecision(step)
  );

  const setValue = (newValue: number) => {
    value = round(Math.max(min, Math.min(max, newValue)), highestPrecision);
  };

  // ensure min <= max
  $: {
    if (min > max) {
      min = max;
    }
  }

  // ensure min <= value <= max
  // ensure that value is rounded to highestPrecision
  $: {
    if (value < min || value > max || value !== round(value, highestPrecision)) {
      setValue(value);
    }
  }

  // Ensure value snaps to the step
  $: {
    if (step) {
      let stepValue = Math.max(min, Math.min(value, max));
      stepValue = Math.round(stepValue / step) * step + min;
      if (stepValue !== value) {
        setValue(stepValue);
      }
    }
  }

  // Compute the ratio of the value to the range
  $: ratio = (value - min) / (max - min);
  $: changeBy = step ? step : 1;

  const setValueByOffset = (offset: number) => {
    if (sliderSize > 0) {
      const positionRatio = Math.max(0, Math.min(1, offset / sliderSize));
      const newValue = min + positionRatio * (max - min);
      setValue(newValue);
    }
  };

  // Raise change event when value changes
  $: {
    raiseChange(value);
  }

  // ----- Size tracking ----- //

  let sliderWidth: number;
  let sliderHeight: number;

  $: sliderSize = vertical ? sliderHeight : sliderWidth;

  $: valueOffset = sliderSize * ratio;

  // ----- Event handlers ----- //

  const onPointerDown: svelte.JSX.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      event.currentTarget.setPointerCapture(event.pointerId);
      if (vertical) {
        setValueByOffset(sliderRef.getBoundingClientRect().bottom - event.y);
      } else {
        setValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
      }
    }
  };

  const onPointerMove: svelte.JSX.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled && event.currentTarget.hasPointerCapture(event.pointerId)) {
      if (vertical) {
        setValueByOffset(sliderRef.getBoundingClientRect().bottom - event.y);
      } else {
        setValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
      }
    }
  };

  const onPointerUp: svelte.JSX.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown: svelte.JSX.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      switch (event.code) {
        case 'ArrowDown':
        case 'ArrowLeft':
          setValue(value - changeBy);
          event.preventDefault();
          event.stopPropagation();
          return;
        case 'ArrowRight':
        case 'ArrowUp':
          setValue(value + changeBy);
          event.preventDefault();
          event.stopPropagation();
          return;
      }
    }
  };
</script>

<!-- @component
Slider lets the user chose a value within a min/max range by dragging a thumb button.
-->
<div class="sterling-slider" class:vertical>
  {#if $$slots.label}
    <Label {disabled} for={inputId}>
      <slot name="label" />
    </Label>
  {/if}
  <div
    class="slider"
    class:disabled
    class:horizontal={!vertical}
    class:vertical
    id={inputId}
    role="slider"
    aria-valuemin={0}
    aria-valuenow={value}
    aria-valuemax={max}
    tabindex={!disabled ? 0 : undefined}
    {...$$restProps}
    on:keydown={onKeyDown}
    on:pointerdown={onPointerDown}
    on:pointermove={onPointerMove}
    on:pointerup={onPointerUp}
  >
    <div
      class="container"
      bind:this={sliderRef}
      bind:clientWidth={sliderWidth}
      bind:clientHeight={sliderHeight}
    >
      <div class="track" />
      <div class="fill" style={vertical ? `height: ${valueOffset}px` : `width: ${valueOffset}px`} />
      <div class="thumb" style={vertical ? `bottom: ${valueOffset}px` : `left: ${valueOffset}px`} />
    </div>
  </div>
</div>

<style>
  .sterling-slider {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .sterling-slider.vertical {
    justify-items: center;
    height: 100%;
  }

  .sterling-slider > :global(label) {
    font-size: 0.7em;
  }

  .slider {
    box-sizing: border-box;
    outline: none;
    padding: 0;
    overflow: visible;
    display: grid;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .container {
    position: relative;
  }

  .track {
    position: absolute;
    background: var(--stsv-Display__background-color);
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .fill {
    background: var(--stsv-Display__color);
    position: absolute;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .thumb {
    background-color: var(--stsv-Button__background-color);
    border-color: var(--stsv-Button__border-color);
    border-radius: 10000px;
    border-style: var(--stsv-Button__border-style);
    border-width: var(--stsv-Button__border-width);
    box-sizing: border-box;
    color: var(--stsv-Button__color);
    cursor: pointer;
    display: block;
    font: inherit;
    height: 1.5em;
    overflow: hidden;
    padding: 0;
    text-decoration: none;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
    position: absolute;
    width: 1.5em;
  }

  /* ----- horizontal ----- */

  .slider.horizontal {
    height: 2em;
  }

  .slider.horizontal .container {
    margin: 0 0.75em;
  }

  .slider.horizontal .track {
    left: 0;
    right: 0;
    top: 50%;
    height: 3px;
    transform: translate(0, -50%);
  }

  .slider.horizontal .fill {
    height: 3px;
    top: 50%;
    transform: translate(0, -50%);
  }

  .slider.horizontal .thumb {
    top: 50%;
    transform: translate(-50%, -50%);
  }

  /* ----- vertical ----- */

  .slider.vertical {
    width: 2em;
  }
  .slider.vertical .container {
    margin: 0.75em 0;
  }

  .slider.vertical .track {
    bottom: 0;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    width: 3px;
  }

  .slider.vertical .fill {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 3px;
  }

  .slider.vertical .thumb {
    left: 50%;
    transform: translate(-50%, 50%);
  }

  /* ----- hover ----- */

  .thumb:hover {
    background-color: var(--stsv-Button__background-color--hover);
    border-color: var(--stsv-Button__border-color--hover);
    color: var(--stsv-Button__color--hover);
  }

  /* ----- active ----- */

  .thumb:active {
    background-color: var(--stsv-Button__background-color--active);
    border-color: var(--stsv-Button__border-color--active);
    color: var(--stsv-Button__color--active);
  }

  /* ----- focus ----- */
  .slider:focus-visible {
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }
  /* ----- disabled ----- */

  .slider.disabled .track {
    background: var(--stsv-Common__background-color--disabled);
  }

  .slider.disabled .fill {
    background: var(--stsv-Common__color--disabled);
  }

  .slider.disabled .thumb {
    background-color: var(--stsv-Common__background-color--disabled);
    border-color: var(--stsv-Common__border-color--disabled);
    color: var(--stsv-Common__color--disabled);
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion) {
    .slider,
    .track,
    .fill,
    .thumb {
      transition: none;
    }
  }
</style>
