<script>
  import Playground from './ButtonPlayground.svelte';
</script>

# Button

A styled `<button />`.

<Playground />

```svelte
<script lang="ts">
  // ----- Types ----- //

  type ButtonShape = 'circular' | 'rounded' | 'square';
  type ButtonVariant = 'regular' | 'outline' | 'ghost';

  // ----- Props ----- //

  // HTMLButtonElement props are forwarded

  let shape: ButtonShape = 'rounded';
  let variant: ButtonVariant = 'regular';

  // ----- Events ----- //

  // HTMLButtonElement events are bubbled

  // ----- Methods ----- //

  function click();
  function blur();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<button>
  <slot {shape} {variant} />
</button>
```
