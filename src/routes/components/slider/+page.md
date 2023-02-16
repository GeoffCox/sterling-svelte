# Slider

Slider allows users to set a value between a minimum and maximum by moving a visual 'thumb' along a line.

<script>
    import Example from './SliderExample.svelte';
</script>

## Playground

<Example />

## Features

- Choose between a horizontal or vertical slider.
- User can change value by dragging the thumb.
- Arrow keys increment value up or down.
- Identify the value with an associated label.
- Bind to the calculated percentage.

## Props

| Name      | Type    | Default   | Description                                          |
| --------- | ------- | --------- | ---------------------------------------------------- |
| disabled  | boolean | false     | Disables the progress making it look inactive        |
| max       | number  | 100       | The maximum value.                                   |
| min       | number  | 0         | The minimal value. .                                 |
| precision | number  | 0         | The number of decimal places allowed for the value.  |
| step      | number  | undefined | The optional allowed increments between min and max. |
| value     | number  | 0         | The current value                                    |
| vertical  | boolean | false     | If the slider should be vertical.                    |

## Anatomy

```
  label slot
  slider
    track
    fill
    thumb
```

- label (optional): describes the slider value
- slider: contains the track, fill, and thumb
- track: displays the range between min and max
- fill: displays filling betweenmin and value
- thumb: a draggable button for changing the value

## Slots

| Name  | Description                            |
| ----- | -------------------------------------- |
| label | The label associated with the progress |

## Events

| Name   | Event.detail | Description                           |
| ------ | ------------ | ------------------------------------- |
| change | `{ value }`  | Raised when the slider value changes. |
