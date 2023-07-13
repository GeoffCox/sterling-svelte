<script>
    import Playground from './TabPlayground.svelte';
</script>

# Tab

An item within a `TabList`.

## Props

HTMLDivElement props are included.

```ts
/**
 * When true, the tab is disabled.
 * The tab is also disabled if the tab list is disabled.
 */
export let disabled = false;

/** When true, the tab is selected. */
export let selected = false;

/** The text of the tab when the default slot is not replaced. */
export let text: string | undefined = undefined;

/** The value uniquely identifying this item within the tab list. */
export let value: string;
```

## Events

HTMLDivElement events are included.

## Methods

HTMLDivElement `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<button>
  <!-- content -->
  <slot {disabled} {selected} {value} {text}/ >
  <!-- selection indicator -->
  <div />
</button>
```

## Playground

<Playground />
