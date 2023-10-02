<script>
    import Playground from './TreePlayground.svelte';
</script>

# Tree

A hierarchy of items that can be expanded or collapsed where a single item can be selected.

## Types

```ts
/**
 * The context for a Tree and its descendants.
 */
export type TreeContext = {
  /** When true, the tree and its descendants are disabled */
  disabled: Readable<boolean>;

  /** The values of items that are expanded. */
  expandedValues: Writable<string[]>;

  /** The value of the currently selected item. */
  selectedValue: Writable<string | undefined>;
};
```

## Props

HTMLDivElement props are included.

```ts
/** When true, the tree and its descendants are disabled. */
export let disabled = false;

/** The value of the currently selected item. */
export let selectedValue: string | undefined = undefined;

/** The values of items that are expanded. */
export let expandedValues: string[] = [];

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

```ts
dispatch('expandCollapse', { expandedValues });
dispatch('select', { selectedValue });
```

## Methods

HTMLDivElement `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<div>
  <slot {disabled} {expandedValues} {selectedValue} {variant} />
</div>
```

## Playground

<Playground />
