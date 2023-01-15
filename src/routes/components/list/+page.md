<script>
    import Example from './ListExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# List

A list of items where a single item can be selected.

## Playground

<Example />

## Features

- Choose between a vertical or horizontal list.
- Arrow keys selected the next or previous item.
- Identify the list of items with an associated label.

## Anatomy

```
  label slot
  list of items
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
