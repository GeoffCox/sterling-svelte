<script>
    import Playground from './ListItemPlayground.svelte';
</script>

# ListItem

An item within a `List`.

- Provides selection and interaction within a List.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  /** Item is disabled when this is true or the containing list is disabled. **/
  let disabled = false;

  /** Should be unique within the list **/
  let value: string;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  // ----- Methods ----- //

  function click();
  function blur();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<div>
  <slot {disabled} {horizontal} {selected} {value}>{value}</slot>
</div>
```
