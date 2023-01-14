# Slider

Slider allows users to set a value between a minimum and maximum by moving a visual 'thumb' along a line.

<script>
    import Example from './SliderExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

## Playground

<Example />

## Features

- Choose between a horizontal or vertical slider.
- User can change value by dragging the thumb.
- Arrow keys increment value up or down.
- Identify the value with an associated label.
- Bind to the calculated percentage.

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

## Slots

| Name  | Description                            |
| ----- | -------------------------------------- |
| label | The label associated with the progress |

## Events

| Name   | Event.detail | Description                           |
| ------ | ------------ | ------------------------------------- |
| change | `{ value }`  | Raised when the slider value changes. |

## Theming

| Part             | State         | Theme variable                                               |
| ---------------- | ------------- | ------------------------------------------------------------ |
| background       |               | <ThemePropCard name='--Common__background-color'/>           |
| border           |               | <ThemePropCard name='--Common__border-color'/>               |
| border           |               | <ThemePropCard name='--Common__border-radius'/>              |
| border           |               | <ThemePropCard name='--Common__border-style'/>               |
| border           |               | <ThemePropCard name='--Common__border-width'/>               |
| fill             |               | <ThemePropCard name='--Display__color' />                    |
| label slot       |               | <ThemePropCard name='--Display__color--subtle' />            |
| thumb background |               | <ThemePropCard name='--Button__background-color'/>           |
| thumb border     |               | <ThemePropCard name='--Button__border-color'/>               |
| thumb border     |               | <ThemePropCard name='--Button__border-style'/>               |
| thumb border     |               | <ThemePropCard name='--Button__border-width'/>               |
| thumb foreground |               | <ThemePropCard name='--Button__color'/>                      |
| track            |               | <ThemePropCard name='--Display__background-color' />         |
|                  |               |                                                              |
| outline          | focus-visible | <ThemePropCard name='--Common__outline-color' />             |
| outline          | focus-visible | <ThemePropCard name='--Common__outline-offset' />            |
| outline          | focus-visible | <ThemePropCard name='--Common__outline-style' />             |
| outline          | focus-visible | <ThemePropCard name='--Common__outline-width' />             |
|                  |               |                                                              |
| thumb background | hover         | <ThemePropCard name='--Button__background-color--hover'/>    |
| thumb border     | hover         | <ThemePropCard name='--Button__border-color--hover'/>        |
| thumb foreground | hover         | <ThemePropCard name='--Button__color--hover'/>               |
|                  |               |                                                              |
| thumb background | active        | <ThemePropCard name='--Button__background-color--active'/>   |
| thumb border     | active        | <ThemePropCard name='--Button__border-color--active'/>       |
| thumb foreground | active        | <ThemePropCard name='--Button__color--active'/>              |
|                  |               |                                                              |
| background       | disabled      | <ThemePropCard name='--Common__background-color--disabled'/> |
| border           | disabled      | <ThemePropCard name='--Common__border-color--disabled'/>     |
| label slot       | disabled      | <ThemePropCard name='--Display__color--disabled' />          |
| thumb background | disabled      | <ThemePropCard name='--Button__background-color--disabled'/> |
| thumb border     | disabled      | <ThemePropCard name='--Button__border-color--disabled'/>     |
| thumb foreground | disabled      | <ThemePropCard name='--Button__color--disabled'/>            |
