<script lang="ts">
  import Input from '$lib/Input.svelte';
  import TextArea from '$lib/TextArea.svelte';
  import Playground from '../Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import type { TextAreaResize } from '$lib/TextArea.types';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Label from '$lib/Label.svelte';
  import { TEXT_AREA_RESIZES } from '$lib';

  let exampleRef: any;

  let colorful = false;
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
      {colorful}
      {disabled}
      {placeholder}
      {resize}
      {autoHeight}
      on:input={() => exampleRef.recordEvent('input')}
      on:change={() => exampleRef.recordEvent('change')}
    />
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={colorful}>colorful</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="placeholder">
      <Input bind:value={placeholder} composed />
    </Label>
    <Label text="resize" forwardClick>
      <Select bind:selectedValue={resize} composed>
        {#each TEXT_AREA_RESIZES as resizeValue}
          <ListItem value={resizeValue}>{resizeValue}</ListItem>
        {/each}
      </Select>
    </Label>
    <Checkbox bind:checked={autoHeight}>Auto height</Checkbox>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div class="value">value: {value}</div>
  </svelte:fragment>
</Playground>
