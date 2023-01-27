<script>
    import Playground from './TreeNodePlayground.svelte';
</script>

# TreeNode

Displays the item and children of a node in a tree.

## Playground

In this example the node ID is the name of each item.

<Playground />

## Features

- Provides a chevron for expanded and collapsed states.
- Visual indicates when the node is selected.
- Can customize the label with the label slot.

## Anatomy

```
TreeNodeItem
  TreeNodeChevron
  label slot
```

### Slot let params

- label: `depth`, `disabled`, `expanded`, `hasChildren`, `selected`

## Props

| Name     | Type              | Description                      |
| -------- | ----------------- | -------------------------------- |
| disabled | `boolean`         | Disables this tree node.         |
| nodeId   | `string`          | The id for this tree node.\*     |
| node     | `TreeNodeData<T>` | The data for this tree node.\*\* |

- \* When declaring a hierarchy of tree nodes in HTML, set the nodeId.
- \*\* When the TreeNode is used within a Tree, the Tree's getNodeId function is used to set the nodeId from the node data.

## Context

- In order for TreeNode to behave property, it needs some values set on context.
- Tree and TreeNode handle properly setting context for children.
- If you create your own container for TreeNodes, you will need to set the same context values.

| Key                  | Type                 | Properties                                         |
| -------------------- | -------------------- | -------------------------------------------------- |
| `'sterlingTree'`     | `TreeContext<T>`     | `getNodeId()`, `expandedNodeIds`, `selectedNodeId` |
| `'sterlingTreeNode'` | `TreeNodeContext<T>` | `parentNodeId`, `depth`                            |
