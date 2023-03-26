<script>
    import Playground from './TextAreaPlayground.svelte';
</script>

# TextArea

A styled `<textarea/>`.

## Playground

<Playground />

## Features

- Automatically adjust the height to fit content.
- Add a resize handle to the corner of the text area.

## Usage

```svelte
<script lang="ts">
  import TextArea from '@geoffcox/sterling-svelte/TextArea.svelte';

  let value = 'Welcome to sterling-svelte';
</script>

<TextArea bind={value} autoHeight />
```

## Props

| Name       | Type       | Default | Description                                |
| ---------- | ---------- | ------- | ------------------------------------------ |
| (textarea) |            |         | HTMLTextAreaElement properties             |
| autoHeight | boolean    | false   | Automatically adjust height to fit content |
| resize     | CSS resize | 'none'  | Sets the textarea resize CSS property      |

## Events

| Name       | Type | Description                |
| ---------- | ---- | -------------------------- |
| (textarea) |      | HTMLTextAreaElement events |

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
TextArea (textarea)
```
