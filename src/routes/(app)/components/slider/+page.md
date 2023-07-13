<script>
    import Playground from './SliderPlayground.svelte';
</script>

# Slider

A draggable button on a line to set a value in a range.

> The HTML `input type=range` element does not support adequate custom styling. Slider provides a custom solution.

## Props

HTMLDivElement props are included.

```ts
/** When true, applies colorful theme styles */
export let colorful = false;

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
export let step: number | undefined = undefined;

/** The value of the slider */
export let value: number = 0;

/** When true, the slider is displayed vertically */
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
<div>
  <!-- container -->
  <div>
    <!-- track -->
    <div />
    <!-- fill -->
    <div />
    <!-- thumb -->
    <div />
  <div>
</div>
```

## Playground

<Playground />
