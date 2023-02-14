<script>
    import Playground from './MenuSeparatorPlayground.svelte';
</script>

# MenuSeparator

A styled line for separating menu items.

## Playground

<Playground />

## Features

- Provides `role='separator'` to support ARIA

## Usage

Declare a menu separator within a menu item.

```svelte
<MenuItem menuItemId="file" text="File">
  <MenuItem menuItemId="new-file" text="New..." />
  <MenuSeparator />
  <MenuItem menuItemId="open-file" text="Open..." />
</MenuItem>
```

## Props

| Name  | Type           | Description         |
| ----- | -------------- | ------------------- |
| (div) | HTMLDivElement | HTML div properties |

## Events

| Name  | Description     |
| ----- | --------------- |
| (div) | HTML div events |

## Anatomy

```
MenuSeparator
```
