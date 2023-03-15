<script>
    import Playground from './LinkPlayground.svelte';
</script>

# Link

A styled HTML anchor.

## Playground

<Playground />

## Features

- The link can be disabled.
- You can choose different variants of the link style.

## Props

| Name     | Type        | Default   | Description                           |
| -------- | ----------- | --------- | ------------------------------------- |
| (a)      |             |           | Built in HTMLAnchorElement properties |
| disabled | boolean     | false     | Disables the component                |
| variant  | LinkVariant | 'regular' | Changes the style of the component    |

- LinkVariant: 'regular' | 'ghost' | 'undecorated'

## Events

| Name | Event.detail | Description                       |
| ---- | ------------ | --------------------------------- |
| (a)  |              | Built in HTMLAnchorElement events |

## Anatomy

```
Link (HTML a)
  default slot
```

## Slots

| Name    | Description             |
| ------- | ----------------------- |
| default | Content within the link |

## Let Params

| Name     | Passed to slots |
| -------- | --------------- |
| disabled | default         |
| href     | default         |
| variant  | default         |
