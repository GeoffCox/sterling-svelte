<script>
    import Playground from './TreeItemPlayground.svelte';
</script>

# TreeItem

An item within a `Tree` hierarchy.

- Provides selection, expand/collapse, and interaction within a Tree.
- By default, renders the item with TreeItemDisplay.
- Note: A tree item is identified by having `data-value` and `role="treeitem"` properties

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let disabled: boolean = false;
  let value: string;

  // ----- Methods ----- //

  function blur();
  function click();
  function collapse();
  function expand();
  function focus(options: FocusOptions);
  function select();
  function selectParent();
  function selectPrevious();
  function selectNext();
  function toggleExpanded();

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  // ----- Context ----- //

  type TreeItemContext = {
    /**
     * How many levels deep this tree item is in the tree hierarchy.
     * A top level item's depth is zero.
     */
    depth: number;

    /** If the tree item is disabled */
    disabled: Readable<boolean>;
  };
</script>

<!-- Anatomy -->

<div>
  <!-- item -->
  <div>
    <slot name="item" {depth} {disabled} {expanded} {hasChildren} {selected} {value} />
  </div>
  <!-- children -->
  <slot {depth} {disabled} {selected} {value} />
</div>
```
