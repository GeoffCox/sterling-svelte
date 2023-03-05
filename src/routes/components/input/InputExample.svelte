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
      {label}
    </Input>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Input bind:value={label}>LABEL (slot)</Input>
    <Input bind:value={placeholder}>PLACEHOLDER</Input>
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
