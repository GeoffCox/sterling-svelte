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
/** When true, the progress bar is disabled. */
export let disabled = false;

/** The maximum value. */
export let max = 100;

/** A read-only percentage between 0 and 100 calculated from value and max. */
export let percent = 0;

/** The current status of the progress. */
export let status: ProgressStatus = 'none';

/** The current value. */
export let value = 0;

/** Additional class names to apply. */
export let variant: string = '';

/** When true, the progress bar is displayed vertically. */
export let vertical: boolean = false;
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
