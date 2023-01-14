# Label

A styled HTML label element.

<script>
    import Example from './LabelExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

## Playground

<Example />

## Features

- The label inherits color, when disabled opacity is set to 0.5.
- HTML label props are forwarded and events are bubbled.

## Anatomy

```
HTML label
   _default_ slot
```

## Props

| Name     | Type    | Description                                |
| -------- | ------- | ------------------------------------------ |
| disabled | boolean | Disables the label making it look inactive |

## Slots

| Name      | Description                             |
| --------- | --------------------------------------- |
| _default_ | The content to display within the label |
