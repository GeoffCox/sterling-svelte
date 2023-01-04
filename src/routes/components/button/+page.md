<script>
    import Example from './ButtonExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# Button

A styled HTML button element.

<Example />

## Design

- The button size and padding are based on the inherited font.
- HTML button props are forwarded and events are bubbled.

## Props

| Name    | Type          | Description                     |
| ------- | ------------- | ------------------------------- |
| shape   | ButtonShape   | Changes the shape of the button |
| variant | ButtonVariant | Changes the style of the button |

- ButtonVariant: 'regular' | 'outline' | 'ghost'
- ButtonShape: 'circular' | 'rounded' | 'square'

## Slots

| Name      | Description                                 |
| --------- | ------------------------------------------- |
| (default) | Content within the button (e.g. text, icon) |

## Theming

| Part       | State         | Theme variable                                               |
| ---------- | ------------- | ------------------------------------------------------------ |
| background |               | <ThemePropCard name='--Button__background-color'/>           |
| border     |               | <ThemePropCard name='--Button__border-color'/>               |
| border     |               | <ThemePropCard name='--Button__border-radius'/>              |
| border     |               | <ThemePropCard name='--Button__border-style'/>               |
| border     |               | <ThemePropCard name='--Button__border-width'/>               |
| foreground |               | <ThemePropCard name='--Button__color'/>                      |
|            |               |                                                              |
| background | hover         | <ThemePropCard name='--Button__background-color--hover'/>    |
| border     | hover         | <ThemePropCard name='--Button__border-color--hover'/>        |
| foreground | hover         | <ThemePropCard name='--Button__color--hover'/>               |
|            |               |                                                              |
| background | active        | <ThemePropCard name='--Button__background-color--active'/>   |
| border     | active        | <ThemePropCard name='--Button__border-color--active'/>       |
| foreground | active        | <ThemePropCard name='--Button__color--active'/>              |
|            |               |                                                              |
| border     | focus-visible | <ThemePropCard name='--Button__border-color--focus'/>        |
| outline    | focus-visible | <ThemePropCard name='--Common__outline-color'/>              |
| outline    | focus-visible | <ThemePropCard name='--Common__outline-offset'/>             |
| outline    | focus-visible | <ThemePropCard name='--Common__outline-style'/>              |
| outline    | focus-visible | <ThemePropCard name='--Common__outline-width'/>              |
|            |               |                                                              |
| background | disabled      | <ThemePropCard name='--Button__background-color--disabled'/> |
| border     | disabled      | <ThemePropCard name='--Button__border-color--disabled'/>     |
| foreground | disabled      | <ThemePropCard name='--Button__color--disabled'/>            |
