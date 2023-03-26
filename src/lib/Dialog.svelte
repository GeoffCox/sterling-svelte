<script lang="ts">
  import { onMount, tick } from 'svelte';

  import Button from './Button.svelte';

  const dialogFadeDuration = 250;

  // ----- Props ----- //

  /**
   * If the dialog is open
   */
  export let open = false;

  /**
   * The return value from the dialog.
   * After the dialog closes,
   * - empty string indicates cancellation
   * - values indicate form submission
   */
  export let returnValue = '';

  /**
   * If clicking outside the dialog causes the dialog close
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
    if (targetNode && !contentRef.contains(targetNode) && backdropCloses) {
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

  const onSubmit: svelte.JSX.EventHandler<Event, HTMLFormElement> = (event) => {
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
  class="dialog"
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
              <Button variant="ghost" shape="circular" on:click={() => closeDialog()}>
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
  .dialog {
    padding: 0;
    border: none;
    background: none;
  }

  .dialog::backdrop {
    backdrop-filter: blur(2px);
    background: rgba(0, 0, 0, 0.3);
    transition: opacity 250ms;
    opacity: 0;
  }

  .dialog.open::backdrop {
    opacity: 1;
  }

  .dialog.closing::backdrop {
    opacity: 0;
  }

  .header {
    background-color: var(--stsv-Display__background-color);
  }

  .content {
    background-color: var(--stsv-Common__background-color);
    border-color: var(--stsv-Common__border-color);
    border-radius: var(--stsv-Common__border-radius);
    border-style: var(--stsv-Common__border-style);
    border-width: var(--stsv-Common__border-width);
    box-sizing: border-box;
    color: var(--stsv-Common__color);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto auto;
    justify-content: stretch;
    justify-items: stretch;
    align-items: stretch;
    transition: opacity 250ms;
    opacity: 0;
  }

  .dialog.open .content {
    opacity: 1;
  }

  .dialog.closing .content {
    opacity: 0;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr;
    justify-items: stretch;
    align-items: center;
    padding: 0.25em 0.5em;
  }

  .title {
    font-size: 1.4em;
  }

  .close {
    justify-self: flex-end;
  }

  .close :global(button) {
    width: 1.75em;
    height: 1.75em;
    padding: 0;
  }

  .close-x {
    width: 1em;
    height: 1em;
    position: relative;
  }

  .close-x:before,
  .close-x:after {
    content: '';
    position: absolute;
    width: 0.75em;
    height: 0.125em;
    background-color: currentColor;
    top: 0.45em;
  }

  .close-x:before {
    transform: rotate(45deg);
    left: 0.125em;
  }

  .close-x:after {
    transform: rotate(-45deg);
    right: 0.125em;
  }

  .body {
    padding: 1em;
  }

  .separator {
    background-color: var(--stsv-Display__background-color);
    height: var(--stsv-Common__border-width);
    margin: 0 0.25em;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    justify-items: flex-end;
    padding: 0.5em 1em;
    gap: 5px;
  }

  @media (prefers-reduced-motion) {
    .dialog::backdrop,
    .content {
      transition: none;
    }
  }
</style>
