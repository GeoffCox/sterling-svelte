<script>
    import Playground from './LinkPlayground.svelte';
</script>

# Link

A styled HTML `a` link or anchor element.

## Props

HTMLAnchorElement props are included.

```ts
/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLAnchorElement events are included.

## Methods

HTMLAnchorElement `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<a>
  <slot {disabled} {href} {variant} />
</a>
```

## Playground

<Playground />
