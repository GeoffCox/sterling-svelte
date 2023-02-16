# Radio

A styled HTML input type=radio element.

<script>
    import Example from './RadioExample.svelte';
</script>

## Playground

<Example />

## Props

| Name  | Type | Description                                          |
| ----- | ---- | ---------------------------------------------------- |
| group | any  | Use with bind to set the value as a radio is checked |

## Anatomy

`radio
  HTML input (hidden)
  dot
label slot`

## Slots

| Name  | Description                       |
| ----- | --------------------------------- |
| label | Content appearing after the radio |
