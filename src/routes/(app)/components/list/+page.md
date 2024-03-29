<script>
    import Playground from './ListPlayground.svelte';
</script>

# List

A list of items where an item can be selected.

## Types

```ts
/**
 * The context for a List and its descendants.
 */
export type ListContext = {
  /** When true, the list and its items are disabled. */
  disabled?: Readable<boolean>;

  /** The value of the currently selected item. */
  selectedValue?: Writable<string | undefined>;

  /** When true, the list is laid out horizontally. */
  horizontal?: Readable<boolean>;
};
```

## Props

HTMLDivElement props are included.

```ts
/** If the list and all its items are disabled. */
export let disabled: boolean = false;

/** When true, items are arranged horizontally. */
export let horizontal = false;

/** The value of the currently selected item. */
export let selectedValue: string | undefined = undefined;

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

```ts
/** Raised when an item is selected. Passes the new selected value. */
dispatch('select', { value });
```

## Methods

HTMLDivElement `blur`, `click`, and `focus` methods are included.

```ts
function scrollToSelectedItem();

function selectFirstItem();

function selectPreviousItem();

function selectNextItem();

function selectLastItem();
```

## Anatomy

Use the default slot to provide list items.

A list item is identified by having `data-value` and `role="listitem"` properties.
Any content without these properties, will not participate in selection.
This allows you to mix in other content with list items such as search boxes, group headers, or decorations.

```svelte
<div class="sterling-list">
  <slot {disabled} {horizontal} {selectedValue} {variant} />
</div>
```

## Playground

<Playground />
