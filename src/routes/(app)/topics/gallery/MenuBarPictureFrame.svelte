<script lang="ts">
  import MenuBar from '$lib/MenuBar.svelte';
  import MenuItem from '$lib/MenuItem.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';
  import PictureFrame from './PictureFrame.svelte';
</script>

<PictureFrame name="MenuBar">
  <div class="layout">
    <MenuBar>
      <MenuItem value="1" text="Item 1">
        <MenuItem value="1A" text="Item 1A" />
        <MenuItem value="1B" text="Item 1B" />
        <MenuItem value="1C" text="Item 1C" />
        <MenuSeparator />
        <MenuItem value="1D" text="Item 1D" />
        <MenuItem value="1E" text="Item 1E" />
      </MenuItem>
      <MenuItem value="2" text="Item 2">
        <MenuItem value="2A" text="Item 2A" role="menuitemcheckbox" checked />
        <MenuSeparator />
        <MenuItem value="2B" text="Item 2B" role="menuitemradio" checked />
        <MenuItem value="2C" text="Item 2C" />
      </MenuItem>
      <MenuItem value="3" text="Item 3">
        <MenuItem value="3A" text="Item 3A" />
        <MenuItem value="3B" text="Item 3B">
          <MenuItem value="3B1" text="Item 3B1" />
          <MenuItem value="3B2" text="Item 3B2" />
          <MenuItem value="3B3" text="Item 3B3" />
        </MenuItem>
        <MenuItem value="3C" text="Item 3C" />
      </MenuItem>
    </MenuBar>
  </div>
</PictureFrame>
