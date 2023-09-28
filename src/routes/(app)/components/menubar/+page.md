<script>
    import Playground from './MenuBarPlayground.svelte';
</script>

# MenuBar

A horizontal list of menus often at the top of a window.

## Features

- `MenuItem` components can be mixed with with non-menu items such as a search box or buttons.
- ARIA compliant left/right arrow navigation
- Raises events bubbling up the menu item hierarchy.

## Types

```ts
type MenuBarContext = {
  openPreviousMenuBarItem?: () => void;
  openNextMenuBarItem?: () => void;
};
```

## Props

HTMLDivElement props are included.

```ts
/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

```ts
dispatch('close', { value });
dispatch('open', { value });
dispatch('select', { value });
```

## Methods

HTMLDivElement `blur`, and `focus` methods are included.

## Anatomy

```svelte
<!-- menu bar -->
<div>
  <!-- default slot (e.g. MenuItem components) -->
  <slot {variant} />
</div>
```

## Playground

<Playground />
