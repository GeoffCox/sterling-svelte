<script>
    import Playground from './ListPlayground.svelte';
</script>

# List

A list of items where an item can be selected.

- Choose between a vertical or horizontal list.

## Types

The ListContext is provided to each item with `setContext('sterlingList')`.

```ts
type ListContext = {
  disabled: Readable<boolean>;
  selectedValue: Writable<string | undefined>;
  horizontal: Readable<boolean>;
};
```

## Props

HTMLDivElement props are included.

```ts
/** When true, applies colorful theme styles. */
export let colorful = false;

/** When true, allows the container to handle borders and focus borders.  */
export let composed = false;

/** If the list and all its items are disabled. */
export let disabled: boolean = false;

/** When true, items are arranged horizontally. */
export let horizontal = false;

/** The value of the currently selected item. */
export let selectedValue: string | undefined = undefined;
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
<div>
  <slot {composed} {disabled} {horizontal} {selectedValue} />
</div>
```

## Playground

<Playground />
