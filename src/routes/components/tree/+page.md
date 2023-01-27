<script>
    import Playground from './TreePlayground.svelte';
    import ItemSlotExample from './ItemSlotExample.svelte';
    import LabelSlotExample from './LabelSlotExample.svelte';
    import DeclarativeExample from './DeclarativeExample.svelte';
</script>

# Tree

A hierarchy of items (a.k.a. nodes)

## Playground

<Playground />

## Features

- A single node can be selected (focus follows selection)
- Nodes with children can be expanded or collapsed.
- The previous/next visible node can be selected with the up/down arrow keys.
- A node can be expanded/collapsed with the right/left arrow keys.
- If the node is already collpased, the left arrow key navigates to the previous node.
- The tree can have a label to identify its contents.

## Anatomy

```
Tree
  label slot
  tree
      TreeNode
        item slot
          TreeNodeItem
            nodeLabel slot
      TreeNode
      ...
      default slot
```

### Slot let params

- item, nodeLabel, default: `disabled`, `expanded`, `hasChildren`, `depth`, `node`, `nodeId`, `selected`

## Props

| Name            | Type                                 | Description                                              |
| --------------- | ------------------------------------ | -------------------------------------------------------- |
| composed        | `boolean`                            | Indicates the tree is composed within another component. |
|                 |                                      | Removes background, border, and outline styles.          |
| disabled        | `boolean`                            | Disables the tree and nodes                              |
| nodes           | `TreeNode<T>[]`                      | The tree node hierarchy                                  |
| selectedNodeId  | `string` <b>&#10072;</b> `undefined` | The ID of the selected node                              |
| expandedNodeIds | `string[]`                           | The IDs of expanded nodes                                |

## Events

- `expandedChanged { node: TreeNode<T> }`
- `nodeExpanded { node: TreeNode<T> }`
- `nodeSelected { node: TreeNode<T> }`

## Methods

- `collapseNode(node: TreeItem<T>) : boolean`
- `expandNode(node: TreeItem<T>) : boolean`

  Only expands the specified node. Does not ensure node is visible by expanding parents.

- `focusSelectedNode()`
- `selectPreviousNode()`
- `selectNextNode()`
- `toggleNode(node: TreeItem<T>) : boolean`

## Examples

### Custom `item` slot

<ItemSlotExample/>

### Custom `label` slot

<LabelSlotExample/>

### Declarative Tree

You can create trees by declaring them in your HTML.
This tree mimics the data-bound tree by declaring a `Tree` containing a hierarchy of `TreeNode`s.

```svelte
<Tree>
  <TreeNode nodeId="Coffee">
    <TreeNode nodeId="Americano" />
    <TreeNode nodeId="Brewed">
      <TreeNode nodeId="Light roast" />
      <TreeNode nodeId="Medium roast" />
      <TreeNode nodeId="Dark roast" />
      <TreeNode nodeId="House blend" />
    </TreeNode>
    <TreeNode nodeId="Cappuccino" />
    <!-- ... -->
</Tree>
```

<DeclarativeExample/>
