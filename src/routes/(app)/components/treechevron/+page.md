<script>
    import Playground from './TreeChevronPlayground.svelte';
</script>

# TreeChevron

A chevron indicating expanded/collapsed of an item in a tree hierarchy.

## Playground

<Playground />

## Features

- Displays a chevron for items with children and a bullet for items without.
- Chevron points right when collapsed, points down when expanded.
- Chevron changes are animated as rotation.
- No animation occurs when prefers-reduced-motion set.

## Props

| Name        | Type      | Deafault | Description                          |
| ----------- | --------- | -------- | ------------------------------------ |
| expanded    | `boolean` | `false`  | If the associated item is expanded.  |
| hasChildren | `boolean` | `false`  | If the associated item has children. |

## Anatomy

```
TreeChevron (div)
```
