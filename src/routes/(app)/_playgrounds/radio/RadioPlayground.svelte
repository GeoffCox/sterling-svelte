<svelte:options runes={true} />

<script lang="ts">
  import Radio from '$lib/Radio.svelte';
  import Playground from '../Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let disabled: boolean | null | undefined = $state(false);
  let name = 'choices';
  let text = $state('Item 2');
  let selectedValue = $state('item-1');
  let value = $state('item-2');

  let code = $derived(getPlaygroundCode({ name, _class }));
</script>

<Playground {code}>
  {#snippet component()}
    <div class="component">
      <Radio class={_class} bind:group={selectedValue} {name} value="item-1">Item 1</Radio>
      <Radio class={_class} {disabled} bind:group={selectedValue} {name} value="item-2"
        >Item 2</Radio
      >
      <Radio class={_class} bind:group={selectedValue} {name} value="item-3">Item 3</Radio>
      <Radio class={_class} bind:group={selectedValue} {name} value="item-4">Item 4</Radio>
    </div>
  {/snippet}
  {#snippet props()}
    <VariantInput bind:class={_class} />
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={disabled}>disable 2nd item</Checkbox>
  {/snippet}
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
