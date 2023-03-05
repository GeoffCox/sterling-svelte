<script>
    import Example from './TextAreaExample.svelte';
</script>

# TextArea

A styled HTML textarea element.

## Playground

<Example />

## Features

- Identify the value with an associated label.
- Choose to automatically adjust the height to fit content.
- Add a resize handle to the corner of the text area.

## Props

| Name       | Type       | Default | Description                                |
| ---------- | ---------- | ------- | ------------------------------------------ |
| (textarea) | (multiple) |         | Built in HTMLTextAreaElement properties    |
| autoHeight | boolean    | false   | Automatically adjust height to fit content |
| resize     | CSS resize | 'none'  | Sets the textarea resize CSS property      |

## Events

| Name       | Type       | Description                         |
| ---------- | ---------- | ----------------------------------- |
| (textarea) | (multiple) | Built in HTMLTextAreaElement events |

## Anatomy

```
TextArea
  default slot
  HTML textarea
```

## Slots

| Name    | Description                   |
| ------- | ----------------------------- |
| default | Content of the textarea label |

## Let Params

| Name       | Type       | Passed to slots |
| ---------- | ---------- | --------------- |
| autoHeight | `boolean`  | default         |
| disabled   | `boolean`  | default         |
| resize     | CSS resize | default         |
| value      | `string`   | default         |
