<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';

  import TreeChevron from '$lib/TreeChevron.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let expanded = false;
  let hasChildren = true;
  let variant = '';

  $: code = getPlaygroundCode({
    expanded,
    hasChildren,
    variant
  });
</script>

<Playground {code}>
  <div slot="component">
    <TreeChevron {expanded} {hasChildren} {variant} />
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={expanded}>expanded</Checkbox>
    <Checkbox bind:checked={hasChildren}>hasChildren</Checkbox>
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
</Playground>
