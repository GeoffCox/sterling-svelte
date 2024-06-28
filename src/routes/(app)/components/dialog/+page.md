<script>
    import ManualExample from './DialogManualExample.svelte';
    import FormExample from './DialogFormExample.svelte';
</script>

# Dialog

A styled HTML `dialog` element.

## Members

| Name           | Type    | Default | Description                                                    |
| -------------- | ------- | ------- | -------------------------------------------------------------- |
| backdropCloses | boolean | false   | When true, clicking outside the dialog causes the dialog close |
| open           | boolean | false   | When true, the dialog is open; otherwise the dialog is closed  |
| variant        | string  | ''      | Additional class names to apply                                |
| returnValue    | string  | ''      | A value indicates OK, empty indicates cancellation.            |
| (various)      |         |         | HTMLDialogElement props, events, and functions                 |

## Anatomy

```svelte
<dialog class="sterling-dialog">
  <form>
    <div class="content">
      <slot name="content">
        <div class="header">
          <slot name="header">
            <div class="title">
              <slot name="title" />
            </div>
            <div class="close">
              <Button>
                <div class="close-x" />
              </Button>
            </div>
          </slot>
        </div>
        <div class="body">
          <slot name="body" />
        </div>
        <div class="separator" />
        <div class="footer">
          <slot name="footer" />
        </div>
      </slot>
    </div>
  </form>
</dialog>
```

## Considerations

- The dialog is always modal.
- The cancel event is only raised when the escape key is pressed.

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
