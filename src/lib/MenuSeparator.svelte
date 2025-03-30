<svelte:options runes={true} />

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement>;

  let { class: _class, ...rest }: Props = $props();
</script>

<div class={['sterling-menu-separator', _class]} role="separator" {...rest}></div>
