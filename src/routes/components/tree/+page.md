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

- A single node can be selected. Focus follows selection.
- Nodes can be expanded to show children or collapsed to hide children.
- You can choose to have nodes expanded or collapsed by default.
- Users can select the previous/next visible node with the up/down arrow keys.
- Users can expand/collpase expanded/collapse nodes with the right/left arrow keys.
- If the node is already expanded, the right arrow key selects the next node.
- If the node is already collpased, the left arrow key selects the previous node.
- You can identify the tree's content with the optional label.

## Anatomy

```
Tree
  label slot
  tree
      TreeNode
        item slot
          TreeItem
            nodeLabel slot
      default slot
```

- Tree renders a TreeNode for each of the nodes.
- TreeNode renders its item slot and then its TreeNode children.
- Tree and TreeNode work together to recursively render the hierarchy of items. They coordinate through svelte context.

### Slots

| Slot      | Description                                      |
| --------- | ------------------------------------------------ |
| label     | The tree label                                   |
| item      | The template for each item, defaults to TreeItem |
| nodeLabel | The template for the label within each TreeItem  |
| default   | Any declared TreeNode children                   |

#### let params

The item and nodeLabel slots are passed the following `let` parameters.

| Let Param   | Type          | Description                                 |
| ----------- | ------------- | ------------------------------------------- |
| depth       | `number`      | The depth of this node in the tree          |
| disabled    | `boolean`     | True if the tree and this node are disabled |
| expanded    | `boolean`     | True if this node is expanded               |
| hasChildren | `boolean`     | True if this node has children              |
| node        | `TreeNode<T>` | The node data for this node                 |
| nodeID      | `string`      | The ID of this node                         |
| selected    | `boolean`     | True if this node is selected               |

## Props

| Prop            | Type                                 | Description                                             |
| --------------- | ------------------------------------ | ------------------------------------------------------- |
| composed        | `boolean`                            | Indicates the tree is composed within another component |
| disabled        | `boolean`                            | Disables the tree and nodes                             |
| expandedNodeIds | `string[]`                           | The IDs of expanded nodes                               |
| nodes           | `TreeNode<T>[]`                      | The list of top level nodes in the hierarchy            |
| selectedNodeId  | `string` <b>&#10072;</b> `undefined` | The ID of the selected node                             |

## Events

| Event          | Detail                           | Description                                 |
| -------------- | -------------------------------- | ------------------------------------------- |
| select         | `{ selectedNodeId: string; }`    | Raised when a node is selected              |
| expandCollapse | `{ expandedNodeIds: string[]; }` | Raised when a node is expanded or collapsed |

## Methods

## Examples

### Custom item slot

<ItemSlotExample/>

### Custom label slot

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
