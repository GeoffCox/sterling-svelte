<script>
    import Playground from './RadioPlayground.svelte';
</script>

# Radio

A styled HTML `input` element with `type=radio`.

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

```svelte
<div class="sterling-radio">
  <div class="container">
    <!-- hidden -->
    <input />
    <div class="indicator" />
  </div>
  <label>
    <slot {checked} {disabled} {group} {inputId} {value} {variant} />
  </label>
</div>
```

## Playground

<Playground />
