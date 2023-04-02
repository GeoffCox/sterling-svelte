<script lang="ts">
  import type { MethodDocData } from '../documentation.types';
  import InlineParamDoc from './InlineParamDoc.svelte';
  import InlineTypeDoc from './InlineTypeDoc.svelte';

  export let docData: MethodDocData | undefined;
</script>

{#if docData}
  <tr>
    <td>{docData.name}</td>
    <td>
      {#if docData.params}
        {#each docData.params as param}
          <div><InlineParamDoc docData={param} /></div>
        {/each}
      {/if}
    </td>
    <td>
      {#if docData.params}
        <InlineTypeDoc docData={docData.returnType} />
      {/if}</td
    >
    <td>{docData.description}</td>
  </tr>
{/if}
