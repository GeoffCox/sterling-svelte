# Progress

An displayed value in a range.

- Horizontal or vertical layout.
- Set semantic colors for the progress state.
- Bind to the calculated percentage.

<script>
    import Playground from './ProgressPlayground.svelte';
</script>

<Playground />

```svelte
<script lang="ts">
  // ----- Types ----- //
  type ProgressColorful = 'none' | 'auto' | 'progress' | 'success' | 'warning' | 'error';

  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let colorful: ProgressColorful = 'none';
  let disabled = false;
  let max = 100;
  let percent = 0; //read-only
  let value = 0;
  let vertical: boolean = false;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled
</script>

<!-- Anatomy -->

<div>
  <!-- Indicator -->
  <div />
</div>
```
