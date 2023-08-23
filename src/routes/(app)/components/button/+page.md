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

- The variant is passed to the Input, TabList, and sliders.
- The Input has 'composed' appended to the variant.

| Variant   | Description                                                            |
| --------- | ---------------------------------------------------------------------- |
| capsule   | shows a border with rounded ends                                       |
| circular  | shows a circular border with a 1:1 aspect ratio                        |
| colorful  | applies accent colors                                                  |
| secondary | hides the background until hovered over                                |
| square    | shows a square border                                                  |
| tool      | hides the border entirely and hides the background until hovered over. |

## Playground

<Playground />
