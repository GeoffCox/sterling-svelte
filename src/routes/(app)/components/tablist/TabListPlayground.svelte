<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import TabList from '$lib/TabList.svelte';
  import Tab from '$lib/Tab.svelte';
  import Input from '$lib/Input.svelte';
  import Field from '$lib/Field.svelte';

  let exampleRef: any;

  let disabled = false;
  let selectedValue: string | undefined;
  let vertical = false;
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <TabList
      bind:selectedValue
      {disabled}
      {vertical}
      on:select={(event) => {
        exampleRef.recordEvent(`select: ${event.detail.selectedValue}`);
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
    <Field label="selectedValue">
      <Input bind:value={selectedValue} composed />
    </Field>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedValue: {selectedValue}</div>
  </svelte:fragment>
</Playground>
