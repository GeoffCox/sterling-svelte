<script lang="ts">
  import type { Keyborg } from 'keyborg';

  import { createKeyborg } from 'keyborg';
  import { onMount } from 'svelte';
  import type { FieldStatus } from './Field.types';
  import Tooltip from './Tooltip.svelte';

  // ----- Props ----- //

  export let forwardClick: boolean = false;

  let htmlFor: string | undefined = undefined;
  export { htmlFor as for };

  export let label: string | undefined = undefined;
  export let message: string | undefined = undefined;
  export let required: boolean = false;
  export let requiredReason = 'This field is required';
  export let status: FieldStatus = 'none';

  // ----- State ----- //

  let fieldRef: HTMLLabelElement;
  let targetDisabled = false;
  let targetRef: HTMLElement | null = null;

  const findTarget = () => {
    let candidate: HTMLElement | null = null;
    if (htmlFor) {
      candidate = fieldRef?.querySelector<HTMLElement>(`[id="${htmlFor}"]`);
    }
    if (!candidate) {
      candidate = fieldRef?.querySelector<HTMLElement>(
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

  $: $$slots.default, fieldRef, htmlFor, findTarget();

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

  // ----- Keyborg ----- //

  let keyborg: Keyborg = createKeyborg(window);

  let usingKeyboard = keyborg.isNavigatingWithKeyboard();
  const keyborgHandler = (value: boolean) => {
    usingKeyboard = value;
  };

  // ----- Methods ----- //

  export const click = () => {
    fieldRef?.click();
  };

  export const blur = () => {
    fieldRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    fieldRef?.focus(options);
  };

  // ----- Event Handlers ----- //

  onMount(() => {
    keyborg.subscribe(keyborgHandler);

    return () => {
      keyborg.unsubscribe(keyborgHandler);
    };
  });

  const onClick = () => {
    if (forwardClick) {
      targetRef?.click();
    }
  };
</script>

<label
  bind:this={fieldRef}
  aria-disabled={targetDisabled}
  class="sterling-field"
  class:disabled={targetDisabled}
  class:using-keyboard={usingKeyboard}
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
  on:wheel
  on:paste
  {...$$restProps}
>
  {#if label || $$slots.label}
    <slot name="label" disabled={targetDisabled} for={htmlFor} {forwardClick} {label} {required}>
      <div class="label-text">
        {label}
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
        class:error={status === 'error'}
      >
        {message}
      </div>
    </slot>
  {/if}
  {#if required}
    <slot name="required" requiredTip={requiredReason}>
      <Tooltip showOn="hover">
        <span class="required-tip" slot="tip">{requiredReason}</span>
        <div class="required">*</div>
      </Tooltip>
    </slot>
  {/if}
</label>

<style>
  .sterling-field {
    background-color: var(--stsv-Input__background-color);
    border-color: var(--stsv-Input__border-color);
    border-radius: var(--stsv-Input__border-radius);
    border-style: var(--stsv-Input__border-style);
    border-width: var(--stsv-Input__border-width);
    box-sizing: border-box;
    color: var(--stsv-Input__color);
    display: flex;
    flex-direction: column;
    font: inherit;
    margin: 0;
    overflow: visible;
    padding: 0;
    position: relative;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-field:hover {
    background-color: var(--stsv-Input__background-color--hover);
    border-color: var(--stsv-Input__border-color--hover);
    color: var(--stsv-Input__color--hover);
  }

  .sterling-field.using-keyboard:focus-within {
    border-color: var(--stsv-Common__border-color--focus);
    color: var(--stsv-Common__color--focus);
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  .sterling-field.disabled {
    background-color: var(--stsv-Common__background-color--disabled);
    border-color: var(--stsv--Common__border-color--disabled);
    color: var(--stsv-Common__color--disabled);
  }

  .label-text {
    color: var(--stsv-Display__color);
    font-size: 0.8em;
    margin: 0.5em 0.7em 0.2em 0.2em;
  }

  .label-text:empty {
    margin: 0;
  }

  .sterling-field.disabled .label-text {
    color: var(--stsv-Common__color--disabled);
  }

  .message {
    font-size: 0.8em;
    background-color: var(--stsv-Display__background-color);
    color: var(--stsv-Display__color);
    padding: 0.5em;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .message.info {
    background-color: var(--stsv-Info__background-color);
    border-color: var(--stsv-Info__border-color);
    color: var(--stsv-Info__color);
  }

  .message.success {
    background-color: var(--stsv-Success__background-color);
    border-color: var(--stsv-Success__border-color);
    color: var(--stsv-Success__color);
  }

  .message.warning {
    background-color: var(--stsv-Warning__background-color);
    border-color: var(--stsv-Warning__border-color);
    color: var(--stsv-Warning__color);
  }

  .message.error {
    background-color: var(--stsv-Error__background-color);
    border-color: var(--stsv__Error-color);
    color: var(--stsv-Error__color);
  }

  .sterling-field.disabled .message {
    background-color: var(--stsv-Common__background-color--disabled);
    border-color: var(--stsv--Common__border-color--disabled);
    color: var(--stsv-Common__color--disabled);
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

  .required-tip {
    display: block;
    padding: 4px;
  }

  @media (prefers-reduced-motion) {
    .sterling-field,
    .message {
      transition: none;
    }
  }
</style>
