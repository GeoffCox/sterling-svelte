<script>
    import Playground from './TreeChevronPlayground.svelte';
</script>

# TreeChevron

A chevron indicating expanded/collapsed of an item in a tree hierarchy.

## Props

HTMLDivElement props are included.

```ts
/** When true, the chevron rotates to indicate children are visible. */
export let expanded = false;

/** When true, the chevron is displayed, otherwise a dot is displayed. */
export let hasChildren = false;
```

## Events

HTMLDivElement events are included.

## Anatomy

```svelte
<div />
```

## Playground

<Playground />
