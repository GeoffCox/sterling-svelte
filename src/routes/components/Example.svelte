<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  let events: { message: string; timestamp: Date }[] = [];

  export const recordEvent = (message: string) => {
    const now = new Date();
    events = [...events.slice(-4), { message, timestamp: now }];
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
    <div class="status panel">
      <h2>Status</h2>
      <slot name="status">(none)</slot>
    </div>
    <div class="options panel">
      <h2>Options</h2>
      <slot name="options">(none)</slot>
    </div>
    <div class="events panel">
      <h2>Events</h2>
      {#each events as event}
        <div class="event">
          <div class="event-message">{event.message}</div>
          <div class="event-timestamp">&nbsp;@{event.timestamp.getMilliseconds()}</div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .example {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    align-items: flex-start;
    justify-items: stretch;
    column-gap: 2em;
    padding: 2em;
  }

  .component {
    grid-row: 1 / span 3;
    grid-column: 2 / span 1;
    border: 1px dashed lightgray;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    align-items: start;
  }

  .options {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
  }

  .status {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
  }

  .events {
    grid-row: 3 / span 1;
    grid-column: 1 / span 1;
  }

  .panel {
    border: 2px double var(--Common__border-color);
    color: var(--Layer__color--1);
    padding: 1em;
    display: flex;
    flex-direction: column;
    row-gap: 1em;
    align-items: flex-start;
    margin-bottom: 1em;
    min-width: 350px;
  }

  .event {
    display: inline-block;
  }

  .event-message,
  .event-timestamp {
    display: inline;
  }

  .event-timestamp {
    color: var(--Display__color--info);
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
