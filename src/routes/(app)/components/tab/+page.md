<script>
    import Playground from './TabPlayground.svelte';
</script>

# Tab

An item within a `TabList`.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let disabled = false;
  let selected = false;
  let text: string | undefined = undefined;
  let value: string;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  // ----- Methods ----- //

  function blur();
  function click();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<button>
  <slot disabled={_disabled} {selected} {value} {text}/ >
  <!-- indicator -->
  <div >
</button>
```
