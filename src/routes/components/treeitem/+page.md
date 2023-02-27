<script>
    import Playground from './TreeItemPlayground.svelte';
</script>

# TreeItem

An item within a Tree.

## Playground

<Playground />

## Features

- A single tree item can be selected.
- Focus follows selection.

## Interactions

- Clicking a tree item selects it.
- Clicking a tree item with children will toggle expand/collapse.
- Up/Down arrow keys will select the previous/next tree item in the hierarchy.
- Right/Left arrow keys will expand/collapse tree items with children.
- If the tree item is already expanded, right arrow selects the first child.
- If the tree item is already collpased, left arrow selects the previous tree item.

- Note: A tree item is identified by having `data-value` and `role="treeitem"` properties

## Props

| Prop     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| value    | `string`  | The unique value of the tree item |
| disabled | `boolean` | Disables the tree item            |

## Events

| Event          | Detail                          | Description                                      |
| -------------- | ------------------------------- | ------------------------------------------------ |
| select         | `{ selectedValue: string; }`    | Raised when a tree item is selected              |
| expandCollapse | `{ expandedValues: string[]; }` | Raised when a tree item is expanded or collapsed |

## Anatomy

```
Tree
  label slot
  tree
      default slot
```

## Slots

| Slot    | Description        |
| ------- | ------------------ |
| default | Tree item children |
| label   | The tree label     |

### let params

| Let Param   | Type      | Passed to slots |
| ----------- | --------- | --------------- |
| depth       | `number`  | item, label     |
| disabled    | `boolean` | item, label     |
| expanded    | `boolean` | item, label     |
| hasChildren | `boolean` | item, label     |
| selected    | `boolean` | item, label     |
| value       | `string`  | item, label     |
