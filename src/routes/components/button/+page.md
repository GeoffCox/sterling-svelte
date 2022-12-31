# Button

A styled HTML button element.

<script>
    import ButtonExample from './ButtonExample.svelte';
</script>

<ButtonExample />

## Design

- The button size and padding are based on the inherited font
- HTML button props and events are forwarded

## Props

| Name     | Type          | Description                                             |
| -------- | ------------- | ------------------------------------------------------- |
| disabled | boolean       | When true, disables the button and prevents interaction |
| shape    | ButtonShape   | Changes the shape of the button                         |
| variant  | ButtonVariant | Changes the style of the button                         |

- ButtonVariant: 'regular' | 'outline' | 'ghost'
- ButtonShape: 'circular' | 'rounded' | 'square'

## Slots

| Name      | Description                                 |
| --------- | ------------------------------------------- |
| (default) | Content within the button (e.g. text, icon) |

## Theme Variables

| Name                                   | Usage          |
| -------------------------------------- | -------------- |
| --Button\_\_background-color           |                |
| --Button\_\_background-color--active   | active         |
| --Button\_\_background-color--disabled | disabled       |
| --Button\_\_background-color--hover    | hover          |
| --Button\_\_border-color               |                |
| --Button\_\_border-color--active       | active         |
| --Button\_\_border-color--disabled     | disabled       |
| --Button\_\_border-color--focus        | focus          |
| --Button\_\_border-color--hover        | hover          |
| --Button\_\_border-radius              |                |
| --Button\_\_border-style               |                |
| --Button\_\_border-width               |                |
| --Button\_\_color                      |                |
| --Button\_\_color--active              | active         |
| --Button\_\_color--disabled            | disabled       |
| --Common\_\_outline-color              | keyboard focus |
| --Common\_\_outline-offset             | keyboard focus |
| --Common\_\_outline-style              | keyboard focus |
| --Common\_\_outline-width              | keyboard focus |
