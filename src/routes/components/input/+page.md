<script>
    import Playground from './InputPlayground.svelte';
</script>

# Input

A styled HTML input element.

## Playground

<Playground />

## Features

- Identify the value with an associated label.

## Props

| Name     | Type       | Default | Description                                         |
| -------- | ---------- | ------- | --------------------------------------------------- |
| (input)  | (multiple) |         | Built in HTMLInputElement properties                |
| composed | `boolean`  | `false` | Styles the input to appear within another component |

## Events

| Name    | Type       | Description                      |
| ------- | ---------- | -------------------------------- |
| (input) | (multiple) | Built in HTMLInputElement events |

## Anatomy

```
Input
  default slot
  HTML input
```

## Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Content of an input label |

## Let Params

| Name     | Type      | Passed to slots |
| -------- | --------- | --------------- |
| composed | `boolean` | default         |
| disabled | `boolean` | default         |
| value    | `string`  | default         |
