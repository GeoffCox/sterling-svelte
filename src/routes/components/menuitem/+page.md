<script>
    import Playground from './MenuItemPlayground.svelte';
</script>

# MenuItem

A clickable item within a menu.

## Playground

<Playground />

## Features

- Menu items can act as checkboxes or radio buttons to toggle checked state.
- Menu items can contain other menu items to display a submenu when clicked.
- Submenus are shown in popovers above other content.
- The select event is raised when a menu item or any of its children are clicked.
- A submenu can contain MenuItem and non-MenuItem components.
- Users can navigate menus using the keyboard:

  - Click/select a menu with enter or spacebar keys.
  - Cycle focus through menu items with the up/down arrow keys.
  - Expand/collapse submenus with the left/right arrow keys.
  - Close the entire hierarchy of open menus with the escape key.

## Usage

Declare a hierarchy of MenuItems each with a unique ID and text to display.
Children of a MenuItem will be in its submenu.

```ts
const onSelect = (event) => {
  console.log('select', event.detail.menuItemId);
};
```

```svelte
<MenuItem menuItemId="file" text="File" on:select={onSelect}>
  <MenuItem menuItemId="new" text="New" />
  <MenuItem menuItemId="open" text="Open" />
  <MenuItem menuItemId="save" text="Save" />
  <MenuItem menuItemId="close" text="Close" />
</MenuItem>
```

## Props

| Name       | Type     | Default    | Description                            |
| ---------- | -------- | ---------- | -------------------------------------- |
| checked    | boolean  | false      | If the menu item is checked            |
| disabled   | boolean  | false      | Disables the menu item                 |
| open       | boolean  | false      | If the submenu is visible              |
| menuItemId | string   |            | The unqiue ID of the menu item.        |
| role       | string\* | 'menuitem' | The aria role of the menu item.        |
| text       | string   |            | The text to display for the menu item. |

- \* 'menuitem' | 'menuitemcheckbox' | 'menuitemradio'

## Events

| Name     | Event.detail     | Description                                  |
| -------- | ---------------- | -------------------------------------------- |
| close\*  | `{ menuItemId }` | Raised when a menu item's submenu is closed. |
| open\*   | `{ menuItemId }` | Raised when a menu item's submenu is opened. |
| select\* | `{ menuItemId }` | Raised when a menu item is clicked/selected. |

- \* raised for a menu item or any of its submenu children.

## Anatomy

```
MenuItem
  item slot
    MenuItemDisplay

portal
  menu
    children
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

| Let Param   | Type      | Description                                     |
| ----------- | --------- | ----------------------------------------------- |
| checked     | `boolean` | True if the item is checked.                    |
| depth       | `number`  | Menu depth of the item starting at 0            |
| disabled    | `boolean` | True if the item is disabled                    |
| hasChildren | `boolean` | True if the item has children                   |
| open        | `boolean` | True if the submenu is open                     |
| menuItemId  | `string`  | Unique ID of the item within the menu hierarchy |
| role        | `string`  | Aria role of the menu item                      |
| text        | `string`  | Text to display                                 |
