<svelte:options runes={true} />

<script lang="ts">
  import type { KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';
  import { slide, type SlideParams, type TransitionConfig } from 'svelte/transition';
  import { clickOutside } from './actions/clickOutside';
  import { prefersReducedMotion } from './mediaQueries/prefersReducedMotion';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import Popover from './Popover.svelte';
  import type { DropdownProps } from './Dropdown.types';

  const uuid = $props.id();

  const popoverId = `Dropdown-Popover-${uuid}`;

  let {
    button,
    buttonIcon,
    class: _class,
    children,
    disabled = false,
    icon,
    open = $bindable(false),
    onOpen,
    stayOpenOnClickAway = false,
    value,
    ...rest
  }: DropdownProps = $props();

  icon = icon || buttonIcon || button;

  // svelte-ignore non_reactive_update
  let dropdownRef: HTMLDivElement | undefined = $state(undefined);

  // svelte-ignore non_reactive_update
  let popupContentRef: HTMLDivElement | undefined = $state(undefined);

  // ----- Reactions ----- //

  $effect(() => {
    onOpen?.(open);
  });

  // ----- Methods ----- //

  export const click = () => {
    dropdownRef?.click();
  };

  export const blur = () => {
    dropdownRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    dropdownRef?.focus(options);
  };

  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      open = !open;
      event.preventDefault();
      event.stopPropagation();
    }

    rest.onclick?.(event);
  };

  const onKeydown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case ' ':
          open = !open;
          event.preventDefault();
          event.stopPropagation();
        case 'Escape':
          open = false;
          event.preventDefault();
          event.stopPropagation();
      }
    }

    rest.onkeydown?.(event);
  };

  const onClickOutside = (event: MouseEvent) => {
    if (!stayOpenOnClickAway) {
      open = false;
    }
  };

  // ----- Animation ----- //

  const slideNoOp = (node: Element, params?: SlideParams): TransitionConfig => {
    return { delay: 0, duration: 0 };
  };

  let slideMotion = $derived(!$prefersReducedMotion ? slide : slideNoOp);
</script>

<div
  bind:this={dropdownRef}
  aria-controls={popoverId}
  aria-haspopup={true}
  aria-expanded={open}
  class={['sterling-dropdown', _class]}
  class:disabled
  class:open
  class:using-keyboard={$usingKeyboard}
  role="combobox"
  tabindex="0"
  use:clickOutside={{ ignoreOthers: [popupContentRef!], onclickoutside: onClickOutside }}
  {...rest}
  onclick={onClick}
  onkeydown={onKeydown}
>
  <div class="value">
    {#if value}
      {#if typeof value === 'string'}
        {value}
      {:else}
        {@render value()}
      {/if}
    {/if}
  </div>
  <div class="button icon">
    {#if icon}
      {@render icon()}
    {:else}
      <div class="chevron"></div>
    {/if}
  </div>

  <Popover id={popoverId} reference={dropdownRef} open={!disabled && open} placement="bottom-start">
    <div
      class={['sterling-dropdown-popup-content', 'sterling-dropdown-content', _class]}
      transition:slideMotion|global={{ duration: 200 }}
      bind:this={popupContentRef}
    >
      {@render children?.()}
    </div>
  </Popover>
</div>
