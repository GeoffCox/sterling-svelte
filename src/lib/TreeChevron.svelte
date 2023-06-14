<script lang="ts">
  import { onMount } from 'svelte';

  export let expanded = false;
  export let hasChildren = false;

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
  class="tree-chevron"
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

<style>
  .tree-chevron {
    position: relative;
    border: none;
    background: none;
    height: 1em;
    width: 1em;
    transform-origin: 50% 50%;
  }

  .tree-chevron::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    width: 7px;
    height: 7px;
    border-right: 3px solid currentColor;
    border-top: 3px solid currentColor;
  }

  :not(.expanded):not(.animate)::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .expanded:not(.animate)::after {
    transform: translate(-50%, -70%) rotate(135deg);
  }

  @keyframes rotate-collapse {
    from {
      transform: translate(-50%, -70%) rotate(135deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  @keyframes rotate-expand {
    from {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    to {
      transform: translate(-50%, -70%) rotate(135deg);
    }
  }

  :not(.expanded).animate::after {
    animation-name: rotate-collapse;
    animation-duration: 100ms;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .expanded.animate::after {
    animation-name: rotate-expand;
    animation-duration: 100ms;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .tree-chevron.leaf::after {
    animation: none;
    content: '';
    position: absolute;
    font: inherit;
    left: 50%;
    top: 50%;
    width: 0.35em;
    height: 0.35em;
    background: currentColor;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  @media (prefers-reduced-motion) {
    :not(.expanded).animate::after {
      animation: none;
      transform: translate(-50%, -50%) rotate(45deg);
    }
    .expanded.animate::after {
      animation: none;
      transform: translate(-50%, -70%) rotate(135deg);
    }
  }
</style>
