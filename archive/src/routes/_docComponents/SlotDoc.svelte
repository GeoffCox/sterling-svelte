<script lang="ts">
  import type { SlotDocData } from '../documentation.types';
  import InlineParamDoc from './InlineParamDoc.svelte';
  import InlineTypeDoc from './InlineTypeDoc.svelte';

  export let docData: SlotDocData | undefined;
</script>

{#if docData}
  <tr>
    <td class="name">{docData.name}</td>
    <td class="description">{docData.description}</td>
    <td class="let-params">
      {#if docData.letParams}
        {#each docData.letParams as letParam}
          <div><InlineParamDoc docData={letParam} /></div>
        {/each}
      {/if}
    </td>
  </tr>
{/if}
