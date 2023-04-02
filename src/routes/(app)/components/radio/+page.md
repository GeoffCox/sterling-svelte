# Radio

A styled `<input type="radio" />`

<script>
    import Playground from './RadioPlayground.svelte';
</script>

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let checked: boolean = false;
  let disabled: boolean = false;
  let group: any | undefined | null = undefined;
  let id: string | undefined = undefined;

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
  <!-- radio dot -->
  <div />
  <Label>
    <slot {checked} {disabled} inputId={id} {value} />
  </Label>
</div>
```
