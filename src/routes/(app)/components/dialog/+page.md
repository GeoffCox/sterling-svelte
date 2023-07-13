<script>
    import ManualExample from './DialogManualExample.svelte';
    import FormExample from './DialogFormExample.svelte';
</script>

# Dialog

A styled HTML `dialog` element.

- Use the title, body, and footer slots to provide typical dialog content.
- Use the content slot to replace all content.
- Supports either form submit or manual close.

> The dialog is always modal.
> The cancel event is only raised by pressing the escape key.

## Props

HTMLDialogElement props are included.

```ts
/**
 * When true, the dialog is open; otherwise the dialog is closed.
 */
export let open = false;

/**
 * The return value from the dialog.
 * After the dialog closes: Empty string indicates cancellation and a value indicates form submission.
 */
export let returnValue = '';

/**
 * When true, clicking outside the dialog causes the dialog close.
 */
export let backdropCloses = false;
```

## Events

HTMLDialogElement events are included.

## Anatomy

- Use the content slot to replace all of the dialog's content.
- Use the header slot to replace the header title and close button.

```svelte
<dialog>
  <form>
    <slot name="content">
      <slot name="header">
        <slot name="title" />
        <!-- close button -->
        <Button />
      </slot>
      <slot name="body" />
      <slot name="footer" />
    </slot>
  </form>
</dialog>
```

## Usage

```svelte
<script lang="ts">
  let open = false;

  const deleteProduct = () => {
    // product delete code would go here
    open = false;
  };
</script>

<Dialog bind:open>
  <div slot="title">Delete from catalog?</div>
  <div slot="body">Do you want to delete product 'A-113' from the catalog?</div>
  <div slot="footer">
    <div class="actions">
      <Button on:click={deleteProduct}>OK</Button>
      <Button autofocus on:click={() => (open = false)}>Cancel</Button>
    </div>
  </div>
</Dialog>

<Button on:click={() => (open = true)}>Delete</Button>
```

## Examples

<FormExample />
<ManualExample />
