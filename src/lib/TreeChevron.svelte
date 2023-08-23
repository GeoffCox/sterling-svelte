<script lang="ts">
  import { onMount } from 'svelte';

  /** When true, the chevron rotates to indicate children are visible. */
  export let expanded = false;

  /** When true, the chevron is displayed, otherwise a dot is displayed. */
  export let hasChildren = false;

  /** Additional class names to apply. */
  export let variant: string = '';

  let previousExpanded = expanded;
  let mounted = false;

  onMount(() => {
    setTimeout(() => {
      mounted = true;
    }, 0);
  });

  let animate = false;
  $: {
    if (expanded !== previousExpanded && mounted) {
      animate = true;
    }
    previousExpanded = expanded;
  }
</script>

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
