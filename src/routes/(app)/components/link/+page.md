<script>
    import Playground from './LinkPlayground.svelte';
</script>

# Link

A styled HTML `a` link or anchor element.

## Types

```ts
type LinkVariant = 'regular' | 'ghost' | 'undecorated';
```

## Props

HTMLAnchorElement props are included.

```ts
/** When true, applies colorful theme styles. */
let colorful: boolean = false;

let variant: LinkVariant = 'regular';
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
