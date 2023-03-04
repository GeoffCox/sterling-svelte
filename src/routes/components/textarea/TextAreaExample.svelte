<script lang="ts">
  import Input from '$lib/Input.svelte';
  import TextArea from '$lib/TextArea.svelte';
  import Playground from '../Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import type { TextAreaResize } from '$lib/TextArea.types';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';

  let exampleRef: any;

  let disabled = false;
  let label = 'CONTENT';
  let placeholder = 'Type your prose here';
  let autoHeight = false;
  let value = '';

  let resize: TextAreaResize = 'none';
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
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Input bind:value={label}><span slot="label">LABEL (slot)</span></Input>
    <Input bind:value={placeholder}><span slot="label">PLACEHOLDER</span></Input>
    <Select bind:selectedValue={resize}>
      <span slot="label">resize</span>
      <ListItem value="none">none</ListItem>
      <ListItem value="both">both</ListItem>
      <ListItem value="horizontal">horizontal</ListItem>
      <ListItem value="vertical">vertical</ListItem>
    </Select>
    <Checkbox bind:checked={autoHeight}>Auto height</Checkbox>
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
