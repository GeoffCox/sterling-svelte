<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  export let code: string | undefined = undefined;

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
    <div class="configuration">
      {#if $$slots.props}
        <div class="section-name">Props</div>
        <div class="props">
          <slot name="props">(none)</slot>
        </div>
      {/if}
      {#if $$slots.tweaks}
        <div class="section-name">Tweaks</div>
        <div class="tweaks">
          <slot name="tweaks">(none)</slot>
        </div>
      {/if}
    </div>
    <div class="component">
      <slot name="component" />
    </div>
  {/if}
  {#if code}
    <div class="code">
      <div class="section-name">Code</div>
      <pre>{code}</pre>
    </div>
  {/if}
</div>

<style>
  .example {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    align-items: flex-start;
    justify-items: flex-start;
    column-gap: 2em;
    border-bottom: 1px dashed var(--stsv-common__border-color);
    border-top: 1px dashed var(--stsv-common__border-color);
  }

  .section-name {
    font-weight: bold;
  }

  .component {
    padding: 1em;
    width: max-content;
  }

  .configuration {
    border-right: 1px dashed var(--stsv-common__border-color);
    padding: 1em;
  }

  .code {
    justify-self: stretch;
    grid-column-start: 1;
    grid-column-end: 4;
    padding: 1em;
    border-top: 1px dashed var(--stsv-common__border-color);
  }

  .props,
  .tweaks {
    margin: 0.5em 0.5em 1em 0.5em;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: 1em;
    place-items: flex-start;
    place-content: flex-start;
  }
</style>
