<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import TabList from '$lib/TabList.svelte';
  import Tab from '$lib/Tab.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = '';
  let disabled = false;
  let selectedValue: string | undefined;
  let vertical = false;

  $: code = getPlaygroundCode({ disabled, _class: _class, vertical });
</script>

<Playground {code}>
  {#snippet component()}
    <TabList
      bind:selectedValue
      {disabled}
      class={_class}
      {vertical}
      onSelect={(value) => {
        console.log(`TabList.onSelect value:${value}`);
      }}
    >
      <Tab value="First">First</Tab>
      <Tab value="Second">Second</Tab>
      <Tab value="Third">Third</Tab>
      <Tab value="Fourth">Fourth</Tab>
    </TabList>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
    <Label text="selectedValue">
      <Input bind:value={selectedValue} />
    </Label>
    <VariantInput bind:class={_class} sterlingClasses={[]} />
  {/snippet}
</Playground>
