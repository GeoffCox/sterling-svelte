# Slider

A draggable 'thumb' on a line to set a value in a range.

- Horizontal or vertical layout.

<script>
    import Playground from './SliderPlayground.svelte';
</script>

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let colorful: boolean = false;
  let composed = false;
  let disabled: boolean = false;
  let min: number = 0;
  let max: number = 100;
  let precision: number = 0;
  let step: number | undefined = undefined;
  let value: number = 0;
  let vertical: boolean = false;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  dispatch('change', { value });

  // ----- Methods ----- //

  function blur();
  function click();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<div>
  <!-- Track -->
  <div />
  <!-- Fill -->
  <div />
  <!-- Thumb -->
  <div />
</div>
```
