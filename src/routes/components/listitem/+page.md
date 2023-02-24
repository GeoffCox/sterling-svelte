<script>
    import Playground from './ListItemPlayground.svelte';
</script>

# ListItem

An item appearing within a List.

## Playground

<Playground />

## Features

- Displays selected on the parent List's selectedItemId.
- Displays disabled based on the parent List's disabled.

## Props

| Name     | Type                 | Description              |
| -------- | -------------------- | ------------------------ |
| (div)    | HTMLDivElement props | Built in HTML properties |
| disabled | boolean              | Disables the list item   |
| itemId   | string               | The ID of the item       |

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
| itemId     | `string`  | default         |
| selected   | `boolean` | default         |
