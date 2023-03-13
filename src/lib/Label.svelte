<script lang="ts">
  export let disabled = false;
  HTMLLabelElement;
</script>

<label
  aria-disabled={disabled}
  class="sterling-label"
  class:disabled
  on:blur
  on:click
  on:copy
  on:cut
  on:dblclick
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
  <slot />
</label>

<style>
  label {
    color: var(--stsv-Display__color);
    transition: color 250ms;
    font: inherit;
  }

  label.disabled {
    color: var(--stsv-Common__color--disabled);
  }

  @media (prefers-reduced-motion) {
    label {
      transition: none;
    }
  }
</style>
