<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/inputs/Input.svelte';

  let exampleRef: any;

  let disabled = false;
  let checked = false;
  let label = 'Sterling';
</script>

<Playground bind:this={exampleRef}>
  <div slot="component" class="component">
    <Checkbox {disabled} bind:checked on:change={() => exampleRef.recordEvent('change')}
      ><svelte:fragment slot="label">{label}</svelte:fragment></Checkbox
    >
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Input bind:value={label}><span slot="label">LABEL (slot)</span></Input>
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
