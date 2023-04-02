<script>
    import Link from '$lib/Link.svelte';
</script>

# Menu

A panel that floats above other content containing a list of menu items.

- Menu is a building block of menus:
  - <Link href="menubar">MenuBar</Link>
  - <Link href="menubutton">MenuButton</Link>
  - <Link href="menuitem">MenuItem</Link>
  - <Link href="menuseparator">MenuSeparator</Link>
- Manages position based on the reference element
- The menu floats above other element via portaling

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let reference: HTMLElement;
  let open: boolean = false;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  // ----- Methods ----- //

  function blur();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<div>
  <slot />
</div>
```
