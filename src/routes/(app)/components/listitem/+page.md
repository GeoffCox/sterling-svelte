<script>
    import Playground from './ListItemPlayground.svelte';
</script>

# ListItem

An item within a `List`.

## Props

HTMLDivElement props are included.

```ts
/** When true the item is disabled.  The item may also be disabled if the parent List is disabled. */
export let disabled = false;

/** The value uniquely identifying this item within the list. */
export let value: string;
```

## Events

HTMLDivElement events are included.

## Methods

HTMLDivElement `blur`, `click`, and `focus` methods are included.

## Anatomy

If the default slot is not filled, the value will be displayed as text.

```svelte
<div>
  <slot {disabled} {horizontal} {selected} {value}>{value}</slot>
</div>
```

## Playground

<Playground />
