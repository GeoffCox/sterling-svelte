<script lang="ts">
  import { onMount } from 'svelte';
  import type { LabelStatus } from './Label.types';
  import Tooltip from './Tooltip.svelte';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  // ----- Props ----- //

  let htmlFor: string | undefined = undefined;
  export { htmlFor as for };

  /**
   * If true, clicking the label invokes a click on the content.
   * Needed only when the label is not associated with the content through containment or the `for`/`id` relationship.
   */
  export let forwardClick = false;

  /** The text to display in the label. Not used if the text slot is filled. */
  export let text: string | undefined = undefined;

  /** The status message to display. */
  export let message: string | undefined = undefined;

  /** When true, indicates a value is required. */
  export let required = false;

  /** The reason the value is required. */
  export let requiredReason = 'required';

  /** The status of the label. */
  export let status: LabelStatus = 'none';

  /** Additional class names to apply. */
  export let variant: string = '';

  /** When true, the label appears above the content. */
  export let vertical = true;

  // ----- State ----- //

  let labelRef: HTMLLabelElement;
  let targetDisabled = false;
  let targetRef: HTMLElement | null = null;

  const findTarget = () => {
    let candidate: HTMLElement | null = null;
    if (htmlFor) {
      candidate = labelRef?.querySelector<HTMLElement>(`[id="${htmlFor}"]`);
    }
    if (!candidate) {
      candidate = labelRef?.querySelector<HTMLElement>(
        'a[href], ' +
          'audio[controls], ' +
          'button, ' +
          'details, ' +
          'div[contenteditable], ' +
          'form, ' +
          'input, ' +
          'select, ' +
          'textarea, ' +
          'video[controls], ' +
          '[tabindex]:not([tabindex="-1"])'
      );
    }

    targetRef = candidate;
  };

  const isElementDisabled = (element: HTMLElement | null) => {
    if (element) {
      return (
        element.getAttribute('aria-disabled') === 'true' ||
        element?.matches(':disabled') ||
        (element as any)?.disabled === true ||
        element?.classList.contains('disabled')
      );
    }
    return false;
  };

  $: $$slots.default, labelRef, htmlFor, findTarget();

  $: {
    targetDisabled = isElementDisabled(targetRef);
  }

  const mutationCallback: MutationCallback = (mutations) => {
    let disabled: boolean | undefined = undefined;
    for (let i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];
      if (mutation.type === 'attributes') {
        if (
          mutation.attributeName === 'aria-disabled' ||
          mutation.attributeName === 'disabled' ||
          mutation.attributeName === 'class'
        ) {
          if (isElementDisabled(targetRef)) {
            // a mutation caused the target to be disabled
            disabled = true;
            break;
          }

          // a mutation caused the target to be enabled
          disabled = false;
        }
      }
    }

    // if we found a mutation that changed disabled, then set targetDisabled
    if (disabled !== undefined) {
      targetDisabled = disabled;
    }
  };

  let mutationObserver: MutationObserver | undefined;

  onMount(() => {
    mutationObserver = new MutationObserver(mutationCallback);

    return () => mutationObserver?.disconnect();
  });

  $: {
    mutationObserver?.disconnect();
    if (targetRef) {
      mutationObserver?.observe(targetRef, {
        attributes: true
      });
    }
  }

  // ----- Methods ----- //

  export const click = () => {
    labelRef?.click();
  };

  export const blur = () => {
    labelRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    labelRef?.focus(options);
  };

  // ----- Event Handlers ----- //

  const onClick = () => {
    if (forwardClick) {
      targetRef?.click();
    }
  };
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<label
  bind:this={labelRef}
  aria-disabled={targetDisabled}
  class={`sterling-label ${variant}`}
  class:disabled={targetDisabled}
  class:using-keyboard={$usingKeyboard}
  class:vertical
  for={htmlFor}
  on:blur
  on:click
  on:click={onClick}
  on:copy
  on:cut
  on:dblclick
  on:dragend
  on:dragenter
  on:dragleave
  on:dragover
  on:dragstart
  on:drop
  on:focus
  on:focusin
  on:focusout
  on:keydown
  on:keypress
  on:keyup
  on:mousedown
  on:mouseenter
  on:mouseleave
  on:mousemove
  on:mouseover
  on:mouseout
  on:mouseup
  on:scroll
  on:wheel|passive
  on:paste
  {...$$restProps}
>
  {#if text || $$slots.text}
    <slot
      name="text"
      disabled={targetDisabled}
      for={htmlFor}
      {forwardClick}
      {required}
      {text}
      {variant}
    >
      <div class="text">
        {text}
      </div>
    </slot>
  {/if}
  {#if $$slots.default}
    <div class="content">
      <slot />
    </div>
  {/if}
  {#if message}
    <slot name="message" disabled={targetDisabled} {message} {required} {status} {variant}>
      <div
        class="message"
        class:info={status === 'info'}
        class:success={status === 'success'}
        class:warning={status === 'warning'}
        class:error={status === 'danger'}
      >
        {message}
      </div>
    </slot>
  {/if}
  {#if required}
    <slot name="required" {requiredReason} {variant}>
      <Tooltip showOn="hover">
        <span class="required-reason" slot="tip">{requiredReason}</span>
        <div class="required">*</div>
      </Tooltip>
    </slot>
  {/if}
</label>
