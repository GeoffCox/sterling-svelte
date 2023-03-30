<script>
    import Playground from './SwitchPlayground.svelte';
</script>

# Switch

A styled `<input type=checkbox/>`.

## Playground

<Playground />

## Features

- Horizontal or vertical layout
- On/Off labels for switch positions

## Usage

```svelte
<script lang="ts">
  import Switch from '@geoffcox/sterling-svelte/Switch.svelte';

  let checked = false;
</script>

<Switch bind:checked onText="ON" offText="OFF" />
```

## Props

| Name     | Type      | Default     | Description                                              |
| -------- | --------- | ----------- | -------------------------------------------------------- |
| (input)  |           |             | HTMLInputElement properties                              |
| disabled | `boolean` | `false`     | If the switch is disabled                                |
| checked  | `boolean` | `false`     | If the switch is ON                                      |
| vertical | `boolean` | `false`     | If the switch layout should be vertical                  |
| offText  | `string`  | `undefined` | The text to display nearest the OFF side of the switch\* |
| onText   | `string`  | `undefined` | The text to display nearest the ON side of the switch\*  |

- \* When the offLabel/onLabel slot is filled, offText/onText are not rendered.

## Events

| Name    | Type | Description             |
| ------- | ---- | ----------------------- |
| (input) |      | HTMLInputElement events |

## Methods

| Name  | Parameters  | Description            |
| ----- | ----------- | ---------------------- |
| blur  |             | HTMLInputElement.blur  |
| click |             | HTMLInputElement.click |
| focus | `(options)` | HTMLInputElement.focus |

## Anatomy

```
Switch (div)
  input (hidden)
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
