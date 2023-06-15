<script lang="ts">
  import Tab from '$lib/Tab.svelte';
  import TabList from '$lib/TabList.svelte';
  import PictureFrame from './PictureFrame.svelte';
</script>

<PictureFrame name="TabList">
  <div class="layout">
    <TabList>
      <Tab value="1">Item 1</Tab>
      <Tab value="2">Item 2</Tab>
      <Tab value="3">Item 3</Tab>
      <Tab value="4">Item 4</Tab>
    </TabList>
  </div>
</PictureFrame>
