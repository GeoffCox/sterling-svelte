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
 * The tab is also disabled when its parent tab list is disabled.
 */
export let disabled = false;

/** When true, the tab is selected. */
export let selected = false;

/** The text of the tab. Not used when the default slot is filled. */
export let text: string | undefined = undefined;

/** The value uniquely identifying this tab within the tab list. */
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
<button>
  <!-- content -->
  <slot {disabled} {selected} {value} {text}/ >
  <!-- selection indicator -->
  <div />
</button>
```

## Playground

<Playground />
