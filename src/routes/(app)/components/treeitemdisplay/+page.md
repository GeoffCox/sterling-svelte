<script>
    import Playground from './TreeItemDisplayPlayground.svelte';
</script>

# TreeItemDisplay

A chevron and a label for an item in a tree.
TreeItem uses this as the default content in the item slot.

## Playground

<Playground />

## Features

- Provides a chevron for expanded and collapsed states.
- Visually indicates when the item is selected.
- The content can be customized with the default slot.

## Usage

```svelte
<script lang="ts">
  let expanded = false;
  let hasChildren = true;
  let depth = 1;
  let selected = false;
</script>

<TreeItemDisplay value="sterling-svelte" {depth} {expanded} {hasChildren} {selected}>
  sterling-svelte
</TreeItemDisplay>
```

## Props

| Name        | Type      | Description                                           |
| ----------- | --------- | ----------------------------------------------------- |
| depth       | `number`  | The depth of the associated tree item witin the tree. |
| disabled    | `boolean` | Disables the item                                     |
| expanded    | `boolean` | If the associated tree item is expanded.              |
| hasChildren | `boolean` | If the associated tree item has children.             |
| selected    | `boolean` | If the associated tree item has is selected.          |

## Events

| Name  | Event.detail | Description           |
| ----- | ------------ | --------------------- |
| (div) |              | HTMLDivElement events |

## Methods

| Name  | Parameters  | Description          |
| ----- | ----------- | -------------------- |
| blur  |             | HTMDivElement.blur   |
| click |             | HTMLDivElement.click |
| focus | `(options)` | HTMLDivElement.focus |

## Anatomy

```
TreeItemDisplay (div)
  TreeChevron
  default slot
```

## Slots

| Slot    | Description                   |
| ------- | ----------------------------- |
| default | The content after the chevron |

### Let Params

The default slot is passed the following `let` parameters.

| Let Param   | Passed to slots |
| ----------- | --------------- |
| depth       | default         |
| disabled    | default         |
| expanded    | default         |
| hasChildren | default         |
| nodeID      | default         |
| selected    | default         |
| value       | default         |
