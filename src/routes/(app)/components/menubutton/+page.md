<script>
    import Playground from './MenuButtonPlayground.svelte';
</script>

# MenuButton

A Button that shows a menu when clicked.

## Props

Button props are included.

```ts
/** When true, the menu is open. */
export let open = false;

/** The value uniquely identifying this menu button as the root of the menu hierarchy. */
export let value: string;
```

## Events

Button events are included.

```ts
dispatch('close', { value });
dispatch('open', { value });
dispatch('select', { value });
```

## Methods

Button `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<Button>
  <slot {shape} {variant} />
  <slot name="items" />
</Button>
```

## Playground

<Playground />
