<script>
    import Playground from './ListPlayground.svelte';
</script>

# List

A list of items with a selected item.

## Members

| Name                 | Type                      | Default   | Description                                        |
| -------------------- | ------------------------- | --------- | -------------------------------------------------- |
| disabled             | boolean                   | false     | When true, the list and all its items are disabled |
| horizontal           | boolean                   | false     | When true, items are arranged horizontally         |
| selectedValue        | string `&#124;` undefined | undefined | The value of the currently selected item           |
| variant              | string                    | ''        | Additional class names to apply                    |
| on:select            | `{value}`                 | ''        | Raised when the selecteValue changes               |
| scrollToSelectedItem | `()`                      |           | scrolls to the selected item                       |
| selectFirstItem      | `()`                      |           | selects the last item in the list                  |
| selectPreviousItem   | `()`                      |           | selects the item before the selected item          |
| selectNextItem       | `()`                      |           | selects the item after the selected item           |
| selectLastItem       | `()`                      |           | selects the last item in the list                  |
| (various)            |                           |           | HTMLDivElement props, events, and functions        |

## Anatomy

Use the default slot to provide list items.

```
<div class="sterling-list">
  <slot {disabled} {horizontal} {selectedValue} {variant} />
</div>
```

## Considerations

- A list item is identified by having `data-value` and `role="listitem"` properties.
  Any content without these properties, will not participate in selection.
  This allows you to mix in other content with list items such as search boxes, group headers, or decorations.
- If no item is selected, selectNextItem selects the first item in the list and selectPreviousItem selects the last item in the list.

## Playground

<Playground />
