<svelte:options runes={true} />

<script lang="ts">
  import { type Snippet } from 'svelte';
  import Tooltip from './Tooltip.svelte';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import type { HTMLLabelAttributes, MouseEventHandler } from 'svelte/elements';

  type Props = HTMLLabelAttributes & {
    forwardClick?: boolean | null;
    message?: string | Snippet;
    required?: boolean | null;
    requiredIndicator?: string | Snippet;
    requiredReason?: string | Snippet;
    text?: string | Snippet;
  };

  let {
    children,
    class: _class,
    for: _for,
    forwardClick = false,
    message,
    required,
    requiredIndicator = '*',
    requiredReason,
    text,
    ...rest
  }: Props = $props();

  // ----- State ----- //

  let labelRef: HTMLLabelElement | null = $state(null);
  let targetRef: HTMLElement | null = $state(null);
  let requiredRef: HTMLElement | null = $state(null);

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

  const onClick: MouseEventHandler<HTMLLabelElement> = (event) => {
    if (forwardClick) {
      targetRef?.click();
    }
    rest.onclick?.(event);
  };
</script>

{#snippet snippetOrText(item?: string | Snippet, _class?: string)}
  {#if item}
    {#if typeof item === 'string'}
      <div class={_class}>{item}</div>
    {:else}
      {@render item()}
    {/if}
  {/if}
{/snippet}

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<label
  bind:this={labelRef}
  class={`sterling-label ${_class}`}
  class:using-keyboard={$usingKeyboard}
  for={_for}
  {...rest}
  onclick={onClick}
>
  {@render snippetOrText(text, 'text')}
  {#if children}
    <div class="content">
      {@render children()}
    </div>
  {/if}
  {@render snippetOrText(message, 'message')}
  {#if required}
    {#if requiredReason}
      <Tooltip showOn="hover" reference={requiredRef}>
        {@render snippetOrText(requiredReason, 'required-reason')}
      </Tooltip>
    {/if}
    <div bind:this={requiredRef}>
      {@render snippetOrText(requiredIndicator, 'required')}
    </div>
  {/if}
</label>
