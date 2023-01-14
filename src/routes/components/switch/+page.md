<script>
    import Example from './SwitchExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# Switch

A styled HTML input type=checkbox element.

## Playground

<Example />

## Features

- Choose between a horizontal or vertical switch
- Identify the switch positions with the offText or onText
- Customize labels by filling the off-label and on-label slot

## Anatomy

```
Switch
  HTML input (hidden)
  off-label slot
    Label with offText (default)
  switch
    thumb
  on-label slot
    Label with onText (default)
```

## Props

| Name     | Type    | Default   | Description                                               |
| -------- | ------- | --------- | --------------------------------------------------------- |
| disabled | boolean | false     | Disables the switch                                       |
| checked  | boolean | false     | If the switch is ON                                       |
| vertical | boolean | false     | If the switch should be vertical                          |
| offText  | string  | undefined | The text to display nearest the OFF side of the switch\*  |
| onText   | string  | undefined | The text to display nearest the ON side of the switch\*\* |

- \* When the off-label slot is not filled, the OFF position is labeled with offText
- \*\* When the on-label slot is not filled, the ON position is labeled with onText

## Slots

| Name      | let params                                    | Description                                          |
| --------- | --------------------------------------------- | ---------------------------------------------------- |
| off-label | checked, disabled, inputId, offText, vertical | Content appearing nearest the OFF side of the switch |
| on-label  | checked, disabled, inputId, offText, vertical | Content appearing nearest the ON side of the switch  |

## Theming

### switch

| State         | CSS              | Theme variable                                              |
| ------------- | ---------------- | ----------------------------------------------------------- |
|               | background-color | <ThemePropCard name='--Input__background-color'/>           |
|               | border-color     | <ThemePropCard name='--Input__border-color'/>               |
|               | border-style     | <ThemePropCard name='--Input__border-style'/>               |
|               | border-width     | <ThemePropCard name='--Input__border-width'/>               |
|               | color            | <ThemePropCard name='--Input__color'/>                      |
|               |                  |                                                             |
| hover         | background-color | <ThemePropCard name='--Input__background-color--hover'/>    |
| hover         | border-color     | <ThemePropCard name='--Input__border-color--hover'/>        |
| hover         | color            | <ThemePropCard name='--Input__color--hover'/>               |
|               |                  |                                                             |
| focus-visible | background-color | <ThemePropCard name='--Input__background-color--focus'/>    |
| focus-visible | border-color     | <ThemePropCard name='--Input__border-color--focus'/>        |
| focus-visible | color            | <ThemePropCard name='--Input__color--focus'/>               |
| focus-visible | outline-color    | <ThemePropCard name='--Common__outline-color'/>             |
| focus-visible | outline-offset   | <ThemePropCard name='--Common__outline-offset '/>           |
| focus-visible | outline-style    | <ThemePropCard name='--Common__outline-style'/>             |
| focus-visible | outline-width    | <ThemePropCard name='--Common__outline-width'/>             |
|               |                  |                                                             |
| disabled      | background-color | <ThemePropCard name='--Input__background-color--disabled'/> |
| disabled      | border-color     | <ThemePropCard name='--Input__border-color--disabled'/>     |
| disabled      | color            | <ThemePropCard name='--Input__color--disabled'/>            |

### thumb

| State    | CSS              | Theme variable                                               |
| -------- | ---------------- | ------------------------------------------------------------ |
|          | background-color | <ThemePropCard name='--Button__background-color'/>           |
|          | border-color     | <ThemePropCard name='--Button__border-color'/>               |
|          | border-style     | <ThemePropCard name='--Button__border-style'/>               |
|          | border-width     | <ThemePropCard name='--Button__border-width'/>               |
|          | color            | <ThemePropCard name='--Button__color'/>                      |
|          |                  |                                                              |
| hover    | background-color | <ThemePropCard name='--Button__background-color--hover'/>    |
| hover    | border-color     | <ThemePropCard name='--Button__border-color--hover'/>        |
| hover    | color            | <ThemePropCard name='--Button__color--hover'/>               |
|          |                  |                                                              |
| active   | background-color | <ThemePropCard name='--Button__background-color--active'/>   |
| active   | border-color     | <ThemePropCard name='--Button__border-color--active'/>       |
| active   | color            | <ThemePropCard name='--Button__color--active'/>              |
|          |                  |                                                              |
| disabled | background-color | <ThemePropCard name='--Button__background-color--disabled'/> |
| disabled | border-color     | <ThemePropCard name='--Button__border-color--disabled'/>     |
| disabled | color            | <ThemePropCard name='--Button__color--disabled'/>            |
