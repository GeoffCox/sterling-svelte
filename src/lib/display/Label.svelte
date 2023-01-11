<script lang="ts">
  export let disabled = false;
</script>

<label class="sterling-label" class:disabled {...$$restProps}>
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
