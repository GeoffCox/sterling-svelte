<script lang="ts">
  import type { TypeDocData } from '../documentation.types';

  export let docData: TypeDocData | undefined;
</script>

{#if docData}
  <div>{docData.name} : {docData.type}</div>
  {#if docData.description}
    <div>
      {docData.description}
    </div>
  {/if}
{/if}
