<script>
    import Playground from './TabPlayground.svelte';
</script>

# Tab

An item within a TabList.

## Playground

<Playground />

## Features

- You can define the content of the tab with the default slot.
- The tab acts as an HTML button. Events are bubbled.
- Visually indicates selection.

## Props

| Name     | Type      | Default | Description                         |
| -------- | --------- | ------- | ----------------------------------- |
| disabled | `boolean` | `false` | If the tab item is disabled\*       |
| selected | `boolean` | `false` | If the tab item is selected\*\*     |
| text     | `string`  |         | Text to display in the default slot |
| value    | `string`  |         | The value of the tab item           |

- \* Tab will use disabled from TabList to also disable the tab when the TabList is disabled.
- \*\* Tab will use the selectedValue from TabList to automatically update selected.

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

## Let Params

| Name     | Type      | Passed to slots |
| -------- | --------- | --------------- |
| disabled | `boolean` | default         |
| selected | `boolean` | default         |
| text     | `string`  | default         |
| value    | `string`  | default         |
