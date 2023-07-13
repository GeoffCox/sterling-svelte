<script>
    import Playground from './TextAreaPlayground.svelte';
</script>

# TextArea

A styled HTML `textarea` element.

## Props

HTMLTextArea props are included.

```ts
/** When true, the text area will resize itself vertically to fit the current text.*/
export let autoHeight = false;

/** When true, applies colorful theme styles. */
export let colorful = false;

/** Sets the resize handle in the lower corner of the text area. */
export let resize: TextAreaResize = 'none';
```

## Events

HTMLTextArea events are included.

## Methods

HTMLTextArea `blur`, `click`, `focus`, `select`, `setRangeText` and `setSelectionRanges` methods are included.

## Anatomy

```svelte
<div>
  <textarea />
</div>
```

## Playground

 <Playground/>
