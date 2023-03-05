<script>
    import Example from './InputExample.svelte';
</script>

# Input

A styled HTML input element.

## Playground

<Example />

## Features

- Identify the value with an associated label.

## Props

| Name    | Type       | Default | Description                          |
| ------- | ---------- | ------- | ------------------------------------ |
| (input) | (multiple) |         | Built in HTMLInputElement properties |

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

| Name    | Description                |
| ------- | -------------------------- |
| default | Content of the input label |

## Let Params

| Name     | Type      | Passed to slots |
| -------- | --------- | --------------- |
| disabled | `boolean` | default         |
| value    | `string`  | default         |
