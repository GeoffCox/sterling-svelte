<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';
  import Playground from '../Playground.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled = false;
  let checked = false;
  let text = 'sterling-svelte';
  let variant = '';

  $: code = getPlaygroundCode({ checked, disabled, text, variant });
</script>

<Playground {code}>
  <div slot="component" class="component">
    <Checkbox
      {disabled}
      bind:checked
      {variant}
      on:change={() => console.log('<Checkbox> on:change')}>{text}</Checkbox
    >
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked>checked</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput bind:variant availableVariants={['colorful']} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Label text="(checkbox content)">
      <Input bind:value={text} />
    </Label>
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
