<svelte:options runes={true} />

<script lang="ts">
  import { onMount } from 'svelte';
  import Callout from './Callout.svelte';
  import type { TooltipProps } from './Tooltip.types';

  let {
    children,
    class: _class,
    disabled = false,
    hoverDelayMilliseconds = 1000,
    open = $bindable(false),
    tip,
    ...rest
  }: TooltipProps = $props();

  let originRef: HTMLDivElement | undefined = $state();

  let reference = $derived(
    !!children ? (originRef?.previousElementSibling as HTMLElement) : undefined
  );

  let delayShowTimeout: NodeJS.Timeout | undefined;

  const show = () => {
    if (!disabled) {
      open = true;
    }
  };

  const hide = () => {
    delayShowTimeout && clearTimeout(delayShowTimeout);
    open = false;
  };

  const delayShow = () => {
    if (hoverDelayMilliseconds === 0) {
      show();
    } else {
      delayShowTimeout && clearTimeout(delayShowTimeout);
      delayShowTimeout = setTimeout(() => {
        show();
      }, hoverDelayMilliseconds);
    }
  };

  $effect(() => {
    if (disabled) {
      hide();
    }
  });

  // ----- Event Listeners ----- //

  let cleanupAutoShowUpdate = () => {};

  const autoShowUpdate = () => {
    cleanupAutoShowUpdate();
    cleanupAutoShowUpdate = () => {};

    const element = reference;
    open = false;

    if (element) {
      element.addEventListener('mouseenter', delayShow);
      element.addEventListener('mouseleave', hide);
      cleanupAutoShowUpdate = () => {
        element.removeEventListener('mouseenter', delayShow);
        element.removeEventListener('mouseleave', hide);
      };
    }
  };

  $effect(() => {
    reference;
    autoShowUpdate();
  });

  // ----- EventHandlers ----- //

  onMount(() => {
    autoShowUpdate();
  });
</script>

{@render children?.()}
<div class={['sterling-tooltip-origin', _class]} bind:this={originRef}></div>
<Callout
  class={['sterling-tooltip-callout', _class]}
  {open}
  {reference}
  mainAxisOffset={8}
  {...rest}
>
  {#if tip}
    {#if typeof tip === 'string'}
      {tip}
    {:else}
      {@render tip()}
    {/if}
  {/if}
</Callout>
