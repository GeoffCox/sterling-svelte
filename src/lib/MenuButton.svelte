<svelte:options runes={true} />

<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  import type { MenuItemContext } from './MenuItem.types';

  import { setContext, tick, type Snippet } from 'svelte';

  import Button from './Button.svelte';
  import Menu from './Menu.svelte';
  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';
  import Popover from './Popover.svelte';
  import { clickOutside } from './actions/clickOutside';
  import type { PopoverPlacement } from './Popover.types';

  const uuid = $props.id();

  type Props = HTMLButtonAttributes & {
    items: Snippet;
    menuClass?: string;
    onOpen?: (value: string) => void;
    onClose?: (value: string) => void;
    onSelect?: (value: string) => void;
    open?: boolean | null | undefined;
    popoverPlacement?: PopoverPlacement;
    value?: string;
  };

  let {
    children,
    class: _class,
    items,
    menuClass,
    open = $bindable(false),
    onClose,
    onOpen,
    onSelect,
    popoverPlacement = 'bottom-start',
    value,
    ...rest
  }: Props = $props();

  const instanceId = `MenuButton-${uuid}`;

  let buttonRef: Button;
  let openValues: string[] = $state([]);
  let menuRef: Menu;
  let menuId = $derived(`${value}-menu-${instanceId}`);
  let prevOpen = $state(open);
  let reference: HTMLDivElement | undefined = $state();

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

  const onClick = async () => {
    if (!open) {
      openValues = ['menu-button'];
      open = true;
      await tick();
      menuRef?.focusFirstMenuItem();
    } else {
      open = false;
      openValues = [];
    }
  };

  const closeAllMenus = () => {
    openValues = [];
    open = false;
  };

  const onClickOutside = (event: MouseEvent) => {
    let element: HTMLElement | null = event.target as HTMLElement;
    while (element) {
      if (element.getAttribute('data-root-value') === value) {
        return;
      }
      element = element.parentElement;
    }
    closeAllMenus?.();
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
    rootValue: value,
    closeContainingMenu: () => {
      open = false;
    },
    onOpen,
    onClose,
    onSelect
  });
</script>

<Button
  bind:this={buttonRef}
  aria-controls={menuId}
  aria-expanded={!!open}
  aria-haspopup={!!children}
  aria-owns={menuId}
  class={['sterling-menu-button', _class]}
  data-value={value}
  data-root-value={value}
  {...rest}
  onclick={onClick}
>
  <div
    class="reference"
    bind:this={reference}
    use:clickOutside={{ onclickoutside: onClickOutside }}
  >
    {@render children?.()}
  </div>
  <Popover {reference} {open} placement={popoverPlacement}>
    <Menu bind:this={menuRef} id={menuId} class={menuClass}>
      {@render items?.()}
    </Menu>
  </Popover>
</Button>
