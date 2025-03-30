<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import TreeChevron from '$lib/TreeChevron.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let expanded = $state(false);
  let hasChildren = $state(false);
  let _class = $state('');

  let code = $derived(
    getPlaygroundCode({
      _class,
      hasChildren,
      expanded
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <TreeChevron {expanded} {hasChildren} class={_class} />
  {/snippet}
  {#snippet props()}
    <VariantInput bind:class={_class} sterlingClasses={[]} />
    <Checkbox bind:checked={expanded}>expanded</Checkbox>
    <Checkbox bind:checked={hasChildren}>hasChildren</Checkbox>
  {/snippet}
</Playground>
