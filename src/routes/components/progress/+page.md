# Progress

An indicator of a value between 0 and a maximum value.

<script>
    import Example from './ProgressExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

<Example />

## Features

- The progress bar can be horizontal or vertical.
- An optional label can be specified.
- The indicator can display semantic colors.
- Callers can get the percentage (readonly) based on the value and max.
- The progress size and padding are based on the inherited font.
- HTML div props are forwarded and events are bubbled.

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

## Slots

| Name  | Description                            |
| ----- | -------------------------------------- |
| label | The label associated with the progress |

## Theming

| Part       | State                         | Theme variable                                               |
| ---------- | ----------------------------- | ------------------------------------------------------------ |
| background |                               | <ThemePropCard name='--Common__background-color'/>           |
| border     |                               | <ThemePropCard name='--Common__border-color'/>               |
| border     |                               | <ThemePropCard name='--Common__border-radius'/>              |
| border     |                               | <ThemePropCard name='--Common__border-style'/>               |
| border     |                               | <ThemePropCard name='--Common__border-width'/>               |
| label slot |                               | <ThemePropCard name='--Display__color--subtle' />            |
| indicator  |                               | <ThemePropCard name='--Display__color'/>                     |
|            |                               |                                                              |
| indicator  | colorful=auto, less than 100% | <ThemePropCard name='--Display__color--progress'/>           |
| indicator  | colorful=auto, equals 100%    | <ThemePropCard name='--Display__color--success'/>            |
| indicator  | colorful=progress             | <ThemePropCard name='--Display__color--progress'/>           |
| indicator  | colorful=success              | <ThemePropCard name='--Display__color--success'/>            |
| indicator  | colorful=warning              | <ThemePropCard name='--Display__color--warning'/>            |
| indicator  | colorful=error                | <ThemePropCard name='--Display__color--error'/>              |
|            |                               |                                                              |
| background | disabled                      | <ThemePropCard name='--Common__background-color--disabled'/> |
| border     | disabled                      | <ThemePropCard name='--Common__border-color--disabled'/>     |
| label slot | disabled                      | <ThemePropCard name='--Display__color--disabled' />          |
| indicator  | disabled                      | <ThemePropCard name='--Display__color--disabled'/>           |
