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
- Compose the list into another control that manages border and focus display.

## Interactions

- Up/Down or left/right arrow keys select the previous/next item.
- Home/End keys select first/last item.

## Usage

```svelte
<script lang="ts">
  let selectedValue = 'banana';
</script>

<List bind:selectedValue>
  <span slot="label">Fruits</span>
  <ListItem value="apple">Apple</ListItem>
  <ListItem value="banana">Banana</ListItem>
  <ListItem value="pear">Pear</ListItem>
  <ListItem value="grape">Grape</ListItem>
</List>
```

## Props

| Name          | Type    | Description                                        |
| ------------- | ------- | -------------------------------------------------- |
| composed      | boolean | Styles the list to appear within another component |
| disabled      | boolean | Disables the list and items                        |
| horizontal    | boolean | If the list layout should be horizontal            |
| selectedValue | string  | The value of the currently selected item           |

## Events

| Name   | Event.detail        | Description                      |
| ------ | ------------------- | -------------------------------- |
| select | `{ value: string }` | Raised when an item is selected. |

## Methods

| Name                 | Description   |
| -------------------- | ------------- |
| focus                | (autological) |
| scrollToSelectedItem | (autological) |
| selectFirstItem      | (autological) |
| selectPreviousItem   | (autological) |
| selectNextItem       | (autological) |
| selectLastItem       | (autological) |

- A list item is identified by having `data-value` and `role="listitem"` properties

## List Context

| Name          | Type                |
| ------------- | ------------------- |
| disabled      | `Readable<boolean>` |
| selectedValue | `Writable<boolean>` |
| horizontal    | `Readable<boolean>` |

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

| Name       | Type      | Passed to slots |
| ---------- | --------- | --------------- |
| composed   | `boolean` | default, label  |
| disabled   | `boolean` | default, label  |
| horizontal | `boolean` | default, label  |
| value      | `string`  | default, label  |
