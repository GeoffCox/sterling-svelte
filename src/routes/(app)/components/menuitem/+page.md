<script>
    import Playground from './MenuItemPlayground.svelte';
</script>

# MenuItem

A styled HTML `button` providing a clickable item within a menu.

## Types

The context and registration provide a communication channel for menu items across the menu hierarchy.
This is necessary since menus are Popover components portaled to appear on top of page content.

```ts
type MenuItemRole = 'menuitem' | 'menuitemcheckbox' | 'menuitemradio';

type MenuItemRegistration = {
  value: string;
  open: () => void;
  close: () => void;
  focus: () => void;
};

type MenuItemContext = {
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
/** If the menu item is checked. Used when role='menuitemcheckbox' or role='menuitemradio'*/
export let checked = false;

/** When true, applies colorful theme styles. */
export let colorful = false;

/** When true, allows the container to handle borders and focus borders.  */
export let composed = false;

/** If the menu item is disabled. */
export let disabled = false;

/** The role of the menu item */
export let role: MenuItemRole = 'menuitem';

/** The text of the menu item when the item slot is not filled.*/
export let text: string | undefined = undefined;

/** The value uniquely identifying this menu item within the menu hierarchy. */
export let value: string;
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

By default, the item slot contains a MenuItemDisplay rendering checkbox and radio indicators, text, and submenu chevron.

```svelte
<button>
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
  >
    <MenuItemDisplay>{text}</MenuItemDisplay>
  </slot>
  <Popover>
    <Menu>
      <slot {depth} {disabled} />
    </Menu>
  </Popover>
</button>
```

## Playground

<Playground />
