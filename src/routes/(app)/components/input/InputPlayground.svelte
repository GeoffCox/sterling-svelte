<script lang="ts">
  import Input from '$lib/Input.svelte';
  import Playground from '../Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import LabelBox from '$lib/Label.svelte';
  import Label from '$lib/Label.svelte';

  let exampleRef: any;

  let colorful = false;
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
        {colorful}
        {disabled}
        {placeholder}
        {composed}
        on:input={() => exampleRef.recordEvent('input')}
        on:change={() => exampleRef.recordEvent('change')}>{label}</Input
      >
    {:else}
      <Input
        bind:value
        {colorful}
        {disabled}
        {placeholder}
        {composed}
        on:input={() => exampleRef.recordEvent('input')}
        on:change={() => exampleRef.recordEvent('change')}
      />
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={colorful}>colorful</Checkbox>
    <Checkbox bind:checked={composed}>composed</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <LabelBox text="placeholder">
      <Input bind:value={placeholder} composed />
    </LabelBox>
    <Label text="default slot (text)">
      <Input bind:value={label} composed />
    </Label>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>value: {value}</div>
  </svelte:fragment>
</Playground>
