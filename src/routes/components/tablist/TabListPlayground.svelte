<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import TabList from '$lib/containers/TabList.svelte';
  import Tab from '$lib/containers/Tab.svelte';

  let exampleRef: any;

  const tabs = [
    {
      tabId: 'first',
      text: 'First'
    },
    {
      tabId: 'second',
      text: 'Second',
      disabled: true
    },
    {
      tabId: 'third',
      text: 'Third'
    },
    {
      tabId: 'fourth',
      text: 'Fourth'
    }
  ];
  let disabled = false;
  let selectedTabId: string | undefined = 'third';
  let selectionFollowsFocus = false;
  let vertical = false;
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <TabList
      bind:selectedTabId
      {disabled}
      {tabs}
      {selectionFollowsFocus}
      {vertical}
      on:select={(event) => {
        exampleRef.recordEvent(`selected: ${event.detail.selectedTabId}`);
      }}
    />
  </svelte:fragment>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Checkbox bind:checked={selectionFollowsFocus}
      ><span slot="label">selectionFollowsFocus</span></Checkbox
    >
    <Checkbox bind:checked={vertical}><span slot="label">vertical</span></Checkbox>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedTabId: {selectedTabId}</div>
  </svelte:fragment>
</Playground>
