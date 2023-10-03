<script>
    import Link from '$lib/Link.svelte';
    import Playground from './HexColorSlidersPlayground.svelte';
</script>

# HexColorSliders

Provides red, green, blue, and alpha sliders/inputs for the user to pick a HEX color.

## Props

HTMLDivElement props are included.

```ts
/** The red value. */
export let red: number = 0;

/** The green value. */
export let green: number = 0;

/** The blue value. */
export let blue: number = 0;

/** The alpha value. */
export let alpha: number = 255;

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

## Anatomy

```svelte
<div class="sterling-hex-color-sliders">
  <Slider variant="red" />
  <Input variant="red" />
  <Slider variant="green" />
  <Input variant="green" />
  <Slider variant="blue" />
  <Input variant="blue" />
  <div class="alpha-hatch" />
  <div class="alpha-gradient" />
  <Slider variant="alpha" />
  <Input variant="alpha" />
</div>
```

## Playground

<Playground />
