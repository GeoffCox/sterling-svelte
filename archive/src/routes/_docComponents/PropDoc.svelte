<script lang="ts">
  import type { PropDocData } from '../documentation.types';
  import InlineTypeDoc from './InlineTypeDoc.svelte';

  export let docData: PropDocData | undefined;
</script>

{#if docData}
  <tr>
    <td>{docData.name}</td>
    <td><InlineTypeDoc docData={docData.type} /></td>
    <td><code>{docData.default || ''}</code></td>
    <td>{docData.description || ''}</td>
  </tr>
{/if}
