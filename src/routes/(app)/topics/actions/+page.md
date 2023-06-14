# Actions

Sterling-svelte exports the actions used within its components.

## clickOutside

Raises an event anytime the user clicks outside the bounds of the element.

```svelte
<script lang="ts">
  const onClickOutside = (event: svelte.JSX.ClickOutsideEvent) => {
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

```svelte
<script lang="ts">
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

```svelte
<div use:portal={{ target: document.body }}>
  <!-- content here -->
</div>
```

## trapKeyboardFocus

Keeps the keyboard focus within the children of an element by handling 'Tab' keyboard events.

```svelte
<div use:trapKeyboardFocus>
  <!-- content with focusable children here -->
</div>
```
