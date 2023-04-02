<script>
    import Playground from './MenuItemPlayground.svelte';
</script>

# MenuItem

A clickable item within a menu.

- Support item, checkbox, or radio roles.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let checked = false;
  let composed = false;
  let disabled = false;
  let open = false;
  let value: string;
  let role: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' = 'menuitem';
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
    rootValue?: string;
    depth?: number;

    register?: (menuItem: MenuItemRegistration) => void;
    unregister?: (menuItem: MenuItemRegistration) => void;

    focusPrevious?: (currentValue: string) => void;
    focusNext?: (currentValue: string) => void;

    closeMenu?: (recursive?: boolean) => void;

    onOpen?: (value: string) => void;
    onClose?: (value: string) => void;
    onSelect?: (value: string) => void;
  };
</script>

<!-- Anatomy -->

<button>
  <slot name="item" {checked} {depth} {disabled} {hasChildren} {open} {role} {text} {value} />
  <Menu>
    <slot {depth} {disabled} />
  </Menu>
</button>
```
