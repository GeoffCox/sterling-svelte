<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import TabList from '$lib/TabList.svelte';
  import Tab from '$lib/Tab.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let exampleRef: any;

  let disabled = false;
  let selectedValue: string | undefined;
  let variant = '';
  let vertical = false;
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <TabList
      bind:selectedValue
      {disabled}
      {variant}
      {vertical}
      on:select={(event) => {
        exampleRef.recordEvent(`select: ${event.detail.value}`);
      }}
    >
      <Tab value="First">First</Tab>
      <Tab value="Second">Second</Tab>
      <Tab value="Third">Third</Tab>
      <Tab value="Fourth">Fourth</Tab>
    </TabList>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
    <Label text="selectedValue">
      <Input bind:value={selectedValue} />
    </Label>
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedValue: {selectedValue}</div>
  </svelte:fragment>
</Playground>
