<script>
    import Playground from './MenuButtonPlayground.svelte';
</script>

# MenuButton

A Button that shows a menu when clicked.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let open = false;
  let shape: ButtonShape = 'rounded';
  let value: string;
  let variant: ButtonVariant = 'regular';

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  dispatch('close', { value });
  dispatch('open', { value });
  dispatch('select', { value });

  // ----- Methods ----- //

  function blur();
  function click();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<Button>
  <slot {shape} {variant} />
  <slot name="items" />
</Button>
```
