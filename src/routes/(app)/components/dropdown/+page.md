<script>
    import Playground from './DropdownPlayground.svelte';
</script>

# Dropdown

A value and button where a dropdown can be opened for changing the value.

- Set content of the displayed value and the dropdown.
- The dropown is dynamically positioned based on avaiable screen space.
- The dropdown opens with a slide animation.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  /**
   * Applies colorful styles from the theme.
   */
  export let colorful = false;

  /**
   * Displays the dropdown so its container handles border and focus.
   */
  export let composed = false;

  /**
   * Disables the dropdown.
   */
  export let disabled = false;

  /**
   * Controls if the dropdown is open.
   */
  export let open = false;

  /**
   * Keeps the dropdown open when clicking outside.
   */
  export let stayOpenOnClickAway = false;

  // ----- Events ----- //

  dispatch('open', { open });

  // ----- Methods ----- //

  function click();
  function blur();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<div>
  <slot name="value" {colorful} {composed} {disabled} {open} />
  <slot name="button" {colorful} {composed} {disabled} {open} />
  <!-- dropdown -->
  <Popover>
    <slot {colorful} {composed} {disabled} {open} />
  </Popover>
</div>
```
