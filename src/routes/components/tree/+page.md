<script>
    import Example from './TreeExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# Tree

A hierarchy of items (a.k.a. nodes)

## Playground

<Example />

## Features

- A single node can be selected (focus follows selection)
- Nodes with children can be expanded or collapsed.
- The previous/next visible node can be selected with the up/down arrow keys.
- A node can be expanded/collapsed with the right/left arrow keys.
- If the node is already collpased, the left arrow key navigates to the previous node.
- The tree can have a label to identify its contents.

## Anatomy

```
  label slot
  List (hierarchy of nodes flattened into a list)
    item slot**
      TreeItem
        default slot
```

### Slot let params

- label: `disabled`
- item, _default_: `disabled`, `expanded`, `hasChildren`, `index`, `item`, `level`, `selected`

## Props

| Name         | Type            | Description                             |
| ------------ | --------------- | --------------------------------------- |
| disabled     | `boolean`       | Disables the tree and nodes             |
| nodes        | `TreeNode<T>[]` | The tree node hierarchy                 |
| selectedNode | `TreeNode<T>`   | The currently selected node (readonly). |

## Events

- `nodeCollapsed { node: TreeNode<T> }`
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
