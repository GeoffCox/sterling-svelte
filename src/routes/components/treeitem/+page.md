<script>
    import Playground from './TreeItemPlayground.svelte';
</script>

# TreeItem

An item within a `Tree` hierarchy.

## Playground

<Playground />

## Features

- Provides selection, expand/collapse, and interaction within a Tree.
- By default, renders the item with TreeItemDisplay.

## Interactions

- Clicking the item selects it.
- Clicking an item that has children will toggle expand/collapse.
- Up/Down arrow keys will select the previous/next tree item in the hierarchy.
- Right/Left arrow keys will expand/collapse children.
- If a tree item is already expanded, right arrow selects the first child.
- If a tree item is already collapsed, left arrow selects the previous tree item.

- Note: A tree item is identified by having `data-value` and `role="treeitem"` properties

## Props

| Prop     | Type      | Default | Description                  |
| -------- | --------- | ------- | ---------------------------- |
| div      |           |         | HTMLDivElement properties    |
| value    | `string`  |         | The unique value of the item |
| disabled | `boolean` | `false` | Disables the item            |

## Events

| Event | Detail | Description           |
| ----- | ------ | --------------------- |
| (div) |        | HTMLDivElement events |

## Methods

| Name           | Parameters  | Description                                   |
| -------------- | ----------- | --------------------------------------------- |
| blur           |             | HTMDivElement.blur                            |
| click          |             | HTMLDivElement.click                          |
| focus          | `(options)` | HTMLDivElement.focus                          |
| select         |             | Selects the item                              |
| selectPrevious |             | Selects the previous item in the hierarchy\*  |
| selectNext     |             | Selects the next item in the hierarchy\*      |
| selectParent   |             | Selects the item's parent in the hierarchy    |
| expand         |             | Expands the item to display children          |
| collapse       |             | Collapses the item to hide children           |
| toggleExpanded |             | Toggles the if the item is expanded/collpased |

- \* This is the previous/next item visually. This may be a sibling, decendant, parent, ancestor, ancestor's sibling, or ancestor's descendant.

## Anatomy

```
TreeItem (div)
  item (div)
    item slot
        TreeItemDisplay
            label slot
  children (div)
    default slot
```

## Slots

| Slot    | Description                         |
| ------- | ----------------------------------- |
| default | The item's children\*               |
| item    | The content of the item\*\*         |
| label   | The content for the TreeItemDisplay |

- \* The children are conditionally rendered when the item is expanded.
- \*\* The default content for the item slot is a TreeItemDsiplay. If the item slot is filled, then the TreeItemDisplay will not exist.

### Let Params

| Let Param   | Passed to slots      |
| ----------- | -------------------- |
| depth       | default, item, label |
| disabled    | default, item, label |
| expanded    | item, label          |
| hasChildren | item, label          |
| selected    | default, item, label |
| value       | default, item, label |

## TreeItemContext

- TreeItem gets TreeContext and TreeItemContext
- TreeItem sets TreeItemContext for children

| Name     | Type                | Default | Description             |
| -------- | ------------------- | ------- | ----------------------- |
| depth    | `number`            | `0`     | The depth of the item   |
| disabled | `Readable<boolean>` | `false` | If the item is disabled |
