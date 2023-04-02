<script lang="ts">
  import type { EventDocData, MethodDocData } from '../documentation.types';
  import InlineParamDoc from './InlineParamDoc.svelte';
  import InlineTypeDoc from './InlineTypeDoc.svelte';

  export let docData: EventDocData | undefined;
</script>

{#if docData}
  <tr>
    <td>{docData.name}</td>
    <td>
      {#if docData.args}
        {#each docData.args as arg}
          <div><InlineParamDoc docData={arg} /></div>
        {/each}
      {/if}
    </td>
    <td>{docData.description || ''}</td>
  </tr>
{/if}
