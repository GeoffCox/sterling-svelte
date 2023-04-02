<script lang="ts">
  import { children } from 'svelte/internal';
  import type { AnatomyDocData, PropDocData } from '../documentation.types';
  import InlineTypeDoc from './InlineTypeDoc.svelte';

  export let docData: AnatomyDocData | undefined;
</script>

{#if docData}
  <li>
    <b>{docData.name}</b>
    {#if docData.element}
      <span> ({docData.element})</span>
    {/if}
    {#if docData.description}
      <span> - {docData.description}</span>
    {/if}
    {#if docData.children}
      <ul>
        {#each docData.children as child}
          <svelte:self docData={child} />
        {/each}
      </ul>
    {/if}
  </li>
{/if}
