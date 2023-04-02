<script>
    import Playground from './LinkPlayground.svelte';
</script>

# Link

A styled `<a/>`.

<Playground />

```svelte
<script lang="ts">
  // ----- Types ----- //

  type LinkVariant = 'regular' | 'ghost' | 'undecorated';

  // ----- Props ----- //

  // HTMLLabelElement props are forwarded

  let variant: LinkVariant = 'regular';

  // ----- Events ----- //

  // HTMLLabelElement events are bubbled

  // ----- Methods ----- //

  function click();
  function blur();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<a>
  <slot {disabled} {href} {variant} />
</a>
```
