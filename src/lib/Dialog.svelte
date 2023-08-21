<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements';
  import '$lib/css/sterling.css';

  import { onMount, tick } from 'svelte';

  import Button from './Button.svelte';

  const dialogFadeDuration = 250;

  // ----- Props ----- //

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

  // ----- State ----- //

  let dialogRef: HTMLDialogElement;
  let contentRef: HTMLDivElement;
  let formRef: HTMLFormElement;
  let closing = false;

  // ----- Event Handlers ----- //

  const onDocumentClick = (event: MouseEvent) => {
    // as tracking clicks outside the dialog is only active while the dialog is open
    // the clickOutside action is not used and reimplemented here.
    const targetNode = event?.target as Node;
    // the content must be used as the container because dialog::backdrop is considered
    // part of the HTMLDialogElement
    if (targetNode && !contentRef?.contains(targetNode) && backdropCloses) {
      open = false;
    }
  };

  const showDialog = () => {
    if (dialogRef?.open === false) {
      // when open, track clicks outside the dialog (use capture = true)
      document.addEventListener('click', onDocumentClick, true);
      dialogRef.showModal();
    }
    open = true;
  };

  const closeDialog = (returnValue: string = '') => {
    if (dialogRef?.open === true) {
      // when closed, stop tracking clicks outside the dialog
      document.removeEventListener('click', onDocumentClick);

      // to allow time for the CSS transition animation, closing the dialog is delayed
      closing = true;
      tick();
      setTimeout(() => {
        dialogRef.close(returnValue);
        open = false;
        closing = false;
      }, dialogFadeDuration);
    } else {
      open = false;
    }
  };

  const updateDialog = (open: boolean) => {
    if (open) {
      showDialog();
    } else {
      closeDialog();
    }
  };

  const onCancel = (event: Event) => {
    // Cancelling a dialog instantly hides the dialog.
    // To allow animation with closeDialog, this event is canceled.
    event.preventDefault();
    event.stopPropagation();
    closeDialog();
    return false;
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    // Submitting a form instantly hides the dialog.
    // The dialog.close event is not cancellable, but form.submit is.
    // To allow animation with closeDialog, this event is canceled.
    // The form is resubmitted after the dialog closes to ensure the form is in the correct state.
    const anyEvent = event as unknown as any;
    if (anyEvent?.submitter.type === 'submit') {
      if (dialogRef.open) {
        closeDialog(anyEvent?.submitter.value ?? '');
        setTimeout(() => {
          formRef.requestSubmit(anyEvent?.submitter);
        }, dialogFadeDuration);
        event.preventDefault();
        return false;
      }
    } else {
      event.preventDefault();
      return false;
    }
  };

  const onClose = (event: Event) => {
    // This event is not cancelable.
    // Update the returnValue whenever the dialog closes.
    returnValue = dialogRef.returnValue;
  };

  $: {
    updateDialog(open);
  }

  onMount(() => {
    updateDialog(open);

    dialogRef.addEventListener('cancel', onCancel);
    dialogRef.addEventListener('close', onClose);

    return () => {
      dialogRef?.removeEventListener('cancel', onCancel);
      dialogRef?.removeEventListener('close', onClose);
    };
  });
</script>

<!-- @component
A styled &lt;dialog&gt; element

- Slots for typical dialog content.
- Props and events to make using &lt;dialog&gt; easier
-->
<dialog
  bind:this={dialogRef}
  class="sterling-dialog light-mode"
  class:open
  class:closing
  on:close
  on:cancel
  {...$$restProps}
>
  <form method="dialog" bind:this={formRef} on:submit={onSubmit}>
    <div class="content" bind:this={contentRef}>
      <slot name="content">
        <div class="header">
          <slot name="header">
            <div class="title">
              <slot name="title" />
            </div>
            <div class="close">
              <Button variant="circular tool" on:click={() => closeDialog()}>
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

<style>
</style>
