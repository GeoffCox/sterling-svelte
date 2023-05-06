<script>
    import Playground from './MenuItemPlayground.svelte';
</script>

# MenuItem

A clickable item within a menu.

- Support item, checkbox, or radio roles.
- By default, renders a MenuItemDisplay supporting checkbox and radio indicators, text, and submenu chevron.

<Playground />

```svelte
<script lang="ts">
  // ----- Types ----- //

  type MenuItemRole = 'menuitem' | 'menuitemcheckbox' | 'menuitemradio';

  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let checked = false;
  let composed = false;
  let disabled = false;
  let value: string;
  let role: MenuItemRole = 'menuitem';
  let text: string | undefined = undefined;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  dispatch('close', { value });
  dispatch('open', { value });
  dispatch('select', { value });

  // ----- Methods ----- //

  function blur();
  function click();
  function focus(options: FocusOptions);

  // ----- Context ----- //
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
</script>

<!-- Anatomy -->

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
    <MenuItemDisplay {checked} {disabled} {hasChildren} {isMenuBarItem} menuItemRole={role}
      >{text}</MenuItemDisplay
    >
  </slot>
  <Menu>
    <slot {depth} {disabled} />
  </Menu>
</button>
```
