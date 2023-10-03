<script>
  import Playground from './ButtonPlayground.svelte';
</script>

# Button

A styled HTML `button` element.

- Choose different button shapes and variants.
- The default type is `'button'` rather than `'submit'`.

## Props

HTMLButtonElement props are included.

```ts
/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLButtonElement events are included.

## Methods

HTMLButtonElement `blur`, `click`, and `focus` methods are included.

## Anatomy

Use the default slot to place content within the button.

```svelte
<button class="sterling-button">
  <slot {disabled} {variant} />
</button>
```

## Playground

<Playground />
