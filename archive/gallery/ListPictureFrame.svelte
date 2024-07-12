<script lang="ts">
  import List from '$lib/List.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import PictureFrame from './PictureFrame.svelte';
</script>

<PictureFrame name="List">
  <div class="layout">
    <List>
      <ListItem value="1">Item 1</ListItem>
      <ListItem value="2">Item 2</ListItem>
      <ListItem value="3">Item 3</ListItem>
      <ListItem value="4">Item 4</ListItem>
      <ListItem value="5">Item 5</ListItem>
      <ListItem value="6">Item 6</ListItem>
      <ListItem value="7">Item 7</ListItem>
      <ListItem value="8">Item 8</ListItem>
      <ListItem value="9">Item 9</ListItem>
    </List>
  </div>
</PictureFrame>

<style>
  .layout {
    width: 150px;
    height: 150px;
    overflow: hidden;
  }
</style>
