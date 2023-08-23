<script lang="ts">
  /** Additional class names to apply. */
  export let variant: string = '';
</script>

<!--
@component
A styled line to visually separate groups of menu items in a menu.
  -->
<div class={`sterling-menu-separator ${variant}`} role="separator" {...$$restProps} />
