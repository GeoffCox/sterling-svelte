<script>
    import Playground from './SwitchPlayground.svelte';
</script>

# Switch

A styled HTML input type=checkbox element.

## Playground

<Playground />

## Features

- Choose between a horizontal or vertical switch
- Identify the switch positions with the offText or onText
- Customize labels by filling the offLabel and on-label slot

## Props

| Name     | Type    | Default   | Description                                               |
| -------- | ------- | --------- | --------------------------------------------------------- |
| disabled | boolean | false     | Disables the switch                                       |
| checked  | boolean | false     | If the switch is ON                                       |
| vertical | boolean | false     | If the switch should be vertical                          |
| offText  | string  | undefined | The text to display nearest the OFF side of the switch\*  |
| onText   | string  | undefined | The text to display nearest the ON side of the switch\*\* |

- \* When the offLabel slot is not filled, the OFF position is labeled with offText
- \*\* When the onLabel slot is not filled, the ON position is labeled with onText

## Anatomy

```
Switch
  HTML input (hidden)
  offLabel slot
    Label with offText (default)
  switch
    thumb
  onLabel slot
    Label with onText (default)
```

## Slots

| Name     | let params                                    | Description                                          |
| -------- | --------------------------------------------- | ---------------------------------------------------- |
| offLabel | checked, disabled, inputId, offText, vertical | Content appearing nearest the OFF side of the switch |
| onLabel  | checked, disabled, inputId, onText, vertical  | Content appearing nearest the ON side of the switch  |

- offLabel `let` params: checked, disabled, inputId, offText, vertical
- onLabel slot `let` params: checked, disabled, inputId, onText, vertical
