<script lang="ts">
  import Tooltip from '$lib/Tooltip.svelte';
  import { onDestroy, onMount } from 'svelte';

  export let noEvents = false;

  let events: { message: string; timestamp: Date }[] = [];

  export const recordEvent = (message: string) => {
    const now = new Date();
    events = [{ message, timestamp: now }, ...events.slice(0, 4)];
  };

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
    <div class="configuration">
      {#if $$slots.props}
        <div class="props panel">
          <h2>Props</h2>
          <slot name="props">(none)</slot>
        </div>
      {/if}
      {#if $$slots.tweaks}
        <div class="tweaks panel">
          <h2>Tweaks</h2>
          <slot name="tweaks">(none)</slot>
        </div>
      {/if}
      {#if $$slots.status}
        <div class="status panel">
          <h2>Status</h2>
          <slot name="status">(none)</slot>
        </div>
      {/if}
      {#if !noEvents}
        <div class="events panel">
          <h2>Events <small>(newest to oldest)</small></h2>
          <div class="event-list">
            {#each events as event}
              <div class="event-message">{event.message}</div>
              <div class="event-timestamp">&nbsp;@{event.timestamp.getMilliseconds()}</div>
            {/each}
          </div>
        </div>
      {/if}
      <slot />
    </div>
  {/if}
</div>

<style>
  .example {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    align-items: flex-start;
    justify-items: flex-start;
    row-gap: 2em;
    padding: 2em;
  }

  .component {
    border: 1px dashed var(--stsv-Common__border-color);
    border-radius: 10px;
    box-sizing: border-box;
    display: block;
    padding: 15px;
    width: max-content;
  }

  .configuration {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-auto-rows: auto;
    justify-items: stretch;
    column-gap: 1em;
    width: 100%;
  }

  .panel {
    border: 2px double var(--stsv-Common__border-color);
    padding: 1em;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: 1em;
    place-items: flex-start;
    place-content: flex-start;
  }

  .event-list {
    display: grid;
    grid-template-columns: 1fr auto;
    width: 100%;
  }

  .event-message,
  .event-timestamp {
    display: inline;
  }

  .event-timestamp {
    color: var(--stsv-Info__color);
  }

  h2 {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    margin: 0;
    padding: 0;
    font-size: 1.2em;
    font-weight: normal;
  }
</style>
