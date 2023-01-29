<script>
    import Playground from './TreeChevronPlayground.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# TreeChevron

A chevron indicating expanded/collapsed state for nodes in a Tree.

## Playground

<Playground />

## Features

- Displays a chevron for nodes with children and a bullet for nodes without.
- Chevron points right when node collapsed, points down when expanded.
- Chevron changes are animated as rotation. No animation when prefers-reduced motion.

## Props

| Name        | Type      | Description                          |
| ----------- | --------- | ------------------------------------ |
| expanded    | `boolean` | If the associated node is expanded.  |
| hasChildren | `boolean` | If the associated node has children. |

## Anatomy

```
TreeChevron
```
