<script lang="ts">
  import { INPUT_VARIANTS, type InputVariant } from '$lib';

  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import LabelBox from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';

  import Playground from '../Playground.svelte';

  let exampleRef: any;

  let colorful = false;
  let composed = false;
  let disabled = false;
  let label = 'sterling-svelte';
  let placeholder = '';
  let value = '';
  let variant: InputVariant = 'regular';
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    {#if label.length > 0}
      <Input
        {colorful}
        {composed}
        {disabled}
        {placeholder}
        {variant}
        bind:value
        on:input={() => exampleRef.recordEvent('input')}
        on:change={() => exampleRef.recordEvent('change')}>{label}</Input
      >
    {:else}
      <Input
        {colorful}
        {composed}
        {disabled}
        {placeholder}
        bind:value
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
      <Input bind:value={placeholder} />
    </LabelBox>
    <Label text="default slot (text)">
      <Input bind:value={label} />
    </Label>
    <Label text="variant" forwardClick>
      <Select bind:selectedValue={variant}>
        {#each INPUT_VARIANTS as variantItem}
          <ListItem value={variantItem}>{variantItem}</ListItem>
        {/each}
      </Select>
    </Label>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>value: {value}</div>
  </svelte:fragment>
</Playground>
