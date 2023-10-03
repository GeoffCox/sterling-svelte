<script>
    import Playground from './InputPlayground.svelte';
</script>

# Input

A styled HTML `input` with an optional label.

## Props

HTMLInputElement props are included.

```ts
/** Additional class names to apply. */
export let variant: string = '';
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
<label class="sterling-input-label">
  <slot {disabled} {value} {variant} />
</label>
<div class="sterling-input">
  <input />
</div>
```

<Playground />
