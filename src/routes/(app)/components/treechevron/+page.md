<script>
    import Playground from './TreeChevronPlayground.svelte';
</script>

# TreeChevron

A chevron indicating expanded/collapsed state of an item in a tree hierarchy.

## Props

HTMLDivElement props are included.

```ts
/** When true, the chevron rotates to indicate children are visible. */
export let expanded = false;

/** When true, the chevron is displayed, otherwise a dot is displayed. */
export let hasChildren = false;

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

## Anatomy

```svelte
<div class="sterling-tree-chevron" />
```

## Playground

<Playground />
