<script lang="ts">
  import { onMount } from 'svelte';

  export let expanded = false;
  export let hasChildren = false;

  let lastValue = expanded;

  let mounted = false;

  onMount(() => {
    setTimeout(() => {
      mounted = true;
    }, 10);
  });

  let animate = false;
  $: {
    if (expanded !== lastValue && mounted) {
      animate = true;
    }
    lastValue = expanded;
  }
</script>

{#if hasChildren}
  <div class="tree-item-chevron" class:animate class:expanded />
{:else}
  <div class="tree-item-leaf" />
{/if}

<style>
  .tree-item-chevron {
    position: relative;
    border: none;
    background: none;
    height: 1em;
    width: 1em;
    transform-origin: 50% 50%;
  }

  .tree-item-chevron::after {
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

  .tree-item-leaf {
    border: none;
    background: none;
    height: 1em;
    width: 1em;
    position: relative;
  }

  .tree-item-leaf::after {
    content: '';
    position: absolute;
    font: inherit;
    left: 50%;
    top: 50%;
    width: 0.35em;
    height: 0.35em;
    background: currentColor;
    border-radius: 50%;
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
