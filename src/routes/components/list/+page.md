<script>
    import Playground from './ListPlayground.svelte';
</script>

# List

A list of items where a single item can be selected.

## Playground

<Playground />

## Features

- Choose between a vertical or horizontal list.
- Identify the list of items with an associated label.
- Compose the list into another control that manages border and focus visuals.
- Imperatively select first, previous, next, or last item.
- Users can select previous/next items with up/down or left/right arrow keys.
- Users can select the first/last item with home/end keys.

## Usage

Declare a List with ListItems inside.

```svelte
<script lang="ts">
  let selectedItemId = 'banana';
</script>

<List bind:selectedItemId>
  <span slot="label">Fruits</span>
  <ListItem itemId="apple">Apple</ListItem>
  <ListItem itemId="banana">Banana</ListItem>
  <ListItem itemId="pear">Pear</ListItem>
  <ListItem itemId="grape">Grape</ListItem>
</List>
```

## Props

| Name           | Type    | Description                                         |
| -------------- | ------- | --------------------------------------------------- |
| composed       | boolean | Styles the list to appear within another component. |
| disabled       | boolean | Disables the list and items                         |
| horizontal     | boolean | If the list layout should be horizontal             |
| selectedItemId | string  | The ID of the currently selected item               |

## Events

| Name   | Event.detail | Description                      |
| ------ | ------------ | -------------------------------- |
| select | `{ itemId }` | Raised when an item is selected. |

## Methods

| Name               | Description                    |
| ------------------ | ------------------------------ |
| selectFirstItem    | Selects the first list item    |
| selectPreviousItem | Selects the previous list item |
| selectNextItem     | Selects the next list item     |
| selectLastItem     | Selects the last list item     |

- A list item is identified by having the `data-list-item-id` property
- List items should also have `role=option` in this listbox.

## List Context

| Name           | Type                | Description                     |
| -------------- | ------------------- | ------------------------------- |
| disabled       | `Readable<boolean>` | If the list is disabled         |
| selectedItemId | `Writable<boolean>` | The itemId of the selected item |
| horizontal     | `Readable<boolean>` | If the list is horizontal       |

## Anatomy

```
List
  label slot
    default slot
```

## Slots

| Name    | `let` params | Description                         |
| ------- | ------------ | ----------------------------------- |
| default | (multiple)\* | The list items within this list     |
| label   |              | The label associated with the input |

## Let Params

| Name           | Type      | Passed to slots |
| -------------- | --------- | --------------- |
| composed       | `boolean` | default, label  |
| disabled       | `boolean` | default, label  |
| horizontal     | `boolean` | default, label  |
| selectedItemId | `string`  | default, label  |
