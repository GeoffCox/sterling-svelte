<script>
    import Playground from './CheckboxPlayground.svelte';
</script>

# Checkbox

A styled HTML `input` element with `type=checkbox`.

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
  <!-- hidden-->
  <input />
  <!-- checkmark -->
  <div />
  <!-- label (optional) -->
  <label>
    <slot {checked} {colorful} {disabled} inputId={id} {value} {variant} />
  </label>
</div>
```

## Sterling Theme Variants

| Variant  | Description           |
| -------- | --------------------- |
| colorful | applies accent colors |

## Playground

<Playground />
