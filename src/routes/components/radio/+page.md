# Radio

A styled HTML input (type=radio).

<script>
    import Example from './RadioExample.svelte';
</script>

## Playground

<Example />

## Props

| Name    | Type                           | Default     | Description                                          |
| ------- | ------------------------------ | ----------- | ---------------------------------------------------- |
| (input) | (multiple)                     |             | Built in HTMLInputElement properties                 |
| group   | `any` \| `null` \| `undefined` | `undefined` | Use with bind to set the value as a radio is checked |

## Events

| Name    | Type       | Description                      |
| ------- | ---------- | -------------------------------- |
| (input) | (multiple) | Built in HTMLInputElement events |

## Anatomy

```
Radio
  HTML input (hidden)
  radio dot
  default slot
```

## Slots

| Name    | Description                |
| ------- | -------------------------- |
| default | Content of the radio label |

## Let Params

| Name     | Type                           | Passed to slots |
| -------- | ------------------------------ | --------------- |
| disabled | `boolean`                      | default         |
| value    | `any` \| `null` \| `undefined` | default         |
