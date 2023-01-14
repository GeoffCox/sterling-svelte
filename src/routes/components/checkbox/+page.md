<script>
    import Example from './CheckboxExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# Checkbox

A styled HTML input type=checkbox element.

## Playground

<Example />

## Anatomy

```
checkbox
  HTML input (hidden)
  checkmark
label slot
```

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
