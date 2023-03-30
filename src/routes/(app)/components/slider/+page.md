# Slider

A draggable 'thumb' on a line to set a value in a range.

<script>
    import Playground from './SliderPlayground.svelte';
</script>

## Playground

<Playground />

## Features

- Horizontal or vertical layout.
- Compose the slider into another control that manages border and focus.

## Interactions

- Drag the thumb to change the value.
- Left/Right arrow keys decrement/increment the value.
- Up/Down arrow keys decrement/increment the value.

## Usage

```svelte
<script lang="ts">
  import Slider from '@geoffcox/sterling-svelte/Slider.svelte';
  let value = 70;
</script>

<Slider bind:value min={32} max={211} />
```

## Props

| Name      | Type      | Default     | Description                                 |
| --------- | --------- | ----------- | ------------------------------------------- |
| (div)     |           |             | HTMLDivElement properties                   |
| disabled  | `boolean` | `false`     | If the slider is disabled                   |
| max       | `number`  | `100`       | The maximum value                           |
| min       | `number`  | `0`         | The minimal value                           |
| precision | `number`  | `0`         | The number of decimal places for the value  |
| step      | `number`  | `undefined` | The optional increments between min and max |
| value     | `number`  | `0`         | The current value                           |
| vertical  | `boolean` | `false`     | If the layout is vertical                   |

## Events

| Name   | Event.detail | Description                           |
| ------ | ------------ | ------------------------------------- |
| (div)  |              | HTMLDivElement events                 |
| change | `{ value }`  | Raised when the slider value changes. |

## Methods

| Name  | Parameters  | Description          |
| ----- | ----------- | -------------------- |
| blur  |             | HTMLDivElement.blur  |
| click |             | HTMLDivElement.click |
| focus | `(options)` | HTMLDivElement.focus |

## Anatomy

```
Slider (div)
  container
    track
    fill
    thumb
```

- container: holds the track, fill, and thumb
- track: displays the range between min and max
- fill: displays a filled in track between min and value
- thumb: a draggable button for changing the value
