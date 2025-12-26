<svelte:options runes={true} />

<script lang="ts">
  import { round } from 'lodash-es';
  import type { KeyboardEventHandler, PointerEventHandler } from 'svelte/elements';
  import type { SliderProps } from './Slider.types';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  let {
    class: _class,
    disabled,
    min = 0,
    max = 100,
    onChange,
    precision = 0,
    reverse,
    step = 1,
    value = $bindable(),
    vertical,
    ...rest
  }: SliderProps = $props();

  const ensureValueValid = () => {
    if (value !== undefined) {
      const clamped = Math.max(min, Math.min(max, value));
      const newValue = precision !== undefined ? round(clamped, precision) : clamped;
      if (value !== newValue) {
        value = newValue;
      }
    }
  };

  // ensure incoming value is valid to avoid effect lag
  if (min > max) {
    console.warn('The slider min is greater than max.');
  }

  ensureValueValid();

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

  let ratio = $derived(value !== undefined && max - min > 0 ? (value - min) / (max - min) : 0);

  // when value changes, ensure it is valid right away
  const setValue = (newValue: number) => {
    const clamped = Math.max(min, Math.min(max, newValue));
    value = precision !== undefined ? round(clamped, precision) : clamped;
  };

  const setValueByOffset = (offset: number) => {
    if (sliderSize > 0) {
      const positionRatio = Math.max(0, Math.min(1, offset / sliderSize));
      const newValue = min + positionRatio * (max - min);
      setValue(newValue);
    }
  };

  $effect(() => {
    ensureValueValid();
  });

  // Raise change event when value changes
  $effect(() => {
    value && onChange?.(value);
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
        if (reverse) {
          setValueByOffset(event.y - sliderRef.getBoundingClientRect().top);
        } else {
          setValueByOffset(sliderRef.getBoundingClientRect().bottom - event.y);
        }
      } else {
        if (reverse) {
          setValueByOffset(sliderRef.getBoundingClientRect().right - event.x);
        } else {
          setValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
        }
      }
      event.preventDefault();
      focus();
    }

    rest?.onpointerdown?.(event);
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled && event.currentTarget.hasPointerCapture(event.pointerId)) {
      if (vertical) {
        if (reverse) {
          setValueByOffset(event.y - sliderRef.getBoundingClientRect().top);
        } else {
          setValueByOffset(sliderRef.getBoundingClientRect().bottom - event.y);
        }
      } else {
        if (reverse) {
          setValueByOffset(sliderRef.getBoundingClientRect().right - event.x);
        } else {
          setValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
        }
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
    if (!disabled && value !== undefined && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      let change = 0;

      if (vertical) {
        switch (event.code) {
          case 'ArrowDown':
            change = reverse ? step : -step;
            break;
          case 'ArrowUp':
            change = reverse ? -step : step;
            break;
        }
      } else {
        switch (event.code) {
          case 'ArrowLeft':
            change = reverse ? step : -step;
            break;
          case 'ArrowRight':
            change = reverse ? -step : step;
            break;
        }
      }

      if (change !== 0) {
        setValue(value + change);
        event.preventDefault();
        event.stopPropagation();
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
  class={['sterling-slider', _class]}
  class:disabled
  class:horizontal={!vertical}
  class:no-value={value === undefined}
  class:reverse
  class:using-keyboard={$usingKeyboard}
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
    style={`--valueOffset: ${valueOffset}px`}
  >
    <div class="track"></div>
    <div class="fill"></div>
    <div class="thumb"></div>
  </div>
</div>
