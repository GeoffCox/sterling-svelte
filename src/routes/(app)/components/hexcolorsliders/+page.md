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

Use the default slot to set the popover content.

```svelte
<div>
  <!-- red slider and input -->
  <div>
    <Slider />
  </div>
  <Input />
  <!-- green slider and input -->
  <div>
    <Slider />
  </div>
  <Input />
  <!-- blue slider and input -->
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
