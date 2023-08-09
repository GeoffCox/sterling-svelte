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

HTMLInputElement events are included.

## Methods

The following HTMLInputElement methods are included:

- `blur`
- `click`
- `focus`
- `select`
- `setRangeText`
- `setSelectionRange`

## Anatomy

```svelte
<label>
  <slot {composed} {disabled} {value} />
</label>
<input />
```

<Playground />
