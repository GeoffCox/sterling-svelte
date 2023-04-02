<script>
    import Playground from './TabListPlayground.svelte';
</script>

# TabList

A list of tabs where on tab can be selected.

- Horizontal or vertical layout.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let disabled: boolean = false;
  let vertical = false;
  let selectedValue: string | undefined = undefined;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  dispatch('select', { value });

  // ----- Methods ----- //

  function blur();
  function focus(options: FocusOptions);
  function selectFirstTab();
  function selectPreviousTab();
  function selectNextTab();
  function selectLastTab();

  // ----- Types ----- //

  type TabListContext = {
    disabled: Readable<boolean>;
    selectedValue: Writable<string | undefined>;
    usingKeyboard: Readable<boolean>;
    vertical: Readable<boolean>;
  };
</script>

<!-- Anatomy -->

<div>
  <slot {disabled} {selectedValue} {vertical} />
</div>
```
