<script>
    import Playground from './MenuBarPlayground.svelte';
</script>

# MenuBar

A horizontal list of menu items typically at the top of a window.

- Children can be MenuItem or non-MenuItem components
- Bubbles events for MenuItem descendants

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  dispatch('close', { value });
  dispatch('open', { value });
  dispatch('select', { value });

  // ----- Methods ----- //

  function blur();
  function focus(options: FocusOptions);

  // ----- Context ----- //

  type MenuBarContext = {
    openPreviousMenuBarItem?: () => void;
    openNextMenuBarItem?: () => void;
  };
</script>

<!-- Anatomy -->

<div>
  <slot />
</div>
```
