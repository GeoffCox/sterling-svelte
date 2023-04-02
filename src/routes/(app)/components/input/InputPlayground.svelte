<script lang="ts">
  import Input from '$lib/Input.svelte';
  import Playground from '../Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import LabelBox from '$lib/Field.svelte';
  import Field from '$lib/Field.svelte';

  let exampleRef: any;

  let composed = false;
  let disabled = false;
  let label = '';
  let placeholder = '';
  let value = '';
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    {#if label.length > 0}
      <Input
        bind:value
        {disabled}
        {placeholder}
        {composed}
        on:input={() => exampleRef.recordEvent('input')}
        on:change={() => exampleRef.recordEvent('change')}>{label}</Input
      >
    {:else}
      <Input
        bind:value
        {disabled}
        {placeholder}
        {composed}
        on:input={() => exampleRef.recordEvent('input')}
        on:change={() => exampleRef.recordEvent('change')}
      />
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={composed}>composed</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <LabelBox label="placeholder">
      <Input bind:value={placeholder} composed />
    </LabelBox>
    <Field label="default slot (text)">
      <Input bind:value={label} composed />
    </Field>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>value: {value}</div>
  </svelte:fragment>
</Playground>
