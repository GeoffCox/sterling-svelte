<script>
    import Playground from './TabPlayground.svelte';
</script>

# Tab

An item within a `TabList`.

## Playground

<Playground />

## Features

- Set the tab content.
- Visually indicates selection.

## Interactions

- Clicking the tab selects it.
- Space key selects the tab.

## Props

| Name     | Type      | Default | Description                         |
| -------- | --------- | ------- | ----------------------------------- |
| (button) |           |         | HTMLButtonElement properties        |
| disabled | `boolean` | `false` | If the tab item is disabled\*       |
| selected | `boolean` | `false` | If the tab item is selected\*\*     |
| text     | `string`  |         | Text to display in the default slot |
| value    | `string`  |         | The value of the tab item           |

- \* Tab will use disabled from TabListContext to also disable the tab when the TabList is disabled.
- \*\* Tab will use the selectedValue from TabListContext to automatically update the selected value.

## Events

| Name     | Event.detail | Description              |
| -------- | ------------ | ------------------------ |
| (button) |              | HTMLButtonElement events |

## Methods

| Name  | Parameters  | Description          |
| ----- | ----------- | -------------------- |
| blur  |             | HTMLDivElement.blur  |
| click |             | HTMLDivElement.click |
| focus | `(options)` | HTMLDivElement.focus |

## Anatomy

```
Tab (button)
  default slot
    {text} | {value}
  indicator
```

## Slots

| Slot    | Description      |
| ------- | ---------------- |
| default | The tab contents |

## Let Params

| Name     | Type      | Passed to slots |
| -------- | --------- | --------------- |
| disabled | `boolean` | default         |
| selected | `boolean` | default         |
| text     | `string`  | default         |
| value    | `string`  | default         |
