<script>
    import Playground from './ButtonPlayground.svelte';
</script>

# Button

A styled `<button />`.

## Playground

<Playground />

## Features

- Change the shape of the button.
- Vary the style of the button

## Usage

```svelte
<script lang="ts">
  import Button from '@geoffcox/sterling-svelte/Button.svelte';

  const onClick = () => {
    //do something on button click
  };
</script>

<Button on:click={onClick}>sterling-svelte</Button>
```

## Props

| Name     | Type            | Default     | Description                  |
| -------- | --------------- | ----------- | ---------------------------- |
| (button) |                 |             | HTMLButtonElement properties |
| shape    | `ButtonShape`   | `'rounded'` | The shape of the button      |
| variant  | `ButtonVariant` | `'regular'` | The style of the button      |

- ButtonVariant: 'regular' | 'outline' | 'ghost'
- ButtonShape: 'circular' | 'rounded' | 'square'

## Events

| Name     | Event.detail | Description              |
| -------- | ------------ | ------------------------ |
| (button) |              | HTMLButtonElement events |

## Methods

| Name  | Parameters  | Description             |
| ----- | ----------- | ----------------------- |
| blur  |             | HTMLButtonElement.blur  |
| click |             | HTMLButtonElement.click |
| focus | `(options)` | HTMLButtonElement.focus |

## Anatomy

```
Button (button)
  default slot
```

## Slots

| Name    | Description    |
| ------- | -------------- |
| default | Button content |

## Let Params

| Name    | Passed to slots |
| ------- | --------------- |
| shape   | default         |
| variant | default         |
