<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements';
  import { onMount, setContext, tick } from 'svelte';

  import Button from './Button.svelte';
  import type { PortalContext } from './Portal.types';
  import { STERLING_PORTAL_CONTEXT_ID } from './Portal.constants';
  import { writable } from 'svelte/store';

  const dialogFadeDuration = 250;

  // ----- Props ----- //

  /** When true, clicking outside the dialog causes the dialog close. */
  export let backdropCloses = false;

  /** When true, the dialog is open; otherwise the dialog is closed. */
  export let open = false;

  /**
   * The return value from the dialog:
   * - an empty string indicates cancellation
   * - a value indicates form submission.
   */
  export let returnValue = '';

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- State ----- //

  let dialogRef: HTMLDialogElement;
  let contentRef: HTMLDivElement;
  let formRef: HTMLFormElement;
  let closing = false;

  const portalHostStore = writable<HTMLElement | undefined>(undefined);

  // ----- Context ----- //
  setContext<PortalContext>(STERLING_PORTAL_CONTEXT_ID, { portalHost: portalHostStore });

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
      returnValue = '';
      dialogRef.showModal();
    }
    open = true;
  };

  const closeDialog = async () => {
    if (dialogRef?.open === true) {
      // when closed, stop tracking clicks outside the dialog
      document.removeEventListener('click', onDocumentClick);

      // to allow time for the CSS transition animation, closing the dialog is delayed
      closing = true;
      await tick();
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
    returnValue = '';
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
        const eventSubmitter = anyEvent?.submitter;
        returnValue = eventSubmitter?.value ?? '';
        closeDialog();
        setTimeout(() => {
          formRef.requestSubmit(eventSubmitter);
        }, dialogFadeDuration);
        event.preventDefault();
        return false;
      }
    } else {
      event.preventDefault();
      return false;
    }
  };

  $: {
    updateDialog(open);
  }

  onMount(() => {
    updateDialog(open);

    // Use the dialog for any element portals
    portalHostStore.set(dialogRef);

    dialogRef.addEventListener('cancel', onCancel);

    return () => {
      dialogRef?.removeEventListener('cancel', onCancel);

      portalHostStore.set(undefined);
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
  class={`sterling-dialog ${variant}`}
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
              <Button variant={`circular tool ${variant}`} on:click={() => closeDialog()}>
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
