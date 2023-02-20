<script>
    import Playground from './TreeItemPlayground.svelte';
</script>

# TreeItem

An item within a Tree.

## Playground

<Playground />

## Features

- A single tree item can be selected. Focus follows selection.
- Tree items can be expanded/collapsed to show/hide children.
- Users can select the previous/next visible tree item with the up/down arrow keys.
- Users can expand/collpase expanded/collapse tree items with the right/left arrow keys.
- If the tree item is already expanded, right arrow selects the first child.
- If the tree item is already collpased, left arrow selects the previous tree item.
- You can identify the tree's content with the optional label.

## Props

| Prop            | Type                                 | Description                                             |
| --------------- | ------------------------------------ | ------------------------------------------------------- |
| composed        | `boolean`                            | Indicates the tree is composed within another component |
| disabled        | `boolean`                            | Disables the tree and tree items                        |
| expandedItemIds | `string[]`                           | The IDs of expanded tree items                          |
| selectedItemId  | `string` <b>&#10072;</b> `undefined` | The ID of the selected tree item                        |

## Events

| Event          | Detail                           | Description                                      |
| -------------- | -------------------------------- | ------------------------------------------------ |
| select         | `{ selectedItemId: string; }`    | Raised when a tree item is selected              |
| expandCollapse | `{ expandedItemIds: string[]; }` | Raised when a tree item is expanded or collapsed |

## Anatomy

```
Tree
  label slot
  tree
      default slot
```

## Slots

| Slot    | Description                    |
| ------- | ------------------------------ |
| default | Any declared TreeItem children |
| label   | The tree label                 |

### let params

The item and nodeLabel slots are passed the following `let` parameters.

| Let Param   | Type          | Description                                      |
| ----------- | ------------- | ------------------------------------------------ |
| depth       | `number`      | The depth of this tree item in the tree          |
| disabled    | `boolean`     | True if the tree and this tree item are disabled |
| expanded    | `boolean`     | True if this tree item is expanded               |
| hasChildren | `boolean`     | True if this tree item has children              |
| tree item   | `TreeItem<T>` | The tree item data for this tree item            |
| nodeID      | `string`      | The ID of this tree item                         |
| selected    | `boolean`     | True if this tree item is selected               |
