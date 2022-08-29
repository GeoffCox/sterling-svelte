# Button

Button provides a styled HTML button element.

<script>
    import ButtonExample from '../_examples/ButtonExamples.svelte';
</script>

<ButtonExample />

## Design

- The button size and padding are based on the inherited font
- HTML button props and events are forwarded

## Props

| Name     | Type      | Details                                                 |
| -------- | --------- | ------------------------------------------------------- |
| circular | boolean   | When true, the border is circular                       |
| disabled | boolean   | When true, disables the button and prevents interaction |
| type     | 'default' | Changes the appearance of the button                    |

## Slots

| Name      | Details                                     |
| --------- | ------------------------------------------- |
| (default) | Content within the button (e.g. text, icon) |

## Theme Variables

```
--Button**background-color
--Button**background-color--active
--Button**background-color--disabled
--Button**background-color--hover
--Button**border-color
--Button**border-color--active
--Button**border-color--disabled
--Button**border-color--focus
--Button**border-color--hover
--Button**border-radius
--Button**border-style
--Button**border-width
--Button**color
--Button**color--active
--Button**color--disabled
--Common**outline-color
--Common**outline-offset
--Common**outline-style
--Common\_\_outline-width
```
