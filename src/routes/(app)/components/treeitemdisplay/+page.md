<script>
    import Playground from './TreeItemDisplayPlayground.svelte';
</script>

# TreeItemDisplay

A chevron and a label for an item in a tree.

- TreeItem uses this as the default content in the item slot.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let depth = 0;
  let disabled = false;
  let expanded = false;
  let hasChildren = false;
  let value: string;
  let selected = false;

  // ----- Methods ----- //

  function blur();
  function click();
  function focus(options: FocusOptions);

  // ----- Events ----- //

  // HTMLDivElement events are bubbled
</script>

<!-- Anatomy -->

<div>
  <TreeChevron />
  <slot {depth} {disabled} {expanded} {hasChildren} {selected} {value} />
</div>
```
