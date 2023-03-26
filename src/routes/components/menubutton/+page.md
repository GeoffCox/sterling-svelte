<script>
    import Playground from './MenuButtonPlayground.svelte';
</script>

# MenuButton

A Button that shows a menu when clicked.

## Playground

<Playground />

## Features

- A composite component of Button and Menu
- Bubbles events for MenuItem descendants

## Interactions

- Clicking the button opens/closes the menu

## Usage

```svelte
<script lang="ts">
  import MenuItem from '@geoffcox/sterling-svelte/MenuItem.svelte';

  const onSelect = (event) => {
    alert('select', event.detail.value);
  };
</script>

<MenuButton value="file" on:select={onSelect}>
  File
  <svelte:fragment slot="items">
  <MenuItem value="new" text="New" />
  <MenuItem value="open" text="Open" />
  <MenuItem value="save" text="Save" />
  <MenuItem value="close" text="Close" />
  </svelte:fragment>
</MenuItem>
```

## Props

| Name     | Type       | Default | Description                          |
| -------- | ---------- | ------- | ------------------------------------ |
| (Button) |            |         | Button properties                    |
| open     | `boolean ` | `false` | If the menu is visible               |
| value    | `string  ` |         | The unqiue value of the menu button. |

## Events

| Name     | Event.detail | Description                                  |
| -------- | ------------ | -------------------------------------------- |
| (Button) |              | Button events                                |
| close\*  | `{ value }`  | Raised when a menu item's submenu is closed. |
| open\*   | `{ value }`  | Raised when a menu item's submenu is opened. |
| select\* | `{ value }`  | Raised when a menu item is clicked/selected. |

- \* raised for a menu item or any of its submenu children.

## Anatomy

```
Button
  default slot
  Menu
    items slot
```

## Slots

| Slot    | Description             |
| ------- | ----------------------- |
| default | Button content          |
| items   | Menu items for the menu |

## Let Params

| Name    | Passed to slots |
| ------- | --------------- |
| shape   | default         |
| variant | default         |
