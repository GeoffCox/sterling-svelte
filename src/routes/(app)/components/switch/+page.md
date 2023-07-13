<script>
    import Playground from './SwitchPlayground.svelte';
</script>

# Switch

A styled HTML `input` element with `type=checkbox`.

> The `input type=checkbox` element is difficult to restyle with CSS.The input is hidden and the styled indicator rendered independently.

## Props

HTMLInputElement props are included.

```ts
/** When true, applies colorful theme styles. */
export let colorful = false;

/** The text appearing on the off position side when the offLabel slot is not replaced. */
export let offText: string | undefined = undefined;

/** The text appearing on the on position side when the onLabel slot is not replaced. */
export let onText: string | undefined = undefined;

/** When true, the switch is displayed vertically. */
export let vertical = false;
```

## Events

HTMLInputElement events are included.

## Methods

HTMLInputElement `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<div>
   <!-- hidden -->
  <input />
  <!-- optional off label -->
  <slot name="offLabel" {checked} {disabled} {inputId} {offText} {vertical} />
  <!-- toggle -->
  <div />
  <!-- optional on label -->
  <slot name="onLabel" {checked} {disabled} {inputId} {onText} {vertical}>
</div>
```

## Playground

<Playground />
