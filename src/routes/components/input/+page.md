<script>
    import Example from './InputExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# Input

A styled HTML input element.

<Example />

## Design

- Size and padding are based on the inherited font.
- HTML input props are forwarded and events are bubbled.

## Props

No additional properties beyond those for the native element.

## Slots

| Name  | Description                         |
| ----- | ----------------------------------- |
| label | The label associated with the input |

## Theming

| Part        | State        | Theme variable                                               |
| ----------- | ------------ | ------------------------------------------------------------ |
| background  |              | <ThemePropCard name='--Input__background-color' />           |
| border      |              | <ThemePropCard name='--Input__border-color' />               |
| border      |              | <ThemePropCard name='--Input__border-radius' />              |
| border      |              | <ThemePropCard name='--Input__border-style' />               |
| border      |              | <ThemePropCard name='--Input__border-width' />               |
| foreground  |              | <ThemePropCard name='--Input__color' />                      |
| label slot  |              | <ThemePropCard name='--Display__color--subtle' />            |
| placeholder |              | <ThemePropCard name='--Display__color--faint' />             |
|             |              |                                                              |
| background  | hover        | <ThemePropCard name='--Input__background-color--hover' />    |
| border      | hover        | <ThemePropCard name='--Input__border-color--hover' />        |
| foreground  | hover        | <ThemePropCard name='--Input__color--hover' />               |
|             |              |                                                              |
| background  | focus-within | <ThemePropCard name='--Input__background-color--focus' />    |
| border      | focus-within | <ThemePropCard name='--Input__border-color--focus' />        |
| foreground  | focus-within | <ThemePropCard name='--Input__color--focus' />               |
| outline     | focus-within | <ThemePropCard name='--Common__outline-color' />             |
| outline     | focus-within | <ThemePropCard name='--Common__outline-offset' />            |
| outline     | focus-within | <ThemePropCard name='--Common__outline-style' />             |
| outline     | focus-within | <ThemePropCard name='--Common__outline-width' />             |
|             |              |                                                              |
| background  | disabled     | <ThemePropCard name='--Input__background-color--disabled' /> |
| border      | disabled     | <ThemePropCard name='--Input__border-color--disabled' />     |
| foreground  | disabled     | <ThemePropCard name='--Input__color--disabled' />            |
| label slot  | disabled     | <ThemePropCard name='--Display__color--disabled' />          |
| placeholder | disabled     | <ThemePropCard name='--Display__color--disabled' />          |
|             |              |                                                              |