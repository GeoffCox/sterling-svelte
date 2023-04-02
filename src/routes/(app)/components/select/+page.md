<script>
    import Playground from './SelectPlayground.svelte';
</script>

# Select

A single item that can be selected from a dropdown list of items.

- The dropdown is dynamically positioned based on avaiable screen space.
  <Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let composed: boolean = false;
  let disabled: boolean = false;
  let open = false;
  let selectedValue: string | undefined = undefined;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  dispatch('pending', { value });
  dispatch('select', { value });

  // ----- Methods ----- //

  function blur();
  function click();
  function focus(options: FocusOptions);
  function scrollToSelectedItem();
</script>

<!-- Anatomy -->

<div>
  <slot name="value" {disabled} {open} {selectedValue} />
  <slot name="button" {disabled} {open} {selectedValue} />
  <!-- popup -->
  <div>
    <List>
      <slot />
    </List>
  </div>
</div>
```
