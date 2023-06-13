<script lang="ts">
  import List from '$lib/List.svelte';
  import ListItem from '$lib/ListItem.svelte';

  export let selectedValue = 'common';
</script>

<List bind:selectedValue>
  <ListItem value="common">common</ListItem>
  <ListItem value="common-secondary">&nbsp;&nbsp;secondary</ListItem>
  <ListItem value="common-subtle">&nbsp;&nbsp;subtle</ListItem>
  <ListItem value="common-faint">&nbsp;&nbsp;faint</ListItem>
  <ListItem value="common-outline">&nbsp;&nbsp;outline</ListItem>
  <ListItem value="common-disabled">&nbsp;&nbsp;disabled</ListItem>
  <ListItem value="button">button</ListItem>
  <ListItem value="button-hover">&nbsp;&nbsp;hover</ListItem>
  <ListItem value="button-focus">&nbsp;&nbsp;focus</ListItem>
  <ListItem value="button-active">&nbsp;&nbsp;active</ListItem>
  <ListItem value="button-colorful">&nbsp;&nbsp;colorful</ListItem>
  <ListItem value="button-colorful-hover">&nbsp;&nbsp;&nbsp;&nbsp;hover</ListItem>
  <ListItem value="button-colorful-focus">&nbsp;&nbsp;&nbsp;&nbsp;focus</ListItem>
  <ListItem value="button-colorful-active">&nbsp;&nbsp;&nbsp;&nbsp;active</ListItem>
  <ListItem value="input">input</ListItem>
  <ListItem value="input-hover">&nbsp;&nbsp;hover</ListItem>
  <ListItem value="input-focus">&nbsp;&nbsp;focus</ListItem>
  <ListItem value="input-selected">&nbsp;&nbsp;selected</ListItem>
  <ListItem value="input-colorful">&nbsp;&nbsp;colorful</ListItem>
  <ListItem value="input-colorful-hover">&nbsp;&nbsp;&nbsp;&nbsp;hover</ListItem>
  <ListItem value="input-colorful-focus">&nbsp;&nbsp;&nbsp;&nbsp;focus</ListItem>
  <ListItem value="input-colorful-selected">&nbsp;&nbsp;&nbsp;&nbsp;selected</ListItem>
  <ListItem value="status-info">info</ListItem>
  <ListItem value="status-success">success</ListItem>
  <ListItem value="status-warning">warning</ListItem>
  <ListItem value="status-error">error</ListItem>
</List>
