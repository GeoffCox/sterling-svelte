<script>
    import Playground from './PopoverPlayground.svelte';
</script>

# Popover

Floats content above other content via portaling.

Portaling is when elements are moved to the end of the `body` so they appear higher in the z-order than other elements.

## Types

```ts
type TooltipShowOn = `'click'` | `'hover'`;

type FloatingOffsetOptions = {
  mainAxis?: number;
  crossAxis?: number;
};

type FloatingPlacement =
  | `'top'`
  | `'right'`
  | `'bottom'`
  | `'left'`
  | `'top-start'`
  | `'right-start'`
  | `'bottom-start'`
  | `'left-start'`
  | `'top-end'`
  | `'right-end'`
  | `'bottom-end'`
  | `'left-end'`;
```

## Props

HTMLDivElement props are included.

```ts
/** Offsets for nudging the content away from its reference */
export let offsetOptions: FloatingOffsetOptions = { mainAxis: 0, crossAxis: 0 };

/** When true, the popover is open and visible. */
export let open: boolean = false;

/** When true, the popover does not close when the user clicks away from it. */
export let persistent: boolean = false;

/** Where the popover should appear relative to its reference. */
export let placement: FloatingPlacement = 'bottom-start';

/** The host container for the popover. Defaults to 'body/#SterlingPopoverPortal'*/
export let portalHost: HTMLElement | undefined = undefined;

/** The reference to the element anchoring the position of the popover. */
export let reference: HTMLElement;
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
