<script>
    import Playground from './MenuItemDisplayPlayground.svelte';
</script>

# MenuItemDisplay

The default content for a `MenuItem` in a `Menu`.

Displays:

- optional checkbox or radio dot
- content
- shortcut key
- when has a submenu, a chevron

## Props

HTMLDivElement props are included.

```ts
/** When true, displays the menu item as checked. */
export let checked = false;

/** When true, displays the menu item as disabled. */
export let disabled = false;

/** When true, displays the menu item as a parent of children. */
export let hasChildren = false;

/** When true, displays the menu as a top level menu bar item. */
export let isMenuBarItem = false;

/** The role of the menu item. */
export let menuItemRole: MenuItemRole = 'menuitem';

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

## Methods

HTMLDivElement `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<div class="sterling-menu-item-display">
  <div class="check" />
  <div class="content">
    <slot {checked} {disabled} {hasChildren} {isMenuBarItem} {menuItemRole} {variant} />
  </div>
  <div class="shortcut">
    <slot name="shortcut" {checked} {disabled} {isMenuBarItem} {menuItemRole} {variant} />
  </div>
  <div class="chevron" />
</div>
```

## Playground

<Playground />
