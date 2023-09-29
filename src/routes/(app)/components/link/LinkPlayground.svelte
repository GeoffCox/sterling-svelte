<script lang="ts">
  import SvelteIcon from '../../SvelteIcon.svelte';
  import Playground from '../Playground.svelte';

  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import Link from '$lib/Link.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let exampleRef: any;
  let disabled = false;
  let variant = '';
  let withIcon = true;
  let withText = true;
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <Link {disabled} href="#" {variant} on:click={() => exampleRef.recordEvent('click')}>
      {#if withIcon}
        <SvelteIcon />
      {/if}
      {#if withText}
        sterling-svelte
      {/if}
    </Link>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput bind:variant availableVariants={['colorful', 'ghost', 'undecorated']} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={withText}>with text</Checkbox>
    <Checkbox bind:checked={withIcon}>with icon</Checkbox>
  </svelte:fragment>
</Playground>
