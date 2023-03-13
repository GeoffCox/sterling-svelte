# Label

A styled HTML label element.

<script>
    import Playground from './LabelPlayground.svelte';
</script>

## Playground

<Playground />

## Features

- The label inherits color, when disabled opacity is set to 0.5.
- HTML label props are forwarded and events are bubbled.

## Props

| Name     | Type    | Description                                |
| -------- | ------- | ------------------------------------------ |
| disabled | boolean | Disables the label making it look inactive |

## Anatomy

```
HTML label
   _default_ slot
```

## Slots

| Name      | Description                             |
| --------- | --------------------------------------- |
| _default_ | The content to display within the label |
