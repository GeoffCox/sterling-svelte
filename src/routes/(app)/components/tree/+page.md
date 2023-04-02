<script>
    import Playground from './TreePlayground.svelte';
</script>

# Tree

A hierarchy of items that can be expanded or collapsed.
A single tree item can be selected.

- Get or set the expanded tree items.
- Get or set the selected tree item.
- TreeItem provides the mouse and keyboard interactions.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let composed = false;
  let disabled = false;
  let selectedValue: string | undefined = undefined;
  let expandedValues: string[] = [];

  // ----- Methods ----- //

  function blur();
  function click();
  function focus(options: FocusOptions);

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  dispatch('expandCollapse', { expandedValues });
  dispatch('select', { selectedValue });

  // ----- Context ----- //

  type TreeContext = {
    /** If the tree is disabled */
    disabled: Readable<boolean>;

    /**
     * The values of the expanded tree tree items.
     */
    expandedValues: Writable<string[]>;
    /**
     * The value of the selected tree item.
     */
    selectedValue: Writable<string | undefined>;
  };
</script>

<!-- Anatomy -->

<div>
  <slot {composed} {disabled} />
</div>
```
