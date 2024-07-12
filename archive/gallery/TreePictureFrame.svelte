<script lang="ts">
  import Tree from '$lib/Tree.svelte';
  import TreeItem from '$lib/TreeItem.svelte';
  import PictureFrame from './PictureFrame.svelte';
</script>

<PictureFrame name="Tree">
  <div class="layout">
    <Tree>
      <TreeItem value="1">
        <span slot="label">Item 1</span>
        <TreeItem value="1A">
          <span slot="label">Item 1A</span>
        </TreeItem>
        <TreeItem value="1B">
          <span slot="label">Item 1B</span>
          <TreeItem value="1B1">
            <span slot="label">Item 1B1</span>
          </TreeItem>
          <TreeItem value="1B2">
            <span slot="label">Item 1B2</span>
          </TreeItem>
          <TreeItem value="1B3">
            <span slot="label">Item 1B3</span>
          </TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem value="2">
        <span slot="label">Item 2</span>
        <TreeItem value="2A">
          <span slot="label">Item 2A</span>
        </TreeItem>
        <TreeItem value="2B">
          <span slot="label">Item 2B</span>
        </TreeItem>
        <TreeItem value="2C">
          <span slot="label">Item 2C</span>
        </TreeItem>
      </TreeItem>
      <TreeItem value="3">
        <span slot="label">Item 3</span>
        <TreeItem value="3A">
          <span slot="label">Item 3A</span>
          <TreeItem value="3A1">
            <span slot="label">Item 3A1</span>
            <TreeItem value="3A1A">
              <span slot="label">Item 3A1A</span>
              <TreeItem value="3A1A1">
                <span slot="label">Item 3A1A1</span>
              </TreeItem>
              <TreeItem value="3A1A2">
                <span slot="label">Item 3A1A2</span>
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem value="4">
        <span slot="label">Item 4</span>
      </TreeItem>
    </Tree>
  </div>
</PictureFrame>

<style>
  .layout {
    width: 300px;
    height: 150px;
    overflow: hidden;
  }
</style>
