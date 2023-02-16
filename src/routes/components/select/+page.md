<script>
    import Example from './SelectExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# Select

A single item that can be selected from a menu list of items.

## Playground

<Example />

## Features

- Identify the value and list of items with an associated label.

### Mouse

- Clicking within the select opens and closes the menu.
- Clicking outside the select and menu closes the menu.

### Keyboard

- Arrow keys selected the next or previous item without opening the menu.
- Space key opens and closes the menu when the select has focus.
- Escape key closes the menu without changing selection.
- Enter key selects the current item in the menu and closes the menu.

### Menu

- The menu is dynamically positioned based on avaiable screen space.

## Props

| Name                    | Type    | Description                              |
| ----------------------- | ------- | ---------------------------------------- |
| disabled                | boolean | Disables the select                      |
| items                   | any[]   | The items to list in the menu            |
| open                    | boolean | If the menu is open                      |
| selectedIndex           | number  | The index of the currently selected item |
| selectedItem (readonly) | any     | The currently selected item              |

## Events

| Name              | Event.detail      | Description                                          |
| ----------------- | ----------------- | ---------------------------------------------------- |
| itemSelectPending | `{ index, item }` | Raised as items are selected while the menu is open. |
| itemSelected      | `{ index, item }` | Raised when an item is selected.                     |

## Anatomy

```
  label slot
  value
  button
  menu
  list slot
    List
    _default_ slot (item template)
```

## Slots

| Name      | Description                                                                                  |
| --------- | -------------------------------------------------------------------------------------------- |
| _default_ | A template for rendering each item. Item is passed disabled, index, item, and selected props |
| button    | The button that opens and closes the menu. `Button` by default.                              |
| label     | The label associated with the input. The selected item as text by default.                   |
| list      | The list containing items within the menu. `List` by default.                                |
| value     | The value display of of the current selected item.                                           |
