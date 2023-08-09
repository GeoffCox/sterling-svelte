<script lang="ts">
  import type { LabelStatus, LabelVariant } from './Label.types';
  import Tooltip from './Tooltip.svelte';
  import { usingKeyboard } from './stores/usingKeyboard';

  // ----- Props ----- //

  let htmlFor: string | undefined = undefined;
  export { htmlFor as for };

  /** When true, applies colorful theme styles. */
  export let colorful = false;

  /**
   * If true, then clicking the label invokes a click on the input.
   * Only necessary when the label is not associated with the input through containment or the for/id relationship.
   */
  export let forwardClick = false;

  /** The text to display in the label if the text slot is not filled */
  export let text: string | undefined = undefined;

  /** The status message to display */
  export let message: string | undefined = undefined;

  /** When true, a required indicator is displayed */
  export let required = false;

  /** The reason the value is required */
  export let requiredReason = 'required';

  /** The status of the label */
  export let status: LabelStatus = 'none';

  /** Changes the overall style of the label. */
  export let variant: LabelVariant = 'regular';

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

  let mutationObserver = new MutationObserver(mutationCallback);

  $: {
    mutationObserver.disconnect();
    if (targetRef) {
      mutationObserver.observe(targetRef, {
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

<label
  bind:this={labelRef}
  aria-disabled={targetDisabled}
  class="sterling-label"
  class:colorful
  class:disabled={targetDisabled}
  class:regular={variant === 'regular'}
  class:inline={variant === 'inline'}
  class:container={variant === 'container'}
  class:using-keyboard={$usingKeyboard}
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
    <slot name="text" disabled={targetDisabled} for={htmlFor} {forwardClick} {text} {required}>
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
    <slot name="message" disabled={targetDisabled} {message} {required} {status}>
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
    <slot name="required" {requiredReason}>
      <Tooltip showOn="hover">
        <span class="required-reason" slot="tip">{requiredReason}</span>
        <div class="required">*</div>
      </Tooltip>
    </slot>
  {/if}
</label>

<style>
  .sterling-label {
    background-color: transparent;
    border: none;
    box-sizing: border-box;
    color: var(--stsv-input__color);
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-areas: 'text' 'content' 'message';
    row-gap: 0.0625em;
    align-items: center;
    font: inherit;
    margin: 0;
    overflow: visible;
    padding: 0;
    position: relative;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  /* ----- variant: inline ----- */

  .sterling-label.inline {
    background-color: transparent;
    border-color: transparent;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-template-areas: 'text content' '. message';
  }

  /* ----- variant: container ----- */

  .sterling-label.container {
    background-color: var(--stsv-input__background-color);
    border-color: var(--stsv-input__border-color);
    border-radius: var(--stsv-input__border-radius);
    border-style: var(--stsv-input__border-style);
    border-width: var(--stsv-input__border-width);
  }

  .sterling-label.container:not(.disabled):hover {
    background-color: var(--stsv-input__background-color--hover);
    border-color: var(--stsv-input__border-color--hover);
    color: var(--stsv-input__color--hover);
  }

  .sterling-label.container:focus-within,
  .sterling-label.container:focus-within:hover {
    background-color: var(--stsv-input__background-color--focus);
    border-color: var(--stsv-input__border-color--focus);
    color: var(--stsv-input__color--focus);
  }

  .sterling-label.container.using-keyboard:focus-within {
    outline-color: var(--stsv-common__outline-color);
    outline-offset: var(--stsv-common__outline-offset);
    outline-style: var(--stsv-common__outline-style);
    outline-width: var(--stsv-common__outline-width);
  }

  /* ----- colorful, variant:container ----- */

  .sterling-label.container.colorful {
    background-color: var(--stsv-input--colorful__background-color);
    border-color: var(--stsv-input--colorful__border-color);
    color: var(--stsv-input--colorful__color--hover);
  }

  .sterling-label.container.colorful:hover {
    background-color: var(--stsv-input--colorful__background-color--hover);
    border-color: var(--stsv-input--colorful__border-color--hover);
    color: var(--stsv-input--colorful__color--hover--hover);
  }

  .sterling-label.container.colorful:focus-within,
  .sterling-label.container.colorful:focus-within:hover {
    background-color: var(--stsv-input--colorful__background-color--focus);
    border-color: var(--stsv-input--colorful__border-color--focus);
    color: var(--stsv-input--colorful__color--hover--focus);
  }

  /* ----- disabled ----- */

  .sterling-label.disabled {
    cursor: not-allowed;
  }

  .sterling-label.disabled * {
    cursor: not-allowed;
  }

  /* ----- text ----- */

  .text {
    color: var(--stsv-common__color--secondary);
    font-size: 0.8em;
    grid-area: text;
    margin: 0.5em 0.7em 0.2em 0.2em;
  }

  .text:empty {
    margin: 0;
  }

  .sterling-label.colorful .text {
    color: var(--stsv-common--colorful__color--secondary);
  }

  .content {
    display: grid;
    grid-area: content;
  }

  .message {
    box-sizing: border-box;
    font-size: 0.8em;
    background-color: var(--stsv-common__background-color--secondary);
    color: var(--stsv-common__color--secondary);
    grid-area: message;
    padding: 0.5em;
    width: 100%;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .message.info {
    background-color: var(--stsv-status--info__background-color);
    border-color: var(--stsv-status--info__border-color);
    color: var(--stsv-status--info__color);
  }

  .message.success {
    background-color: var(--stsv-status--success__background-color);
    border-color: var(--stsv-status--success__border-color);
    color: var(--stsv-status--success__color);
  }

  .message.warning {
    background-color: var(--stsv-status--warning__background-color);
    border-color: var(--stsv-status--warning__border-color);
    color: var(--stsv-status--warning__color);
  }

  .message.error {
    background-color: var(--stsv-status--danger__background-color);
    border-color: var(--stsv_--danger-color);
    color: var(--stsv-status--danger__color);
  }

  .required {
    text-align: center;
    font-weight: bold;
    box-sizing: border-box;
    width: 1em;
    height: 1em;
    position: absolute;
    top: 0;
    right: 0;
  }

  .required-reason {
    display: block;
    padding: 4px;
  }

  @media (prefers-reduced-motion) {
    .sterling-label,
    .sterling-label::after,
    .message {
      transition: none;
    }
  }
</style>
