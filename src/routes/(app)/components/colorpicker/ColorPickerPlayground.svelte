<script lang="ts">
  import Playground from '../Playground.svelte';

  import ColorPicker from '$lib/ColorPicker.svelte';
  import type { ColorFormat } from '$lib/ColorPicker.types';
  import Checkbox from '$lib/Checkbox.svelte';

  let exampleRef: any;

  let colorText = 'hsla(222, 50%, 70%, 0.5)';
  let colorFormat: ColorFormat = 'hsl';

  let colorful = false;
  let composed = false;
  let disabled = false;
  let open = false;
</script>

<Playground bind:this={exampleRef} noEvents>
  <svelte:fragment slot="component">
    <ColorPicker bind:colorText bind:colorFormat bind:open {colorful} {composed} {disabled} />
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={colorful}>colorful</Checkbox>
    <Checkbox bind:checked={composed}>composed</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={open}>open</Checkbox>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>colorText: {colorText}</div>
    <div>colorFormat: {colorFormat}</div>
  </svelte:fragment>
</Playground>
