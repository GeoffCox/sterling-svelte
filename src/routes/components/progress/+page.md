# Progress

An indicator of a value between 0 and a maximum value.

<script>
    import Example from './ProgressExample.svelte';
</script>

## Playground

<Example />

## Features

- Choose between a horizontal or vertical progress bar.
- Identify the value with an associated label.
- Give meaning to the value with semantic colors.
- Bind to the calculated percentage.

## Props

| Name                | Type             | Description                                    |
| ------------------- | ---------------- | ---------------------------------------------- |
| colorful            | ProgressColorful | Changes the indicator color. Defaults to none. |
| disabled            | boolean          | Disables the progress making it look inactive  |
| max                 | number           | The maximum value to display. Defaults to 100  |
| percent (read only) | number           | The percentage of value / max                  |
| value               | number           | The current value to display                   |
| vertical            | boolean          | Displays the progress vertically               |

- ProgressColorful: 'none' | 'auto' | 'progress' | 'success' | 'warning' | 'error'
  - auto: Set to 'progress' when value less than max and 'success' when value equals max.

## Anatomy

```
  label slot
  indicator
```

## Slots

| Name  | Description                            |
| ----- | -------------------------------------- |
| label | The label associated with the progress |
