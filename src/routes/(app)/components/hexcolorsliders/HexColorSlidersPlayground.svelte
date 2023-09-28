<script lang="ts">
  import Playground from '../Playground.svelte';

  import HexColorSliders from '$lib/HexColorSliders.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';

  let red = 0;
  let green = 0;
  let blue = 0;
  let alpha = 255;
  let variant = '';
</script>

<Playground noEvents>
  <svelte:fragment slot="component">
    <div class="sliders">
      <HexColorSliders bind:red bind:green bind:blue bind:alpha {variant} />
    </div>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Label text="variant" forwardClick>
      <Input bind:value={variant} />
    </Label>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>
      color: 0x{red.toString(16).padStart(2, '0')}{green.toString(16).padStart(2, '0')}{blue
        .toString(16)
        .padStart(2, '0')}{alpha.toString(16).padStart(2, '0')}
    </div>
  </svelte:fragment>
</Playground>

<style>
  .sliders {
    width: 500px;
  }
</style>
