<script lang="ts">
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import PictureFrame from './PictureFrame.svelte';
</script>

<PictureFrame name="Select">
  <Select selectedValue="Item 2">
    <ListItem value="Item 1">Item 1</ListItem>
    <ListItem value="Item 2">Item 2</ListItem>
    <ListItem value="Item 3">Item 3</ListItem>
    <ListItem value="Item 4">Item 4</ListItem>
  </Select>
</PictureFrame>
