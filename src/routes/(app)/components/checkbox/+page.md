<script>
    import Playground from './CheckboxPlayground.svelte';
</script>

# Checkbox

A styled `<input type=checkbox />`.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLInputElement props are forwarded

  let shape: ButtonShape = 'rounded';
  let variant: ButtonVariant = 'regular';

  // ----- Events ----- //

  // HTMLInputElement events are bubbled

  // ----- Methods ----- //

  function click();
  function blur();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<div>
  <!-- hidden -->
  <input />
  <!-- checkmark -->
  <div />
  <Label>
    <slot {checked} {disabled} inputId={id} {value} />
  </Label>
</div>
```
