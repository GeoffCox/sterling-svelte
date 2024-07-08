<script>
    import Playground from './SliderPlayground.svelte';
</script>

# Slider

A draggable button on a line to set a value in a range.

## Props

HTMLDivElement props are included.

```ts
/** When true, the slider is disabled. */
export let disabled: boolean = false;

/** The minimum value of the slider. */
export let min: number = 0;

/** The maximum value of the slider. */
export let max: number = 100;

/** The number of decimal places for rounding the value. */
export let precision: number | undefined = undefined;

/** The amount the value changes by pressing arrow keys. */
export let step: number = 1;

/** The value of the slider. */
export let value: number = 0;

/** Additional class names to apply. */
export let variant: string = '';

/** When true, the slider is displayed vertically. */
export let vertical: boolean = false;
```

## Events

HTMLDivElement events are included.

```ts
dispatch('change', { value });
```

## Methods

HTMLDivElement `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<div class="sterling-slider">
  <div class="container">
    <div class="track" />
    <div class="fill" />
    <div class="thumb" />
  <div>
</div>
```

## Playground

<Playground />
