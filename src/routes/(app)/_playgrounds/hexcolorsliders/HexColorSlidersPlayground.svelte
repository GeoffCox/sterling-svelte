<script lang="ts">
  import Playground from '../../components/Playground.svelte';

  import HexColorSliders from '$lib/HexColorSliders.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let red = 0;
  let green = 0;
  let blue = 0;
  let alpha = 255;
  let variant = '';

  $: code = getPlaygroundCode({ red, green, blue, alpha, variant });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <div class="sliders">
      <HexColorSliders bind:red bind:green bind:blue bind:alpha {variant} />
    </div>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
</Playground>

<style>
  .sliders {
    width: 500px;
  }
</style>
