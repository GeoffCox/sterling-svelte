<svelte:options runes={true} />

<script lang="ts">
  import type { MenuSeparatorProps } from './MenuSeparator.types';

  let { class: _class, ...rest }: MenuSeparatorProps = $props();
</script>

<div class={['sterling-menu-separator', _class]} role="separator" {...rest}></div>
