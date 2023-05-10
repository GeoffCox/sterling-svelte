<script>
    import Playground from './InputPlayground.svelte';
</script>

# Input

A styled `<input />`.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLInputElement props are forwarded

  let colorful: boolean = false;
  let composed = false;

  // ----- Events ----- //

  // HTMLInputElement events are bubbled

  // ----- Methods ----- //

  function blur();
  function click();
  function focus(options: FocusOptions);
  function select();
  function setSelectionRange(
    start: number | null,
    end: number | null,
    direction?: 'forward' | 'backward' | 'none'
  );
  function setRangeText(
    replacement: string,
    start?: number,
    end?: number,
    selectionMode?: SelectionMode
  );
</script>

<!-- Anatomy -->

<Label>
  <slot {composed} {disabled} {value} />
</Label>
<input />
```
