<script>
    import Playground from './MenuBarPlayground.svelte';
</script>

# MenuBar

A horizontal list of menus often at the top of a window.

## Types

```ts
export type MenuBarContext = {
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
<div class="sterling-menu-bar">
  <slot {variant} />
</div>
```

## Playground

<Playground />
