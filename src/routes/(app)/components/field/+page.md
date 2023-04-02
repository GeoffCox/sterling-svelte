<script>
    import Playground from './FieldPlayground.svelte';
</script>

# Field

A label container for an interactive element such as an input, select, list, or tree.

- Set optional message and status of the field
- Set required and requiredTip to indicate the user must fill in a value
- Set `for` to the `id` of the interactive element to improve voice navigation.

<Playground />

```svelte
<script lang="ts">
  // ----- Types ----- //

  type FieldStatus = 'none' | 'info' | 'success' | 'warning' | 'error';

  // ----- Props ----- //

  // HTMLLabelElement props are forwarded

  let forwardClick: boolean = false;
  let for: string | undefined = undefined;
  let label: string | undefined = undefined;
  let message: string | undefined = undefined;
  let required: boolean = false;
  let requiredReason = 'This field is required';
  let status: FieldStatus = 'none';

  // ----- Events ----- //

  // HTMLLabelElement events are bubbled

  // ----- Methods ----- //

  function click();
  function blur();
  function focus(options: FocusOptions);
</script>

<!-- Anatomy -->

<label>
  <slot name="label" disabled={targetDisabled} for={htmlFor} {forwardClick} {label} {required} />
  <slot />
  <slot name="message" disabled={targetDisabled} {message} {required} {status}>
  <slot name="required" {requiredTip}>
</label>
```
