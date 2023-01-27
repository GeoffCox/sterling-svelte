<script lang="ts">
  import Tree from '$lib/containers/Tree.svelte';
  import TreeNode from '$lib/containers/TreeNode.svelte';
</script>

<div class="example">
  <Tree>
    <TreeNode nodeId="Coffees">
      <TreeNode nodeId="Americano" />
      <TreeNode nodeId="Brewed">
        <TreeNode nodeId="Light roast" />
        <TreeNode nodeId="Medium roast" />
        <TreeNode nodeId="Dark roast" />
        <TreeNode nodeId="House blend" />
      </TreeNode>
      <TreeNode nodeId="Cappuccino" />
      <TreeNode nodeId="Espresso" />
      <TreeNode nodeId="Latte" />
      <TreeNode nodeId="Macchiato" />
      <TreeNode nodeId="Mochas">
        <TreeNode nodeId="Dark Chocolate Mocha" />
        <TreeNode nodeId="White Chocolate Mocha" />
        <TreeNode nodeId="Peppermint Chocolate Mocha" />
      </TreeNode>
      <TreeNode nodeId="Add-ins">
        <TreeNode nodeId="Milks">
          <TreeNode nodeId="Almond Milk" />
          <TreeNode nodeId="Fat Free  Milk" />
          <TreeNode nodeId="Non-dairy Creamer" />
          <TreeNode nodeId="Soy Milk" />
          <TreeNode nodeId="Two percent Milk" />
          <TreeNode nodeId="Whole Milk" />
        </TreeNode>
        <TreeNode nodeId="Syrups">
          <TreeNode nodeId="Almond syrup" />
          <TreeNode nodeId="Hazelnut syrup" />
          <TreeNode nodeId="Irish Creme syrup" />
          <TreeNode nodeId="Vanilla syrup" />
        </TreeNode>
        <TreeNode nodeId="Toppings">
          <TreeNode nodeId="Caramel" />
          <TreeNode nodeId="Cinnamon" />
          <TreeNode nodeId="Vanilla Flakes" />
        </TreeNode>
      </TreeNode>
    </TreeNode>
  </Tree>
</div>

<style>
  .example {
    width: 350px;
  }
</style>
