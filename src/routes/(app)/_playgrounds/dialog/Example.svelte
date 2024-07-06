<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  onDestroy(() => {
    mounted = false;
  });
</script>

<div class="example">
  {#if mounted}
    <div class="component">
      <slot name="component" />
    </div>
  {/if}
</div>

<style>
  .example {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    place-items: center;
    place-content: center;
    row-gap: 2em;
    padding: 2em;
  }

  .component {
    border: 1px dashed lightgray;
    border-radius: 10px;
    box-sizing: border-box;
    display: block;
    padding: 15px;
    width: max-content;
  }
</style>
