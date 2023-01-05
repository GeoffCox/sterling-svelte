<script>
    import Example from './ListExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# List

A list of items where a single item can be selected.

<Example />

## Features

- Layout can be a vertical or horizontal list.
- Arrow keys selected the next or previous item.
- An optional label can be specified to identify the list of items.
- Size and padding are based on the inherited font.
- HTML div props are forwarded and events are bubbled.

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
| (default) | A template for rendering each item. Item is passed disabled, index, item, and selected props |
| label     | The label associated with the input                                                          |

## Theming

| Part            | State         | Theme variable                                                |
| --------------- | ------------- | ------------------------------------------------------------- |
| background      |               | <ThemePropCard name='--Common__background-color' />           |
| border          |               | <ThemePropCard name='--Common__border-color' />               |
| border          |               | <ThemePropCard name='--Common__border-radius' />              |
| border          |               | <ThemePropCard name='--Common__border-style' />               |
| border          |               | <ThemePropCard name='--Common__border-width' />               |
| foreground      |               | <ThemePropCard name='--Common__color' />                      |
| item foreground |               | <ThemePropCard name='--Input__color' />                       |
| label slot      |               | <ThemePropCard name='--Display__color--subtle' />             |
| placeholder     |               | <ThemePropCard name='--Display__color--faint' />              |
|                 |               |                                                               |
| border          | hover         | <ThemePropCard name='--Common__border-color--hover' />        |
| foreground      | hover         | <ThemePropCard name='--Common__color--hover' />               |
| item background | hover         | <ThemePropCard name='--Button__background-color--hover' />    |
|                 |               |                                                               |
| item background | selected      | <ThemePropCard name='--Input__background-color--selected' />  |
|                 |               |                                                               |
| border          | focus-visible | <ThemePropCard name='--Common__border-color--focus' />        |
| foreground      | focus-visible | <ThemePropCard name='--Common__color--focus' />               |
| outline         | focus-visible | <ThemePropCard name='--Common__outline-color' />              |
| outline         | focus-visible | <ThemePropCard name='--Common__outline-offset' />             |
| outline         | focus-visible | <ThemePropCard name='--Common__outline-style' />              |
| outline         | focus-visible | <ThemePropCard name='--Common__outline-width' />              |
|                 |               |                                                               |
| background      | disabled      | <ThemePropCard name='--Common__background-color--disabled' /> |
| border          | disabled      | <ThemePropCard name='--Common__border-color--disabled' />     |
| item background | disabled      | <ThemePropCard name='--Input__color--disabled' />             |
| foreground      | disabled      | <ThemePropCard name='--Common__color--disabled' />            |
| label slot      | disabled      | <ThemePropCard name='--Display__color--disabled' />           |
