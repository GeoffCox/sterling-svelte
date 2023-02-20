<script>
    import Playground from './TreeItemDisplayPlayground.svelte';
</script>

# TreeItemDisplay

Displays a chevron and a label for an item in a tree.

## Playground

<Playground />

## Features

- Provides a chevron for expanded and collapsed states.
- Visually indicates when the item is selected.
- The content can be customized with the default slot.

## Props

| Name        | Type      | Description                                           |
| ----------- | --------- | ----------------------------------------------------- |
| depth       | `number`  | The depth of the associated tree item witin the tree. |
| disabled    | `boolean` | Disables the item                                     |
| expanded    | `boolean` | If the associated tree item is expanded.              |
| hasChildren | `boolean` | If the associated tree item has children.             |
| selected    | `boolean` | If the associated tree item has is selected.          |

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

| Let Param   | Type      | Description                                      |
| ----------- | --------- | ------------------------------------------------ |
| depth       | `number`  | The depth of this tree item in the tree          |
| disabled    | `boolean` | True if the tree and this tree item are disabled |
| expanded    | `boolean` | True if this tree item is expanded               |
| hasChildren | `boolean` | True if this tree item has children              |
| nodeID      | `string`  | The ID of this tree item                         |
| selected    | `boolean` | True if this tree item is selected               |
