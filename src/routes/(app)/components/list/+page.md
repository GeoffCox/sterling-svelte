<script>
    import Playground from './ListPlayground.svelte';
</script>

# List

A list of items where an item can be selected.

- Choose between a vertical or horizontal list.
- Note: A list item is identified by having `data-value` and `role="listitem"` properties

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let composed = false;
  let disabled: boolean = false;
  let horizontal = false;
  let selectedValue: string | undefined = undefined;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  dispatch('select', { value });

  // ----- Methods ----- //

  function click();
  function blur();
  function focus(options: FocusOptions);
  function scrollToSelectedItem();
  function selectFirstItem();
  function selectPreviousItem();
  function selectNextItem();
  function selectLastItem();

  // ----- Context ----- //

  type ListContext = {
    disabled: Readable<boolean>;
    selectedValue: Writable<string | undefined>;
    horizontal: Readable<boolean>;
  };
</script>

<!-- Anatomy -->

<div>
  <slot {composed} {disabled} {horizontal} {selectedValue} />
</div>
```
