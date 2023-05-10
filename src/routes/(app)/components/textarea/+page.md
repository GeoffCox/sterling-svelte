<script>
    import Playground from './TextAreaPlayground.svelte';
</script>

# TextArea

A styled `<textarea/>`.

- Automatically adjust the height to fit content.
- Add a resize handle to the corner of the text area.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDivElement props are forwarded

  let autoHeight: boolean = false;
  let colorful: boolean = false;
  let resize: TextAreaResize = 'none';
  let value: string;

  // ----- Events ----- //

  // HTMLDivElement events are bubbled

  dispatch('select', { value });

  // ----- Methods ----- //

  function blur();
  function focus(options: FocusOptions);
  function click();
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

<textarea />
```
