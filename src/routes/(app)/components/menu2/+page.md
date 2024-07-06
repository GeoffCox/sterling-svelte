<script>
    import Link from '$lib/Link.svelte';
</script>

# Menu

A list of menu items.

- Menu is a building block for menu components:
  - <Link href="menubar">MenuBar</Link>
  - <Link href="menubutton">MenuButton</Link>
  - <Link href="menuitem">MenuItem</Link>
  - <Link href="menuseparator">MenuSeparator</Link>
- Manages position based on the reference element
- The menu floats above other element via portaling

## Props

HTMLDivElement props are included.

```ts
/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

## Methods

HTMLDivElement `blur`, and `focus` methods are included.

```ts
export const focusFirstMenuItem();
export const focusPreviousMenuItem();
export const focusNextMenuItem();
export const focusLastMenuItem();
```

## Anatomy

```svelte
<div class="sterling-menu">
  <div class="menu-items">
    <slot {variant} />
  </div>
</div>
```
