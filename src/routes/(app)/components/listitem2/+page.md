<script>
    import Playground from './ListItemPlayground.svelte';
</script>

# ListItem

An item within a `List`.

## Members

| Name      | Type    | Default | Description                                              |
| --------- | ------- | ------- | -------------------------------------------------------- |
| disabled  | boolean | false   | When true, the item is disabled                          |
| value     | string  |         | The value uniquely identifying this item within the list |
| variant   | string  | ''      | Additional class names to apply                          |
| (various) |         |         | HTMLDivElement props, events, and functions              |

## Anatomy

```
<div class="sterling-list-item">
  <slot {disabled} {horizontal} {selected} {value} {variant}>{value}</slot>
</div>
```

## Playground

<Playground />
