<script>
    import Playground from './MenuItemPlayground.svelte';
</script>

# MenuItem

A styled HTML `button` providing an item within a menu.

## Members

| Name        | Type                    | Default   | Description                                                             |
| ----------- | ----------------------- | --------- | ----------------------------------------------------------------------- |
| checked     | boolean                 | false     | When true, the menu item is checked                                     |
| disabled    | boolean                 | false     | When true, the menu item is disabled                                    |
| role        | MenuItemRole            | ''        | The role of the menu item                                               |
| text        | string &#124; undefined | undefined | The text of the menu item                                               |
| value       | string                  | ''        | The value uniquely identifying this menu item within the menu hierarchy |
| variant     | string                  | ''        | Additional class names to apply                                         |
| on:close    | `{value}`               | ''        | Raised when a descendant menu is closed                                 |
| on:open     | `{value}`               | ''        | Raised when a descendant menu is opened                                 |
| on:selected | `{value}`               | ''        | Raised when this menu item or a descendant menu item is selected        |
| (various)   |                         |           | HTMLButtonElement props, events, and functions                          |

## Anatomy

```
<button class="sterling-menu-item">
  <div class="item">
    <slot
      name="item"
      {checked}
      {depth}
      {disabled}
      {hasChildren}
      {isMenuBarItem}
      {open}
      {role}
      {text}
      {value}
      {variant}
    >
      <MenuItemDisplay>{text}</MenuItemDisplay>
    </slot>
  </div>
  <Popover>
    <Menu>
      <slot {depth} {disabled} />
    </Menu>
  </Popover>
</button>
```

## Considerations

- The checked prop is only applied when role='menuitemcheckbox' or role='menuitemradio'
- The text prop is ignored when the text slot is filled.

## Playground

<Playground />
