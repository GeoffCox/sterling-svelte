<script lang="ts">
  export let disabled = false;
</script>

<label
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

<!-- 
    @component 
    A styled HTML label element
-->
<style>
  label {
    transition: opacity 250ms;
    font: inherit;
  }

  label.disabled {
    opacity: 0.5;
  }

  @media (prefers-reduced-motion) {
    label {
      transition: none;
    }
  }
</style>
