<script>
    import Playground from './TreeNodeItemPlayground.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# TreeNodeItem

Displays a chevron and a label for a node in a tree.

## Playground

<Playground />

## Features

- Provides a chevron for expanded and collapsed states.
- Visual indicates when the node is selected.
- Can customize the label with the label slot.

## Anatomy

```
TreeNodeItem
  TreeNodeChevron
  label slot
```

### Slot let params

- label: `depth`, `disabled`, `expanded`, `hasChildren`, `selected`

## Props

| Name        | Type      | Description                                      |
| ----------- | --------- | ------------------------------------------------ |
| depth       | `number`  | The depth of the associated node witin the tree. |
| disabled    | `boolean` | Disables the item                                |
| expanded    | `boolean` | If the associated node is expanded.              |
| hasChildren | `boolean` | If the associated node has children.             |
| selected    | `boolean` | If the associated node has is selected.          |
