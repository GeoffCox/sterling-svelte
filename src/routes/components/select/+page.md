<script>
    import Playground from './SelectPlayground.svelte';
</script>

# Select

A single item that can be selected from a dropdown list of items.

## Playground

<Playground />

## Features

- The dropdown is dynamically positioned based on avaiable screen space.
- Compose the select into another control that manages border and focus.

## Interactions

- Clicking the input or chevron opens/closes the dropdown.
- Clicking outside an open dropdown closes it.
- Up/Down arrow keys select the previous/next item in the list of items.
- The space key opens/closes the dropdown.
- The enter key chooses the selected value in the dropdown and closes it.
- The escape key closes the dropdown without changing the value.

## Usage

```svelte
<script lang="ts">
  import Select from '@geoffcox/sterling-svelte/Select.svelte';
</script>

<Component />
```

## Props

| Name          | Type                    | Default     | Description                                          |
| ------------- | ----------------------- | ----------- | ---------------------------------------------------- |
| (div)         |                         |             | HTMLDivElement events                                |
| composed      | `boolean`               | `false`     | Styles the select to appear within another component |
| disabled      | `boolean`               | `false`     | Disables the select                                  |
| open          | `boolean`               | `false`     | If the menu is open                                  |
| selectedValue | `string` \| `undefined` | `undefined` | The value of the selected item                       |

## Events

| Name    | Event.detail        | Description                                          |
| ------- | ------------------- | ---------------------------------------------------- |
| (div)   |                     | HTMLDivElement events                                |
| pending | `{ value: string }` | Raised as items are selected while the menu is open. |
| select  | `{ value: string }` | Raised when an item is selected.                     |

## Methods

| Name                 | Parameters  | Description                         |
| -------------------- | ----------- | ----------------------------------- |
| blur                 |             | HTMLDivElement.blur                 |
| click                |             | HTMLDivElement.click                |
| focus                | `(options)` | HTMLDivElement.focus                |
| scrollToSelectedItem |             | HTMLDivElement.scrolltoSelectedItem |

## Anatomy

```
Select (div)
  value slot
    {selectedValue}
  button slot
  dropdown
    list slot
      default slot
```

## Slots

| Name    | Description                                       |
| ------- | ------------------------------------------------- |
| button  | The button that opens and closes the menu.        |
| default | The items to display within the list              |
| value   | The value display of of the current selected item |

## Let Params

| Name          | Passed to slots |
| ------------- | --------------- |
| disabled      | button, value   |
| open          | button, value   |
| selectedValue | button, value   |
