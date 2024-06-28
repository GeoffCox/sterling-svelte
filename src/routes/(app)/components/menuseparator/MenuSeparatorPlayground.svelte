<script lang="ts">
  import Playground from '../Playground.svelte';

  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let variant = '';
</script>

<Playground>
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
