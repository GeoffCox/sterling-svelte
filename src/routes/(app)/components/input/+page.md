<script>
    import Playground from './InputPlayground.svelte';
</script>

# Input

A styled HTML `input`.

## Props

HTMLInputElement props are included.

```ts
/** When true, applies colorful theme styles. */
export let colorful = false;

/** When true, allows the container to handle borders and focus borders.  */
export let composed = false;
```

## Events

// HTMLInputElement events are included.

## Methods

```ts
function blur();
function click();
function focus(options: FocusOptions);
function select();
function setSelectionRange(
  start: number | null,
  end: number | null,
  direction?: 'forward' | 'backward' | 'none'
);
function setRangeText(
  replacement: string,
  start?: number,
  end?: number,
  selectionMode?: SelectionMode
);
```

## Anatomy

```svelte
<label>
  <slot {composed} {disabled} {value} />
</label>
<input />
```

<Playground />
