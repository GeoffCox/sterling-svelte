<script>
    import Playground from './MenuItemPlayground.svelte';
</script>

# MenuItem

A styled HTML `button` providing an item within a menu.

## Types

The context and registration provide a communication channel across the portaled menu hierarchy.

```ts
export type MenuItemRole = 'menuitem' | 'menuitemcheckbox' | 'menuitemradio';

export type MenuItemRegistration = {
  value: string;
  open: () => void;
  close: () => void;
  focus: () => void;
};

export type MenuItemContext = {
  isMenuBarItem?: boolean;
  openValues: Writable<string[]>;
  rootValue?: string;
  depth?: number;
  closeContainingMenu?: () => void;
  onOpen?: (value: string) => void;
  onClose?: (value: string) => void;
  onSelect?: (value: string) => void;
};
```

## Props

HTMLButtonElement props are included.

```ts
/**
 * When true, the menu item is checked.
 * Use with role='menuitemcheckbox' or role='menuitemradio'.
 */
export let checked = false;

/** When true, the menu item is disabled. */
export let disabled = false;

/** The role of the menu item. */
export let role: MenuItemRole = 'menuitem';

/** The text of the menu item. Not used when the item slot is filled.*/
export let text: string | undefined = undefined;

/** The value uniquely identifying this menu item within the menu hierarchy. */
export let value: string;

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLButtonElement events are included.

```ts
dispatch('close', { value });
dispatch('open', { value });
dispatch('select', { value });
```

## Methods

HTMLButtonElement `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<button class="sterling-menu-item">
  <div class="item">
    <slot
      name="item"
      {checked}
      {depth}
      {disabled}
      {hasChildren}
      {isMenuBarItem}
      {open}
      {role}
      {text}
      {value}
      {variant}
    >
      <MenuItemDisplay>{text}</MenuItemDisplay>
    </slot>
  </div>
  <Popover>
    <Menu>
      <slot {depth} {disabled} />
    </Menu>
  </Popover>
</button>
```

## Playground

<Playground />
