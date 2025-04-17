<svelte:options runes={true} />

<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import type { HTMLLabelAttributes, MouseEventHandler } from 'svelte/elements';
  import Tooltip from './Tooltip.svelte';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import type { LabelProps } from './Label.types';

  //TODO: All component props types should be exported on index

  let {
    children,
    class: _class,
    for: _for,
    formValidation,
    forwardClick = false,
    onValidation,
    message,
    required,
    requiredIndicator = '*',
    requiredReason,
    text,
    ...rest
  }: LabelProps = $props();

  // ----- State ----- //

  let labelRef: HTMLLabelElement | null = $state(null);
  let targetRef: HTMLElement | null = $state(null);
  let targetRequired: boolean | null | undefined = $state(false);
  let valid: boolean | null | undefined = $state(true);
  let validationMessage: string | Snippet | undefined = $state(undefined);
  let validationClass: string | undefined = $state();

  const findTarget = () => {
    let candidate: HTMLElement | null = null;
    if (_for) {
      candidate = labelRef?.querySelector<HTMLElement>(`[id="${_for}"]`) || null;
    }
    if (!candidate) {
      candidate =
        labelRef?.querySelector<HTMLElement>(
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
        ) || null;
    }

    targetRef = candidate;
  };

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

  const updateValidity = () => {
    if (formValidation) {
      const validationTarget = targetRef as HTMLObjectElement;
      if (validationTarget) {
        const newValid = !!validationTarget.checkValidity?.();
        const newValidity = validationTarget.validity;
        const newValidationMessage = validationTarget.validationMessage;

        const validationResult = onValidation?.(newValidity, newValidationMessage);

        valid = validationResult?.valid || newValid;
        validationClass = validationResult?.validationClass || valid ? undefined : 'error';
        validationMessage = validationResult?.validationMessage || newValidationMessage;

        // prevent the browser from showing a tooltip validation message
        validationTarget.setCustomValidity?.('');
      }
    } else {
      valid = true;
      validationMessage = undefined;
    }
  };

  const onClick: MouseEventHandler<HTMLLabelElement> = (event) => {
    if (forwardClick) {
      targetRef?.click();
    }
    rest.onclick?.(event);
  };

  const updateTargetRequired = () => {
    targetRequired = targetRef && 'required' in targetRef && !!targetRef.required;
  };

  $inspect(targetRequired);

  const onTargetAttributeChanged: MutationCallback = (mutations) => {
    if (
      mutations.findIndex(
        (mutation: MutationRecord) =>
          mutation.type === 'attributes' && mutation.attributeName === 'required'
      ) !== -1
    ) {
      updateTargetRequired();
    }
  };

  onMount(() => {
    findTarget();

    const observer = new MutationObserver(onTargetAttributeChanged);

    if (targetRef) {
      observer.observe(targetRef, {
        attributes: true,
        attributeFilter: ['required']
      });

      updateTargetRequired();

      if ('on' + 'input' in targetRef) {
        targetRef.addEventListener('input', updateValidity);
      }
      if ('on' + 'change' in targetRef) {
        targetRef?.addEventListener('change', updateValidity);
      }
      if ('on' + 'blur' in targetRef) {
        targetRef?.addEventListener('blur', updateValidity);
      }
    }

    return () => {
      if (targetRef) {
        observer.disconnect();

        if ('on' + 'input' in targetRef) {
          targetRef.removeEventListener('input', updateValidity);
        }
        if ('on' + 'change' in targetRef) {
          targetRef?.removeEventListener('change', updateValidity);
        }
        if ('on' + 'blur' in targetRef) {
          targetRef?.removeEventListener('blur', updateValidity);
        }
      }
    };
  });
</script>

{#snippet stringOrSnippet(item?: string | Snippet)}
  {#if item}
    {#if typeof item === 'string'}
      {item}
    {:else}
      {@render item()}
    {/if}
  {/if}
{/snippet}

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<label
  bind:this={labelRef}
  class={['sterling-label', validationClass, _class]}
  class:using-keyboard={$usingKeyboard}
  for={_for}
  {...rest}
  onclick={onClick}
>
  {#if text}
    <div class="text">
      {@render stringOrSnippet(text)}
    </div>
  {/if}
  {#if children}
    <div class="content">
      {@render children()}
    </div>
  {/if}
  {#if validationMessage}
    <div class="message validation">
      {@render stringOrSnippet(validationMessage)}
    </div>
  {:else if message}
    <div class="message">
      {@render stringOrSnippet(message)}
    </div>
  {/if}
  {#if required || (formValidation && targetRequired)}
    {#if requiredIndicator && requiredReason}
      <Tooltip class="sterling-label-tooltip">
        <div class="required">
          {@render stringOrSnippet(requiredIndicator)}
        </div>
        {#snippet tip()}
          <div class="required-reason">
            {@render stringOrSnippet(requiredReason)}
          </div>
        {/snippet}
      </Tooltip>
    {:else if requiredIndicator}
      <div class="required">
        {@render stringOrSnippet(requiredIndicator)}
      </div>
    {/if}
  {/if}
</label>
