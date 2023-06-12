<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { round } from 'lodash-es';

  // ----- Props ----- //

  export let colorful = false;
  export let composed = false;
  export let disabled: boolean = false;
  export let min: number = 0;
  export let max: number = 100;
  export let precision: number | undefined = undefined;
  export let step: number | undefined = undefined;
  export let value: number = 0;
  export let vertical: boolean = false;

  // ----- State ----- //
  let sliderRef: HTMLDivElement;

  // ----- Methods ----- //

  export const blur = () => {
    sliderRef?.blur();
  };

  export const click = () => {
    sliderRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    sliderRef?.focus();
  };

  // -----Events----- //

  const dispatch = createEventDispatcher();

  //TODO: have change and input events for parity with input type=slider
  // or use input internally within this component.
  const raiseChange = (newValue: number) => {
    dispatch('change', { value: newValue });
  };

  // ----- Value tracking ----- //

  // const getPrecision = (value?: number): number => {
  //   if (value !== undefined && Number !== null && !Number.isNaN(value)) {
  //     const text = value.toString();
  //     const position = text.indexOf('.');
  //     if (position !== -1) {
  //       const fraction = text.substring(position + 1);
  //       if (fraction) {
  //         return fraction.length;
  //       }
  //     }
  //   }
  //   return 0;
  // };

  const setValue = (newValue: number) => {
    const clamped = Math.max(min, Math.min(max, newValue));
    value = precision !== undefined ? round(clamped, precision) : clamped;
  };

  // ensure min <= max
  $: {
    if (min > max) {
      min = max;
    }
  }

  $: min, max, precision, setValue(value);

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
<div
  aria-disabled={disabled}
  aria-valuemin={0}
  aria-valuenow={value}
  aria-valuemax={max}
  class="sterling-slider"
  class:colorful
  class:composed
  class:disabled
  class:horizontal={!vertical}
  class:vertical
  role="slider"
  tabindex={!disabled ? 0 : undefined}
  on:blur
  on:click
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
  on:keydown={onKeyDown}
  on:keypress
  on:keyup
  on:mousedown
  on:mouseenter
  on:mouseleave
  on:mousemove
  on:mouseover
  on:mouseout
  on:mouseup
  on:pointercancel
  on:pointerdown
  on:pointerdown={onPointerDown}
  on:pointerenter
  on:pointerleave
  on:pointermove
  on:pointermove={onPointerMove}
  on:pointerover
  on:pointerout
  on:pointerup
  on:pointerup={onPointerUp}
  on:wheel
  {...$$restProps}
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

<style>
  .sterling-slider {
    box-sizing: border-box;
    outline: none;
    padding: 0;
    overflow: visible;
    display: grid;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-slider.horizontal {
    height: 2em;
  }

  .sterling-slider.vertical {
    height: 100%;
    width: 2em;
  }

  .sterling-slider.composed,
  .sterling-slider.composed:hover,
  .sterling-slider.composed.focus,
  .sterling-slider.composed.disabled {
    background: none;
    border: none;
    outline: none;
  }

  /* ----- container ----- */

  .container {
    position: relative;
  }

  .sterling-slider.horizontal .container {
    margin: 0 0.75em;
  }

  .sterling-slider.vertical .container {
    margin: 0.75em 0;
  }

  /* ----- track ----- */

  .track {
    position: absolute;
    background: var(--stsv-common__background-color--secondary);
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-slider.horizontal .track {
    left: 0;
    right: 0;
    top: 50%;
    height: 3px;
    transform: translate(0, -50%);
  }

  .sterling-slider.vertical .track {
    bottom: 0;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    width: 3px;
  }

  .sterling-slider:focus-visible {
    outline-color: var(--stsv-common__outline-color);
    outline-offset: var(--stsv-common__outline-offset);
    outline-style: var(--stsv-common__outline-style);
    outline-width: var(--stsv-common__outline-width);
  }

  /* ----- fill ----- */

  .fill {
    background: var(--stsv-common__color);
    position: absolute;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-slider.horizontal .fill {
    height: 3px;
    top: 50%;
    transform: translate(0, -50%);
  }

  .sterling-slider.vertical .fill {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 3px;
  }

  .sterling-slider.colorful .fill {
    background: var(--stsv-input--colorful__border-color--selected);
    position: absolute;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  /* ----- thumb ----- */

  .thumb {
    background-color: var(--stsv-button__background-color);
    border-color: var(--stsv-button__border-color);
    border-radius: 10000px;
    border-style: var(--stsv-button__border-style);
    border-width: var(--stsv-button__border-width);
    box-sizing: border-box;
    color: var(--stsv-button__color);
    cursor: pointer;
    display: block;
    font: inherit;
    height: 1.5em;
    overflow: hidden;
    padding: 0;
    position: relative;
    text-decoration: none;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
    position: absolute;
    width: 1.5em;
  }

  .sterling-slider.horizontal .thumb {
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .sterling-slider.vertical .thumb {
    left: 50%;
    transform: translate(-50%, 50%);
  }

  .thumb:hover {
    background-color: var(--stsv-button__background-color--hover);
    border-color: var(--stsv-button__border-color--hover);
    color: var(--stsv-button__color--hover);
  }

  .thumb:active {
    background-color: var(--stsv-button__background-color--active);
    border-color: var(--stsv-button__border-color--active);
    color: var(--stsv-button__color--active);
  }

  /* ----- thumb colorful ----- */

  .sterling-slider.colorful .thumb {
    background-color: var(--stsv-button--colorful__background-color);
    border-color: var(--stsv-button--colorful__border-color);
    color: var(--stsv-button--colorful__color);
  }

  /* ----- thumb disabled ----- */

  .sterling-slider.disabled .thumb {
    cursor: not-allowed;
    outline: none;
  }

  .sterling-slider .thumb::after {
    background: repeating-linear-gradient(
      45deg,
      var(--stsv-common__background-color1--disabled),
      var(--stsv-common__background-color1--disabled) 3px,
      var(--stsv-common__background-color2_disabled) 3px,
      var(--stsv-common__background-color2_disabled) 6px
    );
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    pointer-events: none;
    transition: opacity 250ms;
  }

  .sterling-slider.disabled .thumb::after {
    opacity: 1;
  }

  /* ----- reduced motion ----- */

  @media (prefers-reduced-motion) {
    .sterling-slider,
    .track,
    .fill,
    .thumb,
    .thumb::after {
      transition: none;
    }
  }
</style>
