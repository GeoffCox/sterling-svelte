<svelte:options runes={true} />

<script lang="ts">
  import { onMount, type Snippet } from 'svelte';

  import Callout from './Callout.svelte';
  import type { PopoverPlacement } from './Popover.types';
  import type { CalloutProps } from './Callout.types';
  import { mergeClasses } from './mergeClasses';

  type Props = Omit<CalloutProps, 'reference'> & {
    disabled?: boolean;
    hoverDelayMilliseconds?: number;
    tip?: string | Snippet;
  };

  let {
    children,
    class: _class,
    disabled = false,
    hoverDelayMilliseconds = 1000,
    open = $bindable(false),
    tip,
    ...rest
  }: Props = $props();

  let originRef: HTMLDivElement | undefined = $state();

  let reference = $derived(
    !!children ? (originRef?.previousElementSibling as HTMLElement) : undefined
  );

  $inspect({ reference });

  const show = () => {
    if (!disabled) {
      open = true;
    }
  };

  const hide = () => (open = false);

  const delayShow = () => {
    hoverDelayMilliseconds === 0
      ? show()
      : setTimeout(() => {
          show();
        }, hoverDelayMilliseconds);
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
<div class={mergeClasses('sterling-tooltip-origin', _class)} bind:this={originRef}></div>
<Callout class={mergeClasses('sterling-tooltip-callout', _class)} {open} {reference} {...rest}>
  {#if tip}
    {#if typeof tip === 'string'}
      {tip}
    {:else}
      {@render tip()}
    {/if}
  {/if}
</Callout>
