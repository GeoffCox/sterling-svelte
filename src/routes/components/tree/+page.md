<script>
    import Playground from './TreePlayground.svelte';
</script>

# Tree

A hierarchy of items.

## Playground

<Playground />

## Features

- Provides expanded items tracking for TreeItem children.
- Provides selected item tracking for TreeItem children.
- You can identify the tree's content with the optional label.

## Props

| Prop            | Type                                 | Description                                             |
| --------------- | ------------------------------------ | ------------------------------------------------------- |
| composed        | `boolean`                            | Indicates the tree is composed within another component |
| disabled        | `boolean`                            | Disables the tree and tree items                        |
| expandedItemIds | `string[]`                           | The IDs of expanded tree items                          |
| selectedItemId  | `string` <b>&#10072;</b> `undefined` | The ID of the selected tree item                        |

## Events

| Event          | Detail                           | Description                                      |
| -------------- | -------------------------------- | ------------------------------------------------ |
| select         | `{ selectedItemId: string; }`    | Raised when a tree item is selected              |
| expandCollapse | `{ expandedItemIds: string[]; }` | Raised when a tree item is expanded or collapsed |

## Anatomy

```
Tree
  label slot
  tree
      default slot
```

## Slots

| Slot    | Description                    |
| ------- | ------------------------------ |
| default | Any declared TreeItem children |
| label   | The tree label                 |
