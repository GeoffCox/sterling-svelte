<script>
    import Example from './SelectExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# Select

A single item that can be selected from a popup list of items.

<Example />

## Features

### Mouse

- Clicking within the select opens and closes the popup.
- Clicking outside the select and popup closes the popup.

### Keyboard

- Arrow keys selected the next or previous item without opening the popup.
- Space key opens and closes the popup when the select has focus.
- Escape key closes the popup without changing selection.
- Enter key selects the current item in the popup and closes the popup.

### Misc

- An optional label can be specified to identify the list of items.
- The popup will dynamically position itself based on avaiable screen space.
- The popup is given a unique ID per instance of select.
- Chevron is pure CSS rather than an SVG or font icon.
- Size and padding are based on the inherited font.
- HTML div props are forwarded and events are bubbled.

## Props

| Name                    | Type    | Description                              |
| ----------------------- | ------- | ---------------------------------------- |
| disabled                | boolean | Disables the select                      |
| items                   | any[]   | The items to list in the popup           |
| open                    | boolean | If the popup is open                     |
| selectedIndex           | number  | The index of the currently selected item |
| selectedItem (readonly) | any     | The currently selected item              |

## Events

| Name              | Event.detail      | Description                                           |
| ----------------- | ----------------- | ----------------------------------------------------- |
| itemSelectPending | `{ index, item }` | Raised as items are selected while the popup is open. |
| itemSelected      | `{ index, item }` | Raised when an item is selected.                      |

## Slots

| Name      | Description                                                                                  |
| --------- | -------------------------------------------------------------------------------------------- |
| (default) | A template for rendering each item. Item is passed disabled, index, item, and selected props |
| button    | The button that opens and closes the popup. `Button` by default.                             |
| label     | The label associated with the input. The selected item as text by default.                   |
| list      | The list containing items within the popup. `List` by default.                               |
| value     | The value display of of the current selected item.                                           |

## Theming

| Part       | State        | Theme variable                                               |
| ---------- | ------------ | ------------------------------------------------------------ |
| background |              | <ThemePropCard name='--Input__background-color' />           |
| border     |              | <ThemePropCard name='--Input__border-color' />               |
| border     |              | <ThemePropCard name='--Input__border-radius' />              |
| border     |              | <ThemePropCard name='--Input__border-style' />               |
| border     |              | <ThemePropCard name='--Input__border-width' />               |
| foreground |              | <ThemePropCard name='--Input__color' />                      |
| label slot |              | <ThemePropCard name='--Display__color--subtle' />            |
|            |              |                                                              |
| background | hover        | <ThemePropCard name='--Input__background-color--hover' />    |
| border     | hover        | <ThemePropCard name='--Input__border-color--hover' />        |
| foreground | hover        | <ThemePropCard name='--Input__color--hover' />               |
|            |              |                                                              |
| background | focus-within | <ThemePropCard name='--Input__background-color--focus' />    |
| border     | focus-within | <ThemePropCard name='--Input__border-color--focus' />        |
| foreground | focus-within | <ThemePropCard name='--Input__color--focus' />               |
| outline    | focus-within | <ThemePropCard name='--Common__outline-color' />             |
| outline    | focus-within | <ThemePropCard name='--Common__outline-offset' />            |
| outline    | focus-within | <ThemePropCard name='--Common__outline-style' />             |
| outline    | focus-within | <ThemePropCard name='--Common__outline-width' />             |
|            |              |                                                              |
| background | disabled     | <ThemePropCard name='--Input__background-color--disabled' /> |
| border     | disabled     | <ThemePropCard name='--Input__border-color--disabled' />     |
| foreground | disabled     | <ThemePropCard name='--Input__color--disabled' />            |
| label slot | disabled     | <ThemePropCard name='--Display__color--disabled' />          |
