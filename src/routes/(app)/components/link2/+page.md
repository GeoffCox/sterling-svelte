<script>
    import Playground from './LinkPlayground.svelte';
</script>

# Link

A styled HTML `a` link or anchor element.

## Members

| Name      | Type   | Default | Description                                    |
| --------- | ------ | ------- | ---------------------------------------------- |
| variant   | string | ''      | Additional class names to apply                |
| (various) |        |         | HTMLAnchorElement props, events, and functions |

## Anatomy

```
<a class="sterling-link">
  <slot {disabled} {href} {variant} />
</a>
```

## Playground

<Playground />
