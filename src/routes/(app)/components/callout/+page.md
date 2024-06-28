<script>
    import Link from '$lib/Link.svelte';
    import Playground from './CalloutPlayground.svelte';
</script>

# Callout

A callout displays a floating box of content with an arrow pointing at the reference element.

## Members

| Name              | Type             | Default     | Description                                                            |
| ----------------- | ---------------- | ----------- | ---------------------------------------------------------------------- |
| conditionalRender | boolean          | true        | Conditionally renders content based on open                            |
| crossAxisOffset   | number           | 0           | The offset along the side of the reference element                     |
| mainAxisOffset    | number           | 0           | The offset towards or away from the side of the reference element      |
| open              | boolean          | false       | When true, the callout is open and visible                             |
| placement         | PopoverPlacement | 'top-start' | How the callout should be positioned relative to the reference element |
| portalHost        | HTMLElement      | undefined   | The host container for the callout                                     |
| reference         | HTMLElement      | undefined   | The reference to the element anchoring the position of the callout     |
| variant           | string           | ''          | Additional class names to apply                                        |
| (various)         |                  |             | HTMLDivElement props, events, and functions                            |

## Anatomy

```
<div class="sterling-callout-portal">
  <div class="sterling-callout">
    <slot />
    <div class="arrow" />
  </div>
</div>
```

## Considerations

- The <Link href="popover">Popover</Link> component provides floating content without the Callout style.

## Playground

<Playground />
