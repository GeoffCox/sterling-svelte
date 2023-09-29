<script lang="ts">
  import Playground from '../Playground.svelte';

  import HslColorSliders from '$lib/HslColorSliders.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let hue = 0;
  let saturation = 0;
  let lightness = 0;
  let alpha = 255;
  let variant = '';
</script>

<Playground noEvents>
  <svelte:fragment slot="component">
    <div class="sliders">
      <HslColorSliders bind:hue bind:saturation bind:lightness bind:alpha {variant} />
    </div>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>
      color: 0x{hue.toString(16).padStart(2, '0')}{saturation
        .toString(16)
        .padStart(2, '0')}{lightness.toString(16).padStart(2, '0')}{alpha
        .toString(16)
        .padStart(2, '0')}
    </div>
  </svelte:fragment>
</Playground>

<style>
  .sliders {
    width: 500px;
  }
</style>
