<script>
    import Playground from './TabPlayground.svelte';
</script>

# Tab

A selectable item within a tab list.

## Playground

<Playground />

## Features

- You can define the content of the tab with the default slot.
- The tab acts as an HTML button. Events are bubbled.
- Visually indicates selection.

## Props

| Name     | Type         | Default | Description                         |
| -------- | ------------ | ------- | ----------------------------------- |
| data     | `TabData<T>` |         | A data object for databinding.      |
| disabled | `boolean`    | `false` | If the tab item is disabled         |
| selected | `boolean`    | `false` | If the tab item is selected         |
| tabId    | `string`     |         | The ID of the tab item              |
| text     | `string`     |         | Text to display in the default slot |

## Anatomy

```
Tab
  default slot
  indicator
```

## Slots

| Slot    | Description            |
| ------- | ---------------------- |
| default | The content to display |

- default slot `let` params: data, disabled, selected, tabId, and text.
