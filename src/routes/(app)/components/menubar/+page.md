<script>
    import Playground from './MenuBarPlayground.svelte';
</script>

# MenuBar

A horizontal list of menu items typically at the top of a window.

## Playground

<Playground />

## Features

- Children can be MenuItem or non-MenuItem components
- Bubbles events for MenuItem descendants

## Interactions

- See MenuItem for interactions within the menus
- Left/Right arrow keys opens the previous/next menu item
- Down arrow open the focused menu item
- Escape key closes any open menus within the menu bar

## Usage

```svelte
<script lang="ts">
  import MenuBar from '@geoffcox/sterling-svelte/MenuBar.svelte';
  import MenuItem from '@geoffcox/sterling-svelte/MenuItem.svelte';

  const onSelect = (event) => {
    alert('select', event.detail.value);
  };
</script>

<MenuBar on:select={onSelect}>
  <MenuItem value="file" text="File" />
  <MenuItem value="edit" text="Edit" />
  <MenuItem value="view" text="View" />
  <MenuItem value="help" text="Help" />
</MenuBar>
```

## Props

| Name  | Type | Default | Description               |
| ----- | ---- | ------- | ------------------------- |
| (div) |      |         | HTMLDivElement properties |

## Events

| Name     | Event.detail | Description                                 |
| -------- | ------------ | ------------------------------------------- |
| (div)    |              | HTMLDivElement events                       |
| close\*  | `{ value }`  | Raised when a menu item's submenu is closed |
| open\*   | `{ value }`  | Raised when a menu item's submenu is opened |
| select\* | `{ value }`  | Raised when a menu item is clicked/selected |

- \* raised for any contained menu item

## Methods

| Name  | Parameters  | Description          |
| ----- | ----------- | -------------------- |
| blur  |             | HTMLDivElement.blur  |
| focus | `(options)` | HTMLDivElement.focus |

## Anatomy

```
MenuItemBar
  default slot
```

## Slots

| Slot    | Description              |
| ------- | ------------------------ |
| default | MenuBar child menu items |
