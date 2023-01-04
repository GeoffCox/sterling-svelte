<script>
    import Example from './CheckboxExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# Checkbox

A styled HTML input type=checkbox element.

<Example />

## Design

- The checkbox, checkmark, and label sizes are based on the inherited font.
- The checkmark is pure CSS rather than an SVG or font icon.
- The HTML input is rendered but not visible in order to apply styles.
- HTML input props are forwarded and events bubbled.

## Props

No additional properties beyond those for the native element.

## Slots

| Name  | Description                          |
| ----- | ------------------------------------ |
| label | Content appearing after the checkbox |

## Theming

| Part       | State         | Theme variable                                              |
| ---------- | ------------- | ----------------------------------------------------------- |
| background |               | <ThemePropCard name='--Input__background-color'/>           |
| border     |               | <ThemePropCard name='--Input__border-color'/>               |
| border     |               | <ThemePropCard name='--Input__border-style'/>               |
| border     |               | <ThemePropCard name='--Input__border-width'/>               |
| label slot |               | <ThemePropCard name='--Input__color'/>                      |
|            |               |                                                             |
| background | checked       | <ThemePropCard name='--Input__background-color'/>           |
| border     | checked       | <ThemePropCard name='--Input__border-color'/>               |
| checkmark  | checked       | <ThemePropCard name='--Input__color'/>                      |
|            |               |                                                             |
| outline    | focus-visible | <ThemePropCard name='--Common__outline-color'/>             |
| outline    | focus-visible | <ThemePropCard name='--Common__outline-offset '/>           |
| outline    | focus-visible | <ThemePropCard name='--Common__outline-style'/>             |
| outline    | focus-visible | <ThemePropCard name='--Common__outline-width'/>             |
|            |               |                                                             |
| background | disabled      | <ThemePropCard name='--Input__background-color--disabled'/> |
| border     | disabled      | <ThemePropCard name='--Input__border-color--disabled'/>     |
| checkmark  | disabled      | <ThemePropCard name='---Input__color--disabled'/>           |
| foreground | disabled      | <ThemePropCard name='--Input__color--disabled'/>            |
| label slot | disabled      | <ThemePropCard name='--Input__color--disabled'/>            |
