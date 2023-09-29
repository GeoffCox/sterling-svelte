<script lang="ts">
  import SvelteIcon from '../../SvelteIcon.svelte';
  import Playground from '../Playground.svelte';

  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let exampleRef: any;
  let disabled = false;
  let variant: string = '';
  let withIcon = true;
  let withText = true;
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <Button
      variantClass="colorful"
      {disabled}
      {variant}
      on:click={() => exampleRef.recordEvent('click')}
    >
      {#if withIcon}
        <SvelteIcon />
      {/if}
      {#if withText}
        sterling-svelte
      {/if}
    </Button>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput
      bind:variant
      availableVariants={['capsule', 'circular ', 'colorful', 'secondary', 'square', 'tool']}
    />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={withText}>with text</Checkbox>
    <Checkbox bind:checked={withIcon}>with icon</Checkbox>
  </svelte:fragment>
</Playground>

<style>
  .component {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    padding: 0;
  }
</style>
