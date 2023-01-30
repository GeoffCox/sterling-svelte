<script>
    import Playground from './ButtonPlayground.svelte';
</script>

# Button

A styled HTML button.

## Playground

<Playground />

## Features

- You can choose the shape of the button.
- You can choose the appearance of the button.

## Props

| Name     | Type              | Default   | Description                     |
| -------- | ----------------- | --------- | ------------------------------- |
| (button) | HTMLButtonElement |           | Built in HTML properties        |
| shape    | ButtonShape       | 'rounded' | Changes the shape of the button |
| variant  | ButtonVariant     | 'regular' | Changes the style of the button |

- ButtonVariant: 'regular' | 'outline' | 'ghost'
- ButtonShape: 'circular' | 'rounded' | 'square'

## Anatomy

```
Button (HTML button)
  default slot
```

## Slots

| Name      | Description               |
| --------- | ------------------------- |
| _default_ | Content within the button |

- default slot `let` params: shape, variant
