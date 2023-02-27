<script>
    import Playground from './TreeChevronPlayground.svelte';
</script>

# TreeChevron

A chevron indicating expanded/collapsed state for items in a Tree.

## Playground

<Playground />

## Features

- Displays a chevron for items with children and a bullet for items without.
- Chevron points right when collapsed, points down when expanded.
- Chevron changes are animated as rotation.
- No animation occurs for prefers-reduced-motion.

## Props

| Name        | Type      | Description                          |
| ----------- | --------- | ------------------------------------ |
| expanded    | `boolean` | If the associated item is expanded.  |
| hasChildren | `boolean` | If the associated item has children. |

## Anatomy

```
TreeChevron
```
