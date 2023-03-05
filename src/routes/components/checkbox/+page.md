<script>
    import Playground from './CheckboxPlayground.svelte';
</script>

# Checkbox

A styled HTML input (type=checkbox).

## Playground

<Playground />

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
Checkbox
  input type=checkbox
  checkmark
  default slot
```

## Slots

| Name    | Description                   |
| ------- | ----------------------------- |
| default | Content of the checkbox label |

- label slot `let` params: disabled, checked

## Let Params

| Name     | Type      | Passed to slots |
| -------- | --------- | --------------- |
| checked  | `boolean` | default         |
| disabled | `boolean` | default         |
