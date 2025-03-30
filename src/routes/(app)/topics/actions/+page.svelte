<script lang="ts">
  // @ts-nocheck
  import { preBlocks } from './preBlocks';
</script>

<h1>Actions</h1>

These actions were built to support components and are available to you in your own component
development.

<h2>clickOutside</h2>

Raises an event anytime the user clicks outside the bounds of the element.

<pre>
  <code>{preBlocks.clickOutside}</code>
</pre>

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

<h2>DEPRECATED: extraClass</h2>

Appends an extra class value to the class prop. Typically used by components to support adding the
class prop to an existing class name.

<pre>{preBlocks.extraClass}</pre>
