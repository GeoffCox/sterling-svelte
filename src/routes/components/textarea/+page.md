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
| autoHeight | boolean    | false   | Automatically adjust height to fit content |
| resize     | CSS resize | 'none'  | Sets the textarea resize CSS property      |

## Anatomy

```
TextArea
  label slot
  HTML textarea
```

## Slots

| Name  | Description                         |
| ----- | ----------------------------------- |
| label | The label associated with the input |
