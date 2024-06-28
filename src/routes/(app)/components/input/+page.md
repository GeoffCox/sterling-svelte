<script>
    import Playground from './InputPlayground.svelte';
</script>

# Input

A styled HTML `input` with an optional label.

## Members

| Name      | Type   | Default | Description                                   |
| --------- | ------ | ------- | --------------------------------------------- |
| variant   | string | ''      | Additional class names to apply               |
| (various) |        |         | HTMLInputElement props, events, and functions |

## Anatomy

```
<label class="sterling-input-label">
  <slot {disabled} {value} {variant} />
</label>
<div class="sterling-input">
  <input />
</div>
```

## Considerations

- Prefer using the Label component rather than the label produced by providing default slot content.

## Playground

<Playground />
