<script lang="ts">
  import Tooltip from '$lib/Tooltip.svelte';
  import type { TypeDocData } from '../documentation.types';

  export let docData: TypeDocData | undefined;
</script>

{#if docData}
  <Tooltip showOn="click">
    <div class="tip" slot="tip">
      <pre>{docData.type}</pre>
      {#if docData.description}
        <span>- {docData.description}</span>
      {/if}
    </div>
    <span class="type-name">{docData.name}</span>
  </Tooltip>
{/if}

<style>
  .tip {
    padding: 1em;
  }

  .type-name {
    cursor: pointer;
  }
</style>
