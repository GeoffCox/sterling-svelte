<script lang="ts">
  import Input from '$lib/Input.svelte';
  import TextArea from '$lib/TextArea.svelte';
  import Playground from '../Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import type { TextAreaResize } from '$lib/TextArea.types';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Field from '$lib/Field.svelte';

  let exampleRef: any;

  let disabled = false;
  let placeholder = 'Type your prose here';
  let autoHeight = false;
  let value = '';

  let resize: TextAreaResize = 'none';
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <TextArea
      bind:value
      {disabled}
      {placeholder}
      {resize}
      {autoHeight}
      on:input={() => exampleRef.recordEvent('input')}
      on:change={() => exampleRef.recordEvent('change')}
    />
  </svelte:fragment>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Field label="placeholder">
      <Input bind:value={placeholder} composed />
    </Field>
    <Field label="resize" forwardClick>
      <Select bind:selectedValue={resize} composed>
        <ListItem value="none">none</ListItem>
        <ListItem value="both">both</ListItem>
        <ListItem value="horizontal">horizontal</ListItem>
        <ListItem value="vertical">vertical</ListItem>
      </Select>
    </Field>
    <Checkbox bind:checked={autoHeight}>Auto height</Checkbox>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div class="value">value: {value}</div>
  </svelte:fragment>
</Playground>
