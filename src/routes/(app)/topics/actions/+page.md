# Actions

These actions were built to support components and are available to you in your own component development.

## clickOutside

Raises an event anytime the user clicks outside the bounds of the element.

```
<script lang="ts">
  import { clickOutside, type ClickOutsideEvent } from '@geoffcox/sterling-svelte';

  const onClickOutside = (event: ClickOutsideEvent) => {
    // do something here
  };
</script>

<div use:clickOutside on:click_outside={onClickOutside}>
  <!-- content here -->
</div>
```

## forwardEvents

Forwards native and svelte component events from one component to another.
Useful when you need to make an event appear to bubble up and components are not in the same DOM hierarchy.

```
<script lang="ts">
  import { forwardEvents } from '@geoffcox/sterling-svelte';

  let targetRef: HTMLDivElement;

  const onClick = () => {
    // do something here
  };
</script>

<div bind:this={targetRef} on:click={onClick}>sterling-svelte</div>
<button use:forwardEvents={ target: targetRef, events: ['click']}>Click Me<button>
```

## portal

Makes the element a child of the target element.
Useful in scenarios like menus when you want to move an element outside of its parent so it can float above it.

```
<script lang="ts">
  import { portal } from '@geoffcox/sterling-svelte';
</script>

<div use:portal={{ target: document.body }}>
  <!-- content here -->
</div>
```

## trapKeyboardFocus

Keeps the keyboard focus within the children of an element by handling 'Tab' keyboard events.

```
<script lang="ts">
  import { trapKeyboardFocus } from '@geoffcox/sterling-svelte';
</script>

<div use:trapKeyboardFocus>
  <!-- content with focusable children here -->
</div>
```
