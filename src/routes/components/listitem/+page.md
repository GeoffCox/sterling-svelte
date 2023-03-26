<script>
    import Playground from './ListItemPlayground.svelte';
</script>

# ListItem

An item within a `List`.

## Playground

<Playground />

## Features

- Set the item content.
- Provides selection and interaction within a List.
- Compose the list item into another control that manages border and focus.

## Usage

```svelte
<script lang="ts">
  import List from '@geoffcox/sterling-svelte/List.svelte';
  import ListItem from '@geoffcox/sterling-svelte/ListItem.svelte';
</script>

<List>
  <ListItem value="example">An example item</ListItem>
</List>
```

## Props

| Name     | Type      | Default | Description                  |
| -------- | --------- | ------- | ---------------------------- |
| (div)    |           |         | HtmlDivElement properties    |
| disabled | `boolean` | `false` | Disables the list item       |
| value    | `string`  |         | The value of the list item\* |

- \* Should be unique within the list

## Events

| Name  | Event.detail | Description           |
| ----- | ------------ | --------------------- |
| (div) |              | HtmlDivElement events |

## Methods

| Name  | Parameters  | Description       |
| ----- | ----------- | ----------------- |
| blur  |             | HTMLElement.blur  |
| click |             | HTMLElement.click |
| focus | `(options)` | HTMLElement.focus |

## Anatomy

```
ListItem
  default slot
    {value}
```

## Slots

| Name    | Description      |
| ------- | ---------------- |
| default | ListItem content |

## Let Params

| Name       | Passed to slots |
| ---------- | --------------- |
| disabled   | default         |
| horizontal | default         |
| selected   | default         |
| value      | default         |
