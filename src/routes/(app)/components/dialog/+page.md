<script>
    import ManualExample from './DialogManualExample.svelte';
    import FormExample from './DialogFormExample.svelte';
</script>

# Dialog

A styled `<dialog />`.

- Provides title, body, and footer content slots.
- Support either form submit or manual close scenarios.
- Fade in/out animation except when prefers-reduce-motion is set.
- Note: This dialog is always modal.
- Note: The cancel event is only raised by pressing the escape key.

<FormExample />
<ManualExample />

```svelte
<script lang="ts">
  // ----- Props ----- //

  // HTMLDialogElement props are forwarded

  let open = false;
  let returnValue = '';
  let backdropCloses = false;

  // ----- Events ----- //

  // HTMLDialogElement events are bubbled
</script>

<!-- Anatomy -->

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
