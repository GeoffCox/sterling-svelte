<script>
    import Example from './TreeExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# Tree

A tree of nodes where a single node can be selected.
Each tree node can be expanded to show children or collpsed to hide children.

## Playground

<Example />

## Features

- Up/Down arrow keys selected the next or previous item.
- Left/Right arrow keys expand or collapse the current node.
- Identify the tree of nodes with an associated label.

## Anatomy

```
  label slot
  list of nodes
    _default_ slot (item template)
```

## Props

| Name                    | Type    | Description                              |
| ----------------------- | ------- | ---------------------------------------- |
| disabled                | boolean | Disables the list and items              |
| items                   | any[]   | The items in the list                    |
| horizontal              | boolean | If the list layout should be horizontal  |
| selectedIndex           | number  | The index of the currently selected item |
| selectedItem (readonly) | any     | The currently selected item              |

## Events

| Name         | Event.detail      | Description                      |
| ------------ | ----------------- | -------------------------------- |
| itemSelected | `{ index, item }` | Raised when an item is selected. |

## Methods

| Name               | Parameters | Description                                        |
| ------------------ | ---------- | -------------------------------------------------- |
| focusSelectedItem  |            | Focuses the selected item and scrolls it into view |
| selectPreviousItem |            | Selected the previous item                         |
| selectNextItem     |            | Selected the next item                             |

## Slots

| Name      | Description                                                                                  |
| --------- | -------------------------------------------------------------------------------------------- |
| _default_ | A template for rendering each item. Item is passed disabled, index, item, and selected props |
| label     | The label associated with the input                                                          |
