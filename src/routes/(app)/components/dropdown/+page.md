<script>
    import Playground from './DropdownPlayground.svelte';
</script>

# Dropdown

Displays a value and button that opens a dropdown for changing the value.

## Props

HTMLDivElement props are included.

```ts
/** When true, applies colorful theme styles. */
/** Disables the dropdown. */
export let disabled = false;

/** When true, the dropdown is open. */
export let open = false;

/** When the user clicks away from the dropdown, it remains open. */
export let stayOpenOnClickAway = false;

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

```ts
dispatch('open', { open });
```

## Methods

HTMLDivElement `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<div class="sterling-dropdown">
  <div class="value">
    <slot name="value" {disabled} {open} {variant} />
  </div>
  <slot name="button" {disabled} {open} {variant}>
    <div class="button">
      <div class="chevron" />
    </div>
  </slot>
  <Popover>
    <div class="sterling-dropdown-popup-content">
      <slot {disabled} {open} {variant} />
    </div>
  </Popover>
</div>
```

## Playground

<Playground />
