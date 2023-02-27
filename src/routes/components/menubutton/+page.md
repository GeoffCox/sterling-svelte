<script>
    import Playground from './MenuButtonPlayground.svelte';
</script>

# MenuButton

A Button that shows a context menu when clicked.

## Playground

<Playground />

## Features

- Same features as the Button component
- Same features as the menu of the MenuItem component.

## Usage

Declare a hierarchy of MenuItems each with a unique value and text to display.
Children of a MenuItem will be in its submenu.

```ts
const onSelect = (event) => {
  alert('select', event.detail.value);
};
```

```svelte
<MenuItem value="file" text="File" on:select={onSelect}>
  <MenuItem value="new" text="New" />
  <MenuItem value="open" text="Open" />
  <MenuItem value="save" text="Save" />
  <MenuItem value="close" text="Close" />
</MenuItem>
```

## Props

| Name     | Type     | Default    | Description                            |
| -------- | -------- | ---------- | -------------------------------------- |
| (Button) |          |            | Button props                           |
| open     | boolean  | false      | If the submenu is visible              |
| value    | string   |            | The unqiue value of the menu item.     |
| role     | string\* | 'menuitem' | The aria role of the menu item.        |
| text     | string   |            | The text to display for the menu item. |

- \* 'menuitem' | 'menuitemcheckbox' | 'menuitemradio'

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

| Slot    | Description                    |
| ------- | ------------------------------ |
| default | Button content                 |
| items   | Menu items in the context menu |
