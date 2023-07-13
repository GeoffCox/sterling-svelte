<script>
    import Playground from './TooltipPlayground.svelte';
</script>

# Tooltip

Descriptive information that floats above and near another element.

## Types

```ts
type TooltipShowOn = `'click'` | `'hover'`;

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
/** When true, the tooltip is disabled and will not be shown. */
export let disabled = false;

/** When to show the tooltip */
export let showOn: TooltipShowOn = 'hover';

/** How long the mouse must hover over the item to show the tooltip. */
export let hoverDelayMilliseconds: number = 1000;

/** When true, the tooltip is open (i.e. visible) */
export let open = false;

/** Where to place the tooltip relative to the content. */
export let placement: FloatingPlacement = 'top';

/** An optional portal host for floating the tooltip above other content. Defaults to body.*/
export let portalTarget: HTMLElement | undefined = undefined;
```

## Events

HTMLDivElement events are included.

## Anatomy

The tooltip is anchored to a sibling element that appears directly after the default slot content.

```svelte
<slot {disabled} {open} />
<!-- anchor point -->
<div />
<!-- portal -->
<div>
  <!-- tooltip -->
  <div>
    <slot name="tip" />
  </div>
</div>
```

## Playground

<Playground />
