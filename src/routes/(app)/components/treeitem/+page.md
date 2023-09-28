<script>
    import Playground from './TreeItemPlayground.svelte';
</script>

# TreeItem

An item within a `Tree` hierarchy.

- Provides selection, expand/collapse, and interaction within a Tree.
- By default, renders via TreeItemDisplay.
- Note: A tree item is identified by having `data-value` and `role="treeitem"` properties

## Types

TreeItem inspects both TreeContext and TreeItemContext to handle colorful, disabled, expand/collapse, and selected state.

```ts
/**
 * The context for a tree item and its descendants.
 */
export type TreeItemContext = {
  /**
   * The depth of this tree item within the tree hierarchy.
   * Starts at zero.
   */
  depth: number;

  /** When true, the three item is disabled. */
  disabled: Readable<boolean>;
};
```

## Props

HTMLDivElement props are included.

```ts
/** When true, the item is disabled. */
export let disabled = false;

/** The text for the item. Not used when either the item or label slots are filled. */
export let text: string | undefined = undefined;

/** The value uniquely identifying this item within the tree. */
export let value: string;

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

## Methods

HTMLDivElement `blur`, `click`, and `focus` methods are included.

```ts
function collapse();
function expand();
function select();
function selectParent();
function selectPrevious();
function selectNext();
function toggleExpanded();
```

## Anatomy

```svelte
<div>
  <!-- item -->
  <div>
    <slot name="item" {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant}>
      <TreeItemDisplay {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant}>
        <!-- label slot (passed to default slot of TreeItemDisplay)  -->
        <slot name="label" {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant}
          >{text || value}</slot
        >
      </TreeItemDisplay>
    </slot>
  </div>
  <!-- children -->
  <slot {depth} {disabled} {expanded} {selected} {value} {variant} />
</div>
```

## Sterling Theme Variants

| Variant  | Description           |
| -------- | --------------------- |
| colorful | applies accent colors |

## Playground

<Playground />
