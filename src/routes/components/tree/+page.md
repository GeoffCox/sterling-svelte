<script>
    import Playground from './TreePlayground.svelte';
</script>

# Tree

A hierarchy of items.

## Playground

<Playground />

## Features

- Control which tree items are expanded or collapsed.
- Get or set the selected tree item.
- Identify the tree's content with the optional label.

## Props

| Prop           | Type                                 | Description                                             |
| -------------- | ------------------------------------ | ------------------------------------------------------- |
| composed       | `boolean`                            | Indicates the tree is composed within another component |
| disabled       | `boolean`                            | Disables the tree and tree items                        |
| expandedValues | `string[]`                           | The values of expanded tree items                       |
| selectedValue  | `string` <b>&#10072;</b> `undefined` | The value of the selected tree item                     |

## Events

| Event          | Detail                          | Description                                      |
| -------------- | ------------------------------- | ------------------------------------------------ |
| expandCollapse | `{ expandedValues: string[]; }` | Raised when a tree item is expanded or collapsed |
| select         | `{ selectedValue: string; }`    | Raised when a tree item is selected              |

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
