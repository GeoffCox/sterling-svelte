<script>
    import Playground from './TreeItemPlayground.svelte';
</script>

# TreeItem

An item within a `Tree` hierarchy.

- Provides selection, expand/collapse, and interaction within a Tree.
- By default, renders the item with TreeItemDisplay.
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

/** The text for the item when the item and label slots are not filled. */
export let text: string | undefined = undefined;

/** The value uniquely identifying this item within the tree. */
export let value: string;
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
    <slot name="item" {colorful} {depth} {disabled} {expanded} {hasChildren} {selected} {value}>
      <TreeItemDisplay>
        <slot name="label" {colorful} {depth} {disabled} {expanded} {hasChildren} {selected} {value}
          >{text || value}</slot
        >
      </TreeItemDisplay>
    </slot>
  </div>
  <!-- children -->
  <slot {depth} {disabled} {selected} {value} />
</div>
```

## Playground

<Playground />
