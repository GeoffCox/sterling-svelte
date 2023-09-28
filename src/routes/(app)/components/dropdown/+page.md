<script>
    import Playground from './DropdownPlayground.svelte';
</script>

# Dropdown

Displays a value and button that opens a dropdown for changing the value.

- Use the value slot to display the value.
- Use the default slot to set content in the dropdown.
- Use the button slot to replace the default chevron button.

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
<div>
  <slot name="value" {disabled} {open} {variant} />
  <slot name="button" {disabled} {open} {variant} />
  <!-- dropdown -->
  <Popover>
    <slot {disabled} {open} {variant} />
  </Popover>
</div>
```

## Playground

<Playground />
