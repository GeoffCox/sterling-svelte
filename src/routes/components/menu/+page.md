# Menu

A panel that floats above other content containing a list of menu items.

Menu is a building block of the menu system:

- [MenuBar](menubar)
- [MenuButton](menubutton)
- [MenuItem](menuitem)
- [MenuSeparator](menuseparator)

## Features

- Manages position based on the reference element.
- Appears above other content in the page.

## Usage

To display a menu, reference the component triggering the menu to position the menu.
Use the open property to show or hide the menu.

```svelte
<Menu {open} reference={buttonRef}>
  <MenuItem value="new" text="New" />
  <MenuItem value="open" text="Open" />
  <MenuItem value="save" text="Save" />
  <MenuItem value="close" text="Close" />
</Menu>
```

## Props

| Name      | Type        | Default | Description                                       |
| --------- | ----------- | ------- | ------------------------------------------------- |
| (div)     |             |         | HTMLDivElement props                              |
| open      | boolean     | false   | If the submenu is visible                         |
| reference | HTMLElement |         | The element to reference for positioning the menu |

## Events

| Name  | Params | Description           |
| ----- | ------ | --------------------- |
| (div) |        | HTMLDivElement events |

## Anatomy

```
(portal)
  Menu
    default slot
```

## Slots

| Slot    | Description   |
| ------- | ------------- |
| default | Menu contents |
