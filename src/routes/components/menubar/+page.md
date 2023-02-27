<script>
    import Playground from './MenuBarPlayground.svelte';
</script>

# MenuBar

A horizontal container of MenuItems typically at the top-level of an application or pane.

## Playground

<Playground />

## Features

- Children can be MenuItem or non-MenuItem components.
- Respond to close, open, and select events for any contained menu items.
- Supports cross-menu keyboard navigation:
  - When a menu item in the first level menu, left arrow opens the previous menu item in the menu bar.
  - When a menu item is a leaf, right arrow opens the next menu item in the menu bar.
  - When a menu item in the menu bar has focus, left/right arrows navigate to the previous/next menu item.

## Usage

Declare a MenuBar containing a hierarchy of MenuItems.

```svelte
<MenuBar on:select={onSelect}>
  <MenuItem value="file" text="File">
    <!-- ... child MenuItems -->
  </MenuItem>
  <MenuItem value="edit" text="Edit">
    <!-- ... child MenuItems -->
  </MenuItem>
  <MenuItem value="view" text="View">
    <!-- ... child MenuItems -->
  </MenuItem>
  <MenuItem value="help" text="Help">
    <!-- ... child MenuItems -->
  </MenuItem>
</MenuBar>
```

## Props

| Name  | Type           | Default | Description         |
| ----- | -------------- | ------- | ------------------- |
| (div) | HTMLDivElement |         | HTML div properties |

## Events

| Name     | Event.detail | Description                                  |
| -------- | ------------ | -------------------------------------------- |
| (div)    |              | HTML div events                              |
| close\*  | `{ value }`  | Raised when a menu item's submenu is closed. |
| open\*   | `{ value }`  | Raised when a menu item's submenu is opened. |
| select\* | `{ value }`  | Raised when a menu item is clicked/selected. |

- \* raised for any contained menu item.

## Anatomy

```
MenuItemBar
  default slot
```

- MenuItemDisplay is the default for the item slot
- The portal and menu display submenus floating above other page content

## Slots

| Slot    | Description                                                 |
| ------- | ----------------------------------------------------------- |
| default | Any declared MenuItem children                              |
| item    | The template for the menu item, defaults to MenuItemDisplay |

### let params

The item slot is passed the following `let` parameters.

| Let Param   | Type      | Description                                            |
| ----------- | --------- | ------------------------------------------------------ | --- |
| checked     | `boolean` | True if the item is checked.                           |
| depth       | `number`  | The menu depth of the item starting at 0.              |
| disabled    | `boolean` | True if the item is disabled                           |
| hasChildren | `boolean` | True if the item has children                          |
| open        | `boolean` | True if the submenu is open                            |
| value       | `string`  | The unique value of the item within the menu hierarchy |     |
| role        | `string`  | The aria role of the menu item                         |
| text        | `string`  | The text to display                                    |
