<svelte:options runes={true} />

<script lang="ts">
  import Playground from '../Playground.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');

  let code = $derived(getPlaygroundCode({ _class }));
</script>

<Playground {code}>
  {#snippet component()}
    <div class="area">
      <MenuSeparator class={_class} />
    </div>
  {/snippet}
  {#snippet props()}
    <VariantInput bind:class={_class} sterlingClasses={[]} />
  {/snippet}
</Playground>

<style>
  .area {
    width: 150px;
    height: 20px;
    display: grid;
    align-items: center;
    justify-items: stretch;
  }
</style>
