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
<button>
  <slot {disabled} {colorful} {shape} {variant} />
</button>
```

## Sterling Theme Variants

The default sterling theme supports:

- secondary - For less important buttons
- tool - For buttons appearing on a toolbar
- colorful - displays a colorful style
- capsule - rounds the ends of the button
- circular - a circle with a 1:1 aspect ratio
- square - squares the edges of the button

## Playground

<Playground />
