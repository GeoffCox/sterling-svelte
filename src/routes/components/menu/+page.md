<script>
    import Link from '$lib/Link.svelte';
</script>

# Menu

A panel that floats above other content containing a list of menu items.

Menu is a building block of menus:

- <Link href="menubar">MenuBar</Link>
- <Link href="menubutton">MenuButton</Link>
- <Link href="menuitem">MenuItem</Link>
- <Link href="menuseparator">MenuSeparator</Link>

## Features

- Manages position based on the reference element
- The menu floats above other element via portaling

## Usage

```svelte
<script lang="ts">
  import Menu from '@geoffcox/sterling-svelte/Component.svelte';

  let originRef: HTMLDivElement;
  let open = false;
</script>

<div bind:this={originRef} on:click={() => (open = !open)}>Hello Menu</div>
<Menu {open} reference={originRef}>
  <MenuItem value="new" text="New" />
  <MenuItem value="open" text="Open" />
  <MenuItem value="save" text="Save" />
  <MenuItem value="close" text="Close" />
</Menu>
```

## Props

| Name      | Type          | Default | Description                                       |
| --------- | ------------- | ------- | ------------------------------------------------- |
| (div)     |               |         | HTMLDivElement props                              |
| open      | `boolean`     | `false` | If the menu is visible                            |
| reference | `HTMLElement` |         | The element to reference for positioning the menu |

## Events

| Name  | Params | Description           |
| ----- | ------ | --------------------- |
| (div) |        | HTMLDivElement events |

## Methods

| Name  | Parameters  | Description          |
| ----- | ----------- | -------------------- |
| blur  |             | HTMLDivElement.blur  |
| focus | `(options)` | HTMLDivElement.focus |

## Anatomy

```
portal (div)
  Menu (div)
    default slot
```

## Slots

| Slot    | Description   |
| ------- | ------------- |
| default | Menu contents |
