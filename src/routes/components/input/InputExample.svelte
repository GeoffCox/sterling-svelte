<script lang="ts">
  import Input from '$lib/Input.svelte';
  import Playground from '../Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';

  let exampleRef: any;

  let disabled = false;
  let label = 'NAME';
  let placeholder = 'Type your name here';
  let value = '';
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <Input
      bind:value
      {disabled}
      {placeholder}
      on:input={() => exampleRef.recordEvent('input')}
      on:change={() => exampleRef.recordEvent('change')}
    >
      <svelte:fragment slot="label">{label}</svelte:fragment>
    </Input>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Input bind:value={label}><span slot="label">LABEL (slot)</span></Input>
    <Input bind:value={placeholder}><span slot="label">PLACEHOLDER</span></Input>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>value: {value}</div>
  </svelte:fragment>
</Playground>

<style>
  .component {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
</style>
