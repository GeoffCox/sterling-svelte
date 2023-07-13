<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';
  import Playground from '../Playground.svelte';

  let exampleRef: any;
  let disabled = false;
  let checked = false;
  let colorful = false;
  let label = 'Sterling';
</script>

<Playground bind:this={exampleRef}>
  <div slot="component" class="component">
    <Checkbox {colorful} {disabled} bind:checked on:change={() => exampleRef.recordEvent('change')}
      >{label}</Checkbox
    >
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={colorful}>colorful</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="default slot (text)">
      <Input bind:value={label} composed />
    </Label>
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
