<script>
    import Playground from './TabListPlayground.svelte';
</script>

# TabList

A list of tabs where one tab can be selected.

## Types

```ts
type TabListContext = {
  disabled: Readable<boolean>;
  selectedValue: Writable<string | undefined>;
  usingKeyboard: Readable<boolean>;
  vertical: Readable<boolean>;
};
```

## Props

HTMLDivElement props are included.

```ts
/** When true, the tab list and its tabs are disabled. */
export let disabled = false;

/** When true, the tab list is displayed vertically. */
export let vertical = false;

/** The value of the currently selected tab. */
export let selectedValue: string | undefined = undefined;

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
<div>
  <slot {disabled} {selectedValue} {variant} {vertical} />
</div>
```

## Playground

<Playground />
