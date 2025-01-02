<h1>Actions</h1>

These actions were built to support components and are available to you in your own component
development.

<h2>clickOutside</h2>

Raises an event anytime the user clicks outside the bounds of the element.

<pre>
  <code
    >{`<script lang="ts">
      import { clickOutside, type ClickOutsideEvent } from '@geoffcox/sterling-svelte';

      const onClickOutside = (event: ClickOutsideEvent) => {
        // do something here
      };
    </script>

<div use:clickOutside on:click_outside={onClickOutside}>
  <!-- content here -->
</div>
`}</code
  >
</pre>

<h2>extraClass</h2>

Appends an extra class value to the class prop. Typically used by components to support adding the
class prop to an existing class name.

<pre>
  <code
    >{`<script lang="ts">
  import { extraClass } from '@geoffcox/sterling-svelte';

  let {children, class: _class}
</script>

<button class="sterling-button" use:extraClass={extraClass: _class}>
  {#if children}
    {children}
  {/endif}
</button>
`}</code
  >
</pre>

<h2>forwardEvents</h2>

Forwards native and svelte component events from one component to another. Useful when you need to
make an event appear to bubble up and components are not in the same DOM hierarchy.

<pre>
  <code
    >{`<script lang="ts">
  import { forwardEvents } from '@geoffcox/sterling-svelte';

  let targetRef: HTMLDivElement;

  const onClick = () => {
    // do something here
  };
</script>

<div bind:this={targetRef} on:click={onClick}>sterling-svelte</div>
<button use:forwardEvents={ target: targetRef, events: ['click']}>Click Me<button>
`}</code
  >
</pre>

<h2>portal</h2>

Makes the element a child of the target element. Useful in scenarios like menus when you want to
move an element outside of its parent so it can float above it.

<pre>
  <code
    >{`<script lang="ts">
  import { portal } from '@geoffcox/sterling-svelte';
</script>

<div use:portal={{ target: document.body }}>
  <!-- content here -->
</div>
`}</code
  >
</pre>

<h2>trapKeyboardFocus</h2>

Keeps the keyboard focus within the children of an element by handling 'Tab' keyboard events.

<pre>
  <code
    >{`<script lang="ts">
  import { trapKeyboardFocus } from '@geoffcox/sterling-svelte';
</script>

<div use:trapKeyboardFocus>
  <!-- content with focusable children here -->
</div>
`}</code
  >
</pre>
