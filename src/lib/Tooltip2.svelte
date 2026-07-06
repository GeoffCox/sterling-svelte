<svelte:options runes={true} />

<script lang="ts">
  import { onMount } from 'svelte';
  import Popover2 from './Popover2.svelte';
  import type { Tooltip2Props } from './Tooltip2.types';

  let {
    children,
    disabled = false,
    hoverDelayMilliseconds = 1000,
    onOpen,
    open = $bindable(false),
    tip,
    ...rest
  }: Tooltip2Props = $props();

  const uuid = $props.id();
  const anchorCssName = `--tooltip-${uuid}`;

  let divElement = $state<HTMLDivElement | undefined>();
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
    onOpen?.(open);
  });

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

    const element = divElement;
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
    divElement;
    autoShowUpdate();
  });

  // ----- EventHandlers ----- //

  onMount(() => {
    autoShowUpdate();
  });
</script>

<div
  bind:this={divElement}
  class="sterling-tooltip-2"
  style={`--tooltipAnchorCssName: ${anchorCssName}`}
>
  {@render children?.()}
</div>
<Popover2 bind:open {...rest} class={[rest.class, 'callout']} {anchorCssName}>
  {#if tip}
    {#if typeof tip === 'string'}
      {tip}
    {:else}
      {@render tip()}
    {/if}
  {/if}
</Popover2>
