<script>
  import Playground from './ButtonPlayground.svelte';
</script>

# Button

A styled HTML `button` element.

- Choose different button shapes and variants.
- The default type is `'button'` rather than `'submit'`.

## Types

```ts
type ButtonShape = 'circular' | 'rounded' | 'square';

type ButtonVariant = 'regular' | 'outline' | 'ghost';
```

## Props

HTMLButtonElement props are included.

```ts
/** When true, applies colorful theme styles. */
export let colorful = false;

export let shape: ButtonShape = 'rounded';

export let variant: ButtonVariant = 'regular';
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

## Playground

<Playground />
