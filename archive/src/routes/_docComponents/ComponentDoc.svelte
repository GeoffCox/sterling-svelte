<script lang="ts">
  import type { ComponentDocData } from '../documentation.types';
  import AnatomyDoc from './AnatomyDoc.svelte';
  import CodeDoc from './CodeDoc.svelte';
  import EventDoc from './EventDoc.svelte';
  import MethodDoc from './MethodDoc.svelte';
  import PropDoc from './PropDoc.svelte';
  import ProseDoc from './ProseDoc.svelte';
  import SlotDoc from './SlotDoc.svelte';

  export let docData: ComponentDocData;
</script>

<h1>{docData.name}</h1>
<p>{docData.description}</p>

{#if docData.playground}
  <svelte:component this={docData.playground.component} />
{/if}

{#if docData.features}
  <h2>Features</h2>
  <ul>
    {#each docData.features as feature}
      <li>
        <ProseDoc docData={feature} />
      </li>
    {/each}
  </ul>
{/if}

{#if docData.interactions}
  <h2>Interactions</h2>
  <ul>
    {#each docData.interactions as interaction}
      <li>
        <ProseDoc docData={interaction} />
      </li>
    {/each}
  </ul>
{/if}

{#if docData.usages}
  <h2>Usage</h2>

  {#each docData.usages as usage}
    <CodeDoc docData={usage} />
  {/each}
{/if}

{#if docData.props}
  <h2>Props</h2>
  <table>
    <thead>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </thead>
    <tbody>
      {#each docData.props as prop}
        <PropDoc docData={prop} />
      {/each}
    </tbody>
  </table>
{/if}

{#if docData.events}
  <h2>Events</h2>
  <table>
    <thead>
      <th>Event</th>
      <th>Args</th>
      <th>Description</th>
    </thead>
    <tbody>
      {#each docData.events as event}
        <EventDoc docData={event} />
      {/each}
    </tbody>
  </table>
{/if}

{#if docData.methods}
  <h2>Methods</h2>
  <table>
    <thead>
      <th>Method</th>
      <th>Params</th>
      <th>Returns</th>
      <th>Description</th>
    </thead>
    <tbody>
      {#each docData.methods as method}
        <MethodDoc docData={method} />
      {/each}
    </tbody>
  </table>
{/if}

{#if docData.anatomy}
  <h2>Anatomy</h2>
  <ul>
    <AnatomyDoc docData={docData.anatomy} />
  </ul>
{/if}

{#if docData.slots}
  <h2>Slots</h2>
  <table>
    <thead>
      <th>Slot</th>
      <th>Description</th>
      <th>Let Params</th>
    </thead>
    <tbody>
      {#each docData.slots as slot}
        <SlotDoc docData={slot} />
      {/each}
    </tbody>
  </table>
{/if}
