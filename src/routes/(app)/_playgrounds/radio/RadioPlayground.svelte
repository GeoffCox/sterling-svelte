<svelte:options runes={true} />

<script lang="ts">
  import Radio from '$lib/Radio.svelte';
  import Playground from '../Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let checked: boolean | null | undefined = $state(false);
  let disabled: boolean | null | undefined = $state(false);
  let name = $state('choices');
  let text = $state('Item 2');
  let selectedValue = $state('');
  let value = $state('item-2');
  let variant = $state('');

  let code = $derived(getPlaygroundCode({ disabled, name, text, value, variant }));
</script>

<Playground {code}>
  <div class="component" slot="component">
    <Radio class={variant} bind:group={selectedValue} {name} value="item-1">Item 1</Radio>
    <Radio class={variant} {disabled} bind:group={selectedValue} {name} value="item-2">Item 2</Radio
    >
    <Radio class={variant} bind:group={selectedValue} {name} value="item-3">Item 3</Radio>
    <Radio class={variant} bind:group={selectedValue} {name} value="item-4">Item 4</Radio>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled (Item 2)</Checkbox>
    <VariantInput bind:class={variant} availableVariants={['colorful']} />
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
