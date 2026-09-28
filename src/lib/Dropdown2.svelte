<svelte:options runes={true} />

<script lang="ts">
  import type { KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import Popover2 from './Popover2.svelte';
  import { type Dropdown2Props } from './Dropdown2.types';

  const uuid = $props.id();

  const popoverId = `Dropdown-Popover-${uuid}`;

  let {
    allowFlip = 'both',
    anchorOrigin = 'bottom-left',
    class: _class,
    children,
    disabled = false,
    icon,
    lightDismiss = true,
    open = $bindable(false),
    onOpen,
    offsetX,
    offsetY,
    placement = 'bottom-right',
    value,
    ...rest
  }: Dropdown2Props = $props();

  let dropdownElement = $state<HTMLDivElement>();

  export const click = () => {
    dropdownElement?.click();
  };

  export const blur = () => {
    dropdownElement?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    dropdownElement?.focus(options);
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

  $effect(() => {
    onOpen?.(open);
  });
</script>

<div
  bind:this={dropdownElement}
  aria-controls={popoverId}
  aria-haspopup={true}
  aria-expanded={open}
  class={['sterling-dropdown-2', _class]}
  class:disabled
  class:open
  class:using-keyboard={$usingKeyboard}
  role="combobox"
  tabindex="0"
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
</div>

<Popover2
  id={popoverId}
  {allowFlip}
  anchor={dropdownElement}
  {anchorOrigin}
  {lightDismiss}
  {offsetX}
  {offsetY}
  bind:open
  {placement}
>
  <div class={['sterling-dropdown-2-content', _class]}>
    {@render children?.()}
  </div>
</Popover2>
