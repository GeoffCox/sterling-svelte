<script lang="ts">
  import Input from '$lib/Input.svelte';
  import TextArea from '$lib/TextArea.svelte';
  import Playground from '../Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import type { TextAreaResize } from '$lib/TextArea.types';
  import Select from '$lib/Select.svelte';

  let exampleRef: any;

  let disabled = false;
  let label = 'CONTENT';
  let placeholder = 'Type your prose here';
  let autoHeight = false;
  let value = '';

  const resizeValues: TextAreaResize[] = ['none', 'both', 'horizontal', 'vertical'];
  let resizeIndex = 1;
  $: resize = resizeValues[resizeIndex];
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <TextArea
      bind:value
      {disabled}
      {placeholder}
      {resize}
      {autoHeight}
      on:input={() => exampleRef.recordEvent('input')}
      on:change={() => exampleRef.recordEvent('change')}
    >
      <span slot="label">{label}</span>
    </TextArea>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Input bind:value={label}><span slot="label">LABEL (slot)</span></Input>
    <Input bind:value={placeholder}><span slot="label">PLACEHOLDER</span></Input>
    <Select items={resizeValues} bind:selectedIndex={resizeIndex}>
      <span slot="label">resize</span>
    </Select>
    <Checkbox bind:checked={autoHeight}><span slot="label">Auto height</span></Checkbox>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div class="value">value: {value}</div>
  </svelte:fragment>
</Playground>

<style>
  .value {
    max-width: 350px;
  }
</style>
