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

## Props

| Name                    | Type    | Description                                              |
| ----------------------- | ------- | -------------------------------------------------------- |
| composed                | boolean | Indicates the list is composed within another component. |
|                         |         | Removes background, border, and outline styles.          |
| disabled                | boolean | Disables the list and items                              |
| items                   | any[]   | The items in the list                                    |
| horizontal              | boolean | If the list layout should be horizontal                  |
| selectedIndex           | number  | The index of the currently selected item                 |
| selectedItem (readonly) | any     | The currently selected item                              |

## Events

| Name         | Event.detail      | Description                      |
| ------------ | ----------------- | -------------------------------- |
| itemSelected | `{ index, item }` | Raised when an item is selected. |

## Methods

| Name               | Description                                        |
| ------------------ | -------------------------------------------------- |
| focusSelectedItem  | Focuses the selected item and scrolls it into view |
| selectPreviousItem | Selected the previous item                         |
| selectNextItem     | Selected the next item                             |

## Anatomy

```
List
  label slot
  list of items
    item slot
      ListItem
        _default_ slot
```

## Slots

| Name      | `let` params | Description                             |
| --------- | ------------ | --------------------------------------- |
| _default_ | (multiple)\* | Each item wrapped in a ListItem         |
| item      | (multiple)\* | Each item without the ListItem wrapper. |
| label     |              | The label associated with the input     |

\* `disabled`, `index`, `item` and `selected`
