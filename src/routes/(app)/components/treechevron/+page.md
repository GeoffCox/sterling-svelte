<script>
    import Playground from './TreeChevronPlayground.svelte';
</script>

# TreeChevron

A chevron indicating expanded/collapsed of an item in a tree hierarchy.

- Displays a chevron for items with children and a bullet for items without.
- Chevron points right when collapsed, points down when expanded.
- Chevron changes are animated as rotation.
- No animation occurs when prefers-reduced-motion set.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let expanded = false;
  let hasChildren = false;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled
</script>

<!-- Anatomy -->

<div />
```
