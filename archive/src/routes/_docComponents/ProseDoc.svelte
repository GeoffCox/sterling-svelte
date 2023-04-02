<script lang="ts">
  import type { ProseDocData } from '../documentation.types';

  export let docData: ProseDocData | undefined;
</script>

{#if docData}
  {#each docData.paragraphs as paragraph}
    <p>{paragraph}</p>
  {/each}
{/if}
