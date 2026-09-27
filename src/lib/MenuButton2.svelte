<svelte:options runes={true} />

<script lang="ts">
  import { setContext, tick, type Snippet } from 'svelte';
  import Button from './Button.svelte';
  import Menu from './Menu.svelte';
  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';
  import type { MenuItemContext } from './MenuItem.types';
  import type { MenuButton2Props } from './MenuButton2.types';
  import Popover2 from './Popover2.svelte';

  const uuid = $props.id();

  const menuButtonId = `Menu-Button${uuid}`;
  const popoverId = `MenuButtonPopover-${uuid}`;

  let {
    allowFlip = 'both',
    children,
    class: _class,
    items,
    menuClass,
    open = $bindable(false),
    onClose,
    onOpen,
    onSelect,
    menuAnchorOrigin = 'bottom-left',
    menuPlacement = 'bottom-right',
    value,
    ...rest
  }: MenuButton2Props = $props();

  let buttonRef: Button;
  let openValues: string[] = $state([]);
  let menuRef: Menu;
  let menuId = $derived(`${value}-menu-${menuButtonId}`);
  let prevOpen = $state(open);

  export const click = () => {
    buttonRef?.click();
  };

  export const blur = () => {
    buttonRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    buttonRef?.focus(options);
  };

  // update open based on openValues
  $effect(() => {
    open = openValues.length > 0;
  });

  // update openValues based on open
  $effect(() => {
    if (open) {
      openValues = openValues.length > 0 ? openValues : ['menu-button'];
      menuRef?.focusFirstMenuItem();
    } else {
      openValues = openValues.length === 0 ? openValues : [];
    }
  });

  // focus when closing
  $effect(() => {
    if (!open && open !== prevOpen) {
      focus();
    }
    prevOpen = open;
  });

  const closeAllMenus = () => {
    openValues = [];
    open = false;
  };

  // ----- Context ----- //

  setContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY, {
    depth: 1,
    get openValues() {
      return openValues;
    },
    set openValues(value: string[]) {
      openValues = value;
    },
    get rootValue() {
      return value;
    },
    closeContainingMenu: () => {
      open = false;
    },
    onOpen: (value) => {
      onOpen?.(value);
    },
    onClose: (value) => {
      onClose?.(value);
    },
    onSelect: (value) => {
      onSelect?.(value);
    }
  });
</script>

<Button
  bind:this={buttonRef}
  aria-controls={menuId}
  aria-expanded={!!open}
  aria-haspopup={!!children}
  aria-owns={menuId}
  class={['sterling-menu-button-2', _class]}
  data-value={value}
  data-root-value={value}
  {...rest}
  popovertarget={popoverId}
>
  {@render children?.()}
</Button>

<Popover2
  id={popoverId}
  {allowFlip}
  anchorOrigin={menuAnchorOrigin}
  bind:open
  placement={menuPlacement}
>
  <Menu bind:this={menuRef} id={menuId} class={menuClass}>
    {@render items?.()}
  </Menu>
</Popover2>
