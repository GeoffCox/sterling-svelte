<script lang="ts">
  import Playground from '../Playground.svelte';

  import HslColorSliders from '$lib/HslColorSliders.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let hue = 0;
  let saturation = 0;
  let lightness = 0;
  let alpha = 255;
  let variant = '';

  $: code = getPlaygroundCode({ hue, saturation, lightness, alpha, variant });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <div class="sliders">
      <HslColorSliders bind:hue bind:saturation bind:lightness bind:alpha {variant} />
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
