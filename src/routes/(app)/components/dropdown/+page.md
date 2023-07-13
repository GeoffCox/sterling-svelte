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
export let colorful = false;

/** When true, allows the container to handle borders and focus borders.  */
export let composed = false;

/**
 * Disables the dropdown.
 */
export let disabled = false;

/**
 * Controls if the dropdown is open.
 */
export let open = false;

/**
 * Keeps the dropdown open when clicking outside.
 */
export let stayOpenOnClickAway = false;
```

## Events

HTMLDivElement events are included.

```ts
dispatch('open', { open });
```

## Methods

HTMLDivElement blur(), click(), and focus() methods are included.

## Anatomy

```svelte
<div>
  <slot name="value" {colorful} {composed} {disabled} {open} />
  <slot name="button" {colorful} {composed} {disabled} {open} />
  <!-- dropdown -->
  <Popover>
    <slot {colorful} {composed} {disabled} {open} />
  </Popover>
</div>
```

## Playground

<Playground />
