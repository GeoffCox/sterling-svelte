<svelte:options runes={true} />

<script lang="ts">
  import type { FormEventHandler, HTMLDialogAttributes } from 'svelte/elements';
  import { onMount, setContext, tick, type Snippet } from 'svelte';

  import Button from './Button.svelte';
  import type { PortalContext } from './Portal.types';
  import { STERLING_PORTAL_CONTEXT_ID } from './Portal.constants';
  import { writable } from 'svelte/store';

  const dialogFadeDuration = 250;

  type Props = HTMLDialogAttributes & {
    backdropCloses?: boolean | null | undefined;
    body?: Snippet;
    content?: Snippet;
    footer?: Snippet;
    header?: Snippet;
    returnValue?: string;
    headerTitle?: string | Snippet;
  };

  let {
    backdropCloses = false,
    open = $bindable(false),
    body,
    class: _class,
    content,
    footer,
    header,
    returnValue = $bindable(''),
    headerTitle,
    ...rest
  }: Props = $props();

  let dialogRef: HTMLDialogElement;
  let contentRef: HTMLDivElement;
  let formRef: HTMLFormElement;

  // svelte-ignore non_reactive_update
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

  const updateDialog = (open: boolean | null | undefined) => {
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

  $effect(() => {
    updateDialog(open);
  });

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

<dialog
  bind:this={dialogRef}
  class={`sterling-dialog ${_class}`}
  class:open
  class:closing
  {...rest}
>
  <form method="dialog" bind:this={formRef} onsubmit={onSubmit}>
    <div class="content" bind:this={contentRef}>
      {#if content}
        {@render content()}
      {:else}
        <div class="header">
          {#if header}
            {@render header()}
          {:else}
            <div class="title">
              {#if headerTitle}
                {#if typeof headerTitle === 'string'}
                  {headerTitle}
                {:else}
                  {@render headerTitle()}
                {/if}
              {/if}
            </div>
            <div class="close">
              <Button class={`circular tool`} onclick={() => closeDialog()}>
                <div class="close-x"></div>
              </Button>
            </div>
          {/if}
        </div>
        <div class="body">
          {@render body?.()}
        </div>
        <div class="separator"></div>
        <div class="footer">
          {@render footer?.()}
        </div>
      {/if}
    </div>
  </form>
</dialog>
