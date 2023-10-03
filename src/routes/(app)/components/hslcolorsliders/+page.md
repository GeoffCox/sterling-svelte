<script>
    import Link from '$lib/Link.svelte';
    import Playground from './HslColorSlidersPlayground.svelte';
</script>

# HslColorSliders

Provides hue, saturation, lightness, and alpha sliders/inputs for the user to pick an HSL color.

## Props

HTMLDivElement props are included.

```ts
/** The hue value. */
export let hue: number = 180;

/** The saturation value. */
export let saturation: number = 100;

/** The lightness value. */
export let lightness: number = 50;

/** The alpha value. */
export let alpha: number = 1;

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

## Anatomy

```svelte
<div class="sterling-hsl-color-sliders">
  <Slider variant="hue" />
  <Input variant="hue" />
  <Slider variant="saturation" />
  <Input variant="saturation" />
  <Slider variant="lightness" />
  <Input variant="lightness" />
  <div class="alpha-hatch" />
  <div class="alpha-gradient" />
  <Slider variant="alpha" />
  <Input variant="alpha" />
</div>
```

## Playground

<Playground />
