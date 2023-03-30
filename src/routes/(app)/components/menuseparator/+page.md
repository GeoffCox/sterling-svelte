<script>
    import Playground from './MenuSeparatorPlayground.svelte';
</script>

# MenuSeparator

A line between groups of menu items.

## Playground

<Playground />

## Features

- Provides `role='separator'` to support ARIA

## Usage

Declare a menu separator within a menu item.

```svelte
<MenuItem value="file" text="File">
  <MenuItem value="new-file" text="New..." />
  <MenuSeparator />
  <MenuItem value="open-file" text="Open..." />
</MenuItem>
```

## Props

| Name  | Type | Description               |
| ----- | ---- | ------------------------- |
| (div) |      | HTMLDivElement properties |

## Events

| Name  | Event detail | Description           |
| ----- | ------------ | --------------------- |
| (div) |              | HTMLDivElement events |

## Anatomy

```
MenuSeparator (div)
```
