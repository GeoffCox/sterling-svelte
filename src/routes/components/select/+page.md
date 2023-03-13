<script>
    import Playground from './SelectPlayground.svelte';
</script>

# Select

A single item that can be selected from a dropdown list of items.

## Playground

<Playground />

## Features

- Identify the value and list of items with an associated label.
- Imperatively open and close the dropdown.
- The dropwon is dynamically positioned based on avaiable screen space.
- Users can open and close the dropdown by clicking the input or chevron.
- Users can close the dropdown by clicking on outside the input or dropdown.
- Users can select the next or previous item without opening the dropdown by using the up/down arrow keys.
- Users can open the dropdown with the spacebar key.
- Users can choose the selected value in the dropdown with the either enter or spacebar keys.
- Users can close the dropdown and cancel changing the current value with the escape key.

## Props

| Name          | Type                    | Default     | Description                                          |
| ------------- | ----------------------- | ----------- | ---------------------------------------------------- |
| composed      | `boolean`               | `false`     | Styles the select to appear within another component |
| disabled      | `boolean`               | `false`     | Disables the select                                  |
| open          | `boolean`               | `false`     | If the menu is open                                  |
| selectedValue | `string` \| `undefined` | `undefined` | The value of the selected item                       |

## Events

| Name    | Event.detail        | Description                                          |
| ------- | ------------------- | ---------------------------------------------------- |
| pending | `{ value: string }` | Raised as items are selected while the menu is open. |
| select  | `{ value: string }` | Raised when an item is selected.                     |

## Anatomy

```
Select
  Label
    label slot
  value slot
  button slot
  dropdown
    list slot
      default slot
```

## Slots

| Name    | Description                                                     |
| ------- | --------------------------------------------------------------- |
| button  | The button that opens and closes the menu. `Button` by default. |
| default | The items to display within the list                            |
| label   | The label content associated with the input.                    |
| list    | The list containing items within the menu. `List` by default.   |
| value   | The value display of of the current selected item.              |
