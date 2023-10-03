<script>
    import Playground from './SelectPlayground.svelte';
</script>

# Select

A value that can be selected from a dropdown list of values.

## Props

HTMLDivElement props are included.

```ts
/** When true, the select's dropdown is open. */
export let open = false;

/** The value of the selected item.*/
export let selectedValue: string | undefined = undefined;

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

HTMLDivElement events are included.

```ts
dispatch('pending', { value });
dispatch('select', { value });
```

## Methods

HTMLDivElement `blur`, `click`, and `focus` methods are included.

```ts
function scrollToSelectedItem();
```

## Anatomy

```svelte
<div class="sterling-select">
  <div class="value">
    <slot name="value" {disabled} {open} {selectedValue} {variant}>
      {selectedValue}
    </slot>
  </div>
  <div class="button">
    <slot name="button" {disabled} {open} {selectedValue} {variant}>
      <div class="chevron" />
    </slot>
  </div>
  <Popover>
    <div class="sterling-select-popup-content">
      <List>
        <!-- Items to display in the dropdown -->
        <slot {variant} />
      </List>
    </div>
  </Popover>
</div>
```

## Playground

  <Playground />
