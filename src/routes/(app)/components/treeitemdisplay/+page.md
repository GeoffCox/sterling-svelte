<script>
    import Playground from './TreeItemDisplayPlayground.svelte';
</script>

# TreeItemDisplay

A chevron and label for an item in a tree.

## Props

HTMLDivElement props are included.

```ts
/** The depth of the item in the tree. */
export let depth = 0;

/** When true, display the item as disabled. */
export let disabled = false;

/** When true, displays the item is expanded showing children. */
export let expanded = false;

/** When true, displays the item has children. */
export let hasChildren = false;

/** When true, display selected state. */
export let selected = false;

/** The value uniquely identifying the tree item within the tree. */
export let value: string;

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

## Methods

HTMLDivElement `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<div>
  <TreeChevron {expanded} {hasChildren} {variant} />
  <slot {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant} />
</div>
```

## Sterling Theme Variants

- The variant is passed to the TreeChevron and default slot.

| Variant  | Description           |
| -------- | --------------------- |
| colorful | applies accent colors |

## Playground

<Playground />
