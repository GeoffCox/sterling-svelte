<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import Field from '$lib/Field.svelte';

  let exampleRef: any;

  let disabled = false;
  let checked = false;
  let label = 'Sterling';
</script>

<Playground bind:this={exampleRef}>
  <div slot="component" class="component">
    <Checkbox {disabled} bind:checked on:change={() => exampleRef.recordEvent('change')}
      >{label}</Checkbox
    >
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Field label="default slot (text)">
      <Input bind:value={label} composed />
    </Field>
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
