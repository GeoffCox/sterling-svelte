<script lang="ts">
  import type { CodeDocData } from '../documentation.types';

  export let docData: CodeDocData | undefined;
</script>

{#if docData}
  {#if docData.name}
    <pre>{docData.name}</pre>
  {/if}
  {#if docData.description}
    <p>{docData.description}</p>
  {/if}
  <pre>{docData.code}</pre>
{/if}
