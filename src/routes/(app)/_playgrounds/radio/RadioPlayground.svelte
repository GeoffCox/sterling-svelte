<script lang="ts">
  import Radio from '$lib/Radio.svelte';
  import Playground from '../../components/Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let checked = false;
  let disabled = false;
  let name = 'choices';
  let text = 'Item 2';
  let selectedValue = 'item-1';
  let value = 'item-2';
  let variant = '';

  $: code = getPlaygroundCode({ disabled, name, text, value, variant });
</script>

<Playground {code}>
  <div class="component" slot="component">
    <Radio bind:group={selectedValue} {name} value="item-1">Item 1</Radio>
    <Radio bind:group={selectedValue} bind:checked {disabled} {name} {value} {variant}>{text}</Radio
    >
    <Radio bind:group={selectedValue} {name} value="item-3">Item 3</Radio>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked>checked</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="name">
      <Input bind:value={name} />
    </Label>
    <Label text="value">
      <Input bind:value />
    </Label>
    <VariantInput bind:variant availableVariants={['colorful']} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Label text="text">
      <Input bind:value={text} />
    </Label>
  </svelte:fragment>
</Playground>

<style>
  .component {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0;
    row-gap: 5px;
  }
</style>
