<script>
    import Playground from './ListItemPlayground.svelte';
</script>

# ListItem

An item appearing within a List.

## Playground

<Playground />

## Features

- Displays `selected` on List `selectedValue`.
- Displays `disabled` based on List `disabled`.
- Applies `role="listitem"` and `data-value={value}` to support selection by List.

## Usage

```svelte
<List>
  <ListItem value="example">An example item</ListItem>
</List>
```

## Props

| Name     | Type                 | Description                  |
| -------- | -------------------- | ---------------------------- |
| (div)    | HTMLDivElement props | Built in HTML properties     |
| disabled | `boolean`            | Disables the list item       |
| value    | `string`             | The value of the list item\* |

- \* Should be unique within the list

## Anatomy

```
ListItem
  default slot
```

## Slots

| Name    | Description           |
| ------- | --------------------- |
| default | The list item content |

## Let Params

| Name       | Type      | Passed to slots |
| ---------- | --------- | --------------- |
| disabled   | `boolean` | default         |
| horizontal | `boolean` | default         |
| selected   | `boolean` | default         |
| value      | `string`  | default         |
