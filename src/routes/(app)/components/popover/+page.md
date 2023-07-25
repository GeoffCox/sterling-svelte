<script>
    import Link from '$lib/Link.svelte';
    import Playground from './PopoverPlayground.svelte';
</script>

# Popover

Floats content above other content.
This is done by portaling where elements are moved to the end of the `body` so they appear above other elements.

Popover does not provide any styling (background, border, etc.) around the floating content.

The amazing <Link href="https://floating-ui.com/" target="_blank">Floating UI</Link> package provides positioning.

## Types

```ts
type PopoverPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start';
```

## Props

HTMLDivElement props are included.

```ts
/** Conditionally renders content when open. */
export let conditionalRender: boolean = true;

/** The offset along the side of the reference element. */
export let crossAxisOffset = 0;

/** The offset towards or away from the side of the reference element. */
export let mainAxisOffset = 0;

/** When true, the popover is open and visible. */
export let open: boolean = false;

/** How the popover should be positioned relative to the reference element. */
export let placement: PopoverPlacement = 'bottom-start';

/** The host container for the popover. '*/
export let portalHost: HTMLElement | undefined = undefined;

/** The reference to the element anchoring the position of the popover. */
export let reference: HTMLElement | undefined;
```

## Events

HTMLDivElement events are included.

## Anatomy

Use the default slot to set the popover content.

```svelte
<div>
  <slot />
</div>
```

## Playground

<Playground />
