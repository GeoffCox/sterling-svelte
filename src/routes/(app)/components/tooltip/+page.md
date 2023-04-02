<script>
    import Playground from './TooltipPlayground.svelte';
</script>

# Tooltip

Descriptive information that floats above and near another element.

- Set if hover or click shows the tooltip
- Set the delay before the tooltip is shown
- Set another element as the portal target

<Playground />

```svelte
<script lang="ts">
  // ----- Types ----- //
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

  // ----- Props ----- //

  let disabled = false;
  let showOn: TooltipShowOn | undefined = undefined;
  let hoverDelayMilliseconds: number = 1000;
  let open = false;
  let placement: FloatingPlacement = 'top';
  let portalTarget: HTMLElement | undefined = undefined;
</script>

<!-- Anatomy -->

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
