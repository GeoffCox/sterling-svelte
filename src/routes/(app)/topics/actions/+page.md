## Actions

Sterling-svelte exports the actions used within its components.

### clickOutside

Raises an event anytime the user clicks outside the bounds of the element.

```svelte
<script lang="ts">
  import { clickOutside } from '@geoffcox/sterling-svelte';

  const onClickOutside = (event: svelte.JSX.ClickOutsideEvent) => {
    // do something here
  };
</script>

<div use:clickOutside on:click_outside={onClickOutside}>
  <!-- content here -->
</div>
```

### forwardEvents

Forwards native and svelte component events from one component to another.
Useful when you need to make an event appear to bubble up and components are not in the same DOM hierarchy.

```svelte
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

### portal

Makes the element a child of the target element.
Useful in scenarios like menus when you want to move an element outside of its parent so it can float above it.

```svelte
<script lang="ts">
  import { portal } from '@geoffcox/sterling-svelte';
</script>

<div use:portal={{ target: document.body }}>
  <!-- content here -->
</div>
```

### trapKeyboardFocus

Keeps the keyboard focus within the children of an element by handling 'Tab' keyboard events.

```svelte
<script lang="ts">
  import { trapKeyboardFocus } from '@geoffcox/sterling-svelte';
</script>

<div use:trapKeyboardFocus>
  <!-- content with focusable children here -->
</div>
```

## Media Query Stores

### prefersColorSchemeDark

A Svelte store that keeps a boolean up to date if the `prefers-color-scheme` media query matches 'dark'.

```svelte
<script lang="ts">
  import { prefersColorSchemeDark } from '@geoffcox/sterling-svelte';
</script>

<div>The user prefers dark mode: {$prefersColorSchemeDark}</div>
```

### prefersReducedMotion

A Svelte store that keeps a boolean up to date if the `prefers-reduced-motion` media query matches 'reduce'.

```svelte
<script lang="ts">
  import { prefersReducedMotion } from '@geoffcox/sterling-svelte';
</script>

<div>The user prefers reduced motion: {$prefersReducedMotion}</div>
```

### usingKeyboard

A Svelte store that keeps a boolean up to date if the user is typing on the keyboard.
This is a wrapper around Keyborg's value.

```svelte
<script lang="ts">
  import { usingKeyboard } from '@geoffcox/sterling-svelte';
</script>

<div>The user is currently using the keyboard: {$usingKeyboard}</div>
```
