<script>
    import Example from './TreeItemExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# TreeItem

A wrapper around each item in a Tree when the Tree's item slot is not filled.

## Playground

<Example />

## Features

## Anatomy

```
  label slot
  list of nodes
    _default_ slot (item template)
```

## Props

| Name                    | Type    | Description                              |
| ----------------------- | ------- | ---------------------------------------- |
| disabled                | boolean | Disables the list and items              |
| items                   | any[]   | The items in the list                    |
| horizontal              | boolean | If the list layout should be horizontal  |
| selectedIndex           | number  | The index of the currently selected item |
| selectedItem (readonly) | any     | The currently selected item              |
