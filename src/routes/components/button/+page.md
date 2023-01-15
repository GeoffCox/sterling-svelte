<script>
    import Example from './ButtonExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# Button

A styled HTML button element.

## Playground

<Example />

## Features

- You can choose the shape of the button.
- You can choose the appearance of the button.

## Anatomy

```
HTML button
  default slot
```

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
| _default_ | Content within the button (e.g. text, icon) |
