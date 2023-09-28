<script>
    import Link from '$lib/Link.svelte';
    import Playground from './TooltipPlayground.svelte';
</script>

# Tooltip

A <Link href="callout">Callout</Link> that containing descriptive information.
A tooltip automatically displays the callout when the mouse hovers over the element.

## Props

HTMLDivElement props are included.

Callout props are included.

```ts
/** When true, the tooltip is disabled and will not be shown. */
export let disabled = false;

/** The duration of mouse hover before showing the tooltip. */
export let hoverDelayMilliseconds: number = 1000;
```

## Events

HTMLDivElement events are included.

## Anatomy

The tooltip is anchored to a sibling element that appears directly after the default slot content.

```svelte
<slot {disabled} {hoverDelayMilliseconds} {open} {variant} />
<!-- anchor point -->
<div />
<Callout />
```

## Playground

<Playground />
