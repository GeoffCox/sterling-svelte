<svelte:options runes={true} />

<script lang="ts">
  import type { HTMLAttributes, KeyboardEventHandler, PointerEventHandler } from 'svelte/elements';

  import { round } from 'lodash-es';
  import { mergeClasses } from './mergeClasses';

  type Props = HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean | null;
    min?: number;
    max?: number;
    precision?: number;
    step?: number;
    value?: number;
    vertical?: boolean | null;
    onChange?: (value: number) => void;
  };

  let {
    class: _class,
    disabled,
    min = 0,
    max = 100,
    onChange,
    precision = 0,
    step = 1,
    value = $bindable(0),
    vertical,
    ...rest
  }: Props = $props();

  let sliderRef: HTMLDivElement;

  export const blur = () => {
    sliderRef?.blur();
  };

  export const click = () => {
    sliderRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    sliderRef?.parentElement?.focus(options);
  };

  let ratio = $derived((value - min) / (max - min));

  const setValue = (newValue: number) => {
    const clamped = Math.max(min, Math.min(max, newValue));
    value = precision !== undefined ? round(clamped, precision) : clamped;
  };

  // ensure min <= max
  $effect(() => {
    if (min > max) {
      min = max;
    }
  });

  $effect(() => {
    const clamped = Math.max(min, Math.min(max, value));
    const newValue = precision !== undefined ? round(clamped, precision) : clamped;
    if (value !== newValue) {
      value = newValue;
    }
  });

  const setValueByOffset = (offset: number) => {
    if (sliderSize > 0) {
      const positionRatio = Math.max(0, Math.min(1, offset / sliderSize));
      const newValue = min + positionRatio * (max - min);
      setValue(newValue);
    }
  };

  // Raise change event when value changes
  $effect(() => {
    onChange?.(value);
  });

  // ----- Size tracking ----- //

  let sliderWidth: number = $state(0);
  let sliderHeight: number = $state(0);

  let sliderSize = $derived(vertical ? sliderHeight : sliderWidth);

  let valueOffset = $derived(sliderSize * ratio);

  // ----- Event handlers ----- //

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      event.currentTarget.setPointerCapture(event.pointerId);
      if (vertical) {
        setValueByOffset(sliderRef.getBoundingClientRect().bottom - event.y);
      } else {
        setValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
      }
      event.preventDefault();
      focus();
    }

    rest?.onpointerdown?.(event);
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled && event.currentTarget.hasPointerCapture(event.pointerId)) {
      if (vertical) {
        setValueByOffset(sliderRef.getBoundingClientRect().bottom - event.y);
      } else {
        setValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
      }
      event.preventDefault();
    }

    rest?.onpointermove?.(event);
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      event.currentTarget.releasePointerCapture(event.pointerId);
      event.preventDefault();
      focus();
    }
    rest?.onpointerup?.(event);
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
    rest?.onkeydown?.(event);
  };
</script>

<div
  aria-disabled={disabled}
  aria-valuemin={min}
  aria-valuenow={value}
  aria-valuemax={max}
  class={mergeClasses('sterling-slider', _class)}
  class:disabled
  class:horizontal={!vertical}
  class:vertical
  role="slider"
  tabindex={!disabled ? 0 : undefined}
  {...rest}
  onkeydown={onKeyDown}
  onpointerdown={onPointerDown}
  onpointermove={onPointerMove}
  onpointerup={onPointerUp}
>
  <div
    class="container"
    bind:this={sliderRef}
    bind:clientWidth={sliderWidth}
    bind:clientHeight={sliderHeight}
  >
    <div class="track"></div>
    <div
      class="fill"
      style={vertical ? `height: ${valueOffset}px` : `width: ${valueOffset}px`}
    ></div>
    <div
      class="thumb"
      style={vertical ? `bottom: ${valueOffset}px` : `left: ${valueOffset}px`}
    ></div>
  </div>
</div>
