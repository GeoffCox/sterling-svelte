<script lang="ts">
  import type { LinkVariant } from './Link.types';

  export let colorful: boolean = false;
  export let href: string;
  export let disabled: boolean = false;
  export let variant: LinkVariant = 'regular';

  let linkRef: HTMLAnchorElement;

  // ----- Methods ----- //

  export const blur = () => {
    linkRef?.blur();
  };

  export const click = () => {
    linkRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    linkRef?.focus();
  };
</script>

<a
  bind:this={linkRef}
  class="sterling-link"
  class:colorful
  class:disabled
  class:ghost={variant === 'ghost'}
  class:undecorated={variant === 'undecorated'}
  {href}
  on:blur
  on:click
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
  on:pointercancel
  on:pointerdown
  on:pointerenter
  on:pointerleave
  on:pointermove
  on:pointerover
  on:pointerout
  on:pointerup
  on:wheel
  {...$$restProps}><slot {disabled} {href} {variant} /></a
>

<style>
  a {
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    border-bottom-style: var(--stsv-Common__border-style);
    border-bottom-width: calc(var(--stsv-Common__border-width));
    border-bottom-color: var(--stsv-Common__border-color);
    color: var(--stsv-Common__color);
    cursor: pointer;
    font: inherit;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
    user-select: none;
  }

  a:visited {
    border-bottom-color: var(--stsv-Input__border-color);
  }

  a:hover {
    border-bottom-color: var(--stsv-Input__border-color--hover);
    color: var(--stsv-Input__color--hover);
  }

  a:active {
    border-bottom-color: var(--stsv-Input__border-color--active);
    color: var(--stsv-Input__color--active);
  }

  /* ----- colorful ----- */

  a.colorful,
  a.colorful:visited {
    border-bottom-color: var(--stsv-Input--colorful__border-color);
    color: var(--stsv-Input--colorful__color);
  }

  a.colorful:hover {
    border-bottom-color: var(--stsv-Input--colorful__border-color--hover);
    color: var(--stsv-Input--colorful__color--hover);
  }

  a.colorful:active {
    border-bottom-color: var(--stsv-Input--colorful__border-color--active);
    color: var(--stsv-Input--colorful__color--active);
  }

  /* ----- ghost ----- */

  a.ghost {
    border-bottom-color: transparent;
  }

  a.ghost:hover {
    border-bottom-color: var(--stsv-Input__border-color--hover);
  }

  a.ghost:active {
    border-bottom-color: var(--stsv-Input__border-color--active);
  }

  /* ----- ghost colorful ----- */

  a.ghost.colorful:hover {
    border-bottom-color: var(--stsv-Input--colorful__border-color--hover);
  }

  a.ghost.colorful:active {
    border-bottom-color: var(--stsv-Input--colorful__border-color--active);
  }

  /* ----- disabled ----- */

  a.disabled,
  a.disabled:visited,
  a.disabled:hover,
  a.disabled:active {
    border-bottom-color: var(--stsv-Common__border-color--disabled);
    color: var(--stsv-Common__color--disabled);
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ----- undecorated ----- */
  a.undecorated,
  a.undecorated:hover,
  a.undecorated:active,
  a.undecorated:visited {
    border-bottom-color: transparent;
  }
</style>
