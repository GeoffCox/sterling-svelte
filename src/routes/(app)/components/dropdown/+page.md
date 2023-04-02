<script>
    import Playground from './DropdownPlayground.svelte';
</script>

# Dropdown

A value and button where a dropdown can be opened for changing the value.

- Set arbitrary content for the value and popup.
- The dropown is dynamically positioned based on avaiable screen space.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  /** when true, the component should be styled to be hosted within a container component. */
  let composed: boolean = false;
  let disabled: boolean = false;
  let open = false;

  /** when true, then clicking outside the dropdown won't close it. */
  let stayOpenOnClickAway = false;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  dispatch('open', { open });

  // ----- Methods ----- //

  function click();
  function blur();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<div>
  <slot name="value" {composed} {disabled} {open} />
  <slot name="button" {composed} {disabled} {open} />
  <!-- popup -->
  <div>
    <slot {composed} {disabled} {open} />
  </div>
</div>
```
