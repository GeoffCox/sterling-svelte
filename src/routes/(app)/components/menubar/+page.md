<script>
    import Playground from './MenuBarPlayground.svelte';
</script>

# MenuBar

A horizontal list of menu items typically at the top of a window.

- You can mix MenuItem components with non-menu item content such as a search box or buttons.

## Types

```ts
type MenuBarContext = {
  openPreviousMenuBarItem?: () => void;
  openNextMenuBarItem?: () => void;
};
```

## Props

HTMLDivElement props are included.

## Events

HTMLDivElement events are included.

MenuItem events are bubbled up the hiearchy of menus.

```ts
dispatch('close', { value });
dispatch('open', { value });
dispatch('select', { value });
```

## Methods

HTMLDivElement `blur`, and `focus` methods are included.

## Anatomy

```svelte
<div>
  <slot />
</div>
```

## Playground

<Playground />
