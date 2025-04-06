<script lang="ts">
  // @ts-nocheck
  import { preBlocks } from './preBlocks';
</script>

<div class="topic-page">
  <h1>Actions</h1>

  These actions were built to support components and are available to you in your own component
  development.

  <h2>clickOutside</h2>

  Raises an event anytime the user clicks outside the bounds of the element.

  <pre>{preBlocks.clickOutside}</pre>

  <h2>colorScheme</h2>

  Sets the color-scheme on the document root element. It can be applied at any div in the
  application. The value set should be 'light dark', 'light', or 'dark'.

  <pre>{preBlocks.clickOutside}</pre>

  <h2>forwardEvents</h2>

  Forwards native and svelte component events from one component to another. Useful when you need to
  make an event appear to bubble up and components are not in the same DOM hierarchy.

  <pre>{preBlocks.forwardEvents}</pre>

  <h2>portal</h2>

  Makes the element a child of the target element. Useful in scenarios like menus when you want to
  move an element outside of its parent so it can float above it.

  <pre>{preBlocks.portal}</pre>

  <h2>trapKeyboardFocus</h2>

  Keeps the keyboard focus within the children of an element by handling 'Tab' keyboard events.

  <pre>{preBlocks.trapKeyboardFocus}</pre>

  <h2>applyLightDarkMode (DEPRECATED)</h2>

  When using sterling-svelte-themes 2.0 or later, you should use the colorScheme action instead.
  Sets light-mode or dark-mode classes on the node or optionally on the root document element.

  <pre>{preBlocks.applyLightDarkMode}</pre>

  <h2>extraClass (DEPRECATED)</h2>

  Appends an extra class value to the class prop. Typically used by components to support adding the
  class prop to an existing class name.

  <pre>{preBlocks.extraClass}</pre>
</div>

<style>
  .topic-page {
    max-width: 900px;
  }
</style>
