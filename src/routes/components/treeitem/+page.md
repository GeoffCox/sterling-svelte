<script>
    import Playground from './TreeItemPlayground.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# TreeItem

Displays a chevron and a label for an item in a tree.

## Playground

<Playground />

## Features

- Provides a chevron for expanded and collapsed states.
- Visual indicates when the node is selected.
- The content can be customized with the default slot.

## Props

| Name        | Type      | Description                                      |
| ----------- | --------- | ------------------------------------------------ |
| depth       | `number`  | The depth of the associated node witin the tree. |
| disabled    | `boolean` | Disables the item                                |
| expanded    | `boolean` | If the associated node is expanded.              |
| hasChildren | `boolean` | If the associated node has children.             |
| selected    | `boolean` | If the associated node has is selected.          |

## Anatomy

```
TreeItem
  TreeChevron
  default slot
```

## Slots

| Slot    | Description                   |
| ------- | ----------------------------- |
| default | The content after the chevron |

### let params

The default slot is passed the following `let` parameters.

| Let Param   | Type          | Description                                 |
| ----------- | ------------- | ------------------------------------------- |
| depth       | `number`      | The depth of this node in the tree          |
| disabled    | `boolean`     | True if the tree and this node are disabled |
| expanded    | `boolean`     | True if this node is expanded               |
| hasChildren | `boolean`     | True if this node has children              |
| node        | `TreeNode<T>` | The node data for this node                 |
| nodeID      | `string`      | The ID of this node                         |
| selected    | `boolean`     | True if this node is selected               |
