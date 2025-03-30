<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';

  import { coffeeTree } from '../../_shared/sampleData/coffeeTree';

  import Button from '$lib/Button.svelte';
  import CoffeeTreeItem from './CoffeeTreeItem.svelte';
  import Label from '$lib/Label.svelte';
  import Tree from '$lib/Tree.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let disabled = $state(false);
  let expandedValues: string[] = $state([]);
  let expandedValuesText: string = $state('');
  let selectedValue: string | undefined = $state();

  const getExpandedValues = () => {
    expandedValuesText = expandedValues.join(',');
  };

  const setExpandedValues = () => {
    expandedValues = expandedValuesText.split(',').filter(Boolean);
  };

  let code = $derived(
    getPlaygroundCode({
      _class,
      disabled
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <div class="component">
      <Tree
        bind:selectedValue
        {disabled}
        bind:expandedValues
        class={_class}
        onExpandCollapse={(expandedValues) =>
          console.log('Tree.onExpandCollapse expandedValue:', expandedValues)}
        onSelect={() => console.log('Tree.onSelect selectedValue:', selectedValue)}
      >
        {#each coffeeTree as coffeeItem}
          <CoffeeTreeItem {coffeeItem} variant={_class} />
        {/each}
      </Tree>
    </div>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="expandedValues">
      <Input bind:value={expandedValuesText} />
    </Label>
    <div class="edit-toggled">
      <Button onclick={getExpandedValues}>Get</Button>
      <Button onclick={setExpandedValues}>Set</Button>
    </div>
    <Label text="selectedValue">
      <Input bind:value={selectedValue} />
    </Label>
    <VariantInput bind:class={_class} sterlingClasses={['composed']} />
  {/snippet}
</Playground>

<style>
  .component {
    min-width: 400px;
  }

  .edit-toggled {
    display: flex;
    justify-items: flex-end;
    justify-self: flex-end;
    align-items: center;
    column-gap: 1em;
  }
</style>
