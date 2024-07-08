<script>
    import Playground from './TextAreaPlayground.svelte';
</script>

# TextArea

A styled HTML `textarea` element.

## Props

HTMLTextArea props are included.

```ts
/** When true, the text area will resize itself vertically to fit text.*/
export let autoHeight = false;

/** Sets the resize handle direction. */
export let resize: TextAreaResize = 'none';

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLTextArea events are included.

## Methods

HTMLTextArea `blur`, `click`, `focus`, `select`, `setRangeText` and `setSelectionRanges` methods are included.

## Anatomy

```svelte
<div class="sterling-text-area">
  <textarea />
</div>
```

## Playground

 <Playground/>
