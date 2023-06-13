<script lang="ts">
  import Playground from '../Playground.svelte';

  import ColorPicker from '$lib/ColorPicker.svelte';
  import type { ColorFormat } from '$lib/ColorPicker.types';

  let exampleRef: any;

  let colorText = '#00ffff';
  let colorFormat: ColorFormat = 'hex';
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <ColorPicker bind:colorText bind:colorFormat />
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>colorText: {colorText}</div>
    <div>colorFormat: {colorFormat}</div>
  </svelte:fragment>
</Playground>
