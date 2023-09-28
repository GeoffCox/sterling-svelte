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

Use the default slot to set the popover content.

```svelte
<div>
  <!-- hue slider and input -->
  <div>
    <Slider />
  </div>
  <Input />
  <!-- saturation slider and input -->
  <div>
    <Slider />
  </div>
  <Input />
  <!-- lightness slider and input -->
  <div>
    <Slider />
  </div>
  <Input />
  <!-- alpha slider and input -->
  <div>
    <!-- alpha hatch -->
    <div />
    <!-- alpha gradient -->
    <div />
    <div>
      <Slider />
    </div>
  </div>
  <Input />
</div>
```

## Playground

<Playground />
