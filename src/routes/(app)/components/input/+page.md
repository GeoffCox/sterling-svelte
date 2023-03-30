<script>
    import Playground from './InputPlayground.svelte';
</script>

# Input

A styled `<input />`.

## Playground

<Playground />

## Features

- Identify the value with an associated label.
- Style to compose the Input into a container component.

## Props

| Name     | Type      | Default | Description                                         |
| -------- | --------- | ------- | --------------------------------------------------- |
| (input)  |           |         | HTMLInputElement properties                         |
| composed | `boolean` | `false` | Styles the input to appear within another component |

## Events

| Name    | Type | Description             |
| ------- | ---- | ----------------------- |
| (input) |      | HTMLInputElement events |

## Methods

| Name              | Parameters                                | Description                        |
| ----------------- | ----------------------------------------- | ---------------------------------- |
| blur              |                                           | HTMLInputElement.blur              |
| click             |                                           | HTMLInputElement.click             |
| focus             | `(options)`                               | HTMLInputElement.focus             |
| select            |                                           | HTMLInputElement.select            |
| setSelectionRange | `(start, end, direction)`                 | HTMLInputElement.setSelectionRange |
| setTextRange      | `(replacment, start, end, selectionMode)` | HTMLInputElement.setTextRange      |

## Anatomy

```
Input
  Label
    default slot
  HTML input
```

## Slots

| Name    | Description   |
| ------- | ------------- |
| default | Label content |

## Let Params

| Name     | Type      | Passed to slots |
| -------- | --------- | --------------- |
| composed | `boolean` | default         |
| disabled | `boolean` | default         |
| value    | `string`  | default         |
