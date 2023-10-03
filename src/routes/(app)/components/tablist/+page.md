<script>
    import Playground from './TabListPlayground.svelte';
</script>

# TabList

A list of tabs where one tab can be selected.

## Types

```ts
/**
 * The context for a TabList and its tabs.
 */
export type TabListContext = {
  /** When true, the tablist and its tabs are disabled. */
  disabled: Readable<boolean>;

  /** The value of the currently selected tab. */
  selectedValue: Writable<string | undefined>;

  /** When true, the tabs are displayed vertically. */
  vertical: Readable<boolean>;
};
```

## Props

HTMLDivElement props are included.

```ts
/** When true, the tab list and its tabs are disabled. */
export let disabled = false;

/** The value of the currently selected tab. */
export let selectedValue: string | undefined = undefined;

/** When true, the tab list is displayed vertically. */
export let vertical = false;

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

```ts
dispatch('select', { value });
```

## Methods

HTMLDivElement `blur` and `focus` methods are included.

```ts
function selectFirstTab();
function selectPreviousTab();
function selectNextTab();
function selectLastTab();
```

## Anatomy

```svelte
<div class="sterling-tab-list">
  <!-- children -->
  <slot {disabled} {selectedValue} {variant} {vertical} />
</div>
```

## Playground

<Playground />
