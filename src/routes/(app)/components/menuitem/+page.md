<script>
    import Playground from './MenuItemPlayground.svelte';
</script>

# MenuItem

A clickable item within a menu.

## Playground

<Playground />

## Features

- Display a checkbox or radio dot based on checked state
- Show child menu items in a submenu
- The submenu floats above other element via portaling
- Compose the menu item into another control that manages border and focus

## Interactions

- Enter/space key invokes a menu item
- Up/down arrow key selects the previous/next menu item
- Left/right arrow key collapses/expands a menu item's submenu
- Escape key closes the hierarchy of open menus

## Usage

```svelte
<script lang="ts">
  import MenuItem from '@geoffcox/sterling-svelte/MenuItem.svelte';

  const onSelect = (event) => {
    alert('select', event.detail.value);
  };
</script>

<MenuItem value="file" text="File" on:select={onSelect}>
  <MenuItem value="new" text="New" />
  <MenuItem value="open" text="Open" />
  <MenuItem value="save" text="Save" />
  <MenuItem value="close" text="Close" />
</MenuItem>
```

## Props

| Name     | Type                    | Default     | Description                             |
| -------- | ----------------------- | ----------- | --------------------------------------- |
| (button) |                         |             | HTMLButtonElement properties            |
| checked  | `boolean`               | `false`     | If the menu item is checked             |
| disabled | `boolean`               | `false`     | If the menu item is disabled            |
| open     | `boolean`               | `false`     | If the submenu is open                  |
| value    | `string`                |             | The unqiue value of the menu item       |
| text     | `string` \| `undefined` | `undefined` | The text to display for the menu item\* |

- \* If the item slot is filled, text is not displayed as part of MenuItemDisplay.

## Events

| Name     | Event.detail | Description                                 |
| -------- | ------------ | ------------------------------------------- |
| (button) |              | HTMLButtonElement events                    |
| close\*  | `{ value }`  | Raised when a menu item's submenu is closed |
| open\*   | `{ value }`  | Raised when a menu item's submenu is opened |
| select\* | `{ value }`  | Raised when a menu item is clicked/selected |

- \* raised for a menu item or any of its descendants.

## Methods

| Name  | Parameters  | Description             |
| ----- | ----------- | ----------------------- |
| blur  |             | HTMLButtonElement.blur  |
| click |             | HTMLButtonElement.click |
| focus | `(options)` | HTMLButtonElement.focus |

## Anatomy

```
MenuItem (button)
  item slot
    MenuItemDisplay

portal
  Menu
    default slot
```

## Slots

| Slot    | Description       |
| ------- | ----------------- |
| default | MenuItem children |
| item    | MenuItem content  |

## Let Params

| Name        | Passed to slots |
| ----------- | --------------- |
| checked     | item            |
| depth       | default, item   |
| disabled    | default, item   |
| hasChildren | item            |
| open        | item            |
| role        | item            |
| text        | item            |
| value       | item            |
