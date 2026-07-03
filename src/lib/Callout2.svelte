<script lang="ts">
  import type { Callout2Props } from './Callout2.types';
  import Popover2 from './Popover2.svelte';

  let props: Callout2Props = $props();
</script>

<Popover2 {...props} class="sterling-callout" />
