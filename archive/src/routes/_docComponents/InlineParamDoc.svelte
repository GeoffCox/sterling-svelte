<script lang="ts">
  import Tooltip from '$lib/Tooltip.svelte';
  import type { ParamDocData } from '../documentation.types';
  import InlineTypeDoc from './InlineTypeDoc.svelte';

  export let docData: ParamDocData | undefined;
</script>

{#if docData}
  {#if docData.description}
    <Tooltip>
      <div slot="tip">
        <span>{docData.type}</span>
        {#if docData.description}
          <span>- {docData.description}</span>
        {/if}
      </div>
      {docData.name} : <InlineTypeDoc docData={docData.type} />
      {#if docData.default}
        <span> = {docData.default}</span>
      {/if}
    </Tooltip>
  {:else}
    {docData.name} : <InlineTypeDoc docData={docData.type} />
    {#if docData.default}
      <span> = {docData.default}</span>
    {/if}
  {/if}
{/if}
