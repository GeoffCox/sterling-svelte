<script>
    import Example from './TreeItemExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# TreeItem

A wrapper around each item in a Tree when the Tree's item slot is not filled.

## Playground

<Example />

## Features

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
