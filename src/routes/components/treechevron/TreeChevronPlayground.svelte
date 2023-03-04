<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';

  import TreeChevron from '$lib/TreeChevron.svelte';

  let exampleRef: any;

  let expanded = false;
  let hasChildren = true;
</script>

<Playground bind:this={exampleRef}>
  <div slot="component">
    <TreeChevron {expanded} {hasChildren} />
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={expanded}>expanded</Checkbox>
    <Checkbox bind:checked={hasChildren}>hasChildren</Checkbox>
  </svelte:fragment>
</Playground>
