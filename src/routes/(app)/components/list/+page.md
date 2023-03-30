<script>
    import Playground from './ListPlayground.svelte';
</script>

# List

A list of items where an item can be selected.

## Playground

<Playground />

## Features

- Choose between a vertical or horizontal list.
- Identify the list of items with an associated label.
- Compose the list into another control that manages border and focus.

## Interactions

- Clicking an item selects it.
- Up/Down or left/right arrow keys select the previous/next item.
- Home/End keys select first/last item.

- Note: A list item is identified by having `data-value` and `role="listitem"` properties

## Usage

```svelte
<script lang="ts">
  let selectedValue = 'banana';
</script>

<List bind:selectedValue>
  <ListItem value="apple">Apple</ListItem>
  <ListItem value="banana">Banana</ListItem>
  <ListItem value="pear">Pear</ListItem>
  <ListItem value="grape">Grape</ListItem>
</List>
```

## Props

| Name          | Type                    | Default     | Description                                        |
| ------------- | ----------------------- | ----------- | -------------------------------------------------- |
| (div)         |                         |             | HTMLDivElement events                              |
| composed      | `boolean`               | `false`     | Styles the list to appear within another component |
| disabled      | `boolean`               | `false`     | Disables the list and items                        |
| horizontal    | `boolean`               | `false`     | If the list layout should be horizontal            |
| selectedValue | `string` \| `undefined` | `undefined` | The value of the currently selected item           |

## Events

| Name   | Event.detail        | Description                      |
| ------ | ------------------- | -------------------------------- |
| (div)  |                     | HTMLDivElement events            |
| select | `{ value: string }` | Raised when an item is selected. |

## Methods

| Name                 | Parameters  | Description                           |
| -------------------- | ----------- | ------------------------------------- |
| blur                 |             | HTMLDivElement.blur                   |
| click                |             | HTMLDivElement.click                  |
| focus                | `(options)` | HTMLDivElement.focus                  |
| scrollToSelectedItem |             | Scrolls to the selected item          |
| selectFirstItem      |             | Selects the first item in the list    |
| selectPreviousItem   |             | Selects the previous item in the list |
| selectNextItem       |             | Selects the next item in the list     |
| selectLastItem       |             | Selects the last item in the list     |

## Context

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
