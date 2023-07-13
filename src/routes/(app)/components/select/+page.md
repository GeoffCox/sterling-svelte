<script>
    import Playground from './SelectPlayground.svelte';
</script>

# Select

A single item that can be selected from a dropdown list of items.

> The HTML `select` element does not support adequate custom styling. Select provides a custom solution.

## Props

HTMLDivElement props are included.

```ts
/** When true, allows the container to handle borders and focus borders.  */
export let composed: boolean = false;

/** When true, the dropdown is open. */
export let open = false;

/** The value of the selected item.*/
export let selectedValue: string | undefined = undefined;
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

Fill the default slot with ListItem components to display in the dropdown.

```svelte
<div>
  <div>
    <slot name="value" {disabled} {open} {selectedValue} />
  </div>
  <div>
    <slot name="button" {disabled} {open} {selectedValue} />
  </div>
  <Popover>
    <div>
      <List>
        <slot />
      </List>
    </div>
  </Popover>
</div>
```

## Playground

  <Playground />
