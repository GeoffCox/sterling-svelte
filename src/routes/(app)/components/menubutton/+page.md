<script>
    import Playground from './MenuButtonPlayground.svelte';
</script>

# MenuButton

A `Button` displaying a `Menu` when clicked.

## Props

Button props are included.

```ts
/** When true, the menu is open. */
export let open = false;

/** The value uniquely identifying this menu button as the root of the menu hierarchy. */
export let value: string;

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

`Button` events are included.

```ts
dispatch('close', { value });
dispatch('open', { value });
dispatch('select', { value });
```

## Methods

`Button` methods `blur`, `click`, and `focus` are included.

## Anatomy

```svelte
<Button>
  <!-- The default slot of the Button -->
  <slot {shape} {variant} />
  <!-- The slot for menu items -->
  <slot name="items" {variant} />
</Button>
```

## Playground

<Playground />
