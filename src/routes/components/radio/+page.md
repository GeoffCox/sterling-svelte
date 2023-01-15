# Radio

A styled HTML input type=radio element.

<script>
    import Example from './RadioExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

## Playground

<Example />

## Anatomy

`radio
  HTML input (hidden)
  dot
label slot`

## Props

| Name  | Type | Description                                          |
| ----- | ---- | ---------------------------------------------------- |
| group | any  | Use with bind to set the value as a radio is checked |

## Slots

| Name  | Description                       |
| ----- | --------------------------------- |
| label | Content appearing after the radio |
