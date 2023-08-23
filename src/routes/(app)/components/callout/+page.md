<script>
    import Link from '$lib/Link.svelte';
    import Playground from './CalloutPlayground.svelte';
</script>

# Callout

A callout displays a floating box of content with an arrow pointing at the reference element.

The <Link href="popover">Popover</Link> component provides floating content without the Callout style.

## Props

HTMLDivElement props are included.

```ts
/** Conditionally renders content based on open. */
export let conditionalRender: boolean = true;

/** The offset along the side of the reference element. */
export let crossAxisOffset = 0;

/** The offset towards or away from the side of the reference element. */
export let mainAxisOffset = 0;

/** When true, the callout is open and visible. */
export let open: boolean = false;

/** How the callout should be positioned relative to the reference element. */
export let placement: PopoverPlacement = 'bottom-start';

/** The host container for the callout. */
export let portalHost: HTMLElement | undefined = undefined;

/** The reference to the element anchoring the position of the callout. */
export let reference: HTMLElement | undefined;

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

## Anatomy

Use the default slot to set the popover content.

```svelte
<!-- portal -->
<div>
  <!-- callout -->
  <div>
    <slot />
    <!-- arrow pointer -->
    <div />
  </div>
</div>
```

## Sterling Theme Variants

| Variant  | Description           |
| -------- | --------------------- |
| colorful | applies accent colors |

## Playground

<Playground />
