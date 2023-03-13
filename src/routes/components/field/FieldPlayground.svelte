<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';
  import Field from '$lib/Field.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import type { FieldStatus } from '$lib/Field.types';

  let disabled = false;
  let forwardClick = false;
  let label = 'Name';
  let message = '';
  let required = false;
  let status: FieldStatus | 'none' = 'none';
  let useFor = true;
</script>

<Playground>
  <svelte:fragment slot="component">
    <Field
      for={useFor ? 'field-target' : undefined}
      {forwardClick}
      {label}
      {message}
      {required}
      {status}
    >
      <Input id="field-target" {disabled} composed />
    </Field>
  </svelte:fragment>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}>input disabled</Checkbox>
    <Checkbox bind:checked={forwardClick}>forwardClick</Checkbox>
    <Field label="label">
      <Input bind:value={label} composed />
    </Field>
    <Field label="message">
      <Input bind:value={message} composed />
    </Field>
    <Checkbox bind:checked={required}>required</Checkbox>
    <Field label="status" for="status-select" forwardClick>
      <Select id="status-select" bind:selectedValue={status} composed>
        <ListItem value="none">none</ListItem>
        <ListItem value="info">info</ListItem>
        <ListItem value="success">success</ListItem>
        <ListItem value="warning">warning</ListItem>
        <ListItem value="error">error</ListItem>
      </Select>
    </Field>
    <Checkbox bind:checked={useFor}>use <i>for</i> and <i>id</i> association</Checkbox>
  </svelte:fragment>
</Playground>
