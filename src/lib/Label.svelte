<svelte:options runes={true} />

<script lang="ts">
  import { type Snippet } from 'svelte';
  import Tooltip from './Tooltip.svelte';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import type { HTMLLabelAttributes, MouseEventHandler } from 'svelte/elements';

  type Props = HTMLLabelAttributes & {
    forwardClick?: boolean | null;
    message?: Snippet | string;
    required?: boolean | null;
    requiredIndicator?: Snippet | string;
    requiredReason?: Snippet | string;
    text?: Snippet | string;
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
  class={['sterling-label', _class]}
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
  {#if message}
    <div class="message">
      {@render stringOrSnippet(message)}
    </div>
  {/if}
  {#if required && requiredIndicator && requiredReason}
    <Tooltip>
      <div class="required">
        {@render stringOrSnippet(requiredIndicator)}
      </div>
      {#snippet tip()}
        <div class="required-reason">
          {@render stringOrSnippet(requiredReason)}
        </div>
      {/snippet}
    </Tooltip>
  {:else if required && requiredIndicator}
    <div class="required">
      {@render stringOrSnippet(requiredIndicator)}
    </div>
  {/if}
</label>
