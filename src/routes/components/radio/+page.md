# Radio

A styled HTML input type=radio element.

<script>
    import Example from './RadioExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

<Example />

## Design

- The radio circle, dot, and label sizes are based on the inherited font.
- The radio dot is pure CSS rather than an SVG or font icon.
- The HTML input is rendered but not visible in order to apply styles.
- HTML input props are forwarded and events are bubbled.

## Props

| Name  | Type | Description                                          |
| ----- | ---- | ---------------------------------------------------- |
| group | any  | Use with bind to set the value as a radio is checked |

## Slots

| Name  | Description                       |
| ----- | --------------------------------- |
| label | Content appearing after the radio |

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
| dot        | checked       | <ThemePropCard name='--Input__color'/>                      |
|            |               |                                                             |
| outline    | focus-visible | <ThemePropCard name='--Common__outline-color'/>             |
| outline    | focus-visible | <ThemePropCard name='--Common__outline-offset '/>           |
| outline    | focus-visible | <ThemePropCard name='--Common__outline-style'/>             |
| outline    | focus-visible | <ThemePropCard name='--Common__outline-width'/>             |
|            |               |                                                             |
| background | disabled      | <ThemePropCard name='--Input__background-color--disabled'/> |
| border     | disabled      | <ThemePropCard name='--Input__border-color--disabled'/>     |
| dot        | disabled      | <ThemePropCard name='---Input__color--disabled'/>           |
| foreground | disabled      | <ThemePropCard name='--Input__color--disabled'/>            |
| label slot | disabled      | <ThemePropCard name='--Input__color--disabled'/>            |
