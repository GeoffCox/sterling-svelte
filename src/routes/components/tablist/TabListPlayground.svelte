<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import TabList from '$lib/TabList.svelte';
  import Tab from '$lib/Tab.svelte';
  import Input from '$lib/Input.svelte';

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
      <Tab value="first">First</Tab>
      <Tab value="second">Second</Tab>
      <Tab value="third">Third</Tab>
      <Tab value="fourth">Fourth</Tab>
    </TabList>
  </svelte:fragment>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
    <Input bind:value={selectedValue}><span slot="label">selectedValue</span></Input>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedValue: {selectedValue}</div>
  </svelte:fragment>
</Playground>
