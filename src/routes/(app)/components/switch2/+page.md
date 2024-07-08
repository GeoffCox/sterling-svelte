<script>
    import Playground from './SwitchPlayground.svelte';
</script>

# Switch

A styled HTML `input` element with `type=checkbox`.

## Props

HTMLInputElement props are included.

```ts
/** The text appearing by the off position. Not used when the offLabel slot is filled. */
export let offText: string | undefined = undefined;

/** The text appearing near the on position. Not used when the onLabel slot is filled. */
export let onText: string | undefined = undefined;

/** Additional class names to apply. */
export let variant: string = '';

/** When true, the switch is displayed vertically. */
export let vertical = false;
```

## Events

HTMLInputElement events are included.

## Methods

HTMLInputElement `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<div class="sterling-switch">
   <!-- hidden input -->
  <input />
  <div class="off-label">
    <slot name="offLabel" {checked} {disabled} {inputId} {offText} {variant} {vertical} />
  </div>
  <div class="switch">
    <div class="thumb" />
  </div>
  <div class="on-label">
    <slot name="onLabel" {checked} {disabled} {inputId} {onText} {variant} {vertical}>
  </div>
</div>
```

## Playground

<Playground />
