<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';
  import Playground from '../Playground.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let exampleRef: any;
  let disabled = false;
  let checked = false;
  let label = 'sterling-svelte';
  let variant = '';
</script>

<Playground bind:this={exampleRef}>
  <div slot="component" class="component">
    <Checkbox {disabled} bind:checked {variant} on:change={() => exampleRef.recordEvent('change')}
      >{label}</Checkbox
    >
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="default slot (text)">
      <Input bind:value={label} />
    </Label>
    <VariantInput bind:variant availableVariants={['colorful']} />
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>checked: {checked}</div>
  </svelte:fragment>
</Playground>

<style>
  .component {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    padding: 0;
  }
</style>
