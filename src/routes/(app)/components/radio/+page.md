<script>
    import Playground from './RadioPlayground.svelte';
</script>

# Radio

A styled HTML `input` element with `type=radio`.

> The `input type=radio` element is difficult to restyle with CSS. The input is hidden and the styled indicator rendered independently.

## Props

HTMLInputElement props are included.

```ts
/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLInputElement events are included.

## Methods

HTMLInputElement `blur`, `click`, and `focus` methods are included.

## Anatomy

Use the default slot to provide content for the optional label.

```svelte
<div>
  <!-- hidden -->
  <input />
  <!-- radio dot -->
  <div />
  <!-- label (optional) -->
  <label>
    <slot {checked} {disabled} {group} inputId={id} {value} {variant} />
  </label>
</div>
```

## Playground

<Playground />
