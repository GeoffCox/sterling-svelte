<script>
    import Playground from './CheckboxPlayground.svelte';
</script>

# Checkbox

A styled HTML `input` element with `type=checkbox`.

> The `input type=checkbox` element is difficult to restyle with CSS. The input is hidden and the styled indicator rendered independently.

## Props

HTMLInputElement props are included.

```ts
/** When true, applies colorful theme styles. */
export let colorful = false;
```

## Events

HTMLInputElement events are included.

## Methods

HTMLInputElement `blur`, `click`, and `focus` methods are included.

## Anatomy

Use the default slot to provide content for the optional label.

```svelte
<div>
  <!-- hidden-->
  <input />
  <!-- checkmark -->
  <div />
  <!-- label (optional) -->
  <label>
    <slot {checked} {colorful} {disabled} inputId={id} {value} />
  </label>
</div>
```

## Playground

<Playground />
