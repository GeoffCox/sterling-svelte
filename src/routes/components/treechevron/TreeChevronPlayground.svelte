<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Example from '../Example.svelte';

  import TreeNodeChevron from '$lib/containers/TreeChevron.svelte';

  let exampleRef: any;

  let expanded = false;
  let hasChildren = true;
</script>

<Example bind:this={exampleRef}>
  <div slot="component">
    <TreeNodeChevron {expanded} {hasChildren} />
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={expanded}><span slot="label">expanded</span></Checkbox>
    <Checkbox bind:checked={hasChildren}><span slot="label">hasChildren</span></Checkbox>
  </svelte:fragment>
</Example>
