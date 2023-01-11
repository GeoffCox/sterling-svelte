# Label

A styled HTML label element.

<script>
    import Example from './LabelExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

<Example />

## Features

- The label inherits color, when disabled opacity is set to 0.5.
- HTML label props are forwarded and events are bubbled.

## Props

| Name     | Type    | Description                                |
| -------- | ------- | ------------------------------------------ |
| disabled | boolean | Disables the label making it look inactive |

## Slots

| Name      | Description                             |
| --------- | --------------------------------------- |
| (default) | The content to display within the label |
