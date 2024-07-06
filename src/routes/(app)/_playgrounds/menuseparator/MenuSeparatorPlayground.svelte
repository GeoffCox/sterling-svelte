<script lang="ts">
  import Playground from '../../components/Playground.svelte';

  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let variant = '';

  $: code = getPlaygroundCode({
    variant
  });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <div class="area">
      <MenuSeparator {variant} />
    </div>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
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
