<script lang="ts">
  import { round } from 'lodash-es';
  import type { KeyboardEventHandler, PointerEventHandler } from 'svelte/elements';
  import type { RangeSliderProps } from './RangeSlider.types';

  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import { tick } from 'svelte';

  let {
    class: _class,
    disabled,
    min = 0,
    max = 100,
    onChange,
    precision = 0,
    reverse,
    step = 1,
    lowValue = $bindable(),
    highValue = $bindable(),
    vertical,
    ...rest
  }: RangeSliderProps = $props();

  let sliderRef: HTMLDivElement;

  let lowRatio = $derived(
    lowValue !== undefined && max - min > 0 ? (lowValue - min) / (max - min) : 0
  );

  let highRatio = $derived(
    highValue !== undefined && max - min > 0 ? (highValue - min) / (max - min) : 0
  );

  let sliderWidth: number = $state(0);
  let sliderHeight: number = $state(0);

  let sliderSize = $derived(vertical ? sliderHeight : sliderWidth);

  let lowValueOffset = $derived(sliderSize * lowRatio);
  let highValueOffset = $derived(sliderSize * highRatio);

  let draggingThumb = $state(false);
  let activeThumb = $state<'high' | 'low' | undefined>();
  let keyboardThumb = $state<'high' | 'low' | undefined>();

  const getClampedPreciseValue = (value?: number) => {
    if (value === undefined) {
      return undefined;
    }

    const clampedValue = Math.max(min, Math.min(max, value));
    return precision !== undefined ? round(clampedValue, precision) : clampedValue;
  };

  const ensureLowHighRange = async () => {
    if (lowValue === undefined && highValue !== undefined) {
      lowValue = highValue;
    }
    if (highValue === undefined && lowValue !== undefined) {
      highValue = lowValue;
    }
    if (lowValue !== undefined && highValue !== undefined && lowValue > highValue) {
      const temp = highValue;
      highValue = lowValue;
      lowValue = temp;
      await tick();
      activeThumb =
        activeThumb !== undefined ? (activeThumb === 'high' ? 'low' : 'high') : undefined;
      keyboardThumb =
        keyboardThumb !== undefined ? (keyboardThumb === 'high' ? 'low' : 'high') : undefined;
      await tick();
    }
  };

  const ensureValuesValid = () => {
    lowValue = getClampedPreciseValue(lowValue);
    highValue = getClampedPreciseValue(highValue);
    ensureLowHighRange();
  };

  const ensureMinMaxValid = () => {
    if (min > max) {
      const temp = max;
      max = min;
      min = max;
    }
  };

  // when properties load
  ensureMinMaxValid();
  ensureValuesValid();

  // when value changes, ensure it is valid right away
  const setLowValue = (newValue?: number) => {
    lowValue = getClampedPreciseValue(newValue);
    ensureLowHighRange();
  };

  const setHighValue = (newValue?: number) => {
    highValue = getClampedPreciseValue(newValue);
    ensureLowHighRange();
  };

  $effect(() => {
    ensureValuesValid();
  });

  $effect(() => {
    onChange?.({ low: lowValue, high: highValue });
  });

  const getValueByOffset = (offset: number) => {
    if (sliderSize > 0) {
      const positionRatio = Math.max(0, Math.min(1, offset / sliderSize));
      return min + positionRatio * (max - min);
    }
    return undefined;
  };

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      event.currentTarget.setPointerCapture(event.pointerId);
      let newValue: number | undefined = undefined;
      if (vertical) {
        if (reverse) {
          newValue = getValueByOffset(event.y - sliderRef.getBoundingClientRect().top);
        } else {
          newValue = getValueByOffset(sliderRef.getBoundingClientRect().bottom - event.y);
        }
      } else {
        if (reverse) {
          newValue = getValueByOffset(sliderRef.getBoundingClientRect().right - event.x);
        } else {
          newValue = getValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
        }
      }

      // set the closest value
      if (newValue !== undefined) {
        const highDiff =
          highValue !== undefined ? Math.abs(highValue - newValue) : Number.MAX_VALUE;
        const lowDiff = lowValue !== undefined ? Math.abs(lowValue - newValue) : Number.MAX_VALUE;
        if (highDiff < lowDiff) {
          setHighValue(newValue);
          activeThumb = 'high';
          keyboardThumb = 'high';
        } else {
          setLowValue(newValue);
          activeThumb = 'low';
          keyboardThumb = 'low';
        }
      }
      event.preventDefault();
      event.stopPropagation();
      focus();
    }

    rest?.onpointerdown?.(event);
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled && event.currentTarget.hasPointerCapture(event.pointerId)) {
      let newValue: number | undefined = undefined;
      if (vertical) {
        if (reverse) {
          newValue = getValueByOffset(event.y - sliderRef.getBoundingClientRect().top);
        } else {
          newValue = getValueByOffset(sliderRef.getBoundingClientRect().bottom - event.y);
        }
      } else {
        if (reverse) {
          newValue = getValueByOffset(sliderRef.getBoundingClientRect().right - event.x);
        } else {
          newValue = getValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
        }
      }

      draggingThumb = true;

      if (newValue !== undefined && activeThumb !== undefined) {
        if (activeThumb === 'high') {
          setHighValue(newValue);
        } else {
          setLowValue(newValue);
        }
      }

      event.preventDefault();
    }

    rest?.onpointermove?.(event);
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      activeThumb = undefined;
      event.currentTarget.releasePointerCapture(event.pointerId);
      event.preventDefault();
      focus();
    }
    draggingThumb = false;
    rest?.onpointerup?.(event);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey) {
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
        if (keyboardThumb === 'low') {
          setLowValue((lowValue || 0) + change);
        } else if (keyboardThumb === 'high') {
          setHighValue((highValue || 0) + change);
        }

        event.preventDefault();
        event.stopPropagation();
      }
    }

    rest?.onkeydown?.(event);
  };

  export const blur = () => {
    sliderRef?.blur();
  };

  export const click = () => {
    sliderRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    sliderRef?.parentElement?.focus(options);
  };

  $inspect($usingKeyboard, 'usingKeyboard');
</script>

<!-- TODO: Fix aria-valuenow-->
<div
  aria-disabled={disabled}
  aria-valuemin={min}
  aria-valuenow={lowValue}
  aria-valuemax={max}
  class={['sterling-range-slider', _class]}
  class:disabled
  class:horizontal={!vertical}
  class:no-value={lowValue === undefined && highValue === undefined}
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
    style={`--lowValueOffset: ${lowValueOffset}px; --highValueOffset: ${highValueOffset}px`}
  >
    <div class="track"></div>
    <div class="fill"></div>
    <div
      class={[
        'thumb',
        'low',
        activeThumb === 'low' ? 'active' : '',
        keyboardThumb === 'low' ? 'keyboard-focus' : '',
        draggingThumb ? 'dragging' : ''
      ]}
    ></div>
    <div
      class={[
        'thumb',
        'high',
        activeThumb === 'high' ? 'active' : '',
        keyboardThumb === 'high' ? 'keyboard-focus' : '',
        draggingThumb ? 'dragging' : ''
      ]}
    ></div>
  </div>
</div>
