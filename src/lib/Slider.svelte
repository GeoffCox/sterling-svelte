<script lang="ts">
  import type { KeyboardEventHandler, PointerEventHandler } from 'svelte/elements';

  import { createEventDispatcher } from 'svelte';

  import { round } from 'lodash-es';

  // ----- Props ----- //

  /** When true, allows the container to handle borders and focus borders  */
  export let composed = false;

  /** When true, the slider is disabled. */
  export let disabled: boolean = false;

  /** The minimum value of the slider. */
  export let min: number = 0;

  /** The maximum value of the slider */
  export let max: number = 100;

  /** The number of decimal places for rounding the value */
  export let precision: number | undefined = undefined;

  /** The amount the value changes when moving by arrow keys */
  export let step: number = 1;

  /** The value of the slider */
  export let value: number = 0;

  export let variant = '';

  /** When true, the slider is displayed vertically */
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

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      event.currentTarget.setPointerCapture(event.pointerId);
      if (vertical) {
        setValueByOffset(sliderRef.getBoundingClientRect().bottom - event.y);
      } else {
        setValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
      }
    }
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled && event.currentTarget.hasPointerCapture(event.pointerId)) {
      if (vertical) {
        setValueByOffset(sliderRef.getBoundingClientRect().bottom - event.y);
      } else {
        setValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
      }
    }
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      switch (event.code) {
        case 'ArrowDown':
        case 'ArrowLeft':
          setValue(value - step);
          event.preventDefault();
          event.stopPropagation();
          return;
        case 'ArrowRight':
        case 'ArrowUp':
          setValue(value + step);
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
  class={`sterling-slider ${variant}`}
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
  on:wheel|passive
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
