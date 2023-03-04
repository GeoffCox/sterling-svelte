<script>
    import Playground from './CheckboxPlayground.svelte';
</script>

# Checkbox

A styled HTML input (type=checkbox).

## Playground

<Playground />

## Props

## Props

| Name    | Type             | Default | Description              |
| ------- | ---------------- | ------- | ------------------------ |
| (input) | HTMLInputElement |         | Built in HTML properties |

## Anatomy

```
Checkbox
  input type=checkbox
  checkmark
  default slot
```

## Slots

| Name    | Description                          |
| ------- | ------------------------------------ |
| default | Content appearing after the checkbox |

- label slot `let` params: disabled, checked
