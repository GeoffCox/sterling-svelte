# Progress

An displayed value in a range.

<script>
    import Playground from './ProgressPlayground.svelte';
</script>

## Playground

<Playground />

## Features

- Horizontal or vertical layout.
- Set semantic colors for the progress state.
- Bind to the calculated percentage.

## Usage

```svelte
<script lang="ts">
  import Progress from '@geoffcox/sterling-svelte/Progress.svelte';
  let value = 50;
  let percent = 0;
</script>

<Progress {value} bind:percent />
<span>{percent}%</span>
```

## Props

| Name                | Type               | Default  | Description                  |
| ------------------- | ------------------ | -------- | ---------------------------- |
| (div)               |                    |          | HTMLDivElement properties    |
| colorful            | `ProgressColorful` | `'none'` | The indicator color          |
| disabled            | `boolean`          | `false`  | If the progress is disabled  |
| max                 | `number`           | `100`    | The maximum value to display |
| percent (read only) | `number`           |          | The value/max                |
| value               | `number`           | `0`      | The current value            |
| vertical            | `boolean`          | `false`  | If the progress is vertical  |

- ProgressColorful: 'none' | 'auto' | 'progress' | 'success' | 'warning' | 'error'
  - auto: Set to 'progress' when value is less than max and 'success' when value equals max.

## Events

| Name  | Event.detail | Description           |
| ----- | ------------ | --------------------- |
| (div) |              | HTMLDivElement events |

## Anatomy

```
Progress (div)
  container (div)
    indicator (div)
```
