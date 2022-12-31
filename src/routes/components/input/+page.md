# Input

A styled HTML input element.

<script>
    import Example from './InputExample.svelte';
    import ThemeSwatch from '../ThemeSwatch.svelte';
</script>

<Example />

## Design

- The input size and padding are based on the inherited font
- HTML input props are forwarded and events are bubbled

## Props

| Name     | Type    | Description                                            |
| -------- | ------- | ------------------------------------------------------ |
| disabled | boolean | When true, disables the input and prevents interaction |

## Slots

| Name  | Description                         |
| ----- | ----------------------------------- |
| label | The label associated with the input |

## Theming

| Part        | State        | Theme variable                                               |
| ----------- | ------------ | ------------------------------------------------------------ |
| background  |              | <ThemeSwatch name='--Input__background-color' />             |
| border      |              | <ThemeSwatch name='--Input\_\_border-color' />               |
| border      |              | <ThemeSwatch name='--Input\_\_border-radius' />              |
| border      |              | <ThemeSwatch name='--Input\_\_border-style' />               |
| border      |              | <ThemeSwatch name='--Input\_\_border-width' />               |
| foreground  |              | <ThemeSwatch name='--Input\_\_color' />                      |
|             |              |                                                              |
| background  | hover        | <ThemeSwatch name='--Input\_\_background-color--hover' />    |
| border      | hover        | <ThemeSwatch name='--Input\_\_border-color--hover' />        |
| foreground  | hover        | <ThemeSwatch name='--Input\_\_color--hover' />               |
|             |              |                                                              |
| background  | focus-within | <ThemeSwatch name='--Input\_\_background-color--focus' />    |
| border      | focus-within | <ThemeSwatch name='--Input\_\_border-color--focus' />        |
| foreground  | focus-within | <ThemeSwatch name='--Input\_\_color--focus' />               |
|             |              |                                                              |
| outline     | focus-within | <ThemeSwatch name='--Common\_\_outline-color' />             |
| outline     | focus-within | <ThemeSwatch name='--Common\_\_outline-offset' />            |
| outline     | focus-within | <ThemeSwatch name='--Common\_\_outline-style' />             |
| outline     | focus-within | <ThemeSwatch name='--Common\_\_outline-width' />             |
|             |              |                                                              |
| background  | disabled     | <ThemeSwatch name='--Input\_\_background-color--disabled' /> |
| border      | disabled     | <ThemeSwatch name='--Input\_\_border-color--disabled' />     |
| foreground  | disabled     | <ThemeSwatch name='--Input\_\_color--disabled' />            |
|             |              |                                                              |
| placeholder |              | <ThemeSwatch name='--Display\_\_color--faint' />             |
| placeholder | disabled     | <ThemeSwatch name='--Display\_\_color--disabled' />          |
|             |              |                                                              |
| label slot  | label        | <ThemeSwatch name='--Display\_\_color--subtle' />            |
