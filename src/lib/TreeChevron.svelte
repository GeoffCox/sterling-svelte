<script lang="ts">
  import { onMount } from 'svelte';

  // ----- Props ----- //

  /** When true, the chevron rotates to indicate children are visible. */
  export let expanded = false;

  /** When true, the chevron is displayed, otherwise a dot is displayed. */
  export let hasChildren = false;

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- State ----- //

  let previousExpanded = expanded;
  let mounted = false;

  // ----- Event Handlers ----- //

  onMount(() => {
    setTimeout(() => {
      mounted = true;
    }, 0);
  });

  // ----- Animation ----- //

  let animate = false;
  $: {
    if (expanded !== previousExpanded && mounted) {
      animate = true;
    }
    previousExpanded = expanded;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={`sterling-tree-chevron ${variant}`}
  class:leaf={!hasChildren}
  class:animate
  class:expanded
  on:blur
  on:click
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
  on:wheel|passive
  {...$$restProps}
/>
