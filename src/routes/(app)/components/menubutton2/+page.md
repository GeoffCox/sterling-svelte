<script>
    import Playground from './MenuButtonPlayground.svelte';
</script>

# MenuButton

A `Button` displaying a `Menu` when clicked.

## Members

| Name        | Type      | Default | Description                                                                       |
| ----------- | --------- | ------- | --------------------------------------------------------------------------------- |
| open        | boolean   | false   | When true, the menu is open                                                       |
| menuVariant | string    | ''      | Additional class names to apply to the Menu                                       |
| value       | string    | ''      | The value uniquely identifying this menu button as the root of the menu hierarchy |
| variant     | string    | ''      | Additional class names to apply                                                   |
| on:close    | `{value}` | ''      | Raised when a descendant menu is closed                                           |
| on:open     | `{value}` | ''      | Raised when a descendant menu is opened                                           |
| on:selected | `{value}` | ''      | Raised when descendant menu item is selected                                      |
| (various)   |           |         | Button props, events, and functions                                               |

## Anatomy

```
<Button>
  <div class="reference">
    <slot {open} {value} {variant} />
  </div>
  <Popover>
    <Menu variant={menuVariant}>
      <slot name="items" />
    </Menu>
  </Popover>
</Button>
```

## Playground

<Playground />
