<script>
    import Playground from './MenuBarPlayground.svelte';
</script>

# MenuBar

A horizontal list of menus. Often positioned at the top of a window.

## Members

| Name        | Type      | Default | Description                                  |
| ----------- | --------- | ------- | -------------------------------------------- |
| variant     | string    | ''      | Additional class names to apply              |
| on:close    | `{value}` | ''      | Raised when a descendant menu is closed      |
| on:open     | `{value}` | ''      | Raised when a descendant menu is opened      |
| on:selected | `{value}` | ''      | Raised when descendant menu item is selected |
| (various)   |           |         | HTMLDivElement props, events, and functions  |

## Anatomy

```
<div class="sterling-menu-bar">
  <slot {variant} />
</div>
```

## Playground

<Playground />
