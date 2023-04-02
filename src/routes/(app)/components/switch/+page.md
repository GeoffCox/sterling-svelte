<script>
    import Playground from './SwitchPlayground.svelte';
</script>

# Switch

A styled `<input type=checkbox/>`.

- Horizontal or vertical layout
- On/Off labels for switch positions

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let vertical: boolean = false;
  let onText: string | undefined = undefined;
  let offText: string | undefined = undefined;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  // ----- Methods ----- //

  function blur();
  function click();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<div>
   <!-- hidden -->
  <input />
  <slot name="offLabel" {checked} {disabled} {inputId} {offText} {vertical} />
    <!-- toggle -->
  <div />
   <slot name="onLabel" {checked} {disabled} {inputId} {onText} {vertical}>
</div>
```
