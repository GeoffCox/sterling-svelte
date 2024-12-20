<svelte:options runes={true} />

<script lang="ts">
  import { type Snippet } from 'svelte';
  import type { HTMLAttributes, KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';

  import Popover from './Popover.svelte';

  import { clickOutside } from './actions/clickOutside';
  import { idGenerator } from './idGenerator';
  import { prefersReducedMotion } from './mediaQueries/prefersReducedMotion';
  import { slide, type SlideParams, type TransitionConfig } from 'svelte/transition';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  const popupId = idGenerator.nextId('Dropdown-popup');

  type Props = HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean | null | undefined;
    open?: boolean | null | undefined;
    stayOpenOnClickAway?: boolean | null | undefined;
    onOpen?: (open: boolean | null | undefined) => void;
    button?: Snippet;
    buttonIcon?: Snippet;
    value?: string | Snippet;
  };

  let {
    class: _class,
    children,
    disabled = false,
    open = $bindable(false),
    onOpen,
    stayOpenOnClickAway = false,
    button,
    buttonIcon,
    value,
    ...rest
  }: Props = $props();

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
  aria-controls={popupId}
  aria-haspopup={true}
  aria-expanded={open}
  class={`sterling-dropdown ${_class}`}
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
  <div class="button">
    {#if button}
      {@render button()}
    {:else if buttonIcon}
      {@render buttonIcon()}
    {:else}
      <div class="chevron"></div>
    {/if}
  </div>

  <Popover reference={dropdownRef} open={!disabled && open} placement="bottom-start">
    <div
      class={`sterling-dropdown-popup-content ${_class}`}
      transition:slideMotion|global={{ duration: 200 }}
      bind:this={popupContentRef}
    >
      {@render children?.()}
    </div>
  </Popover>
</div>
