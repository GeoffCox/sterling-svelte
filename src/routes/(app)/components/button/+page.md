<script>
  import Playground from './ButtonPlayground.svelte';
</script>

# Button

A styled HTML `button` element.

## Members

| Name      | Type   | Default | Description                                    |
| --------- | ------ | ------- | ---------------------------------------------- |
| variant   | string | ''      | Additional class names to apply                |
| (various) |        |         | HTMLButtonElement props, events, and functions |

## Anatomy

```
<button class="sterling-button">
  <slot {disabled} {variant} />
</button>
```

## Considerations

- The default `type` prop is set to `'button'` rather than `'submit'`.

## Playground

<Playground />
