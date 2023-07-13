<script>
    import Playground from './TreeItemDisplayPlayground.svelte';
</script>

# TreeItemDisplay

A chevron and a label for an item in a tree.

## Props

HTMLDivElement props are included.

```ts
/** When true, applies colorful theme styles. */
export let colorful = false;

/** The depth of the item in the tree for displaying indentation. */
export let depth = 0;

/** When true, the item is disabled. */
export let disabled = false;

/** When true, the item is expanded and children are visible. */
export let expanded = false;

/** When true, the item is has children and can be expanded. */
export let hasChildren = false;

/** When true, the item is selected. */
export let selected = false;

/** The value uniquely identifying this item within the tree. */
export let value: string;
```

## Events

HTMLDivElement events are included.

## Methods

HTMLDivElement `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<div>
  <TreeChevron />
  <slot {colorful} {depth} {disabled} {expanded} {hasChildren} {selected} {value} />
</div>
```

## Playground

<Playground />
