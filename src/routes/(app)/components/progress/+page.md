<script>
    import Playground from './ProgressPlayground.svelte';
</script>

# Progress

A visual bar that expands to indicate progress.

> Does not render the HTML progress tag since vertical layout and other customizations are not supported.

## Types

```ts
type ProgressStatus = 'none' | 'auto' | 'progress' | 'success' | 'warning' | 'danger';
```

## Props

HTMLDivElement props are included.

```ts
/** The value between 0 and max. */
export let value = 0;

/** The maximum value. */
export let max = 100;

/** A read-only percentage between 0 and 100 calculated from value and max */
export let percent = 0;

/** When true, the progress bar is displayed vertically. */
export let vertical: boolean = false;

/** Changes the color of the progress bar. */
export let status: ProgressStatus = 'none';

/** When true, the progress bar is disabled. */
export let disabled = false;
```

## Events

HTMLDivElement events are included.

## Anatomy

```svelte
<div>
  <!-- Indicator -->
  <div />
</div>
```

## Playground

<Playground />
