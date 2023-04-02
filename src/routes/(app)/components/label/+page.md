# Label

A styled `<label/>`.

<script>
    import Playground from './LabelPlayground.svelte';
</script>

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLLabelElement props are forwarded

  let disabled = false;

  // ----- Events ----- //

  // HTMLLabelElement events are bubbled

  // ----- Methods ----- //

  function click();
  function blur();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<label>
  <slot {disabled} />
</label>
```
