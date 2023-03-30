<script>
    import Playground from './TreePlayground.svelte';
</script>

# Tree

A hierarchy of items that can be expanded or collapsed.
A single tree item can be selected.

## Playground

<Playground />

## Features

- Get or set the expanded tree items.
- Get or set the selected tree item.
- Compose the tree into another control that manages border and focus.

## Interactions

- TreeItem provides the mouse and keyboard interactions.

## Usage

```svelte
<script lang="ts">
  import Tree from '@geoffcox/sterling-svelte/Tree.svelte';
  import TreeItem from '@geoffcox/sterling-svelte/TreeItem.svelte';

  let selectedValue = 'Panda';
</script>

<Tree bind:selectedValue>
  <TreeItem value="Bears" >
    <TreeItem value="Black bear">
    <TreeItem value="Grizzly bear">
    <TreeItem value="Panda">
  </TreeItem>
  <TreeItem value="Wolves">
    <TreeItem value="Timber wolf">
    <TreeItem value="Grey wolf">
  </TreeItem>
  <TreeItem value="Cats" >
    <TreeItem value="Cheetah">
    <TreeItem value="Lion">
    <TreeItem value="Tiger">
  </TreeItem>
</Tree>
```

## Props

| Prop           | Type                    | Default     | Description                                      |
| -------------- | ----------------------- | ----------- | ------------------------------------------------ |
| (div)          |                         |             | HTMLDivElement props                             |
| composed       | `boolean`               | `false`     | If the tree is composed within another component |
| disabled       | `boolean`               | `false`     | If the tree and its items are disabled items     |
| expandedValues | `string[]`              | `[]`        | The values of expanded tree items                |
| selectedValue  | `string` \| `undefined` | `undefined` | The value of the selected tree item              |

## Events

| Event          | Detail                          | Description                            |
| -------------- | ------------------------------- | -------------------------------------- |
| (div)          |                                 | HTMLDivElement events                  |
| expandCollapse | `{ expandedValues: string[]; }` | When a tree item is expanded/collapsed |
| select         | `{ selectedValue: string; }`    | When a tree item is selected           |

## Methods

| Name  | Parameters  | Description          |
| ----- | ----------- | -------------------- |
| blur  |             | HTMDivElement.blur   |
| focus | `(options)` | HTMLDivElement.focus |

## Anatomy

```
Tree (div)
    default slot
```

## Slots

| Slot    | Description   |
| ------- | ------------- |
| default | Tree children |

## Let Params

| Let Param | Passed to slots |
| --------- | --------------- |
| composed  | default         |
| disabled  | default         |

## TreeContext

- TreeItem sets TreeContext for children

| Name           | Type                            | Default     | Description                  |
| -------------- | ------------------------------- | ----------- | ---------------------------- |
| disabled       | `Readable<boolean>`             | `false`     | If the tree is disabled      |
| expandedValues | `Writable<string[]>`            | `[]`        | The values of expanded items |
| selectedValue  | `Writable<string`\|`undefined>` | `undefined` | The selected tree item value |
