<script lang="ts">
  import type { MenuItemContext } from './MenuItem.types';

  import { createEventDispatcher, setContext, tick } from 'svelte';
  import { writable } from 'svelte/store';

  import Button from './Button.svelte';
  import Menu from './Menu.svelte';
  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';
  import { idGenerator } from './idGenerator';
  import Popover from './Popover.svelte';
  import { clickOutside } from './actions/clickOutside';
  import type { ClickOutsideEvent } from './@types/clickOutside';
  import type { PopoverPlacement } from './Popover.types';

  // ----- Props ----- //

  export let open = false;

  export let menuVariant: string = '';

  export let popoverPlacement: PopoverPlacement = 'bottom-start';

  export let value: string;

  export let variant: string = '';

  // ----- State ----- //

  const instanceId = idGenerator.nextId('MenuButton');

  let buttonRef: Button;
  let reference: HTMLDivElement;
  let menuRef: Menu;
  let prevOpen = open;

  $: menuId = `${value}-menu-${instanceId}`;
  $: hasChildren = $$slots.items;

  const openValues = writable<string[]>([]);

  $: {
    open = $openValues.length > 0;
  }

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseClose = (value: string) => {
    dispatch('close', { value });
  };

  const raiseOpen = (value: string) => {
    dispatch('open', { value });
  };

  const raiseSelect = (value: string) => {
    dispatch('select', { value });
  };

  // ----- Methods ----- //

  export const click = () => {
    buttonRef?.click();
  };

  export const blur = () => {
    buttonRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    buttonRef?.focus(options);
  };

  // ----- Event Handlers ----- //

  const onClick = async () => {
    if (!open) {
      openValues.set(['menu-button']);
      await tick();
      menuRef?.focusFirstMenuItem();
    } else {
      open = false;
      openValues.set([]);
    }
  };

  $: {
    if (!open && open !== prevOpen) {
      focus();
    }
    prevOpen = open;
  }

  const closeAllMenus = () => {
    openValues.set([]);
  };

  const onClickOutside = (event: ClickOutsideEvent) => {
    const {
      detail: { mouseEvent }
    } = event;
    let element: HTMLElement | null = mouseEvent.target as HTMLElement;
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
    openValues,
    rootValue: value,
    closeContainingMenu: () => {
      open = false;
    },
    onOpen: raiseOpen,
    onClose: raiseClose,
    onSelect: raiseSelect
  });
</script>

<Button
  bind:this={buttonRef}
  aria-controls={menuId}
  aria-expanded={open}
  aria-haspopup={hasChildren}
  aria-owns={menuId}
  data-value={value}
  data-root-value={value}
  class={`sterling-menu-button ${variant}`}
  on:blur
  on:click
  onclick={onClick}
  on:dblclick
  on:dragend
  on:dragenter
  on:dragleave
  on:dragover
  on:dragstart
  on:drop
  on:focus
  on:focusin
  on:focusout
  on:keydown
  on:keypress
  on:keyup
  on:mousedown
  on:mouseenter
  on:mouseleave
  on:mousemove
  on:mouseover
  on:mouseout
  on:mouseup
  on:pointercancel
  on:pointerdown
  on:pointerenter
  on:pointerleave
  on:pointermove
  on:pointerover
  on:pointerout
  on:pointerup
  on:wheel
  {...$$restProps}
>
  <div class="reference" bind:this={reference} use:clickOutside on:click_outside={onClickOutside}>
    <slot {open} {value} {variant} />
  </div>
  <Popover {reference} {open} placement={popoverPlacement}>
    <Menu bind:this={menuRef} id={menuId} class={menuVariant}>
      <slot name="items" />
    </Menu>
  </Popover>
</Button>
