# Button

A styled HTML button element.

<script>
    import Example from './ButtonExample.svelte';
</script>

<Example />

## Design

- The button size and padding are based on the inherited font
- HTML button props are forwarded and events are bubbled

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

## Theming

| Part       | State         | Theme variable                         |
| ---------- | ------------- | -------------------------------------- |
| background |               | --Button\_\_background-color           |
| border     |               | --Button\_\_border-color               |
| border     |               | --Button\_\_border-radius              |
| border     |               | --Button\_\_border-style               |
| border     |               | --Button\_\_border-width               |
| foreground |               | --Button\_\_color                      |
|            |               |                                        |
| background | hover         | --Button\_\_background-color--hover    |
| border     | hover         | --Button\_\_border-color--hover        |
| foreground | hover         | --Button\_\_color--hover               |
|            |               |                                        |
| background | active        | --Button\_\_background-color--active   |
| border     | active        | --Button\_\_border-color--active       |
| foreground | active        | --Button\_\_color--active              |
|            |               |                                        |
| border     | focus-visible | --Button\_\_border-color--focus        |
|            |               |                                        |
| outline    | focus-visible | --Common\_\_outline-color              |
| outline    | focus-visible | --Common\_\_outline-offset             |
| outline    | focus-visible | --Common\_\_outline-style              |
| outline    | focus-visible | --Common\_\_outline-width              |
|            |               |                                        |
| background | disabled      | --Button\_\_background-color--disabled |
| border     | disabled      | --Button\_\_border-color--disabled     |
| foreground | disabled      | --Button\_\_color--disabled            |
