<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Radio from '$lib/Radio.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let disabled: boolean | null | undefined = $state(false);
  let name = 'choices';
  let selectedValue = $state('item-1');

  let code = $derived(getPlaygroundCode({ name, _class }));
</script>

<Playground {code}>
  {#snippet component()}
    <div class="component">
      <Radio
        class={_class}
        bind:group={selectedValue}
        {name}
        value="item-1"
        onchange={() => console.log('<Radio value="item-1"> onchange')}
        oninput={() => console.log('<Radio value="item-1"> oninput')}>Item 1</Radio
      >
      <Radio
        class={_class}
        {disabled}
        bind:group={selectedValue}
        {name}
        value="item-2"
        onchange={() => console.log('<Radio value="item-2"> onchange')}
        oninput={() => console.log('<Radio value="item-2"> oninput')}>Item 2</Radio
      >
      <Radio
        class={_class}
        bind:group={selectedValue}
        {name}
        value="item-3"
        onchange={() => console.log('<Radio value="item-3"> onchange')}
        oninput={() => console.log('<Radio value="item-3"> oninput')}>Item 3</Radio
      >
      <Radio
        class={_class}
        bind:group={selectedValue}
        {name}
        value="item-4"
        onchange={() => console.log('<Radio value="item-4"> onchange')}
        oninput={() => console.log('<Radio value="item-4"> oninput')}>Item 4</Radio
      >
    </div>
  {/snippet}
  {#snippet props()}
    <VariantInput bind:class={_class} sterlingClasses={['button']} />
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={disabled}>Disable 2nd item</Checkbox>
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
